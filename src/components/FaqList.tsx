import React, { useState, useRef } from 'react';
import { SECTION_BODY_COPY_CLASS } from './About';

export interface FaqListItem {
  id?: string;
  question: string;
  answer: string;
  relatedLink?: {
    label: string;
    path: string;
    sectionId: string;
  };
}

export interface FaqListProps {
  /** Array of FAQ items ({ question, answer, ... }) to render in the DOM */
  items: FaqListItem[];
  /** Number of FAQs visible by default before clicking "View more" (default: 3) */
  visibleCount?: number;
  /** ID of the parent FAQ section to scroll back to when "View less" is clicked */
  sectionId?: string;
  /** Optional SPA navigation handler for internal related links */
  onNavigate?: (path: string, sectionId?: string) => void;
}

/**
 * Reusable, SEO-friendly FAQ Accordion List (`FaqList`)
 * - Shows the first `visibleCount` (default 3) FAQs initially.
 * - Keeps all remaining FAQs mounted in the DOM at all times for search engine and AI crawlers,
 *   hiding them visually with CSS max-height/grid-rows and overflow rather than conditional rendering.
 * - Includes an accessible "View {N} more FAQs" / "View less" toggle button with 300ms smooth animation
 *   and `prefers-reduced-motion` support.
 */
