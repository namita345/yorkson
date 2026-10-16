## Latest update — Phase 9 Google photos and reviews

Both the homepage and the dedicated Gallery page can now show photos from Google, and the homepage reviews section can now show authentic reviews. New server-side endpoints: `api/gallery.js` and `api/reviews.js`, backed by `lib/google-content.js`. **The live Google feed is not active until Vercel environment variables are configured.**

Read **`GOOGLE-INTEGRATION-SETUP.md`** for setup, privacy, billing, source/author credit, children’s photo consent, and testing. `npm run test:google` runs offline mocked integration tests.

The homepage form, validation, email API, angled visual design and navigation remain untouched.

---

# Yorkson Childcare Academy — React/Vite (Phase 9: Google photos + reviews integration)

## Latest update — approved homepage reference

- **Header:** clean white navigation with exactly four links (Home, Who We Are, Gallery, Contact Us), plus a separate pink **Book a Tour** button linking to `/contact/#enquiry`.
- **Homepage:** only the first five sections have been visually refreshed to match the supplied colorful layout: Hero, About, Programs, Reviews, Gallery. Editable HTML/CSS/React components, not a flattened background image.
- **Homepage Get in Touch:** deliberately untouched. `src/components/Contact.jsx` and `src/components/EnquiryForm.jsx` are byte-for-byte unchanged from Phase 5; the form remains in place and uses the same serverless endpoint.
- **Business hours:** `SITE.openingHours` is **8:00 AM – 5:00 PM**, displayed only on Contact Us and in the shared footer contact-details area. Days of operation are unconfirmed; do not invent days.
- **Phone number:** shown in the footer and Contact Us, not scattered through the five redesigned homepage sections. A redundant Who We Are phone CTA and the Privacy Policy's duplicate phone link now direct visitors to Contact Us instead. The unchanged form’s error state still provides a call fallback.
- **Gallery/reviews:** Live Google photos and reviews appear automatically after configured credentials. Until then, the gallery displays clearly labelled illustrative photos and the reviews section directs visitors to the Google listing.
- **New stylesheet:** `src/home-refresh.css` is scoped to `.home-refresh` and the common header. All four primary routes and Privacy Policy are preserved.

**Vercel setup:** upload the contents of the `yorkson-react` folder to your repository root; use Vite, `npm run build`, output `dist`. Deploy to a preview URL and confirm the final fonts, images, layout and contact delivery before touching the current WordPress site.

**Validation:** 16/16 JSX sources parse with the TypeScript parser; the form and homepage contact section match Phase 5 byte-for-byte; Vite's dependency install/full production build still needs Vercel because the npm registry is unavailable here. The separate HTML preview is a *visual-only snapshot*; the deployable source of truth is the React project.

---


**Status:** 4-page website plus standalone Privacy Policy. Built to stage on Vercel. The existing WordPress installation remains unchanged.

## Main navigation

| Main-menu label | Route |
|---|---|
| Home | `/` |
| Who We Are | `/who-we-are/` |
| Gallery | `/gallery/` |
| Contact Us | `/contact/` |

- **Book a Tour** is a separate CTA (desktop header + mobile menu), pointing to `/contact/#enquiry`, not a fifth main navigation page.
- **Privacy Policy** lives at `/privacy-policy/` and is linked from the footer and the consent text of both enquiry forms.
- The homepage still has a contact form, as requested, as well as the dedicated Contact Us page.

## Deploy to Vercel

1. Unzip and put the contents of **`yorkson-react/`** at the root of your Git repository (not the outer ZIP folder).
2. Import your repository in Vercel.
3. Framework Preset: **Vite**. Install Command: `npm install`. Build Command: `npm run build`. Output Directory: **`dist`**.
4. Deploy to a **preview URL first**, and review `/`, `/who-we-are/`, `/gallery/`, `/contact/`, and `/privacy-policy/` directly and after refreshing. `vercel.json` contains the direct-route rewrites.
5. Test email delivery and Google integration **before** changing DNS away from WordPress.

### Local commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Configuration to complete before production

In Vercel Environment Variables, set the actual verified values listed in `.env.example`.

