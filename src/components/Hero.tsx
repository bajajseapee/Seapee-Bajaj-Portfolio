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
  isHomeRoute = true,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative w-full px-5 md:px-10 lg:px-16 py-7 sm:py-9 lg:py-11 overflow-hidden"
      aria-label="Introduction — Seapee Bajaj"
    >
      {/* Atmospheric subtle decorative aura */}
      <div className="absolute -top-32 right-1/4 w-96 h-96 rounded-full bg-[#994524]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-[#d5e4cf]/40 blur-2xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-center">
        {/* Left Column: Headline, One-Line Subtext & Single Primary CTA */}
        <div className="md:col-span-7 flex flex-col gap-3.5 z-10">
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-widest text-[#994524] font-semibold">
              Seapee Bajaj · B2B SEO, Content &amp; GEO
            </span>
          </div>

          {/* Main H1 Headline on Homepage, Styled Paragraph on Sub-Routes (ensuring exactly one H1 per page) */}
          {isHomeRoute ? (
            <h1 className="font-serif text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] text-[#1b1c1a] tracking-tight leading-[1.15] font-medium">
              B2B SEO Content Strategist, Research-Led and Reader-Focused
            </h1>
          ) : (
            <p className="font-serif text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] text-[#1b1c1a] tracking-tight leading-[1.15] font-medium">
              B2B SEO Content Strategist, Research-Led and Reader-Focused
            </p>
          )}

          {/* One-Line Subtext */}
          <p className="text-base sm:text-lg text-[#55433c] max-w-xl leading-relaxed font-normal">
            {PROFILE_INFO.subheadline}
          </p>

          {/* Single Primary CTA ("Get in touch" -> /contact) */}
          <div className="pt-1.5">
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                onWorkWithMe();
              }}
              className="inline-flex items-center justify-center text-sm font-semibold bg-[#b85d3a] hover:bg-[#994524] text-white transition-all px-6 py-3 rounded-lg shadow-sm hover:shadow active:scale-[0.98] cursor-pointer"
            >
              <span>Get in touch</span>
              <span className="material-symbols-outlined ml-1.5 text-[18px]" aria-hidden="true">
                arrow_forward
              </span>
            </a>
          </div>
        </div>

        {/* Right Column: Authentic Image with LCP Priority */}
        <div className="md:col-span-5 relative flex justify-center md:justify-end mt-2 md:mt-0">
          <div className="relative w-full max-w-[260px] sm:max-w-[300px] md:max-w-[330px] group">
            {/* Backing parchment mat */}
            <div className="absolute -inset-2.5 bg-[#eae8e5] rounded-xl -rotate-2 transition-transform duration-300 group-hover:-rotate-1 shadow-sm border border-[#e4e2df]" />

            {/* Authentic Photo */}
            <div className="relative overflow-hidden rounded-xl shadow-lg bg-white border border-[#eae8e5]">
              <img
                src={PROFILE_INFO.heroImage}
                alt="Seapee Bajaj — SEO Content Strategist, B2B Content & GEO Specialist"
                width={330}
                height={412}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Compact Testimonial Strip Directly Under the Hero */}
      <motion.div
        className="max-w-[1280px] mx-auto mt-6 lg:mt-8 relative z-10"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1, margin: '80px 0px 0px 0px' }}
        transition={{
          duration: 0.4,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <figure className="bg-white/90 rounded-xl px-4 py-3.5 sm:px-6 sm:py-4 border border-[#e4e2df] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6">
          <div className="flex items-start sm:items-center gap-2.5">
            <span
              aria-hidden="true"
              className="font-serif text-3xl leading-none text-[#994524]/40 select-none shrink-0 mt-0.5 sm:mt-0"
            >
              &ldquo;
            </span>
            <blockquote className="font-serif italic text-sm sm:text-base text-[#1b1c1a] leading-relaxed">
              &ldquo;Seapee raised the bar for our whole team. Her content structure and creative approach caught the eye before the first line was even read.&rdquo;
            </blockquote>
          </div>
          <figcaption className="text-xs text-[#546252] font-medium sm:whitespace-nowrap pl-5 sm:pl-0 shrink-0">
            <cite className="not-italic font-semibold text-[#1b1c1a]">Supradip Baul</cite>, Former Manager, Allied Analytics
          </figcaption>
        </figure>
      </motion.div>
    </section>
  );
};
