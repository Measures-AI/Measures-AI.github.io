# Data Layer Tracking Setup

This document explains the new data layer tracking implementation for form submissions on landing pages.

## Overview

The system now automatically pushes structured data to the GTM data layer whenever a form is submitted, including:
- Lead information with unique IDs
- User data (name, email, company)
- Form metadata (ID, variant, page context)
- Attribution data (UTM parameters, GCLID)
- Page information (URL, path, title)

## Environment Variables

Add these to your `.env` file:

```env
# Lead Tracking Configuration
VITE_DEFAULT_LEAD_VALUE=100

# Analytics Configuration (existing)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_AW_CONVERSION_ID=AW-XXXXXXXXXX
VITE_META_PIXEL_ID=your_pixel_id
VITE_LINKEDIN_PARTNER_ID=your_partner_id
VITE_RB2B_KEY=your_reb2b_key

# EmailJS Configuration (existing)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_LANDING_PAGES_TEMPLATE_ID=your_landing_pages_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# GTM Configuration (optional - defaults in build.js)
GTM_CONTAINER_ID=GTM-MXKGFHFS
GTM_ENABLED=true
SITE_DOMAIN=measuresai.com
```

## Data Layer Event Structure

When a form is submitted, the following event is pushed to `window.dataLayer`:

```javascript
{
  event: 'lead',
  lead_id: 'LEAD-{uuid}',
  lead_type: 'Demo Request',
  value: 150,
  currency: 'USD',
  user_data: {
    email: 'prospect@example.com',
    first_name: 'Ada',
    last_name: 'Lovelace',
    company: 'Example Corp'
  },
  form: {
    id: 'lead-form-head-of-support-nps',
    name: 'head-of-support-nps_demo',
    variant: 'A',
    role: 'Head of Support',
    industry: 'B2C Retail'
  },
  page: {
    url: 'https://measuresai.com/lets-see/head-of-support-nps',
    path: '/lets-see/head-of-support-nps',
    title: 'Measures AI - Fix the "why" behind your NPS'
  },
  attribution: {
    gclid: 'Cj0KCQiA...',
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'support-nps',
    utm_term: 'nps-software',
    utm_content: 'ad-variant-1'
  }
}
```

## Page-Specific Configuration

Each landing page can have custom tracking settings in its config file:

```javascript
// src/lets-see/utils/pages/your-page.js
export const config = {
  // ... existing config ...
  "tracking": {
    "leadValue": 150,           // Custom lead value for this page
    "leadType": "Demo Request", // Custom lead type
    "formVariant": "A"          // A/B test variant
  }
};
```

## GTM Trigger Setup

In Google Tag Manager, create a trigger that listens for the 'lead' event:

1. **Trigger Type**: Custom Event
2. **Event Name**: `lead`
3. **This trigger fires on**: All Custom Events

## Form Data Enhancement

All form submissions now automatically include:
- GCLID (Google Click ID) for Google Ads attribution
- UTM parameters for campaign tracking
- These are added to both the data layer event and the email submission

## Components Updated

The following components now support data layer tracking:
- `LeadForm` (landing pages)
- `ContactForm` (main site)
- `HeroSection`
- `BottomCTA`
- `CaseStudySection`

## Testing

To test the implementation:

1. Open browser developer tools
2. Navigate to a landing page
3. Fill out and submit a form
4. Check the console for "DataLayer Lead Event:" log
5. Verify the event structure matches the expected format

## Troubleshooting

If forms are failing to submit:

1. **Check browser console** for JavaScript errors
2. **Verify EmailJS configuration** - ensure all environment variables are set
3. **Check data layer errors** - look for "Error pushing to data layer" messages
4. **Browser compatibility** - the system includes fallbacks for older browsers that don't support `crypto.randomUUID()`

The data layer implementation includes error handling to ensure form submissions continue even if tracking fails.

## Attribution Data

The system automatically captures and includes:
- `gclid` - Google Click ID for Google Ads attribution
- `utm_source` - Traffic source
- `utm_medium` - Marketing medium
- `utm_campaign` - Campaign name
- `utm_term` - Keyword term
- `utm_content` - Ad content identifier

These parameters are captured from the URL and included in both the data layer event and the form submission to EmailJS.
