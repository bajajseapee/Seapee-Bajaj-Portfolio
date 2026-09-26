import React, { useEffect } from 'react';
import { SITE_CONFIG, buildGmailComposeUrl } from '../config/siteConfig';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  onContactClick,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl border border-[#e4e2df] p-6 sm:p-8 flex flex-col gap-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-[#efeeeb] transition-colors"
          aria-label="Close dialog"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Header */}
        <div className="border-b border-[#efeeeb] pb-4">
          <span className="text-xs uppercase tracking-widest text-[#994524] font-semibold">
            Executive Curriculum Vitae
          </span>
          <h2 id="resume-title" className="font-serif text-2xl sm:text-3xl text-[#1b1c1a] font-medium mt-1">
            {SITE_CONFIG.NAME}
          </h2>
          <p className="text-xs sm:text-sm text-[#546252] mt-0.5">
            {SITE_CONFIG.POSITIONING} · {SITE_CONFIG.LOCATION}
          </p>
        </div>

        {/* Summary */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1b1c1a] mb-2">
            Professional Profile
          </h3>
          <p className="text-sm text-[#55433c] leading-relaxed">
            Editorial and SEO strategist with 9+ years of experience combining deep research rigor with reader-first narrative writing. Proven record delivering compound organic visibility, C-level B2B thought leadership, and authoritative market intelligence across technology, finance, and industrial sectors.
          </p>
        </div>

        {/* Core Competencies */}
        <div className="border-t border-[#efeeeb] pt-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1b1c1a] mb-3">
            Core Competencies &amp; Domains
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#55433c]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#994524]" />
              <span>SEO Content Architecture &amp; Topic Clusters</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#994524]" />
              <span>B2B Market Research &amp; Whitepapers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#994524]" />
              <span>Editorial Calendar Governance</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#994524]" />
              <span>Website &amp; Conversion Copywriting</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#994524]" />
              <span>Subject Matter Expert (SME) Synthesis</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#994524]" />
              <span>On-Page Technical SEO &amp; Schema</span>
            </div>
          </div>
        </div>

        {/* Awards & Achievements Section */}
        <div className="border-t border-[#efeeeb] pt-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#994524] mb-3 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">emoji_events</span>
            <span>Key Achievements &amp; Awards</span>
          </h3>
          <div className="space-y-3 text-xs">
            <div className="bg-[#fbf9f6] p-3 rounded-lg border border-[#e4e2df]">
              <div className="flex justify-between items-baseline font-semibold text-[#1b1c1a]">
                <span>Best Content Writer Award — Grand View Research</span>
                <span className="text-[#994524] font-medium">Jan 2022</span>
              </div>
              <p className="text-[#55433c] mt-0.5">
                Conferred the award for exceptional editorial rigor, high-performing search content pieces, and associate mentorship.
              </p>
            </div>
            <div className="bg-[#fbf9f6] p-3 rounded-lg border border-[#e4e2df]">
              <div className="flex justify-between items-baseline font-semibold text-[#1b1c1a]">
                <span>Client Commendation — PwC (PricewaterhouseCoopers)</span>
                <span className="text-[#994524] font-medium">Enterprise Recognition</span>
              </div>
              <p className="text-[#55433c] mt-0.5">
                Received positive client feedback for exceptional content quality, in-depth research, and timely delivery on a high-impact project.
              </p>
            </div>
            <div className="bg-[#fbf9f6] p-3 rounded-lg border border-[#e4e2df]">
              <div className="flex justify-between items-baseline font-semibold text-[#1b1c1a]">
                <span>Recognition Badge (Get Involved Reward) — My Need To Live, UK</span>
                <span className="text-[#994524] font-medium">Apr 2020</span>
              </div>
              <p className="text-[#55433c] mt-0.5">
                International recognition for research and content creation around mental endurance and human potential.
              </p>
            </div>
            <div className="bg-[#fbf9f6] p-3 rounded-lg border border-[#e4e2df]">
              <div className="flex justify-between items-baseline font-semibold text-[#1b1c1a]">
                <span>Academic Conference Publications — ASM INCON XIII</span>
                <span className="text-[#546252] font-medium">E-ISSN: 2320-0065</span>
              </div>
              <p className="text-[#55433c] mt-0.5">
                Selection and publication of two research papers: <em>A Study of Consumer Behavior and its Impact on Marketing</em> &amp; <em>A Study of E-business Threats</em>.
              </p>
            </div>
          </div>
        </div>

        {/* Experience Snapshot */}
        <div className="border-t border-[#efeeeb] pt-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1b1c1a] mb-3">
            Career Chronology (9+ Years)
          </h3>
          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between items-baseline font-semibold text-[#1b1c1a]">
                <span>Assistant Manager — Imarc Group</span>
                <span className="text-[#546252] font-normal">Aug 2024 – Nov 2025</span>
              </div>
              <p className="text-[#55433c] mt-1">
                Drove end-to-end B2B content strategy and execution, managing editorial calendars, establishing scalable content workflows, and conducting SEO audits.
              </p>
            </div>
            <div>
              <div className="flex justify-between items-baseline font-semibold text-[#1b1c1a]">
                <span>Sr. Executive - Content Management — Grand View Research</span>
                <span className="text-[#546252] font-normal">Jun 2021 – Aug 2024</span>
              </div>
              <p className="text-[#55433c] mt-1">
                Authored high-performing blogs, articles, and FAQs; mentored associates in content writing and SEO optimization; led cross-functional content enhancement.
              </p>
            </div>
            <div>
              <div className="flex justify-between items-baseline font-semibold text-[#1b1c1a]">
                <span>Research Analyst &amp; Sr. Research Analyst — The Insight Partners</span>
                <span className="text-[#546252] font-normal">Sep 2018 – Jan 2021</span>
              </div>
              <p className="text-[#55433c] mt-1">
                Handled bespoke client requirements, market estimations (ME), pre- and post-sales technical queries, and training teams for research reports.
              </p>
            </div>
            <div>
              <div className="flex justify-between items-baseline font-semibold text-[#1b1c1a]">
                <span>Research Associate &amp; Sr. Research Associate — Allied Market Research</span>
                <span className="text-[#546252] font-normal">Jan 2016 – Jul 2018</span>
              </div>
              <p className="text-[#55433c] mt-1">
                Curated comprehensive market reports across ICT, Semiconductor, and Automotive verticals; conducted primary and secondary research.
              </p>
            </div>
            <div>
              <div className="flex justify-between items-baseline font-semibold text-[#1b1c1a]">
                <span>Published Author — Notion Press</span>
                <span className="text-[#546252] font-normal">Dec 2020</span>
              </div>
              <p className="text-[#55433c] mt-1">
                Authored and published <em>Not Unworthy</em>, an original poetry collection examining resilience, everyday courage, and human potential.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#efeeeb]">
          <a
            href={buildGmailComposeUrl('Resume Request - Seapee Bajaj')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#994524] hover:underline inline-flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">mail</span>
            Request Full PDF via Gmail
          </a>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs text-[#55433c] hover:bg-[#efeeeb] rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onContactClick();
              }}
              className="px-5 py-2 text-xs font-semibold text-white bg-[#b85d3a] hover:bg-[#994524] rounded-lg transition-colors"
            >
              Contact Seapee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
