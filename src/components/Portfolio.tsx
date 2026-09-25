import React, { useState, useMemo } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { ProjectItem, PortfolioCategory } from '../types';
import { PortfolioFilter } from './PortfolioFilter';
import { PortfolioCard } from './PortfolioCard';

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
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' ||
        item.category === activeCategory ||
        item.categories.includes(activeCategory as any);

      const matchesSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="w-full px-5 md:px-10 lg:px-16 py-20 lg:py-28 bg-[#f5f3f0]" id="selected-work">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-10">
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
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search published work..."
              aria-label="Search published work"
              className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-[#e4e2df] rounded-lg focus:outline-none focus:border-[#994524] text-[#1b1c1a] placeholder:text-gray-400 transition-colors shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs p-1"
                aria-label="Clear search query"
              >
                ✕
              </button>
            )}
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
            <span className="material-symbols-outlined text-4xl text-[#546252] mb-2">find_in_page</span>
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
