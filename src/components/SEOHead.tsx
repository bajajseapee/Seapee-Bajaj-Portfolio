import React, { useEffect } from 'react';
import {
  SITE_CONFIG,
  SITE_URL,
  SEO_ROUTES,
  getCanonicalUrl,
} from '../config/siteConfig';

interface SEOHeadProps {
  currentPath: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ currentPath }) => {
  const routeConfig = SEO_ROUTES[currentPath] || SEO_ROUTES['/'];
  const canonicalUrl = getCanonicalUrl(routeConfig.path);

  useEffect(() => {
    // 1. Update Document Title
    document.title = routeConfig.title;

    // Helper to update or create meta tags
    const setMetaTag = (
      selector: string,
      attributeName: 'name' | 'property',
      attributeValue: string,
      content: string
    ) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attributeName, attributeValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('meta[name="title"]', 'name', 'title', routeConfig.title);
    setMetaTag(
      'meta[name="description"]',
      'name',
      'description',
      routeConfig.description
    );

    // 3. Canonical Link Tag
    let canonicalLink = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 4. Open Graph Tags
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
    setMetaTag(
      'meta[property="og:site_name"]',
      'property',
      'og:site_name',
      SITE_CONFIG.SITE_NAME
    );
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag(
      'meta[property="og:title"]',
      'property',
      'og:title',
      routeConfig.title
    );
    setMetaTag(
      'meta[property="og:description"]',
      'property',
      'og:description',
      routeConfig.description
    );
    setMetaTag(
      'meta[property="og:image"]',
      'property',
      'og:image',
      SITE_CONFIG.HERO_IMAGE
    );

    // 5. Twitter Card Tags
    setMetaTag(
      'meta[name="twitter:card"]',
      'name',
      'twitter:card',
      'summary_large_image'
    );
    setMetaTag(
      'meta[property="twitter:url"]',
      'property',
      'twitter:url',
      canonicalUrl
    );
    setMetaTag(
      'meta[name="twitter:url"]',
      'name',
      'twitter:url',
      canonicalUrl
    );
    setMetaTag(
      'meta[property="twitter:title"]',
      'property',
      'twitter:title',
      routeConfig.title
    );
    setMetaTag(
      'meta[name="twitter:title"]',
      'name',
      'twitter:title',
      routeConfig.title
    );
    setMetaTag(
      'meta[property="twitter:description"]',
      'property',
      'twitter:description',
      routeConfig.description
    );
    setMetaTag(
      'meta[name="twitter:description"]',
      'name',
      'twitter:description',
      routeConfig.description
    );
    setMetaTag(
      'meta[property="twitter:image"]',
      'property',
      'twitter:image',
      SITE_CONFIG.HERO_IMAGE
    );
    setMetaTag(
      'meta[name="twitter:image"]',
      'name',
      'twitter:image',
      SITE_CONFIG.HERO_IMAGE
    );
  }, [routeConfig, canonicalUrl]);

  // Build valid JSON-LD Graph
  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Seapee Bajaj Portfolio',
      item: SITE_URL,
    },
  ];

  if (routeConfig.path !== '/') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: routeConfig.breadcrumbLabel,
      item: canonicalUrl,
    });
  }

  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}#person`,
        name: SITE_CONFIG.NAME,
        url: SITE_URL,
        image: SITE_CONFIG.HERO_IMAGE,
        jobTitle: 'SEO Content Strategist',
        description: SITE_CONFIG.SEO.DESCRIPTION,
        email: SITE_CONFIG.EMAIL,
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: 'MBA in Systems',
        },
        hasCredential: [
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'HubSpot Content Marketing Certification',
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'Google Prompting Essentials Certificate',
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'Be10x AI Tools Program',
          },
        ],
        knowsAbout: [
          'SEO Content Strategy',
          'B2B Content Writing',
          'Market Research Content',
          'Generative Engine Optimization (GEO)',
          'Answer Engine Optimization (AEO)',
          'AI Search Visibility',
          'Search Intent & On-Page SEO',
          'E-E-A-T Content Optimization',
          'Keyword Research',
          'AI-Assisted Content Strategy',
        ],
        sameAs: [
          SITE_CONFIG.LINKEDIN_URL,
          SITE_CONFIG.TOPMATE_URL,
          SITE_CONFIG.SUBSTACK_URL,
          SITE_CONFIG.PORTFOLIO_LINKS.QUORA_WELL_OF_INSIGHTS,
          SITE_CONFIG.CREATIVE_LINKS.STARTUP_INDIA,
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}#website`,
        url: SITE_URL,
        name: SITE_CONFIG.SITE_NAME,
        alternateName: SITE_CONFIG.BRAND_NAME,
        description: SITE_CONFIG.SEO.DESCRIPTION,
        publisher: {
          '@id': `${SITE_URL}#person`,
        },
        inLanguage: 'en',
      },
      {
        '@type': routeConfig.pageType,
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: routeConfig.title,
        description: routeConfig.description,
        isPartOf: {
          '@id': `${SITE_URL}#website`,
        },
        about: {
          '@id': `${SITE_URL}#person`,
        },
        mainEntity: {
          '@id': `${SITE_URL}#person`,
        },
        inLanguage: 'en',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: breadcrumbItems,
      },
      {
        '@type': 'Book',
        '@id': `${SITE_URL}#book-not-unworthy`,
        name: SITE_CONFIG.BOOK.TITLE,
        author: {
          '@id': `${SITE_URL}#person`,
        },
        bookFormat: 'https://schema.org/Paperback',
        publisher: {
          '@type': 'Organization',
          name: SITE_CONFIG.BOOK.PUBLISHER,
        },
        datePublished: '2020-12-18',
        url: SITE_CONFIG.BOOK.AMAZON_URL,
        description: SITE_CONFIG.BOOK.DESCRIPTION,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
    />
  );
};
