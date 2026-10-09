import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';

// Configuration keys and defaults
const STORAGE_KEY_CONFIG = 'krish_supabase_config';
const STORAGE_KEY_SESSION = 'krish_admin_session';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

// Clean Supabase URL by trimming, removing /rest/v1 or trailing slashes
export function sanitizeSupabaseUrl(url: string): string {
  if (!url) return '';
  return url
    .trim()
    .replace(/\/rest\/v1\/?$/, '')
    .replace(/\/+$/, '');
}

// Read configuration from environment or localStorage
export function getSavedConfig(): SupabaseConfig {
  const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

  if (envUrl && envKey && !envUrl.includes('your-project-id')) {
    return { url: sanitizeSupabaseUrl(envUrl), anonKey: envKey.trim() };
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.url && parsed.anonKey) {
        return { url: sanitizeSupabaseUrl(parsed.url), anonKey: parsed.anonKey.trim() };
      }
    }
  } catch (e) {
    console.warn('Could not read supabase config from localStorage', e);
  }

  return { url: '', anonKey: '' };
}

export function saveSupabaseConfig(url: string, anonKey: string) {
  try {
    const clean = sanitizeSupabaseUrl(url);
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify({ url: clean, anonKey: anonKey.trim() }));
    // Re-initialize client
    initSupabaseClient();
  } catch (e) {
    console.error('Error saving supabase config', e);
  }
}

export function clearSupabaseConfig() {
  try {
    localStorage.removeItem(STORAGE_KEY_CONFIG);
    supabaseInstance = null;
  } catch (e) {
    console.error('Error clearing supabase config', e);
  }
}

let supabaseInstance: SupabaseClient | null = null;

export function initSupabaseClient(): SupabaseClient | null {
  const config = getSavedConfig();
  if (config.url && config.anonKey && isValidUrl(config.url)) {
    try {
      supabaseInstance = createClient(config.url, config.anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          storage: window.localStorage,
        },
      });
      return supabaseInstance;
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err);
      supabaseInstance = null;
    }
  } else {
    supabaseInstance = null;
  }
  return null;
}

