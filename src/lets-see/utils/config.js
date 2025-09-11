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
    // belowPoints: 'Stop reading transcripts, start reading results.',
    fields: [
      { title: 'name', type: 'text', placeholder: 'Your name' },
      { title: 'company', type: 'text', placeholder: 'Your company' },
      { title: 'email', type: 'email', placeholder: 'Your email' },
    ],
    cta: 'Never read your transcripts again',
    demoData: {
      title: 'Battery life contributed to $36,434 in Q2 churn.',
      subtext: '232 users\' subscriptions lapsed after complaining to support, 14% of users who did so.',
      bullets: [
        'This represents a 2x increase in battery-related complaints from Q1.',
        'This is the most common complaint brought up, and will likely lead to $54,651 in Q3 churn.'
      ],
      data: {
        type: 'bar', values: [
          { name: 'Q1', value: 30 },
          { name: 'Q2', value: 42 },
          { name: 'Q3', value: 60 },
          { name: 'Q4', value: 85 }
        ]
      },
      leftText: 'A real customer result',
    },
    logos: [
      { image: '/img/external-logos/zendesk.png', alt: 'Zendesk' },
      { image: '/img/external-logos/slack.png', alt: 'Slack' },
      { image: '/img/external-logos/zapier.png', alt: 'Zapier' },
      { image: '/img/external-logos/teams.png', alt: 'Teams' },
      { image: '/img/external-logos/gmail.png', alt: 'Gmail' },
      { image: '/img/external-logos/outlook.png', alt: 'Outlook' },
      { image: '/img/external-logos/activecampaign.png', alt: 'ActiveCampaign' },
      { image: '/img/external-logos/gong.png', alt: 'Gong' },
      { image: '/img/external-logos/chorus.png', alt: 'Chorus' },
      { image: '/img/external-logos/twilio.png', alt: 'Twilio' },
      { image: '/img/external-logos/salesforce.png', alt: 'Salesforce' },
      { image: '/img/external-logos/hubspot.png', alt: 'HubSpot' },
      { image: '/img/external-logos/pipedrive.png', alt: 'Pipedrive' },
      { image: '/img/external-logos/netsuite.png', alt: 'NetSuite' },
      { image: '/img/external-logos/zoho.png', alt: 'Zoho' },
    ],
    typedSections: [
      {
        type: 'process',
        title: 'Get Results in 24 Hours',
        subtitle: 'And in only one meeting.',
        items: [
          { title: 'Step 1: Establish connections', text: '"It was amazing how seamless the integration meeting was. Everything was ready to go." - Bob, IT Director', image: '/img/platform-graphic.svg' },
          { title: 'Step 2: Provide company context', text: '"They only needed a list of terms and a couple of questions to get us going." - James, CEO', image: '/img/data-graphic.svg' },
          { title: 'Step 3: Get your insights', text: '"Half the questions we\'ve been arguing about for months were answered the next day." - Emily, CMO', image: '/img/insights-graphic.svg' },
        ],
        mobile: true,
      },
      {
        type: 'caseStudy',
        leftImage: '/img/boardroom.png',
        logoImage: '/img/external-logos/slack.png',
        logoAlt: 'Slack',
        headline: 'SusieCakes reduced the cost of support by 30%.',
        story: 'SusieCakes used our platform to identify key pain points and improve the customer experience. Everything was broken down by product and location automatically. The CEO used our dashboard to make decisions with the company\'s board.',
        quote: 'It is now essential to the way our customer support team operates daily, and the way our company makes decisions.',
        author: 'Chad Kilpatrick',
        role: 'CFO',
        link: "https://www.susiecakes.com/",
        mobile: true,
      },
      {
        type: 'featureRows',
        title: 'Peace of mind without the spreadsheet',
        rows: [
          { image: '/img/boardroom.png', title: 'SOC 2 Compliance', text: 'Data is stored in a secure, single-tenant, isolated environment.' },
          { image: '/img/boardroom.png', title: 'Secure Connections', text: 'Connections are established with secure credentials and are encrypted in transit.' },
          { image: '/img/boardroom.png', title: 'Data Lineage', text: 'We track the data from source to destination, so you can see exactly where it came from and where it went.' },
        ],
        mobile: false,
      },
      {
        type: 'quote',
        text: 'It is now essential to the way our customer support team operates daily, and the way our company makes decisions.',
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
  'cfo-pricing-opportunities': {
    role: 'CFO',
    industry: 'B2C Retail',
    themeColor: '#8bd39a',
    headline: 'Where are you underpriced?',
    story: 'Your margin isn’t a mystery; it’s hiding in conversations. We surface segments willing to pay more, quantify the dollars, and hand you the levers.',
    points: [
      { text: 'Spot segments with pricing headroom', icon: 'search-dollar' },
      { text: 'Model revenue lift from small price moves', icon: 'chart-line' },
      { text: 'Pressure-test changes before rollout', icon: 'flask' },
    ],
    // belowPoints: 'Stop reading transcripts, start reading results.',
    fields: [
      { title: 'name', type: 'text', placeholder: 'Your name' },
      { title: 'company', type: 'text', placeholder: 'Your company' },
      { title: 'email', type: 'email', placeholder: 'Your email' },
    ],
    cta: 'Find hidden pricing power',
    demoData: {
      title: 'Underpriced plans cost an estimated $182,900 in Q2.',
      subtext: 'Price-sensitivity language was absent in 68% of upsell rejections from Pro-tier customers in the West region.',
      bullets: [
        'Raising Pro by $2 for 14k neutral-sentiment customers → projected +$336k ARR.',
        'Discount leakage: 21% of approved discounts showed no price objection markers.'
      ],
      data: {
        type: 'bar', values: [
          { name: 'Q1', value: 35 },
          { name: 'Q2', value: 58 },
          { name: 'Q3', value: 77 },
          { name: 'Q4', value: 96 }
        ]
      },
      leftText: 'Modeled from real customer conversations',
    },
    logos: [
      { image: '/img/external-logos/zendesk.png', alt: 'Zendesk' },
      { image: '/img/external-logos/slack.png', alt: 'Slack' },
      { image: '/img/external-logos/zapier.png', alt: 'Zapier' },
      { image: '/img/external-logos/teams.png', alt: 'Teams' },
      { image: '/img/external-logos/gmail.png', alt: 'Gmail' },
      { image: '/img/external-logos/outlook.png', alt: 'Outlook' },
      { image: '/img/external-logos/activecampaign.png', alt: 'ActiveCampaign' },
      { image: '/img/external-logos/gong.png', alt: 'Gong' },
      { image: '/img/external-logos/chorus.png', alt: 'Chorus' },
      { image: '/img/external-logos/twilio.png', alt: 'Twilio' },
      { image: '/img/external-logos/salesforce.png', alt: 'Salesforce' },
      { image: '/img/external-logos/hubspot.png', alt: 'HubSpot' },
      { image: '/img/external-logos/pipedrive.png', alt: 'Pipedrive' },
      { image: '/img/external-logos/netsuite.png', alt: 'NetSuite' },
      { image: '/img/external-logos/zoho.png', alt: 'Zoho' },
    ],
    typedSections: [
      {
        type: 'process',
        title: 'Get Results in 24 Hours',
        subtitle: 'And in only one meeting.',
        items: [
          { title: 'Step 1: Establish connections', text: '"It was amazing how seamless the integration meeting was. Everything was ready to go." - Bob, IT Director', image: '/img/platform-graphic.svg' },
          { title: 'Step 2: Provide company context', text: '"They only needed a list of terms and a couple of questions to get us going." - James, CEO', image: '/img/data-graphic.svg' },
          { title: 'Step 3: Get your insights', text: '"Half the questions we\'ve been arguing about for months were answered the next day." - Emily, CMO', image: '/img/insights-graphic.svg' },
        ],
        mobile: true,
      },
      {
        type: 'caseStudy',
        leftImage: '/img/boardroom.png',
        logoImage: '/img/external-logos/slack.png',
        logoAlt: 'Slack',
        headline: 'SusieCakes reduced the cost of support by 30%.',
        story: 'SusieCakes used our platform to identify key pain points and improve the customer experience. Everything was broken down by product and location automatically. The CEO used our dashboard to make decisions with the company\'s board.',
        quote: 'It is now essential to the way our customer support team operates daily, and the way our company makes decisions.',
        author: 'Chad Kilpatrick',
        role: 'CFO',
        link: 'https://www.susiecakes.com/',
        mobile: true,
      },
      {
        type: 'featureRows',
        title: 'Peace of mind without the spreadsheet',
        rows: [
          { image: '/img/boardroom.png', title: 'SOC 2 Compliance', text: 'Data is stored in a secure, single-tenant, isolated environment.' },
          { image: '/img/boardroom.png', title: 'Secure Connections', text: 'Connections are established with secure credentials and are encrypted in transit.' },
          { image: '/img/boardroom.png', title: 'Data Lineage', text: 'We track the data from source to destination, so you can see exactly where it came from and where it went.' },
        ],
        mobile: false,
      },
      {
        type: 'quote',
        text: 'It is now essential to the way our customer support team operates daily, and the way our company makes decisions.',
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

  'cfo-nps': {
    role: 'CFO',
    industry: 'B2C Retail',
    themeColor: '#7ecbff',
    headline: 'NPS that speaks in dollars.',
    story: 'Scores don’t hit the P&L. We connect detractor themes to churn and expansion so you can rank fixes by cash impact.',
    points: [
      { text: 'Map detractor themes to churn risk', icon: 'bullseye' },
      { text: 'Forecast ARR at risk and upside', icon: 'chart-line' },
      { text: 'Prioritize fixes by ROI to the business', icon: 'calculator' },
    ],
    // belowPoints: 'Stop reading transcripts, start reading results.',
    fields: [
      { title: 'name', type: 'text', placeholder: 'Your name' },
      { title: 'company', type: 'text', placeholder: 'Your company' },
      { title: 'email', type: 'email', placeholder: 'Your email' },
    ],
    cta: 'Turn NPS into ROI',
    demoData: {
      title: 'A 9-point NPS dip linked to $241,000 ARR at risk.',
      subtext: '3,214 conversations tagged “shipping delay” drove 27% of detractor comments; 18% churned within 60 days.',
      bullets: [
        'Fixing the top 2 causes modeled to recover $320k within two quarters.',
        'Promoter referrals correlated with +$96k expansion YTD.'
      ],
      data: {
        type: 'bar', values: [
          { name: 'Q1', value: 28 },
          { name: 'Q2', value: 49 },
          { name: 'Q3', value: 63 },
          { name: 'Q4', value: 82 }
        ]
      },
      leftText: 'A real customer result',
    },
    logos: [
      { image: '/img/external-logos/zendesk.png', alt: 'Zendesk' },
      { image: '/img/external-logos/slack.png', alt: 'Slack' },
      { image: '/img/external-logos/zapier.png', alt: 'Zapier' },
      { image: '/img/external-logos/teams.png', alt: 'Teams' },
      { image: '/img/external-logos/gmail.png', alt: 'Gmail' },
      { image: '/img/external-logos/outlook.png', alt: 'Outlook' },
      { image: '/img/external-logos/activecampaign.png', alt: 'ActiveCampaign' },
      { image: '/img/external-logos/gong.png', alt: 'Gong' },
      { image: '/img/external-logos/chorus.png', alt: 'Chorus' },
      { image: '/img/external-logos/twilio.png', alt: 'Twilio' },
      { image: '/img/external-logos/salesforce.png', alt: 'Salesforce' },
      { image: '/img/external-logos/hubspot.png', alt: 'HubSpot' },
      { image: '/img/external-logos/pipedrive.png', alt: 'Pipedrive' },
      { image: '/img/external-logos/netsuite.png', alt: 'NetSuite' },
      { image: '/img/external-logos/zoho.png', alt: 'Zoho' },
    ],
    typedSections: [
      {
        type: 'process',
        title: 'Get Results in 24 Hours',
        subtitle: 'And in only one meeting.',
        items: [
          { title: 'Step 1: Establish connections', text: '"It was amazing how seamless the integration meeting was. Everything was ready to go." - Bob, IT Director', image: '/img/platform-graphic.svg' },
          { title: 'Step 2: Provide company context', text: '"They only needed a list of terms and a couple of questions to get us going." - James, CEO', image: '/img/data-graphic.svg' },
          { title: 'Step 3: Get your insights', text: '"Half the questions we\'ve been arguing about for months were answered the next day." - Emily, CMO', image: '/img/insights-graphic.svg' },
        ],
        mobile: true,
      },
      {
        type: 'caseStudy',
        leftImage: '/img/boardroom.png',
        logoImage: '/img/external-logos/slack.png',
        logoAlt: 'Slack',
        headline: 'SusieCakes reduced the cost of support by 30%.',
        story: 'SusieCakes used our platform to identify key pain points and improve the customer experience. Everything was broken down by product and location automatically. The CEO used our dashboard to make decisions with the company\'s board.',
        quote: 'It is now essential to the way our customer support team operates daily, and the way our company makes decisions.',
        author: 'Chad Kilpatrick',
        role: 'CFO',
        link: 'https://www.susiecakes.com/',
        mobile: true,
      },
      {
        type: 'featureRows',
        title: 'Peace of mind without the spreadsheet',
        rows: [
          { image: '/img/boardroom.png', title: 'SOC 2 Compliance', text: 'Data is stored in a secure, single-tenant, isolated environment.' },
          { image: '/img/boardroom.png', title: 'Secure Connections', text: 'Connections are established with secure credentials and are encrypted in transit.' },
          { image: '/img/boardroom.png', title: 'Data Lineage', text: 'We track the data from source to destination, so you can see exactly where it came from and where it went.' },
        ],
        mobile: false,
      },
      {
        type: 'quote',
        text: 'It is now essential to the way our customer support team operates daily, and the way our company makes decisions.',
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

  'head-of-support-nps': {
    role: 'Head of Support',
    industry: 'B2C Retail',
    themeColor: '#7ecbff',
    headline: 'Fix the “why” behind your NPS.',
    story: 'Tie NPS comments to operational fixes and dollars so support becomes a growth engine, not a cost center.',
    points: [
      { text: 'Auto-tag themes behind detractors', icon: 'tags' },
      { text: 'Route fixes by team, store, or product', icon: 'sitemap' },
      { text: 'Report ROI of fixes, not minutes', icon: 'chart-line' },
    ],
    // belowPoints: 'Stop reading transcripts, start reading results.',
    fields: [
      { title: 'name', type: 'text', placeholder: 'Your name' },
      { title: 'company', type: 'text', placeholder: 'Your company' },
      { title: 'email', type: 'email', placeholder: 'Your email' },
    ],
    cta: 'Make NPS your ops radar',
    demoData: {
      title: 'Delivery delays drove 41% of detractor comments.',
      subtext: 'Stores with >3 late-delivery mentions/week had 2.3x churn vs baseline.',
      bullets: [
        'Pilot SLA change cut detractor mentions by 28% in 30 days.',
        'Projected $74,500 Q3 churn reduction from routing changes.'
      ],
      data: {
        type: 'bar', values: [
          { name: 'Q1', value: 38 },
          { name: 'Q2', value: 44 },
          { name: 'Q3', value: 31 },
          { name: 'Q4', value: 22 }
        ]
      },
      leftText: 'A real customer result',
    },
    logos: [
      { image: '/img/external-logos/zendesk.png', alt: 'Zendesk' },
      { image: '/img/external-logos/slack.png', alt: 'Slack' },
      { image: '/img/external-logos/zapier.png', alt: 'Zapier' },
      { image: '/img/external-logos/teams.png', alt: 'Teams' },
      { image: '/img/external-logos/gmail.png', alt: 'Gmail' },
      { image: '/img/external-logos/outlook.png', alt: 'Outlook' },
      { image: '/img/external-logos/activecampaign.png', alt: 'ActiveCampaign' },
      { image: '/img/external-logos/gong.png', alt: 'Gong' },
      { image: '/img/external-logos/chorus.png', alt: 'Chorus' },
      { image: '/img/external-logos/twilio.png', alt: 'Twilio' },
      { image: '/img/external-logos/salesforce.png', alt: 'Salesforce' },
      { image: '/img/external-logos/hubspot.png', alt: 'HubSpot' },
      { image: '/img/external-logos/pipedrive.png', alt: 'Pipedrive' },
      { image: '/img/external-logos/netsuite.png', alt: 'NetSuite' },
      { image: '/img/external-logos/zoho.png', alt: 'Zoho' },
    ],
    typedSections: [
      {
        type: 'process',
        title: 'Get Results in 24 Hours',
        subtitle: 'And in only one meeting.',
        items: [
          { title: 'Step 1: Establish connections', text: '"It was amazing how seamless the integration meeting was. Everything was ready to go." - Bob, IT Director', image: '/img/platform-graphic.svg' },
          { title: 'Step 2: Provide company context', text: '"They only needed a list of terms and a couple of questions to get us going." - James, CEO', image: '/img/data-graphic.svg' },
          { title: 'Step 3: Get your insights', text: '"Half the questions we\'ve been arguing about for months were answered the next day." - Emily, CMO', image: '/img/insights-graphic.svg' },
        ],
        mobile: true,
      },
      {
        type: 'caseStudy',
        leftImage: '/img/boardroom.png',
        logoImage: '/img/external-logos/slack.png',
        logoAlt: 'Slack',
        headline: 'SusieCakes reduced the cost of support by 30%.',
        story: 'SusieCakes used our platform to identify key pain points and improve the customer experience. Everything was broken down by product and location automatically. The CEO used our dashboard to make decisions with the company\'s board.',
        quote: 'It is now essential to the way our customer support team operates daily, and the way our company makes decisions.',
        author: 'Chad Kilpatrick',
        role: 'CFO',
        link: 'https://www.susiecakes.com/',
        mobile: true,
      },
      {
        type: 'featureRows',
        title: 'Peace of mind without the spreadsheet',
        rows: [
          { image: '/img/boardroom.png', title: 'SOC 2 Compliance', text: 'Data is stored in a secure, single-tenant, isolated environment.' },
          { image: '/img/boardroom.png', title: 'Secure Connections', text: 'Connections are established with secure credentials and are encrypted in transit.' },
          { image: '/img/boardroom.png', title: 'Data Lineage', text: 'We track the data from source to destination, so you can see exactly where it came from and where it went.' },
        ],
        mobile: false,
      },
      {
        type: 'quote',
        text: 'It is now essential to the way our customer support team operates daily, and the way our company makes decisions.',
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

  'head-of-support-replace-surveys': {
    role: 'Head of Support',
    industry: 'B2C Retail',
    themeColor: '#7ecbff',
    headline: 'Replace surveys with signals.',
    story: 'Stop pestering customers. Mine chats, emails, calls, and reviews for the same insights—at 10x the sample size.',
    points: [
      { text: 'Analyze chats/emails/calls/reviews automatically', icon: 'plug' },
      { text: 'Real-time pulse without survey fatigue', icon: 'heartbeat' },
      { text: 'Benchmark teams and deflect tickets', icon: 'chart-line' },
    ],
    // belowPoints: 'Stop reading transcripts, start reading results.',
    fields: [
      { title: 'name', type: 'text', placeholder: 'Your name' },
      { title: 'company', type: 'text', placeholder: 'Your company' },
      { title: 'email', type: 'email', placeholder: 'Your email' },
    ],
    cta: 'Ditch surveys, keep the truth',
    demoData: {
      title: 'Eliminating CSAT surveys saved 1,240 agent minutes/week.',
      subtext: 'Passive signal coverage increased 6.7x vs survey responses with equal predictive power.',
      bullets: [
        'Ticket sentiment now predicts churn 30 days ahead (AUC 0.81).',
        'Customer replies increased 12% after removing survey footer.'
      ],
      data: {
        type: 'bar', values: [
          { name: 'Q1', value: 22 },
          { name: 'Q2', value: 39 },
          { name: 'Q3', value: 58 },
          { name: 'Q4', value: 71 }
        ]
      },
      leftText: 'A real customer result',
    },
    logos: [
      { image: '/img/external-logos/zendesk.png', alt: 'Zendesk' },
      { image: '/img/external-logos/slack.png', alt: 'Slack' },
      { image: '/img/external-logos/zapier.png', alt: 'Zapier' },
      { image: '/img/external-logos/teams.png', alt: 'Teams' },
      { image: '/img/external-logos/gmail.png', alt: 'Gmail' },
      { image: '/img/external-logos/outlook.png', alt: 'Outlook' },
      { image: '/img/external-logos/activecampaign.png', alt: 'ActiveCampaign' },
      { image: '/img/external-logos/gong.png', alt: 'Gong' },
      { image: '/img/external-logos/chorus.png', alt: 'Chorus' },
      { image: '/img/external-logos/twilio.png', alt: 'Twilio' },
      { image: '/img/external-logos/salesforce.png', alt: 'Salesforce' },
      { image: '/img/external-logos/hubspot.png', alt: 'HubSpot' },
      { image: '/img/external-logos/pipedrive.png', alt: 'Pipedrive' },
      { image: '/img/external-logos/netsuite.png', alt: 'NetSuite' },
      { image: '/img/external-logos/zoho.png', alt: 'Zoho' },
    ],
    typedSections: [
      {
        type: 'process',
        title: 'Get Results in 24 Hours',
        subtitle: 'And in only one meeting.',
        items: [
          { title: 'Step 1: Establish connections', text: '"It was amazing how seamless the integration meeting was. Everything was ready to go." - Bob, IT Director', image: '/img/platform-graphic.svg' },
          { title: 'Step 2: Provide company context', text: '"They only needed a list of terms and a couple of questions to get us going." - James, CEO', image: '/img/data-graphic.svg' },
          { title: 'Step 3: Get your insights', text: '"Half the questions we\'ve been arguing about for months were answered the next day." - Emily, CMO', image: '/img/insights-graphic.svg' },
        ],
        mobile: true,
      },
      {
        type: 'caseStudy',
        leftImage: '/img/boardroom.png',
        logoImage: '/img/external-logos/slack.png',
        logoAlt: 'Slack',
        headline: 'SusieCakes reduced the cost of support by 30%.',
        story: 'SusieCakes used our platform to identify key pain points and improve the customer experience. Everything was broken down by product and location automatically. The CEO used our dashboard to make decisions with the company\'s board.',
        quote: 'It is now essential to the way our customer support team operates daily, and the way our company makes decisions.',
        author: 'Chad Kilpatrick',
        role: 'CFO',
        // link: 'https://www.susiecakes.com/',
        mobile: true,
      },
      {
        type: 'featureRows',
        title: 'Peace of mind without the spreadsheet',
        rows: [
          { image: '/img/boardroom.png', title: 'SOC 2 Compliance', text: 'Data is stored in a secure, single-tenant, isolated environment.' },
          { image: '/img/boardroom.png', title: 'Secure Connections', text: 'Connections are established with secure credentials and are encrypted in transit.' },
          { image: '/img/boardroom.png', title: 'Data Lineage', text: 'We track the data from source to destination, so you can see exactly where it came from and where it went.' },
        ],
        mobile: false,
      },
      {
        type: 'quote',
        text: 'It is now essential to the way our customer support team operates daily, and the way our company makes decisions.',
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

  'product-nps': {
    role: 'Product',
    industry: 'B2C Retail',
    themeColor: '#7ecbff',
    headline: 'NPS that prioritizes your roadmap.',
    story: 'Turn comment noise into ranked opportunities by ARR impact, effort, and time-to-win.',
    points: [
      { text: 'Rank themes by revenue impact', icon: 'dollar-sign' },
      { text: 'Quantify lift from each fix', icon: 'calculator' },
      { text: 'Close the loop with in-app prompts', icon: 'bolt' },
    ],
    // belowPoints: 'Stop reading transcripts, start reading results.',
    fields: [
      { title: 'name', type: 'text', placeholder: 'Your name' },
      { title: 'company', type: 'text', placeholder: 'Your company' },
      { title: 'email', type: 'email', placeholder: 'Your email' },
    ],
    cta: 'Prioritize what pays',
    demoData: {
      title: 'Onboarding friction tied to $118,300 in lost upgrades.',
      subtext: 'New users citing “confusing setup” were 3.1x less likely to convert within 14 days.',
      bullets: [
        'One checklist change reduced time-to-value by 43% in beta.',
        'Projected +9 pts NPS and +$220k ARR in two quarters.'
      ],
      data: {
        type: 'bar', values: [
          { name: 'Q1', value: 26 },
          { name: 'Q2', value: 40 },
          { name: 'Q3', value: 57 },
          { name: 'Q4', value: 79 }
        ]
      },
      leftText: 'A real customer result',
    },
    logos: [
      { image: '/img/external-logos/zendesk.png', alt: 'Zendesk' },
      { image: '/img/external-logos/slack.png', alt: 'Slack' },
      { image: '/img/external-logos/zapier.png', alt: 'Zapier' },
      { image: '/img/external-logos/teams.png', alt: 'Teams' },
      { image: '/img/external-logos/gmail.png', alt: 'Gmail' },
      { image: '/img/external-logos/outlook.png', alt: 'Outlook' },
      { image: '/img/external-logos/activecampaign.png', alt: 'ActiveCampaign' },
      { image: '/img/external-logos/gong.png', alt: 'Gong' },
      { image: '/img/external-logos/chorus.png', alt: 'Chorus' },
      { image: '/img/external-logos/twilio.png', alt: 'Twilio' },
      { image: '/img/external-logos/salesforce.png', alt: 'Salesforce' },
      { image: '/img/external-logos/hubspot.png', alt: 'HubSpot' },
      { image: '/img/external-logos/pipedrive.png', alt: 'Pipedrive' },
      { image: '/img/external-logos/netsuite.png', alt: 'NetSuite' },
      { image: '/img/external-logos/zoho.png', alt: 'Zoho' },
    ],
    typedSections: [
      {
        type: 'process',
        title: 'Get Results in 24 Hours',
        subtitle: 'And in only one meeting.',
        items: [
          { title: 'Step 1: Establish connections', text: '"It was amazing how seamless the integration meeting was. Everything was ready to go." - Bob, IT Director', image: '/img/platform-graphic.svg' },
          { title: 'Step 2: Provide company context', text: '"They only needed a list of terms and a couple of questions to get us going." - James, CEO', image: '/img/data-graphic.svg' },
          { title: 'Step 3: Get your insights', text: '"Half the questions we\'ve been arguing about for months were answered the next day." - Emily, CMO', image: '/img/insights-graphic.svg' },
        ],
        mobile: true,
      },
      {
        type: 'caseStudy',
        leftImage: '/img/boardroom.png',
        logoImage: '/img/external-logos/slack.png',
        logoAlt: 'Slack',
        headline: 'SusieCakes reduced the cost of support by 30%.',
        story: 'SusieCakes used our platform to identify key pain points and improve the customer experience. Everything was broken down by product and location automatically. The CEO used our dashboard to make decisions with the company\'s board.',
        quote: 'It is now essential to the way our customer support team operates daily, and the way our company makes decisions.',
        author: 'Chad Kilpatrick',
        role: 'CFO',
        link: 'https://www.susiecakes.com/',
        mobile: true,
      },
      {
        type: 'featureRows',
        title: 'Peace of mind without the spreadsheet',
        rows: [
          { image: '/img/boardroom.png', title: 'SOC 2 Compliance', text: 'Data is stored in a secure, single-tenant, isolated environment.' },
          { image: '/img/boardroom.png', title: 'Secure Connections', text: 'Connections are established with secure credentials and are encrypted in transit.' },
          { image: '/img/boardroom.png', title: 'Data Lineage', text: 'We track the data from source to destination, so you can see exactly where it came from and where it went.' },
        ],
        mobile: false,
      },
      {
        type: 'quote',
        text: 'It is now essential to the way our customer support team operates daily, and the way our company makes decisions.',
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

  'product-user-research': {
    role: 'Product',
    industry: 'B2C Retail',
    themeColor: '#7ecbff',
    headline: 'Customer research, without the calendar Tetris.',
    story: 'Skip recruiting and 90-minute calls. Your customers already wrote the research—at scale and in their own words.',
    points: [
      { text: 'Aggregate the voice of customer across channels', icon: 'megaphone' },
      { text: 'JTBD themes with quantified impact', icon: 'bullseye' },
      { text: 'Export clips and verbatims to your PRD', icon: 'file-export' },
    ],
    // belowPoints: 'Stop reading transcripts, start reading results.',
    fields: [
      { title: 'name', type: 'text', placeholder: 'Your name' },
      { title: 'company', type: 'text', placeholder: 'Your company' },
      { title: 'email', type: 'email', placeholder: 'Your email' },
    ],
    cta: 'Do research while you sleep',
    demoData: {
      title: 'Top 5 Jobs-to-Be-Done by ARR impact.',
      subtext: '“Track battery health” appears in 12.4% of conversations and correlates with 2.2x expansion likelihood.',
      bullets: [
        'Persona: power users mention it 3.4x more than casual users.',
        'Adding a dashboard prototype forecast +$310k ARR uplift.'
      ],
      data: {
        type: 'bar', values: [
          { name: 'Q1', value: 24 },
          { name: 'Q2', value: 37 },
          { name: 'Q3', value: 55 },
          { name: 'Q4', value: 73 }
        ]
      },
      leftText: 'A real customer result',
    },
    logos: [
      { image: '/img/external-logos/zendesk.png', alt: 'Zendesk' },
      { image: '/img/external-logos/slack.png', alt: 'Slack' },
      { image: '/img/external-logos/zapier.png', alt: 'Zapier' },
      { image: '/img/external-logos/teams.png', alt: 'Teams' },
      { image: '/img/external-logos/gmail.png', alt: 'Gmail' },
      { image: '/img/external-logos/outlook.png', alt: 'Outlook' },
      { image: '/img/external-logos/activecampaign.png', alt: 'ActiveCampaign' },
      { image: '/img/external-logos/gong.png', alt: 'Gong' },
      { image: '/img/external-logos/chorus.png', alt: 'Chorus' },
      { image: '/img/external-logos/twilio.png', alt: 'Twilio' },
      { image: '/img/external-logos/salesforce.png', alt: 'Salesforce' },
      { image: '/img/external-logos/hubspot.png', alt: 'HubSpot' },
      { image: '/img/external-logos/pipedrive.png', alt: 'Pipedrive' },
      { image: '/img/external-logos/netsuite.png', alt: 'NetSuite' },
      { image: '/img/external-logos/zoho.png', alt: 'Zoho' },
    ],
    typedSections: [
      {
        type: 'process',
        title: 'Get Results in 24 Hours',
        subtitle: 'And in only one meeting.',
        items: [
          { title: 'Step 1: Establish connections', text: '"It was amazing how seamless the integration meeting was. Everything was ready to go." - Bob, IT Director', image: '/img/platform-graphic.svg' },
          { title: 'Step 2: Provide company context', text: '"They only needed a list of terms and a couple of questions to get us going." - James, CEO', image: '/img/data-graphic.svg' },
          { title: 'Step 3: Get your insights', text: '"Half the questions we\'ve been arguing about for months were answered the next day." - Emily, CMO', image: '/img/insights-graphic.svg' },
        ],
        mobile: true,
      },
      {
        type: 'caseStudy',
        leftImage: '/img/boardroom.png',
        logoImage: '/img/external-logos/slack.png',
        logoAlt: 'Slack',
        headline: 'SusieCakes reduced the cost of support by 30%.',
        story: 'SusieCakes used our platform to identify key pain points and improve the customer experience. Everything was broken down by product and location automatically. The CEO used our dashboard to make decisions with the company\'s board.',
        quote: 'It is now essential to the way our customer support team operates daily, and the way our company makes decisions.',
        author: 'Chad Kilpatrick',
        role: 'CFO',
        link: 'https://www.susiecakes.com/',
        mobile: true,
      },
      {
        type: 'featureRows',
        title: 'Peace of mind without the spreadsheet',
        rows: [
          { image: '/img/boardroom.png', title: 'SOC 2 Compliance', text: 'Data is stored in a secure, single-tenant, isolated environment.' },
          { image: '/img/boardroom.png', title: 'Secure Connections', text: 'Connections are established with secure credentials and are encrypted in transit.' },
          { image: '/img/boardroom.png', title: 'Data Lineage', text: 'We track the data from source to destination, so you can see exactly where it came from and where it went.' },
        ],
        mobile: false,
      },
      {
        type: 'quote',
        text: 'It is now essential to the way our customer support team operates daily, and the way our company makes decisions.',
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

  'product-replace-surveys': {
    role: 'Product',
    industry: 'B2C Retail',
    themeColor: '#7ecbff',
    headline: 'Replace surveys with continuous signals.',
    story: 'Use real interactions to measure sentiment and feature fit—far more coverage, no bias from who bothers to answer.',
    points: [
      { text: 'Passive in-product and support telemetry', icon: 'heartbeat' },
      { text: 'Theme detection with confidence intervals', icon: 'check-circle' },
      { text: 'Weekly readouts for PMs and execs', icon: 'calendar' },
    ],
    // belowPoints: 'Stop reading transcripts, start reading results.',
    fields: [
      { title: 'name', type: 'text', placeholder: 'Your name' },
      { title: 'company', type: 'text', placeholder: 'Your company' },
      { title: 'email', type: 'email', placeholder: 'Your email' },
    ],
    cta: 'More signal, less spam',
    demoData: {
      title: 'Sample size increased 9.2x after removing the CES pop-up.',
      subtext: 'Decision quality improved: defect prediction lifted from 0.64 to 0.79 AUC.',
      bullets: [
        'Unblocked a release: silent failure in checkout spotted within hours.',
        'Saved $62k/yr in tooling and incentives.'
      ],
      data: {
        type: 'bar', values: [
          { name: 'Q1', value: 20 },
          { name: 'Q2', value: 36 },
          { name: 'Q3', value: 54 },
          { name: 'Q4', value: 76 }
        ]
      },
      leftText: 'A real customer result',
    },
    logos: [
      { image: '/img/external-logos/zendesk.png', alt: 'Zendesk' },
      { image: '/img/external-logos/slack.png', alt: 'Slack' },
      { image: '/img/external-logos/zapier.png', alt: 'Zapier' },
      { image: '/img/external-logos/teams.png', alt: 'Teams' },
      { image: '/img/external-logos/gmail.png', alt: 'Gmail' },
      { image: '/img/external-logos/outlook.png', alt: 'Outlook' },
      { image: '/img/external-logos/activecampaign.png', alt: 'ActiveCampaign' },
      { image: '/img/external-logos/gong.png', alt: 'Gong' },
      { image: '/img/external-logos/chorus.png', alt: 'Chorus' },
      { image: '/img/external-logos/twilio.png', alt: 'Twilio' },
      { image: '/img/external-logos/salesforce.png', alt: 'Salesforce' },
      { image: '/img/external-logos/hubspot.png', alt: 'HubSpot' },
      { image: '/img/external-logos/pipedrive.png', alt: 'Pipedrive' },
      { image: '/img/external-logos/netsuite.png', alt: 'NetSuite' },
      { image: '/img/external-logos/zoho.png', alt: 'Zoho' },
    ],
    typedSections: [
      {
        type: 'process',
        title: 'Get Results in 24 Hours',
        subtitle: 'And in only one meeting.',
        items: [
          { title: 'Step 1: Establish connections', text: '"It was amazing how seamless the integration meeting was. Everything was ready to go." - Bob, IT Director', image: '/img/platform-graphic.svg' },
          { title: 'Step 2: Provide company context', text: '"They only needed a list of terms and a couple of questions to get us going." - James, CEO', image: '/img/data-graphic.svg' },
          { title: 'Step 3: Get your insights', text: '"Half the questions we\'ve been arguing about for months were answered the next day." - Emily, CMO', image: '/img/insights-graphic.svg' },
        ],
        mobile: true,
      },
      {
        type: 'caseStudy',
        leftImage: '/img/boardroom.png',
        logoImage: '/img/external-logos/slack.png',
        logoAlt: 'Slack',
        headline: 'SusieCakes reduced the cost of support by 30%.',
        story: 'SusieCakes used our platform to identify key pain points and improve the customer experience. Everything was broken down by product and location automatically. The CEO used our dashboard to make decisions with the company\'s board.',
        quote: 'It is now essential to the way our customer support team operates daily, and the way our company makes decisions.',
        author: 'Chad Kilpatrick',
        role: 'CFO',
        link: 'https://www.susiecakes.com/',
        mobile: true,
      },
      {
        type: 'featureRows',
        title: 'Peace of mind without the spreadsheet',
        rows: [
          { image: '/img/boardroom.png', title: 'SOC 2 Compliance', text: 'Data is stored in a secure, single-tenant, isolated environment.' },
          { image: '/img/boardroom.png', title: 'Secure Connections', text: 'Connections are established with secure credentials and are encrypted in transit.' },
          { image: '/img/boardroom.png', title: 'Data Lineage', text: 'We track the data from source to destination, so you can see exactly where it came from and where it went.' },
        ],
        mobile: false,
      },
      {
        type: 'quote',
        text: 'It is now essential to the way our customer support team operates daily, and the way our company makes decisions.',
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

  'cfo-replace-user-research': {
    role: 'CFO',
    industry: 'B2C Retail',
    themeColor: '#8bd39a',
    headline: 'Cut research spend, keep insight.',
    story: 'Replace outsourced interviews and trackers with always-on analysis of your own customers—and tie it to dollars.',
    points: [
      { text: 'Replace $200k+ of vendor studies', icon: 'scissors' },
      { text: 'Quantify ROI of every insight', icon: 'calculator' },
      { text: 'Own the data, not the agency', icon: 'shield' },
    ],
    // belowPoints: 'Stop reading transcripts, start reading results.',
    fields: [
      { title: 'name', type: 'text', placeholder: 'Your name' },
      { title: 'company', type: 'text', placeholder: 'Your company' },
      { title: 'email', type: 'email', placeholder: 'Your email' },
    ],
    cta: 'Fire the survey mill',
    demoData: {
      title: 'Replaced $240,000 of outsourced research with internal signals.',
      subtext: 'Coverage grew from 480 interviews/year to 68,000 conversations analyzed with auditable lineage.',
      bullets: [
        'Board deck prep time cut from 3 weeks to 2 days per quarter.',
        'Insights tied directly to $1.1m ARR at risk/upsell.'
      ],
      data: {
        type: 'bar', values: [
          { name: 'Q1', value: 18 },
          { name: 'Q2', value: 34 },
          { name: 'Q3', value: 59 },
          { name: 'Q4', value: 83 }
        ]
      },
      leftText: 'A real customer result',
    },
    logos: [
      { image: '/img/external-logos/zendesk.png', alt: 'Zendesk' },
      { image: '/img/external-logos/slack.png', alt: 'Slack' },
      { image: '/img/external-logos/zapier.png', alt: 'Zapier' },
      { image: '/img/external-logos/teams.png', alt: 'Teams' },
      { image: '/img/external-logos/gmail.png', alt: 'Gmail' },
      { image: '/img/external-logos/outlook.png', alt: 'Outlook' },
      { image: '/img/external-logos/activecampaign.png', alt: 'ActiveCampaign' },
      { image: '/img/external-logos/gong.png', alt: 'Gong' },
      { image: '/img/external-logos/chorus.png', alt: 'Chorus' },
      { image: '/img/external-logos/twilio.png', alt: 'Twilio' },
      { image: '/img/external-logos/salesforce.png', alt: 'Salesforce' },
      { image: '/img/external-logos/hubspot.png', alt: 'HubSpot' },
      { image: '/img/external-logos/pipedrive.png', alt: 'Pipedrive' },
      { image: '/img/external-logos/netsuite.png', alt: 'NetSuite' },
      { image: '/img/external-logos/zoho.png', alt: 'Zoho' },
    ],
    typedSections: [
      {
        type: 'process',
        title: 'Get Results in 24 Hours',
        subtitle: 'And in only one meeting.',
        items: [
          { title: 'Step 1: Establish connections', text: '"It was amazing how seamless the integration meeting was. Everything was ready to go." - Bob, IT Director', image: '/img/platform-graphic.svg' },
          { title: 'Step 2: Provide company context', text: '"They only needed a list of terms and a couple of questions to get us going." - James, CEO', image: '/img/data-graphic.svg' },
          { title: 'Step 3: Get your insights', text: '"Half the questions we\'ve been arguing about for months were answered the next day." - Emily, CMO', image: '/img/insights-graphic.svg' },
        ],
        mobile: true,
      },
      {
        type: 'caseStudy',
        leftImage: '/img/boardroom.png',
        logoImage: '/img/external-logos/slack.png',
        logoAlt: 'Slack',
        headline: 'SusieCakes reduced the cost of support by 30%.',
        story: 'SusieCakes used our platform to identify key pain points and improve the customer experience. Everything was broken down by product and location automatically. The CEO used our dashboard to make decisions with the company\'s board.',
        quote: 'It is now essential to the way our customer support team operates daily, and the way our company makes decisions.',
        author: 'Chad Kilpatrick',
        role: 'CFO',
        link: 'https://www.susiecakes.com/',
        mobile: true,
      },
      {
        type: 'featureRows',
        title: 'Peace of mind without the spreadsheet',
        rows: [
          { image: '/img/boardroom.png', title: 'SOC 2 Compliance', text: 'Data is stored in a secure, single-tenant, isolated environment.' },
          { image: '/img/boardroom.png', title: 'Secure Connections', text: 'Connections are established with secure credentials and are encrypted in transit.' },
          { image: '/img/boardroom.png', title: 'Data Lineage', text: 'We track the data from source to destination, so you can see exactly where it came from and where it went.' },
        ],
        mobile: false,
      },
      {
        type: 'quote',
        text: 'It is now essential to the way our customer support team operates daily, and the way our company makes decisions.',
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

  'head-of-support-nps-alt': {
    role: 'Head of Support',
    industry: 'B2C Retail',
    themeColor: '#7ecbff',
    headline: 'What’s dragging your NPS down?',
    story: 'NPS gives you a number, not a fix. We translate feedback into prioritized actions with measurable impact.',
    points: [
      { text: 'See which issues create detractors', icon: 'search-dollar' },
      { text: 'Rank fixes by churn reduction', icon: 'chart-line' },
      { text: 'Share store and agent scorecards automatically', icon: 'clipboard-check' },
    ],
    // belowPoints: 'Stop reading transcripts, start reading results.',
    fields: [
      { title: 'name', type: 'text', placeholder: 'Your name' },
      { title: 'company', type: 'text', placeholder: 'Your company' },
      { title: 'email', type: 'email', placeholder: 'Your email' },
    ],
    cta: 'Never guess at NPS again',
    demoData: {
      title: 'Queue time accounts for 29% of detractor sentiment.',
      subtext: 'Reducing median handle time by 32s cut detractor mentions by 19% month-over-month.',
      bullets: [
        'Proactive callback workflow reduced repeat contacts by 14%.',
        'Projected $58,900 quarterly churn reduction.'
      ],
      data: {
        type: 'bar', values: [
          { name: 'Q1', value: 31 },
          { name: 'Q2', value: 45 },
          { name: 'Q3', value: 52 },
          { name: 'Q4', value: 68 }
        ]
      },
      leftText: 'A real customer result',
    },
    logos: [
      { image: '/img/external-logos/zendesk.png', alt: 'Zendesk' },
      { image: '/img/external-logos/slack.png', alt: 'Slack' },
      { image: '/img/external-logos/zapier.png', alt: 'Zapier' },
      { image: '/img/external-logos/teams.png', alt: 'Teams' },
      { image: '/img/external-logos/gmail.png', alt: 'Gmail' },
      { image: '/img/external-logos/outlook.png', alt: 'Outlook' },
      { image: '/img/external-logos/activecampaign.png', alt: 'ActiveCampaign' },
      { image: '/img/external-logos/gong.png', alt: 'Gong' },
      { image: '/img/external-logos/chorus.png', alt: 'Chorus' },
      { image: '/img/external-logos/twilio.png', alt: 'Twilio' },
      { image: '/img/external-logos/salesforce.png', alt: 'Salesforce' },
      { image: '/img/external-logos/hubspot.png', alt: 'HubSpot' },
      { image: '/img/external-logos/pipedrive.png', alt: 'Pipedrive' },
      { image: '/img/external-logos/netsuite.png', alt: 'NetSuite' },
      { image: '/img/external-logos/zoho.png', alt: 'Zoho' },
    ],
    typedSections: [
      {
        type: 'process',
        title: 'Get Results in 24 Hours',
        subtitle: 'And in only one meeting.',
        items: [
          { title: 'Step 1: Establish connections', text: '"It was amazing how seamless the integration meeting was. Everything was ready to go." - Bob, IT Director', image: '/img/platform-graphic.svg' },
          { title: 'Step 2: Provide company context', text: '"They only needed a list of terms and a couple of questions to get us going." - James, CEO', image: '/img/data-graphic.svg' },
          { title: 'Step 3: Get your insights', text: '"Half the questions we\'ve been arguing about for months were answered the next day." - Emily, CMO', image: '/img/insights-graphic.svg' },
        ],
        mobile: true,
      },
      {
        type: 'caseStudy',
        leftImage: '/img/boardroom.png',
        logoImage: '/img/external-logos/slack.png',
        logoAlt: 'Slack',
        headline: 'SusieCakes reduced the cost of support by 30%.',
        story: 'SusieCakes used our platform to identify key pain points and improve the customer experience. Everything was broken down by product and location automatically. The CEO used our dashboard to make decisions with the company\'s board.',
        quote: 'It is now essential to the way our customer support team operates daily, and the way our company makes decisions.',
        author: 'Chad Kilpatrick',
        role: 'CFO',
        link: 'https://www.susiecakes.com/',
        mobile: true,
      },
      {
        type: 'featureRows',
        title: 'Peace of mind without the spreadsheet',
        rows: [
          { image: '/img/boardroom.png', title: 'SOC 2 Compliance', text: 'Data is stored in a secure, single-tenant, isolated environment.' },
          { image: '/img/boardroom.png', title: 'Secure Connections', text: 'Connections are established with secure credentials and are encrypted in transit.' },
          { image: '/img/boardroom.png', title: 'Data Lineage', text: 'We track the data from source to destination, so you can see exactly where it came from and where it went.' },
        ],
        mobile: false,
      },
      {
        type: 'quote',
        text: 'It is now essential to the way our customer support team operates daily, and the way our company makes decisions.',
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

  'product-replace-surveys-alt': {
    role: 'Product',
    industry: 'B2C Retail',
    themeColor: '#7ecbff',
    headline: 'Stop surveying. Start listening.',
    story: 'Your users already told you what to build—inside tickets, chats, calls, and reviews. We extract the signal and size the prize.',
    points: [
      { text: 'Combine VOC from every channel', icon: 'plug' },
      { text: 'Detect themes and quantify impact', icon: 'bullseye' },
      { text: 'Ship weekly readouts, no forms required', icon: 'calendar' },
    ],
    // belowPoints: 'Stop reading transcripts, start reading results.',
    fields: [
      { title: 'name', type: 'text', placeholder: 'Your name' },
      { title: 'company', type: 'text', placeholder: 'Your company' },
      { title: 'email', type: 'email', placeholder: 'Your email' },
    ],
    cta: 'Replace surveys with reality',
    demoData: {
      title: 'Abandoning the quarterly survey increased sample size 7.5x.',
      subtext: 'Roadmap decisions improved: prediction error on feature adoption dropped 34%.',
      bullets: [
        'Reduced response incentives to zero with no loss of insight.',
        'Found a checkout friction point missed by surveys for two quarters.'
      ],
      data: {
        type: 'bar', values: [
          { name: 'Q1', value: 27 },
          { name: 'Q2', value: 41 },
          { name: 'Q3', value: 62 },
          { name: 'Q4', value: 80 }
        ]
      },
      leftText: 'A real customer result',
    },
    logos: [
      { image: '/img/external-logos/zendesk.png', alt: 'Zendesk' },
      { image: '/img/external-logos/slack.png', alt: 'Slack' },
      { image: '/img/external-logos/zapier.png', alt: 'Zapier' },
      { image: '/img/external-logos/teams.png', alt: 'Teams' },
      { image: '/img/external-logos/gmail.png', alt: 'Gmail' },
      { image: '/img/external-logos/outlook.png', alt: 'Outlook' },
      { image: '/img/external-logos/activecampaign.png', alt: 'ActiveCampaign' },
      { image: '/img/external-logos/gong.png', alt: 'Gong' },
      { image: '/img/external-logos/chorus.png', alt: 'Chorus' },
      { image: '/img/external-logos/twilio.png', alt: 'Twilio' },
      { image: '/img/external-logos/salesforce.png', alt: 'Salesforce' },
      { image: '/img/external-logos/hubspot.png', alt: 'HubSpot' },
      { image: '/img/external-logos/pipedrive.png', alt: 'Pipedrive' },
      { image: '/img/external-logos/netsuite.png', alt: 'NetSuite' },
      { image: '/img/external-logos/zoho.png', alt: 'Zoho' },
    ],
    typedSections: [
      {
        type: 'process',
        title: 'Get Results in 24 Hours',
        subtitle: 'And in only one meeting.',
        items: [
          { title: 'Step 1: Establish connections', text: '"It was amazing how seamless the integration meeting was. Everything was ready to go." - Bob, IT Director', image: '/img/platform-graphic.svg' },
          { title: 'Step 2: Provide company context', text: '"They only needed a list of terms and a couple of questions to get us going." - James, CEO', image: '/img/data-graphic.svg' },
          { title: 'Step 3: Get your insights', text: '"Half the questions we\'ve been arguing about for months were answered the next day." - Emily, CMO', image: '/img/insights-graphic.svg' },
        ],
        mobile: true,
      },
      {
        type: 'caseStudy',
        leftImage: '/img/boardroom.png',
        logoImage: '/img/external-logos/slack.png',
        logoAlt: 'Slack',
        headline: 'SusieCakes reduced the cost of support by 30%.',
        story: 'SusieCakes used our platform to identify key pain points and improve the customer experience. Everything was broken down by product and location automatically. The CEO used our dashboard to make decisions with the company\'s board.',
        quote: 'It is now essential to the way our customer support team operates daily, and the way our company makes decisions.',
        author: 'Chad Kilpatrick',
        role: 'CFO',
        link: 'https://www.susiecakes.com/',
        mobile: true,
      },
      {
        type: 'featureRows',
        title: 'Peace of mind without the spreadsheet',
        rows: [
          { image: '/img/boardroom.png', title: 'SOC 2 Compliance', text: 'Data is stored in a secure, single-tenant, isolated environment.' },
          { image: '/img/boardroom.png', title: 'Secure Connections', text: 'Connections are established with secure credentials and are encrypted in transit.' },
          { image: '/img/boardroom.png', title: 'Data Lineage', text: 'We track the data from source to destination, so you can see exactly where it came from and where it went.' },
        ],
        mobile: false,
      },
      {
        type: 'quote',
        text: 'It is now essential to the way our customer support team operates daily, and the way our company makes decisions.',
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

  'csw-youre-early': {
    role: 'CSW',
    industry: 'CSW',
    themeColor: '#7ecbff',
    headline: 'You\'re too early!',
    story: 'This demo will be ready for CSW on Monday, September 15th. In the meantime, book a demo!',
    points: [
      { text: 'Integrate with your existing tools', icon: 'plug' },
      { text: 'Detect themes and quantify impact', icon: 'bullseye' },
      { text: 'Ship weekly readouts, no surveys required', icon: 'calendar' },
    ],
    fields: [
      { title: 'name', type: 'text', placeholder: 'Your name' },
      { title: 'company', type: 'text', placeholder: 'Your company/firm' },
      { title: 'email', type: 'email', placeholder: 'Your email' },
    ],
    cta: 'Book a demo call',
    demoData: {
      title: 'Battery life contributed to $36,434 in Q2 churn.',
      subtext: '232 users\' subscriptions lapsed after complaining to support, 14% of users who did so.',
      bullets: [
        'This represents a 2x increase in battery-related complaints from Q1.',
        'This is the most common complaint brought up, and will likely lead to $54,651 in Q3 churn.'
      ],
      data: {
        type: 'bar', values: [
          { name: 'Q1', value: 30 },
          { name: 'Q2', value: 42 },
          { name: 'Q3', value: 60 },
          { name: 'Q4', value: 85 }
        ]
      },
      leftText: 'A real customer result',
    },
    logos: [
      { image: '/img/external-logos/zendesk.png', alt: 'Zendesk' },
      { image: '/img/external-logos/slack.png', alt: 'Slack' },
      { image: '/img/external-logos/zapier.png', alt: 'Zapier' },
      { image: '/img/external-logos/teams.png', alt: 'Teams' },
      { image: '/img/external-logos/gmail.png', alt: 'Gmail' },
      { image: '/img/external-logos/outlook.png', alt: 'Outlook' },
      { image: '/img/external-logos/activecampaign.png', alt: 'ActiveCampaign' },
      { image: '/img/external-logos/gong.png', alt: 'Gong' },
      { image: '/img/external-logos/chorus.png', alt: 'Chorus' },
      { image: '/img/external-logos/twilio.png', alt: 'Twilio' },
      { image: '/img/external-logos/salesforce.png', alt: 'Salesforce' },
      { image: '/img/external-logos/hubspot.png', alt: 'HubSpot' },
      { image: '/img/external-logos/pipedrive.png', alt: 'Pipedrive' },
      { image: '/img/external-logos/netsuite.png', alt: 'NetSuite' },
      { image: '/img/external-logos/zoho.png', alt: 'Zoho' },
    ],
    typedSections: [
      {
        type: 'process',
        title: 'Get Results in 24 Hours',
        subtitle: 'And in only one meeting.',
        items: [
          { title: 'Step 1: Establish connections', text: '"It was amazing how seamless the integration meeting was. Everything was ready to go." - Bob, IT Director', image: '/img/platform-graphic.svg' },
          { title: 'Step 2: Provide company context', text: '"They only needed a list of terms and a couple of questions to get us going." - James, CEO', image: '/img/data-graphic.svg' },
          { title: 'Step 3: Get your insights', text: '"Half the questions we\'ve been arguing about for months were answered the next day." - Emily, CMO', image: '/img/insights-graphic.svg' },
        ],
        mobile: true,
      },
      {
        type: 'caseStudy',
        leftImage: '/img/boardroom.png',
        logoImage: '/img/external-logos/slack.png',
        logoAlt: 'Slack',
        headline: 'SusieCakes reduced the cost of support by 30%.',
        story: 'SusieCakes used our platform to identify key pain points and improve the customer experience. Everything was broken down by product and location automatically. The CEO used our dashboard to make decisions with the company\'s board.',
        quote: 'It is becoming a major factor in the way our company makes decisions.',
        author: 'Chad Kilpatrick',
        role: 'CFO',
        // link: 'https://www.susiecakes.com/',
        mobile: true,
      },
      {
        type: 'quote',
        text: 'It is becoming a major factor in the way our company makes decisions.',
        author: 'Chad Kilpatrick',
        role: 'CFO',
        mobile: false,
      },
    ],
    bottomCta: {
      title: 'Get your support pipeline in black and white.',
      copy: 'Schedule a demo to see how our platform can help you.',
    },
  }

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
  if (!exampleConfigs[slug]) {
    // Invalid lets-see slug should redirect to home
    window.location.href = '/';
    return null;
  }
  
  const base = exampleConfigs[slug];
  return buildConfig(base, {
    role: query.role,
    industry: query.industry,
    utmSource: query.utmSource,
    utmCampaign: query.utmCampaign,
  });
}
