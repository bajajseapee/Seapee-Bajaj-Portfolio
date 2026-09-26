import React from 'react';
import { SITE_CONFIG, buildGmailComposeUrl } from '../config/siteConfig';

export const Footer: React.FC = () => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#f5f3f0] shadow-[0_-1px_8px_rgba(0,0,0,0.02)] border-t border-[#e4e2df]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          {/* Brand info */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <span className="font-serif text-2xl text-[#1b1c1a] font-medium">
              {SITE_CONFIG.NAME}
            </span>
            <p className="text-sm text-[#55433c] max-w-sm leading-relaxed">
              Content architecture and empirical SEO positioning tailored for intellectual authority and organic compound growth.
            </p>
          </div>

          {/* Quick Index Links */}
          <div className="md:col-span-4 flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wider text-[#546252] font-semibold mb-2">
              Index
            </span>
            <div className="flex flex-col gap-2 text-sm text-[#55433c]">
              <a
                href="#about"
                onClick={(e) => handleScrollTo(e, 'about')}
                className="hover:text-[#1b1c1a] transition-colors w-fit"
              >
                About
              </a>
              <a
                href="#services"
                onClick={(e) => handleScrollTo(e, 'services')}
                className="hover:text-[#1b1c1a] transition-colors w-fit"
              >
                Strategic Services
              </a>
              <a
                href="#selected-work"
                onClick={(e) => handleScrollTo(e, 'selected-work')}
                className="hover:text-[#1b1c1a] transition-colors w-fit"
              >
                Selected Work
              </a>
              <a
                href="#process"
                onClick={(e) => handleScrollTo(e, 'process')}
                className="hover:text-[#1b1c1a] transition-colors w-fit"
              >
                Editorial Method
              </a>
              <a
                href="#published-work"
                onClick={(e) => handleScrollTo(e, 'published-work')}
                className="hover:text-[#1b1c1a] transition-colors w-fit"
              >
                Published Work
              </a>
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, 'contact')}
                className="hover:text-[#1b1c1a] transition-colors w-fit"
              >
                Contact &amp; Inquiries
              </a>
            </div>
          </div>

          {/* External Presence */}
          <div className="md:col-span-3 flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wider text-[#546252] font-semibold mb-2">
              Presence
            </span>
            <div className="flex flex-col gap-2 text-sm text-[#55433c]">
              <a
                href={SITE_CONFIG.LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#994524] transition-colors w-fit"
              >
                LinkedIn
              </a>
              <a
                href={buildGmailComposeUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#994524] transition-colors w-fit"
              >
                Email
              </a>
              <a
                href={SITE_CONFIG.TOPMATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#994524] transition-colors w-fit"
              >
                Book on Topmate
              </a>
              <a
                href={SITE_CONFIG.SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#994524] transition-colors w-fit"
              >
                Substack &amp; Journal
              </a>
              <a
                href="#selected-work"
                onClick={(e) => handleScrollTo(e, 'selected-work')}
                className="hover:text-[#994524] transition-colors w-fit"
              >
                Editorial Folio
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-[#e4e2df] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#55433c]">
            © {new Date().getFullYear()} {SITE_CONFIG.NAME}. All rights reserved.
          </p>
          <span className="text-xs text-[#546252] font-medium">
            {SITE_CONFIG.LOCATION}
          </span>
        </div>
      </div>
    </footer>
  );
};
