import React, { useState, useEffect } from 'react';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config/siteConfig';
import { WhatsAppIcon } from './WhatsAppIcon';

interface NavbarProps {
  onWorkTogether: () => void;
  onOpenWorkspace?: () => void;
  activeSection: string;
  currentPath?: string;
  onNavigate?: (path: string, sectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onWorkTogether,
  onOpenWorkspace,
  activeSection,
  currentPath = '/',
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '/about', id: 'about' },
    { name: 'Experience', href: '/market-research-content', id: 'experience' },
    { name: 'Services', href: '/services', id: 'services' },
    { name: 'Case Studies', href: '/case-studies', id: 'case-studies' },
    { name: 'Work', href: '/work', id: 'selected-work' },
    { name: 'SEO & GEO', href: '/geo-aeo', id: 'seo-geo-expertise' },
    { name: 'Writing', href: '/writing', id: 'writing' },
    { name: 'Book', href: '/book', id: 'published-work' },
    { name: 'Contact', href: '/contact', id: 'contact' },
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    sectionId: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(href, sectionId);
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
      <div className="h-20 max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16 flex items-center justify-between gap-4">
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

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive =
              activeSection === link.id ||
              (currentPath !== '/' && currentPath === link.href);
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href, link.id)}
                className={`py-1 text-xs sm:text-sm tracking-wide transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-[#994524] font-semibold border-b-2 border-[#994524]'
                    : 'text-[#55433c] hover:text-[#1b1c1a] font-medium'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Action Button & Avatar */}
        <div className="flex items-center gap-2.5 shrink-0">
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

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#fbf9f6] border-b border-[#e4e2df] px-6 py-5 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href, link.id)}
                  className={`py-1.5 text-base font-medium transition-colors ${
                    isActive
                      ? 'text-[#994524] font-semibold pl-2 border-l-2 border-[#994524]'
                      : 'text-[#55433c] hover:text-[#1b1c1a]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
            <div className="pt-3 mt-1 border-t border-[#eae8e5] flex flex-col gap-2">
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
