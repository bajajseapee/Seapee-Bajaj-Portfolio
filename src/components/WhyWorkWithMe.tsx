import React from 'react';
import { VALUE_PROPOSITIONS } from '../data/portfolioData';

export const WhyWorkWithMe: React.FC = () => {
  return (
    <section className="w-full px-5 md:px-10 lg:px-16 py-20 lg:py-28 bg-[#f5f3f0]" id="value-proposition">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Anchor */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <span className="text-xs uppercase tracking-widest text-[#546252] font-semibold">
            Value Proposition
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1b1c1a] font-medium tracking-tight">
            Why Work With Me
          </h2>
          <div className="w-12 h-[2px] bg-[#994524] my-2" />
          <p className="text-base md:text-lg text-[#55433c] leading-relaxed">
            Positioning content as a compounding business asset rather than ephemeral collateral.
          </p>

          {/* Inline Visual Micro-Badge */}
          <div className="mt-4 p-4 bg-white rounded-xl shadow-xs border border-[#e4e2df] flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#d5e4cf] flex items-center justify-center text-[#586656] shrink-0">
              <span className="material-symbols-outlined text-xl">verified</span>
            </div>
            <div>
              <span className="text-sm font-semibold text-[#1b1c1a] block">
                Analytical Rigor + Narrative Poise
              </span>
              <span className="text-xs text-[#546252]">
                Zero churn-and-burn content mills.
              </span>
            </div>
          </div>
        </div>

        {/* Right 5 Points */}
        <div className="lg:col-span-7 flex flex-col gap-3.5">
          {VALUE_PROPOSITIONS.map((point, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-5 rounded-xl shadow-xs border border-[#e4e2df] flex gap-4 items-start hover:border-[#dbc1b8] transition-colors"
            >
              <span className="material-symbols-outlined text-[#994524] text-2xl mt-0.5 shrink-0">
                {point.icon}
              </span>
              <p className="text-base text-[#1b1c1a] leading-relaxed font-normal">
                <strong className="font-semibold text-[#1b1c1a]">{point.headline}</strong>{' '}
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
