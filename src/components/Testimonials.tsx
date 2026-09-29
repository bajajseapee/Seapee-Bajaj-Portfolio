import React, { useState, useEffect } from 'react';

/**
 * ============================================================================
 * EDITABLE TESTIMONIALS DATA ARRAY
 * Edit, add, or reorder testimonials in this single array.
 * Set `featured: true` on the primary client highlight card.
 * ============================================================================
 */
export interface TestimonialItem {
  id: string;
  featured: boolean;
  badge: string;
  quote: string;
  shortQuote: string;
  name: string;
  title: string;
  initials: string;
  avatarBg: string;
  avatarText: string;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'maximillian-sloan-pwc',
    featured: true,
    badge: 'Client Feedback',
    quote:
      'I was very impressed with the speed and quality of information the team put together in a very short period, on a challenging and niche market. The personalised report was of fundamental importance to our work, and the team proved responsive and knowledgeable. I would enthusiastically use their services again for a similar piece of work.',
    shortQuote:
      "Impressed with the speed and quality of work on a challenging, niche market. Responsive, knowledgeable, and we'd enthusiastically use them again.",
    name: 'Maximillian Sloan',
    title: 'Strategy, PwC',
    initials: 'MS',
    avatarBg: 'bg-[#994524]',
    avatarText: 'text-white',
  },
  {
    id: 'supradip-baul-allied',
    featured: false,
    badge: 'Manager',
    quote:
      "Seapee did a commendable job on our AI Chip thought leadership article. The content structure and the creative way she put it together caught the reader's eye even before they got to the full text. She raised the bar for the entire team.",
    shortQuote:
      "Seapee did a commendable job on our AI Chip thought leadership article... She raised the bar for the entire team.",
    name: 'Supradip Baul',
    title: 'Former Manager, Allied Analytics',
    initials: 'SB',
    avatarBg: 'bg-[#546252]',
    avatarText: 'text-white',
  },
  {
    id: 'pawan-kumar-origius',
    featured: false,
    badge: 'Leadership',
    quote:
      'Seapee was part of a team that displayed a wonderful team effort in terms of quality, accuracy and timely response. Their hard work and positive attitude impressed a client from PwC, and this is the kind of involvement in which everyone is a winner.',
    shortQuote:
      'Displayed a wonderful team effort in terms of quality, accuracy and timely response — the kind of involvement in which everyone is a winner.',
    name: 'Pawan Kumar',
    title: 'CEO, Origius',
    initials: 'PK',
    avatarBg: 'bg-[#1b1c1a]',
    avatarText: 'text-white',
  },
];

