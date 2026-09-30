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
    alt: 'Market research, B2B content, and SEO career background illustration',
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
  isHomeRoute?: boolean;
}

export const SECTION_BODY_COPY_CLASS =
  'section-body-copy text-[16px] leading-[1.65] md:text-[17px] md:leading-[1.7] text-[#55433c] font-normal';

export const About: React.FC<AboutProps> = ({ onNavigate, isHomeRoute = true }) => {
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
      className="w-full px-5 md:px-10 lg:px-16 py-8 sm:py-10 lg:py-12 bg-[#f5f3f0]"
      id="about"
      aria-labelledby="about-heading"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-12 items-start">
          {/* Text Narrative */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest text-[#546252] font-semibold">
              About Me • Perspective
            </span>
            <h2
              id="about-heading"
              className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1b1c1a] font-medium tracking-tight"
            >
              About Me
            </h2>
            <div className="w-12 h-[2px] bg-[#994524] my-0.5" />

            {/* 2-Sentence Concise Summary on Homepage */}
            <p className={`${SECTION_BODY_COPY_CLASS} max-w-2xl`}>
              {PROFILE_INFO.aboutIntro} My career started in primary and secondary market research at <strong className="font-semibold text-[length:inherit] leading-[inherit] font-sans">Allied Market Research</strong> and <strong className="font-semibold text-[length:inherit] leading-[inherit] font-sans">The Insight Partners</strong>, and shaped how I approach content and SEO across <strong className="font-semibold text-[length:inherit] leading-[inherit] font-sans">Perfect Clicks</strong>, <strong className="font-semibold text-[length:inherit] leading-[inherit] font-sans">Grand View Research</strong>, and <strong className="font-semibold text-[length:inherit] leading-[inherit] font-sans">IMARC Group</strong>—translating complex research into clear, reader-focused B2B and SEO content.
            </p>

            {isHomeRoute ? (
              <div className="pt-1">
                <a
                  href="/about"
                  onClick={(e) => handleInternalLink(e, '/about', 'about')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#994524] hover:underline"
                >
                  <span>Read more</span>
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                    arrow_forward
                  </span>
                </a>
              </div>
            ) : null}

            {/* Full Extended Bio (Visible on /about, kept in DOM via sr-only on homepage for SEO) */}
            <div className={isHomeRoute ? 'sr-only' : 'flex flex-col gap-3.5'}>
              <p className={SECTION_BODY_COPY_CLASS}>
                I specialize in <strong className="font-semibold text-[length:inherit] leading-[inherit] font-sans">content strategy, SEO optimization, research-led content, editorial workflows, and content production</strong>. My work spans keyword research, on-page SEO, competitive intelligence, and structuring clear, factual content for traditional search and AI-powered answer engines (<strong className="font-semibold text-[length:inherit] leading-[inherit] font-sans">GEO &amp; AEO</strong>). Alongside my 10+ years of industry experience, I hold an <strong className="font-semibold text-[length:inherit] leading-[inherit] font-sans">MBA in Systems</strong>, completed professional training in <strong className="font-semibold text-[length:inherit] leading-[inherit] font-sans">Introduction to Generative Engine Optimization</strong> (Coursera), <strong className="font-semibold text-[length:inherit] leading-[inherit] font-sans">HubSpot Content Marketing Certification</strong>, <strong className="font-semibold text-[length:inherit] leading-[inherit] font-sans">Google Prompting Essentials</strong>, and the <strong className="font-semibold text-[length:inherit] leading-[inherit] font-sans">Be10x AI tools program</strong>, and authored my published poetry book <em>Not Unworthy</em>.
              </p>

              {/* Quick Progression Summary */}
              <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#55433c]">
                <div className="bg-white p-3.5 rounded-xl border border-[#e4e2df]">
                  <span className="font-semibold text-[#994524] block mb-0.5">
                    Market Research Foundation
                  </span>
                  <span>
                    I conducted primary &amp; secondary research, market estimation, ICT/Semiconductor/Automotive reports, and client pre-sales &amp; post-sales solutions.
                  </span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-[#e4e2df]">
                  <span className="font-semibold text-[#994524] block mb-0.5">
                    B2B Content, SEO &amp; Editorial Operations
                  </span>
                  <span>
                    I created SEO blogs, articles, listicles, and FAQs; led Semrush keyword research, on-page SEO, Well of Insights Quora strategy (60–70 to 250+ avg views), content workflows &amp; SEO quality checks.
                  </span>
                </div>
              </div>

              {/* Internal Links Row */}
              <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-[#994524]">
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
          </div>

          {/* 4 Stats Cards Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4 pt-1">
            {STATS.map((stat) => {
              const logo = STAT_LOGOS[stat.id];
              return (
                <button
                  key={stat.id}
                  type="button"
                  onClick={() => setSelectedStat(selectedStat === stat.id ? null : stat.id)}
                  className={`text-left bg-white p-3.5 sm:p-5 rounded-xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between border ${
                    selectedStat === stat.id ? 'border-[#994524] ring-1 ring-[#994524]' : 'border-[#e4e2df]'
                  } group cursor-pointer`}
                >
                  <div className="flex items-start justify-between w-full mb-2.5 sm:mb-3">
                    {logo ? (
                      <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-[#fbf9f6] border border-[#e4e2df] shadow-2xs overflow-hidden flex items-center justify-center shrink-0">
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          width={44}
                          height={44}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <span className="material-symbols-outlined text-[#994524] text-2xl group-hover:scale-110 transition-transform">
                        {stat.icon}
                      </span>
                    )}
                    <span className="material-symbols-outlined text-[16px] text-[#88726b] opacity-0 group-hover:opacity-100 transition-opacity">
                      {selectedStat === stat.id ? 'expand_less' : 'info'}
                    </span>
                  </div>

                  <div>
                    <span className="font-serif text-lg sm:text-2xl text-[#1b1c1a] font-medium block leading-tight mb-1">
                      {stat.value}
                    </span>
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#546252] font-semibold block leading-snug">
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
