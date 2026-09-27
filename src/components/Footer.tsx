import React from 'react';
import { SITE_CONFIG, buildGmailComposeUrl, buildWhatsAppUrl } from '../config/siteConfig';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FooterProps {
  onNavigate?: (path: string, sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleRouteClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
    sectionId: string
  ) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path, sectionId);
    } else {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="w-full bg-[#f5f3f0] shadow-[0_-1px_8px_rgba(0,0,0,0.02)] border-t border-[#e4e2df]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Identity */}
          <div className="md:col-span-4 flex flex-col gap-2.5">
            <a
              href="/"
              onClick={(e) => handleRouteClick(e, '/', 'hero')}
              className="font-serif text-2xl text-[#1b1c1a] font-medium hover:text-[#994524] transition-colors w-fit"
            >
              {SITE_CONFIG.NAME}
            </a>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#994524]">
              {SITE_CONFIG.TITLE}
            </span>
            <span className="text-xs font-medium text-[#546252]">
              {SITE_CONFIG.CORE_POSITIONING} · {SITE_CONFIG.SUPPORTING_POSITIONING}
            </span>
            <p className="text-sm text-[#55433c] max-w-sm leading-relaxed mt-1">
              Research-driven SEO content strategist with 9+ years of experience across market research, B2B content, SEO, content strategy, GEO, and AI search optimization.
            </p>
          </div>

          {/* Primary Navigation Links */}
          <div className="md:col-span-3 flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wider text-[#546252] font-semibold mb-1.5">
              Navigation
            </span>
            <div className="flex flex-col gap-2 text-sm text-[#55433c]">
              <a
                href="/about"
                onClick={(e) => handleRouteClick(e, '/about', 'about')}
                className="hover:text-[#994524] transition-colors w-fit"
              >
                About
              </a>
              <a
                href="/work"
                onClick={(e) => handleRouteClick(e, '/work', 'selected-work')}
                className="hover:text-[#994524] transition-colors w-fit"
              >
                Work
              </a>
              <a
                href="/services"
                onClick={(e) => handleRouteClick(e, '/services', 'services')}
                className="hover:text-[#994524] transition-colors w-fit"
              >
                Services
              </a>
              <a
                href="/case-studies"
                onClick={(e) => handleRouteClick(e, '/case-studies', 'case-studies')}
                className="hover:text-[#994524] transition-colors w-fit"
              >
                Case Studies
              </a>
              <a
                href="/writing"
                onClick={(e) => handleRouteClick(e, '/writing', 'writing')}
                className="hover:text-[#994524] transition-colors w-fit"
              >
                Writing
              </a>
              <a
                href="/book"
                onClick={(e) => handleRouteClick(e, '/book', 'published-work')}
                className="hover:text-[#994524] transition-colors w-fit"
              >
                Book — Not Unworthy
              </a>
              <a
                href="/contact"
                onClick={(e) => handleRouteClick(e, '/contact', 'contact')}
                className="hover:text-[#994524] transition-colors w-fit"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Core Expertise Routes */}
          <div className="md:col-span-3 flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wider text-[#546252] font-semibold mb-1.5">
              Focus Areas
            </span>
            <div className="flex flex-col gap-2 text-sm text-[#55433c]">
              <a
                href="/seo-content"
                onClick={(e) => handleRouteClick(e, '/seo-content', 'seo-geo-expertise')}
                className="hover:text-[#994524] transition-colors w-fit"
              >
                SEO Content Strategy
              </a>
              <a
                href="/geo-aeo"
                onClick={(e) => handleRouteClick(e, '/geo-aeo', 'seo-geo-expertise')}
                className="hover:text-[#994524] transition-colors w-fit"
              >
                GEO &amp; AEO Optimization
              </a>
              <a
                href="/b2b-content"
                onClick={(e) => handleRouteClick(e, '/b2b-content', 'services')}
                className="hover:text-[#994524] transition-colors w-fit"
              >
                B2B Content Writing
              </a>
              <a
                href="/market-research-content"
                onClick={(e) => handleRouteClick(e, '/market-research-content', 'experience')}
                className="hover:text-[#994524] transition-colors w-fit"
              >
                Market Research Content
              </a>
            </div>
          </div>

          {/* Verified Professional Profiles */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wider text-[#546252] font-semibold mb-1.5">
              Connect
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
                href={SITE_CONFIG.TOPMATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#994524] transition-colors w-fit"
              >
                Topmate
              </a>
              <a
                href={SITE_CONFIG.SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#994524] transition-colors w-fit"
              >
                Substack
              </a>
              <a
                href={SITE_CONFIG.PORTFOLIO_LINKS.QUORA_WELL_OF_INSIGHTS}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#994524] transition-colors w-fit"
              >
                Quora — Well of Insights
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
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#994524] transition-colors w-fit inline-flex items-center gap-1.5"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp</span>
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
            {SITE_CONFIG.SITE_NAME} · {SITE_CONFIG.LOCATION}
          </span>
        </div>
      </div>
    </footer>
  );
};
