import React, { useState, useMemo } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { SITE_CONFIG } from '../config/siteConfig';
import { ProjectItem, PortfolioCategory } from '../types';
import { PortfolioFilter } from './PortfolioFilter';
import { PortfolioCard } from './PortfolioCard';
import { useFirebase } from '../context/FirebaseContext';

const WMS_STAT_CARDS = [
  {
    value: '$2.8B – $3.1B',
    label: 'Global Market Size (2020–2022)',
    sublabel: 'Steady expansion from 2014 baseline',
  },
  {
    value: '~15.2% – 16.1%',
    label: 'Compound Annual Growth Rate',
    sublabel: 'High-velocity multi-year CAGR',
  },
  {
    value: 'Cloud / SaaS',
    label: 'Fastest-Growing Deployment',
    sublabel: 'Outpacing traditional on-premise installs',
  },
  {
    value: 'North America & APAC',
    label: 'Regional Market Leaders',
    sublabel: 'NA largest share · APAC fastest growth',
  },
];

const WMS_GROWTH_CHART = [
  { year: '2014', valueLabel: '$1.1B', heightPct: 35 },
  { year: '2016', valueLabel: '$1.4B', heightPct: 45 },
  { year: '2018', valueLabel: '$1.9B', heightPct: 61 },
  { year: '2020', valueLabel: '$2.5B', heightPct: 80 },
  { year: '2022', valueLabel: '$3.1B', heightPct: 100 },
];

