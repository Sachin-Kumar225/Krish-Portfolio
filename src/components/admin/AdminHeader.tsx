import React from 'react';
import {
  Menu,
  ExternalLink,
  Save,
  CheckCircle2,
  Database,
  LogOut,
  RefreshCw,
} from 'lucide-react';
import { AdminTab } from './AdminSidebar';
import { usePortfolio } from '../../context/PortfolioContext';

interface AdminHeaderProps {
  activeTab: AdminTab;
  onOpenMobileMenu: () => void;
  onNavigateToSettings: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  onOpenMobileMenu,
  onNavigateToSettings,
}) => {
  const {
    saveStatus,
    isSaving,
    saveChanges,
    supabaseConnected,
    refreshSupabaseStatus,
    logout,
  } = usePortfolio();

  const tabTitles: Record<AdminTab, { title: string; subtitle: string }> = {
    dashboard: {
      title: 'Dashboard Overview',
      subtitle: 'System status, metrics, quick actions and content telemetry.',
    },
    homepage: {
      title: 'Homepage & Hero Section',
      subtitle: 'Edit headings, subrole, intro copy, CTA buttons, and personal portrait photo.',
    },
    about: {
      title: 'About, Bio & Career History',
      subtitle: 'Manage biographical paragraphs, key metrics, education and professional experience.',
    },
    skills: {
      title: 'Skills & Capabilities',
      subtitle: 'Add, edit, reorder skills, set proficiency percentages and manage categories.',
    },
    projects: {
      title: 'Projects & Case Studies',
      subtitle: 'Add new work, edit case studies, upload project media, metrics, and repository links.',
    },
    certificates: {
      title: 'Credentials & Certificates',
      subtitle: 'Manage verified industry certificates, credential IDs, issuing bodies, and links.',
    },
    blog: {
      title: 'Blog & Thought Leadership',
      subtitle: 'Create articles, manage drafts, publish status, rich blocks, tags and SEO fields.',
    },
    contact: {
      title: 'Contact Information & Inquiries',
      subtitle: 'Manage public email, phone, availability status and view submitted contact messages.',
    },
    socialLinks: {
      title: 'Social Media & External Links',
      subtitle: 'Configure social channels, profiles, labels and destination URLs.',
    },
    seo: {
      title: 'Search Engine Optimization & Meta',
      subtitle: 'Configure global metadata, canonical URLs, robots.txt rules, and inspect structured data.',
    },
    media: {
      title: 'Media Assets & Storage',
      subtitle: 'Upload, manage, preview and organize website images and certificate files.',
    },
    settings: {
      title: 'Website Settings & Supabase Setup',
      subtitle: 'Configure site metadata, brand identity, Supabase database credentials, and RLS schema.',
    },
  };

  const current = tabTitles[activeTab] || {
    title: 'Admin Dashboard',
    subtitle: 'Manage your portfolio content securely.',
  };

  const handleManualSave = async () => {
    await saveChanges();
  };

  const handleLogout = async () => {
    if (window.confirm('Sign out of Admin Space?')) {
      await logout();
      window.location.href = '/admin-login';
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3.5">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Titles */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Open navigation sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-white truncate">{current.title}</h1>
            <p className="hidden sm:block text-xs text-slate-400 truncate">{current.subtitle}</p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Supabase Connection Indicator */}
          <button
            onClick={onNavigateToSettings}
            title={supabaseConnected ? 'Supabase Database & Auth Connected' : 'Running in Local/Demo mode. Click to connect Supabase.'}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              supabaseConnected
                ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60 hover:bg-emerald-950/70'
                : 'bg-amber-950/40 text-amber-300 border-amber-800/60 hover:bg-amber-950/70'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span className="hidden md:inline">
              {supabaseConnected ? 'Supabase Active' : 'Configure Supabase'}
            </span>
            <span className={`w-2 h-2 rounded-full ${supabaseConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
          </button>

          {/* Save Status / Button */}
          <button
            onClick={handleManualSave}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
            title="Save changes to local database and Supabase"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span className="hidden sm:inline">Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Save Changes</span>
              </>
            )}
          </button>

          {/* View Live Public Site */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-medium border border-slate-700 transition-colors"
            title="Open Live Public Website in a new tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Site</span>
          </a>

          {/* Quick Logout */}
          <button
            onClick={handleLogout}
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
            title="Sign out of Admin Space"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
