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
 */
export function pushLeadToDataLayer({
  leadType = 'Demo Request',
  userData = {},
  formData = {},
  value = 100,
  currency = 'USD',
  pageConfig = {}
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
        ...formData
      },
      page: pageInfo,
      attribution: attribution
    };
    
    // Push to dataLayer
    window.dataLayer.push(dataLayerEvent);
    
    // Also log for debugging (remove in production if needed)
    console.log('DataLayer Lead Event:', dataLayerEvent);
    
    return dataLayerEvent;
  } catch (error) {
    console.error('Error pushing to data layer:', error);
    // Return a minimal event object so the form submission can continue
    return {
      event: 'lead',
      lead_id: `LEAD-fallback-${Date.now()}`,
      error: true
    };
  }
}

/**
 * Add attribution data to form submission payload
 * @param {object} formData - Original form data
 * @returns {object} Form data with attribution fields added
 */
export function addAttributionToForm(formData) {
    const attribution = parseAttributionData();

    return {
        ...formData,
        gclid: attribution.gclid,
        utm_source: attribution.utm_source,
        utm_medium: attribution.utm_medium,
        utm_campaign: attribution.utm_campaign,
        utm_term: attribution.utm_term,
        utm_content: attribution.utm_content,
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
