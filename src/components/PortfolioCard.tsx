import React from 'react';
import Image from 'next/image';
import { ProjectItem } from '../types';
import realEstateImg from '../assets/images/selected_work_1_real_estate_v2_1790405063037.jpg';
import realEstateWebp from '../assets/images/selected_work_1_real_estate_v2_1790405063037.webp';
import imarcManufacturingImg from '../assets/images/selected_work_2_imarc_logo_v2_1790405077761.jpg';
import imarcManufacturingWebp from '../assets/images/selected_work_2_imarc_logo_v2_1790405077761.webp';
import holidaySuccessImg from '../assets/images/selected_work_3_holiday_gift_v2_1790405089509.jpg';
import holidaySuccessWebp from '../assets/images/selected_work_3_holiday_gift_v2_1790405089509.webp';
import decodingGenZImg from '../assets/images/selected_work_4_gen_z_doodle_v2_1790405105736.jpg';
import decodingGenZWebp from '../assets/images/selected_work_4_gen_z_doodle_v2_1790405105736.webp';
import quoraLogoImg from '../assets/images/selected_work_5_quora_logo_1790404820379.jpg';
import quoraLogoWebp from '../assets/images/selected_work_5_quora_logo_1790404820379.webp';
import aiChipImg from '../assets/images/selected_work_7_ai_chip_1790404851838.jpg';
import aiChipWebp from '../assets/images/selected_work_7_ai_chip_1790404851838.webp';
import wmsDiagramImg from '../assets/images/selected_work_8_wms_diagram_1790404865127.jpg';
import wmsDiagramWebp from '../assets/images/selected_work_8_wms_diagram_1790404865127.webp';
import socialMediaAnalyticsImg from '../assets/images/selected_work_9_social_media_analytics_1790404881780.jpg';
import socialMediaAnalyticsWebp from '../assets/images/selected_work_9_social_media_analytics_1790404881780.webp';
import inboundLogisticsImg from '../assets/images/selected_work_10_inbound_logistics_1790404898397.jpg';
import inboundLogisticsWebp from '../assets/images/selected_work_10_inbound_logistics_1790404898397.webp';

export const PROJECT_LOGOS: Record<
  string,
  { src: string; webpSrc: string; alt: string; fit?: 'cover' | 'contain'; bg?: string }
> = {
  'real-estate-dynamics': {
    src: realEstateImg,
    webpSrc: realEstateWebp,
    alt: "Beyond the Blueprint: Insights on India's Evolving Real Estate Dynamics — housing market growth illustration",
    fit: 'cover',
  },
  'imarc-group-manufacturing': {
    src: imarcManufacturingImg,
    webpSrc: imarcManufacturingWebp,
    alt: 'IMARC Group B2B manufacturing plant advisory logo tile',
    fit: 'cover',
  },
  'unwrapping-holiday-success': {
    src: holidaySuccessImg,
    webpSrc: holidaySuccessWebp,
    alt: 'Unwrapping Holiday Success: Strategic Consumer Insights gift box illustration',
    fit: 'cover',
  },
  'decoding-gen-z': {
    src: decodingGenZImg,
    webpSrc: decodingGenZWebp,
    alt: 'Decoding Gen Z: The Generation Shaping the Future sketchnote illustration',
    fit: 'cover',
  },
  'well-of-insights-quora': {
    src: quoraLogoImg,
    webpSrc: quoraLogoWebp,
    alt: 'Quora — Well of Insights research communication page badge',
    fit: 'cover',
  },
  'global-warehouse-management-systems': {
    src: wmsDiagramImg,
    webpSrc: wmsDiagramWebp,
    alt: 'Global Warehouse Management Systems (WMS) supply chain and inventory workflow diagram',
    fit: 'contain',
    bg: 'bg-white',
  },
  'ai-market-research-pr-newswire': {
    src: aiChipImg,
    webpSrc: aiChipWebp,
    alt: 'Artificial Intelligence market research coverage microchip illustration',
    fit: 'cover',
    bg: 'bg-[#1c2536]',
  },
  'wms-market-figures': {
    src: wmsDiagramImg,
    webpSrc: wmsDiagramWebp,
    alt: 'Warehouse Management System (WMS) market figures workflow diagram',
    fit: 'contain',
    bg: 'bg-white',
  },
  'social-media-analytics-market': {
    src: socialMediaAnalyticsImg,
    webpSrc: socialMediaAnalyticsWebp,
    alt: 'Social Media Analytics Market growth chart illustration',
    fit: 'cover',
  },
  'trends-inbound-logistics': {
    src: inboundLogisticsImg,
    webpSrc: inboundLogisticsWebp,
    alt: 'Inbound Logistics supply chain and warehouse trends illustration',
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
              <Image
                src={logo.src}
                webpSrc={logo.webpSrc}
                pictureClassName={`w-20 h-14 sm:w-24 sm:h-16 rounded-xl border border-[#e4e2df] shadow-2xs overflow-hidden flex items-center justify-center shrink-0 ${
                  logo.bg || 'bg-white'
                }`}
                sizes="(max-width: 640px) 80px, 96px"
                alt={logo.alt}
                width={96}
                height={64}
                loading="lazy"
                decoding="async"
                className={`w-full h-full ${
                  logo.fit === 'contain' ? 'object-contain p-1' : 'object-cover'
                } group-hover:scale-105 transition-transform duration-300`}
              />
            )}
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#546252]">
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
              aria-label={`Inspect brief for ${project.title}`}
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">info</span>
            </button>
          )}
        </div>

        <h3 className="font-serif text-xl text-[#1b1c1a] mt-1 font-medium group-hover:text-[#994524] transition-colors line-clamp-2">
          {project.title}
        </h3>
        <p className="text-sm text-[#55433c] leading-relaxed line-clamp-3">
          {project.description}
        </p>
        {project.challenge && project.approach && (
          <p className="sr-only">
            Problem: {project.challenge} Approach: {project.approach}
            {project.deliverables ? ` Work Performed: ${project.deliverables.join(', ')}.` : ''}
            {project.keyInsights ? ` Outcome & Key Insights: ${project.keyInsights.join(' ')}` : ''}
          </p>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-[#efeeeb] flex items-center justify-between">
        <span className="text-xs text-[#546252] font-medium">
          {project.type}
        </span>
        <span className="text-xs font-semibold text-[#994524] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
          {project.id === 'global-warehouse-management-systems' ? 'Read the Full Report' : 'View Work'}
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_forward</span>
        </span>
      </div>
    </a>
  );
};
