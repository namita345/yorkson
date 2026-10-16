# Phase 8 — Client copy, readability, and contact requests

This ZIP builds on the Phase 7 angled homepage, without restructuring the five sections.

## Applied
- Homepage hero: **A Beautiful World for Little Learners** instead of “A Colorful World”. Darkened the three headline inks and the subtitle for better contrast against the near-white hero. Allowed the longer title to wrap on narrow screens.
- Homepage About Us: removed the personalized reference and used the client's exact approved line: “With play-based learning, we support little learners with care, creativity, and meaningful everyday moments.”
- Who We Are page: removed Miss Nadia's name from the graphic, copy and SEO description. The educator section is now an impersonal “Our Approach” section, with the same approved statement.
- Contact Us: “Text or Call Us” now links to a contact card with independent `sms:` and `tel:` actions; footer contact info also offers “Text us” while showing the number only in the footer and Contact Us. The homepage Get in Touch section, its validation, and API handler remain **unchanged**.

## Verify before going live
- Confirm with the client that Yorkson's published telephone number can receive SMS messages. The text action launches the visitor's default SMS app, but cannot guarantee the recipient line supports texting.
- Verify the React production build and mobile layout on Vercel.
- Form mail delivery and Google Business media still require their production credentials.
