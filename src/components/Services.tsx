import React from 'react';
import { SERVICES } from '../data/portfolioData';
import { ServiceItem } from '../types';
import seoContentLogo from '../assets/images/service_logo_seo_content_1790405462914.jpg';
import b2bResearchLogo from '../assets/images/service_logo_b2b_research_1790405473123.jpg';
import websiteConversionLogo from '../assets/images/service_logo_website_conversion_1790405483488.jpg';
import contentStrategyLogo from '../assets/images/service_logo_content_strategy_1790405496321.jpg';
import thoughtLeadershipLogo from '../assets/images/service_logo_thought_leadership_1790405506344.jpg';
import rankReachLogo from '../assets/images/about_logo_rank_reach_1790405429831.jpg';
import empiricalLogo from '../assets/images/about_logo_empirical_1790405440606.jpg';
import refinedLogo from '../assets/images/about_logo_refined_1790405450987.jpg';

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
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section
      className="w-full px-5 md:px-10 lg:px-16 py-20 lg:py-28 bg-[#fbf9f6]"
      id="services"
      aria-labelledby="services-heading"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col gap-12 lg:gap-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#546252] font-semibold">
              Core Practice &amp; Capabilities
            </span>
            <h2
              id="services-heading"
              className="font-serif text-3xl md:text-4xl text-[#1b1c1a] font-medium tracking-tight mt-2"
            >
              What I Can Help You With
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#55433c] max-w-md leading-relaxed">
            Hands-on SEO content strategy, B2B writing, market research translation, GEO/AEO optimization, and conversion-focused portfolio websites.
          </p>
        </div>

        {/* 8 Distinct Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                className="bg-white p-6 sm:p-7 rounded-xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group border border-[#eae8e5] cursor-pointer hover:border-[#dbc1b8] focus-visible:outline-2 focus-visible:outline-[#994524]"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-5">
                    {logo ? (
                      <div className="w-20 h-20 rounded-2xl bg-[#fbf9f6] border border-[#e4e2df] shadow-2xs overflow-hidden flex items-center justify-center shrink-0">
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          width={80}
                          height={80}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-[#efeeeb] flex items-center justify-center text-[#994524] group-hover:bg-[#ffdbcf] transition-colors">
                        <span className="material-symbols-outlined text-3xl">{service.icon}</span>
                      </div>
                    )}
                    <span className="text-xs uppercase text-[#546252] font-semibold tracking-wider pt-1 text-right">
                      {service.number}. {service.phase}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#1b1c1a] mb-2.5 group-hover:text-[#994524] transition-colors font-medium leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#55433c] leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-[#efeeeb]/70 flex items-center justify-between text-[#994524] text-xs font-semibold tracking-wide">
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
