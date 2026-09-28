import React, { useEffect } from 'react';
import { SITE_CONFIG, SITE_URL_ORIGIN, SEO_ROUTES, getCanonicalUrl } from '../config/siteConfig';
import { FAQ_ITEMS } from '../data/portfolioData';

interface SEOHeadProps {
  currentPath?: string;
  pathname?: string;
}

interface RouteMeta {
  title: string;
  description: string;
  canonicalPath: string;
}

// Placeholder constants for LinkedIn and Quora profile URLs used in Person JSON-LD sameAs
export const SOCIAL_PROFILE_PLACEHOLDERS = {
  LINKEDIN_PROFILE_URL: SITE_CONFIG.LINKEDIN_URL || 'https://www.linkedin.com/in/YOUR-LINKEDIN-PROFILE-PLACEHOLDER',
  QUORA_PROFILE_URL: SITE_CONFIG.QUORA_PROFILE_URL || 'https://www.quora.com/profile/YOUR-QUORA-PROFILE-PLACEHOLDER',
  QUORA_SPACE_URL: SITE_CONFIG.PORTFOLIO_LINKS.QUORA_WELL_OF_INSIGHTS,
};

const ROUTE_META: Record<string, RouteMeta> = {
  '/': {
    title: 'Seapee Bajaj | B2B SEO Content & Editorial Strategist',
    description:
      'B2B SEO content & editorial strategist with 9+ years of experience in market research, search-aligned storytelling, and GEO/AEO optimization.',
    canonicalPath: '/',
  },
  '/about': {
    title: 'About Seapee Bajaj | B2B SEO Content Strategist',
    description:
      'Seapee Bajaj is a B2B SEO content strategist with 9+ years of experience at IMARC Group, Grand View Research and Allied Market Research.',
    canonicalPath: '/about',
  },
  '/experience': {
    title: 'Experience & Career | Seapee Bajaj — B2B & SEO',
    description:
      "Explore Seapee Bajaj's 9+ years of experience across Perfect Clicks, IMARC Group, Grand View Research, The Insight Partners and Allied Market Research.",
    canonicalPath: '/experience',
  },
  '/services': {
    title: 'SEO, B2B Content & GEO Services | Seapee Bajaj',
    description:
      'Professional B2B content writing, SEO content strategy, market research storytelling, content optimization, and GEO/AEO services by Seapee Bajaj.',
    canonicalPath: '/services',
  },
  '/case-studies': {
    title: 'SEO & B2B Content Case Studies | Seapee Bajaj',
    description:
      'Review B2B content and SEO case studies by Seapee Bajaj, including Well of Insights on Quora, IMARC Group workflows, Fire AI, and Sorbitol research.',
    canonicalPath: '/case-studies',
  },
  '/portfolio': {
    title: 'Published B2B & SEO Portfolio | Seapee Bajaj',
    description:
      'Browse published B2B articles, market research insights, consumer trend reports, and SEO content samples written and strategized by Seapee Bajaj.',
    canonicalPath: '/portfolio',
  },
  '/work': {
    title: 'Selected B2B & Research Work | Seapee Bajaj',
    description:
      'Explore selected B2B articles, industry analysis briefings, consumer trend studies, and SEO content pieces published by strategist Seapee Bajaj.',
    canonicalPath: '/work',
  },
  '/seo-geo': {
    title: 'SEO, AEO & GEO Search Expertise | Seapee Bajaj',
    description:
      'How Seapee Bajaj combines traditional on-page SEO and E-E-A-T with Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO).',
    canonicalPath: '/seo-geo',
  },
  '/writing': {
    title: 'Articles & Insights on SEO & B2B | Seapee Bajaj',
    description:
      'Read deep-dive articles by Seapee Bajaj on B2B SEO content strategy, AEO vs GEO, human-edited AI workflows, and market-research-backed writing.',
    canonicalPath: '/writing',
  },
  '/book': {
    title: 'Not Unworthy — Published Book by Seapee Bajaj',
    description:
      'Discover Not Unworthy, a published poetry and prose collection by Seapee Bajaj (Notion Press, ISBN 979-8889356134), exploring resilience and worth.',
    canonicalPath: '/book',
  },
  '/contact': {
    title: 'Contact Seapee Bajaj | B2B Content & SEO Roles',
    description:
      'Contact Seapee Bajaj for B2B content writing, SEO strategy, market-research storytelling, and editorial consulting opportunities in Pune or remote.',
    canonicalPath: '/contact',
  },
  '/seo-content': {
    title: 'SEO Content Strategy Services | Seapee Bajaj',
    description:
      'Search-intent-led SEO content strategy, Semrush keyword research, topic clusters, and on-page SEO optimization for B2B brands by Seapee Bajaj.',
    canonicalPath: '/seo-content',
  },
  '/b2b-content': {
    title: 'B2B Content Writing Services | Seapee Bajaj',
    description:
      'Authoritative B2B content writing across technology, manufacturing, semiconductors, and SaaS—grounded in 9+ years of industry research experience.',
    canonicalPath: '/b2b-content',
  },
  '/market-research-content': {
    title: 'Market Research Content Strategy | Seapee Bajaj',
    description:
      'Translating primary and secondary market research, competitive intelligence, and industry data into clear B2B narratives by strategist Seapee Bajaj.',
    canonicalPath: '/market-research-content',
  },
  '/geo-aeo': {
    title: 'GEO & AEO Optimization Services | Seapee Bajaj',
    description:
      'Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) services to structure B2B content for AI Overviews, ChatGPT, and Perplexity.',
    canonicalPath: '/geo-aeo',
  },
};

