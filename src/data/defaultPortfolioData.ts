// Comprehensive Default Data Models and Initial State for Krish Kumar's Portfolio

export interface HomepageContent {
  eyebrow: string;
  heading: string;
  subrole: string;
  intro: string;
  btn1Text: string;
  btn1Link: string;
  btn2Text: string;
  btn2Link: string;
  heroImage: string;
  heroPills: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  period: string;
  details: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
}

export interface AboutContent {
  tag: string;
  title: string;
  lead: string;
  body: string;
  photo: string;
  pills: string[];
  stats: StatItem[];
  education: EducationItem[];
  experience: ExperienceItem[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  icon: string;
  description: string;
  published: boolean;
  slug?: string;
}

export interface ProjectItem {
  id: string;
  number?: string;
  title: string;
  tagline?: string;
  category: string;
  role?: string;
  client?: string;
  timeline?: string;
  shortDescription: string;
  fullDescription: string;
  coverImage?: string;
  tools: string[];
  liveUrl?: string;
  githubUrl?: string;
  published: boolean;
  metrics?: { label: string; value: string; note?: string }[];
  challenge?: string;
  solution?: string;
  results?: string;
}

export interface CertificateItem {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  credentialId: string;
  link?: string;
  imageUrl?: string;
  description: string;
  published: boolean;
}

export interface BlogContentBlock {
  type: 'lead' | 'heading' | 'paragraph' | 'callout' | 'quote' | 'list';
  level?: 2 | 3;
  title?: string;
  text?: string;
  quote?: string;
  author?: string;
  items?: string[];
}

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  category: string;
  coverBadge?: string;
  readTime: string;
  date: string;
  isoDate?: string;
  featuredImage: string;
  tags: string[];
  published: boolean;
  author: {
    name: string;
    role: string;
  };
  content: BlogContentBlock[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  date: string;
  read: boolean;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  availability: string;
  formEnabled: boolean;
  recipientEmail: string;
  successMessage: string;
  inquiries: ContactInquiry[];
}

export interface SocialLinkItem {
  id: string;
  platform: string;
  label: string;
  url: string;
  icon: string;
  enabled: boolean;
}

export interface SeoConfig {
  title: string;
  metaDescription: string;
  canonicalUrl: string;
  robotsTxt: string;
  ogImage: string;
  keywords: string[];
  enableStructuredData: boolean;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  storagePath?: string;
  category: 'profile' | 'projects' | 'certificates' | 'blog' | 'general';
  fileType: string;
  fileSize?: string;
  dateAdded: string;
}

export interface WebsiteSettings {
  siteName: string;
  logoText: string;
  footerCopyright: string;
  footerTagline: string;
  accentColor: string;
}

export interface PortfolioData {
  homepage: HomepageContent;
  about: AboutContent;
  skills: SkillItem[];
  projects: ProjectItem[];
  certificates: CertificateItem[];
  blog: BlogPostItem[];
  contact: ContactInfo;
  socialLinks: SocialLinkItem[];
  seo: SeoConfig;
  media: MediaItem[];
  settings: WebsiteSettings;
}

export const initialPortfolioData: PortfolioData = {
  homepage: {
    eyebrow: 'Portfolio 2026',
    heading: "Hi, I'm Krish Kumar.",
    subrole: 'Digital Marketer · UI/UX Designer · Creative Strategist',
    intro: 'I create digital experiences, marketing strategies and modern visual designs that connect brands with people.',
    btn1Text: 'View My Work',
    btn1Link: '#work',
    btn2Text: "Let's Connect",
    btn2Link: '#contact',
    heroImage: '/user-profile-image.jpeg',
    heroPills: ['UI / UX Design', 'Digital Marketing', '★ Creative Strategy'],
  },

  about: {
    tag: 'About',
    title: 'More than just marketing.',
    lead: "I'm a creative professional working across digital marketing, UI/UX design, and brand strategy — building experiences that are equal parts thoughtful and effective.",
    body: "My approach blends performance-driven marketing thinking with a designer's eye for detail, using modern experimentation frameworks to move faster without losing craft.",
    photo: '/user-profile-image.jpeg',
    pills: [
      'Digital Marketing',
      'Social Media Marketing',
      'UI/UX Design',
      'Branding',
      'Content Strategy',
      'AI-Powered Creativity',
      'Web Design',
    ],
    stats: [
      { id: 'stat-1', label: 'Ad Spend Managed', value: '$4.2M+' },
      { id: 'stat-2', label: 'Average Client ROAS', value: '3.4x' },
      { id: 'stat-3', label: 'Interfaces Shipped', value: '85+' },
      { id: 'stat-4', label: 'Campaigns Executed', value: '140+' },
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'Bachelor of Business Administration (Marketing & Communications)',
        school: 'University of Delhi',
        period: '2019 - 2022',
        details: 'Focused on Consumer Behavior, Market Research, and Digital Advertising Channels.',
      },
    ],
    experience: [
      {
        id: 'exp-1',
        role: 'Senior Growth Marketer & UI Lead',
        company: 'Apex Digital Agency',
        period: '2023 - Present',
        description: 'Directing omnichannel acquisition funnels across Meta and Google Ads, supervising design sprint executions and scalable Figma design systems for 12 client portfolios.',
      },
      {
        id: 'exp-2',
        role: 'Digital Marketing Strategist',
        company: 'Nexus Growth Lab',
        period: '2022 - 2023',
        description: 'Engineered conversion-optimized landing pages and telemetry pipelines resulting in a 42% lift in qualified lead volume.',
      },
      {
        id: 'exp-3',
        role: 'Creative Designer & Content Specialist',
        company: 'Verve Creative Studio',
        period: '2021 - 2022',
        description: 'Designed social media campaign collateral, motion ad units, and brand identity kits for direct-to-consumer lifestyle brands.',
      },
    ],
  },

