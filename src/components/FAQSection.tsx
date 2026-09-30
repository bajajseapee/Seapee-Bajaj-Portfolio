import React, { useState, useRef } from 'react';
import { FAQ_ITEMS } from '../data/portfolioData';
import { SECTION_BODY_COPY_CLASS } from './About';

interface FAQSectionProps {
  onNavigate?: (path: string, sectionId?: string) => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onNavigate }) => {
  // All answers are hidden by default until the visitor clicks a question
  const [openId, setOpenId] = useState<string | null>(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const visibleCount = showAllFaqs ? FAQ_ITEMS.length : Math.min(4, FAQ_ITEMS.length);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const total = visibleCount;
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

  const handleInternalLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
    sectionId: string
  ) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path, sectionId);
    }
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="w-full px-5 md:px-10 lg:px-16 py-8 sm:py-10 lg:py-12 bg-[#fbf9f6] border-t border-[#e4e2df]"
    >
      <div className="max-w-[900px] mx-auto flex flex-col gap-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#994524] font-semibold block mb-1.5">
            Quick Answers
          </span>
          <h2
            id="faq-heading"
            className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1b1c1a] font-medium tracking-tight"
          >
            Frequently Asked Questions
          </h2>
          <p className={`${SECTION_BODY_COPY_CLASS} mt-2`}>
            Common questions about Seapee Bajaj&apos;s background in research-led content, SEO, B2B writing, editorial workflows, and availability.
          </p>
        </div>

        {/* Accessible Accordion List (First 4 visible by default; remaining kept in DOM via sr-only until expanded) */}
        <div className="bg-white rounded-2xl border border-[#e4e2df] shadow-xs divide-y divide-[#e4e2df] overflow-hidden">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openId === item.id;
            const isCollapsedBeyondInitial4 = index >= 4 && !showAllFaqs;
            const buttonId = `faq-question-${item.id}`;
            const panelId = `faq-answer-${item.id}`;

            return (
              <div
                key={item.id}
                className={
                  isCollapsedBeyondInitial4
                    ? 'sr-only'
                    : `transition-colors duration-200 ${
                        isOpen ? 'bg-[#fbf9f6]/60' : 'bg-white hover:bg-[#fbf9f6]/40'
                      }`
                }
              >
                <h3 className="m-0">
                  <button
                    ref={(el) => {
                      buttonRefs.current[index] = el;
                    }}
                    id={buttonId}
                    type="button"
                    tabIndex={isCollapsedBeyondInitial4 ? -1 : 0}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => handleToggle(item.id)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-full text-left px-5 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between gap-4 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#994524]"
                  >
                    <span
                      className={`font-serif text-base sm:text-lg font-medium leading-snug transition-colors ${
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
                    <div className="px-5 sm:px-6 pb-4 pt-0.5 border-t border-transparent flex flex-col gap-2">
                      <p className={SECTION_BODY_COPY_CLASS}>{item.answer}</p>
                      {item.relatedLink && (
                        <div>
                          <a
                            href={item.relatedLink.path}
                            tabIndex={isCollapsedBeyondInitial4 || !isOpen ? -1 : 0}
                            onClick={(e) =>
                              handleInternalLink(
                                e,
                                item.relatedLink!.path,
                                item.relatedLink!.sectionId
                              )
                            }
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#994524] hover:underline"
                          >
                            <span>{item.relatedLink.label}</span>
                            <span className="material-symbols-outlined text-[14px]">
                              arrow_forward
                            </span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View all FAQs Toggle Button */}
        {FAQ_ITEMS.length > 4 && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllFaqs((prev) => !prev)}
              aria-expanded={showAllFaqs}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-white hover:bg-[#efeeeb] text-[#994524] border border-[#e4e2df] text-xs sm:text-sm font-semibold shadow-2xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#994524]"
            >
              <span>
                {showAllFaqs
                  ? 'Show fewer FAQs'
                  : `View all FAQs (${FAQ_ITEMS.length})`}
              </span>
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                {showAllFaqs ? 'expand_less' : 'expand_more'}
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
