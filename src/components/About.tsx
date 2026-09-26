import React, { useState } from 'react';
import { STATS } from '../data/portfolioData';
import experienceLogo from '../assets/images/about_logo_experience_1790405416482.jpg';
import rankReachLogo from '../assets/images/about_logo_rank_reach_1790405429831.jpg';
import empiricalLogo from '../assets/images/about_logo_empirical_1790405440606.jpg';
import refinedLogo from '../assets/images/about_logo_refined_1790405450987.jpg';

const STAT_LOGOS: Record<string, { src: string; alt: string }> = {
  experience: {
    src: experienceLogo,
    alt: '9+ Years Experience in Content, SEO & Research logo',
  },
  'rank-reach': {
    src: rankReachLogo,
    alt: 'Rank & Reach — SEO & Content Architecture logo',
  },
  empirical: {
    src: empiricalLogo,
    alt: 'Empirical — B2B & Market Research logo',
  },
  refined: {
    src: refinedLogo,
    alt: 'Refined — Editorial Expertise logo',
  },
};

export const About: React.FC = () => {
  const [selectedStat, setSelectedStat] = useState<string | null>(null);

  return (
    <section className="w-full px-5 md:px-10 lg:px-16 py-16 lg:py-24 bg-[#f5f3f0]" id="about">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Text Narrative */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest text-[#546252] font-semibold">
              Perspective
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1b1c1a] font-medium tracking-tight">
              More Than a Writer.
            </h2>
            <div className="w-12 h-[2px] bg-[#994524] my-2" />
            <p className="text-lg md:text-xl text-[#55433c] leading-relaxed font-normal">
              Great content starts with understanding — the audience, the business objective, the subject, and the search intent behind it.
            </p>
            <p className="text-base text-[#55433c] leading-relaxed">
              With 9+ years of experience across content, SEO, editorial workflows, and market research, I combine research depth with clear, reader-first writing. My focus is creating content that is accurate, useful, discoverable, and aligned with real business objectives.
            </p>
            <p className="text-sm text-[#55433c] leading-relaxed">
              My work spans <strong className="text-[#1b1c1a] font-semibold">SEO + Content Strategy + Storytelling + Creative Writing</strong>. As a published author (<em>Not Unworthy</em>), I bring original narrative poise and literary sensitivity to technical and analytical subjects.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#546252]">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#994524]" />
                <span>SEO &amp; Content Architecture</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#994524]" />
                <span>Storytelling &amp; Creative Writing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#994524]" />
                <span>Empirical Research Rigor</span>
              </div>
            </div>
          </div>

          {/* 4 Stats Cards Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-1">
            {STATS.map((stat) => {
              const logo = STAT_LOGOS[stat.id];
              return (
                <button
                  key={stat.id}
                  onClick={() => setSelectedStat(selectedStat === stat.id ? null : stat.id)}
                  className={`text-left bg-white p-6 rounded-xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-h-[210px] border ${
                    selectedStat === stat.id ? 'border-[#994524] ring-1 ring-[#994524]' : 'border-[#e4e2df]'
                  } group cursor-pointer`}
                >
                  <div className="flex items-start justify-between w-full mb-4">
                    {logo ? (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#fbf9f6] border border-[#e4e2df] shadow-2xs overflow-hidden flex items-center justify-center shrink-0">
                        <img
                          src={logo.src}
                          alt={logo.alt}
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
                    {selectedStat === stat.id && (
                      <p className="mt-2 text-xs text-[#55433c] leading-relaxed pt-2 border-t border-[#efeeeb] animate-in fade-in duration-200">
                        {stat.detail}
                      </p>
                    )}
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
