import React from 'react';
import { PROFILE_INFO } from '../data/portfolioData';

interface HeroProps {
  onWorkWithMe: () => void;
  onViewWork: () => void;
  onViewCaseStudies?: () => void;
  onFilterTopic: (topic: string) => void;
  isHomeRoute?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onWorkWithMe,
  onViewWork,
  onViewCaseStudies,
  onFilterTopic,
  isHomeRoute = true,
}) => {
  return (
    <section
      id="hero"
      className="relative w-full px-5 md:px-10 lg:px-16 py-10 lg:py-14 overflow-hidden"
      aria-label="Introduction — Seapee Bajaj"
    >
      {/* Atmospheric subtle decorative aura */}
      <div className="absolute -top-32 right-1/4 w-96 h-96 rounded-full bg-[#994524]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-[#d5e4cf]/40 blur-2xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-14 items-start">
        {/* Left Column: Copy & Credibility */}
        <div className="md:col-span-7 flex flex-col gap-4 z-10">
          {/* Primary Identity & Positioning */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs sm:text-sm uppercase tracking-widest text-[#994524] font-semibold">
              {PROFILE_INFO.name} — {PROFILE_INFO.title}
            </span>
            <span className="text-xs text-[#546252] font-semibold tracking-wide">
              {PROFILE_INFO.corePositioning} · {PROFILE_INFO.badge}
            </span>
          </div>

          {/* Main H1 Headline on Homepage, Styled Paragraph on Sub-Routes (ensuring exactly one H1 per page) */}
          {isHomeRoute ? (
            <h1 className="font-serif text-3xl sm:text-4xl md:text-[44px] lg:text-[52px] text-[#1b1c1a] tracking-tight leading-[1.14] mt-1 font-medium">
              <span className="sr-only">Seapee Bajaj — SEO Content Strategist, B2B Content &amp; GEO Specialist: </span>
              Strategy, <span className="italic font-normal text-[#994524]">Storytelling</span> &amp; Search — Thoughtfully Combined.
            </h1>
          ) : (
            <p className="font-serif text-3xl sm:text-4xl md:text-[44px] lg:text-[52px] text-[#1b1c1a] tracking-tight leading-[1.14] mt-1 font-medium">
              Strategy, <span className="italic font-normal text-[#994524]">Storytelling</span> &amp; Search — Thoughtfully Combined.
            </p>
          )}

          {/* Supporting Positioning Line */}
          <p className="font-serif text-lg sm:text-xl text-[#994524] font-medium">
            {PROFILE_INFO.corePositioning}
          </p>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-[#55433c] max-w-xl leading-relaxed font-normal">
            {PROFILE_INFO.subheadline}
          </p>

          {/* Interactive Topic Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-sm" role="group" aria-label="Filter work by topic">
            {PROFILE_INFO.topics.map((topic, index) => (
              <React.Fragment key={topic}>
                <button
                  type="button"
                  onClick={() => onFilterTopic(topic)}
                  className="px-3 py-1.5 rounded-lg bg-[#efeeeb] hover:bg-[#eae8e5] text-[#546252] hover:text-[#1b1c1a] text-xs font-medium tracking-wide transition-colors cursor-pointer"
                  title={`Explore ${topic}`}
                >
                  {topic}
                </button>
                {index < PROFILE_INFO.topics.length - 1 && (
                  <span className="w-1 h-1 rounded-full bg-[#dbc1b8]" aria-hidden="true" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Conversion CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              type="button"
              onClick={onWorkWithMe}
              className="inline-flex items-center justify-center text-sm font-semibold bg-[#b85d3a] hover:bg-[#994524] text-white transition-all px-6 py-3 rounded-lg shadow-sm hover:shadow active:scale-[0.98] cursor-pointer"
            >
              Work With Me
              <span className="material-symbols-outlined ml-2 text-[18px]">north_east</span>
            </button>
            <button
              type="button"
              onClick={onViewWork}
              className="inline-flex items-center justify-center text-sm font-semibold bg-[#efeeeb] hover:bg-[#eae8e5] text-[#1b1c1a] transition-colors px-5 py-3 rounded-lg border border-[#e4e2df] cursor-pointer"
            >
              View My Work
              <span className="material-symbols-outlined ml-2 text-[18px]">arrow_downward</span>
            </button>
            {onViewCaseStudies && (
              <button
                type="button"
                onClick={onViewCaseStudies}
                className="inline-flex items-center justify-center text-sm font-semibold bg-white hover:bg-[#efeeeb] text-[#1b1c1a] transition-colors px-5 py-3 rounded-lg border border-[#e4e2df] cursor-pointer"
              >
                View Case Studies
              </button>
            )}
            <a
              href="#resume"
              className="inline-flex items-center justify-center text-sm font-semibold bg-white hover:bg-[#efeeeb] text-[#994524] transition-colors px-5 py-3 rounded-lg border border-[#dbc1b8] cursor-pointer"
            >
              View Resume
              <span className="material-symbols-outlined ml-1.5 text-[18px]">description</span>
            </a>
          </div>
        </div>

        {/* Right Column: Authentic Image with LCP Priority */}
        <div className="md:col-span-5 relative flex justify-center md:justify-end mt-4 md:mt-1">
          <div className="relative w-full max-w-[320px] sm:max-w-[350px] md:max-w-[380px] group">
            {/* Backing parchment mat */}
            <div className="absolute -inset-3 bg-[#eae8e5] rounded-xl -rotate-2 transition-transform duration-300 group-hover:-rotate-1 shadow-sm border border-[#e4e2df]" />

            {/* Authentic Photo */}
            <div className="relative overflow-hidden rounded-xl shadow-xl bg-white border border-[#eae8e5]">
              <img
                src={PROFILE_INFO.heroImage}
                alt="Seapee Bajaj — SEO Content Strategist, B2B Content & GEO Specialist"
                width={380}
                height={475}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Floating editorial card with quote */}
            <div className="absolute -bottom-5 -left-5 bg-white p-3.5 rounded-xl shadow-lg max-w-[260px] hidden sm:block border border-[#e4e2df] transition-transform group-hover:-translate-y-1 duration-300">
              <div className="flex items-center gap-1.5 text-[#994524] mb-0.5">
                <span className="material-symbols-outlined text-[17px]">verified</span>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-[#994524]">
                  Research-Led. Reader-Focused.
                </span>
              </div>
              <p className="font-serif text-base text-[#1b1c1a] italic leading-snug">
                SEO • B2B Content • GEO &amp; AI Search
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
