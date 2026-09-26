import React from 'react';
import { SERVICES } from '../data/portfolioData';
import { ServiceItem } from '../types';
import seoContentLogo from '../assets/images/service_logo_seo_content_1790405462914.jpg';
import b2bResearchLogo from '../assets/images/service_logo_b2b_research_1790405473123.jpg';
import websiteConversionLogo from '../assets/images/service_logo_website_conversion_1790405483488.jpg';
import contentStrategyLogo from '../assets/images/service_logo_content_strategy_1790405496321.jpg';
import thoughtLeadershipLogo from '../assets/images/service_logo_thought_leadership_1790405506344.jpg';

export const SERVICE_LOGOS: Record<string, { src: string; alt: string }> = {
  'seo-content': {
    src: seoContentLogo,
    alt: 'SEO Content logo',
  },
  'b2b-research': {
    src: b2bResearchLogo,
    alt: 'B2B & Research Content logo',
  },
  'website-conversion': {
    src: websiteConversionLogo,
    alt: 'Website & Conversion Content logo',
  },
  'content-strategy': {
    src: contentStrategyLogo,
    alt: 'Content Strategy & Management logo',
  },
  'social-thought-leadership': {
    src: thoughtLeadershipLogo,
    alt: 'Social & Thought Leadership logo',
  },
};

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section className="w-full px-5 md:px-10 lg:px-16 py-20 lg:py-28 bg-[#fbf9f6]" id="services">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-12 lg:gap-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#546252] font-semibold">
              Core Practice
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1b1c1a] font-medium tracking-tight mt-2">
              What I Can Help You With
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#55433c] max-w-md leading-relaxed">
            Structured interventions designed for authoritative growth, brand credibility, and search intent alignment.
          </p>
        </div>

        {/* 5 Distinct Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const isLastOnDesktop = index === 4;
            const logo = SERVICE_LOGOS[service.id];
            return (
              <div
                key={service.id}
                onClick={() => onSelectService(service)}
                className={`bg-white p-7 rounded-xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group border border-[#eae8e5] cursor-pointer hover:border-[#dbc1b8] ${
                  isLastOnDesktop ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-5">
                    {logo ? (
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#fbf9f6] border border-[#e4e2df] shadow-2xs overflow-hidden flex items-center justify-center shrink-0">
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-[#efeeeb] flex items-center justify-center text-[#994524] group-hover:bg-[#ffdbcf] transition-colors">
                        <span className="material-symbols-outlined text-3xl">{service.icon}</span>
                      </div>
                    )}
                    <span className="text-xs uppercase text-[#546252] font-semibold tracking-wider pt-1">
                      {service.number}. {service.phase}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-[#1b1c1a] mb-3 group-hover:text-[#994524] transition-colors font-medium">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#55433c] leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#efeeeb]/70 flex items-center justify-between text-[#994524] text-xs font-semibold tracking-wide">
                  <span className="inline-flex items-center group-hover:translate-x-1 transition-transform">
                    Learn more
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
