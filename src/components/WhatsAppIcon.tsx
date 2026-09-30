import React, { useState, useRef, useEffect } from 'react';
import {
  SITE_CONFIG,
  buildWhatsAppUrl,
  buildGmailComposeUrl,
  buildOutlookComposeUrl,
} from '../config/siteConfig';

interface WhatsAppIconProps {
  className?: string;
}

export const WhatsAppIcon: React.FC<WhatsAppIconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    <use href="#icon-whatsapp" />
  </svg>
);

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="fixed bottom-3 left-3 sm:bottom-5 sm:left-5 z-40 flex flex-col items-start">
      {/* Expandable Contact Menu mentioning WhatsApp and Email */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-white border border-[#e4e2df] rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#efeeeb]">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#994524] font-semibold block">
                Direct Channels
              </span>
              <p className="font-serif text-base text-[#1b1c1a] font-medium">
                Contact {SITE_CONFIG.NAME}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-[#55433c] hover:text-[#1b1c1a] hover:bg-[#efeeeb] transition-colors cursor-pointer"
              aria-label="Close contact options"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {/* Option 1: WhatsApp */}
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-xl bg-[#fbf9f6] hover:bg-[#f5f3f0] border border-[#e4e2df] transition-colors group"
            >
              <div className="w-9 h-9 rounded-lg bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                <WhatsAppIcon className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-semibold text-[#1b1c1a] block">
                  WhatsApp
                </span>
                <span className="text-[11px] text-[#55433c] truncate block">
                  Chat on WhatsApp
                </span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-[#546252] group-hover:text-[#1b1c1a]">
                open_in_new
              </span>
            </a>

            {/* Option 2: Email (with Gmail & Outlook options) */}
            <div className="p-3 rounded-xl bg-[#fbf9f6] border border-[#e4e2df] space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#ffdbcf]/60 text-[#994524] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-semibold text-[#1b1c1a] block">
                    Email
                  </span>
                  <span className="text-[11px] text-[#55433c] truncate block">
                    {SITE_CONFIG.EMAIL}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-0.5">
                <a
                  href={buildGmailComposeUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="px-2.5 py-1.5 rounded-lg bg-[#994524] hover:bg-[#7b2f0f] text-white text-[11px] font-semibold text-center transition-colors"
                >
                  Open in Gmail
                </a>
                <a
                  href={buildOutlookComposeUrl()}
                  onClick={() => setIsOpen(false)}
                  className="px-2.5 py-1.5 rounded-lg bg-[#1b1c1a] hover:bg-[#333531] text-white text-[11px] font-semibold text-center transition-colors"
                >
                  Open in Outlook
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Scroll Button: "Contact" (compact on mobile to avoid covering card text) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Open Contact Options (WhatsApp & Email)"
        className="group flex items-center gap-1.5 sm:gap-2.5 bg-[#994524] hover:bg-[#7b2f0f] text-white px-3 py-2 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
      >
        <span className="material-symbols-outlined text-[17px] sm:text-[20px]">
          {isOpen ? 'close' : 'chat'}
        </span>
        <span className="text-[11px] sm:text-xs font-semibold tracking-wide pr-0.5">
          Contact
        </span>
      </button>
    </div>
  );
};
