/**
 * Centralized Configuration for Site URL, Personal Brand, External Links, and SEO Metadata.
 * Change SITE_URL in this single file to update canonical URLs, Open Graph URLs, JSON-LD,
 * internal route links, robots.txt, and sitemap.xml across the entire project.
 */

export const SITE_URL = "https://seapee-bajaj-portfolio-3a8w-omega.vercel.app/";

export const SITE_URL_ORIGIN = SITE_URL.replace(/\/$/, "");

export function getCanonicalUrl(path: string = "/"): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (cleanPath === "/") {
    return `${SITE_URL_ORIGIN}/`;
  }
  return `${SITE_URL_ORIGIN}${cleanPath.replace(/\/$/, "")}`;
}

export const SITE_CONFIG = {
  SITE_URL,
  SITE_NAME: "Seapee Bajaj Portfolio",
  BRAND_NAME: "Seapee Bajaj",
  NAME: "Seapee Bajaj",
  TITLE: "SEO Content Strategist | B2B Content | GEO & AI Search",
  CORE_POSITIONING: "Research-Led. Reader-Focused.",
  SUPPORTING_POSITIONING: "Strategy, Storytelling & Search — Thoughtfully Combined.",
  POSITIONING: "SEO Content Strategist | B2B Content | GEO & AI Search",
  LOCATION: "New Delhi & Global Remote",

  // Core External Links & Contact Variables (Verified Existing Links Only)
  EMAIL: "bajajseapee@gmail.com",
  WHATSAPP_NUMBER: "+918888010822",
  WHATSAPP_DISPLAY: "+91 88880 10822",
  WHATSAPP_DIGITS: "918888010822",
  LINKEDIN_URL: "https://www.linkedin.com/in/seapeebajaj",
  TOPMATE_URL: "https://topmate.io/seapee_bajaj",
  RESUME_URL: "/resume-seapee-bajaj.pdf",
  SUBSTACK_URL: "https://seapeebajaj.substack.com",

  // Selected Work / Portfolio URLs
  PORTFOLIO_LINKS: {
    REAL_ESTATE_DYNAMICS: "https://www.linkedin.com/pulse/beyond-blueprint-insights-indias-evolving-real-estate-dynamics-wcnvc?utm_source=share&utm_medium=member_android&utm_campaign=share_via",
    IMARC_MANUFACTURING: "https://www.linkedin.com/pulse/how-imarc-group-can-assist-setting-up-successful-manufacturing-3ejwf?utm_source=share&utm_medium=member_android&utm_campaign=share_via",
    HOLIDAY_SUCCESS: "https://www.linkedin.com/pulse/unwrapping-holiday-success-power-strategic-consumer-insights-odcoc?utm_source=share&utm_medium=member_android&utm_campaign=share_via",
    GEN_Z: "https://www.linkedin.com/pulse/decoding-gen-z-generation-shaping-future-imarc-group-lkzoc?utm_source=share&utm_medium=member_android&utm_campaign=share_via",
    QUORA_WELL_OF_INSIGHTS: "https://wellofinsights.quora.com/",
    METAVERSE_CONTENT: "http://www.globalindustryherald.com/how-is-metaverse-impacting-the-universe-of-content-creation/",
    AI_MARKET_RESEARCH: "https://www.prnewswire.co.uk/news-releases/artificial-intelligence-market-to-garner-19478-million-by-2022-globally---allied-market-research-601286115.html",
    WMS_MARKET: "https://www.explorewms.com/wms-market-figures-2022.html",
    SOCIAL_MEDIA_ANALYTICS: "https://www.einnews.com/pr_news/528071240/social-media-analytics-market-is-expected-to-rise-at-a-cagr-of-29-2-and-to-reach-9-383-million-by-2022-says-amr",
    INBOUND_LOGISTICS: "https://www.inboundlogistics.com/articles/trends-march-2017/"
  },

  // Personal & Creative Work URLs
  CREATIVE_LINKS: {
    STARTUP_INDIA: "https://www.startupindiamagazine.com/seapee-bajaj/",
    WORDY_WORTHY: "https://www.instagram.com/wordy_worthy/"
  },

  // Published Poetry Book Details
  BOOK: {
    TITLE: "Not Unworthy",
    AUTHOR: "Seapee Bajaj",
    GENRE: "Poetry Collection (Paperback)",
    PUBLISHER: "Notion Press",
    PUBLICATION_DATE: "December 18, 2020",
    AMAZON_URL: "https://www.amazon.in/Not-Unworthy-Seapee-Bajaj/dp/1637457618",
    DESCRIPTION: "Not Unworthy is my published poetry collection exploring resilience, consistency, everyday courage, and the quiet worth of ordinary lives. It reflects another side of my writing — more personal, imaginative, and introspective.",
    CREDIBILITY_TAG: "Published author • Poetry • Original creative work",
    HEADLINE: "Beyond Brand Content, I Write From Experience.",
    SUBHEADLINE: "Published poetry, original perspectives, and a lifelong love for words."
  },

  // Image URLs
  HERO_IMAGE: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLprfha2SI32O8n7gJDCRaEv8AvhIETinZCZp3HLXo8nr1KAK7XIPvBztAnnZAf-ywge1dUzKPYjH0rm-v5GSRJdSKkPUpADTNvDIvp7EMUfVtT8NP9JtCSO0F24a33bJ9cdJzX5HviwwKpKeUSAZpNO68DqqKgjO85-hwH4_Z-5ESP9Y6MdYZhCsuFj3rM-0Ne5xs2kgjy6SGL80daDr0_dbq1xLfV7MbxAnW4S4MWtuA8DSEFo_Ta0hM9MYUfCaXng",
  AVATAR_IMAGE: "https://lh3.googleusercontent.com/aida/AEtjO1WlYTkKE5L8l8AzerpuqfsVtE2XV4H2FA_r_Anzs1inOR9omahXC2jDejmj2ePWaN5dXb1_0yXgw8kivdQR1a62h2QpeF0ZyIwOBh_3BU1m_MUR9Z8c1Z8hgbOFYKf4pCdQGv9-7LAlEPvZOQpA7c8uOOGXivWYE-IKeTxA90gv5rfmAQxtPtp4IfVFtcq-hULv2UadQ_NtU73Po-YVr7EljLN15wMp5b_fLxTsmC6r2E_ADHvG41oL5dYpkGekiOqqBK4OM4PAAQ",

  // Default SEO & Meta
  SEO: {
    TITLE: "Seapee Bajaj | SEO Content Strategist, B2B Content & GEO Specialist",
    DESCRIPTION: "Seapee Bajaj is a research-driven SEO content strategist with 9+ years of experience across B2B content, market research, SEO, content strategy, GEO and AI search optimization.",
    CANONICAL: SITE_URL,
    OG_SHORT_TAGLINE: "Seapee Bajaj — SEO • Content Strategy • GEO | Research-Led. Reader-Focused."
  }
} as const;

