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
  'head-of-support-retail': {
    role: 'Head of Support',
    industry: 'B2C Retail',
    themeColor: '#7ecbff',
    headline: 'What\'s your problem?',
    story: 'NPS gives you a score, not the “why”. Find your why and put a price on it, so support drives your decision-making.',
    points: [
      { text: 'Integrate with most communication platforms', icon: 'plug' },
      { text: 'Spot and value your biggest problems', icon: 'search-dollar' },
      { text: 'Get reports weekly, monthly, and quarterly', icon: 'chart-line' },
    ],
    belowPoints: 'Stop reading transcripts, start reading results.',
    fields: [
      { title: 'name', type: 'text', placeholder: 'Your name' },
      { title: 'company', type: 'text', placeholder: 'Your company' },
      { title: 'email', type: 'email', placeholder: 'Your email' },
    ],
    cta: 'Schedule a demo',
    demoData: {
      title: 'Battery life contributed to $36,434 in Q2 churn.',
      subtext: '232 users\' subscriptions lapsed after complaining to support, 14% of users who did so.',
      bullets: [
        'This represents a 2x increase in battery-related complaints from Q1.',
        'This is the most common complaint brought up, and will likely lead to $54,651 in Q3 churn.'
      ],
      data: { type: 'bar', values: [
        { name: 'Q1', value: 30 },
        { name: 'Q2', value: 42 },
        { name: 'Q3', value: 60 },
        { name: 'Q4', value: 85 }
      ] },
      leftText: 'A real customer result',
    },
    logos: [
      { image: '/external-logos/zendesk.png', alt: 'Zendesk' },
      { image: '/external-logos/slack.png', alt: 'Slack' },
      { image: '/external-logos/zapier.png', alt: 'Zapier' },
      { image: '/external-logos/teams.png', alt: 'Teams' },
      { image: '/external-logos/gmail.png', alt: 'Gmail' },
      { image: '/external-logos/outlook.png', alt: 'Outlook' },
      { image: '/external-logos/activecampaign.png', alt: 'ActiveCampaign' },
      { image: '/external-logos/gong.png', alt: 'Gong' },
      { image: '/external-logos/chorus.png', alt: 'Chorus' },
      { image: '/external-logos/twilio.png', alt: 'Twilio' },
      { image: '/external-logos/salesforce.png', alt: 'Salesforce' },
      { image: '/external-logos/hubspot.png', alt: 'HubSpot' },
      { image: '/external-logos/pipedrive.png', alt: 'Pipedrive' },
      { image: '/external-logos/netsuite.png', alt: 'NetSuite' },
      { image: '/external-logos/zoho.png', alt: 'Zoho' },
    ],
    typedSections: [
      {
        type: 'process',
        title: 'Get Results in 24 Hours',
        subtitle: 'And in only one meeting.',
        items: [
          { title: 'Step 1: Establish connections', text: '"It was amazing how seamless the integration meeting was. Everything was ready to go." - Bob, IT Director', image: '/platform-graphic.svg' },
          { title: 'Step 2: Provide company context', text: '"They only needed a list of terms and a couple of questions to get us going." - James, CEO', image: '/data-graphic.svg' },
          { title: 'Step 3: Get your insights', text: '"Half the questions we\'ve been arguing about for months were answered the next day." - Emily, CMO', image: '/insights-graphic.svg' },
        ],
        mobile: true,
      },
      {
        type: 'caseStudy',
        leftImage: '/boardroom.png',
        logoImage: '/external-logos/slack.png',
        logoAlt: 'Slack',
        headline: 'SusieCakes reduced the cost of support by 30%.',
        story: 'SusieCakes used our platform to identify key pain points and improve the customer experience. Everything was broken down by product and location automatically. The CEO used our dashboard to make decisions with the company\'s board.',
        quote: '“It is now essential to the way our customer support team operates daily, and the way our company makes decisions.” - Chad Kilpatrick, CFO',
        link: "https://www.susiecakes.com/",
        mobile: true,
      },
      {
        type: 'featureRows',
        title: 'Peace of mind without the spreadsheet',
        rows: [
          { image: '/boardroom.png', title: 'SOC 2 Compliance', text: 'Data is stored in a secure, single-tenant, isolated environment.' },
          { image: '/boardroom.png', title: 'Secure Connections', text: 'Connections are established with secure credentials and are encrypted in transit.' },
          { image: '/boardroom.png', title: 'Data Lineage', text: 'We track the data from source to destination, so you can see exactly where it came from and where it went.' },
        ],
        mobile: false,
      },
      {
        type: 'quote',
        text: '“It is now essential to the way our customer support team operates daily, and the way our company makes decisions.”',
        author: 'Chad Kilpatrick',
        role: 'CFO',
        mobile: false,
      },
    ],
    bottomCta: {
      title: 'Get your support pipeline in black and white.',
      copy: 'Schedule a demo to see how our platform can help you.',
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
  const base = exampleConfigs[slug] || exampleConfigs['head-of-support-retail'];
  return buildConfig(base, {
    role: query.role,
    industry: query.industry,
    utmSource: query.utmSource,
    utmCampaign: query.utmCampaign,
  });
}
