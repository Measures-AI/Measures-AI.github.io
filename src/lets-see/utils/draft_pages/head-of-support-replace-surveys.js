export const slug = 'head-of-support-replace-surveys';

export const config = {
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
      type: 'bar',
      values: [
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
}; 