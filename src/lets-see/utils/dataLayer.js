/**
 * Data Layer utility functions for GTM tracking
 */

/**
 * Generate a unique lead ID
 * @returns {string} Unique lead ID in format LEAD-{uuid}
 */
export function generateLeadId() {
  // Use crypto.randomUUID() if available, otherwise fallback to custom UUID
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `LEAD-${crypto.randomUUID()}`;
  }
  
  // Fallback UUID generation for older browsers
  return `LEAD-${generateFallbackUUID()}`;
}

/**
 * Generate a fallback UUID for browsers that don't support crypto.randomUUID()
 * @returns {string} UUID string
 */
function generateFallbackUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Parse UTM parameters and GCLID from URL
 * @param {string} search - URL search string (window.location.search)
 * @returns {object} Object containing UTM parameters and GCLID
 */
export function parseAttributionData(search = window.location.search) {
    const params = new URLSearchParams(search);
    return {
        gclid: params.get('gclid') || null,
        utm_source: params.get('utm_source') || null,
        utm_medium: params.get('utm_medium') || null,
        utm_campaign: params.get('utm_campaign') || null,
        utm_term: params.get('utm_term') || null,
        utm_content: params.get('utm_content') || null,
        utm_h1: params.get('utm_h1') || null,
        utm_sub: params.get('utm_sub') || null,
        utm_cta: params.get('utm_cta') || null,
    };
}

/**
 * Get page information for tracking
 * @returns {object} Page information object
 */
export function getPageInfo() {
    return {
        url: window.location.href,
        path: window.location.pathname,
        title: document.title,
    };
}

/**
 * Push lead data to GTM data layer
 * @param {object} options - Lead tracking options
 * @param {string} options.leadType - Type of lead (e.g., 'Demo Request', 'Contact', 'Pricing')
 * @param {object} options.userData - User form data (email, name, etc.)
 * @param {object} options.formData - Form metadata (id, name, variant)
 * @param {number} options.value - Estimated value of the lead (default: 100)
 * @param {string} options.currency - Currency code (default: 'USD')
 * @param {object} options.pageConfig - Page configuration object
 * @param {function} options.callback - Optional callback function to execute after dataLayer push
 * @param {number} options.timeout - Timeout in milliseconds for callback execution (default: 2000)
 */
export function pushLeadToDataLayer({
  leadType = 'Demo Request',
  userData = {},
  formData = {},
  value = 100,
  currency = 'USD',
  pageConfig = {},
  callback = null,
  timeout = 2000
}) {
  try {
    // Ensure dataLayer exists
    window.dataLayer = window.dataLayer || [];
    
    const leadId = generateLeadId();
    const attribution = parseAttributionData();
    const pageInfo = getPageInfo();
    
    // Split name into first_name and last_name if provided as single field
    let firstName = userData.first_name || '';
    let lastName = userData.last_name || '';
    
    if (userData.name && !firstName && !lastName) {
      const nameParts = userData.name.trim().split(' ');
      firstName = nameParts[0] || '';
      lastName = nameParts.slice(1).join(' ') || '';
    }
    
    const dataLayerEvent = {
      event: 'lead',
      lead_id: leadId,
      lead_type: leadType,
      value: value,
      currency: currency,
      user_data: {
        email: userData.email || '',
        first_name: firstName,
        last_name: lastName,
        company: userData.company || '',
        // Add any additional user fields
        ...Object.keys(userData).reduce((acc, key) => {
          if (!['name', 'email', 'company', 'first_name', 'last_name'].includes(key)) {
            acc[key] = userData[key];
          }
          return acc;
        }, {})
      },
      form: {
        id: formData.id || 'lead-form',
        name: formData.name || pageConfig.slug || 'unknown',
        variant: formData.variant || 'A',
        role: pageConfig.role || '',
        industry: pageConfig.industry || '',
        // Include UTM overrides in form data
        utm_h1: attribution.utm_h1,
        utm_sub: attribution.utm_sub,
        utm_cta: attribution.utm_cta,
        ...formData
      },
      page: pageInfo,
      attribution: attribution
    };
    
    // Push to dataLayer
    window.dataLayer.push(dataLayerEvent);
    
    // Also log for debugging (remove in production if needed)
    console.log('DataLayer Lead Event:', dataLayerEvent);
    
    // Execute callback after a brief delay to allow GTM to process
    if (callback && typeof callback === 'function') {
      // Set up timeout fallback
      const timeoutId = setTimeout(() => {
        console.warn('DataLayer callback timeout reached, executing callback anyway');
        callback();
      }, timeout);
      
      // Try to detect when GTM has processed the event
      // We'll use a small delay to allow GTM to process, then clear timeout and execute callback
      setTimeout(() => {
        clearTimeout(timeoutId);
        callback();
      }, 100); // Small delay to allow GTM processing
    }
    
    return dataLayerEvent;
  } catch (error) {
    console.error('Error pushing to data layer:', error);
    
    // Execute callback even if dataLayer push failed
    if (callback && typeof callback === 'function') {
      setTimeout(callback, 100);
    }
    
    // Return a minimal event object so the form submission can continue
    return {
      event: 'lead',
      lead_id: `LEAD-fallback-${Date.now()}`,
      error: true
    };
  }
}