  skills: [
    {
      id: 'skill-1',
      name: 'Digital Marketing',
      category: 'Performance Marketing',
      proficiency: 95,
      icon: '🎯',
      description: 'Omnichannel growth strategies, multi-tier funnel optimization and data-backed user acquisition.',
      published: true,
      slug: 'digital-marketing',
    },
    {
      id: 'skill-2',
      name: 'Social Media Marketing',
      category: 'Creative Strategy',
      proficiency: 92,
      icon: '📱',
      description: 'High-engagement editorial calendars, community storytelling, and viral social campaign planning.',
      published: true,
      slug: 'social-media-marketing',
    },
    {
      id: 'skill-3',
      name: 'Performance Marketing',
      category: 'Performance Marketing',
      proficiency: 96,
      icon: '⚡',
      description: 'Targeted paid acquisition across Meta & Google Ads with rigorous CAC/ROAS telemetry.',
      published: true,
      slug: 'performance-marketing',
    },
    {
      id: 'skill-4',
      name: 'SEO',
      category: 'Performance Marketing',
      proficiency: 88,
      icon: '🔍',
      description: 'Technical search audits, high-intent keyword mapping, and evergreen content architecture.',
      published: true,
      slug: 'seo',
    },
    {
      id: 'skill-5',
      name: 'Content Strategy',
      category: 'Creative Strategy',
      proficiency: 90,
      icon: '✍️',
      description: 'Audience persona research, brand voice guidelines, and distribution narratives that convert.',
      published: true,
      slug: 'content-strategy',
    },
    {
      id: 'skill-6',
      name: 'UI/UX Design',
      category: 'UI/UX Design',
      proficiency: 94,
      icon: '🎨',
      description: 'Design systems in Figma, user journey mapping, and conversion-centered product prototypes.',
      published: true,
      slug: 'ui-ux-design',
    },
    {
      id: 'skill-7',
      name: 'Branding & Identity',
      category: 'Creative Strategy',
      proficiency: 89,
      icon: '✦',
      description: 'Visual identity kits, typography pairing, logo concepts, and comprehensive brand books.',
      published: true,
      slug: 'branding',
    },
    {
      id: 'skill-8',
      name: 'Analytics & Telemetry',
      category: 'Technical & Tools',
      proficiency: 91,
      icon: '📊',
      description: 'GA4 custom funnel measurement, Server-Side CAPI, Looker Studio reporting dashboards.',
      published: true,
      slug: 'analytics',
    },
  ],

