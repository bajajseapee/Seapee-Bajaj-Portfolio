import React from 'react';
import { SEO_GEO_PILLARS } from '../data/portfolioData';
import { PortfolioIcon } from './PortfolioIcon';

interface SeoGeoExpertiseProps {
  onNavigate?: (path: string, sectionId?: string) => void;
}

export const SeoGeoExpertise: React.FC<SeoGeoExpertiseProps> = ({ onNavigate }) => {
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
    <section
      id="seo-geo-expertise"
      className="w-full px-5 md:px-10 lg:px-16 py-20 lg:py-28 bg-[#f5f3f0] border-t border-[#e4e2df]"
      aria-labelledby="seo-geo-heading"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#994524] font-semibold">
              Traditional &amp; AI-Driven Search
            </span>
            <h2
              id="seo-geo-heading"
              className="font-serif text-3xl md:text-4xl text-[#1b1c1a] font-medium tracking-tight mt-2"
            >
              SEO, GEO &amp; AEO: Structuring Content for Modern Search Discovery
            </h2>
            <p className="text-base text-[#55433c] mt-3 leading-relaxed">
              Search behaviour now spans traditional search engines, AI Overviews, and conversational AI platforms such as ChatGPT, Perplexity, and Gemini. My work focuses on the fundamentals that help content perform across all of them: credible research, clear search intent alignment, strong structure, and human-quality writing.
            </p>
            <p className="text-xs sm:text-sm text-[#546252] mt-2 leading-relaxed">
              My approach combines 9+ years of professional experience in market research, B2B content, and on-page SEO with structured information architecture, direct answers, factual accuracy, contextual depth, and dedicated professional training in Generative Engine Optimization (<em>Introduction to Generative Engine Optimization</em>, Coursera, September 28, 2026).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            <a
              href="/case-studies"
              onClick={(e) => handleInternalLink(e, '/case-studies', 'case-studies')}
              className="px-3.5 py-2 rounded-lg bg-white hover:bg-[#efeeeb] text-[#1b1c1a] border border-[#e4e2df] transition-colors"
            >
              SEO Case Studies
            </a>
            <a
              href="/b2b-content"
              onClick={(e) => handleInternalLink(e, '/b2b-content', 'services')}
              className="px-3.5 py-2 rounded-lg bg-white hover:bg-[#efeeeb] text-[#1b1c1a] border border-[#e4e2df] transition-colors"
            >
              B2B Content
            </a>
            <a
              href="/contact"
              onClick={(e) => handleInternalLink(e, '/contact', 'contact')}
              className="px-4 py-2 rounded-lg bg-[#b85d3a] hover:bg-[#994524] text-white transition-colors"
            >
              Discuss Your Strategy
            </a>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SEO_GEO_PILLARS.map((pillar) => (
            <article
              key={pillar.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e4e2df] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#994524]">
                    {pillar.code}. {pillar.subtitle}
                  </span>
                </div>
                <p className="font-serif text-xl sm:text-2xl text-[#1b1c1a] font-medium mb-3">
                  {pillar.title}
                </p>
                <p className="text-sm text-[#55433c] leading-relaxed mb-5">
                  {pillar.description}
                </p>

                <ul className="space-y-2 border-t border-[#efeeeb] pt-4 text-xs sm:text-sm text-[#55433c]">
                  {pillar.practices.map((practice, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 leading-relaxed">
                      <PortfolioIcon name="check_circle" className="w-4 h-4 text-[#994524] shrink-0 mt-0.5" />
                      <span>{practice}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* Core Capabilities Summary Strip */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e4e2df] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <h3 className="font-serif text-xl text-[#1b1c1a] font-medium mb-2">
              Practical, Reader-First Search Optimization
            </h3>
            <p className="text-xs sm:text-sm text-[#55433c] leading-relaxed">
              No ethical SEO or GEO practitioner can guarantee specific Google rankings or guaranteed inclusion in AI Overviews, ChatGPT, Perplexity, or Gemini. Instead, I focus on what genuinely improves long-term visibility: thorough keyword and intent research, E-E-A-T credibility, clean on-page architecture (title tags, meta descriptions, headings, internal links, and image optimization), structured data, and human-edited, research-driven content.
            </p>
          </div>
          <a
            href="/contact"
            onClick={(e) => handleInternalLink(e, '/contact', 'contact')}
            className="px-5 py-3 rounded-lg bg-[#994524] hover:bg-[#7b2f0f] text-white text-xs sm:text-sm font-semibold transition-colors shrink-0 w-fit"
          >
            Work With Me on SEO &amp; GEO
          </a>
        </div>
      </div>
    </section>
  );
};
