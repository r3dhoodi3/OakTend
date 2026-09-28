-- 0175_household_qr_grace_binding.sql
--
-- RUN THIS AGAINST THE LIVE DATABASE (Supabase SQL editor); editing repo SQL
-- alone does NOT change the already-deployed database.
--
-- WHAT CHANGES. A household QR code works for 10 minutes from when it is made,
-- for everyone. The extra "finish joining" time after a scan now belongs only
-- to the browser that opened the link while the code was still live.
--
-- BEFORE. 0099 had the join page push a code's expires_at out to 30 minutes
-- from its first open. That extra time counted for ANYONE holding the link, so
-- a code opened once at minute 9 could be used by a different person up to
-- minute 39, well past the owner's 10 minutes.
--
-- NOW.
--   - The app no longer moves expires_at on open. It stays mint + 10 minutes.
--   - New column grace_key: a random value per code, filled by the column
--     default. It is never sent to a browser. The app reads it with the
--     service role, and passes it to redeem_household_invite_token() only for
--     a person whose browser holds a signed "opened in time" cookie
--     (src/lib/qrScanProof.ts): opened before expires_at, less than 30
--     minutes ago.
--   - redeem_household_invite_token() gains p_grace_key (default null). It
--     accepts a code while expires_at > now() exactly as before, OR, with the
--     matching grace_key, until 30 minutes after expires_at and never later.
--     So calling this RPC directly with a leaked token (it is granted to
--     authenticated, and the anon key is public) cannot get past the 10
--     minutes: the caller would also need grace_key, which only the server
--     has.
--   Everything else in the function is 0097's body, unchanged: per-user
--   throttle, owner and already-member short cuts, pending-invite claim,
--   property row lock, 4-member cap, auth.uid() bound insert.
--
-- ORDER. Safe in either order with the app deploy.
--   - SQL first, old app: the old app calls with p_token only (the default
--     fills p_grace_key) and still moves expires_at on open, so it behaves
--     exactly as it does today until the new app ships.
--   - New app first, no SQL yet: reading grace_key fails, no key is passed,
--     and codes simply last their 10 minutes with no extra time until this is
--     pasted.
--
-- scanned_at (0099) is left in place, unused. Safe to re-run.

alter table public.household_invite_tokens
  add column if not exists grace_key uuid not null default gen_random_uuid();

comment on column public.household_invite_tokens.grace_key is
  'Server-only secret for the finish-joining time after a code''s 10 minutes. '
  'Read with the service role and passed to redeem_household_invite_token() '
  'only for a browser that opened the link while the code was live. Never '
  'sent to a client.';

-- The signature changes (new trailing argument), so drop the one-argument
-- version first; create or replace cannot change an argument list.
drop function if exists public.redeem_household_invite_token(uuid);

create or replace function public.redeem_household_invite_token(
  p_token uuid,
  p_grace_key uuid default null
)
returns table (
  ok             boolean,
  property_id    uuid,
  member_id      uuid,
  already_member boolean,
  reason         text
) language plpgsql security definer set search_path = public as $$
declare
  v_uid          uuid := auth.uid();
  v_property_id  uuid;
  v_created_by   uuid;
  v_email        text;
  v_is_owner     boolean;
  v_existing_id  uuid;
  v_existing_status text;
  v_member_count int;
  v_new_id       uuid;
  v_allowed      boolean;
begin
  if v_uid is null then
    ok := false; reason := 'no_session';
    return next;
    return;
  end if;

  select public.rate_limit_hit(
    'household_qr_redeem:' || v_uid::text, 30, 300
  ) into v_allowed;
  if v_allowed is false then
    ok := false; reason := 'rate_limited';
    return next;
    return;
  end if;

  -- Live for anyone for its 10 minutes; past that, only with the matching
  -- server-held grace_key, and never more than 30 minutes past the expiry.
  select hit.property_id, hit.created_by
    into v_property_id, v_created_by
  from public.household_invite_tokens hit
  where hit.token = p_token
    and (
      hit.expires_at > now()
      or (
        p_grace_key is not null
        and hit.grace_key = p_grace_key
        and hit.expires_at + interval '30 minutes' > now()
      )
    );

  if v_property_id is null then
    ok := false; reason := 'invalid_or_expired';
    return next;
    return;
  end if;

  v_email := lower(coalesce(auth.jwt() ->> 'email', ''));
  if v_email = '' then
    ok := false; reason := 'no_email';
    return next;
    return;
  end if;

  select exists (
    select 1 from public.properties p
    where p.id = v_property_id and p.user_id = v_uid
  ) into v_is_owner;
  if v_is_owner then
    ok := true; property_id := v_property_id; already_member := true;
    reason := 'owner';
    return next;
    return;
  end if;

  select hm.id, hm.status
    into v_existing_id, v_existing_status
  from public.household_members hm
  where hm.property_id = v_property_id
    and lower(hm.invited_email) = v_email
  limit 1;

  if v_existing_id is not null and v_existing_status = 'active' then
    ok := true; property_id := v_property_id; member_id := v_existing_id;
    already_member := true; reason := 'already_member';
    return next;
    return;
  end if;

  if v_existing_id is not null and v_existing_status = 'invited' then
    update public.household_members
    set status = 'active', member_user_id = v_uid, accepted_at = now()
    where id = v_existing_id;
    ok := true; property_id := v_property_id; member_id := v_existing_id;
    already_member := false; reason := 'claimed_pending_invite';
    return next;
    return;
  end if;

  perform id from public.properties where id = v_property_id for update;

  select count(*) into v_member_count
  from public.household_members
  where property_id = v_property_id;
  if v_member_count >= 4 then
    ok := false; reason := 'home_full';
    return next;
    return;
  end if;

  insert into public.household_members
    (property_id, invited_email, member_user_id, status, invited_by, accepted_at)
  values
    (v_property_id, v_email, v_uid, 'active', v_created_by, now())
  returning id into v_new_id;

  ok := true; property_id := v_property_id; member_id := v_new_id;
  already_member := false; reason := 'joined';
  return next;
  return;
end; $$;

-- Same grant posture as 0097: the joiner's own session only.
revoke all on function public.redeem_household_invite_token(uuid, uuid) from public;
revoke all on function public.redeem_household_invite_token(uuid, uuid) from anon;
grant execute on function public.redeem_household_invite_token(uuid, uuid) to authenticated;

-- PostgREST caches the function list; reload so the new signature is callable.
notify pgrst, 'reload schema';