function isValidUrl(str: string): boolean {
  try {
    const u = new URL(str);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

// Initial client initialization
initSupabaseClient();

export function getSupabase(): SupabaseClient | null {
  if (!supabaseInstance) {
    initSupabaseClient();
  }
  return supabaseInstance;
}

export function isSupabaseConfigured(): boolean {
  const config = getSavedConfig();
  return Boolean(config.url && config.anonKey && isValidUrl(config.url));
}

// Test live Supabase connection
export async function testSupabaseConnection(): Promise<{ success: boolean; message: string; latency?: number }> {
  const client = getSupabase();
  if (!client) {
    return {
      success: false,
      message: 'Supabase URL or Anon Key is missing. Please configure credentials in Settings or .env file.',
    };
  }

  const start = Date.now();
  try {
    // Attempt a light ping via auth session or health check
    const { error } = await client.auth.getSession();
    if (error) {
      return { success: false, message: `Supabase Auth check failed: ${error.message}` };
    }

    const latency = Date.now() - start;
    return {
      success: true,
      message: `Successfully connected to Supabase (${latency}ms response)`,
      latency,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'Network error connecting to Supabase',
    };
  }
}

// Detailed Schema & Table status diagnosis
export interface SupabaseSchemaStatus {
  connected: boolean;
  authWorking: boolean;
  tables: {
    portfolio_content: boolean;
    projects: boolean;
    skills: boolean;
    certificates: boolean;
    blog_posts: boolean;
    media_files: boolean;
    contact_inquiries: boolean;
    admin_users?: boolean;
  };
  storageBucket: boolean;
}

export async function checkSupabaseSchemaStatus(): Promise<SupabaseSchemaStatus> {
  const status: SupabaseSchemaStatus = {
    connected: false,
    authWorking: false,
    tables: {
      portfolio_content: false,
      projects: false,
      skills: false,
      certificates: false,
      blog_posts: false,
      media_files: false,
      contact_inquiries: false,
      admin_users: false,
    },
    storageBucket: false,
  };

  const client = getSupabase();
  if (!client) return status;

  try {
    const { error: authErr } = await client.auth.getSession();
    status.connected = !authErr;
    status.authWorking = !authErr;
  } catch (e) {
    status.connected = false;
    return status;
  }

  // Check tables
  const tableKeys = ['portfolio_content', 'projects', 'skills', 'certificates', 'blog_posts', 'media_files', 'contact_inquiries', 'admin_users'] as const;
  for (const t of tableKeys) {
    try {
      const { error } = await client.from(t).select('*').limit(1);
      status.tables[t] = !error || (error.code !== 'PGRST205' && error.code !== '42P01');
    } catch {
      status.tables[t] = false;
    }
  }

  // Check Storage
  try {
    const { data: buckets } = await client.storage.listBuckets();
    status.storageBucket = Boolean(buckets?.some((b) => b.id === 'portfolio-media' || b.name === 'portfolio-media'));
  } catch {
    status.storageBucket = false;
  }

  return status;
}

// Admin Authentication Helpers
export interface AdminUser {
  id: string;
  email: string;
  role: string;
  isSupabaseAuth: boolean;
}

export interface LoginResult {
  success: boolean;
  user?: AdminUser;
  error?: string;
  notAuthorized?: boolean;
  userId?: string;
  userEmail?: string;
  noAdminsConfigured?: boolean;
}

export interface AdminAccountItem {
  id: string;
  user_id: string;
  email: string;
  role: string;
  created_at: string;
}

export async function signUpAdmin(email: string, password: string): Promise<LoginResult> {
  const client = getSupabase();
  if (client) {
    try {
      const { data, error } = await client.auth.signUp({
        email: email.trim(),
        password: password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data && data.user) {
        // Check if this newly registered user is authorized in public.admin_users
        const { data: adminRecord } = await client
          .from('admin_users')
          .select('id, user_id, role, email')
          .eq('user_id', data.user.id)
          .maybeSingle();

        if (!adminRecord) {
          const { count } = await client
            .from('admin_users')
            .select('*', { count: 'exact', head: true });

          return {
            success: false,
            notAuthorized: true,
            userId: data.user.id,
            userEmail: data.user.email || email.trim(),
            noAdminsConfigured: count === 0,
            error: 'Account created in Supabase Auth. To access the admin dashboard, authorize this User ID in your database.',
          };
        }

        const adminUser: AdminUser = {
          id: data.user.id,
          email: data.user.email || email,
          role: adminRecord.role || 'admin',
          isSupabaseAuth: true,
        };
        localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(adminUser));
        return { success: true, user: adminUser };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'Supabase account creation failed' };
    }
  }
  return { success: false, error: 'Supabase client is not connected' };
}

export async function loginAdmin(email: string, password: string): Promise<LoginResult> {
  const client = getSupabase();

  if (client && isSupabaseConfigured()) {
    // Authenticate with real Supabase Auth
    try {
      const { data, error } = await client.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data && data.user) {
        // Check if verified Supabase Auth user ID exists in public.admin_users
        const { data: adminRecord } = await client
          .from('admin_users')
          .select('id, user_id, role, email')
          .eq('user_id', data.user.id)
          .maybeSingle();

        if (!adminRecord) {
          const { count } = await client
            .from('admin_users')
            .select('*', { count: 'exact', head: true });

          return {
            success: false,
            notAuthorized: true,
            userId: data.user.id,
            userEmail: data.user.email || email.trim(),
            noAdminsConfigured: count === 0,
            error: 'Authentication verified by Supabase, but this User ID is not authorized as an administrator.',
          };
        }

        const adminUser: AdminUser = {
          id: data.user.id,
          email: data.user.email || email,
          role: adminRecord.role || 'admin',
          isSupabaseAuth: true,
        };
        localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(adminUser));
        return { success: true, user: adminUser };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'Supabase authentication failed' };
    }
  }

  // Offline / Demo development mode when Supabase is not configured yet
  if (!isSupabaseConfigured()) {
    if (password.length >= 6) {
      const localAdmin: AdminUser = {
        id: 'local-admin-' + Math.random().toString(36).substring(2, 9),
        email: email.trim() || 'admin@client-site.local',
        role: 'admin',
        isSupabaseAuth: false,
      };
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(localAdmin));
      return { success: true, user: localAdmin };
    }
    return {
      success: false,
      error: 'In offline mode, enter any admin email and a password of at least 6 characters (or configure Supabase URL & Anon Key).',
    };
  }

  return {
    success: false,
    error: 'Invalid credentials. Please verify your email and password.',
  };
}

