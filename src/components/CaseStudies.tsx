import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/portfolioData';

interface CaseStudiesProps {
  onNavigate?: (path: string, sectionId?: string) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onNavigate }) => {
  const [expandedId, setExpandedId] = useState<string | null>(CASE_STUDIES[0].id);

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
      id="case-studies"
      className="w-full px-5 md:px-10 lg:px-16 py-20 lg:py-28 bg-[#fbf9f6] border-t border-[#e4e2df]"
      aria-labelledby="case-studies-heading"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#994524] font-semibold">
              Real-World Execution &amp; Methodology
            </span>
            <h2
              id="case-studies-heading"
              className="font-serif text-3xl md:text-4xl text-[#1b1c1a] font-medium tracking-tight mt-2"
            >
              SEO, Content Strategy &amp; B2B Research Case Studies
            </h2>
            <p className="text-base text-[#55433c] mt-3 leading-relaxed">
              Structured breakdowns of real projects across Quora content strategy, B2B content workflows, website conversion copywriting, AI concept translation, and competitive intelligence.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            <a
              href="/seo-content"
              onClick={(e) => handleInternalLink(e, '/seo-content', 'seo-geo-expertise')}
              className="px-3.5 py-2 rounded-lg bg-[#efeeeb] hover:bg-[#eae8e5] text-[#1b1c1a] border border-[#e4e2df] transition-colors"
            >
              SEO &amp; GEO Approach
            </a>
            <a
              href="/services"
              onClick={(e) => handleInternalLink(e, '/services', 'services')}
              className="px-3.5 py-2 rounded-lg bg-[#efeeeb] hover:bg-[#eae8e5] text-[#1b1c1a] border border-[#e4e2df] transition-colors"
            >
              Explore Services
            </a>
            <a
              href="/contact"
              onClick={(e) => handleInternalLink(e, '/contact', 'contact')}
              className="px-4 py-2 rounded-lg bg-[#b85d3a] hover:bg-[#994524] text-white transition-colors"
            >
              Let's Talk
            </a>
          </div>
        </div>

        {/* Case Studies List */}
        <div className="flex flex-col gap-6">
          {CASE_STUDIES.map((cs, index) => {
            const isExpanded = expandedId === cs.id;
            return (
              <article
                key={cs.id}
                className="bg-white rounded-2xl border border-[#e4e2df] shadow-xs hover:border-[#dbc1b8] transition-all overflow-hidden"
              >
                {/* Card Header / Toggle */}
                <div className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#546252] font-semibold">
                      <span className="text-[#994524] uppercase tracking-wider">
                        Case Study 0{index + 1}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{cs.clientOrPlatform}</span>
                      <span aria-hidden="true">·</span>
                      <span>{cs.category}</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#1b1c1a] font-medium">
                      {cs.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#55433c] pt-1">
                      <span className="font-semibold text-[#1b1c1a]">Focus:</span>
                      {cs.focusAreas.map((focus, fIdx) => (
                        <React.Fragment key={focus}>
                          <span>{focus}</span>
                          {fIdx < cs.focusAreas.length - 1 && (
                            <span aria-hidden="true">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {cs.externalUrl && (
                      <a
                        href={cs.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-lg bg-[#fbf9f6] hover:bg-[#efeeeb] text-[#994524] border border-[#e4e2df] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                      >
                        <span>View Live Work</span>
                        <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : cs.id)}
                      aria-expanded={isExpanded}
                      className="px-4 py-2 rounded-lg bg-[#efeeeb] hover:bg-[#eae8e5] text-[#1b1c1a] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide Breakdown' : 'Read Full Case Study'}</span>
                      <span className="material-symbols-outlined text-[18px]">
                        {isExpanded ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Structured 6-Part Case Study Body: Problem, Research, Strategy, Execution, Outcome, Key Takeaways (Always in DOM for crawlability) */}
                <div
                  className={
                    isExpanded
                      ? 'px-6 sm:px-8 pb-8 pt-4 border-t border-[#efeeeb] bg-[#fbf9f6]/60'
                      : 'sr-only'
                  }
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div className="bg-white p-5 rounded-xl border border-[#e4e2df]">
                      <h4 className="text-xs uppercase tracking-wider font-bold text-[#994524] mb-2">
                        1. Problem
                      </h4>
                      <p className="text-sm text-[#55433c] leading-relaxed">
                        {cs.problem}
                      </p>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-[#e4e2df]">
                      <h4 className="text-xs uppercase tracking-wider font-bold text-[#994524] mb-2">
                        2. Research
                      </h4>
                      <p className="text-sm text-[#55433c] leading-relaxed">
                        {cs.research}
                      </p>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-[#e4e2df]">
                      <h4 className="text-xs uppercase tracking-wider font-bold text-[#994524] mb-2">
                        3. Strategy
                      </h4>
                      <p className="text-sm text-[#55433c] leading-relaxed">
                        {cs.strategy}
                      </p>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-[#e4e2df]">
                      <h4 className="text-xs uppercase tracking-wider font-bold text-[#994524] mb-2">
                        4. Execution
                      </h4>
                      <p className="text-sm text-[#55433c] leading-relaxed">
                        {cs.execution}
                      </p>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-[#dbc1b8]">
                      <h4 className="text-xs uppercase tracking-wider font-bold text-[#994524] mb-2">
                        5. Outcome
                      </h4>
                      <p className="text-sm text-[#1b1c1a] font-medium leading-relaxed">
                        {cs.outcome}
                      </p>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-[#e4e2df]">
                      <h4 className="text-xs uppercase tracking-wider font-bold text-[#994524] mb-2">
                        6. Key Takeaways
                      </h4>
                      <ul className="space-y-1.5 text-xs text-[#55433c] leading-relaxed">
                        {cs.keyTakeaways.map((takeaway, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2">
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-[#994524] shrink-0 mt-1.5"
                              aria-hidden="true"
                            />
                            <span>{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
