import { ProjectItem, ServiceItem, CreativeItem, ProcessStep, ValuePoint, StatItem } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';

export const PROFILE_INFO = {
  name: SITE_CONFIG.NAME,
  title: SITE_CONFIG.TITLE,
  badge: "9+ years in content • SEO • editorial workflows • market research",
  email: SITE_CONFIG.EMAIL,
  location: SITE_CONFIG.LOCATION,
  heroImage: SITE_CONFIG.HERO_IMAGE,
  avatarImage: SITE_CONFIG.AVATAR_IMAGE,
  headline: "Content That Thinks. Writes. Performs.",
  subheadline: "I turn complex research and business ideas into clear, credible, search-optimized content that helps brands educate, engage, and convert the right audience.",
  topics: ["SEO Content", "B2B", "Research", "Strategy", "Editorial"] as const
};

export const SERVICES: ServiceItem[] = [
  {
    id: "seo-content",
    number: "01",
    phase: "Discovery",
    title: "SEO Content",
    description: "Blogs, articles, FAQs, topic-led content, on-page optimization, and deep search-intent alignment built for sustainable compound ranking.",
    icon: "search",
    deliverables: [
      "Topic clusters & semantic pillar architecture",
      "Search-intent mapping across informational & commercial queries",
      "On-page heading, metadata, and schema optimization",
      "Competitive keyword gap analysis & refresh schedules"
    ],
    idealFor: "B2B brands, growth-stage tech startups, and digital publishers looking for durable organic search equity.",
    outcome: "Higher organic visibility, lower CAC, and content assets that continue ranking over time."
  },
  {
    id: "b2b-research",
    number: "02",
    phase: "Synthesis",
    title: "B2B & Research Content",
    description: "Research-heavy articles and business content that turn complex datasets and intricate industry topics into accessible, authoritative insights.",
    icon: "query_stats",
    deliverables: [
      "Primary & secondary research synthesis into executive reports",
      "Market feasibility summaries and whitepapers",
      "Complex industry jargon translation into clear executive briefs",
      "Data-backed narrative storytelling"
    ],
    idealFor: "Market research consultancies, manufacturing leaders, enterprise SaaS, and intelligence firms.",
    outcome: "Positions your firm as the foremost intellectual authority that buyers reference and trust."
  },
  {
    id: "website-conversion",
    number: "03",
    phase: "Conversion",
    title: "Website & Conversion Content",
    description: "Clear, audience-focused website and landing-page copy structured around genuine commercial objectives and seamless digital flows.",
    icon: "web",
    deliverables: [
      "Information architecture & page flow wireframing",
      "Value proposition refinement & punchy hero headers",
      "Feature-to-benefit narrative translation",
      "High-converting microcopy & context-aware CTAs"
    ],
    idealFor: "Founders launching new products, redesigning corporate websites, or seeking higher inbound funnel velocity.",
    outcome: "Immediate audience comprehension and measurable uplift in inquiry conversions."
  },
  {
    id: "content-strategy",
    number: "04",
    phase: "Governance",
    title: "Content Strategy & Management",
    description: "Editorial planning, calendar governance, structured review workflows, ongoing quality assurance, and end-to-end publishing roadmaps.",
    icon: "calendar_view_day",
    deliverables: [
      "Editorial roadmap development",
      "Brand voice guidelines & editorial style documentation",
      "Multi-stage review workflows & quality assurance rubrics",
      "Content lifecycle governance (audit, refresh, retire)"
    ],
    idealFor: "Marketing directors and teams lacking senior editorial bandwidth to organize and scale content production.",
    outcome: "Consistent publishing cadence, zero deadline bottlenecks, and unified quality across channels."
  },
  {
    id: "social-thought-leadership",
    number: "05",
    phase: "Amplification",
    title: "Social & Thought Leadership",
    description: "Professional social writing and perspective-led narratives that extend the authority and reach of foundational long-form assets.",
    icon: "campaign",
    deliverables: [
      "Executive LinkedIn thought leadership & perspective essays",
      "Repurposing long-form whitepapers into punchy carousels",
      "Substack newsletters & curated industry letters",
      "Point-of-view commentary on emerging market trends"
    ],
    idealFor: "C-suite executives, founders, and subject matter experts building personal & company brand authority.",
    outcome: "Amplified organic brand reach, industry recognition, and inbound speaking & partner opportunities."
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "real-estate-dynamics",
    title: "Beyond the Blueprint: Insights on India's Evolving Real Estate Dynamics",
    tag: "Research / Industry Content",
    description: "Research-led industry content focused on changing real-estate dynamics and market insights.",
    type: "Analysis Report",
    category: "B2B",
    categories: ["B2B", "Research"],
    url: SITE_CONFIG.PORTFOLIO_LINKS.REAL_ESTATE_DYNAMICS,
    platform: "Industry Briefing",
    year: "2023",
    readTime: "7 min read",
    deliverables: [
      "Macroeconomic policy impact assessment",
      "Tier-1 vs Tier-2 residential inventory breakdown",
      "REIT market adoption trajectories"
    ],
    challenge: "The commercial and residential real estate sector was undergoing shifts post-regulatory reforms and hybrid work adoption. Stakeholders were inundated with fragmented data points.",
    approach: "Synthesized statutory filings, institutional surveys, and municipal infrastructure announcements into a unified narrative highlighting structural demand over speculative buying.",
    sampleExcerpt: "Urban real estate in India has migrated past the speculative era. Buyers no longer evaluate square footage in isolation; infrastructure connectivity, sustainability certifications, and flexible layout adaptability have emerged as valuation drivers.",
    keyInsights: [
      "Tier-2 secondary cities demonstrated an increase in structured residential launches.",
      "Hybrid corporate models transformed satellite office demand in major urban hubs.",
      "Regulatory enforcement under RERA significantly compressed delayed completion risk."
    ]
  },
  {
    id: "imarc-group-manufacturing",
    title: "How IMARC Group Can Assist in Setting Up a Successful Manufacturing",
    tag: "B2B Content",
    description: "B2B content connecting industry knowledge with practical business considerations.",
    type: "Strategic Brief",
    category: "B2B",
    categories: ["B2B", "Research"],
    url: SITE_CONFIG.PORTFOLIO_LINKS.IMARC_MANUFACTURING,
    platform: "IMARC Group",
    year: "2023",
    readTime: "6 min read",
    deliverables: [
      "Turnkey plant feasibility framework",
      "Raw material sourcing risk matrix",
      "Capital deployment timeline modeling"
    ],
    challenge: "Mid-market entrepreneurs entering new manufacturing domains often struggle to navigate complex feasibility evaluations, machinery sourcing, and regulatory clearances.",
    approach: "Designed a clean, practical roadmap breaking down end-to-end plant commissioning into discrete, de-risked phases with actionable advisory checkpoints.",
    sampleExcerpt: "Setting up a viable manufacturing unit is fundamentally an exercise in risk orchestration. From machinery procurement to supply-chain insulation, sustainable profitability is won in the feasibility architecture long before the first foundation stone is laid.",
    keyInsights: [
      "Pre-commissioning feasibility studies reduce unexpected project CAPEX overruns.",
      "Regulatory compliance checklists condense lead times significantly.",
      "Clear supplier diversification mitigates global raw material pricing shocks."
    ]
  },
  {
    id: "unwrapping-holiday-success",
    title: "Unwrapping Holiday Success: The Power of Strategic Consumer Insights",
    tag: "Consumer Insights",
    description: "Consumer-insight content translating research into a timely, engaging business narrative.",
    type: "Seasonal Study",
    category: "Consumer Insights",
    categories: ["Consumer Insights", "SEO & Content"],
    url: SITE_CONFIG.PORTFOLIO_LINKS.HOLIDAY_SUCCESS,
    platform: "Strategic Insights",
    year: "2022",
    readTime: "5 min read",
    deliverables: [
      "Seasonal consumer sentiment benchmarking",
      "Omnichannel shopping behavior breakdown",
      "Promotional calendar timing recommendations"
    ],
    challenge: "Retailers often rely on generalized historical benchmarks, missing nuanced psychological shifts in inflation-conscious seasonal spending.",
    approach: "Transformed consumer polling data into an editorial playbook detailing discount sensitivity, early-bird shopping cohorts, and digital checkout friction.",
    sampleExcerpt: "The holiday consumer is neither purely frugal nor purely extravagant—they are intentionally selective. Winning their spend requires moving beyond arbitrary percentage discounts toward contextual bundling and friction-free delivery guarantees.",
    keyInsights: [
      "Consumers finalized holiday purchases earlier in the season than historical averages.",
      "Free returns and doorstep reliability outranked marginal price discounts.",
      "Mobile checkout abandonment dropped when friction-free payment methods were prominently placed."
    ]
  },
  {
    id: "decoding-gen-z",
    title: "Decoding Gen Z: The Generation Shaping the Future",
    tag: "Audience & Trends",
    description: "Audience and trend-focused content exploring generational behavior and its implications for brands.",
    type: "Trend Analysis",
    category: "Consumer Insights",
    categories: ["Consumer Insights", "SEO & Content"],
    url: SITE_CONFIG.PORTFOLIO_LINKS.GEN_Z,
    platform: "Brand Culture Digest",
    year: "2023",
    readTime: "8 min read",
    deliverables: [
      "Generational psychological profile",
      "Digital media consumption analysis",
      "Brand loyalty & ethical advocacy guide"
    ],
    challenge: "Brands frequently caricature Gen Z through superficial slang rather than understanding their fundamental socioeconomic realities and algorithmic media consumption habits.",
    approach: "Authored an empathetic, data-grounded dossier dissecting digital native culture, micro-communities, financial pragmatism, and brand accountability.",
    sampleExcerpt: "Gen Z does not interact with advertising as an audience; they interact as informal compliance auditors. Polished corporate perfection triggers skepticism; raw behind-the-scenes honesty and ethical alignment earn their loyalty.",
    keyInsights: [
      "Younger consumers actively verify sustainability claims before repeated purchases.",
      "Conversational tone and direct interaction foster deeper community retention.",
      "Micro-influencers within hyper-niche communities outperform broad celebrity endorsements."
    ]
  },
  {
    id: "well-of-insights-quora",
    title: "Well of Insights — Quora",
    tag: "Research Communication",
    description: "Insight-led answers and content demonstrating accessible research communication.",
    type: "Knowledge Base",
    category: "Research",
    categories: ["Research", "SEO & Content"],
    url: SITE_CONFIG.PORTFOLIO_LINKS.QUORA_WELL_OF_INSIGHTS,
    platform: "Quora Hub",
    year: "2021–Present",
    readTime: "Ongoing Series",
    deliverables: [
      "Long-tail query answering strategy",
      "Complex research question breakdown",
      "High-authority domain referral engine"
    ],
    challenge: "Knowledge seekers on community forums encounter either superficial one-liners or impenetrable academic jargon.",
    approach: "Maintained a dedicated repository of articulate, referenced answers covering market analysis, content writing, SEO, and business strategy.",
    sampleExcerpt: "Search engine optimization is not an algorithm trick; it is the practice of giving a human reader the clearest, most authoritative answer to their query.",
    keyInsights: [
      "Structured formatting with bullet points and bold anchors improves answer clarity.",
      "Direct answers supported by credible citations consistently rank well."
    ]
  },
  {
    id: "metaverse-content-creation",
    title: "How Is Metaverse Impacting the Universe of Content Creation?",
    tag: "Technology / Content Trends",
    description: "Technology and content-trend article connecting an emerging topic with the future of digital content.",
    type: "Emerging Tech",
    category: "Technology",
    categories: ["Technology", "SEO & Content"],
    url: SITE_CONFIG.PORTFOLIO_LINKS.METAVERSE_CONTENT,
    platform: "Tech Trends Review",
    year: "2022",
    readTime: "6 min read",
    deliverables: [
      "Spatial computing implications for writers",
      "Virtual storytelling frameworks",
      "Interactive media exploration"
    ],
    challenge: "Early coverage of Web3 and spatial computing was plagued by speculative hyperbole without pragmatic relevance for creators and brand publishers.",
    approach: "Demystified spatial content creation, analyzing how narrative architecture evolves from linear two-dimensional screens into immersive environments.",
    sampleExcerpt: "As interfaces shift from flat screens toward spatial ambient computing, content creators design context-triggered narrative journeys rather than isolated paragraphs.",
    keyInsights: [
      "Spatial media requires flexible narrative branches rather than strictly linear sequences.",
      "Auditory identity and micro-interactions gain equal weight to visual branding.",
      "Clear, accessible explanations allow mainstream audiences to appreciate new technology."
    ]
  },
  {
    id: "ai-market-research-pr-newswire",
    title: "AI Market Research Coverage — PR Newswire",
    tag: "AI / Market Research",
    description: "Published market-research coverage related to artificial intelligence.",
    type: "Press Dissemination",
    category: "Research",
    categories: ["Research", "Technology"],
    url: SITE_CONFIG.PORTFOLIO_LINKS.AI_MARKET_RESEARCH,
    platform: "PR Newswire",
    year: "2023",
    readTime: "Press Release & Brief",
    deliverables: [
      "Market sizing and growth modeling summaries",
      "Enterprise AI adoption index summary",
      "Media release drafting"
    ],
    challenge: "Distilling an extensive artificial intelligence market forecast into a crisp, high-impact wire release that tech journalists would cite immediately.",
    approach: "Extracted premier statistical proof-points, highlighting vertical deployment rates in healthcare, finance, and automated customer operations.",
    sampleExcerpt: "The global artificial intelligence ecosystem has entered its utility cycle. While generative models capture headlines, enterprise capital is predominantly flowing into workflow automation and proprietary data pipeline security.",
    keyInsights: [
      "Enterprise spending prioritized domain-specific fine-tuning over generic model APIs.",
      "Healthcare diagnostics and financial fraud detection led early adoption curves."
    ]
  },
  {
    id: "wms-market-figures",
    title: "WMS Market Figures 2022",
    tag: "Market Research",
    description: "Market-focused content in the warehouse management systems space.",
    type: "Domain Report",
    category: "Research",
    categories: ["Research", "B2B"],
    url: SITE_CONFIG.PORTFOLIO_LINKS.WMS_MARKET,
    platform: "Industrial Intelligence",
    year: "2022",
    readTime: "10 min read",
    deliverables: [
      "Global warehouse automation market sizing",
      "Cloud vs on-premise deployment analysis",
      "Key vendor competitive landscape"
    ],
    challenge: "Supply chain disruptions during post-pandemic surges caused massive volatility in warehouse investments, requiring objective market data.",
    approach: "Evaluated hardware automation alongside cloud WMS software adoption across North America, Europe, and APAC.",
    sampleExcerpt: "Modern fulfillment centers are undergoing a shift from static storage facilities into dynamic computational nodes. The competitive differentiator is no longer merely square footage, but inventory velocity and automated workflow efficiency.",
    keyInsights: [
      "Cloud-based WMS solutions expanded steadily through 2026.",
      "E-commerce micro-fulfillment centers in urban cores drove localized automation adoption."
    ]
  },
  {
    id: "social-media-analytics-market",
    title: "Social Media Analytics Market",
    tag: "Market Research",
    description: "Research-led market content focused on social media analytics.",
    type: "Analytics Dossier",
    category: "Research",
    categories: ["Research", "Technology"],
    url: SITE_CONFIG.PORTFOLIO_LINKS.SOCIAL_MEDIA_ANALYTICS,
    platform: "Market Research Hub",
    year: "2022",
    readTime: "9 min read",
    deliverables: [
      "Sentiment analysis software benchmarking",
      "Social listening frameworks",
      "Competitive intelligence technology stack"
    ],
    challenge: "Marketers were overwhelmed by vanity metrics without clear tools to translate social signals into brand equity and product roadmap adjustments.",
    approach: "Crafted an authoritative research brief explaining how natural language processing (NLP) and real-time social listening identify consumer sentiment before issues compound.",
    sampleExcerpt: "Social listening has graduated from a reactive PR firefighting tool into an indispensable early-warning radar for product managers, corporate communications, and brand strategists.",
    keyInsights: [
      "Automated crisis detection reduced enterprise response time significantly.",
      "Predictive sentiment modeling correlated strongly with quarterly customer retention."
    ]
  },
  {
    id: "trends-inbound-logistics",
    title: "Trends — Inbound Logistics",
    tag: "Industry Trends",
    description: "Published industry and trend content in the logistics space.",
    type: "Logistics Insights",
    category: "B2B",
    categories: ["B2B", "Research"],
    url: SITE_CONFIG.PORTFOLIO_LINKS.INBOUND_LOGISTICS,
    platform: "Inbound Logistics",
    year: "2021",
    readTime: "6 min read",
    deliverables: [
      "Global freight volatility analysis",
      "Nearshoring trends across North America",
      "Cold-chain visibility compliance guide"
    ],
    challenge: "Maritime backlogs, port congestion, and fuel price volatility created uncertainty for procurement officers.",
    approach: "Synthesized maritime freight indices and carrier intelligence into a practical executive briefing on contract negotiations and buffer stock strategies.",
    sampleExcerpt: "Just-in-time inventory models met their structural limit when global shipping lanes choked. The forward-looking supply chain executive has pivoted decisively from pure lean efficiency to multi-modal resilience.",
    keyInsights: [
      "Nearshoring to regional manufacturing hubs accelerated significantly.",
      "Real-time IoT container tracking cut disputed demurrage claims."
    ]
  }
];