export async function logoutAdmin(): Promise<void> {
  const client = getSupabase();
  if (client) {
    try {
      await client.auth.signOut();
    } catch (e) {
      console.warn('Supabase signOut error', e);
    }
  }
  localStorage.removeItem(STORAGE_KEY_SESSION);
}

export async function getActiveAdminSession(): Promise<AdminUser | null> {
  const client = getSupabase();
  if (client && isSupabaseConfigured()) {
    try {
      const { data } = await client.auth.getSession();
      if (data.session && data.session.user) {
        // Strictly verify verified Auth User ID against public.admin_users
        const { data: adminRecord } = await client
          .from('admin_users')
          .select('role')
          .eq('user_id', data.session.user.id)
          .maybeSingle();

        if (adminRecord) {
          return {
            id: data.session.user.id,
            email: data.session.user.email || 'admin',
            role: adminRecord.role || 'admin',
            isSupabaseAuth: true,
          };
        } else {
          // Logged into Supabase Auth, but revoked or not authorized as admin
          localStorage.removeItem(STORAGE_KEY_SESSION);
          return null;
        }
      }
    } catch (e) {
      console.warn('Error fetching supabase session', e);
    }
  }

  // Stored session for offline testing
  if (!isSupabaseConfigured()) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SESSION);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      // ignore
    }
  }

  return null;
}

// Fetch authorized administrators list from database
export async function fetchAuthorizedAdmins(): Promise<AdminAccountItem[]> {
  const client = getSupabase();
  if (!client || !isSupabaseConfigured()) return [];
  try {
    const { data, error } = await client
      .from('admin_users')
      .select('id, user_id, email, role, created_at')
      .order('created_at', { ascending: true });
    if (!error && data) {
      return data as AdminAccountItem[];
    }
  } catch (e) {
    console.warn('Error fetching authorized admins:', e);
  }
  return [];
}

// Add an authorized admin by Supabase Auth User ID
export async function addAuthorizedAdmin(
  userId: string,
  email: string,
  role = 'admin'
): Promise<{ success: boolean; error?: string }> {
  const client = getSupabase();
  if (!client || !isSupabaseConfigured()) {
    return { success: false, error: 'Supabase client is not connected' };
  }
  try {
    const { error } = await client.from('admin_users').insert({
      user_id: userId.trim(),
      email: email.trim().toLowerCase(),
      role: role.trim(),
    });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to add admin user' };
  }
}

// Remove an authorized admin
export async function removeAuthorizedAdmin(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const client = getSupabase();
  if (!client || !isSupabaseConfigured()) {
    return { success: false, error: 'Supabase client is not connected' };
  }
  try {
    const { error } = await client.from('admin_users').delete().eq('id', id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to remove admin user' };
  }
}

// Media Upload to Supabase Storage with base64 fallback
export async function uploadMediaFile(
  file: File,
  bucketName = 'portfolio-media',
  folder = 'uploads'
): Promise<{ url: string; path?: string; error?: string }> {
  const client = getSupabase();

  if (client) {
    try {
      const ext = file.name.split('.').pop() || 'jpg';
      const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = `${folder}/${Date.now()}_${cleanName}`;

      const { data, error } = await client.storage.from(bucketName).upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

      if (!error && data) {
        const { data: publicUrlData } = client.storage.from(bucketName).getPublicUrl(filePath);
        if (publicUrlData && publicUrlData.publicUrl) {
          return { url: publicUrlData.publicUrl, path: filePath };
        }
      } else if (error) {
        console.warn('Supabase storage upload error, falling back to data URL:', error.message);
      }
    } catch (err: any) {
      console.warn('Supabase upload exception:', err);
    }
  }

  // Fallback: convert file to Base64 data URL
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve({ url: e.target?.result as string });
    };
    reader.onerror = () => {
      resolve({ url: '', error: 'Failed to read file locally' });
    };
    reader.readAsDataURL(file);
  });
}

