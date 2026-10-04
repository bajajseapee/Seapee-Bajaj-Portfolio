import React, { useEffect } from 'react';
import { buildGmailComposeUrl } from '../config/siteConfig';
import { RESUME_DATA, triggerResumePrint } from './ResumeSection';

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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto custom-scrollbar shadow-2xl border border-[#e4e2df] p-6 sm:p-10 flex flex-col gap-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-[#efeeeb] transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">close</span>
        </button>

        {/* Header */}
        <div className="border-b-2 border-[#1b1c1a] pb-4 text-center">
          <span className="text-[11px] uppercase tracking-widest text-[#994524] font-semibold block mb-1">
            Official Curriculum Vitae
          </span>
          <h2 id="resume-title" className="font-serif text-2xl sm:text-3xl text-[#1b1c1a] font-semibold">
            {RESUME_DATA.name}
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-[#994524] mt-1">
            {RESUME_DATA.headline}
          </p>
          <p className="text-xs text-[#55433c] mt-1">
            {RESUME_DATA.location} | {RESUME_DATA.phone} | {RESUME_DATA.email}
          </p>
          <p className="text-xs text-[#546252] mt-0.5">
            {RESUME_DATA.linkedinDisplay} | {RESUME_DATA.portfolioDisplay}
          </p>
          <p className="text-[11px] italic text-[#546252] mt-0.5">
            {RESUME_DATA.googleCallout}
          </p>
        </div>

        {/* Professional Summary */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#994524] border-b border-[#efeeeb] pb-1.5 mb-2">
            Professional Summary
          </h3>
          <p className="text-xs sm:text-sm text-[#1b1c1a] leading-relaxed">
            {RESUME_DATA.summary}
          </p>
        </div>

        {/* Core Skills */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#994524] border-b border-[#efeeeb] pb-1.5 mb-2.5">
            Core Skills
          </h3>
          <p className="text-xs text-[#1b1c1a] leading-relaxed mb-3">
            {RESUME_DATA.coreSkills.join(' | ')}
          </p>
          <div className="bg-[#fbf9f6] p-3.5 rounded-xl border border-[#e4e2df] space-y-1.5 text-xs">
            {RESUME_DATA.toolCategories.map((cat) => (
              <div key={cat.label}>
                <strong className="text-[#1b1c1a]">{cat.label}:</strong>{' '}
                <span className="text-[#55433c]">{cat.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Experience */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#994524] border-b border-[#efeeeb] pb-1.5 mb-3">
            Professional Experience
          </h3>
          <div className="space-y-5 text-xs sm:text-sm">
            {RESUME_DATA.experience.map((exp) => (
              <div key={`${exp.company}-${exp.role}`}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline font-bold text-[#1b1c1a]">
                  <span>{exp.role}</span>
                  <span className="text-xs text-[#546252] font-semibold">{exp.period}</span>
                </div>
                <p className="text-xs italic text-[#994524] font-medium mb-1.5">
                  {exp.company} | {exp.meta}
                </p>
                <ul className="space-y-1 text-xs text-[#55433c]">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#994524] shrink-0 mt-1.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#994524] border-b border-[#efeeeb] pb-1.5 mb-2.5">
            Education
          </h3>
          <div className="space-y-2.5 text-xs">
            {RESUME_DATA.education.map((edu) => (
              <div key={edu.degree} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <div>
                  <strong className="text-[#1b1c1a] block">{edu.degree}</strong>
                  <span className="text-[#55433c]">
                    {edu.institution} | {edu.score}
                  </span>
                </div>
                <span className="text-[#546252] font-semibold">{edu.period}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications, Achievements & Publications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#994524] border-b border-[#efeeeb] pb-1.5 mb-2">
              Certifications
            </h3>
            <ul className="space-y-1.5 text-[#55433c]">
              {RESUME_DATA.certifications.map((c) => (
                <li key={c} className="flex items-start gap-2 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#994524] shrink-0 mt-1.5" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#994524] border-b border-[#efeeeb] pb-1.5 mb-2">
              Achievements
            </h3>
            <ul className="space-y-1.5 text-[#55433c]">
              {RESUME_DATA.achievements.map((a) => (
                <li key={a} className="flex items-start gap-2 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#994524] shrink-0 mt-1.5" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#994524] border-b border-[#efeeeb] pb-1.5 mb-2">
            Publications
          </h3>
          <ul className="space-y-1.5 text-xs text-[#55433c]">
            {RESUME_DATA.publications.map((p) => (
              <li key={p} className="flex items-start gap-2 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#994524] shrink-0 mt-1.5" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#efeeeb]">
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={triggerResumePrint}
              className="text-xs font-semibold text-[#1b1c1a] hover:text-[#994524] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#994524]" aria-hidden="true">print</span>
              <span>Print / Save as PDF</span>
            </button>

            <a
              href={buildGmailComposeUrl('Resume Request - Seapee Bajaj')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#994524] hover:underline inline-flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">mail</span>
              <span>Request PDF via Gmail</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-[#55433c] hover:bg-[#efeeeb] rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onContactClick();
              }}
              className="px-5 py-2 text-xs font-semibold text-white bg-[#b85d3a] hover:bg-[#994524] rounded-lg transition-colors cursor-pointer"
            >
              Contact Seapee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