/**
 * Apply UTM parameter overrides to page configuration
 * @param {object} config - Original page configuration
 * @param {string} search - URL search string (window.location.search)
 * @returns {object} Page configuration with UTM overrides applied
 */
export function applyUtmOverrides(config, search = window.location.search) {
    const attribution = parseAttributionData(search);
    
    // Create a copy of the config to avoid mutating the original
    const updatedConfig = { ...config };
    
    // Override headline if utm_h1 is present
    if (attribution.utm_h1) {
        updatedConfig.headline = decodeURIComponent(attribution.utm_h1);
    }
    
    // Override story if utm_sub is present
    if (attribution.utm_sub) {
        updatedConfig.story = decodeURIComponent(attribution.utm_sub);
    }
    
    // Override CTA if utm_cta is present
    if (attribution.utm_cta) {
        updatedConfig.cta = decodeURIComponent(attribution.utm_cta);
    }
    
    return updatedConfig;
}

/**
 * Add attribution data to form submission payload
 * @param {object} formData - Original form data
 * @param {string} formLocation - Optional form location identifier
 * @returns {object} Form data with attribution fields added
 */
export function addAttributionToForm(formData, formLocation = null) {
    const attribution = parseAttributionData();

    return {
        ...formData,
        ...(formLocation && { form_location: formLocation }), // Add form location if provided
        gclid: attribution.gclid,
        utm_source: attribution.utm_source,
        utm_medium: attribution.utm_medium,
        utm_campaign: attribution.utm_campaign,
        utm_term: attribution.utm_term,
        utm_content: attribution.utm_content,
        utm_h1: attribution.utm_h1,
        utm_sub: attribution.utm_sub,
        utm_cta: attribution.utm_cta,
    };
}

/**
 * Get lead type based on page configuration
 * @param {object} pageConfig - Page configuration object
 * @returns {string} Lead type string
 */
export function getLeadType(pageConfig) {
    // Check if tracking config has a specific lead type
    if (pageConfig.tracking && pageConfig.tracking.leadType) {
        return pageConfig.tracking.leadType;
    }

    // Fallback to CTA-based logic
    if (pageConfig.cta && pageConfig.cta.toLowerCase().includes('demo')) {
        return 'Demo Request';
    }
    if (pageConfig.cta && pageConfig.cta.toLowerCase().includes('contact')) {
        return 'Contact';
    }
    if (pageConfig.cta && pageConfig.cta.toLowerCase().includes('pricing')) {
        return 'Pricing Request';
    }
    return 'Lead';
}

/**
 * Get estimated lead value based on page configuration
 * @param {object} pageConfig - Page configuration object
 * @returns {number} Estimated lead value
 */
export function getLeadValue(pageConfig) {
    // Check if tracking config has a specific lead value
    if (pageConfig.tracking && pageConfig.tracking.leadValue) {
        return pageConfig.tracking.leadValue;
    }

    // Fallback to environment variable or default
    const defaultValue = import.meta.env.VITE_DEFAULT_LEAD_VALUE || 100;
    return parseInt(defaultValue, 10);
}

/**
 * Get form variant based on page configuration
 * @param {object} pageConfig - Page configuration object
 * @returns {string} Form variant string
 */
export function getFormVariant(pageConfig) {
    if (pageConfig.tracking && pageConfig.tracking.formVariant) {
        return pageConfig.tracking.formVariant;
    }
    return 'A';
}