export const Testimonials: React.FC = () => {
  const featuredItem =
    TESTIMONIALS_DATA.find((item) => item.featured) || TESTIMONIALS_DATA[0];
  const secondaryItems = TESTIMONIALS_DATA.filter(
    (item) => item.id !== featuredItem.id
  );

  // State for the "Short quote" ticker / carousel
  const [activeTickerIndex, setActiveTickerIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || TESTIMONIALS_DATA.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveTickerIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const currentTicker = TESTIMONIALS_DATA[activeTickerIndex];

  return (
    <section
      id="testimonials"
      className="w-full px-5 md:px-10 lg:px-16 py-14 lg:py-20 bg-[#fbf9f6] border-t border-[#e4e2df] relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Subtle ambient highlight glow */}
      <div
        className="absolute -top-24 right-10 w-96 h-96 rounded-full bg-[#994524]/6 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 left-10 w-80 h-80 rounded-full bg-[#d5e4cf]/35 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto relative z-10 flex flex-col gap-8 lg:gap-10">
        {/* Section Heading & Subheading */}
        <div className="flex flex-col items-center text-center gap-2.5 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#994524]">
            Endorsements &amp; Impact
          </span>
          <h2
            id="testimonials-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1b1c1a] font-bold tracking-tight"
          >
            What People Say
          </h2>
          <p className="text-base sm:text-lg text-[#55433c] leading-relaxed">
            Feedback from managers, leadership and clients.
          </p>
        </div>

        {/* 1. FEATURED CLIENT TESTIMONIAL CARD */}
        {featuredItem && (
          <figure className="relative bg-white rounded-2xl p-7 sm:p-10 lg:p-12 border border-[#dbc1b8] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
            {/* Top Accent Bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#994524] via-[#b85d3a] to-[#546252]"
              aria-hidden="true"
            />

            <div className="flex flex-col gap-6 relative z-10">
              {/* Top Row: Decorative Quotation Mark + Client Feedback Label */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <span
                  aria-hidden="true"
                  className="font-serif text-5xl sm:text-6xl leading-none text-[#994524]/25 select-none"
                >
                  &ldquo;
                </span>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#ffdbcf]/55 text-[#994524] text-xs font-bold uppercase tracking-wider">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#994524]"
                    aria-hidden="true"
                  />
                  {featuredItem.badge}
                </span>
              </div>

              {/* Featured Quote Text */}
              <blockquote className="font-serif italic text-xl sm:text-2xl lg:text-[26px] text-[#1b1c1a] leading-relaxed">
                <p>&ldquo;{featuredItem.quote}&rdquo;</p>
              </blockquote>

              {/* Attribution with Initials Circle Avatar */}
              <figcaption className="flex items-center gap-4 pt-4 border-t border-[#efeeeb]">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${featuredItem.avatarBg} ${featuredItem.avatarText} flex items-center justify-center font-semibold text-sm sm:text-base tracking-wider shrink-0 shadow-xs`}
                  aria-hidden="true"
                >
                  {featuredItem.initials}
                </div>
                <div className="flex flex-col">
                  <cite className="not-italic font-bold text-base sm:text-lg text-[#1b1c1a]">
                    {featuredItem.name}
                  </cite>
                  <span className="text-xs sm:text-sm text-[#546252] font-medium">
                    {featuredItem.title}
                  </span>
                </div>
              </figcaption>
            </div>
          </figure>
        )}

        {/* 2. SECONDARY TESTIMONIALS (Manager & CEO Side by Side on Desktop, Stacked on Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {secondaryItems.map((item) => (
            <figure
              key={item.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e4e2df] shadow-xs hover:shadow-md hover:border-[#dbc1b8] transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between gap-6"
            >
              <div className="flex flex-col gap-4">
                {/* Top Row: Subtle Quote Mark + Role Badge */}
                <div className="flex items-center justify-between gap-3">
                  <span
                    aria-hidden="true"
                    className="font-serif text-4xl leading-none text-[#994524]/25 select-none"
                  >
                    &ldquo;
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#f5f3f0] text-[#546252] text-[11px] font-bold uppercase tracking-wider">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#994524]"
                      aria-hidden="true"
                    />
                    {item.badge}
                  </span>
                </div>

                {/* Quote */}
                <blockquote className="font-serif italic text-base sm:text-lg text-[#1b1c1a] leading-relaxed">
                  <p>&ldquo;{item.quote}&rdquo;</p>
                </blockquote>
              </div>

              {/* Attribution with Initials Circle Avatar */}
              <figcaption className="flex items-center gap-3.5 pt-4 border-t border-[#efeeeb]">
                <div
                  className={`w-11 h-11 rounded-full ${item.avatarBg} ${item.avatarText} flex items-center justify-center font-semibold text-xs sm:text-sm tracking-wider shrink-0 shadow-2xs`}
                  aria-hidden="true"
                >
                  {item.initials}
                </div>
                <div className="flex flex-col">
                  <cite className="not-italic font-bold text-sm sm:text-base text-[#1b1c1a]">
                    {item.name}
                  </cite>
                  <span className="text-xs text-[#546252] font-medium">
                    {item.title}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* 3. ONE-LINE HIGHLIGHT STRIP */}
        <div className="text-center py-2">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#546252]">
            Trusted by clients, recognised by leadership.
          </p>
        </div>

        {/* 4. SHORT QUOTE CAROUSEL / TICKER */}
        <div
          className="bg-[#f5f3f0] rounded-xl px-5 py-4 sm:px-6 sm:py-4 border border-[#e4e2df] flex flex-col sm:flex-row items-center justify-between gap-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          aria-label="Short quote highlight ticker"
        >
          <div className="flex items-start sm:items-center gap-3 text-center sm:text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#994524] shrink-0 hidden sm:inline-block">
              Quick Highlight ·
            </span>
            <p className="text-xs sm:text-sm text-[#1b1c1a] italic font-serif">
              &ldquo;{currentTicker.shortQuote}&rdquo;{' '}
              <span className="not-italic font-sans font-semibold text-[#546252]">
                ({currentTicker.name}, {currentTicker.title.split(',')[1]?.trim() || currentTicker.title})
              </span>
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {TESTIMONIALS_DATA.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTickerIndex(idx)}
                aria-label={`Show short quote from ${item.name}`}
                aria-pressed={activeTickerIndex === idx}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  activeTickerIndex === idx
                    ? 'w-6 bg-[#994524]'
                    : 'w-2 bg-[#dbc1b8] hover:bg-[#994524]/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
