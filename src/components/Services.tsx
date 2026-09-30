import React from 'react';
import Image from 'next/image';
import { SERVICES } from '../data/portfolioData';
import { ServiceItem } from '../types';
import { SECTION_BODY_COPY_CLASS } from './About';
import seoContentLogo from '../assets/images/service_logo_seo_content_1790405462914.webp';
import b2bResearchLogo from '../assets/images/service_logo_b2b_research_1790405473123.webp';
import websiteConversionLogo from '../assets/images/service_logo_website_conversion_1790405483488.jpg';
import contentStrategyLogo from '../assets/images/service_logo_content_strategy_1790405496321.jpg';
import thoughtLeadershipLogo from '../assets/images/service_logo_thought_leadership_1790405506344.jpg';
import rankReachLogo from '../assets/images/about_logo_rank_reach_1790405429831.webp';
import empiricalLogo from '../assets/images/about_logo_empirical_1790405440606.webp';
import refinedLogo from '../assets/images/about_logo_refined_1790405450987.webp';

export const SERVICE_LOGOS: Record<string, { src: string; alt: string }> = {
  'seo-content': {
    src: seoContentLogo,
    alt: 'SEO Content Strategy service icon showing search bar and ranking growth',
  },
  'b2b-content-writing': {
    src: refinedLogo,
    alt: 'B2B Content Writing service icon showing editorial book and pen',
  },
  'b2b-research': {
    src: b2bResearchLogo,
    alt: 'Research-Driven Content service icon showing market intelligence report',
  },
  'geo-optimization': {
    src: rankReachLogo,
    alt: 'GEO Generative Engine Optimization service icon showing connected topic nodes',
  },
  'aeo-optimization': {
    src: thoughtLeadershipLogo,
    alt: 'AEO Answer Engine Optimization service icon showing direct answer badge',
  },
  'content-optimization': {
    src: empiricalLogo,
    alt: 'Content Optimization service icon showing on-page audit and analytics',
  },
  'ai-assisted-strategy': {
    src: contentStrategyLogo,
    alt: 'AI-Assisted Content Strategy service icon showing structured editorial workflow',
  },
  'website-conversion': {
    src: websiteConversionLogo,
    alt: 'Portfolio Website Creation service icon showing conversion-focused web layout',
  },
};

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
  onNavigate?: (path: string, sectionId?: string) => void;
  isHomeRoute?: boolean;
}

const COMPACT_HELP_CARDS = [
  {
    id: 'seo-content-strategy',
    title: 'SEO Content Strategy',
    description:
      'I build search-aligned content ecosystems around keyword research, search intent mapping, E-E-A-T alignment, on-page SEO, and internal linking.',
    href: '/services',
    sectionId: 'services',
    logoKey: 'seo-content',
  },
  {
    id: 'b2b-research-driven-content',
    title: 'B2B & Research-Driven Content',
    description:
      'I translate primary and secondary market research across technology, manufacturing, logistics, and enterprise sectors into clear B2B narratives.',
    href: '/b2b-content',
    sectionId: 'services',
    logoKey: 'b2b-research',
  },
  {
    id: 'geo-ai-search',
    title: 'GEO & AI Search',
    description:
      'I structure factual, entity-clear content for AI Overviews, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO).',
    href: '/geo-aeo',
    sectionId: 'seo-geo-expertise',
    logoKey: 'geo-optimization',
  },
];

