import React, { useState } from 'react';
import { SITE_CONFIG, buildGmailComposeUrl } from '../config/siteConfig';
import { PortfolioIcon } from './PortfolioIcon';

interface ResumeSectionProps {
  onOpenResumeModal: () => void;
  onContactClick: () => void;
}

export const RESUME_DATA = {
  name: 'Seapee Bajaj',
  headline: 'B2B SEO Content & Editorial Strategist | GEO/AEO | Market Research',
  location: 'Lonavala, India (Open to Remote)',
  phone: '+91 8888010822',
  email: 'bajajseapee@gmail.com',
  linkedinDisplay: 'linkedin.com/in/seapeebajaj',
  linkedinUrl: 'https://www.linkedin.com/in/seapeebajaj',
  portfolioDisplay: 'seapee-bajaj-portfolio-3a8w-omega.vercel.app',
  portfolioUrl: 'https://seapee-bajaj-portfolio-3a8w-omega.vercel.app/',
  googleCallout: 'Google "Seapee Bajaj" to see my published work',
  summary:
    'B2B SEO Content & Editorial Strategist with 9+ years of experience across market research and content marketing. Leads content calendars, editorial workflows, and writer mentoring for B2B clients. Skilled in keyword research, on-page SEO, E-E-A-T, and GEO/AEO content built for AI-driven search. Grew a Quora research page from ~700 to 1,100+ followers at Grand View Research. Works independently from brief to delivery and turns complex research into clear, reader-friendly content.',
  coreSkills: [
    'Content Strategy',
    'Editorial Calendar Management',
    'B2B Content Writing',
    'SEO Content Writing',
    'Keyword Research',
    'Search Intent Mapping',
    'On-Page SEO',
    'Internal Linking',
    'Content Audits',
    'GEO / AEO',
    'E-E-A-T',
    'Market Research',
    'Competitive Intelligence',
    'Team Mentoring',
    'Editorial Workflows',
  ],
  toolCategories: [
    {
      label: 'SEO & Analytics',
      items: ['SEMrush', 'Google Search Console', 'Google Analytics (GA4)'],
    },
    {
      label: 'CMS & Content',
      items: ['WordPress', 'Microsoft Word', 'Google Docs'],
    },
    {
      label: 'AI Tools',
      items: ['ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Google AI Studio'],
    },
    {
      label: 'Productivity',
      items: ['Microsoft Excel', 'PowerPoint', 'Google Workspace'],
    },
    {
      label: 'Platforms',
      items: ['LinkedIn', 'Quora'],
    },
  ],
  experience: [
    {
      role: 'SEO Content Management Professional',
      company: 'Perfect Clicks LLC',
      meta: 'Freelance | Remote',
      period: 'January 2026 – April 2026',
      page: 1,
      bullets: [
        'Wrote and optimized SEO blogs, landing pages, and website content aligned to search intent, using keyword research in SEMrush.',
        'Implemented on-page SEO (headings, metadata, internal linking, keyword placement) across 30+ pages.',
        'Refreshed 15+ existing pages to improve rankings, relevance, and organic visibility.',
        'Collaborated with SEO and editorial teams to maintain content quality and performance.',
      ],
    },
    {
      role: 'Assistant Manager – Content Strategy & SEO (B2B)',
      company: 'IMARC Group',
      meta: 'Remote',
      period: 'August 2024 – November 2025',
      page: 1,
      bullets: [
        'Led end-to-end content strategy and execution for 8+ B2B clients, delivering SEO-optimized content across multiple digital platforms.',
        'Independently planned and managed content calendars, delivering 20+ pieces per month on time and aligned to brand voice and audience intent.',
        'Built and optimized editorial workflows for a team of 5+ writers, improving consistency, efficiency, and scalability of content production.',
        'Partnered with marketing, SEO, and research teams to turn business goals into data-driven B2B content strategies.',
        'Audited 100+ content pieces for quality, accuracy, and SEO, improving search visibility.',
        'Tracked content performance in GA4 and Search Console and iterated to drive lead generation and conversions.',
      ],
    },
    {
      role: 'Sr. Executive – Content Management',
      company: 'Grand View Research',
      meta: 'Pune, India',
      period: 'June 2021 – August 2024',
      page: 1,
      bullets: [
        'Grew the "Well of Insights" Quora page from 60–70 to 250+ average views per post and from ~700 to 1,100+ followers through research-led, answer-focused content.',
        'Created 250+ blogs, articles, listicles, and FAQs for the website and other platforms.',
        'Mentored 8+ associates in content writing and SEO optimization.',
        'Reviewed, edited, and distributed articles across platforms; created social media content for promotion.',
        'Collaborated with other departments to enhance content. Received the Best Content Writer award (January 2022).',
      ],
    },
    {
      role: 'Research Analyst & Sr. Research Analyst',
      company: 'The Insight Partners',
      meta: 'Pune, India',
      period: 'September 2018 – January 2021',
      page: 2,
      bullets: [
        'Delivered custom research solutions for exclusive client requirements; handled pre-sales and post-sales queries for 15+ clients.',
        'Trained team members on reports, proposals, write-ups, content improvement of market reports, and market estimation.',
        'Met targets and contributed to critical projects.',
      ],
    },
    {
      role: 'Research Associate & Sr. Research Associate',
      company: 'Allied Market Research',
      meta: 'Pune, India',
      period: 'January 2016 – July 2018',
      page: 2,
      bullets: [
        'Authored 20+ end-to-end market reports across ICT, Semiconductor, and Automotive domains, using primary and secondary research and data analysis.',
        'Built expertise in Market Estimation (ME) and handled pre-sales client calls and report queries.',
        'Managed multiple client projects; trained and mentored 10+ interns and new associates.',
      ],
    },
  ],
  education: [
    {
      degree: 'Master of Business Administration (Systems)',
      institution: 'Savitribai Phule Pune University (Sinhgad Institute)',
      score: '76.70%',
      period: '2014 – 2016',
    },
    {
      degree: 'Bachelor of Computer Applications',
      institution: 'Savitribai Phule Pune University (Sinhgad Institute)',
      score: '73.54%',
      period: '2011 – 2014',
    },
  ],
  certifications: [
    'Introduction to Generative Engine Optimization, Coursera (September 2026)',
    'Google Prompting Essentials, Google (September 2025) | Score: 97%',
    'Content Marketing Certification, HubSpot Academy (April 2025) | Score: 90%',
    'AI Tools Program, Be10x',
  ],
  achievements: [
    'Best Content Writer Award, Grand View Research (January 2022).',
    'Recognition Badge (Get Involved Reward) for research and content creation, My Need To Live, United Kingdom (April 2020).',
    'Positive client feedback from PwC for content quality, in-depth research, and timely delivery on a high-impact project.',
  ],
  publications: [
    'Author, "Not Unworthy" (poetry collection), Notion Press, December 2020.',
    '"A Study of Consumer Behavior and its Impact on Marketing" and "A Study of E-business Threats," ASM INCON XIII, International Conference on Ongoing Research in Management and IT (E-ISSN: 2320-0065).',
  ],
  keyMetrics: [
    { value: '9+ Yrs', label: 'Market Research & B2B SEO' },
    { value: '250+', label: 'Blogs, Articles & FAQs Created' },
    { value: '100+', label: 'B2B Content Pieces Audited' },
    { value: '1,100+', label: 'Quora Research Followers' },
  ],
};

