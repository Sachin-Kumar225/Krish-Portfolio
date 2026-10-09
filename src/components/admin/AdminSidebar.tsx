import React from 'react';
import {
  LayoutDashboard,
  Home,
  User,
  Sparkles,
  Briefcase,
  Award,
  BookOpen,
  Mail,
  Share2,
  Search,
  Image as ImageIcon,
  Settings,
  LogOut,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Database,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export type AdminTab =
  | 'dashboard'
  | 'homepage'
  | 'about'
  | 'skills'
  | 'projects'
  | 'certificates'
  | 'blog'
  | 'contact'
  | 'socialLinks'
  | 'seo'
  | 'media'
  | 'settings';

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
  mobileOpen,
  setMobileOpen,
}) => {
  const { adminUser, logout, supabaseConnected, data } = usePortfolio();

  const navItems: { id: AdminTab; label: string; icon: React.FC<{ className?: string }>; badge?: number | string }[] = [
    { id: 'dashboard', label: '1. Dashboard', icon: LayoutDashboard },
    { id: 'homepage', label: '2. Homepage', icon: Home },
    { id: 'about', label: '3. About', icon: User },
    { id: 'skills', label: '4. Skills', icon: Sparkles, badge: data.skills.length },
    { id: 'projects', label: '5. Projects', icon: Briefcase, badge: data.projects.length },
    { id: 'certificates', label: '6. Certificates', icon: Award, badge: data.certificates.length },
    { id: 'blog', label: '7. Blog', icon: BookOpen, badge: data.blog.length },
    { id: 'contact', label: '8. Contact', icon: Mail, badge: data.contact.inquiries?.filter(i => !i.read).length || undefined },
    { id: 'socialLinks', label: '9. Social Links', icon: Share2, badge: data.socialLinks.filter(s => s.enabled).length },
    { id: 'seo', label: '10. SEO', icon: Search },
    { id: 'media', label: '11. Images / Media', icon: ImageIcon, badge: data.media.length },
    { id: 'settings', label: '12. Website Settings', icon: Settings },
  ];

  const handleTabClick = (tabId: AdminTab) => {
    setActiveTab(tabId);
    setMobileOpen(false);
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to sign out of the Admin Space?')) {
      await logout();
      window.location.href = '/admin-login';
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-950 text-slate-200 border-r border-slate-800/80 w-72 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold tracking-tight">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-white tracking-wide text-sm">KRISH KUMAR</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                ADMIN
              </span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
              <span className={`w-1.5 h-1.5 rounded-full ${supabaseConnected ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              {supabaseConnected ? 'Supabase Connected' : 'Local / Demo Mode'}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Admin Control Center
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/90'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-80" />}
              </div>
            </button>
          );
        })}

        {/* 13. Logout Action */}
        <div className="pt-2 mt-2 border-t border-slate-800/80">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-4 h-4 text-rose-400 group-hover:text-rose-300" />
              <span>13. Logout</span>
            </div>
            <span className="text-[10px] text-rose-400/80 uppercase font-semibold">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Footer User Info */}
      <div className="p-3.5 border-t border-slate-800/80 bg-slate-950/80">
        <div className="flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <div className="text-xs font-semibold text-white truncate">
              {adminUser?.email || 'admin@client-site.com'}
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
              <Database className="w-3 h-3 text-slate-400" />
              <span>{supabaseConnected ? 'Supabase Auth' : 'Admin Session'}</span>
            </div>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            title="Open Live Public Website"
            className="p-1.5 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block h-screen sticky top-0 shrink-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="w-72 h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
