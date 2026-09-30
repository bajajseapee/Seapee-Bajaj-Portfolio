import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { PROFILE_INFO } from '../data/portfolioData';

interface HeroProps {
  onWorkWithMe: () => void;
  onViewWork: () => void;
  onViewCaseStudies?: () => void;
  onReadBook?: () => void;
  onViewTestimonials?: () => void;
  onFilterTopic: (topic: string) => void;
  isHomeRoute?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onWorkWithMe,
  onViewWork,
  onViewCaseStudies,
  onReadBook,
  onViewTestimonials,
  onFilterTopic,
  isHomeRoute = true,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const handleTestimonialsClick = () => {
    if (onViewTestimonials) {
      onViewTestimonials();
      return;
    }
    const el = document.getElementById('testimonials');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCaseStudiesClick = () => {
    if (onViewCaseStudies) {
      onViewCaseStudies();
      return;
    }
    const el = document.getElementById('case-studies');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookClick = () => {
    if (onReadBook) {
      onReadBook();
      return;
    }
    const el = document.getElementById('published-work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const heroButtonClass =
    'w-full inline-flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-white hover:bg-[#ffdbcf]/40 text-[#1b1c1a] hover:text-[#994524] border border-[#dbc1b8] hover:border-[#994524] text-xs sm:text-sm font-semibold shadow-2xs hover:shadow-sm transition-all active:scale-[0.98] cursor-pointer text-left';

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
        {/* Left Column: Editorial Introduction */}
        <div className="md:col-span-7 flex flex-col gap-4 z-10">
          {/* Positioning Kicker */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs sm:text-sm uppercase tracking-widest text-[#994524] font-semibold">
              Seapee Bajaj · B2B SEO, Content &amp; GEO
            </span>
            <div className="inline-flex items-center gap-2 text-xs text-[#546252] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#994524]" />
              <span>{PROFILE_INFO.badge}</span>
            </div>
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

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-[#55433c] max-w-xl leading-relaxed font-normal">
            {PROFILE_INFO.subheadline}
          </p>

          {/* Supporting Tagline */}
          <p className="font-serif italic text-sm sm:text-base text-[#994524] font-medium">
            &ldquo;{PROFILE_INFO.supportingPositioning}&rdquo;
          </p>

          {/* 5 Uniform Action Buttons with Icons: 3 on One Side, 2 on the Other */}
          <div className="pt-2 grid grid-cols-2 gap-2.5 sm:gap-3 max-w-md items-start">
            {/* Left Side: 3 Buttons */}
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={onWorkWithMe}
                className={heroButtonClass}
              >
                <span
                  className="material-symbols-outlined text-[18px] sm:text-[20px] text-[#994524] shrink-0"
                  aria-hidden="true"
                >
                  handshake
                </span>
                <span>Work with me</span>
              </button>

              <button
                type="button"
                onClick={onViewWork}
                className={heroButtonClass}
              >
                <span
                  className="material-symbols-outlined text-[18px] sm:text-[20px] text-[#994524] shrink-0"
                  aria-hidden="true"
                >
                  work
                </span>
                <span>See my work</span>
              </button>

              <button
                type="button"
                onClick={handleCaseStudiesClick}
                className={heroButtonClass}
              >
                <span
                  className="material-symbols-outlined text-[18px] sm:text-[20px] text-[#994524] shrink-0"
                  aria-hidden="true"
                >
                  analytics
                </span>
                <span>Case studies</span>
              </button>
            </div>

            {/* Right Side: 2 Buttons */}
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleBookClick}
                className={heroButtonClass}
              >
                <span
                  className="material-symbols-outlined text-[18px] sm:text-[20px] text-[#994524] shrink-0"
                  aria-hidden="true"
                >
                  menu_book
                </span>
                <span>View My book</span>
              </button>

              <button
                type="button"
                onClick={handleTestimonialsClick}
                className={heroButtonClass}
              >
                <span
                  className="material-symbols-outlined text-[18px] sm:text-[20px] text-[#994524] shrink-0"
                  aria-hidden="true"
                >
                  format_quote
                </span>
                <span>Testimonials</span>
              </button>
            </div>
          </div>

          {/* Interactive Focus Area Filter Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-[#546252] font-semibold mr-1">
              Explore by focus:
            </span>
            {PROFILE_INFO.topics.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => onFilterTopic(topic)}
                className="px-3 py-1 rounded-md bg-[#efeeeb] hover:bg-[#ffdbcf]/60 text-[#55433c] hover:text-[#994524] text-xs font-medium transition-colors cursor-pointer border border-[#e4e2df]"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Authentic Image with LCP Priority */}
        <div className="md:col-span-5 relative flex justify-center md:justify-end mt-2 md:mt-0">
          <div className="relative w-full max-w-[290px] sm:max-w-[330px] md:max-w-[360px] group">
            {/* Backing parchment mat */}
            <div className="absolute -inset-3 bg-[#eae8e5] rounded-xl -rotate-2 transition-transform duration-300 group-hover:-rotate-1 shadow-sm border border-[#e4e2df]" />

            {/* Authentic Photo */}
            <picture className="relative block overflow-hidden rounded-xl shadow-lg bg-white border border-[#eae8e5]">
              <source
                type="image/webp"
                srcSet="/seapee-bajaj-portrait-360w.webp 360w, /seapee-bajaj-portrait.webp 512w"
                sizes="(max-width: 640px) 290px, (max-width: 768px) 330px, 360px"
              />
              <img
                src={PROFILE_INFO.heroImage}
                srcSet="/seapee-bajaj-portrait-360w.jpg 360w, /seapee-bajaj-portrait.jpg 512w"
                sizes="(max-width: 640px) 290px, (max-width: 768px) 330px, 360px"
                alt="Seapee Bajaj — SEO Content Strategist, B2B Content & GEO Specialist"
                width={360}
                height={450}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </picture>
          </div>
        </div>
      </div>

      {/* Compact Testimonial Strip Directly Under the Hero */}
      <motion.div
        className="max-w-[1280px] mx-auto mt-8 lg:mt-10 relative z-10"
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
