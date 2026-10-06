// Content for the Personalization component. Each audience maps to the tabs
// shown for it; `art` picks the placeholder illustration for the right column.
export const AUDIENCES = [
  {
    id: 'new',
    label: 'new to trading',
    tabs: [
      {
        id: 'intro-markets',
        icon: 'search',
        title: 'Introduction to the financial markets',
        art: 'markets',
        body: [
          'Financial markets are how people and companies buy and sell assets: shares, indices, currencies, commodities and more.',
          'People have traded financial markets for hundreds of years. They grew out of a practical need: to help people buy and sell things more efficiently, and to help companies that need money to raise it quickly.',
        ],
        cta: 'Read more about financial markets',
      },
      {
        id: 'what-is-forex',
        icon: 'exchange',
        title: 'What is forex?',
        art: 'forex',
        body: [
          'Forex, or foreign exchange, is the global market for buying and selling currencies. It is the largest and most liquid financial market in the world.',
          'Currencies are traded in pairs, such as EUR/USD. When you trade a pair, you are speculating on whether one currency will strengthen or weaken against the other.',
        ],
        cta: 'Learn the basics of forex',
      },
      {
        id: 'tools-overview',
        icon: 'tools',
        title: 'Tools overview',
        art: 'tools',
        body: [
          'From economic calendars to price alerts, the right tools help you stay informed and make more confident decisions.',
          'Explore the charting, research and risk-management features available to you, and find out how each one fits into your trading routine.',
        ],
        cta: 'Explore our trading tools',
      },
      {
        id: 'platform-comparison',
        icon: 'compare',
        title: 'Platform comparison',
        art: 'platforms',
        body: [
          'Web, desktop or mobile? Every platform has its strengths, and the best choice depends on how and where you like to trade.',
          'Compare features, order types and charting side by side to find the platform that suits you best.',
        ],
        cta: 'Compare our platforms',
      },
    ],
  },
  {
    id: 'experienced',
    label: 'an experienced trader',
    tabs: [
      {
        id: 'our-costs',
        icon: 'search',
        title: 'Our Costs',
        art: 'costs',
        body: [
          'Trust is at the heart of our business. That’s why we’re committed to complete transparency about the costs and adjustments you may incur. Spreads, commissions, rollovers and more are all detailed on our dedicated page.',
        ],
        cta: 'View our trading costs and charges',
      },
      {
        id: 'performance-analytics',
        icon: 'chart',
        title: 'Performance Analytics',
        art: 'analytics',
        body: [
          'Understand what drives your results. Performance Analytics breaks down your trading history to highlight strengths, weaknesses and behavioural patterns.',
          'Use the insights to refine your strategy and make data-led decisions.',
        ],
        cta: 'Discover Performance Analytics',
      },
      {
        id: 'pivot-points',
        icon: 'bolt',
        title: 'Pivot Points',
        art: 'pivots',
        body: [
          'Pivot points are a popular technical indicator used to identify potential support and resistance levels.',
          'Learn how to calculate them, how to read them on a chart, and how traders use them to plan entries, exits and stop levels.',
        ],
        cta: 'Read our guide to pivot points',
      },
    ],
  },
  {
    id: 'professional',
    label: 'a professional client',
    tabs: [
      {
        id: 'pro-eligibility',
        icon: 'badge',
        title: 'Eligibility',
        art: 'costs',
        body: [
          'Professional status is available to clients who meet set criteria around trading activity, portfolio size and relevant financial-sector experience.',
          'Find out whether you qualify and what changes when you opt up.',
        ],
        cta: 'Check your eligibility',
      },
      {
        id: 'pro-api',
        icon: 'code',
        title: 'API trading',
        art: 'tools',
        body: [
          'Connect your own systems directly to our pricing and execution with a low-latency trading API.',
          'Automate strategies, stream market data and manage orders programmatically.',
        ],
        cta: 'Explore the API documentation',
      },
      {
        id: 'pro-support',
        icon: 'support',
        title: 'Dedicated support',
        art: 'analytics',
        body: [
          'Professional clients get a dedicated account manager and priority access to our trading desk, around the clock.',
        ],
        cta: 'Meet your account team',
      },
    ],
  },
]
