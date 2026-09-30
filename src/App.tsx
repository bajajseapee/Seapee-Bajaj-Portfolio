import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { ResumeSection } from './components/ResumeSection';
import { Services } from './components/Services';
import { CaseStudies } from './components/CaseStudies';
import { Portfolio } from './components/Portfolio';
import { SeoGeoExpertise } from './components/SeoGeoExpertise';
import { WritingSection } from './components/WritingSection';
import { CreativeWork } from './components/CreativeWork';
import { PhilosophyBanner } from './components/PhilosophyBanner';
import { Process } from './components/Process';
import { WhyWorkWithMe } from './components/WhyWorkWithMe';
import { Testimonials } from './components/Testimonials';
import { Awards } from './components/Awards';
import { PublishedBook } from './components/PublishedBook';
import { FAQSection } from './components/FAQSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/WhatsAppIcon';
import { SEOHead } from './components/SEOHead';
import { FirebaseProvider } from './context/FirebaseContext';
import { SEO_ROUTES } from './config/siteConfig';
import { ProjectItem, ServiceItem, PortfolioCategory } from './types';

const AskSeapeeChatbot = lazy(() =>
  import('./components/AskSeapeeChatbot').then((m) => ({ default: m.AskSeapeeChatbot }))
);
const CaseStudyModal = lazy(() =>
  import('./components/CaseStudyModal').then((m) => ({ default: m.CaseStudyModal }))
);
const ServiceDetailModal = lazy(() =>
  import('./components/ServiceDetailModal').then((m) => ({ default: m.ServiceDetailModal }))
);
const ResumeModal = lazy(() =>
  import('./components/ResumeModal').then((m) => ({ default: m.ResumeModal }))
);
const EditorialWorkspaceModal = lazy(() =>
  import('./components/EditorialWorkspaceModal').then((m) => ({
    default: m.EditorialWorkspaceModal,
  }))
);

function normalizePathname(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  const cleaned = pathname.replace(/\/$/, '');
  return SEO_ROUTES[cleaned] ? cleaned : '/';
}

interface ScrollRevealSectionProps {
  children: React.ReactNode;
  delay?: number;
}

