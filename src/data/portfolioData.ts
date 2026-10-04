import {
  ProjectItem,
  ServiceItem,
  CreativeItem,
  ProcessStep,
  ValuePoint,
  StatItem,
  AwardItem,
  ExperienceItem,
  DetailedCaseStudyItem,
  SeoGeoPillarItem,
  WritingTopicItem,
  FaqItem,
} from '../types';
import { SITE_CONFIG } from '../config/siteConfig';

export const PROFILE_INFO = {
  name: SITE_CONFIG.NAME,
  title: SITE_CONFIG.TITLE,
  corePositioning: SITE_CONFIG.CORE_POSITIONING,
  supportingPositioning: SITE_CONFIG.SUPPORTING_POSITIONING,
  badge: "Market research • B2B content • SEO • GEO & AI search",
  email: SITE_CONFIG.EMAIL,
  location: SITE_CONFIG.LOCATION,
  heroImage: SITE_CONFIG.HERO_IMAGE,
  avatarImage: SITE_CONFIG.AVATAR_IMAGE,
  headline: "B2B SEO Content Strategist, Research-Led and Reader-Focused",
  subheadline:
    "I combine research, strategy, storytelling and search to create content that is useful to readers, valuable to businesses, and discoverable across traditional and AI-driven search.",
  aboutIntro:
    "I’m Seapee Bajaj, a research-driven content strategist and SEO professional with 10+ years of experience across market research, B2B content, SEO and digital content strategy.",
  topics: ["SEO Content", "B2B", "Research", "GEO & AI Search", "Content Strategy"] as const,
};

