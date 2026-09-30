import React from 'react';
import { FAQ_ITEMS } from '../data/portfolioData';
import { SECTION_BODY_COPY_CLASS } from './About';
import { FaqList } from './FaqList';

interface FAQSectionProps {
  onNavigate?: (path: string, sectionId?: string) => void;
  visibleCount?: number;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  onNavigate,
  visibleCount = 3,
}) => {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="w-full px-5 md:px-10 lg:px-16 py-12 lg:py-16 bg-[#fbf9f6] border-t border-[#e4e2df]"
    >
      <div className="max-w-[900px] mx-auto flex flex-col gap-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#994524] font-semibold block mb-2">
            Quick Answers
          </span>
          <h2
            id="faq-heading"
            className="font-serif text-3xl md:text-4xl text-[#1b1c1a] font-medium tracking-tight"
          >
            Frequently Asked Questions
          </h2>
          <p className={`${SECTION_BODY_COPY_CLASS} mt-3`}>
            Common questions about Seapee Bajaj&apos;s background in research-led content, SEO, B2B writing, editorial workflows, and availability.
          </p>
        </div>

        {/* Reusable Accessible FAQ Accordion with "View 8 more FAQs" / "View less" */}
        <FaqList
          items={FAQ_ITEMS}
          visibleCount={visibleCount}
          sectionId="faq"
          onNavigate={onNavigate}
        />
      </div>
    </section>
  );
};

