# Measure Twice Landing Page

This document describes the implementation of the `/measure-twice` landing page.

## Overview

The Measure Twice landing page is a newsletter signup page located at `/measure-twice` that follows the design specifications:

- Clean, minimal design with same header as main page (logo only)
- 800px max width content
- Email form with progressive disclosure (additional fields appear after initial submission)
- Mobile-responsive layout
- "How we measure everything" content section
- Thank you page with same content section

## Files Structure

### Components
- `src/lets-see/components/MeasureTwice.jsx` - Main landing page component
- `src/lets-see/components/MeasureTwice.module.css` - Styling for main component
- `src/lets-see/components/MeasureTwiceForm.jsx` - Email form with progressive disclosure
- `src/lets-see/components/MeasureTwiceForm.module.css` - Form styling
- `src/lets-see/components/MeasureTwiceThankYou.jsx` - Thank you page component
- `src/lets-see/components/MeasureTwiceThankYou.module.css` - Thank you page styling

### Configuration
- `src/lets-see/utils/pages/measure-twice.js` - Page configuration for tracking and form setup

### Routing
- Updated `src/App.jsx` to handle `/measure-twice` and `/measure-twice/thank-you` routes
- Updated `scripts/generate-static-pages.js` to generate static HTML files for both pages

## Features

### Design Specifications Met
✅ Header with logo only (no navigation links)  
✅ 800px max width content container  
✅ Mobile-responsive layout (content above form on mobile)  
✅ Progressive form disclosure (industry/role fields appear after email submission)  
✅ Typography matches specifications (Montserrat with correct weights and sizes)  
✅ Color scheme matches design (#666666 topline, white text, etc.)  
✅ Gray content section with rounded corners  
✅ Subscribe button that scrolls to form  

### Technical Implementation
✅ Email integration with EmailJS  
✅ Form tracking and analytics  
✅ Static HTML generation for SEO  
✅ Thank you page redirect with form data  
✅ Mobile-responsive CSS  

## URL Structure

- `/measure-twice` - Main landing page
- `/measure-twice/thank-you` - Thank you page after form submission

## Form Flow

1. User sees email field only initially
2. On first submit click, industry and role fields appear
3. On second submit, form is actually submitted via EmailJS
4. User is redirected to `/measure-twice/thank-you`

## Build Process

The pages are automatically included in the build process:

```bash
npm run build
```

This will generate static HTML files in:
- `dist/measure-twice/index.html`
- `dist/measure-twice/thank-you/index.html`

## Development

To test locally:

```bash
npm run dev
```

Then visit:
- `http://localhost:5173/measure-twice`
- `http://localhost:5173/measure-twice/thank-you`