export const SERVICES: ServiceItem[] = [
  {
    id: "seo-content",
    number: "01",
    phase: "Discovery & Intent",
    title: "SEO Content Strategy",
    description:
      "I build search-aligned content ecosystems around real audience queries, keyword research, search intent mapping, and E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness: Google's quality framework for credible, helpful content)—designed to improve organic discoverability while remaining genuinely helpful to human readers.",
    icon: "search",
    deliverables: [
      "Keyword research & search intent mapping across funnel stages",
      "Topic cluster planning & pillar content architecture",
      "On-page SEO structure (title tags, meta descriptions, headings, internal links)",
      "E-E-A-T alignment & editorial briefs for research-backed articles"
    ],
    idealFor: "B2B companies, research-driven brands, and digital teams seeking sustainable organic search visibility.",
    outcome: "I deliver clear, search-intent-aligned content architecture that supports long-term organic discoverability."
  },
  {
    id: "b2b-content-writing",
    number: "02",
    phase: "B2B Narrative",
    title: "B2B Content Writing",
    description:
      "I create clear, authoritative B2B blogs, articles, listicles, industry primers, and thought-leadership pieces that connect technical or business concepts with practical buyer considerations.",
    icon: "article",
    deliverables: [
      "In-depth B2B blog posts, industry articles & executive primers",
      "Technical concept translation across ICT, semiconductors, automotive & SaaS",
      "Engaging listicles, FAQs & educational buyer guides",
      "Brand-aligned editorial review, editing & proofreading"
    ],
    idealFor: "B2B technology firms, industrial & manufacturing companies, and consulting organizations.",
    outcome: "I produce reader-focused B2B content that communicates domain credibility and supports informed decision-making."
  },
  {
    id: "b2b-research",
    number: "03",
    phase: "Empirical Depth",
    title: "Research-Driven Content",
    description:
      "I turn primary and secondary market research, competitive intelligence, and industry data into structured, readable narratives grounded in my research background.",
    icon: "query_stats",
    deliverables: [
      "Market research report summaries, blogs & executive briefings",
      "Competitive intelligence & causal chain analysis narratives",
      "Industry trend analysis & consumer insight stories",
      "Fact-checked, source-grounded editorial assets"
    ],
    idealFor: "Market research firms, B2B intelligence platforms, and data-rich enterprises.",
    outcome: "I craft credible, well-researched content that translates complex market data into clear business takeaways."
  },
  {
    id: "geo-optimization",
    number: "04",
    phase: "AI Search Visibility",
    title: "GEO / Generative Engine Optimization",
    description:
      "I structure content with clear entity relationships, factual precision, and citation-ready depth to support discoverability across generative AI search systems such as ChatGPT, Perplexity, and Gemini.",
    icon: "psychology",
    deliverables: [
      "Entity-clear headings, definitions & structured context blocks",
      "Citation-friendly research synthesis & factual framing",
      "Semantic topical coverage for generative search comprehension",
      "Schema.org & structured metadata alignment"
    ],
    idealFor: "Brands and professionals looking to strengthen their content's clarity and relevance for AI-driven search experiences.",
    outcome: "I deliver well-structured, authoritative content designed to be easily parsed and understood by generative search engines."
  },
  {
    id: "aeo-optimization",
    number: "05",
    phase: "Direct Answers",
    title: "AEO / Answer Engine Optimization",
    description:
      "I format and refine content to directly answer high-intent user questions for AI Overviews, featured snippets, Quora knowledge hubs, and conversational search queries.",
    icon: "quiz",
    deliverables: [
      "Question-led heading hierarchy & concise direct-answer blocks",
      "Strategic FAQ architecture grounded in real user queries",
      "Quora & community knowledge-sharing content strategy",
      "Conversational query alignment & structured formatting"
    ],
    idealFor: "Knowledge-driven brands aiming to provide clear, direct answers where audiences search and ask questions.",
    outcome: "I create scannable, answer-first content that addresses user questions clearly and directly."
  },
  {
    id: "content-optimization",
    number: "06",
    phase: "Refinement & CRO",
    title: "Content Optimization",
    description:
      "I audit, rewrite, and upgrade existing web pages, blog posts, and landing pages for stronger search intent alignment, readability, on-page SEO, internal linking, and user-focused conversion flow.",
    icon: "tune",
    deliverables: [
      "On-page SEO audits (titles, meta descriptions, headings, image alt text)",
      "Homepage & key page rewrites with SEO and CRO considerations",
      "Internal linking structure & content gap improvements",
      "Clarity, tone, and readability editing"
    ],
    idealFor: "Teams with existing content libraries or web pages that need sharper positioning, structure, and search alignment.",
    outcome: "I upgrade content assets with clearer messaging, stronger on-page SEO fundamentals, and improved reader flow."
  },
  {
    id: "ai-assisted-strategy",
    number: "07",
    phase: "Human-Led Workflow",
    title: "AI-Assisted Content Strategy",
    description:
      "I combine structured AI prompting and workflow efficiency with rigorous human research, fact-checking, and editorial judgment so content remains natural, accurate, and genuinely useful.",
    icon: "auto_awesome",
    deliverables: [
      "Human-in-the-loop AI editorial workflows & quality checklists",
      "Prompt frameworks for research structuring & outline ideation",
      "Human editing to eliminate robotic phrasing & generic filler",
      "Brand voice consistency & factual verification standards"
    ],
    idealFor: "Content teams adopting AI tools who want to protect editorial quality, originality, and human voice.",
    outcome: "I build efficient content workflows that preserve natural human writing, accuracy, and brand credibility."
  },
  {
    id: "website-conversion",
    number: "08",
    phase: "Personal Branding",
    title: "Portfolio Website Creation",
    description:
      "I design and write research-led, conversion-focused personal portfolio websites for professionals and creators—built to communicate your expertise clearly, support search discoverability, and turn visitors into inquiries.",
    icon: "web",
    deliverables: [
      "Personal brand positioning, information architecture & copywriting",
      "SEO-friendly page structure, metadata & Schema.org JSON-LD",
      "Case study, experience & service presentation frameworks",
      "Clean, responsive, fast-loading portfolio implementation"
    ],
    idealFor: "Consultants, strategists, writers, researchers, and creators who want a credible, search-ready portfolio website.",
    outcome: "I deliver a professional, research-led personal portfolio website that presents your work clearly and makes it easy for clients or recruiters to reach out."
  }
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: "perfect-clicks",
    organization: "Perfect Clicks",
    role: "SEO Content Professional — Perfect Clicks",
    period: "January 2026 – April 2026",
    focusSummary:
      "SEO-focused content creation, keyword research using Semrush, on-page SEO optimization, and independent editorial execution.",
    highlights: [
      "Created and optimized SEO-focused content aligned with search intent, keyword strategy, and readability.",
      "Conducted keyword research using Semrush, focusing on relevant search volume and lower-competition opportunities.",
      "Applied on-page SEO practices including title tags, meta descriptions, headings, internal linking, image optimization, and content structure.",
      "Reviewed and refined content for SEO quality, accuracy, clarity, and engagement.",
      "Worked independently across content assignments while maintaining deadlines and quality standards."
    ],
    domains: ["SEO Content Strategy", "Keyword Research (Semrush)", "On-Page SEO", "Content Optimization"]
  },
  {
    id: "imarc-group",
    organization: "IMARC Group",
    role: "Assistant Manager — Content & SEO Operations",
    period: "Aug 2024 – Nov 2025",
    focusSummary:
      "Research-driven content operations, content production and curation, publishing workflows, and SEO quality governance across cross-functional teams.",
    highlights: [
      "Content production, curation and publishing across B2B and market research verticals.",
      "Content workflow development to streamline editorial review and publishing stages.",
      "SEO and quality checks across title tags, metadata, headings, search intent, and readability.",
      "Coordination with marketing, SEO, research and design teams.",
      "Research and training support for content quality and structure.",
      "Maintained brand consistency and timely delivery across ongoing publishing schedules."
    ],
    domains: ["B2B Content Operations", "SEO Quality Control", "Publishing Workflows", "Market Research Content"]
  },
  {
    id: "grand-view-research",
    organization: "Grand View Research",
    role: "Sr. Executive — Content Management",
    period: "Jun 2021 – Aug 2024",
    focusSummary:
      "SEO-driven digital content creation, research translation, content distribution, and Quora content strategy for the Well of Insights knowledge page.",
    highlights: [
      "Created and optimized SEO-driven blogs, articles, listicles, FAQs and digital content.",
      "Conducted research and translated complex information into clear, engaging content.",
      "Reviewed, edited and proofread content for accuracy, clarity and brand fit.",
      "Worked on content distribution across digital platforms.",
      "Created promotional and social content to support research visibility.",
      "Collaborated with research, marketing and SEO teams.",
      "Managed the Well of Insights Quora page.",
      "Used strategic and engaging headlines and content formats.",
      "Increased average Quora views from approximately 60–70 to over 250 per post."
    ],
    domains: ["SEO Blogs & Listicles", "Quora Strategy (Well of Insights)", "Content Distribution", "Editorial Review"]
  },
  {
    id: "the-insight-partners",
    organization: "The Insight Partners",
    role: "Research Analyst & Sr. Research Analyst",
    period: "Sep 2018 – Jan 2021",
    focusSummary:
      "Client-focused market research solutions, market reports and proposals, pre-sales and post-sales support, and market estimation training.",
    highlights: [
      "Managed exclusive client requirements across custom and syndicated research engagements.",
      "Developed research and content solutions aligned with client business objectives.",
      "Handled pre-sales and post-sales queries with clear analytical communication.",
      "Worked on market reports and proposals.",
      "Trained associates on report writing and content improvement.",
      "Provided training on market estimation methodologies.",
      "Supported critical research projects."
    ],
    domains: ["Market Reports & Proposals", "Client Research Solutions", "Pre-Sales & Post-Sales", "Market Estimation"]
  },
  {
    id: "allied-market-research",
    organization: "Allied Market Research",
    role: "Research Associate & Sr. Research Associate",
    period: "Jan 2016 – Jul 2018",
    focusSummary:
      "End-to-end market report curation, primary and secondary research, data analysis, and market estimation across ICT, Semiconductor, and Automotive verticals.",
    highlights: [
      "Curated end-to-end market reports.",
      "Conducted primary and secondary research.",
      "Performed data analysis and market sizing synthesis.",
      "Developed expertise in Market Estimation.",
      "Worked across ICT, Semiconductor and Automotive domains.",
      "Handled pre-sales client calls.",
      "Addressed report-related client queries.",
      "Mentored interns and fresh associates."
    ],
    domains: ["Primary & Secondary Research", "Market Estimation", "ICT, Semiconductor & Automotive", "Data Analysis"]
  }
];

