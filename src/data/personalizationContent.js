// Content for the Personalization component, written for "Pacewise", a
// fictional running-coach brand. Each audience maps to the tabs shown for it;
// `art` picks the illustration in the media column.
export const AUDIENCES = [
  {
    id: 'starting',
    label: 'just getting started',
    tabs: [
      {
        id: 'first-5k',
        icon: 'flag',
        title: 'Your first 5K',
        art: 'sunrise',
        body: [
          'Five kilometres is the perfect first goal: far enough to feel like an achievement, close enough to reach in a couple of months.',
          'Our walk–run approach builds up gradually, three short sessions a week, so your body adapts without feeling overwhelmed.',
        ],
        cta: 'Start the 8-week plan',
      },
      {
        id: 'building-habit',
        icon: 'calendar',
        title: 'Building the habit',
        art: 'calendar',
        body: [
          'Consistency beats intensity. A short run you actually do is worth more than a long one you keep putting off.',
          'Pick fixed days, lay your kit out the night before and track your streak. Small wins add up fast.',
        ],
        cta: 'Get habit-building tips',
      },
      {
        id: 'choosing-kit',
        icon: 'shoe',
        title: 'Choosing your kit',
        art: 'route',
        body: [
          'You don’t need much to begin, but comfortable shoes make a real difference.',
          'Learn what to look for in cushioning and fit, and which extras are worth it and which can wait.',
        ],
        cta: 'Read the beginner kit guide',
      },
      {
        id: 'injury-free',
        icon: 'heart',
        title: 'Staying injury-free',
        art: 'pulse',
        body: [
          'Most early niggles come from doing too much, too soon. Rest days are part of training, not a break from it.',
          'Simple warm-ups and a few minutes of strength work each week go a long way.',
        ],
        cta: 'See our warm-up routine',
      },
    ],
  },
  {
    id: 'racing',
    label: 'training for a race',
    tabs: [
      {
        id: 'training-plans',
        icon: 'chart',
        title: 'Training plans',
        art: 'track',
        body: [
          'From 10K to marathon, our plans adapt to your current fitness and the number of days you can train each week.',
          'Each block balances easy miles, speed sessions and recovery so you arrive at the start line fresh.',
        ],
        cta: 'Find your plan',
      },
      {
        id: 'pacing',
        icon: 'stopwatch',
        title: 'Pacing strategy',
        art: 'stopwatch',
        body: [
          'Going out too fast is the most common race-day mistake. A steady, even pace almost always wins out.',
          'Use our pace calculator to set realistic splits for your goal time.',
        ],
        cta: 'Try the pace calculator',
      },
      {
        id: 'fuelling',
        icon: 'drop',
        title: 'Race-day fuelling',
        art: 'mountain',
        body: [
          'What you eat and drink in the days before a race matters as much as what you take on during it.',
          'Practise your fuelling on long training runs so nothing on race day is new.',
        ],
        cta: 'Plan your fuelling',
      },
    ],
  },
  {
    id: 'returning',
    label: 'coming back after a break',
    tabs: [
      {
        id: 'easing-back',
        icon: 'refresh',
        title: 'Easing back in',
        art: 'sunrise',
        body: [
          'Fitness returns faster than you think, but your joints and tendons need time to catch up with your lungs.',
          'Start at around half your old volume and build by no more than 10% a week.',
        ],
        cta: 'Follow the return-to-run plan',
      },
      {
        id: 'strength',
        icon: 'dumbbell',
        title: 'Strength & mobility',
        art: 'calendar',
        body: [
          'Two short strength sessions a week help protect against the aches that often come with a comeback.',
          'Focus on hips, glutes and calves. No gym required.',
        ],
        cta: 'Try a 15-minute session',
      },
      {
        id: 'listening',
        icon: 'heart',
        title: 'Listening to your body',
        art: 'pulse',
        body: [
          'Learn the difference between normal training soreness and pain that means it’s time to rest.',
          'If something doesn’t feel right, check in with a health professional before pushing on.',
        ],
        cta: 'Read the guide',
      },
    ],
  },
]
