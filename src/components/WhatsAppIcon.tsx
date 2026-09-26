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
    className={className}
  >
    <path d="M12.031 2c-5.508 0-9.987 4.479-9.987 9.988 0 1.758.459 3.479 1.332 4.996L2 22l5.143-1.348c1.469.801 3.125 1.224 4.884 1.224h.004c5.508 0 9.988-4.479 9.988-9.988 0-2.669-1.039-5.178-2.926-7.064A9.927 9.927 0 0 0 12.031 2zm0 18.204h-.003c-1.488 0-2.946-.399-4.221-1.155l-.303-.18-3.051.8.815-2.974-.197-.314a8.279 8.279 0 0 1-1.275-4.405c0-4.577 3.724-8.301 8.305-8.301 2.218 0 4.303.864 5.87 2.432a8.248 8.248 0 0 1 2.431 5.871c0 4.578-3.725 8.302-8.304 8.302zm4.555-6.216c-.25-.125-1.477-.729-1.706-.812-.229-.083-.396-.125-.562.125-.167.25-.646.812-.791.979-.146.166-.292.187-.542.062-.25-.125-1.055-.389-2.01-1.24-.743-.662-1.245-1.481-1.391-1.731-.146-.25-.015-.385.11-.509.112-.112.25-.291.375-.437.125-.146.167-.25.25-.417.083-.166.042-.312-.021-.437-.062-.125-.562-1.354-.771-1.854-.203-.487-.409-.421-.562-.429l-.479-.008c-.167 0-.437.062-.667.312-.229.25-.875.854-.875 2.083s.896 2.416 1.021 2.583c.125.166 1.762 2.691 4.27 3.774.596.258 1.062.412 1.425.527.599.19 1.144.163 1.575.099.48-.072 1.477-.604 1.685-1.187.208-.583.208-1.083.146-1.187-.062-.104-.229-.166-.479-.291z" />
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
    <div ref={containerRef} className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expandable Contact Menu mentioning WhatsApp and Email */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-white border border-[#e4e2df] rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#efeeeb]">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#994524] font-semibold block">
                Direct Channels
              </span>
              <h4 className="font-serif text-base text-[#1b1c1a] font-medium">
                Contact {SITE_CONFIG.NAME}
              </h4>
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
                  {SITE_CONFIG.WHATSAPP_DISPLAY}
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

      {/* Floating Scroll Button: "Contact" */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Open Contact Options (WhatsApp & Email)"
        className="group flex items-center gap-2.5 bg-[#994524] hover:bg-[#7b2f0f] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
      >
        <span className="material-symbols-outlined text-[20px]">
          {isOpen ? 'close' : 'chat'}
        </span>
        <span className="text-xs font-semibold tracking-wide pr-0.5">
          Contact
        </span>
      </button>
    </div>
  );
};
