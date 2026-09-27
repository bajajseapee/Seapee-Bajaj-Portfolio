import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Services } from './components/Services';
import { CaseStudies } from './components/CaseStudies';
import { Portfolio } from './components/Portfolio';
import { SeoGeoExpertise } from './components/SeoGeoExpertise';
import { WritingSection } from './components/WritingSection';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { CreativeWork } from './components/CreativeWork';
import { PhilosophyBanner } from './components/PhilosophyBanner';
import { Process } from './components/Process';
import { WhyWorkWithMe } from './components/WhyWorkWithMe';
import { Awards } from './components/Awards';
import { PublishedBook } from './components/PublishedBook';
import { Contact } from './components/Contact';
import { ResumeModal } from './components/ResumeModal';
import { EditorialWorkspaceModal } from './components/EditorialWorkspaceModal';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/WhatsAppIcon';
import { SEOHead } from './components/SEOHead';
import { FirebaseProvider } from './context/FirebaseContext';
import { SEO_ROUTES } from './config/siteConfig';
import { ProjectItem, ServiceItem, PortfolioCategory } from './types';

function normalizePathname(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  const cleaned = pathname.replace(/\/$/, '');
  return SEO_ROUTES[cleaned] ? cleaned : '/';
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

  // Track active section for navigation highlighting
  useEffect(() => {
    const sectionIds = [
      'about',
      'experience',
      'services',
      'case-studies',
      'selected-work',
      'seo-geo-expertise',
      'writing',
      'process',
      'awards',
      'published-work',
      'contact',
    ];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
          <Hero
            onWorkWithMe={handleWorkTogether}
            onViewWork={handleViewWork}
            onViewCaseStudies={handleViewCaseStudies}
            onFilterTopic={handleFilterTopic}
            isHomeRoute={isHomeRoute}
          />

          {/* Perspective / About Section */}
          <About onNavigate={handleNavigate} />

          {/* Professional Experience Timeline Section */}
          <Experience onNavigate={handleNavigate} />

          {/* Core Practice / Services Section */}
          <Services
            onSelectService={(service) => setSelectedService(service)}
          />

          {/* Real-World Case Studies Section */}
          <CaseStudies onNavigate={handleNavigate} />

          {/* Folio Index / Selected Work Section */}
          <Portfolio
            onSelectProject={(project) => setSelectedProject(project)}
            activeCategory={activeCategory}
            onSelectCategory={(category) => setActiveCategory(category)}
          />

          {/* Dedicated SEO / GEO / AEO Expertise Section */}
          <SeoGeoExpertise onNavigate={handleNavigate} />

          {/* Scalable Writing & Editorial Perspectives Section */}
          <WritingSection onNavigate={handleNavigate} />

          {/* Beyond Business Content Section */}
          <CreativeWork />

          {/* Editorial Philosophy Quote Banner */}
          <PhilosophyBanner />

          {/* How I Work / Methodical Timeline Process */}
          <Process />

          {/* Why Work With Me / Value Proposition */}
          <WhyWorkWithMe />

          {/* Strategic Awards & Industry Recognition Section */}
          <Awards />

          {/* Beyond Brand Content / Published Book Feature */}
          <PublishedBook />

          {/* Contact & Inquiries Section */}
          <Contact
            initialService={inquiryService}
            onOpenResume={() => setIsResumeOpen(true)}
            onOpenWorkspace={() => setIsWorkspaceOpen(true)}
          />
        </main>

        {/* Site Footer */}
        <Footer onNavigate={handleNavigate} />

        {/* Floating WhatsApp Quick-Chat Button */}
        <FloatingWhatsApp />

        {/* Interactive Modals */}
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onContactClick={() => {
            setSelectedProject(null);
            handleNavigate('/contact', 'contact');
          }}
        />

        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onSelectInquiry={handleSelectInquiry}
        />

        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
          onContactClick={() => {
            setIsResumeOpen(false);
            handleNavigate('/contact', 'contact');
          }}
        />

        <EditorialWorkspaceModal
          isOpen={isWorkspaceOpen}
          onClose={() => setIsWorkspaceOpen(false)}
        />
      </div>
    </FirebaseProvider>
  );
}
