import React, { useState, useEffect } from 'react';
import {
  Settings,
  Database,
  ShieldCheck,
  Copy,
  Check,
  RefreshCw,
  Download,
  RotateCcw,
  ExternalLink,
  Lock,
  Server,
  UserCheck,
  UserPlus,
  Trash2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  KeyRound,
  AlertCircle,
} from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import {
  getSavedConfig,
  saveSupabaseConfig,
  clearSupabaseConfig,
  testSupabaseConnection,
  getSupabaseMigrationSql,
  fetchAuthorizedAdmins,
  addAuthorizedAdmin,
  removeAuthorizedAdmin,
  AdminAccountItem,
} from '../../../lib/supabase';

export const SettingsView: React.FC = () => {
  const { data, updateSettings, resetToDefaults, refreshSupabaseStatus, supabaseConnected, schemaStatus, adminUser } = usePortfolio();
  const st = data.settings;

  // Supabase Form
  const savedCfg = getSavedConfig();
  const [supabaseUrl, setSupabaseUrl] = useState(savedCfg.url);
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(savedCfg.anonKey);
  const [testResult, setTestResult] = useState<{ status: 'idle' | 'testing' | 'success' | 'error'; message: string }>({
    status: 'idle',
    message: '',
  });

  const [copiedSql, setCopiedSql] = useState(false);

  // Admin users state
  const [adminsList, setAdminsList] = useState<AdminAccountItem[]>([]);
  const [isLoadingAdmins, setIsLoadingAdmins] = useState(false);
  const [newAdminUserId, setNewAdminUserId] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [adminActionMsg, setAdminActionMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Client handoff drawer
  const [showHandoffGuide, setShowHandoffGuide] = useState(false);

  useEffect(() => {
    if (supabaseConnected) {
      loadAdmins();
    }
  }, [supabaseConnected]);

  const loadAdmins = async () => {
    setIsLoadingAdmins(true);
    const list = await fetchAuthorizedAdmins();
    setAdminsList(list);
    setIsLoadingAdmins(false);
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminUserId.trim() || !newAdminEmail.trim()) {
      setAdminActionMsg({ type: 'error', text: 'Please provide both the Supabase Auth User ID and email.' });
      return;
    }

    const res = await addAuthorizedAdmin(newAdminUserId, newAdminEmail);
    if (res.success) {
      setAdminActionMsg({ type: 'success', text: `Authorized administrator ${newAdminEmail} successfully!` });
      setNewAdminUserId('');
      setNewAdminEmail('');
      await loadAdmins();
    } else {
      setAdminActionMsg({ type: 'error', text: res.error || 'Failed to add administrator.' });
    }
    setTimeout(() => setAdminActionMsg(null), 4000);
  };

  const handleRemoveAdmin = async (admin: AdminAccountItem) => {
    if (admin.user_id === adminUser?.id) {
      if (!window.confirm('Warning: You are about to revoke your own administrator account. You may lose access. Proceed?')) {
        return;
      }
    } else if (!window.confirm(`Revoke administrator access for ${admin.email}?`)) {
      return;
    }

    const res = await removeAuthorizedAdmin(admin.id);
    if (res.success) {
      setAdminActionMsg({ type: 'success', text: `Revoked admin privileges for ${admin.email}.` });
      await loadAdmins();
    } else {
      setAdminActionMsg({ type: 'error', text: res.error || 'Failed to revoke administrator.' });
    }
    setTimeout(() => setAdminActionMsg(null), 4000);
  };

  const handleSaveSupabase = async () => {
    saveSupabaseConfig(supabaseUrl.trim(), supabaseAnonKey.trim());
    await refreshSupabaseStatus();
    setTestResult({
      status: 'success',
      message: 'Supabase configuration saved! Testing live connection...',
    });
    handleTestConnection();
  };

  const handleTestConnection = async () => {
    setTestResult({ status: 'testing', message: 'Testing Supabase Auth & Database connectivity...' });
    const res = await testSupabaseConnection();
    if (res.success) {
      setTestResult({ status: 'success', message: res.message });
      await refreshSupabaseStatus();
    } else {
      setTestResult({ status: 'error', message: res.message });
    }
  };

  const handleDisconnect = async () => {
    if (window.confirm('Disconnect Supabase credentials? The app will revert to local storage mode.')) {
      clearSupabaseConfig();
      setSupabaseUrl('');
      setSupabaseAnonKey('');
      await refreshSupabaseStatus();
      setTestResult({ status: 'idle', message: 'Supabase disconnected. Using local storage.' });
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(getSupabaseMigrationSql());
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `krish_kumar_portfolio_backup_${new Date().toISOString().split('T')[0]}.json`);
    dlAnchor.click();
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
        <h2 className="text-base font-bold text-white">Website Settings &amp; Supabase Integration</h2>
        <p className="text-xs text-slate-400 mt-1">
          Configure site identity, connect your Supabase database, and copy Row Level Security (RLS) SQL policies.
        </p>
      </div>

      {/* Website Identity */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">Website Branding &amp; Footer</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Website Brand Name</label>
            <input
              type="text"
              value={st.siteName}
              onChange={(e) => updateSettings({ siteName: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Navigation Logo Text</label>
            <input
              type="text"
              value={st.logoText}
              onChange={(e) => updateSettings({ logoText: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Footer Copyright Notice</label>
            <input
              type="text"
              value={st.footerCopyright}
              onChange={(e) => updateSettings({ footerCopyright: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Footer Tagline</label>
            <input
              type="text"
              value={st.footerTagline}
              onChange={(e) => updateSettings({ footerTagline: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Supabase Connection */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Supabase Database &amp; Auth Configuration</h3>
          </div>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              supabaseConnected
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
            }`}
          >
            {supabaseConnected ? '🟢 Connected' : '🟡 Local Mode'}
          </span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Connect your Supabase project for persistent cloud storage, Supabase Authentication for admin logins, and secure Row Level Security (RLS) policies. Only your public Anon key is used.
        </p>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Supabase Project URL
            </label>
            <input
              type="text"
              value={supabaseUrl}
              onChange={(e) => setSupabaseUrl(e.target.value)}
              placeholder="https://xyzcompany.supabase.co"
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Supabase Anon Public API Key (anon / public)
            </label>
            <input
              type="password"
              value={supabaseAnonKey}
              onChange={(e) => setSupabaseAnonKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Never enter your service-role secret key in the browser. Only enter the public `anon` key.
            </span>
          </div>

          {/* Test connection feedback */}
          {testResult.status !== 'idle' && (
            <div
              className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                testResult.status === 'testing'
                  ? 'bg-indigo-950/40 border border-indigo-800/40 text-indigo-300'
                  : testResult.status === 'success'
                  ? 'bg-emerald-950/40 border border-emerald-800/40 text-emerald-300'
                  : 'bg-rose-950/40 border border-rose-800/40 text-rose-300'
              }`}
            >
              {testResult.status === 'testing' && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
              <span>{testResult.message}</span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleSaveSupabase}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              Save Credentials
            </button>
            <button
              type="button"
              onClick={handleTestConnection}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              Test Connection
            </button>
            {savedCfg.url && (
              <button
                type="button"
                onClick={handleDisconnect}
                className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-rose-950/50 text-rose-400 hover:text-rose-300 text-xs font-semibold transition-colors"
              >
                Disconnect
              </button>
            )}
          </div>
        </div>

        {/* Live Supabase Configuration Checklist */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Supabase Configuration Status Checklist
            </span>
            <span className="text-[11px] text-slate-400">
              Live Project: <code className="text-indigo-400 font-mono">{supabaseUrl ? new URL(supabaseUrl).hostname : 'None'}</code>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            {/* Auth */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-300">1. Admin Authentication</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                supabaseConnected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {supabaseConnected ? 'Active & Ready' : 'Pending'}
              </span>
            </div>

            {/* Storage */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-300">2. Storage: portfolio-media</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                schemaStatus?.storageBucket ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {schemaStatus?.storageBucket ? 'Bucket Ready' : 'Run SQL to Create'}
              </span>
            </div>

            {/* portfolio_content */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-300">3. Table: portfolio_content</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                schemaStatus?.tables.portfolio_content ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {schemaStatus?.tables.portfolio_content ? 'Table Ready' : 'Run SQL to Create'}
              </span>
            </div>

            {/* projects */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-300">4. Table: projects</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                schemaStatus?.tables.projects ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {schemaStatus?.tables.projects ? 'Table Ready' : 'Run SQL to Create'}
              </span>
            </div>

            {/* skills */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-300">5. Table: skills</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                schemaStatus?.tables.skills ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {schemaStatus?.tables.skills ? 'Table Ready' : 'Run SQL to Create'}
              </span>
            </div>

            {/* certificates */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-300">6. Table: certificates</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                schemaStatus?.tables.certificates ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {schemaStatus?.tables.certificates ? 'Table Ready' : 'Run SQL to Create'}
              </span>
            </div>

            {/* blog_posts */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-300">7. Table: blog_posts</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                schemaStatus?.tables.blog_posts ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {schemaStatus?.tables.blog_posts ? 'Table Ready' : 'Run SQL to Create'}
              </span>
            </div>

            {/* media_files */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-300">8. Table: media_files</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                schemaStatus?.tables.media_files ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {schemaStatus?.tables.media_files ? 'Table Ready' : 'Run SQL to Create'}
              </span>
            </div>

            {/* contact_inquiries */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-300">9. Table: contact_inquiries</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                schemaStatus?.tables.contact_inquiries ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {schemaStatus?.tables.contact_inquiries ? 'Table Ready' : 'Run SQL to Create'}
              </span>
            </div>

            {/* RLS */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-300">10. Row Level Security</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
                Enforced in SQL
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Authorized Administrators (public.admin_users) */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Authorized Administrators</h3>
          </div>
          <button
            type="button"
            onClick={loadAdmins}
            className="p-1 text-slate-400 hover:text-white rounded"
            title="Refresh admins list"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingAdmins ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Admin privileges are strictly bound to verified Supabase Auth User IDs (<code className="text-indigo-400">auth.users.id</code>). Ordinary visitors cannot elevate themselves. Only existing administrators or the database owner can authorize new accounts.
        </p>

        {adminActionMsg && (
          <div
            className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
              adminActionMsg.type === 'success'
                ? 'bg-emerald-950/40 border border-emerald-800/40 text-emerald-300'
                : 'bg-rose-950/40 border border-rose-800/40 text-rose-300'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{adminActionMsg.text}</span>
          </div>
        )}

        {/* Existing Admins List */}
        <div className="space-y-2">
          <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
            Active Administrators ({adminsList.length})
          </div>

          <div className="space-y-2">
            {adminsList.map((admin) => (
              <div
                key={admin.id}
                className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white">{admin.email}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                      {admin.role.toUpperCase()}
                    </span>
                    {admin.user_id === adminUser?.id && (
                      <span className="text-[10px] text-emerald-400 font-medium">(You)</span>
                    )}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5 select-all break-all">
                    User ID: {admin.user_id}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveAdmin(admin)}
                  className="self-end sm:self-center p-1.5 text-slate-400 hover:text-rose-400 rounded transition-colors"
                  title="Revoke Administrator Access"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {adminsList.length === 0 && (
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-center text-xs text-slate-400">
                {supabaseConnected
                  ? 'No administrator records found in public.admin_users. Run the SQL schema or authorize your account below.'
                  : 'Connect to Supabase to view and manage cloud database administrators.'}
              </div>
            )}
          </div>
        </div>

        {/* Add Admin Form */}
        <form onSubmit={handleAddAdmin} className="pt-3 border-t border-slate-800 space-y-3">
          <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <UserPlus className="w-3.5 h-3.5 text-indigo-400" />
            <span>Authorize Additional Administrator</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">
                Supabase Auth User ID (UUID)
              </label>
              <input
                type="text"
                required
                value={newAdminUserId}
                onChange={(e) => setNewAdminUserId(e.target.value)}
                placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">
                Administrator Email Address
              </label>
              <input
                type="email"
                required
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                placeholder="client-admin@company.com"
                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Authorize Admin User ID</span>
          </button>
        </form>
      </div>

      {/* Commercial Client Transfer & Handoff Guide */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <button
          type="button"
          onClick={() => setShowHandoffGuide(!showHandoffGuide)}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-sky-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Commercial Client Delivery &amp; Ownership Transfer Guide</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Step-by-step procedure to hand off this portfolio to a new client with their own independent Supabase project.
              </p>
            </div>
          </div>
          {showHandoffGuide ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {showHandoffGuide && (
          <div className="pt-3 border-t border-slate-800 space-y-4 text-xs text-slate-300 leading-relaxed">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="font-bold text-white text-xs flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-400 inline-flex items-center justify-center text-[10px]">1</span>
                <span>Create Client's Dedicated Supabase Project</span>
              </span>
              <p className="text-slate-400 text-[11px] pl-6.5">
                Have the client register at <strong className="text-white">supabase.com</strong> and create a fresh project (e.g. <code>client-portfolio</code>). They will be the sole organization owner with root database authority.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="font-bold text-white text-xs flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-400 inline-flex items-center justify-center text-[10px]">2</span>
                <span>Execute the SQL Schema &amp; Storage Setup</span>
              </span>
              <p className="text-slate-400 text-[11px] pl-6.5">
                In the client's Supabase dashboard, open <strong className="text-white">SQL Editor</strong>, paste the full SQL script from below, and click <strong className="text-white">Run</strong>. This creates all tables, RLS policies, and the <code>portfolio-media</code> storage bucket.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="font-bold text-white text-xs flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-400 inline-flex items-center justify-center text-[10px]">3</span>
                <span>Create the Client's Admin Account in Supabase Auth</span>
              </span>
              <p className="text-slate-400 text-[11px] pl-6.5">
                Navigate to <strong className="text-white">Authentication → Users</strong> → <strong className="text-white">Add User</strong>. Enter the client's email (e.g. <code>owner@clientdomain.com</code>), set a secure password, and copy their generated <strong className="text-indigo-400">User UID</strong>.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="font-bold text-white text-xs flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-400 inline-flex items-center justify-center text-[10px]">4</span>
                <span>Authorize the Client's User ID as Administrator</span>
              </span>
              <p className="text-slate-400 text-[11px] pl-6.5">
                In the client's Supabase SQL Editor, run:
                <code className="block bg-slate-900 p-2 rounded mt-1 font-mono text-emerald-400 text-[11px] select-all break-all">
                  INSERT INTO public.admin_users (user_id, email, role) VALUES ('PASTE_CLIENT_USER_UID_HERE', 'owner@clientdomain.com', 'admin') ON CONFLICT (user_id) DO UPDATE SET role = 'admin', email = EXCLUDED.email;
                </code>
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="font-bold text-white text-xs flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-400 inline-flex items-center justify-center text-[10px]">5</span>
                <span>Deploy with Environment Variables &amp; Zero Hardcoded Secrets</span>
              </span>
              <p className="text-slate-400 text-[11px] pl-6.5">
                Provide the client's hosting platform (Vercel, Cloud Run, Netlify, etc.) with:
                <code className="block bg-slate-900 p-2 rounded mt-1 font-mono text-slate-300 text-[11px]">
                  VITE_SUPABASE_URL="https://client-project.supabase.co"<br />
                  VITE_SUPABASE_ANON_KEY="client-public-anon-key"
                </code>
                Never configure the service-role key in frontend deployment.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* SQL Migration Script */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Supabase SQL Schema &amp; Row Level Security (RLS)</h3>
          </div>
          <button
            type="button"
            onClick={handleCopySql}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all"
          >
            {copiedSql ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Full SQL Script</span>
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Paste and run this script in your Supabase project (<strong className="text-white">Dashboard → SQL Editor</strong>) to automatically create all required tables, enable Row Level Security, allow public read of published content, and restrict write actions to authenticated admins.
        </p>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 max-h-56 overflow-y-auto custom-scrollbar">
          <pre>{getSupabaseMigrationSql()}</pre>
        </div>
      </div>

      {/* Data Management & Backup */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">Data Backup &amp; Recovery</h3>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={handleExportData}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Portfolio JSON Backup</span>
          </button>

          <button
            type="button"
            onClick={resetToDefaults}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-rose-950/40 text-rose-400 hover:text-rose-300 text-xs font-semibold border border-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Factory Defaults</span>
          </button>
        </div>
      </div>
    </div>
  );
};
