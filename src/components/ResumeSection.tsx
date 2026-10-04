import React from 'react';
import { buildGmailComposeUrl } from '../config/siteConfig';

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
    'B2B SEO Content & Editorial Strategist with 10+ years of experience across market research and content marketing. Leads content calendars, editorial workflows, and writer mentoring for B2B clients. Skilled in keyword research, on-page SEO, E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness), and Generative & Answer Engine Optimization (GEO/AEO) for modern AI-driven search. Works independently from brief to delivery and turns complex research into clear, reader-friendly content.',
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
        'Grew the "Well of Insights" Quora page from 60–70 to 250+ average views per post through research-led, answer-focused content.',
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
    { value: '10+ Years', label: 'Market Research & B2B SEO' },
    { value: '250+', label: 'Blogs, Articles & FAQs Created' },
    { value: '100+', label: 'B2B Content Pieces Audited' },
    { value: '50+', label: 'B2B Client & Business Content Projects' },
  ],
};

export function triggerResumePrint() {
  window.print();
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({
  onOpenResumeModal,
  onContactClick,
}) => {
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
              A complete view of my experience across B2B SEO content strategy, GEO/AEO optimization, editorial workflows, and market research.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenResumeModal}
              className="px-5 py-2.5 rounded-lg bg-[#994524] hover:bg-[#7b2f0f] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">description</span>
              <span>View Resume</span>
            </button>

            <a
              href={buildGmailComposeUrl('Resume & Opportunity Inquiry — Seapee Bajaj')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-lg bg-white hover:bg-[#efeeeb] text-[#1b1c1a] border border-[#e4e2df] text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px] text-[#994524]" aria-hidden="true">mail</span>
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
      </div>
    </section>
  );
};
