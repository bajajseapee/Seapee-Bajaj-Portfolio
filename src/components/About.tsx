import React, { useState } from 'react';
import Image from 'next/image';
import { STATS, PROFILE_INFO } from '../data/portfolioData';
import experienceLogo from '../assets/images/about_logo_experience_1790405416482.webp';
import rankReachLogo from '../assets/images/about_logo_rank_reach_1790405429831.webp';
import empiricalLogo from '../assets/images/about_logo_empirical_1790405440606.webp';
import refinedLogo from '../assets/images/about_logo_refined_1790405450987.webp';

const STAT_LOGOS: Record<string, { src: string; alt: string }> = {
  experience: {
    src: experienceLogo,
    alt: '9+ years of experience across market research, B2B content, and SEO illustration',
  },
  'rank-reach': {
    src: rankReachLogo,
    alt: 'SEO, GEO and AI search visibility strategy illustration',
  },
  empirical: {
    src: empiricalLogo,
    alt: 'Research-led B2B and market intelligence dossier illustration',
  },
  refined: {
    src: refinedLogo,
    alt: 'Reader-first editorial storytelling and book authorship illustration',
  },
};

interface AboutProps {
  onNavigate?: (path: string, sectionId?: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const [selectedStat, setSelectedStat] = useState<string | null>(null);

  const handleInternalLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
    sectionId: string
  ) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path, sectionId);
    }
  };

  return (
    <section
      className="w-full px-5 md:px-10 lg:px-16 py-16 lg:py-24 bg-[#f5f3f0]"
      id="about"
      aria-labelledby="about-heading"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Text Narrative */}
          <div className="lg:col-span-6 flex flex-col gap-3.5">
            <span className="text-xs uppercase tracking-widest text-[#546252] font-semibold">
              About Seapee Bajaj • Perspective
            </span>
            <h2
              id="about-heading"
              className="font-serif text-3xl md:text-4xl text-[#1b1c1a] font-medium tracking-tight"
            >
              More Than a Writer — Research-Led. Reader-Focused.
            </h2>
            <div className="w-12 h-[2px] bg-[#994524] my-1" />
            <p className="text-lg md:text-xl text-[#1b1c1a] leading-relaxed font-normal">
              {PROFILE_INFO.aboutIntro}
            </p>
            <p className="text-base text-[#55433c] leading-relaxed">
              My career started in primary and secondary market research at <strong className="text-[#1b1c1a] font-semibold">Allied Market Research</strong> and <strong className="text-[#1b1c1a] font-semibold">The Insight Partners</strong>, where I worked on market estimation, data analysis, and industry reports across ICT, Semiconductor, and Automotive domains. That foundation shaped how I approach content and SEO across <strong className="text-[#1b1c1a] font-semibold">Perfect Clicks</strong>, <strong className="text-[#1b1c1a] font-semibold">Grand View Research</strong>, and <strong className="text-[#1b1c1a] font-semibold">IMARC Group</strong>—translating complex research into clear, reader-focused B2B and SEO content.
            </p>
            <p className="text-sm text-[#55433c] leading-relaxed">
              Seapee Bajaj is a content and SEO professional with 9+ years of experience in <strong className="text-[#1b1c1a] font-semibold">content strategy, SEO optimization, research-led content, editorial workflows, and content production</strong>. My work spans keyword research, on-page SEO, competitive intelligence, and structuring clear, factual content for traditional search and AI-powered answer engines (<strong className="text-[#1b1c1a] font-semibold">GEO &amp; AEO</strong>). Alongside hands-on industry experience, I hold an <strong className="text-[#1b1c1a] font-semibold">MBA in Systems</strong>, completed professional training in <strong className="text-[#1b1c1a] font-semibold">Introduction to Generative Engine Optimization</strong> (Coursera), <strong className="text-[#1b1c1a] font-semibold">HubSpot Content Marketing Certification</strong>, <strong className="text-[#1b1c1a] font-semibold">Google Prompting Essentials</strong>, and the <strong className="text-[#1b1c1a] font-semibold">Be10x AI tools program</strong>, and authored the published poetry book <em>Not Unworthy</em>.
            </p>

            {/* Quick Progression Summary */}
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#55433c]">
              <div className="bg-white p-3.5 rounded-xl border border-[#e4e2df]">
                <span className="font-semibold text-[#994524] block mb-0.5">
                  Allied Market Research &amp; The Insight Partners
                </span>
                <span>
                  Primary &amp; secondary research, market estimation, ICT/Semiconductor/Automotive reports, client pre-sales &amp; post-sales solutions.
                </span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#e4e2df]">
                <span className="font-semibold text-[#994524] block mb-0.5">
                  Perfect Clicks, Grand View Research &amp; IMARC Group
                </span>
                <span>
                  SEO blogs, articles, listicles, FAQs, Semrush keyword research, on-page SEO, Well of Insights Quora strategy (60–70 to 250+ avg views), content workflows &amp; SEO quality checks.
                </span>
              </div>
            </div>

            {/* Internal Links Row */}
            <div className="pt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-[#994524]">
              <a
                href="/experience"
                onClick={(e) => handleInternalLink(e, '/experience', 'experience')}
                className="hover:underline inline-flex items-center gap-1"
              >
                <span>Career Experience</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </a>
              <a
                href="/services"
                onClick={(e) => handleInternalLink(e, '/services', 'services')}
                className="hover:underline inline-flex items-center gap-1"
              >
                <span>SEO &amp; Content Strategy</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </a>
              <a
                href="/b2b-content"
                onClick={(e) => handleInternalLink(e, '/b2b-content', 'services')}
                className="hover:underline inline-flex items-center gap-1"
              >
                <span>B2B Content</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </a>
              <a
                href="/geo-aeo"
                onClick={(e) => handleInternalLink(e, '/geo-aeo', 'seo-geo-expertise')}
                className="hover:underline inline-flex items-center gap-1"
              >
                <span>GEO &amp; AI Search</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </a>
              <a
                href="/case-studies"
                onClick={(e) => handleInternalLink(e, '/case-studies', 'case-studies')}
                className="hover:underline inline-flex items-center gap-1"
              >
                <span>Case Studies</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </a>
            </div>
          </div>

          {/* 4 Stats Cards Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-1">
            {STATS.map((stat) => {
              const logo = STAT_LOGOS[stat.id];
              return (
                <button
                  key={stat.id}
                  type="button"
                  onClick={() => setSelectedStat(selectedStat === stat.id ? null : stat.id)}
                  className={`text-left bg-white p-6 rounded-xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-h-[210px] border ${
                    selectedStat === stat.id ? 'border-[#994524] ring-1 ring-[#994524]' : 'border-[#e4e2df]'
                  } group cursor-pointer`}
                >
                  <div className="flex items-start justify-between w-full mb-4">
                    {logo ? (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#fbf9f6] border border-[#e4e2df] shadow-2xs overflow-hidden flex items-center justify-center shrink-0">
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          width={78}
                          height={78}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <span className="material-symbols-outlined text-[#994524] text-3xl group-hover:scale-110 transition-transform">
                        {stat.icon}
                      </span>
                    )}
                    <span className="material-symbols-outlined text-[18px] text-[#88726b] opacity-0 group-hover:opacity-100 transition-opacity">
                      {selectedStat === stat.id ? 'expand_less' : 'info'}
                    </span>
                  </div>

                  <div>
                    <span className="font-serif text-2xl sm:text-3xl text-[#1b1c1a] font-medium block leading-none mb-1.5">
                      {stat.value}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-[#546252] font-semibold block">
                      {stat.label}
                    </span>
                    <p
                      className={
                        selectedStat === stat.id
                          ? 'mt-2 text-xs text-[#55433c] leading-relaxed pt-2 border-t border-[#efeeeb] animate-in fade-in duration-200'
                          : 'sr-only'
                      }
                    >
                      {stat.detail}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