export const SEOHead: React.FC<SEOHeadProps> = ({ currentPath, pathname }) => {
  const rawPath = currentPath || pathname || '/';
  const cleanPath = rawPath === '/' ? '/' : rawPath.replace(/\/+$/, '');
  const meta = ROUTE_META[cleanPath] || ROUTE_META['/'];
  const canonicalUrl = getCanonicalUrl(meta.canonicalPath);

  useEffect(() => {
    document.title = meta.title;

    const upsertMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    upsertMeta('name', 'title', meta.title);
    upsertMeta('name', 'description', meta.description);
    upsertMeta('name', 'author', 'Seapee Bajaj');
    upsertMeta('name', 'publisher', 'Seapee Bajaj');
    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:type', 'profile');
    upsertMeta('property', 'og:image', SITE_CONFIG.HERO_IMAGE);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:url', canonicalUrl);
    upsertMeta('name', 'twitter:title', meta.title);
    upsertMeta('name', 'twitter:description', meta.description);
    upsertMeta('name', 'twitter:image', SITE_CONFIG.HERO_IMAGE);

    // Remove keywords meta tag if present
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) {
      keywordsMeta.remove();
    }

    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonicalUrl);

    // Person JSON-LD structured data for homepage (/) and /about page (and all routes)
    const personJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${SITE_URL_ORIGIN}/#person`,
      name: 'Seapee Bajaj',
      jobTitle: 'B2B SEO Content & Editorial Strategist',
      url: `${SITE_URL_ORIGIN}/`,
      image: SITE_CONFIG.HERO_IMAGE,
      description:
        'Seapee Bajaj is a B2B SEO content strategist with 9+ years of experience at IMARC Group, Grand View Research and Allied Market Research.',
      // LinkedIn & Quora profile URLs (update placeholders in src/config/siteConfig.ts as needed)
      sameAs: [
        SOCIAL_PROFILE_PLACEHOLDERS.LINKEDIN_PROFILE_URL,
        SOCIAL_PROFILE_PLACEHOLDERS.QUORA_PROFILE_URL,
        SOCIAL_PROFILE_PLACEHOLDERS.QUORA_SPACE_URL,
        SITE_CONFIG.SUBSTACK_URL,
      ],
      knowsAbout: [
        'Search Engine Optimization (SEO)',
        'Content Strategy',
        'B2B Content Writing',
        'Research-Led Content',
        'Market Research & Competitive Intelligence',
        'Keyword Research & On-Page SEO',
        'Editorial Workflows',
        'Generative Engine Optimization (GEO)',
        'Answer Engine Optimization (AEO)',
        'AI-Assisted Content Workflows',
      ],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'MBA in Systems',
          credentialCategory: 'Postgraduate Degree',
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Introduction to Generative Engine Optimization',
          recognizedBy: { '@type': 'Organization', name: 'Coursera' },
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Content Marketing Certification',
          recognizedBy: { '@type': 'Organization', name: 'HubSpot Academy' },
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Google Prompting Essentials',
          recognizedBy: { '@type': 'Organization', name: 'Google / Coursera' },
        },
      ],
      worksFor: [
        {
          '@type': 'Organization',
          name: 'IMARC Group',
        },
        {
          '@type': 'Organization',
          name: 'Grand View Research',
        },
        {
          '@type': 'Organization',
          name: 'The Insight Partners',
        },
        {
          '@type': 'Organization',
          name: 'Allied Market Research',
        },
      ],
      alumniOf: [
        {
          '@type': 'Organization',
          name: 'IMARC Group',
        },
        {
          '@type': 'Organization',
          name: 'Grand View Research',
        },
        {
          '@type': 'Organization',
          name: 'The Insight Partners',
        },
        {
          '@type': 'Organization',
          name: 'Allied Market Research',
        },
      ],
    };

    const legacyScript = document.getElementById('schema-jsonld');
    if (legacyScript && legacyScript.id !== 'dynamic-jsonld') {
      legacyScript.remove();
    }

    let scriptEl = document.getElementById('dynamic-jsonld') as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'dynamic-jsonld';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(personJsonLd);

    // WebSite, ProfilePage/WebPage, and BreadcrumbList JSON-LD structured data
    const routeConfig = SEO_ROUTES[cleanPath] || SEO_ROUTES['/'];
    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Seapee Bajaj Portfolio',
        item: `${SITE_URL_ORIGIN}/`,
      },
    ];
    if (cleanPath !== '/') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: routeConfig.breadcrumbLabel,
        item: canonicalUrl,
      });
    }

    const pageContextJsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL_ORIGIN}/#website`,
          name: SITE_CONFIG.SITE_NAME,
          url: `${SITE_URL_ORIGIN}/`,
          publisher: { '@id': `${SITE_URL_ORIGIN}/#person` },
        },
        {
          '@type': routeConfig.pageType || 'ProfilePage',
          '@id': `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: meta.title,
          description: meta.description,
          isPartOf: { '@id': `${SITE_URL_ORIGIN}/#website` },
          about: { '@id': `${SITE_URL_ORIGIN}/#person` },
          mainEntity: { '@id': `${SITE_URL_ORIGIN}/#person` },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${canonicalUrl}#breadcrumb`,
          itemListElement: breadcrumbItems,
        },
      ],
    };

    let pageScriptEl = document.getElementById('page-context-jsonld') as HTMLScriptElement | null;
    if (!pageScriptEl) {
      pageScriptEl = document.createElement('script');
      pageScriptEl.id = 'page-context-jsonld';
      pageScriptEl.type = 'application/ld+json';
      document.head.appendChild(pageScriptEl);
    }
    pageScriptEl.textContent = JSON.stringify(pageContextJsonLd);

    // FAQPage JSON-LD structured data matching visible FAQSection questions and answers exactly
    const faqJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${SITE_URL_ORIGIN}/#faq`,
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };

    let faqScriptEl = document.getElementById('faq-jsonld') as HTMLScriptElement | null;
    if (!faqScriptEl) {
      faqScriptEl = document.createElement('script');
      faqScriptEl.id = 'faq-jsonld';
      faqScriptEl.type = 'application/ld+json';
      document.head.appendChild(faqScriptEl);
    }
    faqScriptEl.textContent = JSON.stringify(faqJsonLd);
  }, [meta.title, meta.description, canonicalUrl]);

  return null;
};
