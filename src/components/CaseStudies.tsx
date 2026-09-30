import React, { useState, useMemo } from 'react';
import { CASE_STUDIES } from '../data/portfolioData';
import { SECTION_BODY_COPY_CLASS } from './About';

interface CaseStudiesProps {
  onNavigate?: (path: string, sectionId?: string) => void;
}

const CASE_STUDY_QUICK_FILTERS = [
  'All',
  'Quora & AEO',
  'B2B Content',
  'Conversion Copy',
  'AI & Technical',
  'Market Research',
] as const;

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onNavigate }) => {
  const [expandedId, setExpandedId] = useState<string | null>(CASE_STUDIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [showAllCaseStudies, setShowAllCaseStudies] = useState(false);

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

  const filteredCaseStudies = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return CASE_STUDIES.filter((cs) => {
      // Quick filter matching
      const matchesFilter =
        activeFilter === 'All' ||
        (activeFilter === 'Quora & AEO' &&
          (cs.clientOrPlatform.toLowerCase().includes('quora') ||
            cs.focusAreas.some((f) => f.toLowerCase().includes('aeo') || f.toLowerCase().includes('quora')))) ||
        (activeFilter === 'B2B Content' &&
          (cs.category.toLowerCase().includes('b2b') ||
            cs.clientOrPlatform.toLowerCase().includes('imarc'))) ||
        (activeFilter === 'Conversion Copy' &&
          (cs.category.toLowerCase().includes('conversion') ||
            cs.clientOrPlatform.toLowerCase().includes('jones road'))) ||
        (activeFilter === 'AI & Technical' &&
          (cs.title.toLowerCase().includes('ai') ||
            cs.clientOrPlatform.toLowerCase().includes('fire ai'))) ||
        (activeFilter === 'Market Research' &&
          (cs.category.toLowerCase().includes('competitive') ||
            cs.category.toLowerCase().includes('market') ||
            cs.title.toLowerCase().includes('sorbitol')));

      if (!matchesFilter) return false;
      if (!query) return true;

      const searchableText = [
        cs.title,
        cs.clientOrPlatform,
        cs.category,
        ...cs.focusAreas,
        cs.problem,
        cs.research,
        cs.strategy,
        cs.execution,
        cs.outcome,
        ...cs.keyTakeaways,
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [searchQuery, activeFilter]);

  const isFiltering = searchQuery.trim() !== '' || activeFilter !== 'All';
  const visibleCaseStudies =
    showAllCaseStudies || isFiltering
      ? filteredCaseStudies
      : filteredCaseStudies.slice(0, 1);

  return (
    <section
      id="case-studies"
      className="w-full px-5 md:px-10 lg:px-16 py-12 lg:py-16 bg-[#fbf9f6] border-t border-[#e4e2df]"
      aria-labelledby="case-studies-heading"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col gap-8 lg:gap-10">
        {/* Section Header + Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
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
            <p className={`${SECTION_BODY_COPY_CLASS} mt-3`}>
              Structured breakdowns of real projects I led and executed across Quora content strategy, B2B content workflows, website conversion copywriting, AI concept translation, and competitive intelligence.
            </p>
            <div className="pt-3 flex flex-wrap items-center gap-3 text-xs font-semibold">
              <a
                href="/services"
                onClick={(e) => handleInternalLink(e, '/services', 'services')}
                className="px-3.5 py-2 rounded-lg bg-[#efeeeb] hover:bg-[#eae8e5] text-[#1b1c1a] border border-[#e4e2df] transition-colors"
              >
                Explore Services
              </a>
              <a
                href="/work"
                onClick={(e) => handleInternalLink(e, '/work', 'selected-work')}
                className="px-3.5 py-2 rounded-lg bg-[#efeeeb] hover:bg-[#eae8e5] text-[#1b1c1a] border border-[#e4e2df] transition-colors"
              >
                Browse Selected Work
              </a>
            </div>
          </div>

          {/* Client-Side Keyword Search Bar */}
          <div className="flex flex-col gap-2 w-full lg:w-80 shrink-0">
            <div className="relative w-full">
              <span
                className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#546252] text-[18px] pointer-events-none"
                aria-hidden="true"
              >
                search
              </span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setSearchQuery('');
                  }
                }}
                placeholder="Search case studies by keyword..."
                aria-label="Search case studies by keyword"
                className="w-full pl-10 pr-9 py-2.5 text-sm bg-white border border-[#e4e2df] rounded-lg focus:outline-none focus:border-[#994524] focus:ring-2 focus:ring-[#994524]/15 text-[#1b1c1a] placeholder:text-[#546252]/70 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#546252] hover:text-[#1b1c1a] text-xs p-1 rounded cursor-pointer"
                  aria-label="Clear case study search"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="flex items-center justify-between text-xs text-[#546252] px-0.5">
              <span aria-live="polite" className="tabular-nums">
                Showing {visibleCaseStudies.length} of {CASE_STUDIES.length} case studies
              </span>
              {isFiltering && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilter('All');
                  }}
                  className="text-[#994524] font-semibold hover:underline cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Topic Filter Tabs */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar"
          role="group"
          aria-label="Filter case studies by focus area"
        >
          {CASE_STUDY_QUICK_FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={isActive}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#994524] text-white shadow-2xs'
                    : 'bg-white text-[#55433c] hover:bg-[#efeeeb] hover:text-[#1b1c1a] border border-[#e4e2df]'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Case Studies List */}
        {filteredCaseStudies.length > 0 ? (
          <div id="case-studies-list" className="flex flex-col gap-6">
            {visibleCaseStudies.map((cs) => {
              const originalIndex = CASE_STUDIES.findIndex((item) => item.id === cs.id);
              const isExpanded =
                expandedId === cs.id || (searchQuery.trim().length > 1 && filteredCaseStudies.length <= 2);

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
                          Case Study 0{originalIndex + 1}
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
                        <span>{cs.focusAreas.join(' · ')}</span>
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
                        onClick={() => setExpandedId(expandedId === cs.id ? null : cs.id)}
                        aria-expanded={isExpanded}
                        className="px-3.5 py-2 rounded-lg bg-[#efeeeb] hover:bg-[#eae8e5] text-[#1b1c1a] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>{isExpanded ? 'Hide Details' : 'Read Breakdown'}</span>
                        <span className="material-symbols-outlined text-[18px]">
                          {isExpanded ? 'expand_less' : 'expand_more'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Structured 6-Part Case Study Body: Challenge, Approach & Research, SEO / Content Strategy, Execution, Outcome, Key Takeaways (Always in DOM for crawlability) */}
                  <div
                    className={
                      isExpanded
                        ? 'px-6 sm:px-8 pb-8 pt-4 border-t border-[#efeeeb] bg-[#fbf9f6]/60'
                        : 'sr-only'
                    }
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      <div className="bg-white p-5 rounded-xl border border-[#e4e2df]">
                        <p className="text-xs uppercase tracking-wider font-bold text-[#994524] mb-2">
                          1. Challenge
                        </p>
                        <p className={SECTION_BODY_COPY_CLASS}>
                          {cs.problem}
                        </p>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-[#e4e2df]">
                        <p className="text-xs uppercase tracking-wider font-bold text-[#994524] mb-2">
                          2. Approach &amp; Research
                        </p>
                        <p className={SECTION_BODY_COPY_CLASS}>
                          {cs.research}
                        </p>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-[#e4e2df]">
                        <p className="text-xs uppercase tracking-wider font-bold text-[#994524] mb-2">
                          3. SEO / Content Strategy
                        </p>
                        <p className={SECTION_BODY_COPY_CLASS}>
                          {cs.strategy}
                        </p>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-[#e4e2df]">
                        <p className="text-xs uppercase tracking-wider font-bold text-[#994524] mb-2">
                          4. Execution
                        </p>
                        <p className={SECTION_BODY_COPY_CLASS}>
                          {cs.execution}
                        </p>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-[#dbc1b8]">
                        <p className="text-xs uppercase tracking-wider font-bold text-[#994524] mb-2">
                          5. Outcome
                        </p>
                        <p className={SECTION_BODY_COPY_CLASS}>
                          {cs.outcome}
                        </p>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-[#e4e2df]">
                        <p className="text-xs uppercase tracking-wider font-bold text-[#994524] mb-2">
                          6. Key Takeaways
                        </p>
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

            {!isFiltering && filteredCaseStudies.length > 1 && (
              <div className="flex justify-center pt-1">
                <button
                  type="button"
                  onClick={() => setShowAllCaseStudies((prev) => !prev)}
                  aria-expanded={showAllCaseStudies}
                  aria-controls="case-studies-list"
                  className="px-6 py-3 rounded-xl bg-white hover:bg-[#efeeeb] text-[#994524] border border-[#dbc1b8] text-xs sm:text-sm font-semibold transition-all shadow-2xs inline-flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#994524]"
                >
                  <span>
                    {showAllCaseStudies ? 'Show Less Case Studies' : 'View More Case Studies'}
                  </span>
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    {showAllCaseStudies ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Empty State when no case studies match search/filter */
          <div className="text-center py-14 bg-white rounded-2xl border border-dashed border-[#dbc1b8] p-8">
            <span className="material-symbols-outlined text-4xl text-[#546252] mb-2">
              find_in_page
            </span>
            <p className="text-base text-[#1b1c1a] font-serif font-medium">
              No matching case studies found
            </p>
            <p className="text-xs text-[#55433c] mt-1">
              Try searching for another keyword (e.g., Quora, IMARC, Sorbitol, AI, SEO) or reset the filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('All');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-[#b85d3a] text-white text-xs font-semibold hover:bg-[#994524] transition-colors cursor-pointer"
            >
              Reset Case Study Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
