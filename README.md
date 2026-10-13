# Ethan Kids — Ethan ID integration

This build replaces the previous separate Ethan Kids sign-in with the existing Ethan Hub Supabase project. Deploy the Hub and Kids folders to their respective GitHub/Vercel projects; do not merge the folders into one site.

1. Deploy Ethan Kids to its own HTTPS address.
2. In ETHAN-HUB/index.html set `kidsUrl:''` to the exact deployed Kids URL (e.g. `https://YOUR-KIDS-DOMAIN`), then deploy Hub. The Kids tile stays disabled until this is set.
3. Confirm the `ethan-sso` Edge Function is deployed in the Ethan ID Supabase project and its `SSO_SECRET` is configured. Keep this secret server-side. Both apps must use the SAME Ethan ID project.
4. Sign into Hub, click Ethan Kids, and test the handoff and sign-out. Kids progress remains local to each browser.

IMPORTANT SECURITY LIMITATIONS: The existing Hub SSO function returns bearer session credentials when a ticket is exchanged. Tickets are currently reusable for their 60-second lifetime and are passed in the URL; avoid treating this as a production-hardened child-safety/SSO solution until a server-side single-use handoff, strict allowed origins/targets and dedicated authorization rules are implemented. The Kids frontend checks a valid, confirmed Ethan ID, NOT an adult's identity or role. Do not claim adult-only enforcement; adult supervision and server-enforced authorization are needed before public launch. Static assets on public hosting cannot be secured by client-side route guards alone.


## PWA / installable update v14
- Added `manifest.webmanifest`, square 192×192 and 512×512 Ethan Kids icons, and an offline service worker.
- Added a visible **Install Ethan Kids** control to all learning pages. Supported browsers show the native install prompt; iPhone/iPad users receive Add to Home Screen instructions.
- The service worker precaches the included HTML pages, local scripts, styles and images for offline access after the first successful installation/cache.
- Deploy the package at the root of `https://kids.ethandigitalacademy.org/` (or update the existing canonical URLs if using another domain).

**Important:** This PWA update does not add missing authentication/backend files or prove the existing sign-in flow works. Test sign-in, any Ethan ID handoff, and child-safety permissions separately before public use.
