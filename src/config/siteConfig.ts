/**
 * Centralized Configuration for External Links and Contact Details
 * Update these variables to reflect changes across the entire website.
 */

export const SITE_CONFIG = {
  NAME: "Seapee Bajaj",
  TITLE: "Editorial & SEO Strategist",
  POSITIONING: "SEO Content Strategist • Research-Driven Writer • Content Strategist",
  LOCATION: "New Delhi & Global Remote",

  // Core External Links & Contact Variables
  EMAIL: "bajajseapee@gmail.com",
  WHATSAPP_NUMBER: "+918888010822",
  WHATSAPP_DISPLAY: "+91 88880 10822",
  WHATSAPP_DIGITS: "918888010822",
  LINKEDIN_URL: "https://www.linkedin.com/in/seapeebajaj",
  TOPMATE_URL: "https://topmate.io/seapee_bajaj",
  RESUME_URL: "/resume-seapee-bajaj.pdf",
  SUBSTACK_URL: "https://seapeebajaj.substack.com",

  // Selected Work / Portfolio URLs (from source document)
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

  // Personal & Creative Work URLs (from source document)
  CREATIVE_LINKS: {
    STARTUP_INDIA: "https://www.startupindiamagazine.com/seapee-bajaj/",
    WORDY_WORTHY: "https://www.instagram.com/wordy_worthy/"
  },

  // Published Poetry Book Details
  BOOK: {
    TITLE: "Not Unworthy",
    AUTHOR: "Seapee Bajaj",
    GENRE: "Poetry",
    PUBLISHER: "Notion Press",
    PUBLICATION_DATE: "December 18, 2020",
    AMAZON_URL: "https://www.amazon.in/Not-Unworthy-Seapee-Bajaj/dp/1637457618",
    DESCRIPTION: "Not Unworthy is my published poetry collection exploring resilience, consistency, everyday courage, and the quiet worth of ordinary lives. It reflects another side of my writing — more personal, imaginative, and introspective.",
    CREDIBILITY_TAG: "Published author • Poetry • Original creative work",
    HEADLINE: "Beyond Brand Content, I Write From Experience.",
    SUBHEADLINE: "Published poetry, original perspectives, and a lifelong love for words."
  },

  // Image URLs exported from Stitch design
  HERO_IMAGE: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLprfha2SI32O8n7gJDCRaEv8AvhIETinZCZp3HLXo8nr1KAK7XIPvBztAnnZAf-ywge1dUzKPYjH0rm-v5GSRJdSKkPUpADTNvDIvp7EMUfVtT8NP9JtCSO0F24a33bJ9cdJzX5HviwwKpKeUSAZpNO68DqqKgjO85-hwH4_Z-5ESP9Y6MdYZhCsuFj3rM-0Ne5xs2kgjy6SGL80daDr0_dbq1xLfV7MbxAnW4S4MWtuA8DSEFo_Ta0hM9MYUfCaXng",
  AVATAR_IMAGE: "https://lh3.googleusercontent.com/aida/AEtjO1WlYTkKE5L8l8AzerpuqfsVtE2XV4H2FA_r_Anzs1inOR9omahXC2jDejmj2ePWaN5dXb1_0yXgw8kivdQR1a62h2QpeF0ZyIwOBh_3BU1m_MUR9Z8c1Z8hgbOFYKf4pCdQGv9-7LAlEPvZOQpA7c8uOOGXivWYE-IKeTxA90gv5rfmAQxtPtp4IfVFtcq-hULv2UadQ_NtU73Po-YVr7EljLN15wMp5b_fLxTsmC6r2E_ADHvG41oL5dYpkGekiOqqBK4OM4PAAQ",

  // SEO & Meta
  SEO: {
    TITLE: "Seapee Bajaj | B2B SEO Content & Editorial Strategist",
    DESCRIPTION: "I help B2B and research-driven brands turn technical knowledge and market data into clear content that ranks and converts. With 9+ years of editorial and SEO experience, I write content that shows up in search, builds trust with your audience, and moves the right readers toward a decision.",
    CANONICAL: "https://seapeebajaj.com",
    TWITTER_HANDLE: "@seapeebajaj"
  }
} as const;

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


