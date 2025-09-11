# Landing Page Configurations

This directory contains individual page configuration files for the lets-see landing page system. Each file represents a unique landing page variant with its own slug, content, and settings.

## File Structure

Each page configuration file should follow this naming convention:
- **File name**: `{slug}.js` (e.g., `head-of-support-retail.js`, `cfo-nps.js`)
- **Location**: Files can be placed directly in this directory or in subfolders
- **Subfolders**: Subdirectory structure does not affect the slug - the slug is determined by the exported `slug` constant

## Standard API

Each page configuration file must export two constants:

### 1. `slug` (string)
The unique identifier for this page configuration. This slug is used in the URL path `/lets-see/{slug}`.

### 2. `config` (object)
The page configuration object containing all the content and settings for the landing page.

## Example File Structure

```javascript
export const slug = 'example-page';

export const config = {
  // Required fields
  role: 'Head of Support',
  industry: 'B2C Retail',
  themeColor: '#7ecbff',
  headline: 'Your main headline',
  story: 'Your value proposition story',
  
  // Content sections
  points: [
    { text: 'Feature description', icon: 'icon-name' },
    // ... more points
  ],
  
  fields: [
    { title: 'name', type: 'text', placeholder: 'Your name' },
    { title: 'email', type: 'email', placeholder: 'Your email' },
    // ... more form fields
  ],
  
  cta: 'Call to action text',
  
  demoData: {
    title: 'Demo card title',
    subtext: 'Demo card description',
    bullets: [
      'Key insight 1',
      'Key insight 2'
    ],
    data: {
      type: 'bar',
      values: [
        { name: 'Q1', value: 30 },
        // ... more data points
      ]
    },
    leftText: 'Context label',
  },
  
  logos: [
    { image: '/img/external-logos/example.png', alt: 'Example' },
    // ... more logos
  ],
  
  typedSections: [
    {
      type: 'process', // or 'caseStudy', 'featureRows', 'quote'
      title: 'Section title',
      // ... section-specific properties
    },
    // ... more sections
  ],
  
  bottomCta: {
    title: 'Bottom CTA title',
    copy: 'Bottom CTA description',
  },
};
```

## Configuration Object Properties

### Core Properties
- `role` (string): Target user role (e.g., "CFO", "Head of Support", "Product")
- `industry` (string): Target industry (e.g., "B2C Retail", "SaaS")
- `themeColor` (string): Hex color code for the page theme
- `headline` (string): Main page headline
- `story` (string): Value proposition narrative

### Content Sections
- `points` (array): Feature/benefit points with icons
- `fields` (array): Form field definitions
- `cta` (string): Primary call-to-action text
- `demoData` (object): Demo card content and data visualization
- `logos` (array): Integration/partner logos
- `typedSections` (array): Additional page sections (process, case studies, etc.)
- `bottomCta` (object): Bottom call-to-action section

### Section Types
The `typedSections` array can contain different section types:

#### Process Section
```javascript
{
  type: 'process',
  title: 'Section title',
  subtitle: 'Section subtitle',
  items: [
    { title: 'Step title', text: 'Step description', image: '/img/step-image.svg' }
  ],
  mobile: true
}
```

#### Case Study Section
```javascript
{
  type: 'caseStudy',
  leftImage: '/img/case-study.png',
  logoImage: '/img/company-logo.png',
  logoAlt: 'Company Name',
  headline: 'Case study headline',
  story: 'Case study narrative',
  quote: 'Customer testimonial',
  author: 'Person Name',
  role: 'Person Role',
  link: 'https://company.com', // optional
  mobile: true
}
```

#### Feature Rows Section
```javascript
{
  type: 'featureRows',
  title: 'Features section title',
  rows: [
    { image: '/img/feature.png', title: 'Feature name', text: 'Feature description' }
  ],
  mobile: false
}
```

#### Quote Section
```javascript
{
  type: 'quote',
  text: 'Quote text',
  author: 'Person Name',
  role: 'Person Role',
  mobile: false
}
```

## Loading System

The configuration files are automatically loaded by the main config system using Vite's `import.meta.glob` feature. The loader:

1. Scans all `.js` files in this directory (including subdirectories) at build time
2. Imports each file and extracts the `slug` and `config` exports
3. Builds a consolidated configuration object indexed by slug
4. Makes configurations available to the routing system
5. Provides hot reloading during development

### Testing

For Node.js testing outside the browser environment, use the separate test loader:

```bash
node src/lets-see/utils/nodeTestLoader.js
```

This utility will scan and load all page configurations to verify they're working correctly.

## Adding New Pages

To add a new landing page:

1. Create a new `.js` file with your desired slug name
2. Export the `slug` constant with your unique identifier
3. Export the `config` object following the standard API
4. The page will automatically be available at `/lets-see/{your-slug}`

## Best Practices

- Keep slugs descriptive and URL-friendly (lowercase, hyphens for spaces)
- Ensure slugs are unique across all configuration files
- Follow the established content patterns for consistency
- Test your configuration thoroughly before deployment
- Use meaningful file names that match or relate to the slug 