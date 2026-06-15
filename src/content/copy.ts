/**
 * All user-facing text lives here (§0): one edit point, i18n-ready.
 * Copy is final-draft and verbatim from the build spec unless marked illustrative.
 */

export type NavLink = { label: string; href: string };

export type HowCard = {
  label: string;
  tag: string;
  body: string;
  /** Optional pill, e.g. "Coming soon". */
  badge?: string;
};

export const copy = {
  nav: {
    brand: "Rehbar",
    /** Urdu wordmark shown beside the logo. */
    mark: "رہبر",
    links: [
      { label: "How it works", href: "/#how" },
      { label: "Why Rehbar", href: "/#why" },
      { label: "Built to scale", href: "/#scale" },
      { label: "Vision", href: "/vision" },
    ] as NavLink[],
    cta: "Start free",
  },

  hero: {
    eyebrow: "Rehbar · رہبر — the guide who leads from the front",
    headline: "You have the ability. We'll show you the way.",
    subhead:
      "Rehbar helps every student find the right university, see exactly where they stand, and reach it — for free.",
    primaryCta: "Start free",
    secondaryCta: "See how it works",
  },

  problem: {
    headline: "Ability doesn't decide who gets in. Access does.",
    body: "In a big city, a student has counselors, connected parents, and a map through the maze of entry tests and deadlines. An equally talented student in a small town has rumor and luck. Every year, thousands who had earned their place are quietly locked out — not because they couldn't succeed, but because no one showed them how.",
    scaleLine:
      "Millions of students. A handful of elite seats. A guidance gap measured in lives.",
  },

  journey: {
    headline: "Watch a student go from lost to admitted.",
    subhead:
      "Pick a goal, find your universities, see where you stand — then watch the gap close, step by step.",
    label: "An illustrative journey.",
    disclaimer: "Illustrative journey — not real student data.",
  },

  howItWorks: {
    headline: "One guided journey — not a test-prep app, not a forum.",
    cards: [
      {
        label: "Find your path",
        tag: "Counseling",
        body: "Understand what suits you, and where you can realistically get in.",
      },
      {
        label: "See where you stand",
        tag: "Assessment",
        body: "Real practice tests show your exact gap to your target.",
      },
      {
        label: "Close the gap",
        tag: "Prep",
        body: "The teaching layer that gets you there.",
        badge: "Coming soon",
      },
    ] as HowCard[],
    caption:
      "Counseling sets your target → Assessment shows the gap → Prep closes it.",
  },

  moat: {
    headline: "The more students use Rehbar, the smarter it gets.",
    body: "Every counseling conversation and every test result deepens a proprietary understanding of students, programs, and outcomes — guidance that improves over time and can't be easily copied. The integrated journey, powered by AI, has never been built for these students.",
  },

  scale: {
    headline: "Pakistan is the starting line, not the ceiling.",
    body: "Rehbar is one engine. Only the knowledge base changes per market. The same system expands across more verticals, more universities, partner institutions and white-label deployments, and — eventually — more countries that share the same problem.",
    axes: [
      { label: "More verticals", note: "Counseling → Assessment → Prep" },
      { label: "More universities", note: "New knowledge bases, same engine" },
      { label: "Partners & white-label", note: "Institutions deploy Rehbar" },
      { label: "More countries", note: "Same problem, new markets" },
    ],
  },

  impact: {
    headline:
      "A student from a small town getting into LUMS changes a family — and inspires a town.",
    body: "That's the point. Rehbar exists to turn ability into admission for the students opportunity usually skips.",
    storyLabel: "An illustrative student story",
    story: {
      name: "Ayesha",
      detail: "Small town, southern Punjab · dreams of NUST",
      quote:
        "I didn't know what NUST really needed, or whether I even had a chance. Rehbar showed me exactly where I stood and the steps to close the gap. For the first time, the path felt real.",
    },
    reserved: "A real student story and verified outcomes will replace this after beta.",
  },

  finalCta: {
    student: {
      headline: "Find your university — free.",
      cta: "Start free",
    },
    investor: {
      headline: "Building the guidance layer for the developing world.",
      cta: "See the vision",
      secondary: "Talk to us",
    },
  },

  footer: {
    tagline: "The guide who leads from the front.",
    links: [
      { label: "How it works", href: "/#how" },
      { label: "Why Rehbar", href: "/#why" },
      { label: "Built to scale", href: "/#scale" },
      { label: "Vision", href: "/vision" },
      { label: "Contact", href: "mailto:rehbar.official.io@gmail.com" },
      { label: "Privacy", href: "/privacy" },
    ] as NavLink[],
  },

  waitlist: {
    triggerLabel: "Join the waitlist",
    triggerLabelShort: "Join waitlist",
    modalTitle: "Join the waitlist",
    modalSubhead: "Be first in line when Rehbar opens. Free, for students.",
    sectionEyebrow: "Be first",
    sectionHeadline: "Join the waitlist — free.",
    sectionSubhead:
      "Rehbar opens soon. Leave your details and we'll reach out the moment it's ready for students like you.",
    benefits: [
      "Early access the day we launch",
      "Free for students, always",
      "Guidance matched to your goal",
    ],
    fields: {
      name: "Full name",
      phone: "Phone number",
      phoneHint: "We'll only use this to tell you when Rehbar is ready.",
      city: "City",
      education: "Current education",
      educationPlaceholder: "Select your level",
      cityPlaceholder: "Your city",
    },
    educationOptions: [
      "Matric (Grade 9–10)",
      "O-Level",
      "FSc Part I",
      "FSc Part II",
      "A-Level",
      "Intermediate complete",
      "Other",
    ],
    cities: [
      "Karachi",
      "Lahore",
      "Islamabad",
      "Rawalpindi",
      "Faisalabad",
      "Multan",
      "Peshawar",
      "Quetta",
      "Hyderabad",
      "Gujranwala",
      "Sialkot",
      "Bahawalpur",
    ],
    consent: "I agree to be contacted about Rehbar.",
    privacyLink: "Privacy",
    submit: "Join the waitlist",
    submitting: "Joining…",
    successTitle: "You're on the list!",
    successBody:
      "We'll reach out on your phone the moment Rehbar opens. Welcome aboard.",
    errorBody: "Something went wrong. Please try again.",
  },

  // ── /vision route (investor depth, §9.10) ──
  vision: {
    eyebrow: "The vision",
    headline: "Building the guidance layer for the developing world.",
    subhead:
      "Rehbar turns ability into admission for the students opportunity usually skips — starting in Pakistan, built to travel.",
    backToHome: "← Back to home",

    problem: {
      headline: "The problem, at scale",
      body: [
        "Every year millions of students sit entrance exams for a handful of elite seats. The ones who get in are rarely just the most able — they're the ones with access: counselors who know the system, parents who've navigated it, and a clear map through entry tests and deadlines.",
        "An equally talented student in a small town has rumor and luck. The result is a guidance gap measured not in test scores but in lives — talent that never converts into opportunity, simply because no one showed the way.",
      ],
    },

    platform: {
      headline: "One journey, three verticals",
      intro:
        "Rehbar is not a test-prep app or a forum. It's a single guided journey from confusion to admission, built as three connected layers.",
      verticals: [
        {
          name: "Counseling",
          body: "Understand what suits you and where you can realistically get in. Counseling sets the target the rest of the journey aims at.",
        },
        {
          name: "Assessment",
          body: "Real, exam-modelled practice tests show your exact gap to that target — by subject and topic, not a vague score.",
        },
        {
          name: "Prep",
          body: "The teaching layer that closes the gap. In active development — the journey is designed for it from day one.",
          badge: "Coming soon",
        },
      ],
    },

    moat: {
      headline: "Why it compounds",
      body: "Every counseling conversation and every test result deepens a proprietary understanding of students, programs, and outcomes. Guidance improves with use and can't be easily copied — the integrated, AI-powered journey has never been built for these students. The data moat widens with every student served.",
    },

    growth: {
      headline: "The shape of growth",
      intro:
        "Rehbar is one engine. Only the knowledge base changes per market. Growth runs along four axes:",
      axes: [
        {
          label: "More verticals",
          body: "Deepen the stack: Counseling → Assessment → Prep, then beyond.",
        },
        {
          label: "More universities",
          body: "Each new institution is a knowledge base, not a rebuild.",
        },
        {
          label: "Partners & white-label",
          body: "Schools and institutions deploy Rehbar under their own banner.",
        },
        {
          label: "More countries",
          body: "Markets that share the same problem inherit the same engine.",
        },
      ],
    },

    team: {
      headline: "Who's building it",
      body: "A team that has lived this problem — building the guidance they wish they'd had, with the AI and product depth to make it scale. Detailed team profiles are available on request.",
    },

    cta: {
      headline: "Let's talk.",
      body: "If you're an investor or a potential partner, we'd love to show you the journey in depth.",
      primary: "Talk to us",
      secondary: "See it as a student",
    },
  },
} as const;

export type Copy = typeof copy;
