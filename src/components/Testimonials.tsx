import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

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

const AUTO_ADVANCE_MS = 5500;

export const Testimonials: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  // State for the auto-cycling fade-in-out spotlight
  const [activeTickerIndex, setActiveTickerIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || TESTIMONIALS_DATA.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveTickerIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const currentItem = TESTIMONIALS_DATA[activeTickerIndex] || TESTIMONIALS_DATA[0];

  return (
    <section
      id="testimonials"
      className="w-full px-5 md:px-10 lg:px-16 py-14 lg:py-20 bg-[#fbf9f6] border-t border-[#e4e2df] relative overflow-hidden"
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
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

        {/* AUTO-CYCLING FEATURED SPOTLIGHT CARD WITH FADE-IN-OUT TRANSITION */}
        {currentItem && (
          <figure className="relative bg-white rounded-2xl p-7 sm:p-10 lg:p-12 border border-[#dbc1b8] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden min-h-[280px] sm:min-h-[260px] flex flex-col justify-between">
            {/* Top Accent Bar with Subtle Animated Progress Overlay */}
            <div
              className="absolute top-0 left-0 right-0 h-1.5 bg-[#efeeeb] overflow-hidden"
              aria-hidden="true"
            >
              <motion.div
                key={`${currentItem.id}-${isPaused ? 'paused' : 'playing'}`}
                className="h-full bg-gradient-to-r from-[#994524] via-[#b85d3a] to-[#546252]"
                initial={{ width: prefersReducedMotion ? '100%' : '0%' }}
                animate={{ width: '100%' }}
                transition={{
                  duration: prefersReducedMotion || isPaused ? 0.2 : AUTO_ADVANCE_MS / 1000,
                  ease: 'linear',
                }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 0, x: 16, filter: 'blur(2px)' }
                }
                animate={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 1, x: 0, filter: 'blur(0px)' }
                }
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: -16, filter: 'blur(2px)' }
                }
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-6 relative z-10 flex-1 justify-between"
              >
                {/* Top Row: Decorative Quotation Mark + Role Badge */}
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <span
                    aria-hidden="true"
                    className="font-serif text-5xl sm:text-6xl leading-none text-[#994524]/25 select-none"
                  >
                    &ldquo;
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#ffdbcf]/55 text-[#994524] text-xs font-bold uppercase tracking-wider">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-[#994524]"
                        aria-hidden="true"
                      />
                      {currentItem.badge}
                    </span>
                  </div>
                </div>

                {/* Featured Quote Text */}
                <blockquote className="font-serif italic text-xl sm:text-2xl lg:text-[26px] text-[#1b1c1a] leading-relaxed">
                  <p>&ldquo;{currentItem.quote}&rdquo;</p>
                </blockquote>

                {/* Attribution with Initials Circle Avatar + Slide Indicators */}
                <figcaption className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#efeeeb]">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${currentItem.avatarBg} ${currentItem.avatarText} flex items-center justify-center font-semibold text-sm sm:text-base tracking-wider shrink-0 shadow-xs`}
                      aria-hidden="true"
                    >
                      {currentItem.initials}
                    </div>
                    <div className="flex flex-col">
                      <cite className="not-italic font-bold text-base sm:text-lg text-[#1b1c1a]">
                        {currentItem.name}
                      </cite>
                      <span className="text-xs sm:text-sm text-[#546252] font-medium">
                        {currentItem.title}
                      </span>
                    </div>
                  </div>

                  {/* Subtle Reviewer Pill Selector */}
                  <div
                    className="flex items-center gap-1.5 self-start sm:self-center"
                    role="tablist"
                    aria-label="Select endorsement"
                  >
                    {TESTIMONIALS_DATA.map((item, idx) => {
                      const isActive = idx === activeTickerIndex;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          onClick={() => setActiveTickerIndex(idx)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#994524] text-white shadow-2xs'
                              : 'bg-[#fbf9f6] text-[#55433c] hover:bg-[#efeeeb] border border-[#e4e2df]'
                          }`}
                        >
                          {item.name.split(' ')[0]}
                        </button>
                      );
                    })}
                  </div>
                </figcaption>
              </motion.div>
            </AnimatePresence>
          </figure>
        )}
      </div>
    </section>
  );
};
