import React, { useState, useMemo } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { ProjectItem, PortfolioCategory } from '../types';
import { PortfolioFilter } from './PortfolioFilter';
import { PortfolioCard } from './PortfolioCard';
import { useFirebase } from '../context/FirebaseContext';

interface PortfolioProps {
  onSelectProject: (project: ProjectItem) => void;
  activeCategory: PortfolioCategory;
  onSelectCategory: (category: PortfolioCategory) => void;
}

const CATEGORIES: PortfolioCategory[] = [
  'All',
  'SEO & Content',
  'B2B',
  'Research',
  'Technology',
  'Consumer Insights'
];

export const Portfolio: React.FC<PortfolioProps> = ({
  onSelectProject,
  activeCategory,
  onSelectCategory,
}) => {
  const { dynamicPortfolioItems } = useFirebase();
  const [searchQuery, setSearchQuery] = useState('');

  const allProjects = useMemo(() => {
    const dbProjects: ProjectItem[] = dynamicPortfolioItems
      .filter((item) => item.published)
      .map((item) => {
        const mappedCategory: ProjectItem['category'] =
          item.category === 'B2B' || item.category === 'Research' || item.category === 'SEO & Content'
            ? item.category
            : 'SEO & Content';
        return {
          id: item.id,
          category: mappedCategory,
          categories: [mappedCategory],
          tag: item.category,
          type: 'Published Case Study',
          title: item.title,
          description: item.summary,
          url: item.externalUrl || '#selected-work',
          readTime: item.impactMetric,
          deliverables: [item.category, 'Editorial Strategy', 'Search Optimization'],
          challenge: 'Addressing complex industry requirements with research-backed editorial clarity.',
          approach:
            'Conducted primary and secondary industry research, structured semantic hierarchy around buyer search intent, and delivered a publication-ready asset.',
          keyInsights: [item.impactMetric],
        };
      });
    return [...dbProjects, ...PROJECTS];
  }, [dynamicPortfolioItems]);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return allProjects.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' ||
        item.category === activeCategory ||
        item.categories.includes(activeCategory as any);

      if (!matchesCategory) return false;
      if (!query) return true;

      const searchableText = [
        item.title,
        item.tag,
        item.description,
        item.type,
        item.platform || '',
        item.year || '',
        ...(item.deliverables || []),
        item.challenge || '',
        item.approach || '',
        ...(item.keyInsights || []),
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [allProjects, activeCategory, searchQuery]);

  const isFiltering = searchQuery.trim() !== '' || activeCategory !== 'All';

  return (
    <section className="w-full px-5 md:px-10 lg:px-16 py-12 lg:py-16 bg-[#f5f3f0]" id="selected-work">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#546252] font-semibold">
              Folio Index
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1b1c1a] font-medium tracking-tight">
              Selected Work
            </h2>
            <p className="text-base text-[#55433c] leading-relaxed">
              A selection of published work across market research, business, consumer insights, technology, and content marketing.
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-[#994524]">
              <a
                href="/seo-geo"
                className="hover:underline inline-flex items-center gap-1"
              >
                <span>Explore SEO, GEO &amp; AEO Expertise</span>
                <span className="material-symbols-outlined text-[14px]" aria-hidden="true">arrow_forward</span>
              </a>
              <span className="text-[#d8d4ce]" aria-hidden="true">·</span>
              <a href="#case-studies" className="hover:underline inline-flex items-center gap-1">
                <span>Read Detailed Case Studies</span>
              </a>
            </div>
          </div>

          {/* Search Box */}
          <div className="flex flex-col gap-2 w-full md:w-80 shrink-0">
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
                placeholder="Search portfolio by keyword..."
                aria-label="Search published work by keyword"
                className="w-full pl-10 pr-9 py-2.5 text-sm bg-white border border-[#e4e2df] rounded-lg focus:outline-none focus:border-[#994524] focus:ring-2 focus:ring-[#994524]/15 text-[#1b1c1a] placeholder:text-[#546252]/70 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#546252] hover:text-[#1b1c1a] text-xs p-1 rounded cursor-pointer"
                  aria-label="Clear search query"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="flex items-center justify-between text-xs text-[#546252] px-0.5">
              <span aria-live="polite" className="tabular-nums">
                Showing {filteredProjects.length} of {allProjects.length} projects
              </span>
              {isFiltering && (
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory('All');
                    setSearchQuery('');
                  }}
                  className="text-[#994524] font-semibold hover:underline cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <PortfolioFilter
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={onSelectCategory}
        />

        {/* Dynamic Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="folio-grid">
          {filteredProjects.map((project) => (
            <PortfolioCard
              key={project.id}
              project={project}
              onOpenProject={onSelectProject}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-[#dbc1b8] p-8">
            <span className="material-symbols-outlined text-4xl text-[#546252] mb-2" aria-hidden="true">find_in_page</span>
            <p className="text-base text-[#1b1c1a] font-serif font-medium">No published work found</p>
            <p className="text-xs text-[#55433c] mt-1">Try resetting your filter or search query.</p>
            <button
              onClick={() => {
                onSelectCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-[#b85d3a] text-white text-xs font-semibold hover:bg-[#994524] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
