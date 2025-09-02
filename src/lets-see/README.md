### Lets-See Landing Pages

- Path: `/lets-see/:slug?` with optional query `?role=...&industry=...&utm_source=...&utm_campaign=...`
- Example slugs provided: `cfo-saas`, `head-of-support-retail`.
- To add a new page: update `src/lets-see/utils/config.js -> exampleConfigs` with your slug and content.

Tracking keys:
- Set placeholders in `src/lets-see/components/TrackingProvider.jsx`:
  - `GA_MEASUREMENT_ID`
  - `AW_CONVERSION_ID`
  - `META_PIXEL_ID`
  - `LINKEDIN_PARTNER_ID`
  - `RB2B_KEY` (optional; reb2b is already loaded in index.html)

EmailJS:
- Set `YOUR_EMAILJS_SERVICE_ID`, `YOUR_EMAILJS_TEMPLATE_ID`, `YOUR_EMAILJS_PUBLIC_KEY` in `src/lets-see/components/LeadForm.jsx`.

Branding:
- Uses global `App.css` for dark theme and Montserrat. Component styles are in CSS Modules under `template` and `components`.

Modules:
- `template/LandingPage.jsx` composes the hero, demo data, and lead form.
- Add more modules/sections as needed and import into the template.