function ScrollRevealSection({ children, delay = 0 }: ScrollRevealSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className="w-full">{children}</div>;
  }

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0.92, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.01, margin: '120px 0px 0px 0px' }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    typeof window !== 'undefined' ? normalizePathname(window.location.pathname) : '/'
  );
  const [activeSection, setActiveSection] = useState<string>('about');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('All');
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState<boolean>(false);
  const [inquiryService, setInquiryService] = useState<string>('SEO Content Strategy');

  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleNavigate = useCallback(
    (path: string, sectionId?: string) => {
      const normalized = normalizePathname(path);
      setCurrentPath(normalized);
      if (typeof window !== 'undefined' && window.location.pathname !== normalized) {
        window.history.pushState({}, '', normalized);
      }
      const targetSection = sectionId || SEO_ROUTES[normalized]?.sectionId || 'hero';
      setTimeout(() => {
        scrollToSection(targetSection);
      }, 40);
    },
    [scrollToSection]
  );

  // Sync browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const normalized = normalizePathname(window.location.pathname);
      setCurrentPath(normalized);
      const targetSection = SEO_ROUTES[normalized]?.sectionId || 'hero';
      scrollToSection(targetSection);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [scrollToSection]);

  // On initial load on a specific route (e.g. /case-studies, /services), scroll to that section
  useEffect(() => {
    if (currentPath !== '/') {
      const routeInfo = SEO_ROUTES[currentPath];
      if (routeInfo && routeInfo.sectionId) {
        setTimeout(() => {
          scrollToSection(routeInfo.sectionId);
        }, 120);
      }
    }
  }, []);

  // Track active section for navigation highlighting using IntersectionObserver
  useEffect(() => {
    const sectionToNavId: Record<string, string> = {
      hero: 'about',
      about: 'about',
      experience: 'experience',
      resume: 'resume',
      services: 'services',
      'case-studies': 'case-studies',
      'selected-work': 'selected-work',
      'warehouse-management-systems': 'warehouse-management-systems',
      'seo-geo-expertise': 'seo-geo-expertise',
      writing: 'writing',
      'creative-work': 'writing',
      process: 'services',
      awards: 'experience',
      'published-work': 'published-work',
      faq: 'faq',
      contact: 'contact',
    };

    const observedIds = Object.keys(sectionToNavId);
    const intersectingMap = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (!id) return;
          if (entry.isIntersecting) {
            intersectingMap.set(id, entry.intersectionRatio);
          } else {
            intersectingMap.delete(id);
          }
        });

        if (intersectingMap.size > 0) {
          // Pick the section in the active viewport zone with the highest visibility / earliest position in the reading zone
          let bestSectionId = '';
          let bestScore = -1;

          intersectingMap.forEach((ratio, id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const rect = el.getBoundingClientRect();
            // Favor sections whose top is near or just above the reading line (120px from top)
            const distanceFromReadingLine = Math.abs(rect.top - 120);
            const proximityBonus = Math.max(0, 1 - distanceFromReadingLine / window.innerHeight);
            const score = ratio * 0.6 + proximityBonus * 0.4;
            if (score > bestScore) {
              bestScore = score;
              bestSectionId = id;
            }
          });

          if (bestSectionId && sectionToNavId[bestSectionId]) {
            setActiveSection(sectionToNavId[bestSectionId]);
          }
        }
      },
      {
        // Trigger when section crosses the upper-middle reading zone of the viewport (accounting for the 80px fixed navbar)
        root: null,
        rootMargin: '-88px 0px -52% 0px',
        threshold: [0, 0.1, 0.25, 0.4, 0.6, 0.8, 1],
      }
    );

    observedIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleWorkTogether = () => {
    handleNavigate('/contact', 'contact');
  };

  const handleViewWork = () => {
    handleNavigate('/work', 'selected-work');
  };

  const handleViewCaseStudies = () => {
    handleNavigate('/case-studies', 'case-studies');
  };

  const handleReadBook = () => {
    handleNavigate('/book', 'published-work');
  };

  const handleViewTestimonials = () => {
    scrollToSection('testimonials');
  };

  const handleFilterTopic = (topic: string) => {
    if (topic === 'SEO Content') {
      setActiveCategory('SEO & Content');
      handleNavigate('/work', 'selected-work');
    } else if (topic === 'B2B') {
      setActiveCategory('B2B');
      handleNavigate('/work', 'selected-work');
    } else if (topic === 'Research') {
      setActiveCategory('Research');
      handleNavigate('/work', 'selected-work');
    } else if (topic === 'GEO & AI Search') {
      handleNavigate('/geo-aeo', 'seo-geo-expertise');
    } else if (topic === 'Content Strategy') {
      handleNavigate('/services', 'services');
    } else {
      setActiveCategory('All');
      handleNavigate('/work', 'selected-work');
    }
  };

  const handleSelectInquiry = (serviceTitle: string) => {
    setInquiryService(serviceTitle);
    handleNavigate('/contact', 'contact');
  };

  const activeRouteConfig = SEO_ROUTES[currentPath] || SEO_ROUTES['/'];
  const isHomeRoute = currentPath === '/';

  return (
    <FirebaseProvider>
      <SEOHead currentPath={currentPath} />
      <GoogleAnalytics gaId="G-6BMZ8XCK2T" />

      <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] flex flex-col antialiased selection:bg-[#ffdbcf] selection:text-[#994524]">
        {/* Fixed Navigation Bar */}
        <Navbar
          onWorkTogether={handleWorkTogether}
          onOpenWorkspace={() => setIsWorkspaceOpen(true)}
          activeSection={activeSection}
          currentPath={currentPath}
          onNavigate={handleNavigate}
        />

        {/* Main Content Area */}
        <main className="w-full pt-20 flex-1">
          {/* Contextual Route Header & Single H1 for Sub-Routes */}
          {!isHomeRoute && (
            <div className="w-full bg-[#f5f3f0] border-b border-[#e4e2df] px-5 md:px-10 lg:px-16 py-6">
              <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <nav aria-label="Breadcrumb" className="text-xs text-[#546252] mb-1.5 flex items-center gap-1.5">
                    <a
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigate('/', 'hero');
                      }}
                      className="hover:text-[#994524] font-medium"
                    >
                      Seapee Bajaj Portfolio
                    </a>
                    <span aria-hidden="true">/</span>
                    <span className="text-[#994524] font-semibold">
                      {activeRouteConfig.breadcrumbLabel}
                    </span>
                  </nav>
                  <h1 className="font-serif text-2xl sm:text-3xl text-[#1b1c1a] font-medium">
                    {activeRouteConfig.h1}
                  </h1>
                  <p className="text-xs sm:text-sm text-[#55433c] mt-1">
                    {activeRouteConfig.subtitle}
                  </p>
                </div>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate('/', 'hero');
                  }}
                  className="text-xs font-semibold text-[#994524] hover:underline shrink-0"
                >
                  ← Back to Overview
                </a>
              </div>
            </div>
          )}

          {/* Hero Section */}
          <ScrollRevealSection>
            <Hero
              onWorkWithMe={handleWorkTogether}
              onViewWork={handleViewWork}
              onViewCaseStudies={handleViewCaseStudies}
              onReadBook={handleReadBook}
              onViewTestimonials={handleViewTestimonials}
              onFilterTopic={handleFilterTopic}
              isHomeRoute={isHomeRoute}
            />
          </ScrollRevealSection>

          {/* Perspective / About Section */}
          <ScrollRevealSection>
            <About onNavigate={handleNavigate} />
          </ScrollRevealSection>

          {/* Career Chronology / Experience Section */}
          <ScrollRevealSection>
            <Experience onNavigate={handleNavigate} />
          </ScrollRevealSection>

          {/* Dedicated Crawl-Friendly Resume & Career Summary Section */}
          <ScrollRevealSection>
            <ResumeSection
              onOpenResumeModal={() => setIsResumeOpen(true)}
              onContactClick={handleWorkTogether}
            />
          </ScrollRevealSection>

          {/* Core Practice / Services Section */}
          <ScrollRevealSection>
            <Services
              onSelectService={(service) => setSelectedService(service)}
              onNavigate={handleNavigate}
            />
          </ScrollRevealSection>

          {/* Real-World Case Studies Section */}
          <ScrollRevealSection>
            <CaseStudies onNavigate={handleNavigate} />
          </ScrollRevealSection>

          {/* Selected Work / Portfolio Index */}
          <ScrollRevealSection>
            <Portfolio
              onSelectProject={(project) => setSelectedProject(project)}
              activeCategory={activeCategory}
              onSelectCategory={(category) => setActiveCategory(category)}
            />
          </ScrollRevealSection>

          {/* Dedicated SEO, GEO & AI Search Expertise Section */}
          <ScrollRevealSection>
            <SeoGeoExpertise onNavigate={handleNavigate} />
          </ScrollRevealSection>

          {/* Dedicated Writing & Editorial Craft Section */}
          <ScrollRevealSection>
            <WritingSection onNavigate={handleNavigate} />
          </ScrollRevealSection>

          {/* Narrative & Culture / Creative Work */}
          <ScrollRevealSection>
            <CreativeWork />
          </ScrollRevealSection>

          {/* Editorial Philosophy Banner */}
          <ScrollRevealSection>
            <PhilosophyBanner />
          </ScrollRevealSection>

          {/* Working Method / Process */}
          <ScrollRevealSection>
            <Process />
          </ScrollRevealSection>

          {/* Value Proposition / Why Work With Me */}
          <ScrollRevealSection>
            <WhyWorkWithMe />
          </ScrollRevealSection>

          {/* What People Say / Client, Manager & Leadership Testimonials */}
          <ScrollRevealSection>
            <Testimonials />
          </ScrollRevealSection>

          {/* Strategic Awards & Industry Recognition Section */}
          <ScrollRevealSection>
            <Awards />
          </ScrollRevealSection>

          {/* Beyond Brand Content / Published Book Feature */}
          <ScrollRevealSection>
            <PublishedBook />
          </ScrollRevealSection>

          {/* Frequently Asked Questions Section */}
          <ScrollRevealSection>
            <FAQSection onNavigate={handleNavigate} />
          </ScrollRevealSection>

          {/* Contact & Inquiries Section */}
          <ScrollRevealSection>
            <Contact
              initialService={inquiryService}
              onOpenResume={() => setIsResumeOpen(true)}
              onOpenWorkspace={() => setIsWorkspaceOpen(true)}
            />
          </ScrollRevealSection>
        </main>

        {/* Site Footer */}
        <Footer onNavigate={handleNavigate} />

        {/* Floating WhatsApp Quick-Chat Button */}
        <FloatingWhatsApp />

        {/* Interactive Modals & "Talk to Seapee" Voice AI Assistant (Lazy-loaded) */}
        <Suspense fallback={null}>
          <AskSeapeeChatbot
            onNavigate={handleNavigate}
            onOpenResumeModal={() => setIsResumeOpen(true)}
          />
          {selectedProject && (
            <CaseStudyModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
              onContactClick={() => {
                setSelectedProject(null);
                handleNavigate('/contact', 'contact');
              }}
            />
          )}

          {selectedService && (
            <ServiceDetailModal
              service={selectedService}
              onClose={() => setSelectedService(null)}
              onSelectInquiry={handleSelectInquiry}
            />
          )}

          {isResumeOpen && (
            <ResumeModal
              isOpen={isResumeOpen}
              onClose={() => setIsResumeOpen(false)}
              onContactClick={() => {
                setIsResumeOpen(false);
                handleNavigate('/contact', 'contact');
              }}
            />
          )}

          {isWorkspaceOpen && (
            <EditorialWorkspaceModal
              isOpen={isWorkspaceOpen}
              onClose={() => setIsWorkspaceOpen(false)}
            />
          )}
        </Suspense>
      </div>
    </FirebaseProvider>
  );
}