// Complete SQL script for Supabase Database & Row Level Security Setup
export function getSupabaseMigrationSql(): string {
  return `-- ==============================================================================
-- KRISH KUMAR PORTFOLIO — SECURE SUPABASE DATABASE & ROW LEVEL SECURITY (RLS)
-- Run this script in the Supabase Dashboard -> SQL Editor
-- Safe to re-run: preserves existing data and creates missing tables/columns
-- ==============================================================================

-- 1. Enable Required PostgreSQL Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Dedicated Authorized Admin Accounts Table
-- Uses verified Supabase Auth user IDs (auth.users.id) to enforce administrative authority
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT unique_admin_user_id UNIQUE (user_id)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_admin_users_user_id ON public.admin_users(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);

-- 3. Security Definer Function: Server-Side Admin Role Verification
-- Strictly verifies that auth.uid() matches an authorized record in public.admin_users
-- Never uses email matching, client-supplied parameters, or unverified claims
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT (auth.uid() IS NOT NULL) AND EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE user_id = auth.uid()
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, anon;

-- Protect admin_users table with RLS
-- Ordinary users cannot read or write to admin_users; only verified admins can manage accounts
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin view admin users" ON public.admin_users;
CREATE POLICY "Admin view admin users" ON public.admin_users
  FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage admin users" ON public.admin_users;
CREATE POLICY "Admin manage admin users" ON public.admin_users
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 4. General Portfolio Content Table (Hero, About, Contact, Settings, SEO)
CREATE TABLE IF NOT EXISTS public.portfolio_content (
  id TEXT PRIMARY KEY,
  section TEXT NOT NULL,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_portfolio_content_section ON public.portfolio_content (section);
ALTER TABLE public.portfolio_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read portfolio content" ON public.portfolio_content;
CREATE POLICY "Public read portfolio content" ON public.portfolio_content
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Admin write portfolio content" ON public.portfolio_content;
CREATE POLICY "Admin write portfolio content" ON public.portfolio_content
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 5. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  short_description TEXT,
  full_description TEXT,
  cover_image TEXT,
  tools TEXT[] DEFAULT '{}',
  live_url TEXT,
  github_url TEXT,
  client TEXT,
  timeline TEXT,
  role TEXT,
  published BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure non-destructive column additions if table already existed
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS details JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_projects_published_order ON public.projects (published, sort_order);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects (category);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read published projects" ON public.projects;
CREATE POLICY "Public read published projects" ON public.projects
  FOR SELECT TO anon, authenticated USING (published = true OR public.is_admin());

DROP POLICY IF EXISTS "Admin manage all projects" ON public.projects;
CREATE POLICY "Admin manage all projects" ON public.projects
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 6. Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  proficiency INT DEFAULT 90,
  icon TEXT DEFAULT '🎯',
  description TEXT,
  sort_order INT DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.skills ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0;
CREATE INDEX IF NOT EXISTS idx_skills_category_order ON public.skills (category, sort_order);
CREATE INDEX IF NOT EXISTS idx_skills_published ON public.skills (published);
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read published skills" ON public.skills;
CREATE POLICY "Public read published skills" ON public.skills
  FOR SELECT TO anon, authenticated USING (published = true OR public.is_admin());

DROP POLICY IF EXISTS "Admin manage skills" ON public.skills;
CREATE POLICY "Admin manage skills" ON public.skills
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 7. Certificates Table
CREATE TABLE IF NOT EXISTS public.certificates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  organization TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  credential_id TEXT,
  link TEXT,
  image_url TEXT,
  description TEXT,
  published BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0;
CREATE INDEX IF NOT EXISTS idx_certificates_order ON public.certificates (sort_order);
CREATE INDEX IF NOT EXISTS idx_certificates_published ON public.certificates (published);
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read published certificates" ON public.certificates;
CREATE POLICY "Public read published certificates" ON public.certificates
  FOR SELECT TO anon, authenticated USING (published = true OR public.is_admin());

DROP POLICY IF EXISTS "Admin manage certificates" ON public.certificates;
CREATE POLICY "Admin manage certificates" ON public.certificates
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 8. Blog Posts Table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT,
  short_description TEXT,
  category TEXT NOT NULL,
  cover_badge TEXT,
  read_time TEXT DEFAULT '5 min read',
  date TEXT,
  iso_date TEXT,
  featured_image TEXT,
  tags TEXT[] DEFAULT '{}',
  author JSONB DEFAULT '{"name":"Krish Kumar","role":"Digital Marketer & Creative Strategist"}'::jsonb,
  content JSONB DEFAULT '[]'::jsonb,
  published BOOLEAN DEFAULT true,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_date ON public.blog_posts (published, iso_date DESC);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read published blog posts" ON public.blog_posts;
CREATE POLICY "Public read published blog posts" ON public.blog_posts
  FOR SELECT TO anon, authenticated USING (published = true OR public.is_admin());

DROP POLICY IF EXISTS "Admin manage blog posts" ON public.blog_posts;
CREATE POLICY "Admin manage blog posts" ON public.blog_posts
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 9. Media Files Table
CREATE TABLE IF NOT EXISTS public.media_files (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  file_type TEXT,
  file_size INT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_media_files_category ON public.media_files (category);
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read media" ON public.media_files;
CREATE POLICY "Public read media" ON public.media_files
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Admin manage media" ON public.media_files;
CREATE POLICY "Admin manage media" ON public.media_files
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 10. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.contact_inquiries ADD COLUMN IF NOT EXISTS read BOOLEAN DEFAULT false;
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created ON public.contact_inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_read ON public.contact_inquiries (read);
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Public visitors can submit contact messages
DROP POLICY IF EXISTS "Public can insert contact inquiries" ON public.contact_inquiries;
CREATE POLICY "Public can insert contact inquiries" ON public.contact_inquiries
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Only specifically authorized admin can read, mark as read, or delete inquiries
DROP POLICY IF EXISTS "Admin view contact inquiries" ON public.contact_inquiries;
CREATE POLICY "Admin view contact inquiries" ON public.contact_inquiries
  FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "Admin update contact inquiries" ON public.contact_inquiries;
CREATE POLICY "Admin update contact inquiries" ON public.contact_inquiries
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin delete contact inquiries" ON public.contact_inquiries;
CREATE POLICY "Admin delete contact inquiries" ON public.contact_inquiries
  FOR DELETE TO authenticated USING (public.is_admin());

-- 11. Supabase Storage Bucket setup for 'portfolio-media'
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Public visitors can view media files
DROP POLICY IF EXISTS "Public read portfolio media" ON storage.objects;
CREATE POLICY "Public read portfolio media" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'portfolio-media');

-- Only verified admin can upload media
DROP POLICY IF EXISTS "Admin upload portfolio media" ON storage.objects;
CREATE POLICY "Admin upload portfolio media" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-media' AND public.is_admin());

-- Only verified admin can update or delete media
DROP POLICY IF EXISTS "Admin update delete portfolio media" ON storage.objects;
CREATE POLICY "Admin update delete portfolio media" ON storage.objects
  FOR ALL TO authenticated USING (bucket_id = 'portfolio-media' AND public.is_admin())
  WITH CHECK (bucket_id = 'portfolio-media' AND public.is_admin());
`;
}
