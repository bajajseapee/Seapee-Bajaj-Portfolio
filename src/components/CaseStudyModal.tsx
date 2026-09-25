import React, { useEffect } from 'react';
import { ProjectItem } from '../types';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onContactClick: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onContactClick,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl border border-[#e4e2df] p-6 sm:p-8 flex flex-col gap-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-[#efeeeb] transition-colors focus:outline-none"
          aria-label="Close dialog"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Header Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="px-2.5 py-1 rounded bg-[#efeeeb] text-[#546252] text-xs font-semibold uppercase tracking-wider">
            {project.tag}
          </span>
          <span className="text-xs text-[#546252]">·</span>
          <span className="text-xs text-[#546252] font-medium">{project.type}</span>
          {project.year && (
            <>
              <span className="text-xs text-[#546252]">·</span>
              <span className="text-xs text-[#546252]">{project.year}</span>
            </>
          )}
          {project.readTime && (
            <>
              <span className="text-xs text-[#546252]">·</span>
              <span className="text-xs text-[#546252]">{project.readTime}</span>
            </>
          )}
        </div>

        {/* Title & Description */}
        <div>
          <h2 id="case-study-title" className="font-serif text-2xl sm:text-3xl text-[#1b1c1a] font-medium leading-tight">
            {project.title}
          </h2>
          <p className="text-base text-[#55433c] mt-3 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Sample Excerpt / Quote */}
        {project.sampleExcerpt && (
          <div className="bg-[#fbf9f6] border-l-2 border-[#994524] p-4 rounded-r-lg">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#994524] block mb-1">
              Sample Excerpt
            </span>
            <p className="font-serif text-base text-[#1b1c1a] italic leading-relaxed">
              "{project.sampleExcerpt}"
            </p>
          </div>
        )}

        {/* Editorial Challenge & Approach */}
        {project.challenge && (
          <div className="flex flex-col gap-4 text-sm text-[#55433c] leading-relaxed border-t border-[#efeeeb] pt-4">
            <div>
              <h3 className="font-semibold text-[#1b1c1a] text-xs uppercase tracking-wider mb-1">
                Context &amp; Editorial Challenge
              </h3>
              <p>{project.challenge}</p>
            </div>
            {project.approach && (
              <div>
                <h3 className="font-semibold text-[#1b1c1a] text-xs uppercase tracking-wider mb-1">
                  Strategic Editorial Approach
                </h3>
                <p>{project.approach}</p>
              </div>
            )}
          </div>
        )}

        {/* Key Findings / Takeaways */}
        {project.keyInsights && project.keyInsights.length > 0 && (
          <div className="border-t border-[#efeeeb] pt-4">
            <h3 className="font-semibold text-[#1b1c1a] text-xs uppercase tracking-wider mb-2">
              Key Insights &amp; Takeaways
            </h3>
            <ul className="space-y-1.5 text-sm text-[#55433c]">
              {project.keyInsights.map((insight, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#994524] font-bold text-xs mt-0.5">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Deliverables */}
        {project.deliverables && (
          <div className="border-t border-[#efeeeb] pt-4">
            <h3 className="font-semibold text-[#1b1c1a] text-xs uppercase tracking-wider mb-2">
              Deliverables &amp; Format
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.deliverables.map((item, idx) => (
                <span key={idx} className="px-3 py-1 bg-[#f5f3f0] text-[#55433c] text-xs rounded-md">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#efeeeb]">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#994524] hover:underline"
          >
            Open Publication / Link
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </a>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-[#55433c] hover:bg-[#efeeeb] rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onContactClick();
              }}
              className="px-4 py-2 text-sm font-semibold text-white bg-[#b85d3a] hover:bg-[#994524] rounded-lg shadow-sm transition-colors"
            >
              Inquire About Similar Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
