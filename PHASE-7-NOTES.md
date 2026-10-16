# Phase 7 — Angled homepage (visual reference revision)

This iteration changes the first **five homepage sections only**, plus the **transparent homepage header**.
The Get in Touch `src/components/Contact.jsx`, `src/components/EnquiryForm.jsx`, and `src/styles.css` are not edited. Other pages keep their original opaque header.

## What changed

- Header: absolute transparent overlay over hero, still four main pages and Book a Tour pointing to Contact Us.
- Hero: diagonal blue and pink corner panels, oversized headline, layered children and doodles.
- About: green/blue geometry and a sharply angled transition into the next section.
- Programs: cream panel entering at a strong diagonal, bright pastel card row.
- Reviews: pink ribbon-like angled section, existing public Google review snippets.
- Gallery: a diagonally introduced cream section with staggered photo crops.

Only `src/angled-home.css` is newly imported, and the header gets a home-only class. All other pages remain intact. The photography currently consists of **illustrative mockup crops**; it is not a live Google Business gallery and should be replaced with permissioned school photography before production. The form and gallery API configurations still require production credentials.

## Deploy to Vercel

Use Vite preset or: `npm install && npm run build`, output `dist`. The Vercel routing configuration is preserved.
The existing WordPress production site is not changed by these source files.