export const Services: React.FC<ServicesProps> = ({
  onSelectService,
  onNavigate,
  isHomeRoute = true,
}) => {
  const handleCardLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
    sectionId: string
  ) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path, sectionId);
    }
  };

  return (
    <section
      className="w-full px-5 md:px-10 lg:px-16 py-8 sm:py-10 lg:py-12 bg-[#fbf9f6] border-t border-[#e4e2df]"
      id="services"
      aria-labelledby="services-heading"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col gap-6 lg:gap-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#546252] font-semibold">
              Core Practice &amp; Capabilities
            </span>
            <h2
              id="services-heading"
              className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1b1c1a] font-medium tracking-tight mt-1.5"
            >
              What I Can Help You With
            </h2>
          </div>
          <a
            href="/work"
            onClick={(e) => handleCardLink(e, '/work', 'selected-work')}
            className="text-xs sm:text-sm font-semibold text-[#994524] hover:underline inline-flex items-center gap-1 shrink-0"
          >
            <span>Browse selected work</span>
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              arrow_forward
            </span>
          </a>
        </div>

        {/* 3 Compact Cards: Horizontal Swipeable Row (scroll-snap) on Mobile, 3-Column Grid on Desktop */}
        <div
          className="flex md:grid md:grid-cols-3 gap-4 sm:gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth no-scrollbar pb-1"
          role="region"
          aria-label="Core service areas"
        >
          {COMPACT_HELP_CARDS.map((card) => {
            const logo = SERVICE_LOGOS[card.logoKey];
            return (
              <article
                key={card.id}
                className="w-[84%] sm:w-[75%] md:w-full shrink-0 snap-start bg-white p-5 sm:p-6 rounded-xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between border border-[#eae8e5] hover:border-[#dbc1b8]"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    {logo && (
                      <div className="w-10 h-10 rounded-lg bg-[#fbf9f6] border border-[#e4e2df] overflow-hidden flex items-center justify-center shrink-0">
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          width={40}
                          height={40}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <h3 className="font-serif text-lg sm:text-xl text-[#1b1c1a] font-medium leading-snug">
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-sm text-[#55433c] leading-relaxed line-clamp-1">
                    {card.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#efeeeb] flex items-center justify-between">
                  <a
                    href={card.href}
                    onClick={(e) => handleCardLink(e, card.href, card.sectionId)}
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#994524] hover:underline"
                  >
                    <span>Learn more</span>
                    <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                      arrow_forward
                    </span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Full 8 Service Cards Grid (Visible on /services and /b2b-content, kept in DOM via sr-only on homepage) */}
        <div
          className={
            isHomeRoute
              ? 'sr-only'
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-4 border-t border-[#e4e2df]'
          }
        >
          {SERVICES.map((service) => {
            const logo = SERVICE_LOGOS[service.id];
            return (
              <div
                key={service.id}
                onClick={() => onSelectService(service)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectService(service);
                  }
                }}
                role="button"
                tabIndex={isHomeRoute ? -1 : 0}
                className="bg-white p-5 sm:p-6 rounded-xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group border border-[#eae8e5] cursor-pointer hover:border-[#dbc1b8] focus-visible:outline-2 focus-visible:outline-[#994524]"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    {logo ? (
                      <div className="w-12 h-12 rounded-xl bg-[#fbf9f6] border border-[#e4e2df] shadow-2xs overflow-hidden flex items-center justify-center shrink-0">
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          width={48}
                          height={48}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-[#efeeeb] flex items-center justify-center text-[#994524] group-hover:bg-[#ffdbcf] transition-colors">
                        <span className="material-symbols-outlined text-2xl">{service.icon}</span>
                      </div>
                    )}
                    <span className="text-xs uppercase text-[#546252] font-semibold tracking-wider pt-1 text-right">
                      {service.number}. {service.phase}
                    </span>
                  </div>

                  <p className="font-serif text-lg sm:text-xl text-[#1b1c1a] mb-2 group-hover:text-[#994524] transition-colors font-medium leading-snug">
                    {service.title}
                  </p>
                  <p className="text-sm text-[#55433c] leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#efeeeb]/70 flex items-center justify-between text-[#994524] text-xs font-semibold tracking-wide">
                  <span className="inline-flex items-center group-hover:translate-x-1 transition-transform">
                    View scope
                    <span className="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
                  </span>
                  <span className="text-[11px] text-[#546252] font-normal">
                    {service.deliverables.length} Deliverables
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
