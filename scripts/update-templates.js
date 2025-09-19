#!/usr/bin/env node

/**
 * Update HTML templates with build configuration
 * This script replaces placeholders in templates with actual values from build config
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildConfig } from '../config/build.js';
import { generateGTMScripts } from '../config/gtm.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '..');
const sourceTemplate = path.join(rootDir, 'index.html');
const distTemplate = path.join(rootDir, 'dist/index.html');

/**
 * Replace template placeholders with actual values
 */
function processTemplate(templateContent) {
  const gtmScripts = generateGTMScripts();
  
  return templateContent
    // Replace GTM placeholders
    .replace(/<!-- GTM_HEAD_PLACEHOLDER -->[\s\S]*?<!-- \/GTM_HEAD_PLACEHOLDER -->/, gtmScripts.headScript)
    .replace(/<!-- GTM_BODY_PLACEHOLDER -->[\s\S]*?<!-- \/GTM_BODY_PLACEHOLDER -->/, gtmScripts.bodyScript)
    // Replace site title placeholder
    .replace(/{{SITE_TITLE}}/g, buildConfig.site.title)
    .replace(/{{SITE_NAME}}/g, buildConfig.site.name);
}

/**
 * Update a template file
 */
function updateTemplate(templatePath) {
  if (!fs.existsSync(templatePath)) {
    console.warn(`Template not found: ${templatePath}`);
    return false;
  }
  
  const content = fs.readFileSync(templatePath, 'utf8');
  const processedContent = processTemplate(content);
  
  // Only write if content changed
  if (content !== processedContent) {
    fs.writeFileSync(templatePath, processedContent);
    console.log(`Updated: ${templatePath}`);
    return true;
  } else {
    console.log(`No changes needed: ${templatePath}`);
    return false;
  }
}

/**
 * Main function
 */
function main() {
  console.log('🔄 Updating templates with build configuration...\n');
  
  console.log(`GTM Container ID: ${buildConfig.gtm.containerId}`);
  console.log(`GTM Enabled: ${buildConfig.gtm.enabled}`);
  console.log(`Domain: ${buildConfig.domain}`);
  console.log(`Site Name: ${buildConfig.site.name}\n`);
  
  let updated = 0;
  
  // Update source template
  if (updateTemplate(sourceTemplate)) {
    updated++;
  }
  
  // Update dist template if it exists
  if (updateTemplate(distTemplate)) {
    updated++;
  }
  
  console.log(`\n✅ Template update complete. ${updated} file(s) updated.`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { processTemplate, updateTemplate };