  projects: [
    {
      id: 'digital-marketing-campaign',
      number: '01',
      title: 'Digital Marketing Campaign',
      tagline: 'Full-Funnel Paid Acquisition & Scaled Conversion Telemetry',
      category: 'Growth & Acquisition',
      role: 'Lead Growth Strategist & Campaign Architect',
      client: 'Aura FinTech Global',
      timeline: 'Q3-Q4 2025 · 4 Months',
      shortDescription: 'Comprehensive multi-channel paid acquisition strategy scaling paid subscriber volume by 185% while cutting CAC by 34%.',
      fullDescription: 'Engineered a high-performing full-funnel digital marketing engine designed to scale paid subscriber acquisition while maintaining positive unit economics. Synchronized Meta Ads dynamic creative testing with high-intent Google Search capture to build a repeatable lead generation flywheel.',
      coverImage: '/user-profile-image.jpeg',
      tools: ['Meta Ads Manager', 'Google Ads', 'GA4', 'Looker Studio', 'Figma', 'Zapier'],
      liveUrl: 'https://example.com/campaign-portal',
      githubUrl: 'https://github.com/krishkumar/fintech-acquisition-system',
      published: true,
      metrics: [
        { label: 'ROAS Achieved', value: '3.62x', note: 'vs 2.1x target benchmark' },
        { label: 'CAC Reduction', value: '-34%', note: 'blended across all paid channels' },
        { label: 'Total Conversions', value: '18,450', note: 'verified in-app registrations' },
      ],
      challenge: 'Elevated ad costs in a crowded financial niche, tightening privacy restrictions, and high drop-off on legacy onboarding screens.',
      solution: 'Deployed a 3-tier audience architecture with automated dynamic creative testing matrices and frictionless 1-tap mobile signup flows.',
      results: 'Delivered $1.42M in attributable customer lifetime value at an overall return of 3.62x ROAS over a 16-week window.',
    },
    {
      id: 'social-media-strategy',
      number: '02',
      title: 'Social Media Strategy',
      tagline: 'Organic Community Architecture & Viral Content Engine',
      category: 'Brand & Community',
      role: 'Creative Content Director',
      client: 'Lumina Home & Living',
      timeline: 'Q1-Q2 2025 · 6 Months',
      shortDescription: 'Organic brand repositioning and short-form video narrative delivering 4.8M impressions and 310% follower growth.',
      fullDescription: 'Built an editorial content machine across Instagram, TikTok, and YouTube Shorts centered around interior styling transformations and sustainable manufacturing stories.',
      coverImage: '/user-profile-image.jpeg',
      tools: ['CapCut Pro', 'Figma', 'Later / Buffer', 'Canva Enterprise', 'Sprout Social'],
      liveUrl: 'https://example.com/lumina-case-study',
      githubUrl: '',
      published: true,
      metrics: [
        { label: 'Organic Impressions', value: '4.8M+', note: 'across Instagram & TikTok' },
        { label: 'Follower Growth', value: '+310%', note: 'from 8k to 33k engaged followers' },
        { label: 'Bio Link CTR', value: '8.4%', note: 'industry benchmark is 1.8%' },
      ],
      challenge: 'Low organic reach, inconsistent visual identity, and inability to attribute social engagement to e-commerce store checkouts.',
      solution: 'Defined three recurring signature content pillars, produced 60 high-velocity short-form reels, and established a micro-influencer gifting ring.',
      results: 'Generated $190,000 in tracked organic Shopify revenue directly traced to social bio referral codes.',
    },
    {
      id: 'performance-marketing',
      number: '03',
      title: 'Performance Marketing',
      tagline: 'Data-Driven Multi-Tier Funnel Optimization for D2C',
      category: 'Paid Media',
      role: 'Head of Paid Acquisition',
      client: 'Kinetix Athletic Wear',
      timeline: 'Q2-Q3 2025 · 5 Months',
      shortDescription: 'High-frequency creative testing and Advantage+ Shopping campaigns delivering consistent 4.2x ROAS on scale.',
      fullDescription: 'Restructured paid advertising accounts from fragmented interest ad sets into consolidated broad Advantage+ structures paired with localized creative variations.',
      coverImage: '/user-profile-image.jpeg',
      tools: ['Meta Advantage+', 'Google Performance Max', 'Klaviyo', 'Shopify Plus'],
      liveUrl: 'https://example.com/kinetix-case-study',
      githubUrl: '',
      published: true,
      metrics: [
        { label: 'Blended ROAS', value: '4.18x', note: 'over $180k ad expenditure' },
        { label: 'Monthly Revenue', value: '$750k+', note: 'peak scaling month achieved' },
        { label: 'Cart Conversion', value: '3.8%', note: 'up from 2.1% baseline' },
      ],
      challenge: 'High creative fatigue every 10 days and ad spend capping out at $2,000/day without efficiency deteriorating.',
      solution: 'Instituted a modular creative testing framework where 8 hooks, 4 body angles, and 3 CTAs were mixed programmatically every week.',
      results: 'Unlocked profitable scaling to $7,500/day while keeping blended return above 4.1x throughout Black Friday and Cyber Week.',
    },
    {
      id: 'ui-ux-design',
      number: '04',
      title: 'UI/UX Design',
      tagline: 'Modern Design System & High-Conversion SaaS Onboarding',
      category: 'Product Design',
      role: 'Principal Product Designer',
      client: 'Strata Cloud Analytics',
      timeline: 'Q4 2024 - Q1 2025 · 3 Months',
      shortDescription: 'Complete product redesign and component library overhaul in Figma resulting in a 52% reduction in user onboarding drop-off.',
      fullDescription: 'Transformed a legacy enterprise analytics dashboard into an intuitive, keyboard-accessible dark-mode workspace powered by semantic design tokens and micro-interactions.',
      coverImage: '/user-profile-image.jpeg',
      tools: ['Figma', 'Design Tokens', 'Tailwind CSS', 'Framer', 'UserTesting'],
      liveUrl: 'https://example.com/strata-preview',
      githubUrl: 'https://github.com/krishkumar/strata-design-system',
      published: true,
      metrics: [
        { label: 'Onboarding Completion', value: '88%', note: 'up from 36% previous version' },
        { label: 'Figma Components', value: '180+', note: 'with auto-layout & variable modes' },
        { label: 'SUS Usability Score', value: '92 / 100', note: 'top quartile product grade' },
      ],
      challenge: 'Dense data tables, high cognitive load, and convoluted multi-step project provisioning wizards.',
      solution: 'Designed progressive disclosure cards, unified typography and spacing grids, and introduced interactive guided walkthroughs.',
      results: 'Average time-to-first-value dropped from 14 minutes to under 3 minutes with zero customer support tickets during beta rollout.',
    },
  ],

