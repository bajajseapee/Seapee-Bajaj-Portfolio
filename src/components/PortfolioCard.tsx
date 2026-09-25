import React from 'react';
import { ProjectItem } from '../types';

interface PortfolioCardProps {
  project: ProjectItem;
  onOpenProject?: (project: ProjectItem) => void;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ project, onOpenProject }) => {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white p-6 rounded-xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between border border-[#e4e2df] hover:border-[#dbc1b8] group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#994524] relative"
      aria-label={`Open ${project.title} (opens in a new tab)`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="inline-block px-2.5 py-1 rounded bg-[#efeeeb] text-[#546252] text-[11px] font-semibold uppercase tracking-wider w-fit">
            {project.tag}
          </span>
          {onOpenProject && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpenProject(project);
              }}
              title="Inspect brief & insights"
              className="text-gray-400 hover:text-[#994524] p-1 rounded-md transition-colors"
              aria-label="Inspect project brief"
            >
              <span className="material-symbols-outlined text-[18px]">info</span>
            </button>
          )}
        </div>

        <h3 className="font-serif text-xl text-[#1b1c1a] mt-2 font-medium group-hover:text-[#994524] transition-colors line-clamp-2">
          {project.title}
        </h3>
        <p className="text-sm text-[#55433c] mt-1 leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-[#efeeeb] flex items-center justify-between">
        <span className="text-xs text-[#546252] font-medium">
          {project.type}
        </span>
        <span className="text-xs font-semibold text-[#994524] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
          View Work
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </span>
      </div>
    </a>
  );
};
