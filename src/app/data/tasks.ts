export interface Task {
  id: string;
  title: string;
  zone: number;
  content: {
    description: string;
    tips: string[];
    mythVsReality?: { myth: string; reality: string }[];
  };
  quiz: QuizQuestion[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const allTasks: Task[] = [
  // PRIORITY 1: THE ROOTS
  {
    id: 'mitid-setup',
    title: 'MitID & Digital Post',
    zone: 1,
    content: {
      description: 'MitID is your digital key to Denmark. Everything from banking to healthcare requires it. Think of it as your passport to Danish society.',
      tips: [
        'Get your CPR number first before applying',
        'Download the MitID app on your smartphone',
        'Keep your backup codes in a safe place',
        'Digital Post (e-Boks) is mandatory for government communication'
      ],
      mythVsReality: [
        {
          myth: 'I can use my international ID',
          reality: 'MitID is required for all digital services in Denmark'
        },
        {
          myth: 'Digital mail is optional',
          reality: 'All official communication is digital by default'
        }
      ]
    },
    quiz: [
      {
        question: 'What do you need before getting MitID?',
        options: ['A Danish phone number', 'A CPR number', 'A Danish bank account', 'A work permit'],
        correctAnswer: 1,
        explanation: 'You need a CPR number (personal identification number) before you can set up MitID.'
      },
      {
        question: 'Where do official government letters arrive?',
        options: ['By postal mail', 'By email', 'In e-Boks (Digital Post)', 'By SMS'],
        correctAnswer: 2,
        explanation: 'All official government communication goes to your e-Boks (Digital Post), which you access with MitID.'
      }
    ]
  },
  {
    id: 'cpr-card',
    title: 'The Yellow Card (CPR)',
    zone: 1,
    content: {
      description: 'Your CPR card is your golden ticket. This yellow card with your personal number opens doors to healthcare, banking, and even library memberships.',
      tips: [
        'Register at the Citizen Service (Borgerservice) within 5 days of arrival',
        'Bring your passport, housing contract, and work permit',
        'Your CPR number is DDMMYY-XXXX format',
        'The card itself is small - keep it safe!'
      ]
    },
    quiz: [
      {
        question: 'How soon must you register for a CPR number after arriving?',
        options: ['Within 24 hours', 'Within 5 days', 'Within 2 weeks', 'Within a month'],
        correctAnswer: 1,
        explanation: 'You must register at Borgerservice within 5 days of establishing residence in Denmark.'
      },
      {
        question: 'What color is the CPR health insurance card?',
        options: ['Blue', 'Yellow', 'Green', 'Red'],
        correctAnswer: 1,
        explanation: 'The CPR card (sundhedskort) is yellow, earning it the nickname "the yellow card".'
      }
    ]
  },
  {
    id: 'transport',
    title: 'Transport: Rejsekort & Biking',
    zone: 1,
    content: {
      description: 'Denmark runs on bikes and trains. Master the Rejsekort system and learn cyclist hand signals - they\'re not just polite, they\'re expected!',
      tips: [
        'Get a Rejsekort for seamless public transport',
        'Always check in AND out on buses/trains',
        'Learn hand signals: left turn (left arm out), right turn (right arm out), stopping (hand down)',
        'Bike lanes are sacred - pedestrians, stay out!',
        'Get bike lights - it\'s required by law in dark conditions'
      ]
    },
    quiz: [
      {
        question: 'What happens if you forget to check out with your Rejsekort?',
        options: [
          'Nothing, it automatically charges minimum fare',
          'You get charged the maximum fare for that zone',
          'You get a warning',
          'Your card gets blocked'
        ],
        correctAnswer: 1,
        explanation: 'Forgetting to check out results in being charged the maximum possible fare for that journey - always remember to check out!'
      },
      {
        question: 'When cycling, how do you signal a right turn?',
        options: ['Point with right arm extended', 'Ring your bell twice', 'Raise your left arm', 'No signal needed'],
        correctAnswer: 0,
        explanation: 'Extend your right arm straight out to signal a right turn. This is standard cycling etiquette in Denmark.'
      }
    ]
  },
  {
    id: 'waste-management',
    title: 'Waste Sorting: The 10 Categories',
    zone: 1,
    content: {
      description: 'Denmark takes recycling seriously. With up to 10 different waste categories, proper sorting is a rite of passage. Get it wrong and you might get a note from neighbors!',
      tips: [
        'Common categories: paper, cardboard, plastic, metal, glass, food waste, residual',
        'Pizza boxes go in RESIDUAL (restaffald), not paper - they\'re too greasy',
        'Food waste gets composted separately',
        'Check your building\'s specific system - they vary',
        'When in doubt, ask a neighbor rather than guess'
      ]
    },
    quiz: [
      {
        question: 'Where does a greasy pizza box belong?',
        options: ['Paper recycling', 'Cardboard recycling', 'Residual waste (restaffald)', 'Food waste'],
        correctAnswer: 2,
        explanation: 'Greasy pizza boxes go in residual waste (restaffald) because the grease contaminates paper recycling.'
      },
      {
        question: 'What\'s the typical number of waste categories in Danish households?',
        options: ['3-4 categories', '5-6 categories', '7-10 categories', '2 categories'],
        correctAnswer: 2,
        explanation: 'Danish households typically sort waste into 7-10 different categories, depending on the municipality.'
      }
    ]
  },

  // PRIORITY 2: THE TRUNK
  {
    id: 'flat-hierarchy',
    title: 'The Flat Hierarchy at Work',
    zone: 2,
    content: {
      description: 'In Denmark, your boss is "Jens," not "Mr. Jensen." The workplace is remarkably flat, and everyone\'s opinion matters - regardless of title.',
      tips: [
        'Use first names with everyone, including the CEO',
        'Speak up in meetings - silence is seen as disengagement',
        'Challenge ideas respectfully - it\'s encouraged, not rude',
        'Consensus is king - decisions take time but stick'
      ]
    },
    quiz: [
      {
        question: 'How should you address your boss in Denmark?',
        options: ['Mr./Ms. + Last name', 'First name', 'Sir/Madam', 'By their title (Director, Manager)'],
        correctAnswer: 1,
        explanation: 'Danish workplaces use first names for everyone, reflecting the flat hierarchy culture.'
      }
    ]
  },
  {
    id: 'punctuality',
    title: 'Danish Punctuality Culture',
    zone: 2,
    content: {
      description: 'In Denmark, "5 minutes early is on time, on time is late." Punctuality is a sign of respect and professionalism.',
      tips: [
        'Arrive 5-10 minutes early for meetings',
        'If you\'re running late, text immediately',
        'Social events: arriving 10-15 min late is acceptable',
        'Leaving work exactly at closing time is normal and expected'
      ]
    },
    quiz: [
      {
        question: 'What time should you arrive for a 2 PM work meeting?',
        options: ['Exactly 2:00 PM', '1:50-1:55 PM', '2:05 PM', 'Anytime within 15 minutes'],
        correctAnswer: 1,
        explanation: 'Arriving 5-10 minutes early shows respect for others\' time and is standard Danish practice.'
      }
    ]
  },
  {
    id: 'laundry-rules',
    title: 'The Sacred Laundry Room Rules',
    zone: 2,
    content: {
      description: 'Shared laundry rooms (vaskeri) have an unspoken code. Book your time, show up on time, and for the love of hygge, don\'t go over your slot!',
      tips: [
        'Book your time slot in advance (usually on a calendar)',
        'Remove your laundry immediately when done',
        'Clean the lint filter after each use',
        'Never, ever use someone else\'s time slot',
        'If you miss your slot, you lose it - no exceptions'
      ]
    },
    quiz: [
      {
        question: 'What should you do if your laundry isn\'t done when your time slot ends?',
        options: [
          'Stay and finish - it\'s almost done',
          'Book the next slot if available',
          'Take it out wet and finish later',
          'Ask the next person if you can stay'
        ],
        correctAnswer: 2,
        explanation: 'You must respect the next person\'s time slot. If your laundry isn\'t done, take it out and finish later or rebook.'
      }
    ]
  },
  {
    id: 'work-life-balance',
    title: 'Work-Life Balance: The 4 PM Exodus',
    zone: 2,
    content: {
      description: 'Danes work to live, not live to work. Leaving at 4 PM isn\'t lazy - it\'s normal. Family time and hobbies are priorities, not luxuries.',
      tips: [
        'Don\'t expect replies to emails after 4-5 PM',
        'Working late regularly is seen as poor time management',
        'Take your full lunch break - it\'s not optional',
        'Vacation time (5-6 weeks) is sacred and fully expected to be used'
      ]
    },
    quiz: [
      {
        question: 'Why might the office be empty at 4 PM?',
        options: [
          'People are slacking off',
          'It\'s normal working hours end - work-life balance is prioritized',
          'There\'s a company event',
          'It\'s a half-day'
        ],
        correctAnswer: 1,
        explanation: 'Leaving at 4 PM is normal in Denmark. Work-life balance is a core value, and efficiency during work hours is valued over long hours.'
      }
    ]
  },

  // PRIORITY 3: THE CANOPY
  {
    id: 'hygge',
    title: 'Hygge 101: Beyond Candles',
    zone: 3,
    content: {
      description: 'Hygge isn\'t just about cozy blankets and candlelight - it\'s about creating an atmosphere of equality, comfort, and togetherness.',
      tips: [
        'Hygge is democratic - everyone contributes, everyone relaxes',
        'Dim lighting, warm drinks, and good company are essentials',
        'Leave work stress at the door',
        'No bragging or one-upping - keep it egalitarian',
        'Board games and casual conversation > small talk'
      ]
    },
    quiz: [
      {
        question: 'What\'s the most important element of hygge?',
        options: [
          'Expensive candles',
          'Creating atmosphere of equality and togetherness',
          'Danish pastries',
          'A fireplace'
        ],
        correctAnswer: 1,
        explanation: 'While candles and comfort are nice, hygge is fundamentally about creating an equal, relaxed atmosphere where everyone feels comfortable.'
      }
    ]
  },
  {
    id: 'janteloven',
    title: 'Janteloven: The Law of Jante',
    zone: 3,
    content: {
      description: 'The unwritten rule: "Don\'t think you\'re better than anyone else." Modesty is valued; boasting is frowned upon.',
      tips: [
        'Downplay your achievements in conversation',
        'Say "we" instead of "I" when discussing success',
        'Don\'t flash wealth or status symbols',
        'Treat everyone equally regardless of their job or background',
        'Self-deprecating humor is appreciated'
      ]
    },
    quiz: [
      {
        question: 'You just got a big promotion. How do you tell Danish colleagues?',
        options: [
          'Send an excited announcement email',
          'Mention it casually if asked, downplay it',
          'Bring cake and celebrate loudly',
          'Change your email signature immediately'
        ],
        correctAnswer: 1,
        explanation: 'Janteloven encourages modesty. Mention it casually if asked, focus on the team, and don\'t make a big deal of it.'
      }
    ]
  },
  {
    id: 'foreningsliv',
    title: 'Foreningsliv: Association Culture',
    zone: 3,
    content: {
      description: 'Want to make Danish friends? Join a forening (club/association). From kayaking to knitting, there\'s a group for everything.',
      tips: [
        'Search for "foreninger" + your interest + your city',
        'Sports clubs, hobby groups, volunteer orgs are everywhere',
        'Regular attendance builds trust and friendship',
        'It\'s normal to be in multiple foreninger',
        'This is THE way Danes make adult friends'
      ]
    },
    quiz: [
      {
        question: 'What\'s the best way to make Danish friends as an adult?',
        options: [
          'Strike up conversations at bars',
          'Add them on social media',
          'Join a forening (club/association)',
          'Invite them to dinner immediately'
        ],
        correctAnswer: 2,
        explanation: 'Danes typically make friends through shared activities and regular interaction, making foreninger (clubs) the most effective way to build friendships.'
      }
    ]
  },
  {
    id: 'humor',
    title: 'Danish Humor: Sarcasm & Irony',
    zone: 3,
    content: {
      description: 'Danish humor is dry, sarcastic, and often self-deprecating. If you\'re not sure if they\'re joking... they probably are.',
      tips: [
        'Sarcasm is a sign of affection',
        'Self-deprecating jokes are common and safe',
        'Deadpan delivery is the norm',
        'Don\'t take teasing personally - it means they like you',
        'When in doubt, smile and embrace the ambiguity'
      ]
    },
    quiz: [
      {
        question: 'A Danish colleague says "Great weather today!" while it\'s pouring rain. What do they mean?',
        options: [
          'They genuinely love rain',
          'They\'re being sarcastic/ironic',
          'They\'re confused',
          'They\'re testing your weather knowledge'
        ],
        correctAnswer: 1,
        explanation: 'This is classic Danish sarcasm. They\'re using irony to comment on the bad weather in a humorous way.'
      }
    ]
  }
];
