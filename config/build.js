/**
 * Build configuration for the website
 * This file contains settings that are used during the build process
 */

export const buildConfig = {
  // Google Tag Manager configuration
  gtm: {
    containerId: 'GTM-MXKGFHFS',
    enabled: true
  },
  
  // Domain configuration
  domain: 'measuresai.com',
  
  // Site metadata
  site: {
    name: 'Measures AI',
    title: 'Measures AI - Measure Everything',
    description: 'Turn customer conversations into actionable insights with Measures AI.'
  },
  
  // Build settings
  build: {
    generateSourceMaps: false,
    minify: true
  }
};

// Environment variable overrides
if (process.env.GTM_CONTAINER_ID) {
  buildConfig.gtm.containerId = process.env.GTM_CONTAINER_ID;
}

if (process.env.SITE_DOMAIN) {
  buildConfig.domain = process.env.SITE_DOMAIN;
}

if (process.env.GTM_ENABLED === 'false') {
  buildConfig.gtm.enabled = false;
}
