import React from 'react';
import { EXPERIENCE_ITEMS } from '../data/portfolioData';

interface ExperienceProps {
  onNavigate?: (path: string, sectionId?: string) => void;
}

export const Experience: React.FC<ExperienceProps> = ({ onNavigate }) => {
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
      id="experience"
      className="w-full px-5 md:px-10 lg:px-16 py-20 lg:py-28 bg-[#fbf9f6] border-t border-[#e4e2df]"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col gap-12 lg:gap-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#994524] font-semibold">
              Career Progression • 9+ Years
            </span>
            <h2
              id="experience-heading"
              className="font-serif text-3xl md:text-4xl text-[#1b1c1a] font-medium tracking-tight mt-2"
            >
              Professional Experience Across Market Research, B2B Content &amp; SEO
            </h2>
            <p className="text-base text-[#55433c] mt-3 leading-relaxed">
              My career began in primary and secondary market research and evolved into B2B content writing, SEO content strategy, editorial operations, and AI-search optimization.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            <a
              href="/case-studies"
              onClick={(e) => handleInternalLink(e, '/case-studies', 'case-studies')}
              className="px-4 py-2.5 rounded-lg bg-[#efeeeb] hover:bg-[#eae8e5] text-[#1b1c1a] border border-[#e4e2df] transition-colors inline-flex items-center gap-1.5"
            >
              <span>View Case Studies</span>
              <span className="material-symbols-outlined text-[16px] text-[#994524]">arrow_forward</span>
            </a>
            <a
              href="/work"
              onClick={(e) => handleInternalLink(e, '/work', 'selected-work')}
              className="px-4 py-2.5 rounded-lg bg-[#efeeeb] hover:bg-[#eae8e5] text-[#1b1c1a] border border-[#e4e2df] transition-colors inline-flex items-center gap-1.5"
            >
              <span>Selected Portfolio</span>
              <span className="material-symbols-outlined text-[16px] text-[#994524]">arrow_forward</span>
            </a>
            <a
              href="/contact"
              onClick={(e) => handleInternalLink(e, '/contact', 'contact')}
              className="px-4 py-2.5 rounded-lg bg-[#b85d3a] hover:bg-[#994524] text-white transition-colors inline-flex items-center gap-1.5"
            >
              <span>Work With Me</span>
            </a>
          </div>
        </div>

        {/* Experience Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {EXPERIENCE_ITEMS.map((item, idx) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e4e2df] shadow-xs hover:shadow-md hover:border-[#dbc1b8] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 sm:gap-4 pb-4 border-b border-[#efeeeb]">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#994524] font-semibold block">
                      0{idx + 1}. {item.organization}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#1b1c1a] font-medium mt-1">
                      {item.role}
                    </h3>
                  </div>
                  {item.period && (
                    <span className="text-xs text-[#546252] font-medium sm:whitespace-nowrap sm:pt-1">
                      {item.period}
                    </span>
                  )}
                </div>

                <p className="text-sm text-[#55433c] leading-relaxed mt-4 mb-4 font-medium">
                  {item.focusSummary}
                </p>

                <ul className="space-y-2 text-sm text-[#55433c]">
                  {item.highlights.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 leading-relaxed">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-[#994524] shrink-0 mt-2"
                        aria-hidden="true"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {item.domains && item.domains.length > 0 && (
                <div className="mt-6 pt-4 border-t border-[#efeeeb] flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#546252]">
                  <span className="font-semibold text-[#1b1c1a]">Core Focus:</span>
                  {item.domains.map((domain, dIdx) => (
                    <React.Fragment key={domain}>
                      <span>{domain}</span>
                      {dIdx < item.domains!.length - 1 && (
                        <span aria-hidden="true">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
