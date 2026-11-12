/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WhatsAppFloat } from './components/layout/WhatsAppFloat';
import { Lightbox } from './components/ui/Lightbox';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { EventsPage } from './pages/EventsPage';
import { CasesPage } from './pages/CasesPage';
import { PlansPage } from './pages/PlansPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [pageParam, setPageParam] = useState<string | undefined>(undefined);

  // Read initial route from URL hash if available (e.g. #portfolio, #admin, #projeto/slug)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) {
        setCurrentPage('home');
        setPageParam(undefined);
        return;
      }
      const parts = hash.split('/');
      const page = parts[0];
      const param = parts[1];

      if (['home', 'sobre', 'servicos', 'portfolio', 'projeto', 'eventos', 'cases', 'planos', 'contato', 'privacidade', 'admin'].includes(page)) {
        setCurrentPage(page);
        setPageParam(param);
      } else {
        setCurrentPage('404');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string, param?: string) => {
    setCurrentPage(page);
    setPageParam(param);
    const newHash = param ? `#${page}/${param}` : `#${page}`;
    window.location.hash = newHash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigateTo} />;
      case 'sobre':
        return <AboutPage onNavigate={navigateTo} />;
      case 'servicos':
        return <ServicesPage initialServiceSlug={pageParam} onNavigate={navigateTo} />;
      case 'portfolio':
        return <PortfolioPage onNavigate={navigateTo} />;
      case 'projeto':
        return <ProjectDetailPage projectSlug={pageParam || ''} onNavigate={navigateTo} />;
      case 'eventos':
        return <EventsPage onNavigate={navigateTo} />;
      case 'cases':
        return <CasesPage onNavigate={navigateTo} />;
      case 'planos':
        return <PlansPage onNavigate={navigateTo} />;
      case 'contato':
        return <ContactPage onNavigate={navigateTo} />;
      case 'privacidade':
        return <PrivacyPage onNavigate={navigateTo} />;
      case 'admin':
        return <AdminPage onNavigate={navigateTo} />;
      default:
        return <NotFoundPage onNavigate={navigateTo} />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#050611] text-slate-100 selection:bg-[#00F5D4]/20 selection:text-[#00F5D4]">
        {/* Top Navbar adhering strictly to Top Bar Contract */}
        <Navbar currentPage={currentPage} onNavigate={navigateTo} />

        {/* Dynamic Main View */}
        <main className="flex-1">
          {renderCurrentPage()}
        </main>

        {/* Global Floating WhatsApp Trigger */}
        <WhatsAppFloat />

        {/* Fullscreen Lightbox Modal */}
        <Lightbox />

        {/* Global Editorial Footer */}
        <Footer onNavigate={navigateTo} />
      </div>
    </AppProvider>
  );
}