export const CREATIVE_WORKS: CreativeItem[] = [
  {
    id: "startup-india-magazine",
    title: "Startup India Magazine",
    author: "By Seapee Bajaj",
    tag: "Features & Founder Stories",
    icon: "local_library",
    description: "In-depth profiles of early-stage pioneers, grassroots entrepreneurial movements, and the human grit behind India's high-velocity startup ecosystem.",
    sampleQuote: "Behind every breakout valuation lies an unglamorous landscape of sleepless debugging, strained savings, and the quiet refusal to give up when the market is indifferent.",
    medium: "Print & Digital Editorial",
    url: SITE_CONFIG.CREATIVE_LINKS.STARTUP_INDIA
  },
  {
    id: "instagram-wordy-worthy",
    title: "Instagram — Wordy Worthy",
    author: "Curated Prose & Lexicon",
    tag: "Creative Micro-Essays",
    icon: "draw",
    description: "A digital canvas of contemplative reflections, etymological curiosities, and brief meditations on language, nuance, and memory.",
    sampleQuote: "Words are not empty vessels; they carry the weight of every century that whispered them before us.",
    medium: "Curated Micro-Essays",
    url: SITE_CONFIG.CREATIVE_LINKS.WORDY_WORTHY
  },
  {
    id: "fever-of-the-sleepers",
    title: "Fever of the Sleepers",
    author: "By Seapee Bajaj",
    tag: "Literary Fiction & Reflections",
    icon: "nights_stay",
    description: "Explorations of urban solitude, nocturnal landscapes, and introspective literary fiction tracing identity, longing, and transient connections.",
    sampleQuote: "Night does not hide the city; it merely strips away the daylight alibis that keep us from confronting who we are in the quiet.",
    medium: "Literary Manuscript & Short Fiction",
    url: SITE_CONFIG.CREATIVE_LINKS.FEVER_OF_THE_SLEEPERS
  },
  {
    id: "my-need-to-live",
    title: "My Need To Live",
    author: "Personality Development",
    tag: "Mindset & Human Potential",
    icon: "psychology",
    description: "Essays on intentional living, psychological endurance, mental clarity, and cultivating meaningful craft in a distracting world.",
    sampleQuote: "Living deliberately is an act of rebellion against the passive momentum of modern noise.",
    medium: "Philosophical Journal & Essays",
    url: SITE_CONFIG.CREATIVE_LINKS.MY_NEED_TO_LIVE
  }
];

