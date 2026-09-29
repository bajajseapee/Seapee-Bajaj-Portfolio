import React, { useState, useEffect, useMemo } from 'react';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config/siteConfig';
import { WhatsAppIcon } from './WhatsAppIcon';

interface NavbarProps {
  onWorkTogether: () => void;
  onOpenWorkspace?: () => void;
  activeSection: string;
  currentPath?: string;
  onNavigate?: (path: string, sectionId?: string) => void;
}

interface NavLinkItem {
  name: string;
  href: string;
  id: string;
  matchIds?: string[];
}

export const Navbar: React.FC<NavbarProps> = ({
  onWorkTogether,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [observedSection, setObservedSection] = useState<string>(activeSection || 'about');

  const navLinks: NavLinkItem[] = useMemo(
    () => [
      { name: 'About', href: '/about', id: 'about', matchIds: ['hero', 'about'] },
      {
        name: 'Experience',
        href: '/market-research-content',
        id: 'experience',
        matchIds: ['experience', 'awards'],
      },
      { name: 'Resume', href: '#resume', id: 'resume', matchIds: ['resume'] },
      { name: 'Services', href: '/services', id: 'services', matchIds: ['services', 'process'] },
      {
        name: 'Case Studies',
        href: '/case-studies',
        id: 'case-studies',
        matchIds: ['case-studies'],
      },
      { name: 'Work', href: '/work', id: 'selected-work', matchIds: ['selected-work'] },
      {
        name: 'SEO & GEO',
        href: '/geo-aeo',
        id: 'seo-geo-expertise',
        matchIds: ['seo-geo-expertise'],
      },
      {
        name: 'Writing',
        href: '/writing',
        id: 'writing',
        matchIds: ['writing', 'creative-work'],
      },
      { name: 'Book', href: '/book', id: 'published-work', matchIds: ['published-work'] },
      { name: 'Contact', href: '/contact', id: 'contact', matchIds: ['faq', 'contact'] },
    ],
    []
  );

  // Sync with parent activeSection prop when programmatic navigation occurs
  useEffect(() => {
    if (activeSection) {
      setObservedSection(activeSection);
    }
  }, [activeSection]);

  // IntersectionObserver to highlight the active nav link based on scroll position
  useEffect(() => {
    const sectionToNavId: Record<string, string> = {};
    navLinks.forEach((item) => {
      sectionToNavId[item.id] = item.id;
      item.matchIds?.forEach((matchId) => {
        sectionToNavId[matchId] = item.id;
      });
    });

    const targetIds = Object.keys(sectionToNavId);
    const visibleRatios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          if (!sectionId) return;

          if (entry.isIntersecting) {
            visibleRatios.set(sectionId, entry.intersectionRatio);
          } else {
            visibleRatios.delete(sectionId);
          }
        });

        if (visibleRatios.size > 0) {
          let bestId = '';
          let highestScore = -1;

          visibleRatios.forEach((ratio, sectionId) => {
            const element = document.getElementById(sectionId);
            if (!element) return;
            const rect = element.getBoundingClientRect();
            // Favor the section closest to the primary reading focal line (110px below top of viewport)
            const distanceFromFocalLine = Math.abs(rect.top - 110);
            const focalWeight = Math.max(0, 1 - distanceFromFocalLine / window.innerHeight);
            const combinedScore = ratio * 0.55 + focalWeight * 0.45;

            if (combinedScore > highestScore) {
              highestScore = combinedScore;
              bestId = sectionId;
            }
          });

          if (bestId && sectionToNavId[bestId]) {
            setObservedSection(sectionToNavId[bestId]);
          }
        }
      },
      {
        root: null,
        // Account for fixed 80px header and focus on upper-middle reading zone
        rootMargin: '-84px 0px -55% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    targetIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [navLinks]);

  // Track header elevation and long-form reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (currentScrollY / docHeight) * 100));
        setScrollProgress(progress);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentActiveId = observedSection || activeSection || 'about';
  const activeNavItem =
    navLinks.find(
      (link) => link.id === currentActiveId || link.matchIds?.includes(currentActiveId)
    ) || navLinks[0];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    sectionId: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setObservedSection(sectionId);

    if (sectionId === 'resume') {
      const resumeEl = document.getElementById('resume');
      if (resumeEl) {
        resumeEl.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    if (onNavigate) {
      onNavigate(href === '#resume' ? '/' : href, sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setObservedSection('about');
    if (onNavigate) {
      onNavigate('/', 'hero');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#fbf9f6]/95 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.06)]'
          : 'bg-[#fbf9f6]/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]'
      }`}
    >
      <div className="h-20 max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16 flex items-center justify-between gap-3">
        {/* Brand Zone */}
        <a
          href="/"
          onClick={handleLogoClick}
          className="group flex flex-col justify-center focus-visible:outline-2 focus-visible:outline-[#994524] shrink-0"
          aria-label="Seapee Bajaj Portfolio Home"
        >
          <span className="font-serif text-xl tracking-tight text-[#1b1c1a] group-hover:text-[#994524] transition-colors font-medium">
            {SITE_CONFIG.NAME}
          </span>
          <span className="text-[10px] sm:text-[11px] leading-[14px] uppercase tracking-wider text-[#546252] font-semibold">
            SEO • B2B Content • GEO &amp; AI Search
          </span>
        </a>

        {/* Desktop Navigation Links with IntersectionObserver Active State */}
        <nav className="hidden xl:flex items-center gap-1.5" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive =
              currentActiveId === link.id || Boolean(link.matchIds?.includes(currentActiveId));
            return (
              <a
                key={link.id}
                href={link.href}
                aria-current={isActive ? 'location' : undefined}
                onClick={(e) => handleLinkClick(e, link.href, link.id)}
                className={`relative px-2.5 py-1.5 rounded-lg text-xs sm:text-[13px] tracking-wide transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'text-[#994524] font-semibold bg-[#994524]/[0.08] shadow-[inset_0_0_0_1px_rgba(153,69,36,0.18)]'
                    : 'text-[#55433c] hover:text-[#1b1c1a] hover:bg-[#efeeeb]/70 font-medium'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="w-1.5 h-1.5 rounded-full bg-[#994524] shrink-0"
                    />
                  )}
                  <span>{link.name}</span>
                </span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#994524] rounded-full"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Button, Active Section Pill on Tablet/Mobile & Avatar */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Active Section Indicator Badge on screens below xl */}
          {activeNavItem && (
            <span
              className="xl:hidden hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#994524]/[0.08] border border-[#dbc1b8] text-[11px] font-semibold text-[#994524]"
              aria-live="polite"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#994524]" aria-hidden="true" />
              <span>{activeNavItem.name}</span>
            </span>
          )}

          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#efeeeb] hover:bg-[#eae8e5] border border-[#e4e2df] text-[#25D366] transition-all"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={onWorkTogether}
            className="hidden sm:inline-flex items-center justify-center text-xs sm:text-sm font-semibold bg-[#b85d3a] hover:bg-[#994524] text-white transition-all px-4 py-2 rounded-lg shadow-sm hover:shadow active:scale-[0.98] cursor-pointer"
          >
            Let's Talk
          </button>

          <a
            href="/about"
            onClick={(e) => handleLinkClick(e, '/about', 'about')}
            className="relative block w-9 h-9 rounded-full overflow-hidden ring-1 ring-[#dbc1b8] hover:ring-2 hover:ring-[#994524] transition-all shrink-0 bg-[#eae8e5]"
            title="About Seapee Bajaj"
          >
            <img
              src={SITE_CONFIG.AVATAR_IMAGE}
              alt="Seapee Bajaj — SEO Content Strategist"
              width={36}
              height={36}
              loading="eager"
              decoding="async"
              className="w-full h-full rounded-full object-cover object-[center_22%]"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== SITE_CONFIG.HERO_IMAGE) {
                  target.src = SITE_CONFIG.HERO_IMAGE;
                  return;
                }
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.innerHTML = `<div class="w-full h-full bg-[#b85d3a] text-white flex items-center justify-center text-xs font-bold font-serif">SB</div>`;
                }
              }}
            />
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-md text-[#55433c] hover:text-[#1b1c1a] hover:bg-[#eae8e5] transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Subtle Long-Form Reading Progress Bar */}
      <div
        className="w-full h-[2px] bg-transparent overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-[#994524] transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#fbf9f6] border-b border-[#e4e2df] px-6 py-5 shadow-lg animate-in slide-in-from-top duration-200 max-h-[calc(100dvh-5rem)] overflow-y-auto">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive =
                currentActiveId === link.id || Boolean(link.matchIds?.includes(currentActiveId));
              return (
                <a
                  key={link.id}
                  href={link.href}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={(e) => handleLinkClick(e, link.href, link.id)}
                  className={`py-2 px-3 rounded-lg text-base transition-all flex items-center justify-between ${
                    isActive
                      ? 'text-[#994524] font-semibold bg-[#994524]/[0.08] border-l-3 border-[#994524]'
                      : 'text-[#55433c] hover:text-[#1b1c1a] hover:bg-[#efeeeb]/60 font-medium'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-[#ffdbcf] text-[#994524]">
                      Viewing
                    </span>
                  )}
                </a>
              );
            })}
            <div className="pt-3 mt-2 border-t border-[#eae8e5] flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onWorkTogether();
                }}
                className="w-full text-center py-2.5 px-4 rounded-lg bg-[#b85d3a] hover:bg-[#994524] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Work With Me
              </button>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#efeeeb] hover:bg-[#eae8e5] border border-[#e4e2df] text-[#1b1c1a] text-sm font-semibold transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
