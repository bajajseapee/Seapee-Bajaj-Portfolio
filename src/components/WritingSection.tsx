import React from 'react';
import { WRITING_TOPICS } from '../data/portfolioData';

interface WritingSectionProps {
  onNavigate?: (path: string, sectionId?: string) => void;
}

export const WritingSection: React.FC<WritingSectionProps> = ({ onNavigate }) => {
  const handleInternalLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
    sectionId: string
  ) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path, sectionId);
    }
  };

  return (
    <section
      id="writing"
      className="w-full px-5 md:px-10 lg:px-16 py-12 lg:py-16 bg-[#f5f3f0] border-t border-[#e4e2df]"
      aria-labelledby="writing-heading"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col gap-8 lg:gap-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#994524] font-semibold">
              Editorial Perspectives &amp; Knowledge Hub
            </span>
            <h2
              id="writing-heading"
              className="font-serif text-3xl md:text-4xl text-[#1b1c1a] font-medium tracking-tight mt-2"
            >
              Writing on SEO Content, B2B Strategy, Market Research &amp; GEO
            </h2>
            <p className="text-base text-[#55433c] mt-3 leading-relaxed">
              A scalable editorial hub exploring how research methodology, search intent, human editing, and generative engine optimization come together in modern B2B content.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            <a
              href="/work"
              onClick={(e) => handleInternalLink(e, '/work', 'selected-work')}
              className="px-3.5 py-2 rounded-lg bg-white hover:bg-[#efeeeb] text-[#1b1c1a] border border-[#e4e2df] transition-colors"
            >
              Published Articles
            </a>
            <a
              href="/about"
              onClick={(e) => handleInternalLink(e, '/about', 'about')}
              className="px-3.5 py-2 rounded-lg bg-white hover:bg-[#efeeeb] text-[#1b1c1a] border border-[#e4e2df] transition-colors"
            >
              About Seapee Bajaj
            </a>
          </div>
        </div>

        {/* 6 Editorial Topic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WRITING_TOPICS.map((topic) => (
            <article
              key={topic.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e4e2df] shadow-xs hover:shadow-md hover:border-[#dbc1b8] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-[#546252] mb-2">
                  <span className="font-semibold text-[#994524] uppercase tracking-wider">
                    {topic.category}
                  </span>
                  <span>{topic.status}</span>
                </div>

                <p className="font-serif text-xl text-[#1b1c1a] font-medium leading-snug mb-3">
                  {topic.title}
                </p>

                <p className="text-sm text-[#55433c] leading-relaxed mb-4">
                  {topic.summary}
                </p>

                <div className="border-t border-[#efeeeb] pt-3.5">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#1b1c1a] block mb-2">
                    Core Questions Explored:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#55433c]">
                    {topic.keyQuestionsAnswered.map((q, qIdx) => (
                      <li key={qIdx} className="flex items-start gap-2">
                        <span
                          className="w-1 h-1 rounded-full bg-[#994524] shrink-0 mt-1.5"
                          aria-hidden="true"
                        />
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 mt-5 border-t border-[#efeeeb] flex items-center justify-between text-xs font-semibold">
                <a
                  href={topic.relatedServicePath}
                  onClick={(e) =>
                    handleInternalLink(
                      e,
                      topic.relatedServicePath,
                      topic.relatedServicePath === '/about'
                        ? 'about'
                        : topic.relatedServicePath === '/geo-aeo' ||
                          topic.relatedServicePath === '/seo-content'
                        ? 'seo-geo-expertise'
                        : topic.relatedServicePath === '/market-research-content'
                        ? 'experience'
                        : 'services'
                    )
                  }
                  className="text-[#994524] hover:underline inline-flex items-center gap-1"
                >
                  <span>Explore Related Expertise</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </a>
                <a
                  href="/contact"
                  onClick={(e) => handleInternalLink(e, '/contact', 'contact')}
                  className="text-[#546252] hover:text-[#1b1c1a]"
                >
                  Inquire
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
