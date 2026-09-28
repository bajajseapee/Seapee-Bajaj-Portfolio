import React, { useState, useRef } from 'react';
import { FAQ_ITEMS } from '../data/portfolioData';

export const FAQSection: React.FC = () => {
  // All answers are collapsed by default until the visitor clicks a question
  const [openId, setOpenId] = useState<string | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const total = FAQ_ITEMS.length;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % total;
      buttonRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + total) % total;
      buttonRefs.current[prevIndex]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      buttonRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      buttonRefs.current[total - 1]?.focus();
    }
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="w-full px-5 md:px-10 lg:px-16 py-16 lg:py-24 bg-[#fbf9f6] border-t border-[#e4e2df]"
    >
      <div className="max-w-[920px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs uppercase tracking-widest text-[#994524] font-semibold block mb-2">
            Common Questions
          </span>
          <h2
            id="faq-heading"
            className="font-serif text-3xl sm:text-4xl text-[#1b1c1a] font-medium tracking-tight"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#55433c] mt-3 leading-relaxed">
            Quick answers about Seapee Bajaj&apos;s background in research-led content, B2B writing, SEO strategy, and editorial workflows.
          </p>
        </div>

        {/* Accessible Accordion List */}
        <div className="bg-white rounded-2xl border border-[#e4e2df] shadow-sm divide-y divide-[#e4e2df] overflow-hidden">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openId === item.id;
            const buttonId = `faq-question-${item.id}`;
            const panelId = `faq-answer-${item.id}`;

            return (
              <div
                key={item.id}
                className={`transition-colors duration-200 ${
                  isOpen ? 'bg-[#fbf9f6]/60' : 'bg-white hover:bg-[#fbf9f6]/40'
                }`}
              >
                <h3 className="m-0">
                  <button
                    ref={(el) => {
                      buttonRefs.current[index] = el;
                    }}
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => handleToggle(item.id)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-full text-left px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#994524]"
                  >
                    <span
                      className={`font-serif text-base sm:text-lg md:text-[19px] font-medium leading-snug transition-colors ${
                        isOpen
                          ? 'text-[#994524]'
                          : 'text-[#1b1c1a] group-hover:text-[#994524]'
                      }`}
                    >
                      {item.question}
                    </span>

                    <span
                      aria-hidden="true"
                      className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 ${
                        isOpen
                          ? 'border-[#994524] bg-[#994524] text-white rotate-180'
                          : 'border-[#d8d4ce] bg-[#fbf9f6] text-[#55433c] group-hover:border-[#994524] group-hover:text-[#994524]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px] leading-none">
                        expand_more
                      </span>
                    </span>
                  </button>
                </h3>

                {/* Crawlable Answer Panel: Always in DOM, visually collapsed until toggled */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  className={`grid transition-all duration-200 ease-out ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-7 pb-5 pt-0.5 text-sm sm:text-base text-[#55433c] leading-relaxed border-t border-transparent">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
