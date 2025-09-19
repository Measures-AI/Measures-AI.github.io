#!/usr/bin/env node

/**
 * Node.js-specific page configuration loader for build scripts and testing
 * This file is separate from the main pageLoader.js to avoid browser compatibility issues
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load page configurations by scanning the filesystem (Node.js only)
 */
async function loadPageConfigsFromFilesystem() {
  const configs = {};
  const pagesDir = path.join(__dirname, 'pages');
  
  if (!fs.existsSync(pagesDir)) {
    console.warn('Pages directory not found:', pagesDir);
    return configs;
  }
  
  // Recursively scan for .js files
  async function scanDirectory(dir, relativePath = '') {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Recursively scan subdirectories
        await scanDirectory(fullPath, path.join(relativePath, item));
      } else if (item.endsWith('.js') && !item.startsWith('.') && item !== 'README.md') {
        // Import the module
        try {
          const modulePath = path.resolve(fullPath);
          const module = await import(`file://${modulePath}`);
          
          // Skip files that don't have the required exports
          if (!module.slug || !module.config) {
            console.warn(`Page config file ${fullPath} is missing required exports (slug, config)`);
            continue;
          }
          
          // Validate slug format
          if (typeof module.slug !== 'string' || !module.slug.trim()) {
            console.warn(`Page config file ${fullPath} has invalid slug:`, module.slug);
            continue;
          }
          
          const slug = module.slug.trim();
          
          // Check for duplicate slugs
          if (configs[slug]) {
            console.warn(`Duplicate slug "${slug}" found in ${fullPath}. Previous definition will be overwritten.`);
          }
          
          // Store the configuration
          configs[slug] = module.config;
          
          console.log(`Loaded page config: ${slug} from ${relativePath}/${item}`);
        } catch (error) {
          console.error(`Error loading page config from ${fullPath}:`, error);
        }
      }
    }
  }
  
  await scanDirectory(pagesDir);
  return configs;
}

/**
 * Test the page loading system (Node.js only)
 */
export async function testPageLoader() {
  console.log('🧪 Testing page configuration loader...\n');
  
  try {
    const configs = await loadPageConfigsFromFilesystem();
    const slugs = Object.keys(configs);
    
    console.log(`\n📊 Results:`);
    console.log(`   Total configurations loaded: ${slugs.length}`);
    console.log(`   Available slugs: ${slugs.join(', ')}\n`);
    
    // Test a specific config
    if (configs['head-of-support-retail']) {
      console.log('✅ Sample config test passed');
      console.log(`   Role: ${configs['head-of-support-retail'].role}`);
      console.log(`   Headline: ${configs['head-of-support-retail'].headline}`);
    } else {
      console.log('❌ Sample config test failed');
    }
    
    return { configs, slugs };
  } catch (error) {
    console.error('❌ Test failed:', error);
    throw error;
  }
}

// If run directly, execute the test
if (import.meta.url === `file://${process.argv[1]}`) {
  testPageLoader().catch(console.error);
} 