**Contact form:** `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (must use a verified sender domain), `CONTACT_TO_EMAIL` (currently defaults to `care@yorksonchildcare.com`). The two forms post to `/api/contact` and display a real error if delivery is not configured. Do not put email-service secrets in client-side `VITE_` variables. Before publicly enabling the form, add deployment-level anti-spam and abuse controls, and verify email delivery end-to-end.

**Google gallery:** use the owner-authorized Google Business Profile credentials, or the alternative public Google Places API credentials, as outlined in `.env.example`. Keep credentials server-side. Until configured, the gallery is clearly identified as illustrative artwork; it is NOT a live feed. Confirm rights/guardian permission to display photos of children before launch.

**Google reviews:** Homepage review cards now fetch `/api/reviews` dynamically. Google results are not copied into the source or stored. A Google connection is required to display live reviews.

**Privacy:** We drafted `/privacy-policy/` from the **new site’s actual data flows** (parent enquiry, Vercel hosting, Resend email delivery if enabled, Google Maps/photos, Google Fonts). We could not verify an existing published Yorkson privacy-policy page, and we did NOT copy a missing policy. The current policy is **a draft for the business owner and legal/privacy reviewer**. Before publishing:

- Confirm the academy’s actual information-handling and deletion/retention practices (including email inbox retention).
- Confirm who at Yorkson receives requests about privacy, and the correct contact email.
- Confirm which third-party services, analytics, fonts, Google integrations and any cookies will actually be present at launch.
- Confirm parental consent for identifying children in all photos/videos; replace any illustrative child mockup images with appropriate authorized media.
- Confirm information shared with vendors may cross borders and update wording to match real contracts/hosting locations.
- Remove the visible owner-review banner and the word “Draft” near the date **only after** the client has approved the wording.
- Seek a qualified privacy/legal review for BC's Personal Information Protection Act (PIPA) requirements and any other laws applicable to the academy.

Public background: https://oipc.bc.ca/for-private-organizations ; https://www.oipc.bc.ca/documents/guidance-documents/1371

## Project layout

```text
src/
  App.jsx                         Path-based route switch + per-page title/meta
  main.jsx                        React entry point + stylesheet imports
  pages/
    WhoWeAre.jsx
    GalleryPage.jsx
    ContactPage.jsx
    PrivacyPolicy.jsx              NEW: policy page + section jump navigation
  components/
    Header.jsx                     4-link menu + Book a Tour to Contact
    Footer.jsx                     4-link footer navigation + Privacy Policy
    EnquiryForm.jsx                Shared form + linked privacy consent
    Hero.jsx, About.jsx, Programs.jsx, Reviews.jsx, Gallery.jsx, Contact.jsx, Decor.jsx
  data/site.js                     Business information, cards and review snippets
  styles.css, who.css, gallery.css, contact-page.css, privacy.css
api/
  contact.js                       Serverless email provider integration
  gallery.js                       Serverless Google gallery integration
  reviews.js                       Serverless Google reviews integration
lib/google-content.js             Server-only Google API client and normalizers
src/hooks/useGoogleContent.js      Homepage gallery and reviews fetch hook
public/images/                     Approved illustrative mockup art, not official childcare photography
vercel.json                        Direct-link rewrites (including /privacy-policy/)
.env.example                       Required server-only environment variables
```

### Original source and replacement precautions

- Business details and daycare descriptions: https://yorksonchildcare.com/ and https://yorksonchildcare.com/who-we-are/ . Confirm contact details, capacity, child age range and hours with the client.
- Back up WordPress content and database before DNS switch. Retain rollback capability.
- This is a client-rendered Vite app: consider a sitemap, robots.txt, and prerendering/server-side rendering if organic-search SEO is critical. Preserve original URL paths and add redirects for legacy WordPress URLs.
- No production DNS changes, WordPress edits, Google Business authorization or Vercel deployment have been performed.

## Validation

Static checks for JSX parsing, internal routes, policy links and rewrites are included as part of the Phase 5 packaging step. If npm dependencies cannot be installed in this environment, run `npm install && npm run build` on Vercel before treating the package as production-ready.


## Phase 7 — diagonal homepage revision

The new `src/angled-home.css` provides an **absolutely positioned, transparent homepage header**, strong angled transitions between Hero, About, Programs, Reviews and Gallery, and layered collage styling. All other routes keep their prior header and layout. The Get in Touch section and `EnquiryForm.jsx` were verified unchanged byte-for-byte from Phase 6. See `PHASE-7-NOTES.md`. The standalone visual preview is for design inspection only; test the live React page through Vercel.
