import React from 'react';
import { PortfolioCategory } from '../types';

interface PortfolioFilterProps {
  categories: PortfolioCategory[];
  activeCategory: PortfolioCategory;
  onSelectCategory: (category: PortfolioCategory) => void;
}

export const PortfolioFilter: React.FC<PortfolioFilterProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Portfolio categories">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#994524] ${
              isActive
                ? 'bg-[#994524] text-white shadow-sm'
                : 'bg-[#fbf9f6] text-[#55433c] hover:bg-[#eae8e5] border border-[#e4e2df]'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};
