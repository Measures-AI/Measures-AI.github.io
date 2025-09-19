/**
 * Google Tag Manager helper functions
 */

import { buildConfig } from './build.js';

/**
 * Generate the GTM head script tag
 * @param {string} containerId - GTM container ID (optional, uses config default)
 * @returns {string} GTM head script HTML
 */
export function generateGTMHeadScript(containerId = buildConfig.gtm.containerId) {
  if (!buildConfig.gtm.enabled || !containerId) {
    return '<!-- Google Tag Manager disabled -->';
  }
  
  return `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${containerId}');</script>
<!-- End Google Tag Manager -->`;
}

/**
 * Generate the GTM noscript tag for body
 * @param {string} containerId - GTM container ID (optional, uses config default)
 * @returns {string} GTM noscript HTML
 */
export function generateGTMBodyScript(containerId = buildConfig.gtm.containerId) {
  if (!buildConfig.gtm.enabled || !containerId) {
    return '<!-- Google Tag Manager noscript disabled -->';
  }
  
  return `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${containerId}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`;
}

/**
 * Generate both GTM scripts as an object
 * @param {string} containerId - GTM container ID (optional, uses config default)
 * @returns {object} Object with headScript and bodyScript properties
 */
export function generateGTMScripts(containerId = buildConfig.gtm.containerId) {
  return {
    headScript: generateGTMHeadScript(containerId),
    bodyScript: generateGTMBodyScript(containerId)
  };
}
