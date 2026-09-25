import React from 'react';

export const PhilosophyBanner: React.FC = () => {
  return (
    <section className="w-full bg-[#eae8e5] py-16 lg:py-20 px-5 md:px-10 lg:px-16 border-y border-[#e4e2df]">
      <div className="max-w-[1080px] mx-auto text-center flex flex-col items-center">
        <span className="material-symbols-outlined text-[#994524] text-4xl mb-3" aria-hidden="true">
          format_quote
        </span>
        <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1b1c1a] italic max-w-3xl leading-snug font-normal">
          “Useful content isn't just written. It's researched, structured, optimized, and refined.”
        </blockquote>
        <div className="w-16 h-[2px] bg-[#994524] mt-6" aria-hidden="true" />
      </div>
    </section>
  );
};
