import React from 'react';
import { AWARDS, CERTIFICATIONS } from '../data/portfolioData';

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
          {AWARDS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-7 sm:p-8 border border-[#e4e2df] shadow-xs hover:shadow-md hover:border-[#dbc1b8] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Card Top Header */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#f5f3f0] text-[#994524] flex items-center justify-center group-hover:bg-[#994524] group-hover:text-white transition-colors duration-300">
                      <span className="material-symbols-outlined text-[24px]">
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#994524] block">
                        {item.badgeText}
                      </span>
                      <span className="text-xs text-[#546252] font-medium">
                        {item.organization}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#546252] bg-[#f5f3f0] px-3 py-1 rounded-full whitespace-nowrap">
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
          ))}
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
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="flex items-start gap-4 p-4 rounded-xl bg-[#fbf9f6] border border-[#e4e2df]"
              >
                <div className="w-10 h-10 rounded-lg bg-white border border-[#e4e2df] text-[#994524] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">
                    {cert.icon}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-2 flex-wrap mb-0.5">
                    <h4 className="text-sm font-semibold text-[#1b1c1a]">
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
