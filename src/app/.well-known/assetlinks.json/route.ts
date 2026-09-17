// Android App Links config, served at
// https://oaktend.com/.well-known/assetlinks.json
//
// Google Play fetches this to verify the OakTend Android app is allowed to
// open oaktend.com links directly (App Links, the Android equivalent of
// Apple's Universal Links). Needs the app's package name (matches
// capacitor.config.ts's appId) and its release-signing certificate's SHA-256
// fingerprint.
//
// TODO(appstore): set ANDROID_RELEASE_SHA256 once Landen has generated (or
// Play App Signing has generated) the real upload/release keystore:
//   keytool -list -v -keystore <release-key>.jks | grep SHA256
// or, if using Play App Signing, copy it from Play Console > Setup > App
// signing. Until that env var is set, this route publishes an empty
// assetlinks array instead of a fake fingerprint, which fails closed (no
// Android app is granted App Links for oaktend.com) rather than publishing a
// placeholder that looks real.
export const dynamic = "force-static";

const PLACEHOLDER_FINGERPRINT = "TODO_APPSTORE_REPLACE_WITH_RELEASE_SHA256_FINGERPRINT";

export async function GET() {
  const fingerprint = process.env.ANDROID_RELEASE_SHA256?.trim();
  const hasRealFingerprint = !!fingerprint && fingerprint !== PLACEHOLDER_FINGERPRINT;

  const body = hasRealFingerprint
    ? [
        {
          relation: ["delegate_permission/common.handle_all_urls"],
          target: {
            namespace: "android_app",
            package_name: "com.oaktend.app", // TODO(appstore): confirm matches the real Android package name
            sha256_cert_fingerprints: [fingerprint],
          },
        },
      ]
    : [];

  return new Response(JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
