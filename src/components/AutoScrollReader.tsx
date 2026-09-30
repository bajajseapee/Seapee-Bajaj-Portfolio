import React, { useState, useEffect, useRef } from 'react';

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

const BACK_TO_TOP_THRESHOLD_PX = 600;

export const AutoScrollReader: React.FC = () => {
  // Reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Scroll progress & Back-to-top visibility
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Active H2 section for the desktop mini Table of Contents ("On This Page")
  const [activeTocId, setActiveTocId] = useState<string>('about');
  const [tocCollapsed, setTocCollapsed] = useState<boolean>(false);

  const tocContainerRef = useRef<HTMLElement | null>(null);

  // 1. Detect prefers-reduced-motion media query changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
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

  // 3. IntersectionObserver for the desktop sticky mini Table of Contents ("On This Page")
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

  const handleTocClick = (sectionId: string) => {
    setActiveTocId(sectionId);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  const handleBackToTop = () => {
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

      {/* 2. Desktop-Only Sticky Mini Table of Contents ("On This Page") */}
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

      {/* 3. Back to Top Button (Appears after scrolling 600px) */}
      {showBackToTop && (
        <div className="fixed bottom-16 right-3 sm:bottom-20 sm:right-5 z-40 flex flex-col items-end">
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
        </div>
      )}
    </>
  );
};
