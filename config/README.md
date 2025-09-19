# Build Configuration

This directory contains configuration files for managing build-time settings like Google Tag Manager, domain configuration, and other site-wide settings.

## Files

### `build.js`
Main configuration file containing:
- **GTM Settings**: Container ID and enable/disable flag
- **Domain**: Site domain configuration
- **Site Metadata**: Site name, title, and description
- **Build Settings**: Source maps, minification, etc.

### `gtm.js`
Helper functions for generating Google Tag Manager code snippets:
- `generateGTMHeadScript()` - Generates the GTM script for `<head>`
- `generateGTMBodyScript()` - Generates the GTM noscript for `<body>`
- `generateGTMScripts()` - Returns both scripts as an object

## Usage

### Updating GTM Container ID

#### Method 1: Edit the config file
```javascript
// In config/build.js
export const buildConfig = {
  gtm: {
    containerId: 'GTM-YOURNEWID', // Change this
    enabled: true
  },
  // ...
};
```

#### Method 2: Use environment variables
```bash
# For static page generation
GTM_CONTAINER_ID=GTM-YOURNEWID node scripts/generate-static-pages.js

# For template updates
GTM_CONTAINER_ID=GTM-YOURNEWID node scripts/update-templates.js

# Disable GTM entirely
GTM_ENABLED=false node scripts/generate-static-pages.js
```

### Updating Domain
```bash
# Change domain via environment variable
SITE_DOMAIN=yourdomain.com node scripts/generate-static-pages.js
```

### Build Process

1. **Update Templates**: Run `node scripts/update-templates.js` to update the main HTML templates with current config
2. **Generate Static Pages**: Run `node scripts/generate-static-pages.js` to generate landing pages with current config

### Environment Variables

The following environment variables can override config settings:

- `GTM_CONTAINER_ID` - Override GTM container ID
- `GTM_ENABLED` - Set to 'false' to disable GTM
- `SITE_DOMAIN` - Override site domain

## Template System

Templates use placeholders that get replaced during build:

- `<!-- GTM_HEAD_PLACEHOLDER -->...<!-- /GTM_HEAD_PLACEHOLDER -->` - GTM head script
- `<!-- GTM_BODY_PLACEHOLDER -->...<!-- /GTM_BODY_PLACEHOLDER -->` - GTM body script  
- `{{SITE_TITLE}}` - Site title
- `{{SITE_NAME}}` - Site name

## Examples

```bash
# Change GTM ID and regenerate everything
GTM_CONTAINER_ID=GTM-NEWORG123 node scripts/update-templates.js
GTM_CONTAINER_ID=GTM-NEWORG123 node scripts/generate-static-pages.js

# Use different domain for staging
SITE_DOMAIN=staging.measuresai.com node scripts/generate-static-pages.js

# Disable GTM for development
GTM_ENABLED=false node scripts/update-templates.js
```
