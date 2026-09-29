import React, { useState } from 'react';
import {
  SITE_CONFIG,
  BOOK_TESTIMONIALS,
  type BookTestimonial,
} from '../config/siteConfig';
import notUnworthyCover from '../assets/images/not_unworthy_book_cover_1790402940878.jpg';

interface BookTestimonialCardProps {
  testimonial: BookTestimonial;
}

export const BookTestimonialCard: React.FC<BookTestimonialCardProps> = ({
  testimonial,
}) => {
  const starCount = Math.max(0, Math.min(testimonial.rating, testimonial.maxRating));

  return (
    <div className="w-full flex flex-col items-center">
      {/* Soft-background, rounded, subtly shadowed testimonial card */}
      <figure className="w-full bg-[#fbf9f6] rounded-2xl p-6 sm:p-8 border border-[#e4e2df] shadow-xs flex flex-col items-center text-center gap-3.5 transition-shadow duration-200 hover:shadow-sm">
        {/* Headline in bold */}
        <h4 className="font-serif text-lg sm:text-xl font-bold text-[#1b1c1a] tracking-tight">
          {testimonial.headline}
        </h4>

        {/* 5 Filled Gold Stars with accessible aria-label */}
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
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.447a1 1 0 00-1.175 0l-3.368 2.447c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
            </svg>
          ))}
        </div>

        {/* Quote in italics with quotation marks using semantic <blockquote> */}
        <blockquote
          cite={testimonial.reviewUrl}
          className="font-serif italic text-base sm:text-lg text-[#1b1c1a] leading-relaxed max-w-xl"
        >
          <p>&ldquo;{testimonial.quote}&rdquo;</p>
        </blockquote>

        {/* Attribution using semantic <figcaption> and <cite> */}
        <figcaption className="text-xs sm:text-sm text-[#546252] font-medium pt-0.5">
          <cite className="not-italic font-semibold text-[#1b1c1a]">
            {testimonial.author}
          </cite>
          , {testimonial.sourceLabel}, {testimonial.dateLabel}
        </figcaption>
      </figure>

      {/* Small link button under the card */}
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
  );
};

interface BookTestimonialsSectionProps {
  testimonials?: BookTestimonial[];
  layout?: 'grid' | 'carousel';
}

export const BookTestimonialsSection: React.FC<BookTestimonialsSectionProps> = ({
  testimonials = BOOK_TESTIMONIALS,
  layout = 'grid',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const isSingle = testimonials.length === 1;
  const useCarousel = layout === 'carousel' && !isSingle;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

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

      {/* Reusable Layout: Centred Single Card, Responsive Multi-Card Grid, or Carousel */}
      {isSingle ? (
        <div className="w-full max-w-2xl mx-auto">
          <BookTestimonialCard testimonial={testimonials[0]} />
        </div>
      ) : useCarousel ? (
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-4">
          <BookTestimonialCard testimonial={testimonials[activeIndex]} />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#55433c] bg-[#fbf9f6] hover:bg-[#efeeeb] border border-[#e4e2df] transition-colors cursor-pointer"
              aria-label="Previous reader review"
            >
              Previous
            </button>
            <span className="text-xs text-[#546252] tabular-nums">
              {activeIndex + 1} / {testimonials.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#55433c] bg-[#fbf9f6] hover:bg-[#efeeeb] border border-[#e4e2df] transition-colors cursor-pointer"
              aria-label="Next reader review"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {testimonials.map((item) => (
            <BookTestimonialCard key={item.id} testimonial={item} />
          ))}
        </div>
      )}
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
                <img
                  src={notUnworthyCover}
                  alt="Not Unworthy paperback poetry book cover by Seapee Bajaj"
                  width={160}
                  height={240}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
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
