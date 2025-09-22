/**
 * Data Layer utility functions for GTM tracking
 */

/**
 * Generate a unique lead ID
 * @returns {string} Unique lead ID in format LEAD-{uuid}
 */
export function generateLeadId() {
    return `LEAD-${crypto.randomUUID()}`;
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
    // Ensure dataLayer exists
    window.dataLayer = window.dataLayer || [];

    const leadId = generateLeadId();
    const attribution = parseAttributionData();
    const pageInfo = getPageInfo();

    // Split name into first_name and last_name if provided as single field
    if (userData.name && !firstName && !lastName) {
        const nameParts = userData.name.trim().split(' ');
        firstName = nameParts[0] || '';
        lastName = nameParts.slice(1).join(' ') || '';
    }

    const normEmail = (userData?.email || '').trim().toLowerCase();
    const firstName = (userData?.first_name || userData?.firstName || '').trim();
    const lastName = (userData?.last_name || userData?.lastName || '').trim();
    const company = (userData?.company || '').trim();

    const val = Number(value);
    const curr = (currency || 'USD').toString().toUpperCase();

    // Build user_data dynamically to avoid empty fields
    const user_data = {};
    if (normEmail) user_data.email = normEmail;
    if (firstName) user_data.first_name = firstName;
    if (lastName) user_data.last_name = lastName;
    if (company) user_data.company = company;

    // Pass through any other custom user fields that are truthy
    if (userData && typeof userData === 'object') {
        Object.keys(userData).forEach((key) => {
            if (!['name', 'email', 'company', 'first_name', 'last_name', 'firstName', 'lastName'].includes(key)) {
                const v = userData[key];
                if (v !== undefined && v !== null && v !== '') user_data[key] = v;
            }
        });
    }

    const dataLayerEvent = {
        event: 'lead',
        lead_id: leadId,                 // will map to Ads "Order ID"
        lead_type: leadType || 'lead',
        value: isNaN(val) ? 0 : val,     // Ads expects number; set a sane default if needed
        currency: curr,                  // 'USD'
        user_data,                       // only populated fields
        form: {
            ...formData,                  // (kept at end so explicit props above can be overridden if you intend that)
            id: formData?.id || 'lead-form',
            name: formData?.name || pageConfig?.slug || 'unknown',
            variant: formData?.variant || 'A',
            role: pageConfig?.role || '',
            industry: pageConfig?.industry || '',
        },
        page: pageInfo,                  // { url, path, title } – fine
        attribution                      // { gclid, utm_* } – fine
    };

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(dataLayerEvent);


    // Push to dataLayer
    window.dataLayer.push(dataLayerEvent);

    // Also log for debugging (remove in production if needed)
    console.log('DataLayer Lead Event:', dataLayerEvent);

    return dataLayerEvent;
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