export const CASE_STUDIES: DetailedCaseStudyItem[] = [
  {
    id: "gvr-well-of-insights",
    title: "Well of Insights — Quora Content Strategy & Organic Reach",
    clientOrPlatform: "Grand View Research / Well of Insights (Quora)",
    category: "AEO / Community Content Strategy",
    focusAreas: [
      "Quora content strategy",
      "Engaging and witty headlines",
      "Content optimization",
      "Audience-first research communication"
    ],
    problem:
      "Market research insights posted on community platforms often struggle to attract readership when presented as dry, report-heavy excerpts with generic titles.",
    research:
      "I analyzed how readers on Quora interact with industry and market-trend topics, identifying that curiosity-driven questions, relatable framing, and scannable answers perform significantly better than formal corporate summaries.",
    strategy:
      "I repositioned the 'Well of Insights' Quora page around reader curiosity—combining credible market research takeaways with engaging, witty headlines and accessible narrative structure.",
    execution:
      "I managed the Well of Insights Quora page, crafting research-backed posts with strategic headlines, clear formatting, and optimized topic alignment to make complex industry insights approachable.",
    outcome:
      "I increased average Quora views from approximately 60–70 to over 250 per post.",
    keyTakeaways: [
      "Strong, curiosity-led headlines significantly improve initial engagement with research content.",
      "Translating dense market data into conversational, structured takeaways makes insights easier to read and share.",
      "Consistent formatting and topic relevance help build steady readership on answer platforms."
    ],
    externalUrl: SITE_CONFIG.PORTFOLIO_LINKS.QUORA_WELL_OF_INSIGHTS
  },
  {
    id: "imarc-content-operations",
    title: "B2B Content Production, Curation & SEO Quality Workflows",
    clientOrPlatform: "IMARC Group",
    category: "B2B Content Operations & SEO",
    focusAreas: [
      "Content production",
      "Curation",
      "Publishing workflows",
      "SEO checks",
      "Quality control",
      "Research-driven content"
    ],
    problem:
      "High-volume B2B and market-research publishing requires consistent editorial standards, accurate research alignment, and reliable on-page SEO checks across multiple contributors and teams.",
    research:
      "I evaluated content production stages across research, writing, SEO review, and design handoffs to identify where formatting, metadata, or factual alignment needed tighter structure.",
    strategy:
      "I established repeatable content workflows combining editorial curation, structured SEO checklists, and cross-functional coordination between marketing, SEO, research, and design teams.",
    execution:
      "I managed day-to-day content production, curation, and publishing; performed on-page SEO and editorial quality checks; and supported team members with research and content guidance.",
    outcome:
      "I strengthened brand consistency, editorial accuracy, on-page SEO alignment, and timely content delivery across publishing workflows.",
    keyTakeaways: [
      "Clear editorial and SEO checklists prevent quality drift in ongoing B2B publishing.",
      "Close collaboration between research, SEO, marketing, and design keeps content both accurate and engaging.",
      "Structured workflows allow teams to publish consistently without sacrificing reader value."
    ],
    externalUrl: SITE_CONFIG.PORTFOLIO_LINKS.IMARC_MANUFACTURING
  },
  {
    id: "jones-road-beauty-homepage",
    title: "Homepage Rewrite: Combining SEO, CRO & User-Focused Messaging",
    clientOrPlatform: "Jones Road Beauty (Editorial & Conversion Case Study)",
    category: "Website Copy, SEO & CRO",
    focusAreas: [
      "Homepage rewrite",
      "SEO",
      "CRO considerations",
      "User-focused messaging"
    ],
    problem:
      "A brand homepage needs to immediately communicate what the brand stands for, who the products are for, and why a visitor should explore further—while also supporting organic search clarity and conversion flow.",
    research:
      "I reviewed brand positioning, product value propositions, audience expectations, and search-intent signals to identify opportunities for clearer hierarchy and stronger user-centric copy.",
    strategy:
      "I developed a homepage rewrite framework balancing clean brand storytelling with SEO-aware heading structure and conversion rate optimization (CRO) principles.",
    execution:
      "I rewrote hero messaging, value-proposition blocks, product discovery sections, and calls to action with a focus on clarity, reader flow, and search-friendly structure.",
    outcome:
      "I delivered a structured, user-focused homepage narrative that aligns brand voice with clear SEO hierarchy and conversion-oriented page flow.",
    keyTakeaways: [
      "Homepage copy works best when it answers visitor questions immediately rather than relying on vague slogans.",
      "SEO and CRO complement each other when headings and CTAs follow a logical reader journey.",
      "User-focused messaging reduces friction between initial discovery and product exploration."
    ]
  },
  {
    id: "fire-ai-causal-chain",
    title: "Fire AI: Translating Causal Chain Analysis into Accessible Content",
    clientOrPlatform: "Fire AI",
    category: "Technical B2B & AI Content",
    focusAreas: [
      "Causal Chain Analysis",
      "Research-driven content",
      "Translating complex concepts into accessible content"
    ],
    problem:
      "Advanced analytical concepts such as Causal Chain Analysis in enterprise AI can feel abstract and overly technical to business decision-makers who need to understand practical value.",
    research:
      "I studied how Causal Chain Analysis works in business intelligence and root-cause diagnostics, mapping technical mechanisms to real-world operational questions.",
    strategy:
      "I structured the narrative to move progressively from a clear definition of the problem to step-by-step causal logic and practical business applications.",
    execution:
      "I created research-driven content that explained Causal Chain Analysis in plain, authoritative language without oversimplifying the underlying analytical rigor.",
    outcome:
      "I produced clear, accessible B2B technology content that bridges complex AI methodology and practical business understanding.",
    keyTakeaways: [
      "Technical B2B content succeeds when it connects how a system works to why it matters for decision-makers.",
      "Step-by-step examples make abstract analytical frameworks concrete and memorable.",
      "Research depth builds credibility with both technical and executive readers."
    ]
  },
  {
    id: "sorbitol-competitive-intelligence",
    title: "Sorbitol Market & Competitive Intelligence Content",
    clientOrPlatform: "Sorbitol / Competitive Intelligence Project",
    category: "Market Research & Competitive Intelligence",
    focusAreas: [
      "Research",
      "Competitive intelligence",
      "Market/business analysis",
      "Converting research into useful content"
    ],
    problem:
      "Chemical and ingredient market stakeholders require clear competitive intelligence, supply-demand context, and application insights rather than fragmented raw data tables.",
    research:
      "I conducted secondary and market research on the Sorbitol market, examining key industry players, application segments, market drivers, and competitive positioning.",
    strategy:
      "I organized the competitive and market analysis into a logical narrative covering market drivers, segment dynamics, and strategic competitive considerations.",
    execution:
      "I converted raw market research and competitive intelligence into structured, decision-useful business content with clear headings and actionable takeaways.",
    outcome:
      "I delivered a comprehensive, reader-friendly market and competitive intelligence asset grounded in structured industry research.",
    keyTakeaways: [
      "Competitive intelligence is most valuable when synthesized into clear strategic patterns.",
      "Structured headings and segment breakdowns help business readers locate relevant insights quickly.",
      "Strong research methodology forms the backbone of credible B2B industry content."
    ]
  }
];

