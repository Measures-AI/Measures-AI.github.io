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
    story: 'This $100k bug cost $10k to fix. Because data triage took hours, not days. Finance flagged the anomaly before it spiraled—root cause was traced in minutes, not weeks.',
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
    sections: [
      {
        title: 'Your board will ask sooner or later',
        copy: 'Get to ARR, NRR, gross margin, and burn multiples with confidence. No more CSV gymnastics.',
        cards: [
          { image: '/public/platform-graphic.svg', title: 'ARR & Cohorts', text: 'Instant cohort and retention views by plan, segment, and region.' },
          { image: '/public/measurement-graphic.svg', title: 'Forecasting', text: 'Scenario-based outlooks for hiring, runway, and growth investments.' },
          { image: '/public/insights-graphic.svg', title: 'Data Lineage', text: 'See exactly how a KPI was calculated and by which source.' },
        ],
      },
    ],
    problems: [
      { title: 'Spreadsheet sprawl', text: 'Critical metrics live in ad-hoc models that break easily.' },
      { title: 'Slow close cycles', text: 'Month-end takes too long to turn into decision-ready insights.' },
      { title: 'Audit anxiety', text: 'Explainability gaps create risk with investors and auditors.' },
    ],
    solutions: [
      { image: '/public/data-graphic.svg', title: 'Unified sources', text: 'ERP, CRM, billing, and product usage stitched and deduped.' },
      { image: '/public/platform.svg', title: 'Metrics as code', text: 'Standardized, versioned KPIs you can trust release after release.' },
      { image: '/public/insights-graphic.svg', title: 'Proactive alerts', text: 'Get notified when anomalies cross thresholds you define.' },
    ],
    integrations: [
      { image: '/public/external-logos/salesforce.png', title: 'Salesforce', text: 'Pipeline and bookings synced daily.' },
      { image: '/public/external-logos/netsuite.png', title: 'NetSuite', text: 'GL and subledgers mapped to metrics.' },
      { image: '/public/external-logos/snowflake.png', title: 'Snowflake', text: 'Warehouse-native models where you need them.' },
    ],
    testimonials: [
      { text: 'We cut our board prep from a week to a day.', author: 'Alex M.', role: 'VP Finance' },
      { text: 'For the first time, growth and finance speak the same numbers.', author: 'Priya K.', role: 'CFO' },
    ],
    useCases: [
      { title: 'Board & investor packages', text: 'Repeatable monthly/quarterly packs with drill-through detail.' },
      { title: 'MRR/ARR anomaly detection', text: 'Prevent revenue surprises with automated checks.' },
      { title: 'Headcount planning', text: 'Link hiring plans to runway and efficiency goals.' },
    ],
    faqs: [
      { q: 'How do you handle data quality?', a: 'We apply schema validation, dedupe, and lineage to every metric.' },
      { q: 'How long to deploy?', a: 'Initial value in days, with full rollout in weeks.' },
    ],
    bottomCta: {
      title: 'Ready to accelerate your next board meeting?',
      copy: 'See ARR, NRR, and burn insights based on your real data flows.'
    },
  },
  'head-of-support-retail': {
    slug: 'head-of-support-retail',
    role: 'Head of Support',
    industry: 'B2C Retail',
    headline: 'Happier customers, faster resolutions',
    subheadline: 'Measure response times, deflection, and CSAT across every channel.',
    story: 'This report reached the boardroom. A single queue view highlighted delays in social DMs. The fix cut first response by 40%—and churn followed.',
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
    sections: [
      {
        title: 'One view across channels',
        copy: 'Stop hopping tools. See every conversation in one place with real-time health.',
        cards: [
          { image: '/public/platform-graphic.svg', title: 'Omnichannel', text: 'Chat, email, social, SMS—one queue, shared SLAs.' },
          { image: '/public/measurement-graphic.svg', title: 'Deflection', text: 'Find the top intents to automate with workflows and help center.' },
          { image: '/public/insights-graphic.svg', title: 'Quality', text: 'Coach with evidence—QA rubrics, macros, and outcomes in one view.' },
        ],
      },
    ],
    problems: [
      { title: 'Fragmented tooling', text: 'Different platforms hide the end-to-end journey.' },
      { title: 'Inconsistent SLAs', text: 'Peaks overwhelm teams and breach targets.' },
      { title: 'Blind spots', text: 'Leaders can’t see where deflection works—or fails.' },
    ],
    solutions: [
      { image: '/public/data-graphic.svg', title: 'Routing analytics', text: 'Measure handle time, reassigns, and backlog by team.' },
      { image: '/public/platform.svg', title: 'Intent analytics', text: 'Identify high-volume topics perfect for automation.' },
      { image: '/public/insights-graphic.svg', title: 'SLA guardrails', text: 'Heads-up alerts when queues spike in real time.' },
    ],
    integrations: [
      { image: '/public/external-logos/zendesk.png', title: 'Zendesk', text: 'Tickets, tags, and CSAT synced.' },
      { image: '/public/external-logos/slack.png', title: 'Slack', text: 'Notify channels on SLA risks.' },
      { image: '/public/external-logos/powerbi.png', title: 'Power BI', text: 'Share performance with leadership.' },
    ],
    testimonials: [
      { text: 'Queues finally feel predictable. We plan staffing with confidence.', author: 'Sofia R.', role: 'Director of CX' },
      { text: 'We caught a spike in returns early and saved a promo.', author: 'Ethan L.', role: 'Head of Support' },
    ],
    useCases: [
      { title: 'Holiday surge readiness', text: 'Forecast and prepare with confidence.' },
      { title: 'Self-serve optimization', text: 'Lift deflection without hurting CSAT.' },
      { title: 'Team coaching', text: 'Spot trends, intervene earlier, celebrate wins.' },
    ],
    faqs: [
      { q: 'Which channels are supported?', a: 'Email, chat, social, SMS, and more via connectors.' },
      { q: 'How do you handle privacy?', a: 'PII is masked, and access controls are role-based.' },
    ],
    bottomCta: {
      title: 'Give your team time back this quarter',
      copy: 'Walk through your queues and see where to automate first.'
    },
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