export interface RouteSEOConfig {
  path: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  subtitle: string;
  sectionId: string;
  pageType: "ProfilePage" | "WebPage" | "CollectionPage" | "ContactPage";
  breadcrumbLabel: string;
}

export const SEO_ROUTES: Record<string, RouteSEOConfig> = {
  "/": {
    path: "/",
    title: "Seapee Bajaj | SEO Content Strategist, B2B Content & GEO Specialist",
    description:
      "Seapee Bajaj is a research-driven SEO content strategist with 9+ years of experience across B2B content, market research, SEO, content strategy, GEO and AI search optimization.",
    h1: "Seapee Bajaj",
    kicker: "SEO Content Strategist | B2B Content | GEO & AI Search",
    subtitle: "Research-Led. Reader-Focused. Strategy, Storytelling & Search — Thoughtfully Combined.",
    sectionId: "hero",
    pageType: "ProfilePage",
    breadcrumbLabel: "Home"
  },
  "/about": {
    path: "/about",
    title: "About Seapee Bajaj | Research-Driven SEO Content Strategist",
    description:
      "Learn about Seapee Bajaj, an SEO content strategist and B2B writer with 9+ years of experience at IMARC Group, Grand View Research, The Insight Partners, and Allied Market Research.",
    h1: "About Seapee Bajaj — Research-Driven Content Strategist & SEO Professional",
    kicker: "Professional Background & Career Progression",
    subtitle: "9+ years across market research, B2B content, SEO, editorial workflows, and AI-search optimization.",
    sectionId: "about",
    pageType: "ProfilePage",
    breadcrumbLabel: "About"
  },
  "/work": {
    path: "/work",
    title: "Selected Work & Portfolio | Seapee Bajaj — B2B & SEO Content",
    description:
      "Explore published B2B articles, market research coverage, consumer insights, and SEO content written by Seapee Bajaj across technology, manufacturing, and business.",
    h1: "Selected Work & Published Portfolio by Seapee Bajaj",
    kicker: "Published B2B, Market Research & SEO Content",
    subtitle: "A curated index of published work across market research, B2B strategy, consumer insights, and technology.",
    sectionId: "selected-work",
    pageType: "CollectionPage",
    breadcrumbLabel: "Work"
  },
  "/services": {
    path: "/services",
    title: "SEO, B2B Content & GEO Services | Seapee Bajaj",
    description:
      "Hands-on SEO content strategy, B2B content writing, research-driven content, GEO, AEO, content optimization, AI-assisted content workflows, and portfolio website creation.",
    h1: "SEO Content Strategy, B2B Content & GEO Services",
    kicker: "Core Practice & Hands-On Capabilities",
    subtitle: "Research-led content and search optimization services tailored for B2B brands, research firms, and professionals.",
    sectionId: "services",
    pageType: "WebPage",
    breadcrumbLabel: "Services"
  },
  "/case-studies": {
    path: "/case-studies",
    title: "SEO & B2B Content Case Studies | Seapee Bajaj",
    description:
      "Real-world SEO, Quora content strategy, B2B content operations, homepage conversion rewrites, and competitive intelligence case studies by Seapee Bajaj.",
    h1: "SEO, Content Strategy & Research Case Studies",
    kicker: "Documented Projects & Methodology",
    subtitle: "In-depth breakdowns of real projects across Grand View Research, IMARC Group, Jones Road Beauty, Fire AI, and Sorbitol competitive intelligence.",
    sectionId: "case-studies",
    pageType: "CollectionPage",
    breadcrumbLabel: "Case Studies"
  },
  "/seo-content": {
    path: "/seo-content",
    title: "SEO Content Strategy & On-Page Optimization | Seapee Bajaj",
    description:
      "How Seapee Bajaj approaches keyword research, search intent mapping, E-E-A-T, on-page SEO, internal linking, and research-driven content optimization.",
    h1: "SEO Content Strategy: Search Intent, E-E-A-T & On-Page Architecture",
    kicker: "SEO Content Expertise",
    subtitle: "Aligning deep subject-matter research with search intent, semantic structure, and human-first readability.",
    sectionId: "seo-geo-expertise",
    pageType: "WebPage",
    breadcrumbLabel: "SEO Content"
  },
  "/geo-aeo": {
    path: "/geo-aeo",
    title: "GEO & AEO Specialist | Generative & Answer Engine Optimization — Seapee Bajaj",
    description:
      "Structuring research-backed content for AI Overviews, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO) across ChatGPT, Perplexity, and Gemini.",
    h1: "GEO & AEO: Optimizing Content for AI Search & Answer Engines",
    kicker: "Generative Engine Optimization & AI Search Visibility",
    subtitle: "Helping brands structure clear, factual, entity-rich content for traditional search and AI-driven answer systems.",
    sectionId: "seo-geo-expertise",
    pageType: "WebPage",
    breadcrumbLabel: "GEO & AEO"
  },
  "/b2b-content": {
    path: "/b2b-content",
    title: "B2B Content Writer & Strategist | Seapee Bajaj",
    description:
      "B2B content writing and strategy grounded in primary and secondary market research across ICT, semiconductors, manufacturing, logistics, and enterprise technology.",
    h1: "B2B Content Strategy & Technical Industry Storytelling",
    kicker: "B2B Content Specialist",
    subtitle: "Translating complex technical specifications and market data into clear, decision-ready B2B narratives.",
    sectionId: "services",
    pageType: "WebPage",
    breadcrumbLabel: "B2B Content"
  },
  "/market-research-content": {
    path: "/market-research-content",
    title: "Market Research Content & Industry Analysis | Seapee Bajaj",
    description:
      "9+ years of market research and content experience across Allied Market Research, The Insight Partners, Grand View Research, and IMARC Group.",
    h1: "Market Research Content: Turning Data & Forecasts into Clear Narratives",
    kicker: "Research-Driven Writer",
    subtitle: "Built on a foundation of primary research, secondary research, market estimation, and competitive intelligence.",
    sectionId: "experience",
    pageType: "WebPage",
    breadcrumbLabel: "Market Research Content"
  },
  "/writing": {
    path: "/writing",
    title: "Writing, Essays & Editorial Perspectives | Seapee Bajaj",
    description:
      "Editorial essays, SEO and GEO guides, founder features in Startup India Magazine, and creative writing by Seapee Bajaj.",
    h1: "Writing, Essays & Editorial Perspectives on SEO, B2B & GEO",
    kicker: "Editorial Hub & Thought Leadership",
    subtitle: "Practical perspectives on B2B SEO content, Generative Engine Optimization, market research, and human-first AI workflows.",
    sectionId: "writing",
    pageType: "CollectionPage",
    breadcrumbLabel: "Writing"
  },
  "/book": {
    path: "/book",
    title: "Not Unworthy — Poetry Book by Seapee Bajaj",
    description:
      "Not Unworthy is a published paperback poetry collection by Seapee Bajaj (Notion Press) exploring resilience, consistency, everyday courage, and human potential.",
    h1: "Not Unworthy — Published Poetry Collection by Seapee Bajaj",
    kicker: "Published Author • Notion Press",
    subtitle: "Exploring resilience, consistency, everyday courage, and the quiet worth of ordinary lives.",
    sectionId: "published-work",
    pageType: "WebPage",
    breadcrumbLabel: "Book"
  },
  "/contact": {
    path: "/contact",
    title: "Contact Seapee Bajaj | Work With an SEO & B2B Content Strategist",
    description:
      "Get in touch with Seapee Bajaj for SEO content strategy, B2B content writing, GEO/AEO optimization, market research content, or portfolio website projects.",
    h1: "Contact Seapee Bajaj — Let's Discuss Your Content & SEO Goals",
    kicker: "Work With Me",
    subtitle: "Available for B2B content strategy, SEO content writing, GEO/AEO optimization, and research-driven editorial projects.",
    sectionId: "contact",
    pageType: "ContactPage",
    breadcrumbLabel: "Contact"
  }
};

export function buildGmailComposeUrl(subject?: string, body?: string): string {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: SITE_CONFIG.EMAIL,
  });
  if (subject) {
    params.set('su', subject);
  }
  if (body) {
    params.set('body', body);
  }
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export function buildOutlookComposeUrl(subject?: string, body?: string): string {
  const queryParts: string[] = [];
  if (subject) {
    queryParts.push(`subject=${encodeURIComponent(subject)}`);
  }
  if (body) {
    queryParts.push(`body=${encodeURIComponent(body)}`);
  }
  const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
  return `mailto:${SITE_CONFIG.EMAIL}${queryString}`;
}

export function buildWhatsAppUrl(message?: string): string {
  const text =
    message ||
    "Hi Seapee, I visited your portfolio and would love to discuss a content or SEO project.";
  return `https://wa.me/${SITE_CONFIG.WHATSAPP_DIGITS}?text=${encodeURIComponent(text)}`;
}
