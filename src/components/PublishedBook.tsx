import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';

export const PublishedBook: React.FC = () => {
  const { BOOK } = SITE_CONFIG;

  return (
    <section
      className="w-full px-5 md:px-10 lg:px-16 py-20 lg:py-28 bg-[#f5f3f0] border-t border-[#e4e2df] relative overflow-hidden"
      id="published-work"
      aria-labelledby="published-work-heading"
    >
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute top-1/2 -right-20 w-80 h-80 rounded-full bg-[#994524]/5 blur-3xl pointer-events-none" />

      <div className="max-w-[1080px] mx-auto bg-white p-8 sm:p-12 md:p-16 rounded-2xl shadow-sm border border-[#e4e2df] relative">
        <div className="flex flex-col gap-6">
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
              {BOOK.HEADLINE}
            </h2>
            <p className="text-lg sm:text-xl text-[#546252] font-medium leading-relaxed">
              {BOOK.SUBHEADLINE}
            </p>
          </div>

          {/* Concise Description */}
          <p className="text-base text-[#55433c] leading-relaxed max-w-3xl">
            {BOOK.DESCRIPTION}
          </p>

          {/* Publication Metadata Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 pb-2 text-xs text-[#55433c]">
            <div className="bg-[#fbf9f6] p-4 rounded-xl border border-[#e4e2df]">
              <span className="font-semibold text-[#1b1c1a] uppercase tracking-wider block text-[11px] mb-1">
                Collection
              </span>
              <p className="font-serif text-base text-[#1b1c1a] italic font-medium">
                {BOOK.TITLE}
              </p>
              <span className="text-[#546252] mt-0.5 block">{BOOK.GENRE} by {BOOK.AUTHOR}</span>
            </div>

            <div className="bg-[#fbf9f6] p-4 rounded-xl border border-[#e4e2df]">
              <span className="font-semibold text-[#1b1c1a] uppercase tracking-wider block text-[11px] mb-1">
                Key Themes
              </span>
              <p className="text-[#55433c] leading-relaxed">
                Resilience, consistency, everyday courage, and the quiet worth of ordinary lives.
              </p>
            </div>

            <div className="bg-[#fbf9f6] p-4 rounded-xl border border-[#e4e2df]">
              <span className="font-semibold text-[#1b1c1a] uppercase tracking-wider block text-[11px] mb-1">
                Publication Details
              </span>
              <p className="text-[#55433c] leading-relaxed">
                Published by {BOOK.PUBLISHER}
              </p>
              <span className="text-[#546252] mt-0.5 block">December 18, 2020</span>
            </div>
          </div>

          {/* Understated Editorial CTA */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#efeeeb]">
            <a
              href={BOOK.AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#994524] hover:bg-[#7b2f0f] transition-all px-6 py-3 rounded-lg shadow-sm hover:shadow active:scale-[0.98] w-fit"
              aria-label="Read or buy Not Unworthy on Amazon (opens in a new tab)"
            >
              <span>Read / Buy Not Unworthy</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>

            <span className="text-xs text-[#546252]">
              Available on Amazon in Paperback &amp; Kindle Edition
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
