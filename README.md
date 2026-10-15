# Yorkson Childcare Academy — React/Vite (Phase 5)

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

**Google reviews:** homepage snippets are manually curated short excerpts, not a continuously updated Google widget. Review the permission, attribution and presentation before launch.

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
