import React from 'react';
import { ProjectItem } from '../types';
import realEstateImg from '../assets/images/selected_work_1_real_estate_v2_1790405063037.jpg';
import imarcManufacturingImg from '../assets/images/selected_work_2_imarc_logo_v2_1790405077761.jpg';
import holidaySuccessImg from '../assets/images/selected_work_3_holiday_gift_v2_1790405089509.jpg';
import decodingGenZImg from '../assets/images/selected_work_4_gen_z_doodle_v2_1790405105736.jpg';
import quoraLogoImg from '../assets/images/selected_work_5_quora_logo_1790404820379.jpg';
import metaverseLogoImg from '../assets/images/selected_work_6_metaverse_logo_1790404830877.jpg';
import aiChipImg from '../assets/images/selected_work_7_ai_chip_1790404851838.jpg';
import wmsDiagramImg from '../assets/images/selected_work_8_wms_diagram_1790404865127.jpg';
import socialMediaAnalyticsImg from '../assets/images/selected_work_9_social_media_analytics_1790404881780.jpg';
import inboundLogisticsImg from '../assets/images/selected_work_10_inbound_logistics_1790404898397.jpg';

export const PROJECT_LOGOS: Record<
  string,
  { src: string; alt: string; fit?: 'cover' | 'contain'; bg?: string }
> = {
  'real-estate-dynamics': {
    src: realEstateImg,
    alt: "Beyond the Blueprint: Insights into India's Evolving Real Estate Dynamics — IMARC",
    fit: 'cover',
  },
  'imarc-group-manufacturing': {
    src: imarcManufacturingImg,
    alt: 'IMARC: Your Manufacturing Success Partner',
    fit: 'cover',
  },
  'unwrapping-holiday-success': {
    src: holidaySuccessImg,
    alt: 'Unwrapping Holiday Success: The Power of Strategic Consumer Insights — IMARC',
    fit: 'cover',
  },
  'decoding-gen-z': {
    src: decodingGenZImg,
    alt: 'Decoding Gen Z: The Generation Shaping the Future — IMARC',
    fit: 'cover',
  },
  'well-of-insights-quora': {
    src: quoraLogoImg,
    alt: 'Quora — Well of Insights logo',
    fit: 'cover',
  },
  'metaverse-content-creation': {
    src: metaverseLogoImg,
    alt: 'Metaverse logo',
    fit: 'cover',
    bg: 'bg-[#12073b]',
  },
  'ai-market-research-pr-newswire': {
    src: aiChipImg,
    alt: 'AI Market Research microchip logo',
    fit: 'cover',
    bg: 'bg-[#1c2536]',
  },
  'wms-market-figures': {
    src: wmsDiagramImg,
    alt: 'WMS Warehouse Management System workflow logo',
    fit: 'contain',
    bg: 'bg-white',
  },
  'social-media-analytics-market': {
    src: socialMediaAnalyticsImg,
    alt: 'Social Media Analytics Market illustration',
    fit: 'cover',
  },
  'trends-inbound-logistics': {
    src: inboundLogisticsImg,
    alt: 'Inbound Logistics warehouse trends illustration',
    fit: 'cover',
  },
};

interface PortfolioCardProps {
  project: ProjectItem;
  onOpenProject?: (project: ProjectItem) => void;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ project, onOpenProject }) => {
  const logo = PROJECT_LOGOS[project.id];

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white p-6 rounded-xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between border border-[#e4e2df] hover:border-[#dbc1b8] group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#994524] relative"
      aria-label={`Open ${project.title} (opens in a new tab)`}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            {logo && (
              <div
                className={`w-20 h-14 sm:w-24 sm:h-16 rounded-xl border border-[#e4e2df] shadow-2xs overflow-hidden flex items-center justify-center shrink-0 ${
                  logo.bg || 'bg-white'
                }`}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full ${
                    logo.fit === 'contain' ? 'object-contain p-1' : 'object-cover'
                  } group-hover:scale-105 transition-transform duration-300`}
                />
              </div>
            )}
            <span className="inline-block px-2.5 py-1 rounded bg-[#efeeeb] text-[#546252] text-[11px] font-semibold uppercase tracking-wider w-fit">
              {project.tag}
            </span>
          </div>

          {onOpenProject && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpenProject(project);
              }}
              title="Inspect brief & insights"
              className="text-gray-400 hover:text-[#994524] p-1 rounded-md transition-colors shrink-0"
              aria-label="Inspect project brief"
            >
              <span className="material-symbols-outlined text-[18px]">info</span>
            </button>
          )}
        </div>

        <h3 className="font-serif text-xl text-[#1b1c1a] mt-1 font-medium group-hover:text-[#994524] transition-colors line-clamp-2">
          {project.title}
        </h3>
        <p className="text-sm text-[#55433c] leading-relaxed line-clamp-3">
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
