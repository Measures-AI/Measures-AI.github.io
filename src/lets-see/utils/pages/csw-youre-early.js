export const slug = 'csw-youre-early';

export const config = {
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
      type: 'bar', 
      values: [
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
        { title: 'Step 1: Establish connections', text: 'All that is needed is an API key and a few minutes to set up.', image: '/img/platform-graphic.svg' },
        { title: 'Step 2: Provide company context', text: 'We\'ll ask you a few questions to get started.', image: '/img/data-graphic.svg' },
        { title: 'Step 3: Get your insights', text: 'We\'ll send you a weekly report with the insights you need.', image: '/img/insights-graphic.svg' },
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
  tracking: {
    leadValue: 120,
    leadType: 'Demo Request',
    formVariant: 'A'
  }
}; 