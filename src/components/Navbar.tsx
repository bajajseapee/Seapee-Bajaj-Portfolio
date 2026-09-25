import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';

interface NavbarProps {
  onWorkTogether: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onWorkTogether, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Selected Work', href: '#selected-work', id: 'selected-work' },
    { name: 'Process', href: '#process', id: 'process' },
    { name: 'Awards', href: '#awards', id: 'awards' },
    { name: 'Published Work', href: '#published-work', id: 'published-work' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#fbf9f6]/95 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.06)]'
          : 'bg-[#fbf9f6]/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]'
      }`}
    >
      <div className="h-20 max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16 flex items-center justify-between">
        {/* Brand Zone */}
        <a
          href="#"
          onClick={handleLogoClick}
          className="group flex flex-col justify-center focus-visible:outline-2 focus-visible:outline-[#994524]"
          aria-label="Seapee Bajaj Home"
        >
          <span className="font-serif text-xl tracking-tight text-[#1b1c1a] group-hover:text-[#994524] transition-colors font-medium">
            {SITE_CONFIG.NAME}
          </span>
          <span className="text-[11px] leading-[14px] uppercase tracking-widest text-[#546252] font-semibold">
            {SITE_CONFIG.TITLE}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`py-1 text-sm tracking-wide transition-colors ${
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
        <div className="flex items-center gap-4">
          <button
            onClick={onWorkTogether}
            className="hidden sm:inline-flex items-center justify-center text-sm font-semibold bg-[#b85d3a] hover:bg-[#994524] text-white transition-all px-4 py-2 rounded-lg shadow-sm hover:shadow active:scale-[0.98] cursor-pointer"
          >
            Let's Work Together
          </button>

          <a
            href="#about"
            onClick={(e) => handleLinkClick(e, '#about')}
            className="relative block w-9 h-9 rounded-full overflow-hidden ring-1 ring-[#dbc1b8] hover:ring-2 hover:ring-[#994524] transition-all"
            title="Seapee Bajaj"
          >
            <img
              src={SITE_CONFIG.AVATAR_IMAGE}
              alt="Seapee Bajaj profile thumbnail"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.innerHTML = `<div class="w-full h-full bg-[#b85d3a] text-white flex items-center justify-center text-xs font-bold font-serif">SB</div>`;
                }
              }}
            />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-[#55433c] hover:text-[#1b1c1a] hover:bg-[#eae8e5] transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
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
        <div className="lg:hidden bg-[#fbf9f6] border-b border-[#e4e2df] px-6 py-5 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`py-2 text-base font-medium transition-colors ${
                    isActive
                      ? 'text-[#994524] font-semibold pl-2 border-l-2 border-[#994524]'
                      : 'text-[#55433c] hover:text-[#1b1c1a]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
            <div className="pt-3 mt-1 border-t border-[#eae8e5]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onWorkTogether();
                }}
                className="w-full text-center py-2.5 px-4 rounded-lg bg-[#b85d3a] hover:bg-[#994524] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Let's Work Together
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