export const SEO_GEO_PILLARS: SeoGeoPillarItem[] = [
  {
    id: "traditional-seo-eeat",
    code: "01",
    title: "Search Intent, On-Page SEO & E-E-A-T",
    subtitle: "Traditional Search Foundations",
    description:
      "Effective SEO starts with understanding why someone is searching and what they need to make a decision. I build content around genuine search intent, clean on-page structure, and Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T: Google's quality framework demonstrating first-hand experience and credible authority).",
    practices: [
      "Keyword research & search intent mapping (informational, commercial, transactional)",
      "Optimized title tags, meta descriptions, and logical H1/H2/H3 heading hierarchy",
      "Contextual internal linking & descriptive image alt text",
      "Content optimization & refreshes grounded in credible primary and secondary research"
    ]
  },
  {
    id: "geo-generative-search",
    code: "02",
    title: "GEO (Generative Engine Optimization)",
    subtitle: "AI Search Visibility Across ChatGPT, Perplexity & Gemini",
    description:
      "As buyers increasingly use AI search tools like ChatGPT, Perplexity, and Gemini to research topics, content needs to be clear, factual, and well-structured. Generative Engine Optimization (GEO) is the practice of structuring content with clear entity context and factual depth so AI answer engines can find, understand, and cite it.",
    practices: [
      "Clear entity definitions, consistent terminology, and unambiguous context",
      "Research-backed explanations with structured comparisons and factual depth",
      "Logical topical coverage that answers follow-up questions within the same resource",
      "Valid Schema.org structured data (JSON-LD) to clarify authorship and page context"
    ]
  },
  {
    id: "aeo-ai-overviews",
    code: "03",
    title: "AEO (Answer Engine Optimization) & AI Overviews",
    subtitle: "Direct, Scannable Answers for Modern Search",
    description:
      "Answer Engine Optimization (AEO) structures content to provide direct, scannable answers to specific questions for Google AI Overviews and answer engines without burying the takeaway under paragraphs of filler.",
    practices: [
      "Question-aligned subheadings paired with concise, direct summary answers",
      "Structured lists, step-by-step frameworks, and clear takeaway sections",
      "FAQ sections built around real buyer, client, and community questions",
      "Experience managing high-engagement Q&A content (such as Well of Insights on Quora)"
    ]
  },
  {
    id: "human-led-ai-workflows",
    code: "04",
    title: "AI-Assisted Content & Human Editorial Rigor",
    subtitle: "Combining Modern AI Tools with Human Judgment",
    description:
      "AI tools can speed up ideation and structuring, but unedited AI output often sounds generic and repetitive. Trained in Google Prompting Essentials and the Be10x AI tools program, I pair AI efficiency with strict human research and editing.",
    practices: [
      "Using structured prompting to accelerate research organization and outline planning",
      "Fact-checking every claim against reliable market research and primary sources",
      "Human line-editing to ensure natural cadence, clarity, and authentic brand voice",
      "Transparent, ethical approach: never claiming guaranteed rankings or guaranteed AI placement"
    ]
  }
];

