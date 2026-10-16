# Yorkson Childcare Academy — Google Photos + Reviews Setup (React / Vercel)

## What is built

- **Homepage gallery** (`src/components/Gallery.jsx`) and **full Gallery page** (`src/pages/GalleryPage.jsx`) use `/api/gallery`.
- **Homepage testimonials** (`src/components/Reviews.jsx`) use `/api/reviews`.
- **Vercel functions** (`api/gallery.js`, `api/reviews.js`) fetch data on the server and remove credentials from browser responses.
- **Server-only Google helpers** (`lib/google-content.js`) support **Places API (New)** or owner-authorized **Google Business Profile**.
- On disconnection, previews are **clearly marked illustrative**, and no reviews are passed off as live Google data. Real photos/reviews carry source and author attribution where available.
- Google Place content is requested on demand with `Cache-Control: no-store` (do not store/cache photo references or reviews). Every page view may cause billable Google requests; apply Google Cloud budget alerts and API quotas.

## Option A — Recommended to get started: Places API (New)

This uses public Google Maps listings and does **not** require Business Profile ownership. Returns at most **10 photos and 5 reviews** per Places API documentation; these are selections, not the full Google Business feed.

1. Visit **https://console.cloud.google.com/**, select a Google Cloud project, and enable **billing**.
2. Enable **Places API (New)** in Google Cloud Console > APIs & Services > Library.
3. Create an **API key**, restricted to the Places API (New). Because the key is used in Vercel serverless functions, do **not** apply a website referrer restriction (a server-side restriction must be compatible with Vercel's outbound IP setup).
4. Find the **exact Yorkson Childcare Academy Place ID**. Use **https://developers.google.com/maps/documentation/places/web-service/place-id** or a Places Text Search request to verify the listing matches the academy's Langley address. Do not use the phone number as the place ID.
5. In Vercel > your project > **Settings > Environment Variables**, add:

   ```text
   GOOGLE_CONTENT_MODE=places
   GOOGLE_MAPS_API_KEY=<private API key>
   GOOGLE_PLACE_ID=<confirmed Place ID>
   ```

   Configure Preview and Production environments as appropriate. **Never paste API keys or OAuth refresh tokens into source files, screenshots, or this chat.**
6. Redeploy the project; env changes take effect on new deployments.
7. Visit `https://YOUR-PREVIEW.vercel.app/api/gallery` and `/api/reviews`. A working integration returns `{"connected":true,"source":"places",...}`; if unconfigured it reports `connected:false`. Then visit `/` and `/gallery/` to test displays.

**Important:** The Places selection is limited, Google may charge based on usage, and Google requires attributions/links and display of Google branding when Places information appears without a Google map. The app includes photo/review attributions and direct source links. See https://developers.google.com/maps/documentation/places/web-service/policies.

## Option B — Google Business Profile owner-authorized API

Use this if the client wants their authorized owner-managed media and a wider set of reviews. Google Business Profile API is **not automatically enabled** on every Cloud project. It needs project approval and permission to access the verified listing.

1. The business owner should verify/manage the Yorkson listing and approve your authorized access.
2. Follow Google’s **Business Profile API setup**: https://developers.google.com/my-business/content/basic-setup
3. Request API access if necessary: https://developers.google.com/my-business/content/faq
4. Configure an OAuth 2.0 client with the `https://www.googleapis.com/auth/business.manage` scope, authorizing the actual business listing. Use Google's documented OAuth flow: https://developers.google.com/my-business/content/implement-oauth
5. Identify the numeric **account ID** and **location ID** for the authorized Yorkson location using Google's Account Management and Business Information APIs.
6. In Vercel, set all of the following as private server-side Environment Variables:

   ```text
   GOOGLE_CONTENT_MODE=owner
   GBP_CLIENT_ID=<OAuth client ID>
   GBP_CLIENT_SECRET=<OAuth client secret>
   GBP_REFRESH_TOKEN=<owner-approved refresh token>
   GBP_ACCOUNT_ID=<numeric account ID>
   GBP_LOCATION_ID=<numeric location ID>
   ```

   **Do not expose or share a refresh token with the public or upload it to the repo.**
7. Redeploy. Test `/api/gallery`, `/api/reviews`, home and gallery views. Google may restrict what is available through the owner API; verify the actual results before launch.

`GOOGLE_CONTENT_MODE=auto` tries GBP first, and (if Places credentials are configured too) falls back to Places on access errors or if no items are returned.

## Test checklist

- Home: authentic recent Google review text (no fabricated or static excerpts), correct star counts, reviewer name/avatar, source links and Google logo.
- Home: up to five authentic Google photos, credited and linked to Google Maps.
- Gallery: responsive photo grid, filters, lightbox attribution and original-source links.
- Mobile: gallery photos, review cards and Google attribution remain legible.
- Owner has **parental/guardian consent to display identifiable children** on the academy's own website; Google listing availability alone is not enough to assume all child photos are safe or appropriate for reuse.
- No Google API key, client secret, or refresh token visible in browser devtools, HTML or repository.
- Usage quotas/billing alert in Google Cloud; protect endpoints from abuse at the platform level if needed.
- Existing contact form and Vercel Resend integration still work; none of their files were changed.

Run the mocked server integration tests with:

```bash
npm run test:google
```

**Helpful URLs**
- Places API: https://developers.google.com/maps/documentation/places/web-service/place-details
- Photos API: https://developers.google.com/maps/documentation/places/web-service/place-photos
- Places attribution / caching policy: https://developers.google.com/maps/documentation/places/web-service/policies
- GBP reviews: https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/list
- GBP media: https://developers.google.com/my-business/reference/rest/v4/accounts.locations.media/list
