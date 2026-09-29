import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { PROFILE_INFO } from '../data/portfolioData';

interface HeroProps {
  onWorkWithMe: () => void;
  onViewWork: () => void;
  onViewCaseStudies?: () => void;
  onReadBook?: () => void;
  onFilterTopic: (topic: string) => void;
  isHomeRoute?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onWorkWithMe,
  onViewWork,
  onViewCaseStudies,
  onReadBook,
  onFilterTopic,
  isHomeRoute = true,
}) => {
  const prefersReducedMotion = useReducedMotion();

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
              Seapee Bajaj · B2B SEO, Content &amp; GEO
            </span>
          </div>

          {/* Main H1 Headline on Homepage, Styled Paragraph on Sub-Routes (ensuring exactly one H1 per page) */}
          {isHomeRoute ? (
            <h1 className="font-serif text-3xl sm:text-4xl md:text-[44px] lg:text-[50px] text-[#1b1c1a] tracking-tight leading-[1.15] mt-1 font-medium">
              B2B SEO Content Strategist, Research-Led and Reader-Focused
            </h1>
          ) : (
            <p className="font-serif text-3xl sm:text-4xl md:text-[44px] lg:text-[50px] text-[#1b1c1a] tracking-tight leading-[1.15] mt-1 font-medium">
              B2B SEO Content Strategist, Research-Led and Reader-Focused
            </p>
          )}

          {/* Supporting Positioning Line */}
          <p className="font-serif text-lg sm:text-xl text-[#994524] font-medium">
            Market research · B2B content · SEO · GEO &amp; AI search
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

          {/* Conversion CTAs: 3 on the left side, 2 on the right side */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 pt-2 max-w-[440px] items-start">
            {/* Left Column: 3 Buttons */}
            <div className="flex flex-col gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={onWorkWithMe}
                className="w-full inline-flex items-center justify-center text-xs sm:text-sm font-semibold bg-[#b85d3a] hover:bg-[#994524] text-white transition-all px-3 sm:px-5 py-3 rounded-lg shadow-sm hover:shadow active:scale-[0.98] cursor-pointer whitespace-nowrap"
              >
                <span>Work With Me</span>
                <span className="material-symbols-outlined ml-1.5 text-[16px] sm:text-[18px]">north_east</span>
              </button>
              <button
                type="button"
                onClick={onViewWork}
                className="w-full inline-flex items-center justify-center text-xs sm:text-sm font-semibold bg-[#efeeeb] hover:bg-[#eae8e5] text-[#1b1c1a] transition-colors px-3 sm:px-5 py-3 rounded-lg border border-[#e4e2df] cursor-pointer whitespace-nowrap"
              >
                <span>View My Work</span>
                <span className="material-symbols-outlined ml-1.5 text-[16px] sm:text-[18px]">arrow_downward</span>
              </button>
              {onViewCaseStudies && (
                <button
                  type="button"
                  onClick={onViewCaseStudies}
                  className="w-full inline-flex items-center justify-center text-xs sm:text-sm font-semibold bg-white hover:bg-[#efeeeb] text-[#1b1c1a] transition-colors px-3 sm:px-5 py-3 rounded-lg border border-[#e4e2df] cursor-pointer whitespace-nowrap"
                >
                  <span>View Case Studies</span>
                </button>
              )}
            </div>

            {/* Right Column: 3 Buttons */}
            <div className="flex flex-col gap-2.5 sm:gap-3">
              <a
                href="#resume"
                className="w-full inline-flex items-center justify-center text-xs sm:text-sm font-semibold bg-white hover:bg-[#efeeeb] text-[#994524] transition-colors px-3 sm:px-5 py-3 rounded-lg border border-[#dbc1b8] cursor-pointer whitespace-nowrap"
              >
                <span>View Resume</span>
                <span className="material-symbols-outlined ml-1.5 text-[16px] sm:text-[18px]">description</span>
              </a>
              <a
                href="#published-work"
                onClick={(e) => {
                  if (onReadBook) {
                    e.preventDefault();
                    onReadBook();
                  }
                }}
                className="w-full inline-flex items-center justify-center text-xs sm:text-sm font-semibold bg-white hover:bg-[#efeeeb] text-[#1b1c1a] hover:text-[#994524] transition-colors px-3 sm:px-5 py-3 rounded-lg border border-[#e4e2df] cursor-pointer whitespace-nowrap"
              >
                <span>Read My Book</span>
                <span className="material-symbols-outlined ml-1.5 text-[16px] sm:text-[18px]">menu_book</span>
              </a>
              <a
                href="#testimonials"
                className="w-full inline-flex items-center justify-center text-xs sm:text-sm font-semibold bg-white hover:bg-[#efeeeb] text-[#1b1c1a] hover:text-[#994524] transition-colors px-3 sm:px-5 py-3 rounded-lg border border-[#e4e2df] cursor-pointer whitespace-nowrap"
              >
                <span>Testimonials</span>
                <span className="material-symbols-outlined ml-1.5 text-[16px] sm:text-[18px]">format_quote</span>
              </a>
            </div>
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
                  B2B SEO, Content &amp; GEO
                </span>
              </div>
              <p className="font-serif text-base text-[#1b1c1a] italic leading-snug">
                SEO • B2B Content • GEO &amp; AI Search
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Testimonial Strip Directly Under the Hero */}
      <motion.div
        className="max-w-[1280px] mx-auto mt-8 lg:mt-10 relative z-10"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1, margin: '80px 0px 0px 0px' }}
        transition={{
          duration: 0.45,
          delay: 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <figure className="bg-white/90 rounded-xl px-5 py-4 sm:px-6 sm:py-4 border border-[#e4e2df] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-6">
          <div className="flex items-start sm:items-center gap-3">
            <span
              aria-hidden="true"
              className="font-serif text-3xl sm:text-4xl leading-none text-[#994524]/40 select-none shrink-0 mt-0.5 sm:mt-0"
            >
              &ldquo;
            </span>
            <blockquote className="font-serif italic text-sm sm:text-base text-[#1b1c1a] leading-relaxed">
              &ldquo;Seapee raised the bar for our whole team. Her content structure and creative approach caught the eye before the first line was even read.&rdquo;
            </blockquote>
          </div>
          <figcaption className="text-xs text-[#546252] font-medium sm:whitespace-nowrap pl-6 sm:pl-0 shrink-0">
            <cite className="not-italic font-semibold text-[#1b1c1a]">Supradip Baul</cite>, Former Manager, Allied Analytics
          </figcaption>
        </figure>
      </motion.div>
    </section>
  );
};