export const WRITING_TOPICS: WritingTopicItem[] = [
  {
    id: "seo-content-b2b-approach",
    slug: "how-i-approach-seo-content-for-b2b-companies",
    title: "How I Approach SEO Content for B2B Companies",
    category: "SEO Strategy",
    summary:
      "A practical framework for connecting B2B buyer questions, subject-matter research, search intent, and on-page SEO into content that builds lasting authority.",
    keyQuestionsAnswered: [
      "How do you align technical B2B topics with real search intent?",
      "Why do generic keyword-stuffed blog posts fail to convert B2B buyers?",
      "How should headings, internal links, and takeaways be structured?"
    ],
    relatedServicePath: "/seo-content",
    status: "Topic Brief & Framework"
  },
  {
    id: "seo-vs-aeo-vs-geo",
    slug: "seo-vs-aeo-vs-geo-whats-actually-different",
    title: "SEO vs AEO vs GEO: What's Actually Different?",
    category: "GEO & AEO",
    summary:
      "Breaking down how traditional Search Engine Optimization (SEO), Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO) overlap—and where your content structure needs to adapt.",
    keyQuestionsAnswered: [
      "What is the core difference between SEO, AEO, and GEO?",
      "How do AI Overviews and answer engines evaluate page structure?",
      "Which fundamentals work across both Google Search and AI search tools?"
    ],
    relatedServicePath: "/geo-aeo",
    status: "Topic Brief & Framework"
  },
  {
    id: "practical-guide-to-geo",
    slug: "what-is-geo-practical-guide-to-generative-engine-optimization",
    title: "What Is GEO? A Practical Guide to Generative Engine Optimization",
    category: "GEO & AEO",
    summary:
      "How to write and structure research-backed content so AI search platforms like ChatGPT, Perplexity, and Gemini can clearly understand your expertise and context.",
    keyQuestionsAnswered: [
      "Why do entity clarity and factual depth matter for generative search?",
      "How do structured headings and concise definitions improve AI readability?",
      "Why honest GEO focuses on clarity and authority rather than hype?"
    ],
    relatedServicePath: "/geo-aeo",
    status: "Topic Brief & Framework"
  },
  {
    id: "make-ai-assisted-content-sound-human",
    slug: "how-to-make-ai-assisted-content-sound-human",
    title: "How to Make AI-Assisted Content Sound Human",
    category: "AI & Editorial",
    summary:
      "Editorial techniques for using AI tools responsibly in content workflows while preserving natural rhythm, original insight, factual accuracy, and human warmth.",
    keyQuestionsAnswered: [
      "What makes AI-generated drafts sound robotic or repetitive?",
      "Where does AI help most in a research-led content workflow?",
      "How do human editing and real examples transform a draft?"
    ],
    relatedServicePath: "/services",
    status: "Topic Brief & Framework"
  },
  {
    id: "market-research-makes-b2b-content-better",
    slug: "how-market-research-makes-b2b-content-better",
    title: "How Market Research Makes B2B Content Better",
    category: "B2B & Market Research",
    summary:
      "Lessons from my research background on turning industry data into compelling B2B narratives.",
    keyQuestionsAnswered: [
      "How does primary and secondary research strengthen B2B storytelling?",
      "How do you translate market sizing and competitive analysis for readers?",
      "Why research-led content naturally supports E-E-A-T?"
    ],
    relatedServicePath: "/market-research-content",
    status: "Topic Brief & Framework"
  },
  {
    id: "ten-years-market-research-content-seo",
    slug: "what-my-experience-across-market-research-and-content-taught-me-about-seo",
    title: "What My Experience Across Market Research and Content Taught Me About SEO",
    category: "SEO Strategy",
    summary:
      "Reflections on evolving from market estimation and industry reports to B2B content strategy, SEO optimization, and AI-search readiness.",
    keyQuestionsAnswered: [
      "Why audience understanding always outlasts algorithm shortcuts?",
      "How research methodology improves keyword and topic strategy?",
      "What stays constant as search evolves toward AI-assisted discovery?"
    ],
    relatedServicePath: "/about",
    status: "Topic Brief & Framework"
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
      "Strategic and engaging headlines increased average Quora views from ~60–70 to over 250 per post."
    ]
  },
  {
    id: "global-warehouse-management-systems",
    title: "Global Warehouse Management Systems (WMS) — Market Analysis & Forecast",
    tag: "Supply Chain / Market Research",
    description:
      "Comprehensive market research report analyzing Global Warehouse Management Systems (WMS) across software and services, cloud vs. on-premise deployment, industry verticals, and regional growth.",
    type: "Market Research Report",
    category: "Research",
    categories: ["Research", "B2B", "Technology"],
    url: SITE_CONFIG.PORTFOLIO_LINKS.GLOBAL_WMS_REPORT,
    platform: "Global Market Intelligence Report",
    year: "2014–2022",
    readTime: "Full Sample Report",
    deliverables: [
      "Global WMS market sizing & CAGR forecast (2014–2022)",
      "Component & deployment segmentation (Cloud/SaaS vs. On-Premise)",
      "End-use vertical & regional share analysis",
      "Competitive landscape of leading global WMS vendors"
    ],
    challenge:
      "Rapid e-commerce expansion, omnichannel fulfillment demands, and multi-tier supply-chain complexity forced enterprises to replace manual inventory tracking with real-time warehouse orchestration—yet high upfront implementation costs and legacy ERP integration remained critical hurdles.",
    approach:
      "Synthesized historical and forecast market data (2014–2022) across software and service components, deployment models, regional markets (North America, Europe, Asia-Pacific, and LAMEA), and key supply-chain technology providers.",
    sampleExcerpt:
      "A Warehouse Management System (WMS) is no longer just a back-office inventory ledger—it is the operational nerve center that synchronizes receiving, put-away, picking, labor allocation, and last-mile shipping across modern global supply chains.",
    keyInsights: [
      "Global WMS market expanded at ~15%+ CAGR through 2022, passing the $2.8B–$3.1B valuation threshold on surging e-commerce and 3PL demand.",
      "Cloud-based (SaaS) WMS deployments recorded the fastest growth as small and mid-sized enterprises prioritized lower upfront CAPEX and rapid scalability.",
      "North America held the largest revenue share due to mature logistics infrastructure, while Asia-Pacific emerged as the fastest-growing regional market."
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
  }
];

