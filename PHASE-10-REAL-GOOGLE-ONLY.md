# Yorkson — Phase 10: Real Google content only

This is an update to Phase 9, **not** a new site redesign. It retains the five angled homepage sections, transparent header, all pages and the exact same contact form/email endpoint.

## What changed

- Home gallery: **real Google images only**, fetched through `/api/gallery`; otherwise an honest "not available" state with a Google Maps link (no sample photos).
- Full Gallery: same backend feed, including a real-image-only grid, collage and promo card. No generated concept-photo tiles or silently substituted examples.
- Home reviews: remains **real reviews only** through `/api/reviews`; no fictional review cards.
- Public APIs give *sanitized error messages* such as HTTP 403 or missing config when the Google connection fails. Secrets are never returned.
- No keys or tokens are included in the ZIP.

## Vercel setup and the critical environment check

1. Deploy **this ZIP/source revision** to the existing `yorkson-six` Vercel project. Changing environment variables alone does not change old deployed code.
2. In Vercel > Project > Settings > Environment Variables, confirm:

```
GOOGLE_CONTENT_MODE=places
GOOGLE_MAPS_API_KEY=<private Places API (New) key>
GOOGLE_PLACE_ID=ChIJw6zEGcV40qURGzczZUcfgg8
```

3. **Important:** Vercel environment variables are scoped. You initially added them to **Production**. A protected hash URL like `yorkson-q4g4rui2j-tgt17.vercel.app` may be a **Preview** deployment, and Preview does not receive Production-only variables. In Project > Deployments > your deployment, check the Environment label. If it is **Preview**, add these variables to Preview too; if it is **Production**, Production-only settings are fine.
4. Redeploy the appropriate environment **after** the variables are saved.
5. While logged in to Vercel (or on the publicly accessible production domain), open:

- `https://YOUR-DEPLOYMENT.vercel.app/api/reviews`
- `https://YOUR-DEPLOYMENT.vercel.app/api/gallery`

A working response includes `"connected":true`, `"source":"places"`, and `reviews` or `photos` arrays. If the endpoint reports `"connected":false`, its `message` will help diagnose:

- `missing Google configuration` — environment variables missing from THIS deployment or deployment not updated
- `Google API returned HTTP 403` — Google API key/billing/API restrictions or access permission issue
- `Google API returned HTTP 404` — verify Place ID
- no public photos or written reviews — Google Places did not return content for this listing

If you see a Vercel sign-in redirect rather than JSON, this is Deployment Protection; inspect the URL while signed in to the team account, or test the production domain.

## Expected limits / privacy

**Google Places API (New) only provides up to 10 public photos and 5 public reviews per place details response.** It is not a full feed of every Google Business photo/review. To fetch more, the separately approved, OAuth-based Business Profile integration can be used once Google approves the access request and additional credentials are set. (Do not add OAuth secrets to client-side `VITE_` variables.)

Place API use requires a billing-enabled Google Cloud project and attribution. Google-hosted photo URLs are fetched afresh rather than saved to your repo. For identifiable children's photos, ensure Yorkson has appropriate guardian permission for reuse on the website.

**Existing WordPress site is unchanged** until you choose to switch domains.
