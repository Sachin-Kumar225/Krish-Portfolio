import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Database,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  ShieldAlert,
  RefreshCw,
  KeyRound,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  isSupabaseConfigured,
  getSavedConfig,
  saveSupabaseConfig,
  testSupabaseConnection,
} from '../../lib/supabase';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const { login, signUp, adminUser, refreshSupabaseStatus, supabaseConnected } = usePortfolio();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Onboarding state when user is authenticated in Supabase Auth but not yet in admin_users
  const [onboardingInfo, setOnboardingInfo] = useState<{
    userId: string;
    userEmail: string;
    noAdminsConfigured: boolean;
  } | null>(null);
  const [copiedOnboardingSql, setCopiedOnboardingSql] = useState(false);

  // Optional Supabase setup drawer on login
  const [showSupabaseSetup, setShowSupabaseSetup] = useState(false);
  const savedCfg = getSavedConfig();
  const [supabaseUrl, setSupabaseUrl] = useState(savedCfg.url);
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(savedCfg.anonKey);
  const [configSavedNotice, setConfigSavedNotice] = useState('');

  useEffect(() => {
    // If already logged in, redirect to dashboard
    if (adminUser) {
      onLoginSuccess();
    }
    document.title = 'Admin Access — Portfolio Management';
  }, [adminUser, onLoginSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMessage('Please provide both an email address and password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setOnboardingInfo(null);

    try {
      const res = await login(email, password);
      if (res.success) {
        onLoginSuccess();
      } else if (res.notAuthorized && res.userId) {
        setOnboardingInfo({
          userId: res.userId,
          userEmail: res.userEmail || email.trim(),
          noAdminsConfigured: Boolean(res.noAdminsConfigured),
        });
      } else {
        setErrorMessage(res.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email.trim() || password.length < 6) {
      setErrorMessage('Please provide a valid email and a password of at least 6 characters to register in Supabase Auth.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setOnboardingInfo(null);

    try {
      const res = await signUp(email, password);
      if (res.success) {
        onLoginSuccess();
      } else if (res.notAuthorized && res.userId) {
        setOnboardingInfo({
          userId: res.userId,
          userEmail: res.userEmail || email.trim(),
          noAdminsConfigured: Boolean(res.noAdminsConfigured),
        });
      } else {
        setErrorMessage(res.error || 'Account creation in Supabase failed.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error creating account in Supabase.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyOnboardingSql = () => {
    if (!onboardingInfo) return;
    const sql = `INSERT INTO public.admin_users (user_id, email, role) VALUES ('${onboardingInfo.userId}', '${onboardingInfo.userEmail}', 'admin') ON CONFLICT (user_id) DO UPDATE SET role = 'admin', email = EXCLUDED.email;`;
    navigator.clipboard.writeText(sql);
    setCopiedOnboardingSql(true);
    setTimeout(() => setCopiedOnboardingSql(false), 3000);
  };

  const handleSaveConfig = async () => {
    saveSupabaseConfig(supabaseUrl.trim(), supabaseAnonKey.trim());
    await refreshSupabaseStatus();
    const res = await testSupabaseConnection();
    if (res.success) {
      setConfigSavedNotice('Connected to Supabase! You can now sign in.');
    } else {
      setConfigSavedNotice(`Saved! Note: ${res.message}`);
    }
    setTimeout(() => setConfigSavedNotice(''), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 text-slate-100 select-none">
      <div className="w-full max-w-md space-y-6">
        {/* Brand & Badge */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-500 shadow-xl shadow-indigo-600/20 text-white mb-2">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Admin Space Access</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Secure management portal for Krish Kumar Portfolio.
          </p>

          <div className="pt-1 flex items-center justify-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                supabaseConnected
                  ? 'bg-emerald-950/50 text-emerald-400 border-emerald-800/60'
                  : 'bg-amber-950/50 text-amber-300 border-amber-800/60'
              }`}
            >
              <Database className="w-3 h-3" />
              <span>{supabaseConnected ? 'Supabase Auth Ready' : 'Supabase Not Configured'}</span>
            </span>
          </div>
        </div>

        {/* Login Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5">
          {onboardingInfo && (
            <div className="p-4 rounded-xl bg-amber-950/60 border border-amber-600/60 text-amber-100 text-xs space-y-3 shadow-lg">
              <div className="flex items-start gap-2 text-amber-300 font-bold">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                <div>
                  <div>Supabase Authentication Verified</div>
                  <div className="text-[11px] font-normal text-amber-200/90 mt-0.5">
                    User ID authorization required to enter the Admin Space.
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/90 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Your Verified Supabase Auth User ID:</div>
                <div className="font-mono text-[11px] text-white select-all break-all bg-slate-900 p-1.5 rounded border border-slate-800 font-medium">
                  {onboardingInfo.userId}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] text-amber-300 font-semibold uppercase tracking-wider">
                  Execute in Supabase SQL Editor to Authorize:
                </div>
                <pre className="p-2 rounded-lg bg-slate-950/90 border border-slate-800 font-mono text-[11px] text-emerald-400 overflow-x-auto select-all">
                  {`INSERT INTO public.admin_users (user_id, email, role) VALUES ('${onboardingInfo.userId}', '${onboardingInfo.userEmail}', 'admin') ON CONFLICT (user_id) DO UPDATE SET role = 'admin', email = EXCLUDED.email;`}
                </pre>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCopyOnboardingSql}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition-colors"
                >
                  {copiedOnboardingSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedOnboardingSql ? 'Copied SQL!' : 'Copy SQL Command'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Check Access</span>
                </button>
              </div>
            </div>
          )}

          {errorMessage && !onboardingInfo && (
            <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-800/60 text-rose-300 text-xs flex flex-col gap-2">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <div className="flex-1 leading-relaxed">{errorMessage}</div>
              </div>
              {supabaseConnected && (
                <button
                  type="button"
                  onClick={handleSignUp}
                  disabled={isLoading}
                  className="mt-1 w-full py-2 px-3 rounded-lg bg-indigo-900/60 hover:bg-indigo-900 text-indigo-200 text-xs font-semibold border border-indigo-700/60 transition-colors text-center"
                >
                  Register this Email in Supabase Auth
                </button>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@client-site.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-slate-400 hover:text-white absolute right-3 top-1/2 -translate-y-1/2"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <span>Verifying Authentication...</span>
              ) : (
                <>
                  <span>Sign In to Admin Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Helper hint */}
          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 text-center leading-relaxed">
            Protected by Supabase Authentication &amp; Row Level Security.
          </div>
        </div>

        {/* Collapsible Supabase Project Setup Drawer */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
          <button
            type="button"
            onClick={() => setShowSupabaseSetup(!showSupabaseSetup)}
            className="w-full flex items-center justify-between text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-indigo-400" />
              <span>Configure Supabase Project Credentials</span>
            </div>
            {showSupabaseSetup ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showSupabaseSetup && (
            <div className="space-y-3 pt-2 text-xs border-t border-slate-800">
              <p className="text-slate-400 text-[11px] leading-relaxed">
                If you already have a Supabase project, enter your Project URL and public Anon API Key below to connect real-time Supabase Auth.
              </p>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Supabase Project URL</label>
                <input
                  type="text"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                  placeholder="https://xyzcompany.supabase.co"
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Supabase Anon Key</label>
                <input
                  type="password"
                  value={supabaseAnonKey}
                  onChange={(e) => setSupabaseAnonKey(e.target.value)}
                  placeholder="eyJhbGciOi..."
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              {configSavedNotice && (
                <div className="p-2 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-[11px]">
                  {configSavedNotice}
                </div>
              )}

              <button
                type="button"
                onClick={handleSaveConfig}
                className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
              >
                Save Supabase Credentials
              </button>
            </div>
          )}
        </div>

        {/* Back to Public Site link */}
        <div className="text-center pt-2">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            <span>← Return to Public Portfolio Website</span>
          </a>
        </div>
      </div>
    </div>
  );
};