  certificates: [
    {
      id: 'cert-1',
      name: 'Google Digital Marketing & E-Commerce',
      organization: 'Google',
      issueDate: '2025',
      credentialId: 'GOOG-DM-88492',
      link: 'https://coursera.org/verify/professional-cert/google-digital-marketing',
      imageUrl: '/user-profile-image.jpeg',
      description: 'Verified credential in multi-channel digital marketing, audience building, attribution, and e-commerce optimization.',
      published: true,
    },
    {
      id: 'cert-2',
      name: 'Meta Certified Digital Marketing Associate',
      organization: 'Meta',
      issueDate: '2025',
      credentialId: 'META-DMA-10924',
      link: 'https://www.credly.com/org/meta',
      imageUrl: '/user-profile-image.jpeg',
      description: 'Certified mastery in Meta Ads Manager, creative strategy, cross-platform audience targeting, and analytics telemetry.',
      published: true,
    },
    {
      id: 'cert-3',
      name: 'Advanced UI/UX Design Specialization',
      organization: 'Interaction Design Foundation (IxDF)',
      issueDate: '2024',
      credentialId: 'IXDF-UXD-55102',
      link: 'https://www.interaction-design.org',
      imageUrl: '/user-profile-image.jpeg',
      description: 'Specialized credential covering human-computer interaction, heuristic evaluation, rapid prototyping, and user testing frameworks.',
      published: true,
    },
    {
      id: 'cert-4',
      name: 'Inbound Marketing & Content Strategy',
      organization: 'HubSpot Academy',
      issueDate: '2024',
      credentialId: 'HS-INB-77291',
      link: 'https://academy.hubspot.com',
      imageUrl: '/user-profile-image.jpeg',
      description: 'Certified methodology in content inbound funnels, lead nurturing, organic authority building, and persona segmentation.',
      published: true,
    },
  ],

