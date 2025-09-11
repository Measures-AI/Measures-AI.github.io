/**
 * Dynamic page configuration loader for browser environments
 * 
 * This module automatically discovers and loads all page configuration files
 * from the pages directory using Vite's import.meta.glob feature.
 */

/**
 * Load all page configurations using Vite's glob import
 * @returns {Object} Object with slug as key and config as value
 */
function loadPageConfigs() {
  // Use Vite's glob import to get all .js files in the pages directory
  const modules = import.meta.glob('./pages/**/*.js', { eager: true });
  
  const configs = {};
  
  for (const path in modules) {
    const module = modules[path];
    
    // Skip files that don't have the required exports
    if (!module.slug || !module.config) {
      console.warn(`Page config file ${path} is missing required exports (slug, config)`);
      continue;
    }
    
    // Validate slug format
    if (typeof module.slug !== 'string' || !module.slug.trim()) {
      console.warn(`Page config file ${path} has invalid slug:`, module.slug);
      continue;
    }
    
    const slug = module.slug.trim();
    
    // Check for duplicate slugs
    if (configs[slug]) {
      console.warn(`Duplicate slug "${slug}" found in ${path}. Previous definition will be overwritten.`);
    }
    
    // Store the configuration
    configs[slug] = module.config;
    
    // Log successful load in development
    if (import.meta.env?.DEV) {
      console.log(`Loaded page config: ${slug} from ${path}`);
    }
  }
  
  return configs;
}

// Cache the configs to avoid reloading
let configsCache = null;

/**
 * Get all available page configurations
 * @returns {Object} Object with slug as key and config as value
 */
export function getAllConfigs() {
  if (!configsCache) {
    configsCache = loadPageConfigs();
  }
  return configsCache;
}

/**
 * Get a specific page configuration by slug
 * @param {string} slug - The page slug to retrieve
 * @returns {Object|null} The page configuration or null if not found
 */
export function getConfigBySlug(slug) {
  const configs = getAllConfigs();
  return configs[slug] || null;
}

/**
 * Get all available slugs
 * @returns {string[]} Array of all available slugs
 */
export function getAllSlugs() {
  const configs = getAllConfigs();
  return Object.keys(configs);
}

/**
 * Check if a slug exists
 * @param {string} slug - The slug to check
 * @returns {boolean} True if the slug exists
 */
export function slugExists(slug) {
  const configs = getAllConfigs();
  return slug in configs;
}

// Alias for backward compatibility
export const getAllConfigsSync = getAllConfigs; 