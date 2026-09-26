import React, { useEffect } from 'react';
import { ServiceItem } from '../types';
import { SERVICE_LOGOS } from './Services';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectInquiry: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onSelectInquiry,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  const logo = SERVICE_LOGOS[service.id];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-title"
    >
      <div
        className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl border border-[#e4e2df] p-6 sm:p-8 flex flex-col gap-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-[#efeeeb] transition-colors focus:outline-none"
          aria-label="Close dialog"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex items-center gap-4">
          {logo ? (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#fbf9f6] border border-[#e4e2df] overflow-hidden flex items-center justify-center shrink-0">
              <img
                src={logo.src}
                alt={logo.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-lg bg-[#efeeeb] flex items-center justify-center text-[#994524]">
              <span className="material-symbols-outlined text-2xl">{service.icon}</span>
            </div>
          )}
          <div>
            <span className="text-xs uppercase text-[#546252] font-semibold tracking-wider">
              {service.number}. {service.phase}
            </span>
            <h2 id="service-title" className="font-serif text-2xl text-[#1b1c1a] font-medium">
              {service.title}
            </h2>
          </div>
        </div>

        <p className="text-base text-[#55433c] leading-relaxed">
          {service.description}
        </p>

        {/* Deliverables */}
        <div className="border-t border-[#efeeeb] pt-4">
          <h3 className="text-xs uppercase font-semibold text-[#1b1c1a] tracking-wider mb-3">
            Core Scope &amp; Deliverables
          </h3>
          <ul className="space-y-2">
            {service.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-[#55433c]">
                <span className="material-symbols-outlined text-[#994524] text-[18px] shrink-0 mt-0.5">
                  check_circle
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Ideal For & Expected Outcome */}
        <div className="bg-[#fbf9f6] p-4 rounded-xl border border-[#e4e2df] flex flex-col gap-3 text-sm">
          <div>
            <span className="text-xs font-semibold text-[#1b1c1a] block">Ideal For:</span>
            <p className="text-[#55433c] mt-0.5">{service.idealFor}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-[#1b1c1a] block">Expected Impact:</span>
            <p className="text-[#55433c] mt-0.5">{service.outcome}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#efeeeb]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-[#55433c] hover:bg-[#efeeeb] rounded-lg transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onSelectInquiry(service.title);
            }}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-[#b85d3a] hover:bg-[#994524] rounded-lg shadow-sm transition-colors"
          >
            Inquire About {service.title}
          </button>
        </div>
      </div>
    </div>
  );
};
