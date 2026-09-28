export type PortfolioCategory =
  | 'All'
  | 'SEO & Content'
  | 'B2B'
  | 'Research'
  | 'Technology'
  | 'Consumer Insights';

export interface ProjectItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  type: string;
  category: 'SEO & Content' | 'B2B' | 'Research' | 'Technology' | 'Consumer Insights';
  categories: ('SEO & Content' | 'B2B' | 'Research' | 'Technology' | 'Consumer Insights')[];
  url: string;
  image?: string;
  platform?: string;
  year?: string;
  readTime?: string;
  deliverables?: string[];
  challenge?: string;
  approach?: string;
  keyInsights?: string[];
  sampleExcerpt?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  phase: string;
  title: string;
  description: string;
  icon: string;
  deliverables: string[];
  idealFor: string;
  outcome: string;
}

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  period?: string;
  focusSummary: string;
  highlights: string[];
  domains?: string[];
}

export interface DetailedCaseStudyItem {
  id: string;
  title: string;
  clientOrPlatform: string;
  category: string;
  focusAreas: string[];
  problem: string;
  research: string;
  strategy: string;
  execution: string;
  outcome: string;
  keyTakeaways: string[];
  externalUrl?: string;
}

export interface SeoGeoPillarItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  practices: string[];
}

export interface WritingTopicItem {
  id: string;
  slug: string;
  title: string;
  category: 'SEO Strategy' | 'GEO & AEO' | 'AI & Editorial' | 'B2B & Market Research';
  summary: string;
  keyQuestionsAnswered: string[];
  relatedServicePath: string;
  status: 'Topic Brief & Framework' | 'Published Perspective';
  externalUrl?: string;
}

export interface CreativeItem {
  id: string;
  title: string;
  author: string;
  tag: string;
  icon: string;
  description: string;
  sampleQuote?: string;
  medium?: string;
  url?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  activities: string[];
  output: string;
}

export interface ValuePoint {
  icon: string;
  headline: string;
  description: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  icon: string;
  subtext: string;
  detail: string;
}

export interface AwardItem {
  id: string;
  title: string;
  organization: string;
  year: string;
  badgeText: string;
  icon: string;
  description: string;
  highlight?: string;
  category: 'Award' | 'Client Commendation' | 'International Recognition' | 'Academic Publication';
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  relatedLink?: { label: string; path: string; sectionId: string };
}


