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
}

export const Services: React.FC<ServicesProps> = ({
  onSelectService,
  onNavigate,
}) => {
  const handleInternalLink = (
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
    <section className="w-full px-5 md:px-10 lg:px-16 py-12 lg:py-16 bg-[#fbf9f6]" id="services">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-10 lg:gap-12">
        {/* Section Header */}
        <div className="flex flex-col w-full">
          <span className="text-xs uppercase tracking-widest text-[#546252] font-semibold">
            Core Practice &amp; Capabilities
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1b1c1a] font-medium tracking-tight mt-2">
            What I Can Help You With
          </h2>
          <div className="mt-3 flex flex-col gap-3">
            <p className={SECTION_BODY_COPY_CLASS}>
              <strong className="font-semibold text-[length:inherit] leading-[inherit] font-sans">
                SEO Content Strategy:
              </strong>{' '}
              I build search-aligned content ecosystems around keyword research, search intent mapping, E-E-A-T alignment, on-page SEO, and internal linking—creating articles, blogs, listicles, and website copy designed for sustainable organic visibility.
            </p>
            <p className={SECTION_BODY_COPY_CLASS}>
              <strong className="font-semibold text-[length:inherit] leading-[inherit] font-sans">
                B2B &amp; Research-Driven Content:
              </strong>{' '}
              I translate primary and secondary market research across technology, manufacturing, logistics, and enterprise sectors into clear B2B narratives, industry analysis, and competitive intelligence assets grounded in my research background at Allied Market Research, The Insight Partners, Grand View Research, and IMARC Group.
            </p>
            <p className={SECTION_BODY_COPY_CLASS}>
              <strong className="font-semibold text-[length:inherit] leading-[inherit] font-sans">
                GEO &amp; AI Search Optimization:
              </strong>{' '}
              I structure factual, entity-clear content for AI Overviews, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO) across platforms like ChatGPT, Perplexity, Gemini, and Quora, backed by my professional training in{' '}
              <em>Introduction to Generative Engine Optimization</em> on Coursera (Completed: September 28, 2026).
            </p>
          </div>
          <div className="pt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-[#994524]">
            <a
              href="/b2b-content"
              onClick={(e) => handleInternalLink(e, '/b2b-content', 'services')}
              className="hover:underline inline-flex items-center gap-1"
            >
              <span>B2B &amp; Market Research Content</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </a>
            <a
              href="/geo-aeo"
              onClick={(e) => handleInternalLink(e, '/geo-aeo', 'seo-geo-expertise')}
              className="hover:underline inline-flex items-center gap-1"
            >
              <span>GEO &amp; AI Search Optimization</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </a>
            <a
              href="/case-studies"
              onClick={(e) => handleInternalLink(e, '/case-studies', 'case-studies')}
              className="hover:underline inline-flex items-center gap-1"
            >
              <span>View Case Studies</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </a>
            <a
              href="/work"
              onClick={(e) => handleInternalLink(e, '/work', 'selected-work')}
              className="hover:underline inline-flex items-center gap-1"
            >
              <span>Browse Selected Work</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* 8 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
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
                tabIndex={0}
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
