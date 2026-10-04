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

          {/* Quick Summary Highlights Block Directly Under the H1 */}
          <div className="my-1.5 p-4 sm:p-5 rounded-2xl bg-[#f5f3f0]/90 border border-[#e4e2df] shadow-2xs">
            <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#55433c] leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#994524] shrink-0 mt-2" aria-hidden="true" />
                <span>
                  <strong className="text-[#1b1c1a] font-semibold">Who I am:</strong> B2B SEO content strategist and writer connecting analytical research depth with clear, reader-first storytelling.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#994524] shrink-0 mt-2" aria-hidden="true" />
                <span>
                  <strong className="text-[#1b1c1a] font-semibold">10+ years of experience:</strong> Proven track record across market research, B2B content creation, editorial workflows, and search strategy (IMARC Group, Grand View Research, Allied Market Research, and independent execution).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#994524] shrink-0 mt-2" aria-hidden="true" />
                <span>
                  <strong className="text-[#1b1c1a] font-semibold">Core services:</strong> B2B SEO content strategy, market research reports, search intent mapping, content refreshes, and Generative Engine Optimization (GEO &amp; AEO).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#994524] shrink-0 mt-2" aria-hidden="true" />
                <span>
                  <strong className="text-[#1b1c1a] font-semibold">Author &amp; editorial craft:</strong> Published author of the poetry collection <em>Not Unworthy</em> (Notion Press) and creator of high-engagement Q&amp;A content on Quora.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#994524] shrink-0 mt-2" aria-hidden="true" />
                <span>
                  <strong className="text-[#1b1c1a] font-semibold">Work with me:</strong> Open to select B2B content strategy, research-led writing, and SEO consulting projects —{' '}
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      onWorkWithMe();
                    }}
                    className="font-semibold text-[#994524] underline hover:text-[#7b2f0f] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#994524] rounded-xs"
                  >
                    Get in touch to discuss your content
                  </a>.
                </span>
              </li>
            </ul>
          </div>

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
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 sm:w-5 sm:h-5 text-[#994524] shrink-0 fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round"
                >
                  <path d="M11 17a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H11z" />
                  <path d="M18 10a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2a4 4 0 0 0 4 4h1" />
                  <path d="M14 6l4 4-4 4" />
                </svg>
                <span>Work with me</span>
              </button>

              <button
                type="button"
                onClick={onViewWork}
                className={heroButtonClass}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 sm:w-5 sm:h-5 text-[#994524] shrink-0 fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                <span>See my work</span>
              </button>

              <button
                type="button"
                onClick={handleCaseStudiesClick}
                className={heroButtonClass}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 sm:w-5 sm:h-5 text-[#994524] shrink-0 fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round"
                >
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
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
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 sm:w-5 sm:h-5 text-[#994524] shrink-0 fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                <span>View My book</span>
              </button>

              <button
                type="button"
                onClick={handleTestimonialsClick}
                className={heroButtonClass}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 sm:w-5 sm:h-5 text-[#994524] shrink-0 fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2 0 4-1 6-1 8zm13 0c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2 0 4-1 6-1 8z" />
                </svg>
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
