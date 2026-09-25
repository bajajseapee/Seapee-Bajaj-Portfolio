import React, { useState } from 'react';
import { PROCESS_STEPS } from '../data/portfolioData';
import { ProcessStep } from '../types';

export const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState<ProcessStep | null>(null);

  return (
    <section className="w-full px-5 md:px-10 lg:px-16 py-20 lg:py-28 bg-[#fbf9f6]" id="process">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-12 lg:gap-16">
        {/* Header */}
        <div className="flex flex-col gap-2 max-w-xl">
          <span className="text-xs uppercase tracking-widest text-[#546252] font-semibold">
            System &amp; Craft
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1b1c1a] font-medium tracking-tight">
            How I Work
          </h2>
          <p className="text-base text-[#55433c] leading-relaxed">
            A methodical five-stage sequence delivering high factual rigor and strategic organic visibility.
          </p>
        </div>

        {/* Process Steps Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {PROCESS_STEPS.map((step) => {
            const isSelected = activeStep?.step === step.step;
            return (
              <div
                key={step.step}
                onClick={() => setActiveStep(isSelected ? null : step)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveStep(isSelected ? null : step);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-expanded={isSelected}
                aria-label={`Step ${step.step}: ${step.title}`}
                className={`bg-[#f5f3f0] p-5 rounded-xl flex flex-col justify-between h-full border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-[#994524] ring-1 ring-[#994524] bg-white shadow-sm'
                    : 'border-transparent hover:border-[#dbc1b8]'
                } focus-visible:outline-2 focus-visible:outline-[#994524]`}
              >
                <div>
                  <div className="w-8 h-8 rounded-full bg-[#994524] text-white text-xs font-semibold flex items-center justify-center mb-3">
                    {step.step}
                  </div>
                  <h3 className="font-serif text-lg text-[#1b1c1a] mb-2 font-medium">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#55433c] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-[#e4e2df]/60 flex items-center justify-between text-[11px] text-[#994524] font-semibold">
                  <span>{isSelected ? 'Collapse' : 'Inspect phase'}</span>
                  <span className="material-symbols-outlined text-[16px]">
                    {isSelected ? 'expand_less' : 'expand_more'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Expanded Phase Inspector Box */}
        {activeStep && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#dbc1b8] shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#efeeeb]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#994524]">
                  Phase {activeStep.step} Details
                </span>
                <h4 className="font-serif text-2xl text-[#1b1c1a] font-medium mt-0.5">
                  {activeStep.title} — Methodology &amp; Checkpoints
                </h4>
              </div>
              <button
                onClick={() => setActiveStep(null)}
                className="text-xs text-[#546252] hover:text-[#1b1c1a] px-3 py-1.5 rounded-lg border border-[#e4e2df] self-start md:self-center"
              >
                Close Details
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-[#1b1c1a] mb-3">
                  Key Activities &amp; Quality Gates
                </h5>
                <ul className="space-y-2">
                  {activeStep.activities.map((act, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[#55433c]">
                      <span className="material-symbols-outlined text-[#994524] text-[18px] shrink-0 mt-0.5">
                        task_alt
                      </span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#fbf9f6] p-5 rounded-xl border border-[#e4e2df] flex flex-col justify-center">
                <span className="text-xs uppercase tracking-wider text-[#546252] font-semibold block mb-1">
                  Phase Deliverable:
                </span>
                <p className="font-serif text-lg text-[#1b1c1a] font-medium">
                  {activeStep.output}
                </p>
                <p className="text-xs text-[#55433c] mt-2">
                  Fully verified before transitioning into subsequent production milestones.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