export function triggerResumePrint() {
  window.print();
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({
  onOpenResumeModal,
  onContactClick,
}) => {
  const [activePageTab, setActivePageTab] = useState<'all' | 'page1' | 'page2'>('page1');

  const page1Experience = RESUME_DATA.experience.filter((item) => item.page === 1);
  const page2Experience = RESUME_DATA.experience.filter((item) => item.page === 2);

  return (
    <section
      id="resume"
      aria-labelledby="resume-section-heading"
      className="w-full px-5 md:px-10 lg:px-16 py-12 lg:py-16 bg-[#f5f3f0] border-t border-[#e4e2df]"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col gap-7 lg:gap-8">
        {/* Top Section Header & Strategic Action Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#994524]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#994524]" />
              <span>Official Curriculum Vitae • Ready for Recruiters &amp; Clients</span>
            </div>
            <h2
              id="resume-section-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1b1c1a] font-medium tracking-tight mt-2"
            >
              Resume &amp; Professional Dossier
            </h2>
            <p className="text-base text-[#55433c] mt-3 leading-relaxed">
              A complete view of my experience across B2B SEO content strategy, GEO/AEO optimization, editorial workflows, and market research—formatted for quick scanning on screen or fullscreen viewing.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenResumeModal}
              className="px-4 py-2.5 rounded-lg bg-[#994524] hover:bg-[#7b2f0f] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">fullscreen</span>
              <span>Open Fullscreen Resume</span>
            </button>

            <a
              href={buildGmailComposeUrl('Resume & Opportunity Inquiry — Seapee Bajaj')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-lg bg-white hover:bg-[#efeeeb] text-[#1b1c1a] border border-[#e4e2df] text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px] text-[#994524]">mail</span>
              <span>Request PDF Copy</span>
            </a>

            <button
              type="button"
              onClick={onContactClick}
              className="px-4 py-2.5 rounded-lg bg-white hover:bg-[#efeeeb] text-[#1b1c1a] border border-[#e4e2df] text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Discuss a Role or Project</span>
            </button>
          </div>
        </div>

        {/* At-a-Glance Quantified Resume Impact Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {RESUME_DATA.keyMetrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-white rounded-xl p-4 sm:p-5 border border-[#e4e2df] shadow-2xs flex flex-col justify-between"
            >
              <span className="font-serif text-2xl sm:text-3xl text-[#994524] font-medium">
                {metric.value}
              </span>
              <span className="text-xs text-[#55433c] font-semibold uppercase tracking-wider mt-1">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        {/* Page View Switcher (All / Page 1 / Page 2) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white px-5 py-3.5 rounded-xl border border-[#e4e2df]">
          <div className="flex items-center gap-2 text-xs text-[#55433c]">
            <PortfolioIcon name="menu_book" className="w-4 h-4 text-[#994524] shrink-0" />
            <span className="font-medium">
              Viewing <strong className="text-[#1b1c1a]">Seapee Bajaj&apos;s Official 2-Page Resume</strong>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Resume page view">
            <button
              type="button"
              role="tab"
              aria-selected={activePageTab === 'page1'}
              onClick={() => setActivePageTab('page1')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activePageTab === 'page1'
                  ? 'bg-[#994524] text-white'
                  : 'bg-[#fbf9f6] text-[#55433c] hover:bg-[#efeeeb]'
              }`}
            >
              Page 1 (Summary, Skills &amp; Recent Roles)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activePageTab === 'page2'}
              onClick={() => setActivePageTab('page2')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activePageTab === 'page2'
                  ? 'bg-[#994524] text-white'
                  : 'bg-[#fbf9f6] text-[#55433c] hover:bg-[#efeeeb]'
              }`}
            >
              Page 2 (Research Roles, Education &amp; Awards)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activePageTab === 'all'}
              onClick={() => setActivePageTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activePageTab === 'all'
                  ? 'bg-[#994524] text-white'
                  : 'bg-[#fbf9f6] text-[#55433c] hover:bg-[#efeeeb]'
              }`}
            >
              Both Pages
            </button>
          </div>
        </div>

        {/* Authentic Paper Resume Container */}
        <div className="grid grid-cols-1 gap-6 max-w-[1280px] mx-auto w-full">
          {/* ==================== PAGE 1 ==================== */}
          {(activePageTab === 'all' || activePageTab === 'page1') && (
            <article
              aria-label="Resume Page 1"
              className="bg-white rounded-2xl border border-[#dcd8d0] shadow-sm p-6 sm:p-8 flex flex-col gap-5 relative"
            >
              <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-[#88726b] font-semibold border-b border-[#efeeeb] pb-3">
                <span>Curriculum Vitae · Page 1 of 2</span>
                <span>Open to Remote Roles &amp; B2B Projects</span>
              </div>

              {/* Resume Document Header */}
              <header className="text-center flex flex-col items-center gap-1.5 pb-5 border-b-2 border-[#1b1c1a]">
                <h3 className="font-serif text-3xl sm:text-4xl text-[#1b1c1a] font-semibold tracking-tight">
                  {RESUME_DATA.name}
                </h3>
                <p className="text-sm sm:text-base font-semibold text-[#994524]">
                  {RESUME_DATA.headline}
                </p>
                <p className="text-xs sm:text-sm text-[#55433c] flex flex-wrap items-center justify-center gap-x-2 gap-y-1 mt-0.5">
                  <span>{RESUME_DATA.location}</span>
                  <span aria-hidden="true">|</span>
                  <span>{RESUME_DATA.phone}</span>
                  <span aria-hidden="true">|</span>
                  <a
                    href={buildGmailComposeUrl('Opportunity Inquiry — Seapee Bajaj')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1b1c1a] hover:text-[#994524] underline underline-offset-2"
                  >
                    {RESUME_DATA.email}
                  </a>
                </p>
                <p className="text-xs sm:text-sm text-[#55433c] flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                  <a
                    href={RESUME_DATA.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#994524] hover:underline font-medium"
                  >
                    {RESUME_DATA.linkedinDisplay}
                  </a>
                  <span aria-hidden="true">|</span>
                  <a
                    href={RESUME_DATA.portfolioUrl}
                    className="text-[#994524] hover:underline font-medium"
                  >
                    {RESUME_DATA.portfolioDisplay}
                  </a>
                </p>
                <p className="text-xs italic text-[#546252] font-medium mt-0.5">
                  {RESUME_DATA.googleCallout}
                </p>
              </header>

              {/* Professional Summary */}
              <section aria-labelledby="resume-p1-summary">
                <h4
                  id="resume-p1-summary"
                  className="text-xs font-bold uppercase tracking-widest text-[#994524] border-b border-[#e4e2df] pb-1.5 mb-3"
                >
                  Professional Summary
                </h4>
                <p className="text-sm sm:text-[15px] text-[#1b1c1a] leading-relaxed">
                  {RESUME_DATA.summary}
                </p>
              </section>

              {/* Core Skills */}
              <section aria-labelledby="resume-p1-skills">
                <h4
                  id="resume-p1-skills"
                  className="text-xs font-bold uppercase tracking-widest text-[#994524] border-b border-[#e4e2df] pb-1.5 mb-3"
                >
                  Core Skills
                </h4>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {RESUME_DATA.coreSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md bg-[#fbf9f6] border border-[#e4e2df] text-xs font-medium text-[#1b1c1a]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Tools & Platforms Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-[#fbf9f6] p-4 rounded-xl border border-[#e4e2df] text-xs">
                  {RESUME_DATA.toolCategories.map((cat) => (
                    <div key={cat.label} className="leading-relaxed">
                      <span className="font-bold text-[#1b1c1a]">{cat.label}: </span>
                      <span className="text-[#55433c]">{cat.items.join(', ')}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Professional Experience (Page 1) */}
              <section aria-labelledby="resume-p1-experience">
                <h4
                  id="resume-p1-experience"
                  className="text-xs font-bold uppercase tracking-widest text-[#994524] border-b border-[#e4e2df] pb-1.5 mb-4"
                >
                  Professional Experience
                </h4>

                <div className="flex flex-col gap-6">
                  {page1Experience.map((exp) => (
                    <div key={`${exp.company}-${exp.role}`} className="flex flex-col gap-1.5">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <h5 className="text-base font-bold text-[#1b1c1a]">{exp.role}</h5>
                        <span className="text-xs font-semibold text-[#546252] shrink-0">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm italic text-[#994524] font-medium">
                        {exp.company} | {exp.meta}
                      </p>
                      <ul className="mt-1 space-y-1.5 text-xs sm:text-sm text-[#55433c]">
                        {exp.bullets.map((b, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-[#994524] shrink-0 mt-2"
                              aria-hidden="true"
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </article>
          )}

          {/* ==================== PAGE 2 ==================== */}
          {(activePageTab === 'all' || activePageTab === 'page2') && (
            <article
              aria-label="Resume Page 2"
              className="bg-white rounded-2xl border border-[#dcd8d0] shadow-sm p-6 sm:p-8 flex flex-col gap-5 relative"
            >
              <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-[#88726b] font-semibold border-b border-[#efeeeb] pb-3">
                <span>Curriculum Vitae · Page 2 of 2</span>
                <span>{RESUME_DATA.name}</span>
              </div>

              {/* Earlier Market Research Experience (Page 2) */}
              <section aria-labelledby="resume-p2-experience">
                <h4
                  id="resume-p2-experience"
                  className="text-xs font-bold uppercase tracking-widest text-[#994524] border-b border-[#e4e2df] pb-1.5 mb-4"
                >
                  Professional Experience (Continued — Market Research Foundation)
                </h4>

                <div className="flex flex-col gap-6">
                  {page2Experience.map((exp) => (
                    <div key={`${exp.company}-${exp.role}`} className="flex flex-col gap-1.5">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <h5 className="text-base font-bold text-[#1b1c1a]">{exp.role}</h5>
                        <span className="text-xs font-semibold text-[#546252] shrink-0">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm italic text-[#994524] font-medium">
                        {exp.company} | {exp.meta}
                      </p>
                      <ul className="mt-1 space-y-1.5 text-xs sm:text-sm text-[#55433c]">
                        {exp.bullets.map((b, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-[#994524] shrink-0 mt-2"
                              aria-hidden="true"
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education */}
              <section aria-labelledby="resume-p2-education">
                <h4
                  id="resume-p2-education"
                  className="text-xs font-bold uppercase tracking-widest text-[#994524] border-b border-[#e4e2df] pb-1.5 mb-3"
                >
                  Education
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {RESUME_DATA.education.map((edu) => (
                    <div
                      key={edu.degree}
                      className="bg-[#fbf9f6] p-4 rounded-xl border border-[#e4e2df] flex flex-col justify-between gap-1"
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <h5 className="text-sm font-bold text-[#1b1c1a]">{edu.degree}</h5>
                        <span className="text-xs font-semibold text-[#994524] shrink-0">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-xs text-[#55433c]">
                        {edu.institution} | <strong className="text-[#1b1c1a]">{edu.score}</strong>
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Certifications & Achievements Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Certifications */}
                <section aria-labelledby="resume-p2-certifications">
                  <h4
                    id="resume-p2-certifications"
                    className="text-xs font-bold uppercase tracking-widest text-[#994524] border-b border-[#e4e2df] pb-1.5 mb-3"
                  >
                    Certifications
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#55433c]">
                    {RESUME_DATA.certifications.map((cert) => (
                      <li key={cert} className="flex items-start gap-2.5 leading-relaxed">
                        <PortfolioIcon
                          name="check_circle"
                          className="w-4 h-4 text-[#994524] shrink-0 mt-0.5"
                        />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Achievements */}
                <section aria-labelledby="resume-p2-achievements">
                  <h4
                    id="resume-p2-achievements"
                    className="text-xs font-bold uppercase tracking-widest text-[#994524] border-b border-[#e4e2df] pb-1.5 mb-3"
                  >
                    Achievements
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#55433c]">
                    {RESUME_DATA.achievements.map((ach) => (
                      <li key={ach} className="flex items-start gap-2.5 leading-relaxed">
                        <PortfolioIcon
                          name="award_star"
                          className="w-4 h-4 text-[#994524] shrink-0 mt-0.5"
                        />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* Publications */}
              <section aria-labelledby="resume-p2-publications">
                <h4
                  id="resume-p2-publications"
                  className="text-xs font-bold uppercase tracking-widest text-[#994524] border-b border-[#e4e2df] pb-1.5 mb-3"
                >
                  Publications
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#55433c]">
                  {RESUME_DATA.publications.map((pub) => (
                    <li key={pub} className="flex items-start gap-2.5 leading-relaxed">
                      <PortfolioIcon
                        name="menu_book"
                        className="w-4 h-4 text-[#994524] shrink-0 mt-0.5"
                      />
                      <span>{pub}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Bottom CTA Footer inside Page 2 */}
              <div className="pt-4 border-t border-[#efeeeb] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-[#546252]">
                  Interested in hiring Seapee Bajaj for remote B2B SEO, GEO/AEO, or editorial leadership?
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={onOpenResumeModal}
                    className="px-3.5 py-2 rounded-lg bg-[#efeeeb] hover:bg-[#eae8e5] text-[#1b1c1a] text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Fullscreen Modal View
                  </button>
                  <button
                    type="button"
                    onClick={onContactClick}
                    className="px-4 py-2 rounded-lg bg-[#b85d3a] hover:bg-[#994524] text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Get in Touch →
                  </button>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
};
