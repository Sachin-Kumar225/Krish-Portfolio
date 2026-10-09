import React, { useState, useEffect } from 'react';
import { AdminSidebar, AdminTab } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { DashboardView } from './views/DashboardView';
import { HomepageView } from './views/HomepageView';
import { AboutView } from './views/AboutView';
import { SkillsView } from './views/SkillsView';
import { ProjectsView } from './views/ProjectsView';
import { CertificatesView } from './views/CertificatesView';
import { BlogView } from './views/BlogView';
import { ContactView } from './views/ContactView';
import { SocialLinksView } from './views/SocialLinksView';
import { SeoView } from './views/SeoView';
import { MediaView } from './views/MediaView';
import { SettingsView } from './views/SettingsView';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { saveStatus } = usePortfolio();

  useEffect(() => {
    document.title = `Admin Space — ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`;
  }, [activeTab]);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView onNavigateTab={setActiveTab} />;
      case 'homepage':
        return <HomepageView />;
      case 'about':
        return <AboutView />;
      case 'skills':
        return <SkillsView />;
      case 'projects':
        return <ProjectsView />;
      case 'certificates':
        return <CertificatesView />;
      case 'blog':
        return <BlogView />;
      case 'contact':
        return <ContactView />;
      case 'socialLinks':
        return <SocialLinksView />;
      case 'seo':
        return <SeoView />;
      case 'media':
        return <MediaView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView onNavigateTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row text-slate-100 font-sans antialiased">
      {/* Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <AdminHeader
          activeTab={activeTab}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onNavigateToSettings={() => setActiveTab('settings')}
        />

        {/* View Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderActiveView()}
        </main>

        {/* Footer notification */}
        <footer className="px-6 py-3 border-t border-slate-900 bg-slate-950 text-center text-xs text-slate-400 flex items-center justify-between">
          <span>Krish Kumar Portfolio — Secure Admin Space</span>
          <span className="text-[11px] text-slate-400">{saveStatus}</span>
        </footer>
      </div>
    </div>
  );
};
