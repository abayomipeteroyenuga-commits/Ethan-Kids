# Ethan Kids v4 — standalone adult sign-in gate

The adult (parent/guardian/teacher) signs in first; children use the activities without their own account. Independent from Ethan Hub/Ethan ID. No sample or hard-coded passwords.

## Required setup before the app can be used
1. Create a NEW, separate Supabase project for Ethan Kids at https://supabase.com/dashboard. In Authentication > Providers enable Email. Require email confirmation; set reasonable password rules and rate limits in your project settings.
2. Copy that project's **Project URL** and **publishable/anon public key** into `config.js`. NEVER paste a service_role/secret key into browser files.
3. Under Authentication > URL Configuration, set the deployed Ethan Kids HTTPS URL as the Site URL, and allow `https://YOUR-KIDS-DOMAIN/**` as a redirect URL for email confirmation/password recovery. Replace placeholder with your actual deployed domain. Configure SMTP/email delivery before inviting users.
4. Extract ZIP and upload contents to a separate GitHub repo, deploy on Vercel. `index.html` is adult sign-in. After verified login it redirects to `kids.html`. `codequest.html` also checks login. Use HTTPS.
5. Create a test adult account, confirm its email, sign in, open Code Quest, sign out and verify that a direct link to `codequest.html` returns to adult sign-in. Test password reset on the deployed URL.

## Security and limitations
The site checks adult Supabase Auth session with `getUser()` before showing activities. This is a **browser-side access gate**, not an enforceable restriction on publicly hosted static HTML/JS/assets: someone can retrieve public assets or bypass client-side checks. If the activities themselves must be private, deploy them behind server-side session verification, not as public static files. A self-selected account role does not verify legal guardian or teacher status. No child profiles or personal data are collected. Local progress is device/browser-specific and is not shared between adults. Sign-out does not erase local progress; use a separate browser profile/device for different families. This is not a parental-control or child-safety monitoring system.

No Ethan Hub login, no Ethan ID, no paid integrations. The sign-in feature will not function until the separate Supabase project is configured.
