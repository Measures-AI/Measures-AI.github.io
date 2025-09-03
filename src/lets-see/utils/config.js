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
    headline: 'Find $100k bugs that cost $10k to fix.',
    // subheadline: 'Automate metrics, reduce manual reporting, and accelerate board readiness.',
    story: 'Because data triage took hours, not days. Finance flagged the anomaly before it spiraled—root cause was traced in minutes, not weeks.',
    cta: 'Request a demo on your data',
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
    typedSections: [
      {
        type: 'benefits3',
        title: 'Numbers you can defend',
        subtitle: 'Be board-ready every month—without spreadsheets.',
        items: [
          { title: 'ARR you can trust', text: 'Cohorts, expansions, and downgrades tracked precisely.' },
          { title: 'Forecasting clarity', text: 'What-if scenarios on revenue and runway.' },
          { title: 'Audit trail', text: 'Lineage and definitions for every KPI.' },
        ],
      },
      {
        type: 'featureRows',
        title: 'From question to answer',
        subtitle: 'Investigate anomalies with traceable lineage.',
        rows: [
          { image: '/insights-graphic.svg', title: 'Drill into segments', text: 'Spot which region or plan moved your NRR.' },
          { image: '/measurement-graphic.svg', title: 'Standard metric definitions', text: 'No more “which spreadsheet is right?” debates.' },
        ],
      },
      {
        type: 'logoCloud',
        title: 'Connect your stack',
        subtitle: 'ERP, CRM, billing, and warehouse ready.',
        logos: [
          '/external-logos/salesforce.png',
          '/external-logos/netsuite.png',
          '/external-logos/snowflake.png',
          '/external-logos/powerbi.png',
          '/external-logos/zapier.png',
          '/external-logos/slack.png',
        ],
      },
      {
        type: 'quote',
        text: 'We cut our board prep from a week to a day.',
        author: 'Alex M.',
        role: 'VP Finance',
      },
      {
        type: 'centeredForm',
        title: 'See your finance metrics in hours',
        subtitle: 'We’ll tailor a walkthrough to your sources and model.',
      },
    ],
    sections: [
      {
        title: 'Your board will ask sooner or later',
        copy: 'Get to ARR, NRR, gross margin, and burn multiples with confidence. No more CSV gymnastics.',
        cards: [
          { image: '/platform-graphic.svg', title: 'ARR & Cohorts', text: 'Instant cohort and retention views by plan, segment, and region.' },
          { image: '/measurement-graphic.svg', title: 'Forecasting', text: 'Scenario-based outlooks for hiring, runway, and growth investments.' },
          { image: '/insights-graphic.svg', title: 'Data Lineage', text: 'See exactly how a KPI was calculated and by which source.' },
        ],
      },
    ],
    problems: [
      { title: 'Spreadsheet sprawl', text: 'Critical metrics live in ad-hoc models that break easily.' },
      { title: 'Slow close cycles', text: 'Month-end takes too long to turn into decision-ready insights.' },
      { title: 'Audit anxiety', text: 'Explainability gaps create risk with investors and auditors.' },
    ],
    solutions: [
      { image: '/data-graphic.svg', title: 'Unified sources', text: 'ERP, CRM, billing, and product usage stitched and deduped.' },
      { image: '/platform.svg', title: 'Metrics as code', text: 'Standardized, versioned KPIs you can trust release after release.' },
      { image: '/insights-graphic.svg', title: 'Proactive alerts', text: 'Get notified when anomalies cross thresholds you define.' },
    ],
    integrations: [
      { image: '/external-logos/salesforce.png', title: 'Salesforce', text: 'Pipeline and bookings synced daily.' },
      { image: '/external-logos/netsuite.png', title: 'NetSuite', text: 'GL and subledgers mapped to metrics.' },
      { image: '/external-logos/snowflake.png', title: 'Snowflake', text: 'Warehouse-native models where you need them.' },
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
    headline: 'This report reached the boardroom.',
    // subheadline: 'Measure response times, deflection, and CSAT across every channel.',
    story: 'A single queue view highlighted delays in social DMs. The fix cut first response by 40%—and churn followed.',
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
    typedSections: [
      {
        type: 'benefits3',
        title: 'Get ahead of the queue',
        subtitle: 'Real-time health and deflection insights.',
        items: [
          { title: 'One queue', text: 'Chat, email, social, SMS—all in one view.' },
          { title: 'Deflect smartly', text: 'Automate high-volume intents without hurting CSAT.' },
          { title: 'Coach faster', text: 'QA rubrics with outcomes and examples.' },
        ],
      },
      {
        type: 'featureRows',
        title: 'Visibility without the swivel chair',
        subtitle: 'One place to see what’s working and what’s not.',
        rows: [
          { image: '/platform-graphic.svg', title: 'Omnichannel routing', text: 'Keep SLAs even during spikes.' },
          { image: '/measurement-graphic.svg', title: 'Intent analytics', text: 'Discover what to automate next.' },
        ],
      },
      {
        type: 'logoCloud',
        title: 'Works with your tools',
        subtitle: 'Bring your support stack—no rip-and-replace.',
        logos: [
          '/external-logos/zendesk.png',
          '/external-logos/slack.png',
          '/external-logos/powerbi.png',
          '/external-logos/zapier.png',
          '/external-logos/teams.png',
          '/external-logos/gmail.png',
        ],
      },
      {
        type: 'quote',
        text: 'Queues finally feel predictable. We plan staffing with confidence.',
        author: 'Sofia R.',
        role: 'Director of CX',
      },
      {
        type: 'centeredForm',
        title: 'See your support metrics in hours',
        subtitle: 'We’ll tailor a walkthrough to your channels and data.',
      },
    ],
    problems: [
      { title: 'Fragmented tooling', text: 'Different platforms hide the end-to-end journey.' },
      { title: 'Inconsistent SLAs', text: 'Peaks overwhelm teams and breach targets.' },
      { title: 'Blind spots', text: 'Leaders can’t see where deflection works—or fails.' },
    ],
    solutions: [
      { image: '/data-graphic.svg', title: 'Routing analytics', text: 'Measure handle time, reassigns, and backlog by team.' },
      { image: '/platform.svg', title: 'Intent analytics', text: 'Identify high-volume topics perfect for automation.' },
      { image: '/insights-graphic.svg', title: 'SLA guardrails', text: 'Heads-up alerts when queues spike in real time.' },
    ],
    integrations: [
      { image: '/external-logos/zendesk.png', title: 'Zendesk', text: 'Tickets, tags, and CSAT synced.' },
      { image: '/external-logos/slack.png', title: 'Slack', text: 'Notify channels on SLA risks.' },
      { image: '/external-logos/powerbi.png', title: 'Power BI', text: 'Share performance with leadership.' },
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
