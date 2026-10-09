import React from 'react';
import {
  Briefcase,
  BookOpen,
  Sparkles,
  Award,
  Mail,
  Image as ImageIcon,
  Database,
  ArrowUpRight,
  Plus,
  ShieldCheck,
  CheckCircle,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { AdminTab } from '../AdminSidebar';

interface DashboardViewProps {
  onNavigateTab: (tab: AdminTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigateTab }) => {
  const { data, supabaseConnected, adminUser } = usePortfolio();

  const publishedBlogCount = data.blog.filter((b) => b.published).length;
  const draftBlogCount = data.blog.filter((b) => !b.published).length;
  const unreadInquiries = data.contact.inquiries?.filter((i) => !i.read).length || 0;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/40 p-6 sm:p-8">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Secure Admin Space Active</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, {adminUser?.email ? adminUser.email.split('@')[0] : 'Krish'}!
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            Your portfolio website is fully operational. Manage case studies, update blog articles, customize hero visuals, and manage Supabase database content below.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('blog')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create Blog Post</span>
            </button>
            <button
              onClick={() => onNavigateTab('projects')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm transition-all"
            >
              <Briefcase className="w-4 h-4" />
              <span>Add New Project</span>
            </button>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60 font-semibold text-xs sm:text-sm transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Public Website</span>
            </a>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Projects Metric */}
        <div
          onClick={() => onNavigateTab('projects')}
          className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all hover:translate-y-[-2px] group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Projects</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-white">{data.projects.length}</span>
            <span className="text-xs text-emerald-400 font-medium">Active Case Studies</span>
          </div>
        </div>

        {/* Blog Posts Metric */}
        <div
          onClick={() => onNavigateTab('blog')}
          className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all hover:translate-y-[-2px] group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Blog Posts</span>
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 group-hover:bg-sky-500/20 transition-colors">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-white">{data.blog.length}</span>
            <span className="text-xs text-slate-400">
              ({publishedBlogCount} live · {draftBlogCount} draft)
            </span>
          </div>
        </div>

        {/* Skills Metric */}
        <div
          onClick={() => onNavigateTab('skills')}
          className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all hover:translate-y-[-2px] group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Skills</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-white">{data.skills.length}</span>
            <span className="text-xs text-purple-400 font-medium">Core Capabilities</span>
          </div>
        </div>

        {/* Inquiries Metric */}
        <div
          onClick={() => onNavigateTab('contact')}
          className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all hover:translate-y-[-2px] group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Inquiries</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-white">
              {data.contact.inquiries?.length || 0}
            </span>
            {unreadInquiries > 0 ? (
              <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-semibold">
                {unreadInquiries} new
              </span>
            ) : (
              <span className="text-xs text-slate-400 font-medium">All answered</span>
            )}
          </div>
        </div>
      </div>

      {/* Supabase Status Banner */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              supabaseConnected
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
            }`}
          >
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">
                {supabaseConnected ? 'Supabase Database & Authentication Active' : 'Supabase Not Connected (Local Storage Mode)'}
              </h3>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  supabaseConnected
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}
              >
                {supabaseConnected ? 'Online & Synced' : 'Action Required'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {supabaseConnected
                ? 'Your website content and admin authentication are backed by Supabase with Row Level Security (RLS) policies.'
                : 'Click Website Settings to enter your Supabase Project URL and Anon Key, or copy the SQL migration script.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab('settings')}
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors shrink-0"
        >
          {supabaseConnected ? 'View Database Settings' : 'Configure Supabase'}
        </button>
      </div>

      {/* Two Column Grid: Recent Blog & Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Articles */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-white">Recent Blog Articles</h3>
            </div>
            <button
              onClick={() => onNavigateTab('blog')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Manage all ({data.blog.length}) →
            </button>
          </div>

          <div className="space-y-3">
            {data.blog.slice(0, 3).map((post) => (
              <div
                key={post.id}
                onClick={() => onNavigateTab('blog')}
                className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-colors flex items-start justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        post.published
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                    <span className="text-[11px] text-slate-400">{post.category}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white truncate">{post.title}</h4>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{post.shortDescription}</p>
                </div>
                <span className="text-[11px] text-slate-400 shrink-0">{post.readTime}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Recent Inquiries</h3>
            </div>
            <button
              onClick={() => onNavigateTab('contact')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              View inbox ({data.contact.inquiries?.length || 0}) →
            </button>
          </div>

          <div className="space-y-3">
            {(data.contact.inquiries || []).slice(0, 3).map((inq) => (
              <div
                key={inq.id}
                onClick={() => onNavigateTab('contact')}
                className={`p-3.5 rounded-lg border transition-colors cursor-pointer ${
                  inq.read
                    ? 'bg-slate-950/40 border-slate-800/60'
                    : 'bg-emerald-950/20 border-emerald-800/40 hover:border-emerald-700/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white">{inq.name}</span>
                    {!inq.read && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950">
                        NEW
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400">{inq.date}</span>
                </div>
                <div className="text-[11px] text-slate-300 font-medium truncate">{inq.subject}</div>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{inq.message}</p>
              </div>
            ))}

            {(!data.contact.inquiries || data.contact.inquiries.length === 0) && (
              <div className="text-center py-8 text-xs text-slate-400">
                No inquiries received yet. Form submissions from the contact page will appear here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