export const FaqList: React.FC<FaqListProps> = ({
  items,
  visibleCount = 3,
  sectionId = 'faq',
  onNavigate,
}) => {
  // All individual FAQ answers are collapsed by default; only one open at a time
  const [openId, setOpenId] = useState<string | null>(null);
  // Controls whether FAQs beyond `visibleCount` are visually expanded
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const listTopRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const safeVisibleCount = Math.max(1, Math.min(visibleCount, items.length));
  const initialItems = items.slice(0, safeVisibleCount);
  const remainingItems = items.slice(safeVisibleCount);
  const remainingCount = remainingItems.length;

  const getItemId = (item: FaqListItem, index: number) =>
    item.id || `faq-item-${index + 1}`;

  const handleToggleQuestion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleToggleViewMore = () => {
    if (isExpanded) {
      // If an answer inside the hidden range is currently open, close it on collapse
      const hiddenIds = new Set(
        remainingItems.map((item, idx) => getItemId(item, safeVisibleCount + idx))
      );
      if (openId && hiddenIds.has(openId)) {
        setOpenId(null);
      }

      setIsExpanded(false);

      // Gently scroll the user back to the top of the FAQ section
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const targetSection =
        (typeof document !== 'undefined' && document.getElementById(sectionId)) ||
        listTopRef.current;

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start',
        });
      }
    } else {
      setIsExpanded(true);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const activeTotal = isExpanded ? items.length : safeVisibleCount;
    if (activeTotal <= 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % activeTotal;
      buttonRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + activeTotal) % activeTotal;
      buttonRefs.current[prevIndex]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      buttonRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      buttonRefs.current[activeTotal - 1]?.focus();
    }
  };

  const handleInternalLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
    targetSectionId: string
  ) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path, targetSectionId);
    }
  };

  const renderFaqItem = (
    item: FaqListItem,
    index: number,
    isVisuallyHidden: boolean
  ) => {
    const itemId = getItemId(item, index);
    const isOpen = openId === itemId && !isVisuallyHidden;
    const buttonId = `faq-question-${itemId}`;
    const panelId = `faq-answer-${itemId}`;

    return (
      <div
        key={itemId}
        className={`transition-colors duration-200 motion-reduce:transition-none ${
          isOpen ? 'bg-[#fbf9f6]/60' : 'bg-white hover:bg-[#fbf9f6]/40'
        }`}
      >
        <div className="w-full">
          <button
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            id={buttonId}
            type="button"
            tabIndex={isVisuallyHidden ? -1 : 0}
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={() => handleToggleQuestion(itemId)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-full text-left px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#994524]"
          >
            <h3 className="m-0 p-0 text-left font-normal flex-1">
              <span
                className={`font-serif text-base sm:text-lg font-medium leading-snug transition-colors motion-reduce:transition-none ${
                  isOpen
                    ? 'text-[#994524]'
                    : 'text-[#1b1c1a] group-hover:text-[#994524]'
                }`}
              >
                {item.question}
              </span>
            </h3>

            {/* Chevron icon that rotates on toggle */}
            <span
              aria-hidden="true"
              className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 motion-reduce:transition-none ${
                isOpen
                  ? 'border-[#994524] bg-[#994524] text-white rotate-180'
                  : 'border-[#d8d4ce] bg-[#fbf9f6] text-[#55433c] group-hover:border-[#994524] group-hover:text-[#994524]'
              }`}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-none stroke-current stroke-[2] stroke-linecap-round stroke-linejoin-round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </button>
        </div>

        {/* Crawlable Answer Panel: Always in DOM, visually collapsed until toggled */}
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          aria-hidden={!isOpen}
          className={`grid transition-all duration-200 ease-out motion-reduce:transition-none ${
            isOpen
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0 pointer-events-none'
          }`}
        >
          <div className="overflow-hidden">
            <div className="px-5 sm:px-7 pb-5 pt-0.5 border-t border-transparent flex flex-col gap-2.5">
              <p className={SECTION_BODY_COPY_CLASS}>{item.answer}</p>
              {item.relatedLink && (
                <div>
                  <a
                    href={item.relatedLink.path}
                    tabIndex={isOpen && !isVisuallyHidden ? 0 : -1}
                    onClick={(e) =>
                      handleInternalLink(
                        e,
                        item.relatedLink!.path,
                        item.relatedLink!.sectionId
                      )
                    }
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#994524] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#994524] rounded-xs"
                  >
                    <span>{item.relatedLink.label}</span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="w-3.5 h-3.5 fill-none stroke-current stroke-[2] stroke-linecap-round stroke-linejoin-round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={listTopRef} className="flex flex-col gap-5">
      {/* Accordion Card Container */}
      <div className="bg-white rounded-2xl border border-[#e4e2df] shadow-xs overflow-hidden">
        {/* Initial Visible FAQs (First 3 by default) */}
        <div className="divide-y divide-[#e4e2df]">
          {initialItems.map((item, index) => renderFaqItem(item, index, false))}
        </div>

        {/* Remaining FAQs: Always kept in the DOM for SEO & AI crawlers, toggled via CSS */}
        {remainingCount > 0 && (
          <div
            id="faq-more-items"
            aria-hidden={!isExpanded}
            className={`grid transition-all duration-300 ease-in-out motion-reduce:transition-none ${
              isExpanded
                ? 'grid-rows-[1fr] opacity-100 border-t border-[#e4e2df]'
                : 'grid-rows-[0fr] opacity-0 pointer-events-none select-none'
            }`}
          >
            <div className="overflow-hidden divide-y divide-[#e4e2df]">
              {remainingItems.map((item, idx) =>
                renderFaqItem(item, safeVisibleCount + idx, !isExpanded)
              )}
            </div>
          </div>
        )}
      </div>

      {/* Secondary "View {N} more FAQs" / "View less" Toggle Button */}
      {remainingCount > 0 && (
        <div className="flex justify-center">
          <button
            type="button"
            aria-expanded={isExpanded}
            aria-controls="faq-more-items"
            onClick={handleToggleViewMore}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-[#d8d4ce] bg-white hover:bg-[#fbf9f6] hover:border-[#994524]/50 text-[#55433c] hover:text-[#994524] text-sm font-medium transition-colors duration-200 motion-reduce:transition-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#994524] focus-visible:ring-offset-2"
          >
            <span>
              {isExpanded
                ? 'View less'
                : `View ${remainingCount} more FAQ${remainingCount === 1 ? '' : 's'}`}
            </span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className={`w-4 h-4 fill-none stroke-current stroke-[2] stroke-linecap-round stroke-linejoin-round transition-transform duration-300 motion-reduce:transition-none ${
                isExpanded ? 'rotate-180' : ''
              }`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};