const WMS_KEY_TAKEAWAYS = [
  'Warehouse Management Systems (WMS) serve as the operational backbone of modern supply chains—automating inventory visibility, receiving, put-away, picking, labor allocation, and shipping accuracy.',
  'Between 2014 and 2022, global WMS demand accelerated at a ~15%+ CAGR, crossing the $2.8B–$3.1B mark as omnichannel retail and e-commerce order volumes surged.',
  'Cloud-based (SaaS) WMS deployments became the primary growth engine, enabling small and mid-sized enterprises to adopt tier-one fulfillment capabilities with lower upfront capital expenditure.',
  'North America maintained the largest market share due to mature logistics infrastructure, while Asia-Pacific recorded the fastest regional CAGR driven by manufacturing and cross-border e-commerce.',
  'Integration with IoT sensors, barcode/RFID tracking, AI-driven demand forecasting, and autonomous mobile robots (AMRs) is redefining warehouse throughput and resilience.',
];

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
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
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

        {/* Featured Market Research Spotlight: Global Warehouse Management Systems (WMS) */}
        <div
          id="warehouse-management-systems"
          aria-labelledby="wms-spotlight-heading"
          className="mt-4 bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#e4e2df] shadow-xs flex flex-col gap-7"
        >
          {/* Header + Read the Full Report CTA */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-6 border-b border-[#efeeeb]">
            <div className="max-w-3xl flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-[#994524] font-semibold">
                Supply Chain &amp; Logistics Market Intelligence (2014–2022)
              </span>
              <h3
                id="wms-spotlight-heading"
                className="font-serif text-2xl sm:text-3xl text-[#1b1c1a] font-medium tracking-tight"
              >
                Global Warehouse Management Systems (WMS)
              </h3>
              <p className="text-sm sm:text-base text-[#55433c] leading-relaxed">
                A Warehouse Management System (WMS) is specialized supply-chain software that orchestrates day-to-day warehouse operations—from inventory receiving and optimal put-away to order picking, packing, labor allocation, and shipping. It matters because modern omnichannel fulfillment demands real-time inventory accuracy, faster dock-to-stock cycles, and minimal order errors across distributed distribution centers.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href={SITE_CONFIG.PORTFOLIO_LINKS.GLOBAL_WMS_REPORT}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-[#994524] hover:bg-[#7b2f0f] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs inline-flex items-center gap-2"
              >
                <span>Read the Full Report</span>
                <span className="material-symbols-outlined text-[17px]" aria-hidden="true">
                  open_in_new
                </span>
              </a>
            </div>
          </div>

          {/* Main Figures: 4 Compact Stat Cards + Trajectory Bar Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            <div className="lg:col-span-7 grid grid-cols-2 gap-3.5">
              {WMS_STAT_CARDS.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#fbf9f6] rounded-xl p-4 border border-[#e4e2df] flex flex-col justify-between"
                >
                  <span className="font-serif text-xl sm:text-2xl text-[#994524] font-medium leading-tight">
                    {stat.value}
                  </span>
                  <div className="mt-2">
                    <span className="text-xs font-semibold text-[#1b1c1a] block">
                      {stat.label}
                    </span>
                    <span className="text-[11px] text-[#546252] block mt-0.5">
                      {stat.sublabel}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Simple Visual Bar Chart (2014–2022 Market Expansion) */}
            <div className="lg:col-span-5 bg-[#fbf9f6] rounded-xl p-4 sm:p-5 border border-[#e4e2df] flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#1b1c1a]">
                  Global WMS Market Growth (2014–2022)
                </span>
                <span className="text-[11px] font-semibold text-[#994524]">
                  ~15%+ CAGR
                </span>
              </div>
              <div
                className="h-28 flex items-end justify-between gap-3 pt-4 px-2 border-b border-[#e4e2df]"
                role="img"
                aria-label="Bar chart showing Global WMS market growth from approximately 1.1 billion USD in 2014 to 3.1 billion USD in 2022"
              >
                {WMS_GROWTH_CHART.map((bar) => (
                  <div
                    key={bar.year}
                    className="flex-1 flex flex-col items-center justify-end h-full gap-1"
                  >
                    <span className="text-[10px] font-semibold text-[#994524]">
                      {bar.valueLabel}
                    </span>
                    <div
                      className="w-full max-w-[36px] rounded-t-md bg-[#994524]/85 hover:bg-[#994524] transition-all"
                      style={{ height: `${bar.heightPct}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between gap-3 pt-1.5 px-2">
                {WMS_GROWTH_CHART.map((bar) => (
                  <span
                    key={bar.year}
                    className="flex-1 text-center text-[10px] font-medium text-[#546252]"
                  >
                    {bar.year}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 4 Structured Analysis Blocks: Market Size & Trends, Key Segments, Regions & Companies, Drivers & Challenges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. Market Size, Growth & Trends */}
            <div className="bg-[#fbf9f6] rounded-xl p-5 border border-[#e4e2df]">
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#994524] mb-2">
                Market Size, Growth &amp; Trends
              </h4>
              <p className="text-sm text-[#55433c] leading-relaxed">
                Between 2014 and 2022, the global WMS market grew steadily to reach roughly USD 2.8B–3.1B, expanding at an estimated 15%–16% compound annual rate. Key trends shaping the sector include the rapid shift toward multi-tenant Cloud/SaaS architectures, real-time IoT and RFID tracking, AI-assisted slotting and wave planning, and seamless integration with ERP, Transportation Management Systems (TMS), and warehouse robotics.
              </p>
            </div>

            {/* 2. Key Market Segments */}
            <div className="bg-[#fbf9f6] rounded-xl p-5 border border-[#e4e2df]">
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#994524] mb-2">
                Key Market Segments
              </h4>
              <ul className="space-y-1.5 text-sm text-[#55433c] leading-relaxed">
                <li>
                  <strong className="text-[#1b1c1a]">By Component:</strong> Software (core inventory, labor, and yard modules) and Services (consulting, system integration, maintenance, and training).
                </li>
                <li>
                  <strong className="text-[#1b1c1a]">By Deployment Type:</strong> Cloud / SaaS (fastest-growing due to scalability and lower upfront cost) and On-Premise (favored by large enterprises requiring custom data control).
                </li>
                <li>
                  <strong className="text-[#1b1c1a]">By Industry Vertical:</strong> Third-Party Logistics (3PL), Retail &amp; E-Commerce, Manufacturing, Food &amp; Beverage, Healthcare &amp; Pharmaceuticals, and Automotive.
                </li>
              </ul>
            </div>

            {/* 3. Major Regions & Leading Companies */}
            <div className="bg-[#fbf9f6] rounded-xl p-5 border border-[#e4e2df]">
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#994524] mb-2">
                Major Regions &amp; Leading Companies
              </h4>
              <p className="text-sm text-[#55433c] leading-relaxed mb-2">
                <strong className="text-[#1b1c1a]">Regional Landscape:</strong> North America commands the largest revenue share, supported by early cloud adoption and dense 3PL networks, followed by Europe. Asia-Pacific (China, India, Japan, Southeast Asia) is the fastest-growing region alongside emerging LAMEA hubs.
              </p>
              <p className="text-sm text-[#55433c] leading-relaxed">
                <strong className="text-[#1b1c1a]">Leading Vendors:</strong> Manhattan Associates, Blue Yonder (formerly JDA Software), SAP SE, Oracle Corporation, Körber AG (HighJump), Infor, Tecsys, Softeon, Made4net, PSI Logistics, and Reply.
              </p>
            </div>

            {/* 4. Key Drivers & Challenges */}
            <div className="bg-[#fbf9f6] rounded-xl p-5 border border-[#e4e2df]">
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#994524] mb-2">
                Key Drivers &amp; Challenges
              </h4>
              <p className="text-sm text-[#55433c] leading-relaxed mb-2">
                <strong className="text-[#1b1c1a]">Growth Drivers:</strong> Booming e-commerce fulfillment, rising SKU complexity, omnichannel same-day/next-day delivery expectations, warehouse labor shortages, and globalization of multi-tier supply chains.
              </p>
              <p className="text-sm text-[#55433c] leading-relaxed">
                <strong className="text-[#1b1c1a]">Core Challenges:</strong> High initial licensing and hardware integration costs for on-premise setups, complex data migration from legacy ERP systems, cybersecurity and data-privacy concerns, and a shortage of skilled supply-chain IT specialists.
              </p>
            </div>
          </div>

          {/* Short Key Takeaways List + Bottom CTA */}
          <div className="bg-[#fbf9f6] rounded-xl p-5 sm:p-6 border border-[#dbc1b8] flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#994524]">
              Key Takeaways
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-[#55433c] leading-relaxed">
              {WMS_KEY_TAKEAWAYS.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#994524] shrink-0 mt-2"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2 border-t border-[#e4e2df] flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-[#546252]">
                Source: Sample Global Warehouse Management Systems (2014–2022) Market Report
              </span>
              <a
                href={SITE_CONFIG.PORTFOLIO_LINKS.GLOBAL_WMS_REPORT}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#994524] hover:underline"
              >
                <span>Read the Full Report</span>
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  open_in_new
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