export const STATS: StatItem[] = [
  {
    id: "experience",
    value: "10+",
    label: "Years of Experience",
    icon: "history_edu",
    subtext: "Market Research, B2B Content & SEO",
    detail: "My background spans market research, B2B content, SEO, and digital content strategy across global research and digital teams."
  },
  {
    id: "rank-reach",
    value: "SEO & GEO",
    label: "Search & AI Visibility",
    icon: "trending_up",
    subtext: "Traditional & Generative Search",
    detail: "I combine keyword research, search intent, on-page SEO, and E-E-A-T with GEO and AEO structuring for discoverability across Google Search, AI Overviews, ChatGPT, Perplexity, and Gemini."
  },
  {
    id: "empirical",
    value: "Research-Led",
    label: "B2B & Market Intelligence",
    icon: "analytics",
    subtext: "Primary & Secondary Research Rigor",
    detail: "I built a strong foundation in primary and secondary research, market estimation, data analysis, and competitive intelligence across ICT, Semiconductor, Automotive, and B2B sectors."
  },
  {
    id: "refined",
    value: "Reader-First",
    label: "Editorial & Storytelling",
    icon: "auto_stories",
    subtext: "Human-Quality Writing & Editing",
    detail: "I am the published author of 'Not Unworthy' (Notion Press) and hold an MBA in Systems—blending analytical structure, AI-assisted efficiency, and natural human editing."
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Understand",
    description: "Clarify the audience, business objective, topic, brand voice, and expected outcome.",
    activities: [
      "Audience persona alignment & reading comprehension level",
      "Primary business objective (awareness, pipeline, organic discovery, thought leadership)",
      "Tone of voice parameters and brand vocabulary boundaries"
    ],
    output: "Briefing Document & Editorial North Star"
  },
  {
    step: "02",
    title: "Research",
    description: "Build the content around credible research, relevant sources, audience needs, and search intent.",
    activities: [
      "Primary and secondary research synthesis from verified industry reports",
      "Keyword research, search intent analysis & SERP/AI-answer audit",
      "Competitive intelligence and factual verification"
    ],
    output: "Research Dossier & Source Index"
  },
  {
    step: "03",
    title: "Structure",
    description: "Create a logical content flow with strong headings, useful takeaways, and a reader-first narrative.",
    activities: [
      "Information hierarchy wireframing (one H1, logical H2/H3 structure)",
      "Direct-answer blocks and entity clarity for SEO, AEO & GEO",
      "Executive takeaway boxes, tables, and visual anchor planning"
    ],
    output: "Detailed Content Blueprint"
  },
  {
    step: "04",
    title: "Optimize",
    description: "Apply SEO and GEO fundamentals such as keyword alignment, headings, metadata, internal-link opportunities, and readability.",
    activities: [
      "Natural keyword integration, E-E-A-T signals & semantic coverage",
      "Title tags, meta descriptions, OpenGraph cards & descriptive image alt text",
      "Internal linking recommendations and Schema.org structured data alignment"
    ],
    output: "Search & AI-Search Ready Draft"
  },
  {
    step: "05",
    title: "Refine",
    description: "Edit for accuracy, clarity, consistency, brand fit, and natural human quality.",
    activities: [
      "Human line-editing for natural cadence, conciseness, and reader engagement",
      "Fact and source verification against original research findings",
      "Formatting review for responsive desktop, tablet & mobile readability"
    ],
    output: "Final Publication-Grade Asset"
  }
];

