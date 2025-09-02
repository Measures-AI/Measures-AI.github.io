export function parseQuery(search) {
  const params = new URLSearchParams(search || '');
  return {
    role: params.get('role') || undefined,
    industry: params.get('industry') || undefined,
    utmSource: params.get('utm_source') || undefined,
    utmCampaign: params.get('utm_campaign') || undefined,
  };
}

export const exampleConfigs = {
  'cfo-saas': {
    slug: 'cfo-saas',
    role: 'CFO',
    industry: 'B2B SaaS',
    headline: 'Financial clarity for SaaS leaders',
    subheadline: 'Automate metrics, reduce manual reporting, and accelerate board readiness.',
    cta: 'Request your SaaS finance demo',
    demoData: {
      title: 'SaaS Metrics Snapshot',
      bullets: [
        'Net Revenue Retention: 118%',
        'CAC Payback: 9.5 months',
        'Burn Multiple: 0.9',
      ],
      image: '/platform.svg',
    },
    points: [
      'Real-time ARR, churn, and expansion insights',
      'Automated investor-ready dashboards',
      'Reliable, audit-friendly data lineage',
    ],
  },
  'head-of-support-retail': {
    slug: 'head-of-support-retail',
    role: 'Head of Support',
    industry: 'B2C Retail',
    headline: 'Happier customers, faster resolutions',
    subheadline: 'Measure response times, deflection, and CSAT across every channel.',
    cta: 'See retail support analytics',
    demoData: {
      title: 'Support Ops Snapshot',
      bullets: [
        'First Response Time: 1m 42s',
        'CSAT (7d): 94%',
        'Self-Serve Deflection: 23%',
      ],
      image: '/insights-graphic.svg',
    },
    points: [
      'Unify tickets across chat, email, and social',
      'Spot bottlenecks with queue analytics',
      'Automated alerts for SLA breaches',
    ],
  },
};

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
  const slug = parts[1] || 'cfo-saas';
  const query = parseQuery(search);

  if (root !== 'lets-see') {
    return exampleConfigs['cfo-saas'];
  }
  const base = exampleConfigs[slug] || exampleConfigs['cfo-saas'];
  return buildConfig(base, {
    role: query.role,
    industry: query.industry,
    utmSource: query.utmSource,
    utmCampaign: query.utmCampaign,
  });
}
