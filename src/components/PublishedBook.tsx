import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  SITE_CONFIG,
  BOOK_TESTIMONIALS,
  type BookTestimonial,
} from '../config/siteConfig';
import notUnworthyCoverJpg from '../assets/images/not_unworthy_book_cover_1790402940878.jpg';
import notUnworthyCoverWebp from '../assets/images/not_unworthy_book_cover_1790402940878.webp';

interface BookTestimonialCardProps {
  testimonial: BookTestimonial;
}

export const BookTestimonialCard: React.FC<BookTestimonialCardProps> = ({
  testimonial,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const quoteRef = useRef<HTMLQuoteElement | null>(null);

  const starCount = Math.max(0, Math.min(testimonial.rating, testimonial.maxRating));
  const paragraphs = testimonial.quote.split(/\n\n+/).filter(Boolean);

  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;

    const checkOverflow = () => {
      if (!isExpanded && el) {
        setIsOverflowing(el.scrollHeight > el.clientHeight + 2);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [testimonial.quote, isExpanded]);

  return (
    <div className={`w-full h-full flex flex-col items-center ${!testimonial.reviewUrl ? 'pb-11' : ''}`}>
      {/* Soft-background, rounded, subtly shadowed testimonial card with equal height */}
      <figure className="w-full flex-1 bg-[#fbf9f6] rounded-2xl p-6 sm:p-8 border border-[#e4e2df] shadow-xs flex flex-col items-center justify-between text-center gap-3.5 transition-shadow duration-200 hover:shadow-sm">
        <div className="flex flex-col items-center gap-3.5 w-full">
          {/* Headline in bold */}
          <h4 className="font-serif text-lg sm:text-xl font-bold text-[#1b1c1a] tracking-tight">
            {testimonial.headline}
          </h4>

          {/* 5 Filled Gold Stars using deduplicated <symbol> + <use> */}
          {starCount === 5 && testimonial.maxRating === 5 ? (
            <svg
              role="img"
              aria-label="5 out of 5 stars"
              viewBox="0 0 116 20"
              className="h-4 sm:h-5 w-24 sm:w-28 text-[#d49a2a] fill-current"
            >
              <use href="#icon-five-stars" />
            </svg>
          ) : (
            <div
              role="img"
              aria-label={`${testimonial.rating} out of ${testimonial.maxRating} stars`}
              className="inline-flex items-center gap-1 text-[#d49a2a]"
            >
              {Array.from({ length: testimonial.maxRating }).map((_, idx) => (
                <svg
                  key={idx}
                  aria-hidden="true"
                  focusable="false"
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    idx < starCount ? 'text-[#d49a2a] fill-current' : 'text-[#e4e2df] fill-current'
                  }`}
                  viewBox="0 0 20 20"
                >
                  <use href="#icon-star" />
                </svg>
              ))}
            </div>
          )}

          {/* Quote in italics with quotation marks using semantic <blockquote> */}
          <blockquote
            ref={quoteRef}
            cite={testimonial.reviewUrl}
            className={`font-serif italic text-base sm:text-lg text-[#1b1c1a] leading-relaxed max-w-xl space-y-3 ${
              !isExpanded ? 'line-clamp-5 overflow-hidden' : ''
            }`}
          >
            {paragraphs.map((para, idx) => (
              <p key={idx}>&ldquo;{para}&rdquo;</p>
            ))}
          </blockquote>

          {/* Read more / Show less toggle (only appears when quote exceeds 5 lines) */}
          {(isOverflowing || isExpanded) && (
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-expanded={isExpanded}
              className="text-xs sm:text-sm font-semibold text-[#994524] hover:underline cursor-pointer focus-visible:outline-2 focus-visible:outline-[#994524]"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Attribution using semantic <figcaption> and <cite> */}
        <figcaption className="text-xs sm:text-sm text-[#546252] font-medium pt-0.5">
          <cite className="not-italic font-semibold text-[#1b1c1a]">
            {testimonial.author}
          </cite>
          {testimonial.sourceLabel ? `, ${testimonial.sourceLabel}` : ''}, {testimonial.dateLabel}
        </figcaption>
      </figure>

      {/* Small link button under the card (shown only on Vinay's card) */}
      {testimonial.reviewUrl && (
        <div className="min-h-[44px] flex items-center justify-center">
          <a
            href={testimonial.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-[#994524] bg-[#fbf9f6] hover:bg-[#efeeeb] border border-[#e4e2df] transition-colors shadow-2xs focus-visible:outline-2 focus-visible:outline-[#994524]"
            aria-label={`${testimonial.reviewLinkLabel || 'Read the full review on Amazon'} by ${testimonial.author} (opens in a new tab)`}
          >
            <span>{testimonial.reviewLinkLabel || 'Read the full review on Amazon'}</span>
            <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
              open_in_new
            </span>
          </a>
        </div>
      )}
    </div>
  );
};

interface BookTestimonialsSectionProps {
  testimonials?: BookTestimonial[];
}

export const BookTestimonialsSection: React.FC<BookTestimonialsSectionProps> = ({
  testimonials = BOOK_TESTIMONIALS,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToSlide = useCallback(
    (index: number) => {
      const total = testimonials.length;
      if (total === 0) return;
      const targetIndex = ((index % total) + total) % total;
      const slideEl = slideRefs.current[targetIndex];
      const trackEl = trackRef.current;
      if (slideEl && trackEl) {
        const slideLeft = slideEl.offsetLeft - trackEl.offsetLeft;
        trackEl.scrollTo({
          left: slideLeft,
          behavior: 'smooth',
        });
      }
      setActiveIndex(targetIndex);
    },
    [testimonials.length]
  );

  // Sync activeIndex when user swipes horizontally
  useEffect(() => {
    const trackEl = trackRef.current;
    if (!trackEl) return;

    const handleScroll = () => {
      const scrollCenter = trackEl.scrollLeft + trackEl.clientWidth / 2;
      let closestIdx = 0;
      let minDistance = Infinity;

      slideRefs.current.forEach((slideEl, idx) => {
        if (!slideEl) return;
        const slideCenter =
          slideEl.offsetLeft - trackEl.offsetLeft + slideEl.clientWidth / 2;
        const dist = Math.abs(scrollCenter - slideCenter);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      setActiveIndex(closestIdx);
    };

    trackEl.addEventListener('scroll', handleScroll, { passive: true });
    return () => trackEl.removeEventListener('scroll', handleScroll);
  }, [testimonials.length]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <div
      className="pt-4 border-t border-[#efeeeb] flex flex-col items-center gap-5"
      aria-labelledby="what-readers-say-heading"
    >
      {/* Section Header */}
      <div className="text-center flex flex-col items-center gap-1">
        <span className="text-[11px] uppercase tracking-widest text-[#994524] font-semibold">
          Reader Reflections
        </span>
        <h3
          id="what-readers-say-heading"
          className="font-serif text-xl sm:text-2xl text-[#1b1c1a] font-medium tracking-tight"
        >
          What Readers Say
        </h3>
      </div>

      {/* Horizontally Scrollable Carousel with Desktop Left/Right Arrows and Dots */}
      <div className="w-full max-w-3xl mx-auto relative flex items-center gap-3">
        {/* Desktop Left Arrow */}
        <button
          type="button"
          onClick={() => scrollToSlide(activeIndex - 1)}
          className="hidden md:inline-flex w-10 h-10 rounded-full bg-[#fbf9f6] hover:bg-[#efeeeb] border border-[#e4e2df] text-[#1b1c1a] hover:text-[#994524] items-center justify-center shrink-0 transition-colors shadow-2xs cursor-pointer focus-visible:outline-2 focus-visible:outline-[#994524]"
          aria-label="Previous reader review"
        >
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            chevron_left
          </span>
        </button>

        {/* Scroll-Snap Track: One card per view on mobile with a small peek of the next card */}
        <div
          ref={trackRef}
          className="w-full flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-1"
          role="region"
          aria-roledescription="carousel"
          aria-label="Reader reviews for Not Unworthy"
        >
          {testimonials.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => {
                slideRefs.current[idx] = el;
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${testimonials.length}: ${item.headline} by ${item.author}`}
              className="w-[88%] sm:w-[86%] md:w-full shrink-0 snap-start flex flex-col"
            >
              <BookTestimonialCard testimonial={item} />
            </div>
          ))}
        </div>

        {/* Desktop Right Arrow */}
        <button
          type="button"
          onClick={() => scrollToSlide(activeIndex + 1)}
          className="hidden md:inline-flex w-10 h-10 rounded-full bg-[#fbf9f6] hover:bg-[#efeeeb] border border-[#e4e2df] text-[#1b1c1a] hover:text-[#994524] items-center justify-center shrink-0 transition-colors shadow-2xs cursor-pointer focus-visible:outline-2 focus-visible:outline-[#994524]"
          aria-label="Next reader review"
        >
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            chevron_right
          </span>
        </button>
      </div>

      {/* Pagination Dots */}
      <div
        className="flex items-center justify-center gap-2 pt-1"
        role="tablist"
        aria-label="Choose reader review slide"
      >
        {testimonials.map((item, idx) => {
          const isCurrent = idx === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isCurrent}
              aria-label={`Go to review ${idx + 1}: ${item.author}`}
              onClick={() => scrollToSlide(idx)}
              className={`h-2 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#994524] ${
                isCurrent
                  ? 'w-6 bg-[#994524]'
                  : 'w-2 bg-[#d8d4ce] hover:bg-[#88726b]'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export const PublishedBook: React.FC = () => {
  const { BOOK } = SITE_CONFIG;

  return (
    <section
      className="w-full px-5 md:px-10 lg:px-16 py-12 lg:py-16 bg-[#f5f3f0] border-t border-[#e4e2df] relative overflow-hidden"
      id="published-work"
      aria-labelledby="published-work-heading"
    >
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute top-1/2 -right-20 w-80 h-80 rounded-full bg-[#994524]/5 blur-3xl pointer-events-none" />

      <div className="max-w-[1080px] mx-auto bg-white p-8 sm:p-12 md:p-16 rounded-2xl shadow-sm border border-[#e4e2df] relative">
        <div className="flex flex-col gap-6">
          {/* Top Row: Left Editorial Intro + Right Compact Book Cover */}
          <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-6 md:gap-10">
            <div className="flex-1 flex flex-col gap-4">
              {/* Credibility Tag */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#994524]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#994524]" />
                <span>{BOOK.CREDIBILITY_TAG}</span>
              </div>

              {/* Headline & Subheadline */}
              <div className="flex flex-col gap-2">
                <h2
                  id="published-work-heading"
                  className="font-serif text-3xl sm:text-4xl text-[#1b1c1a] font-medium tracking-tight leading-snug"
                >
                  {BOOK.TITLE} — My Published Poetry Collection
                </h2>
                <p className="text-lg sm:text-xl text-[#546252] font-medium leading-relaxed">
                  {BOOK.HEADLINE} {BOOK.SUBHEADLINE}
                </p>
              </div>

              {/* Concise Description */}
              <p className="text-base text-[#55433c] leading-relaxed max-w-2xl">
                {BOOK.DESCRIPTION}
              </p>
            </div>

            {/* Compact Book Cover on the Right */}
            <div className="shrink-0 flex flex-col items-center md:items-end">
              <a
                href={BOOK.AMAZON_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block w-32 sm:w-36 md:w-40 rounded-lg overflow-hidden shadow-md border border-[#e4e2df] bg-[#0f0c24] transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                aria-label="Buy Not Unworthy by Seapee Bajaj on Amazon"
              >
                <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-white/25 via-black/20 to-transparent z-10 pointer-events-none" />
                <Image
                  src={notUnworthyCoverJpg}
                  webpSrc={notUnworthyCoverWebp}
                  pictureClassName="contents"
                  sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, 160px"
                  alt="Not Unworthy paperback poetry book cover by Seapee Bajaj"
                  width={160}
                  height={240}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[2/3] object-cover block"
                />
              </a>
            </div>
          </div>

          {/* Publication Metadata Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 pb-2 text-xs text-[#55433c]">
            <div className="bg-[#fbf9f6] p-4 rounded-xl border border-[#e4e2df]">
              <span className="font-semibold text-[#1b1c1a] uppercase tracking-wider block text-[11px] mb-1">
                Book Title &amp; Authorship
              </span>
              <p className="font-serif text-base text-[#1b1c1a] italic font-medium">
                {BOOK.TITLE}
              </p>
              <span className="text-[#546252] mt-0.5 block">
                Written by me ({BOOK.AUTHOR}) · Poetry (Paperback)
              </span>
            </div>

            <div className="bg-[#fbf9f6] p-4 rounded-xl border border-[#e4e2df]">
              <span className="font-semibold text-[#1b1c1a] uppercase tracking-wider block text-[11px] mb-1">
                Themes I Explore
              </span>
              <p className="text-[#55433c] leading-relaxed">
                I explore resilience, consistency, everyday courage, and the quiet worth of ordinary lives.
              </p>
            </div>

            <div className="bg-[#fbf9f6] p-4 rounded-xl border border-[#e4e2df]">
              <span className="font-semibold text-[#1b1c1a] uppercase tracking-wider block text-[11px] mb-1">
                Publication Details
              </span>
              <p className="text-[#55433c] leading-relaxed">
                I published this collection with {BOOK.PUBLISHER}
              </p>
              <span className="text-[#546252] mt-0.5 block">{BOOK.PUBLICATION_DATE}</span>
            </div>
          </div>

          {/* What Readers Say Testimonial Section */}
          <BookTestimonialsSection testimonials={BOOK_TESTIMONIALS} />

          {/* Understated Editorial CTA */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#efeeeb]">
            <a
              href={BOOK.AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#994524] hover:bg-[#7b2f0f] transition-all px-6 py-3 rounded-lg shadow-sm hover:shadow active:scale-[0.98] w-fit"
              aria-label="Buy My Book — Not Unworthy by Seapee Bajaj on Amazon (opens in a new tab)"
            >
              <span>Buy My Book</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>

            <span className="text-xs text-[#546252]">
              Published Paperback Edition • Available on Amazon
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
