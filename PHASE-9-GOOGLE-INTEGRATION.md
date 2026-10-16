# Phase 9 — Live Google photo and review integration

Read **GOOGLE-INTEGRATION-SETUP.md** for client-facing steps, Vercel environment variables, testing and policy notes.

This phase modifies homepage gallery and testimonials, the full Gallery page credit/link text, Google Vercel API functions, the Privacy Policy's Google provider disclosure, and configuration/docs. It **does not change** the Contact form, its validation, the email endpoint, the five-section page geometry, the transparent header, or other page layouts.

Tests: `npm run test:google` covers disconnected mode, owner-authorized Business Profile media/reviews, Places media/reviews, URL sanitization and API method handling (mocked responses). A live end-to-end integration cannot be completed until Yorkson's real Google API credentials/authorization are entered in Vercel; the Vite production build also requires installing npm dependencies.
