# Thank You Pages with Meeting Booking

This document explains how the thank you pages work and how to customize them.

## Overview

Every landing page in the `lets-see` directory now has a corresponding thank-you page that users are redirected to after form submission. The thank-you pages include:

- Pre-filled user information from the form
- Calendly integration for meeting booking
- Same aesthetic and branding as the landing pages
- Static generation for optimal performance

## URL Structure

- Landing page: `/lets-see/{slug}/`
- Thank-you page: `/lets-see/{slug}/thank-you`

For example:
- Landing page: `/lets-see/head-of-support-nps/`
- Thank-you page: `/lets-see/head-of-support-nps/thank-you`

## Form Data Passing

When users submit a form, they are redirected to the thank-you page with their form data passed as URL parameters:

```
/lets-see/head-of-support-nps/thank-you?name=John%20Doe&company=Acme%20Corp&email=john@acme.com
```

The thank-you page extracts this data and:
1. Displays a personalized greeting
2. Shows a summary of their information
3. Pre-fills the Calendly widget with their email and name

## Customizing the Calendly URL

To customize the Calendly integration, edit the `calendlyUrl` in `/src/lets-see/template/ThankYouPage.jsx`:

```javascript
// Current default URL
const calendlyUrl = 'https://calendly.com/measures-ai/demo';

// You can customize this to your own Calendly link:
const calendlyUrl = 'https://calendly.com/your-username/meeting-type';
```

### Per-Page Calendly URLs

If you want different Calendly URLs for different landing pages, you can make it configurable by:

1. Adding a `calendlyUrl` field to each page configuration in `/src/lets-see/utils/pages/`
2. Using that URL in the ThankYouPage component:

```javascript
// In the page config (e.g., head-of-support-nps.js)
export const config = {
  // ... existing config
  calendlyUrl: 'https://calendly.com/your-username/support-demo'
};

// In ThankYouPage.jsx
const calendlyUrl = config.calendlyUrl || 'https://calendly.com/measures-ai/demo';
```

## Alternative Booking Providers

If you prefer to use a different booking provider instead of Calendly:

1. Replace the Calendly script loading in `ThankYouPage.jsx`
2. Update the widget initialization code
3. Modify the CSS classes as needed

Popular alternatives include:
- Acuity Scheduling
- Appointlet  
- Hubspot Meetings
- Cal.com

## Generating Static Pages

After making changes, regenerate the static pages:

```bash
npm run build
```

This will create all the thank-you pages in the `/dist/lets-see/{slug}/thank-you/` directories.

## Files Modified

- `/src/lets-see/template/ThankYouPage.jsx` - Thank you page component
- `/src/lets-see/template/ThankYouPage.module.css` - Thank you page styles  
- `/src/lets-see/components/LeadForm.jsx` - Updated to redirect with form data
- `/src/lets-see/router.jsx` - Updated to handle thank-you page routing
- `/scripts/generate-static-pages.js` - Updated to generate thank-you pages

## Testing

To test the complete flow:

1. Build the project: `npm run build`
2. Serve the dist directory locally
3. Fill out a form on any landing page
4. Verify you're redirected to the thank-you page with your data
5. Check that the Calendly widget loads and is pre-filled with your email

## Customization Options

The thank-you pages inherit the theme color and branding from their parent landing page. You can customize:

- Hero text and messaging
- Calendly URL and configuration
- Alternative booking options
- Styling and layout
- Email fallback options