  blog: [
    {
      id: 'blog-1',
      slug: 'scaling-meta-ads-roas-2026',
      title: 'How to Scale Meta Ads to 3.5x ROAS in 2026: A Blueprint for Creative Testing',
      tagline: 'Why dynamic creative iteration, first-party signal telemetry, and message-scent landing pages are outperforming broad interest hacking.',
      shortDescription: 'In-depth playbook detailing how to escape ad fatigue, leverage Advantage+ shopping campaigns, and build modular creative matrices.',
      category: 'Growth & Acquisition',
      coverBadge: 'Paid Media Strategy',
      readTime: '7 min read',
      date: 'October 18, 2025',
      isoDate: '2025-10-18T09:00:00+00:00',
      featuredImage: '/user-profile-image.jpeg',
      tags: ['Meta Ads', 'Performance Marketing', 'Creative Strategy', 'ROAS', 'Growth'],
      published: true,
      author: {
        name: 'Krish Kumar',
        role: 'Digital Marketer & Creative Strategist',
      },
      content: [
        {
          type: 'lead',
          text: 'The era of micro-targeting sub-audiences and hoping algorithm tricks compensate for mediocre creative is officially over. In 2026, ad creative IS your targeting.',
        },
        {
          type: 'heading',
          level: 2,
          text: '1. The Death of 50-Interest Stacks',
        },
        {
          type: 'paragraph',
          text: 'Machine learning bidding engines now ingest first-party user intent signals faster than any media buyer can manually adjust bids. When you constrict delivery with narrow interest overlaps, you suffocate the delivery engine.',
        },
        {
          type: 'callout',
          title: 'Core Creative Rule',
          text: 'Instead of finding people who want your product, create ad angles that disqualify everyone except your ideal customer within the first 2 seconds.',
        },
        {
          type: 'heading',
          level: 2,
          text: '2. The Modular Creative Testing Framework',
        },
        {
          type: 'paragraph',
          text: 'We test assets using a 3x3x2 matrix: 3 distinct visual hooks (Problem, Counter-Intuitive, Demonstration), 3 message bodies (Social Proof, Feature Breakdown, Founder Vulnerability), and 2 clear conversion CTAs.',
        },
      ],
      seoTitle: 'How to Scale Meta Ads to 3.5x ROAS in 2026 | Krish Kumar',
      seoDescription: 'Discover the exact creative testing blueprint and Advantage+ campaign architecture used to scale paid acquisition while cutting CAC by 34%.',
    },
    {
      id: 'blog-2',
      slug: 'design-tokens-figma-code',
      title: 'Architecting Design Tokens in Figma for Zero-Friction Code Handoff',
      tagline: 'A systematic approach to typography, color palettes, spacing grids, and theme modes that align design with production frontend code.',
      shortDescription: 'How bridging Figma variables with Tailwind CSS tokens eliminates handoff debates and prevents visual drift across multi-device applications.',
      category: 'UI/UX Design',
      coverBadge: 'Design Systems',
      readTime: '6 min read',
      date: 'September 24, 2025',
      isoDate: '2025-09-24T11:00:00+00:00',
      featuredImage: '/user-profile-image.jpeg',
      tags: ['Figma', 'Design Systems', 'UI/UX', 'Tailwind CSS', 'Workflow'],
      published: true,
      author: {
        name: 'Krish Kumar',
        role: 'Digital Marketer & Creative Strategist',
      },
      content: [
        {
          type: 'lead',
          text: 'Visual inconsistencies across web products rarely stem from poor design—they stem from a language barrier between Figma artboards and CSS implementations.',
        },
        {
          type: 'heading',
          level: 2,
          text: 'Establishing Semantic Token Levels',
        },
        {
          type: 'paragraph',
          text: 'Never expose raw hex codes or fixed pixel values to your engineering team. Structure your tokens into three hierarchical tiers: Primitive (Global), Semantic (Contextual), and Component-specific.',
        },
      ],
      seoTitle: 'Architecting Design Tokens in Figma for Zero-Friction Handoff | Krish Kumar',
      seoDescription: 'Learn how to set up Figma variables, semantic tokens, and Tailwind CSS mappings for cohesive enterprise design systems.',
    },
  ],

