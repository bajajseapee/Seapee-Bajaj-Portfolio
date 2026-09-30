import React, { useEffect } from 'react';
import {
  SITE_CONFIG,
  SITE_URL_ORIGIN,
  SEO_ROUTES,
  getCanonicalUrl,
} from '../config/siteConfig';
import { FAQ_ITEMS } from '../data/portfolioData';

interface SEOHeadProps {
  currentPath?: string;
  pathname?: string;
}

// Placeholder constants for social profile URLs used in Person JSON-LD sameAs
export const SOCIAL_PROFILE_PLACEHOLDERS = {
  LINKEDIN_URL: SITE_CONFIG.LINKEDIN_URL,
  QUORA_PROFILE_URL: SITE_CONFIG.QUORA_PROFILE_URL,
};

export const SEOHead: React.FC<SEOHeadProps> = ({ currentPath, pathname }) => {
  const rawPath = currentPath || pathname || '/';
  const cleanPath = rawPath === '/' ? '/' : rawPath.replace(/\/+$/, '');
  const routeConfig = SEO_ROUTES[cleanPath] || SEO_ROUTES['/'];
  const canonicalUrl = getCanonicalUrl(routeConfig.path);

  useEffect(() => {
    document.title = routeConfig.title;

    const upsertMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    upsertMeta('name', 'title', routeConfig.title);
    upsertMeta('name', 'description', routeConfig.description);
    upsertMeta('name', 'author', 'Seapee Bajaj');
    upsertMeta('name', 'publisher', 'Seapee Bajaj');
    upsertMeta('property', 'og:title', routeConfig.title);
    upsertMeta('property', 'og:description', routeConfig.description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:type', 'profile');
    upsertMeta('property', 'og:image', SITE_CONFIG.OG_IMAGE);
    upsertMeta('property', 'og:image:width', '1200');
    upsertMeta('property', 'og:image:height', '630');
    upsertMeta('property', 'og:image:alt', 'Seapee Bajaj — B2B SEO Content & GEO Strategist');
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:url', canonicalUrl);
    upsertMeta('name', 'twitter:title', routeConfig.title);
    upsertMeta('name', 'twitter:description', routeConfig.description);
    upsertMeta('name', 'twitter:image', SITE_CONFIG.OG_IMAGE);
    upsertMeta('name', 'twitter:image:alt', 'Seapee Bajaj — B2B SEO Content & GEO Strategist');

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

    // 1. Person JSON-LD structured data
    const personJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${SITE_URL_ORIGIN}/#person`,
      name: 'Seapee Bajaj',
      jobTitle: 'B2B SEO Content & GEO Strategist',
      url: `${SITE_URL_ORIGIN}/`,
      image: SITE_CONFIG.OG_IMAGE,
      description:
        'Seapee Bajaj is a B2B SEO content strategist with 10+ years of experience in market research content, GEO, AI search optimization, and editorial strategy.',
      email: SITE_CONFIG.EMAIL,
      sameAs: [
        SOCIAL_PROFILE_PLACEHOLDERS.LINKEDIN_URL,
        SOCIAL_PROFILE_PLACEHOLDERS.QUORA_PROFILE_URL,
      ],
      knowsAbout: [
        'Search Engine Optimization (SEO)',
        'Content Strategy',
        'Research-Led Content',
        'B2B Content Writing',
        'Generative Engine Optimization (GEO)',
        'Answer Engine Optimization (AEO)',
        'Market Research & Competitive Intelligence',
        'Editorial Workflows',
        'AI-Assisted Content Creation',
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
        { '@type': 'Organization', name: 'IMARC Group' },
        { '@type': 'Organization', name: 'Perfect Clicks' },
      ],
      alumniOf: [
        { '@type': 'Organization', name: 'Grand View Research' },
        { '@type': 'Organization', name: 'The Insight Partners' },
        { '@type': 'Organization', name: 'Allied Market Research' },
      ],
    };

    const upsertJsonLdScript = (id: string, data: unknown) => {
      let el = document.getElementById(id) as HTMLScriptElement | null;
      if (!el) {
        el = document.createElement('script');
        el.id = id;
        el.type = 'application/ld+json';
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(data);
    };

    upsertJsonLdScript('dynamic-jsonld', personJsonLd);

    // 2. WebSite, WebPage/ProfilePage, and BreadcrumbList JSON-LD for Entity & Page Structure
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
          '@type': routeConfig.pageType || 'WebPage',
          '@id': `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: routeConfig.title,
          description: routeConfig.description,
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

    upsertJsonLdScript('page-context-jsonld', pageContextJsonLd);

    // 3. FAQPage JSON-LD matching visible FAQSection questions and answers character-for-character
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

    upsertJsonLdScript('faq-jsonld', faqJsonLd);

    // 4. Book JSON-LD for "Not Unworthy" (without review array or aggregateRating)
    const bookReviewJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Book',
      '@id': `${SITE_URL_ORIGIN}/#not-unworthy-book`,
      name: SITE_CONFIG.BOOK.TITLE,
      author: {
        '@type': 'Person',
        '@id': `${SITE_URL_ORIGIN}/#person`,
        name: SITE_CONFIG.BOOK.AUTHOR,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_CONFIG.BOOK.PUBLISHER,
      },
      datePublished: '2020-12-18',
      bookFormat: 'https://schema.org/Paperback',
      isbn: SITE_CONFIG.BOOK.ISBN,
      url: SITE_CONFIG.BOOK.AMAZON_URL,
    };

    upsertJsonLdScript('book-review-jsonld', bookReviewJsonLd);
  }, [cleanPath, routeConfig, canonicalUrl]);

  return null;
};