export const VALUE_PROPOSITIONS: ValuePoint[] = [
  {
    icon: "menu_book",
    headline: "Research is part of my foundation",
    description: "— built on my research background in primary and secondary research, market estimation, and industry analysis."
  },
  {
    icon: "join",
    headline: "I combine SEO, AEO, and GEO with storytelling",
    description: "— structuring content so it is helpful to human readers and clearly understood by both traditional search engines and AI-driven answer systems."
  },
  {
    icon: "psychology_alt",
    headline: "B2B and technical fluency:",
    description: "backed by an MBA in Systems and experience across ICT, Semiconductor, Automotive, manufacturing, and enterprise technology domains."
  },
  {
    icon: "auto_awesome",
    headline: "AI-assisted efficiency, human-quality writing:",
    description: "trained in Google Prompting Essentials and the Be10x AI tools program, while editing every piece so it reads naturally and accurately."
  },
  {
    icon: "fact_check",
    headline: "Hands-on execution & editorial rigor:",
    description: "from keyword research and content strategy to writing, optimization, and publishing workflows—focused on real reader and business value."
  }
];

export const AWARDS: AwardItem[] = [
  {
    id: "best-content-writer",
    title: "Best Content Writer Award",
    organization: "Grand View Research",
    year: "January 2022",
    badgeText: "Excellence in Content",
    icon: "emoji_events",
    description: "Awarded Best Content Writer in recognition of exceptional editorial standards, high-performing search content pieces, and editorial collaboration across research teams.",
    highlight: "Recognized for editorial depth, accuracy, and strong digital content performance.",
    category: "Award"
  },
  {
    id: "pwc-commendation",
    title: "Client Commendation — PwC",
    organization: "PwC (PricewaterhouseCoopers)",
    year: "High-Impact Project",
    badgeText: "Enterprise Client Feedback",
    icon: "verified",
    description: "Received positive client feedback from enterprise leaders at PwC for exceptional content quality, in-depth research methodologies, and timely delivery on a high-stakes client engagement.",
    highlight: "Contributed directly to client satisfaction, analytical credibility, and project success.",
    category: "Client Commendation"
  },
  {
    id: "my-need-to-live-reward",
    title: "Recognition Badge (Get Involved Reward)",
    organization: "My Need To Live (United Kingdom)",
    year: "April 2020",
    badgeText: "International Recognition",
    icon: "military_tech",
    description: "Awarded international recognition for research and content creation dedicated to mental wellness, human potential, and intentional living.",
    highlight: "Honored for meaningful, reader-centric storytelling and research-backed perspective.",
    category: "International Recognition"
  },
  {
    id: "academic-publications",
    title: "Selection of Two Research Papers",
    organization: "ASM INCON XIII International Conference",
    year: "E-ISSN: 2320-0065",
    badgeText: "Academic Research Selection",
    icon: "school",
    description: "Selection and publication of two peer-reviewed research papers: 'A Study of Consumer Behavior and its Impact on Marketing' and 'A Study of E-business Threats' at the ASM INCON XIII International Conference.",
    highlight: "Published under International Conference on Ongoing Research in Management and IT.",
    category: "Academic Publication"
  }
];