  contact: {
    email: 'hello@krishkumar.design',
    phone: '+91 98765 43210',
    location: 'New Delhi, India (Available Worldwide · UTC+5:30)',
    availability: 'Available for Q2/Q3 Projects & Select Growth Consultations',
    formEnabled: true,
    recipientEmail: 'hello@krishkumar.design',
    successMessage: 'Thank you for reaching out! Your message has been received and I typically respond within 24 hours.',
    inquiries: [
      {
        id: 'inq-1',
        name: 'Sarah Jenkins',
        email: 'sarah.j@elevatestudio.co',
        subject: 'Q3 Brand Re-launch & Paid Acquisition Sprint',
        message: 'Hi Krish, loved your Meta Ads case study. We are preparing to roll out a new wellness app in July and would love to discuss a 3-month growth partnership.',
        date: '2026-09-28 14:15',
        read: false,
      },
      {
        id: 'inq-2',
        name: 'Marcus Vance',
        email: 'mvance@strata-analytics.io',
        subject: 'Figma Design System Advisory',
        message: 'Hey Krish, looking for a design systems architect to audit our B2B SaaS interface and establish tokens. Are you taking on advisory contracts?',
        date: '2026-09-27 09:30',
        read: true,
      },
    ],
  },

  socialLinks: [
    {
      id: 'soc-1',
      platform: 'LinkedIn',
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/krishkumar',
      icon: 'linkedin',
      enabled: true,
    },
    {
      id: 'soc-2',
      platform: 'Instagram',
      label: 'Instagram',
      url: 'https://instagram.com/krishkumar.design',
      icon: 'instagram',
      enabled: true,
    },
    {
      id: 'soc-3',
      platform: 'Twitter',
      label: 'Twitter / X',
      url: 'https://x.com/krishkumar_ui',
      icon: 'twitter',
      enabled: true,
    },
    {
      id: 'soc-4',
      platform: 'GitHub',
      label: 'GitHub',
      url: 'https://github.com/krishkumar',
      icon: 'github',
      enabled: true,
    },
    {
      id: 'soc-5',
      platform: 'Dribbble',
      label: 'Dribbble',
      url: 'https://dribbble.com/krishkumar',
      icon: 'dribbble',
      enabled: true,
    },
    {
      id: 'soc-6',
      platform: 'Email',
      label: 'Direct Email',
      url: 'mailto:hello@krishkumar.design',
      icon: 'mail',
      enabled: true,
    },
  ],

  seo: {
    title: 'Krish Kumar — Digital Marketer, UI/UX Designer & Creative Strategist',
    metaDescription: 'Personal portfolio of Krish Kumar — Digital Marketer, UI/UX Designer & Creative Strategist. Building digital experiences, modern visual designs and high-impact campaigns.',
    canonicalUrl: 'https://ais-dev-73voorynbsph76iezefq2l-597436389474.asia-southeast1.run.app/',
    robotsTxt: `User-agent: *
Allow: /
Allow: /blog
Allow: /blog/*

Sitemap: https://ais-dev-73voorynbsph76iezefq2l-597436389474.asia-southeast1.run.app/sitemap.xml`,
    ogImage: '/user-profile-image.jpeg',
    keywords: [
      'Digital Marketing',
      'UI/UX Design',
      'Creative Strategist',
      'Performance Marketing',
      'Meta Ads',
      'Figma Design Systems',
      'Krish Kumar Portfolio',
    ],
    enableStructuredData: true,
  },

  media: [
    {
      id: 'med-1',
      name: 'user-profile-image.jpeg',
      url: '/user-profile-image.jpeg',
      category: 'profile',
      fileType: 'image/jpeg',
      fileSize: '142 KB',
      dateAdded: '2026-09-29',
    },
    {
      id: 'med-2',
      name: 'hero-portrait-card.jpg',
      url: '/krish_hero.jpg',
      category: 'profile',
      fileType: 'image/jpeg',
      fileSize: '128 KB',
      dateAdded: '2026-09-29',
    },
  ],

  settings: {
    siteName: 'Krish Kumar',
    logoText: 'Krish Kumar',
    footerCopyright: '© 2026 Krish Kumar',
    footerTagline: 'Designed & crafted by Krish Kumar',
    accentColor: '#111111',
  },
};
