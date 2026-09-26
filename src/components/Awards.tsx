import React from 'react';
import { AWARDS, CERTIFICATIONS } from '../data/portfolioData';
import gvrTrophyImg from '../assets/images/gvr_star_award_trophy_1790403565114.jpg';
import pwcLogoImg from '../assets/images/pwc_logo.svg';
import myNeedToLiveBadgeImg from '../assets/images/my_need_to_live_award_badge_1790403584967.jpg';
import asmLogoImg from '../assets/images/asm_group_logo_1790403595371.jpg';
import googlePromptingBadgeImg from '../assets/images/google_prompting_essentials_badge_1790403691771.jpg';
import hubspotBadgeImg from '../assets/images/hubspot_content_marketing_badge_1790403703530.jpg';

const AWARD_LOGOS: Record<string, { src: string; alt: string; fit: 'cover' | 'contain' }> = {
  'best-content-writer': {
    src: gvrTrophyImg,
    alt: 'Grand View Research STAR Awards trophy — Seapee Bajaj, Content Creation',
    fit: 'cover',
  },
  'pwc-commendation': {
    src: pwcLogoImg,
    alt: 'PwC (PricewaterhouseCoopers) logo',
    fit: 'contain',
  },
  'my-need-to-live-reward': {
    src: myNeedToLiveBadgeImg,
    alt: 'My Need To Live — Get Involved Award badge',
    fit: 'contain',
  },
  'academic-publications': {
    src: asmLogoImg,
    alt: 'ASM (Audyogik Shikshan Mandal) logo',
    fit: 'contain',
  },
};

const CERTIFICATION_LOGOS: Record<string, { src: string; alt: string }> = {
  'google-prompting': {
    src: googlePromptingBadgeImg,
    alt: 'Google Prompting Essentials — Certificate of Completion badge',
  },
  'hubspot-content-marketing': {
    src: hubspotBadgeImg,
    alt: 'HubSpot Academy — Content Marketing Certification badge',
  },
};

export const Awards: React.FC = () => {
  return (
    <section
      id="awards"
      className="w-full px-5 md:px-10 lg:px-16 py-20 lg:py-28 bg-[#f5f3f0] border-t border-[#e4e2df] relative overflow-hidden"
      aria-labelledby="awards-heading"
    >
      {/* Ambient background accent */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#994524]/5 blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col gap-3 max-w-2xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#994524]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#994524]" />
            <span>Achievements &amp; Accolades</span>
          </div>
          <h2
            id="awards-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1b1c1a] font-medium tracking-tight"
          >
            Honors &amp; Industry Recognition
          </h2>
          <p className="text-base sm:text-lg text-[#55433c] leading-relaxed">
            Tangible proof of editorial excellence, enterprise client trust, and academic research rigor documented across 9+ years.
          </p>
        </div>

        {/* Awards Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {AWARDS.map((item) => {
            const logo = AWARD_LOGOS[item.id];
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-7 sm:p-8 border border-[#e4e2df] shadow-xs hover:shadow-md hover:border-[#dbc1b8] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Top Header with Logo */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-4">
                      {logo ? (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white border border-[#e4e2df] shadow-2xs overflow-hidden flex items-center justify-center shrink-0 p-1.5">
                          <img
                            src={logo.src}
                            alt={logo.alt}
                            referrerPolicy="no-referrer"
                            className={`w-full h-full ${
                              logo.fit === 'cover'
                                ? 'object-cover rounded-lg'
                                : 'object-contain'
                            }`}
                          />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-[#f5f3f0] text-[#994524] flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[24px]">
                            {item.icon}
                          </span>
                        </div>
                      )}
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#994524] block">
                          {item.badgeText}
                        </span>
                        <span className="text-xs sm:text-sm text-[#546252] font-medium block mt-0.5">
                          {item.organization}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-[#546252] bg-[#f5f3f0] px-3 py-1 rounded-full whitespace-nowrap shrink-0">
                      {item.year}
                    </span>
                  </div>

                  {/* Award Title */}
                  <h3 className="font-serif text-xl sm:text-2xl text-[#1b1c1a] font-medium tracking-tight mb-3 group-hover:text-[#994524] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#55433c] leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Key Highlight Footnote */}
                {item.highlight && (
                  <div className="pt-4 border-t border-[#efeeeb] flex items-start gap-2 text-xs text-[#546252]">
                    <span className="material-symbols-outlined text-[16px] text-[#994524] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span className="leading-snug">{item.highlight}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Certifications & Specialized Credentials Strip */}
        <div className="mt-12 lg:mt-16 bg-white rounded-2xl p-6 sm:p-8 border border-[#e4e2df] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#efeeeb]">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#994524] block mb-1">
                Continuous Learning &amp; AI Integration
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#1b1c1a] font-medium">
                Verified Professional Certifications
              </h3>
            </div>
            <span className="text-xs text-[#546252] bg-[#fbf9f6] px-3.5 py-1.5 rounded-full border border-[#e4e2df] font-medium w-fit">
              Top Percentile Scores
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            {CERTIFICATIONS.map((cert) => {
              const certLogo = CERTIFICATION_LOGOS[cert.id];
              return (
                <div
                  key={cert.id}
                  className="flex items-start gap-4 p-4 sm:p-5 rounded-xl bg-[#fbf9f6] border border-[#e4e2df]"
                >
                  {certLogo ? (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white border border-[#e4e2df] shadow-2xs overflow-hidden flex items-center justify-center shrink-0 p-1.5">
                      <img
                        src={certLogo.src}
                        alt={certLogo.alt}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-white border border-[#e4e2df] text-[#994524] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">
                        {cert.icon}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2 flex-wrap mb-0.5">
                      <h4 className="text-sm sm:text-base font-semibold text-[#1b1c1a]">
                        {cert.title}
                      </h4>
                      <span className="text-xs font-bold text-[#994524]">
                        {cert.score}
                      </span>
                    </div>
                    <p className="text-xs text-[#546252] font-medium mb-1">
                      {cert.issuer} • {cert.date}
                    </p>
                    <p className="text-xs text-[#55433c] leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
