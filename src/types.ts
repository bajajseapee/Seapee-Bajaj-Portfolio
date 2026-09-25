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
  tag: string; // e.g. "Research / Industry Content", "B2B Content"
  description: string;
  type: string; // e.g. "Analysis Report", "Strategic Brief", "Seasonal Study"
  category: 'SEO & Content' | 'B2B' | 'Research' | 'Technology' | 'Consumer Insights';
  categories: ('SEO & Content' | 'B2B' | 'Research' | 'Technology' | 'Consumer Insights')[];
  url: string; // Direct link or placeholder URL (e.g. "https://example.com/project-name")
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
