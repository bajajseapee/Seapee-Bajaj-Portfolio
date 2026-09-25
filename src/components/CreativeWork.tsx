import React, { useState } from 'react';
import { CREATIVE_WORKS } from '../data/portfolioData';
import { CreativeItem } from '../types';

export const CreativeWork: React.FC = () => {
  const [selectedPiece, setSelectedPiece] = useState<CreativeItem | null>(null);

  return (
    <section className="w-full px-5 md:px-10 lg:px-16 py-20 lg:py-28 bg-[#fbf9f6] relative overflow-hidden" id="creative">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-12 lg:gap-16">
        {/* Section Header */}
        <div className="flex flex-col max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-[#994524] font-semibold">
            Narrative &amp; Culture
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1b1c1a] font-medium tracking-tight mt-2">
            Beyond Business Content
          </h2>
          <p className="text-base text-[#55433c] mt-2 leading-relaxed">
            Writing isn't only my profession. It's also how I explore ideas, people, culture, and creativity.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CREATIVE_WORKS.map((work) => (
            <a
              key={work.id}
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#efeeeb] p-6 rounded-xl flex flex-col justify-between min-h-[224px] transition-transform duration-300 hover:-translate-y-1 cursor-pointer border border-transparent hover:border-[#dbc1b8] group focus-visible:outline-2 focus-visible:outline-[#994524] relative"
              aria-label={`Open ${work.title} (opens in a new tab)`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="material-symbols-outlined text-[#994524] text-2xl block group-hover:scale-110 transition-transform">
                    {work.icon}
                  </span>
                  {work.sampleQuote && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedPiece(work);
                      }}
                      className="text-gray-400 hover:text-[#994524] p-1 rounded transition-colors"
                      title="Read excerpt"
                      aria-label="Read excerpt"
                    >
                      <span className="material-symbols-outlined text-[18px]">format_quote</span>
                    </button>
                  )}
                </div>

                <h3 className="font-serif text-xl text-[#1b1c1a] font-medium leading-snug group-hover:text-[#994524] transition-colors">
                  {work.title}
                </h3>
                <p className="text-xs text-[#546252] mt-1 font-medium">
                  {work.author}
                </p>
              </div>

              <div className="pt-4 border-t border-[#e4e2df]/60 flex items-center justify-between">
                <span className="text-[11px] uppercase text-[#55433c] tracking-wider font-medium">
                  {work.tag}
                </span>
                <span className="material-symbols-outlined text-[16px] text-[#994524] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Creative Detail Modal for Quote Reading */}
      {selectedPiece && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedPiece(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#e4e2df] relative flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPiece(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-[#efeeeb] transition-colors"
              aria-label="Close dialog"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#994524] text-3xl">
                {selectedPiece.icon}
              </span>
              <div>
                <h3 className="font-serif text-2xl text-[#1b1c1a] font-medium">
                  {selectedPiece.title}
                </h3>
                <span className="text-xs text-[#546252] font-medium">
                  {selectedPiece.author} · {selectedPiece.tag}
                </span>
              </div>
            </div>

            <p className="text-sm text-[#55433c] leading-relaxed">
              {selectedPiece.description}
            </p>

            {selectedPiece.sampleQuote && (
              <blockquote className="bg-[#fbf9f6] border-l-2 border-[#994524] p-4 rounded-r-lg font-serif italic text-sm text-[#1b1c1a] leading-relaxed">
                "{selectedPiece.sampleQuote}"
              </blockquote>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-[#efeeeb]">
              <a
                href={selectedPiece.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#994524] hover:underline inline-flex items-center gap-1"
              >
                Visit Publication
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
              <button
                onClick={() => setSelectedPiece(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#b85d3a] hover:bg-[#994524] rounded-lg transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
