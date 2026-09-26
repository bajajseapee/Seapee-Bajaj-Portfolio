import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
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
import { FirebaseProvider } from './context/FirebaseContext';
import { ProjectItem, ServiceItem, PortfolioCategory } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('about');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('All');
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState<boolean>(false);
  const [inquiryService, setInquiryService] = useState<string>('SEO Content Strategy');

  // Track active section for navigation highlighting
  useEffect(() => {
    const sectionIds = ['about', 'services', 'selected-work', 'process', 'awards', 'published-work', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

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

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWorkTogether = () => {
    scrollToSection('contact');
  };

  const handleViewWork = () => {
    scrollToSection('selected-work');
  };

  const handleFilterTopic = (topic: string) => {
    if (topic === 'SEO Content') {
      setActiveCategory('SEO & Content');
    } else if (topic === 'B2B') {
      setActiveCategory('B2B');
    } else if (topic === 'Research') {
      setActiveCategory('Research');
    } else {
      setActiveCategory('All');
    }
    scrollToSection('selected-work');
  };

  const handleSelectInquiry = (serviceTitle: string) => {
    setInquiryService(serviceTitle);
    scrollToSection('contact');
  };

  return (
    <FirebaseProvider>
      <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] flex flex-col antialiased selection:bg-[#ffdbcf] selection:text-[#994524]">
        {/* Fixed Navigation Bar */}
        <Navbar
          onWorkTogether={handleWorkTogether}
          onOpenWorkspace={() => setIsWorkspaceOpen(true)}
          activeSection={activeSection}
        />

        {/* Main Content Area */}
        <main className="w-full pt-20 flex-1">
          {/* Hero Section */}
          <Hero
            onWorkWithMe={handleWorkTogether}
            onViewWork={handleViewWork}
            onFilterTopic={handleFilterTopic}
          />

          {/* Perspective / About Section */}
          <About />

          {/* Core Practice / Services Section */}
          <Services
            onSelectService={(service) => setSelectedService(service)}
          />

          {/* Folio Index / Selected Work Section */}
          <Portfolio
            onSelectProject={(project) => setSelectedProject(project)}
            activeCategory={activeCategory}
            onSelectCategory={(category) => setActiveCategory(category)}
          />

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

          {/* Beyond Brand Content / Published Work Feature */}
          <PublishedBook />

          {/* Contact & Inquiries Section */}
          <Contact
            initialService={inquiryService}
            onOpenResume={() => setIsResumeOpen(true)}
            onOpenWorkspace={() => setIsWorkspaceOpen(true)}
          />
        </main>

        {/* Site Footer */}
        <Footer />

        {/* Interactive Modals */}
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onContactClick={() => {
            setSelectedProject(null);
            scrollToSection('contact');
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
            scrollToSection('contact');
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