export const CERTIFICATIONS = [
  {
    id: "intro-generative-engine-optimization",
    title: "Introduction to Generative Engine Optimization",
    issuer: "Coursera",
    date: "Completed: September 28, 2026",
    score: "Coursera · GEO & AI Search",
    description:
      "I completed professional development and training on Coursera focused on Generative Engine Optimization (GEO), generative search, and structuring content for AI-powered search and answer engines—complementing my experience in market research, B2B content, and SEO.",
    icon: "travel_explore"
  },
  {
    id: "google-prompting",
    title: "Google Prompting Essentials",
    issuer: "Google / Coursera",
    date: "September 2025",
    score: "97% Passing Score",
    description: "Successfully completed the 4-module generative AI prompting program with a 97% passing score.",
    icon: "auto_awesome"
  },
  {
    id: "hubspot-content-marketing",
    title: "Content Marketing Certification",
    issuer: "HubSpot Academy",
    date: "April 2025",
    score: "90% Score",
    description: "Certified in strategic content creation frameworks, SEO topic clusters, content repurposing, and reader-focused storytelling.",
    icon: "workspace_premium"
  },
  {
    id: "be10x-ai-tools",
    title: "Be10x AI Tools Program",
    issuer: "Be10x",
    date: "Completed",
    score: "AI Workflow Credential",
    description: "Completed practical training in AI-assisted research, content productivity workflows, and responsible AI tool integration.",
    icon: "memory"
  },
  {
    id: "mba-systems",
    title: "MBA in Systems",
    issuer: "Postgraduate Degree",
    date: "Academic Credential",
    score: "Systems & Management",
    description: "Postgraduate foundation in systems thinking, data analysis, business operations, and technology management.",
    icon: "school"
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-specialization",
    question: "What does Seapee Bajaj specialize in?",
    answer:
      "Seapee Bajaj is a content and SEO professional with 10+ years of experience specializing in research-led content, content strategy, SEO optimization, editorial workflows, B2B content writing, competitive intelligence, and AI-assisted content creation.",
    relatedLink: { label: "Explore Core Services & Practice", path: "/services", sectionId: "services" }
  },
  {
    id: "faq-content-types",
    question: "What kind of content does Seapee Bajaj create?",
    answer:
      "Seapee creates research-driven articles, SEO blogs, listicles, FAQs, website copy, market research summaries, competitive intelligence narratives, thought-leadership content, and editorial assets designed to be useful to both human readers and search engines.",
    relatedLink: { label: "Browse Selected Portfolio Work", path: "/work", sectionId: "selected-work" }
  },
  {
    id: "faq-b2b-experience",
    question: "Does Seapee Bajaj have experience with B2B content?",
    answer:
      "Yes. Seapee has 10+ years of experience across Allied Market Research, The Insight Partners, Grand View Research, IMARC Group, and Perfect Clicks—creating and managing research-led content for B2B and knowledge-intensive industries including ICT, semiconductors, automotive, and enterprise technology.",
    relatedLink: { label: "View Professional Experience Timeline", path: "/experience", sectionId: "experience" }
  },
  {
    id: "faq-seo-skills",
    question: "What SEO skills does Seapee Bajaj have?",
    answer:
      "Seapee's SEO experience includes keyword research (including Semrush), search intent analysis, title and meta optimization, internal linking, logical heading structure, image optimization, content optimization, E-E-A-T principles, and structuring content for both traditional search and AI-powered answer engines.",
    relatedLink: { label: "See SEO, GEO & AEO Approach", path: "/seo-geo", sectionId: "seo-geo-expertise" }
  },
  {
    id: "faq-geo-aeo-training",
    question: "What experience and training does Seapee Bajaj have in GEO and AEO?",
    answer:
      "Seapee combines hands-on experience in answer-focused content strategy—such as growing average post views on the Well of Insights Quora page from 60–70 to 250+ at Grand View Research—with formal professional development in Generative Engine Optimization (GEO), including completing Introduction to Generative Engine Optimization on Coursera (September 28, 2026), Google Prompting Essentials, and the Be10x AI tools program.",
    relatedLink: { label: "View Certifications & Case Studies", path: "/case-studies", sectionId: "case-studies" }
  },
  {
    id: "faq-geo-aeo-definition",
    question: "How do Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) relate to SEO?",
    answer:
      "Traditional SEO focuses on search intent, keyword research, and on-page signals to improve discoverability in search engines. Answer Engine Optimization (AEO) structures content to provide direct, scannable answers for featured snippets, AI Overviews, and Q&A platforms, while Generative Engine Optimization (GEO) focuses on clear entity context, factual accuracy, and structured depth so AI-powered search systems like ChatGPT, Gemini, and Perplexity can accurately interpret and synthesize the content.",
    relatedLink: { label: "Read More on SEO, GEO & AEO", path: "/geo-aeo", sectionId: "seo-geo-expertise" }
  },
  {
    id: "faq-ai-workflow",
    question: "Does Seapee Bajaj use AI for content creation?",
    answer:
      "Yes. Seapee uses AI tools as part of the content workflow while maintaining human judgment, research accuracy, originality, readability, and a natural editorial voice."
  },
  {
    id: "faq-remote-work",
    question: "Is Seapee Bajaj available for remote work?",
    answer:
      "Yes. Seapee is open to remote opportunities involving content writing, SEO, content strategy, editorial operations, research-led content, and related work.",
    relatedLink: { label: "Get in Touch for Remote Roles", path: "/contact", sectionId: "contact" }
  },
  {
    id: "faq-published-work",
    question: "Where can I see Seapee Bajaj's published work?",
    answer:
      "Published work and selected projects are showcased throughout this portfolio. Visitors can also explore Seapee's published articles, creative writing, professional work, and published book Not Unworthy through the relevant links on the website.",
    relatedLink: { label: "Explore Published Book & Portfolio", path: "/book", sectionId: "published-work" }
  },
  {
    id: "faq-not-unworthy-reviews",
    question: "What do readers say about Not Unworthy?",
    answer:
      "Readers describe Not Unworthy as a very engaging, imaginative, and deep poetry collection that mirrors human nature through the elements of nature and reignites a love for poetry. Reviewers have called every poem a masterpiece in itself and described the book as an experience, not just a book—praising its relatable verses and the patience, courage, and dedication behind making its words come alive.",
    relatedLink: { label: "Explore Not Unworthy & Reader Reflections", path: "/book", sectionId: "published-work" }
  },
  {
    id: "faq-contact",
    question: "How can I contact Seapee Bajaj?",
    answer:
      "Visitors can use the Contact section on this website to get in touch regarding professional opportunities, content projects, SEO work, collaborations, or other relevant enquiries."
  }
];


