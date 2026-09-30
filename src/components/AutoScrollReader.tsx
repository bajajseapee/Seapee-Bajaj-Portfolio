import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Available auto-scroll speeds in pixels per second.
 */
export type ScrollSpeed = 20 | 40 | 80;

interface SpeedOption {
  label: 'Slow' | 'Normal' | 'Fast';
  value: ScrollSpeed;
}

const SPEED_OPTIONS: SpeedOption[] = [
  { label: 'Slow', value: 20 },
  { label: 'Normal', value: 40 },
  { label: 'Fast', value: 80 },
];

/**
 * Desktop Mini Table of Contents items mapping to the major H2 sections.
 */
interface TocItem {
  id: string;
  label: string;
}

const TOC_SECTIONS: TocItem[] = [
  { id: 'about', label: 'About Me' },
  { id: 'services', label: 'What I Can Help You With' },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'published-work', label: 'Not Unworthy' },
  { id: 'faq', label: 'FAQ' },
];

const HEADING_PAUSE_MS = 1500;
const BACK_TO_TOP_THRESHOLD_PX = 600;

export const AutoScrollReader: React.FC = () => {
  // Auto-scroll state (never starts automatically)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPausedAtHeading, setIsPausedAtHeading] = useState<boolean>(false);
  const [speed, setSpeed] = useState<ScrollSpeed>(40);
  const [showSpeedMenu, setShowSpeedMenu] = useState<boolean>(false);

  // Reduced motion & tooltip state
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [showReducedMotionTooltip, setShowReducedMotionTooltip] = useState<boolean>(false);

  // Scroll progress & Back-to-top visibility
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Active H2 section for the desktop mini Table of Contents
  const [activeTocId, setActiveTocId] = useState<string>('about');
  const [tocCollapsed, setTocCollapsed] = useState<boolean>(false);

  // Refs for requestAnimationFrame loop and heading pause tracking
  const controlsContainerRef = useRef<HTMLDivElement | null>(null);
  const tocContainerRef = useRef<HTMLElement | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);
  const subPixelAccumulatorRef = useRef<number>(0);
  const headingPauseUntilRef = useRef<number>(0);
  const pausedHeadingsSetRef = useRef< WeakSet<Element> >(new WeakSet());
  const isProgrammaticScrollRef = useRef<boolean>(false);

  // 1. Detect prefers-reduced-motion media query changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
      if (event.matches) {
        setIsPlaying(false);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 2. Track top scroll-progress bar and Back-to-top button visibility (600px threshold)
  useEffect(() => {
    const updateScrollMetrics = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;

      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));
      } else {
        setScrollProgress(0);
      }

      setShowBackToTop(scrollTop > BACK_TO_TOP_THRESHOLD_PX);
    };

    updateScrollMetrics();
    window.addEventListener('scroll', updateScrollMetrics, { passive: true });
    window.addEventListener('resize', updateScrollMetrics, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateScrollMetrics);
      window.removeEventListener('resize', updateScrollMetrics);
    };
  }, []);

  // 3. IntersectionObserver for the desktop sticky mini Table of Contents
  useEffect(() => {
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (!id) return;
          if (entry.isIntersecting) {
            ratios.set(id, entry.intersectionRatio);
          } else {
            ratios.delete(id);
          }
        });

        if (ratios.size > 0) {
          let bestId = '';
          let bestScore = -1;

          ratios.forEach((ratio, id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const distanceToReadingZone = Math.abs(rect.top - 130);
            const proximityScore = Math.max(0, 1 - distanceToReadingZone / window.innerHeight);
            const score = ratio * 0.55 + proximityScore * 0.45;
            if (score > bestScore) {
              bestScore = score;
              bestId = id;
            }
          });

          if (bestId) {
            setActiveTocId(bestId);
          }
        }
      },
      {
        root: null,
        rootMargin: '-88px 0px -50% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    TOC_SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Helper to stop auto-scroll cleanly
  const stopAutoScroll = useCallback(() => {
    setIsPlaying(false);
    setIsPausedAtHeading(false);
    headingPauseUntilRef.current = 0;
    lastFrameTimeRef.current = null;
    subPixelAccumulatorRef.current = 0;
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);

  // Toggle Play / Pause
  const toggleAutoScroll = useCallback(() => {
    if (prefersReducedMotion) {
      setShowReducedMotionTooltip(true);
      window.setTimeout(() => setShowReducedMotionTooltip(false), 4000);
      return;
    }

    setIsPlaying((prev) => {
      const next = !prev;
      if (next) {
        // If already at the very bottom of the page, scroll to top first or don't immediately stop
        const atBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 4;
        if (atBottom) {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
        pausedHeadingsSetRef.current = new WeakSet();
        lastFrameTimeRef.current = null;
        subPixelAccumulatorRef.current = 0;
        headingPauseUntilRef.current = 0;
      } else {
        setIsPausedAtHeading(false);
      }
      return next;
    });
  }, [prefersReducedMotion]);

  // 4. Keyboard shortcut ("A" key) to toggle auto-scroll, plus immediate pause on manual interaction
  useEffect(() => {
    const isEditableElement = (el: EventTarget | null): boolean => {
      if (!(el instanceof HTMLElement)) return false;
      const tagName = el.tagName.toLowerCase();
      return (
        tagName === 'input' ||
        tagName === 'textarea' ||
        tagName === 'select' ||
        el.isContentEditable
      );
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      // Press "A" (without modifier keys) outside inputs to toggle Play/Pause
      if (
        (event.key === 'a' || event.key === 'A') &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !isEditableElement(event.target)
      ) {
        event.preventDefault();
        toggleAutoScroll();
        return;
      }

      // Pause immediately if user presses navigation keys while auto-scrolling
      if (!isPlaying) return;
      const scrollKeys = [
        'ArrowUp',
        'ArrowDown',
        ' ',
        'Spacebar',
        'PageUp',
        'PageDown',
        'Home',
        'End',
        'Escape',
      ];
      if (scrollKeys.includes(event.key)) {
        stopAutoScroll();
      }
    };

    const handleWheelOrTouch = () => {
      if (isPlaying) {
        stopAutoScroll();
      }
    };

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!isPlaying) return;
      const target = event.target as Node | null;
      // Ignore clicks inside the auto-scroll widget itself (e.g. changing speed or clicking Pause)
      if (controlsContainerRef.current && target && controlsContainerRef.current.contains(target)) {
        return;
      }
      stopAutoScroll();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheelOrTouch, { passive: true });
    window.addEventListener('touchmove', handleWheelOrTouch, { passive: true });
    window.addEventListener('mousedown', handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheelOrTouch);
      window.removeEventListener('touchmove', handleWheelOrTouch);
      window.removeEventListener('mousedown', handlePointerDown);
    };
  }, [isPlaying, stopAutoScroll, toggleAutoScroll]);

  // 5. Smooth requestAnimationFrame auto-scroll loop with 1.5s pause on each major <h2> heading
  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      return;
    }

    const step = (timestamp: number) => {
      if (lastFrameTimeRef.current === null) {
        lastFrameTimeRef.current = timestamp;
      }

      const deltaMs = Math.min(64, timestamp - lastFrameTimeRef.current);
      lastFrameTimeRef.current = timestamp;

      // Check if we are currently in a 1.5s heading pause window
      if (timestamp < headingPauseUntilRef.current) {
        rafIdRef.current = requestAnimationFrame(step);
        return;
      } else if (headingPauseUntilRef.current !== 0) {
        headingPauseUntilRef.current = 0;
        setIsPausedAtHeading(false);
      }

      // Check if any visible major section heading (h2) just entered the reading focal zone
      const headings = document.querySelectorAll('main h2');
      const readingLineTop = 92;
      const readingLineBottom = 135;

      for (let i = 0; i < headings.length; i++) {
        const h2 = headings[i];
        if (pausedHeadingsSetRef.current.has(h2)) continue;

        const rect = h2.getBoundingClientRect();
        // Skip hidden / sr-only headings
        if (rect.width <= 1 || rect.height <= 1) continue;

        if (rect.top >= readingLineTop && rect.top <= readingLineBottom) {
          pausedHeadingsSetRef.current.add(h2);
          headingPauseUntilRef.current = timestamp + HEADING_PAUSE_MS;
          setIsPausedAtHeading(true);
          rafIdRef.current = requestAnimationFrame(step);
          return;
        }
      }

      // Accumulate sub-pixel movement for smooth motion at 20 / 40 / 80 px/sec
      subPixelAccumulatorRef.current += (speed * deltaMs) / 1000;
      const wholePixels = Math.floor(subPixelAccumulatorRef.current);

      if (wholePixels >= 1) {
        subPixelAccumulatorRef.current -= wholePixels;
        isProgrammaticScrollRef.current = true;
        window.scrollBy(0, wholePixels);
        isProgrammaticScrollRef.current = false;
      }

      // Stop automatically when reaching the bottom of the page
      const reachedBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (reachedBottom) {
        stopAutoScroll();
        return;
      }

      rafIdRef.current = requestAnimationFrame(step);
    };

    rafIdRef.current = requestAnimationFrame(step);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [isPlaying, speed, prefersReducedMotion, stopAutoScroll]);

  const handleTocClick = (sectionId: string) => {
    stopAutoScroll();
    setActiveTocId(sectionId);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  const handleBackToTop = () => {
    stopAutoScroll();
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <>
      {/* 1. Thin Fixed Top Scroll-Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none"
        role="progressbar"
        aria-label="Page reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollProgress)}
      >
        <div
          className="h-full bg-[#994524] transition-[width] duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. Desktop-Only Sticky Mini Table of Contents (H2 Sections) */}
      <aside
        ref={tocContainerRef}
        aria-label="Page sections table of contents"
        className="hidden xl:flex fixed left-5 top-1/2 -translate-y-1/2 z-40 flex-col"
      >
        <div className="bg-[#fbf9f6]/95 backdrop-blur-md border border-[#e4e2df] rounded-2xl shadow-md p-3 transition-all duration-200 max-w-[210px]">
          <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[#efeeeb]">
            <span className="text-[10px] uppercase tracking-widest text-[#994524] font-bold">
              On This Page
            </span>
            <button
              type="button"
              onClick={() => setTocCollapsed((prev) => !prev)}
              aria-expanded={!tocCollapsed}
              aria-label={tocCollapsed ? 'Expand table of contents' : 'Collapse table of contents'}
              className="p-1 rounded-md text-[#546252] hover:text-[#1b1c1a] hover:bg-[#efeeeb] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#994524]"
            >
              <span className="material-symbols-outlined text-[15px] leading-none" aria-hidden="true">
                {tocCollapsed ? 'unfold_more' : 'unfold_less'}
              </span>
            </button>
          </div>

          {!tocCollapsed && (
            <nav aria-label="Section jump links">
              <ul className="flex flex-col gap-1">
                {TOC_SECTIONS.map((item) => {
                  const isActive = activeTocId === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => handleTocClick(item.id)}
                        aria-current={isActive ? 'location' : undefined}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#994524] ${
                          isActive
                            ? 'bg-[#994524]/10 text-[#994524] font-semibold'
                            : 'text-[#55433c] hover:text-[#1b1c1a] hover:bg-[#efeeeb]/70 font-medium'
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`w-1.5 h-1.5 rounded-full shrink-0 transition-transform ${
                            isActive ? 'bg-[#994524] scale-125' : 'bg-[#d8d4ce]'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
        </div>
      </aside>

      {/* 3. Floating Bottom-Right Auto-Scroll Controls & Back-to-Top Button */}
      <div
        ref={controlsContainerRef}
        className="fixed bottom-16 right-3 sm:bottom-20 sm:right-5 z-40 flex flex-col items-end gap-2"
      >
        {/* Back to Top Button (Appears after scrolling 600px) */}
        {showBackToTop && (
          <button
            type="button"
            onClick={handleBackToTop}
            aria-label="Back to top"
            title="Back to top"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#fbf9f6]/95 hover:bg-white text-[#1b1c1a] hover:text-[#994524] border border-[#dbc1b8] shadow-md hover:shadow-lg transition-all duration-200 text-xs font-semibold cursor-pointer focus-visible:outline-2 focus-visible:outline-[#994524]"
          >
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              arrow_upward
            </span>
            <span className="hidden sm:inline">Back to top</span>
          </button>
        )}

        {/* Reduced Motion Explanatory Tooltip */}
        {(prefersReducedMotion && showReducedMotionTooltip) && (
          <div
            role="status"
            className="max-w-[240px] bg-[#1b1c1a] text-[#fbf9f6] text-[11px] leading-snug px-3 py-2 rounded-xl shadow-lg border border-[#55433c]"
          >
            Auto-scroll is disabled because &ldquo;Reduce Motion&rdquo; is enabled in your device settings.
          </div>
        )}

        {/* Speed Selector Popover (Slow 20 / Normal 40 / Fast 80) */}
        {showSpeedMenu && !prefersReducedMotion && (
          <div
            role="group"
            aria-label="Auto-scroll speed options"
            className="bg-[#fbf9f6] border border-[#dbc1b8] rounded-xl shadow-lg p-1.5 flex items-center gap-1"
          >
            {SPEED_OPTIONS.map((option) => {
              const isSelected = speed === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setSpeed(option.value);
                    setShowSpeedMenu(false);
                  }}
                  aria-pressed={isSelected}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#994524] ${
                    isSelected
                      ? 'bg-[#994524] text-white'
                      : 'text-[#55433c] hover:bg-[#efeeeb] hover:text-[#1b1c1a]'
                  }`}
                >
                  {option.label} ({option.value})
                </button>
              );
            })}
          </div>
        )}

        {/* Primary Floating Auto-Scroll Pill (Play/Pause + Speed Toggle) */}
        <div className="inline-flex items-center bg-[#fbf9f6]/95 backdrop-blur-md border border-[#dbc1b8] rounded-full shadow-md hover:shadow-lg transition-all p-1 gap-1">
          <button
            type="button"
            onClick={toggleAutoScroll}
            aria-pressed={isPlaying}
            aria-disabled={prefersReducedMotion}
            aria-label={
              prefersReducedMotion
                ? 'Auto-scroll disabled due to prefers-reduced-motion setting'
                : isPlaying
                ? 'Pause auto-scroll (Shortcut: A)'
                : 'Start auto-scroll (Shortcut: A)'
            }
            title={
              prefersReducedMotion
                ? 'Auto-scroll is disabled because prefers-reduced-motion is enabled'
                : isPlaying
                ? 'Pause auto-scroll (Press A)'
                : 'Start auto-scroll (Press A)'
            }
            onMouseEnter={() => {
              if (prefersReducedMotion) setShowReducedMotionTooltip(true);
            }}
            onMouseLeave={() => {
              if (prefersReducedMotion) setShowReducedMotionTooltip(false);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs font-semibold transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#994524] ${
              prefersReducedMotion
                ? 'bg-[#efeeeb] text-[#88726b] cursor-not-allowed'
                : isPlaying
                ? 'bg-[#994524] text-white'
                : 'bg-white hover:bg-[#ffdbcf]/40 text-[#1b1c1a] hover:text-[#994524]'
            }`}
          >
            <span className="material-symbols-outlined text-[17px] leading-none" aria-hidden="true">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
            <span>
              {isPlaying
                ? isPausedAtHeading
                  ? 'Reading…'
                  : 'Pause'
                : 'Auto-scroll'}
            </span>
          </button>

          {!prefersReducedMotion && (
            <button
              type="button"
              onClick={() => setShowSpeedMenu((prev) => !prev)}
              aria-expanded={showSpeedMenu}
              aria-label={`Change auto-scroll speed, current speed ${speed} pixels per second`}
              title="Change auto-scroll speed (Slow 20, Normal 40, Fast 80)"
              className="px-2.5 py-1.5 rounded-full text-[11px] font-bold text-[#546252] hover:text-[#994524] hover:bg-[#efeeeb] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#994524]"
            >
              {speed === 20 ? 'Slow' : speed === 40 ? 'Normal' : 'Fast'}
            </button>
          )}
        </div>
      </div>
    </>
  );
};
