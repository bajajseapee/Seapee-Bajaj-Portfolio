import React, { useState, useEffect } from 'react';

const BACK_TO_TOP_THRESHOLD_PX = 600;

export const AutoScrollReader: React.FC = () => {
  // Reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Scroll progress & Back-to-top visibility
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

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

      {/* 2. Back to Top Button (Appears after scrolling 600px) */}
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