export const STATS: StatItem[] = [
  {
    id: "experience",
    value: "9+",
    label: "Years Experience",
    icon: "history_edu",
    subtext: "Content, SEO & Research",
    detail: "Over 9 years of dedicated practice spanning editorial desk management, technical B2B writing, market intelligence, and organic search optimization."
  },
  {
    id: "rank-reach",
    value: "Rank & Reach",
    label: "SEO & Content Architecture",
    icon: "trending_up",
    subtext: "Sustainable Compound Growth",
    detail: "Engineering topic clusters, semantic keyword architecture, and technical on-page clarity that build durable organic visibility."
  },
  {
    id: "empirical",
    value: "Empirical",
    label: "B2B & Market Research",
    icon: "analytics",
    subtext: "Factual Precision & Data Rigor",
    detail: "Synthesizing statistical reports, primary surveys, and technical industry data into reader-first executive insights and whitepapers."
  },
  {
    id: "refined",
    value: "Refined",
    label: "Editorial Expertise",
    icon: "auto_stories",
    subtext: "Poise, Voice & Governance",
    detail: "Elevating brand voice with grammatical discipline, nuanced tone governance, and structured editorial review cycles."
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Understand",
    description: "Clarify the audience, business objective, topic, brand voice, and expected outcome.",
    activities: [
      "Audience persona alignment & reading comprehension level",
      "Primary business objective (awareness, pipeline, ranking, thought leadership)",
      "Tone of voice parameters and brand vocabulary boundaries"
    ],
    output: "Briefing Document & Editorial North Star"
  },
  {
    step: "02",
    title: "Research",
    description: "Build the content around credible research, relevant sources, audience needs, and search intent.",
    activities: [
      "Secondary data aggregation from verified industry reports & filings",
      "SERP competitor audit & search intent gap analysis",
      "Subject matter expert quote extraction and data fact-checking"
    ],
    output: "Research Dossier & Source Index"
  },
  {
    step: "03",
    title: "Structure",
    description: "Create a logical content flow with strong headings, useful takeaways, and a reader-first narrative.",
    activities: [
      "Information hierarchy wireframing (H1, H2, H3 scoping)",
      "Pacing the narrative to maintain reader engagement",
      "Executive takeaway boxes, tables, and visual anchor planning"
    ],
    output: "Detailed Content Blueprint"
  },
  {
    step: "04",
    title: "Optimize",
    description: "Apply SEO fundamentals such as keyword alignment, headings, metadata, internal-link opportunities, and readability.",
    activities: [
      "Primary, secondary & semantic LSI keyword integration",
      "Click-through optimized title tags, meta descriptions & OpenGraph cards",
      "Internal linking recommendations and structured data guidelines"
    ],
    output: "Search-Engine Ready Draft"
  },
  {
    step: "05",
    title: "Refine",
    description: "Edit for accuracy, clarity, consistency, brand fit, and overall content quality.",
    activities: [
      "Line editing for rhythmic cadence, conciseness, and tone",
      "Fact and source verification against original citations",
      "Formatting review for responsive mobile & desktop readability"
    ],
    output: "Final Publication-Grade Asset"
  }
];

export const VALUE_PROPOSITIONS: ValuePoint[] = [
  {
    icon: "menu_book",
    headline: "Research is part of my foundation",
    description: "— with experience in primary and secondary research and market analysis."
  },
  {
    icon: "join",
    headline: "I combine content and SEO",
    description: "rather than treating them as separate disciplines."
  },
  {
    icon: "view_agenda",
    headline: "Flexible collaboration models:",
    description: "I can work across individual content assignments and structured, ongoing content workflows."
  },
  {
    icon: "psychology_alt",
    headline: "Technical ease:",
    description: "I am comfortable with complex B2B and technology-oriented subjects and translating them into reader-friendly content."
  },
  {
    icon: "fact_check",
    headline: "An editorial mindset:",
    description: "accuracy, consistency, structure, quality, and business relevance matter as much as writing style."
  }
];
