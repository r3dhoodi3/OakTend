import { permanentRedirect } from "next/navigation";

// /pro/billing is gone. It was the prepaid WALLET: a balance, a deposit form
// that took real money through Stripe Checkout, and a ledger of per-lead
// charges and ghost-protection returns. That model was retired on 2026-09-12
// in favour of a 5% cut of a paid invoice (Stripe Connect, migration 0164),
// and migration 0172 made applying and unlocking free in the database itself -
// so there is nothing left for a balance to pay for.
//
// A REDIRECT, NOT A 404, and deliberately permanent. Old links to this path
// exist in the wild: two crons wrote notifications pointing here, the pro
// dashboard linked to it for months, and pros will have bookmarked it. A 404
// on the page that used to hold your money reads as "my money is gone", which
// is the single worst thing this removal could be mistaken for. /pro/payouts
// is the honest destination - it is where money reaches a pro now.
//
// THE DATA IS NOT DELETED. public.wallets, public.wallet_transactions and
// public.bonus_grants all still exist with every row intact, so any deposit
// ever taken stays auditable (see 0172's header). Nothing writes to them any
// more; this page simply no longer reads them either.
//
// The file stays - rather than the whole directory going - precisely so this
// redirect exists. Deleting it would restore the 404.
export default function ProBillingRedirect() {
  permanentRedirect("/pro/payouts");
}
