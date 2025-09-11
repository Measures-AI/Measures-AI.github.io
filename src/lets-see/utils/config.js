import { getAllConfigs } from './pageLoader.js';

export function parseQuery(search) {
  const params = new URLSearchParams(search || '');
  return {
    role: params.get('role') || undefined,
    industry: params.get('industry') || undefined,
    utmSource: params.get('utm_source') || undefined,
    utmCampaign: params.get('utm_campaign') || undefined,
  };
}

// Load all configurations dynamically from page files
export const configs = getAllConfigs();

export function buildConfig(base, overrides) {
  return {
    ...base,
    ...overrides,
    role: overrides.role || base.role,
    industry: overrides.industry || base.industry,
  };
}

export function getLandingConfigFromPath(pathname, search) {
  const parts = (pathname || '/').split('/').filter(Boolean);
  const root = parts[0];
  const slug = parts[1];
  const query = parseQuery(search);

  if (root !== 'lets-see') {
    // For non-lets-see paths, return a special flag to indicate 404
    return { isNotFound: true };
  }
  
  // If no slug is provided, redirect to root
  if (!slug) {
    window.location.href = '/';
    return null;
  }
  
  // Check if the slug exists in our configs
  if (!configs[slug]) {
    // Invalid lets-see slug should redirect to home
    window.location.href = '/';
    return null;
  }
  
  const base = configs[slug];
  return buildConfig(base, {
    role: query.role,
    industry: query.industry,
    utmSource: query.utmSource,
    utmCampaign: query.utmCampaign,
  });
}
