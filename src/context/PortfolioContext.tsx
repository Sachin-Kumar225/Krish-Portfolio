import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  PortfolioData,
  initialPortfolioData,
  HomepageContent,
  AboutContent,
  SkillItem,
  ProjectItem,
  CertificateItem,
  BlogPostItem,
  ContactInfo,
  SocialLinkItem,
  SeoConfig,
  MediaItem,
  WebsiteSettings,
} from '../data/defaultPortfolioData';
import {
  getSupabase,
  isSupabaseConfigured,
  testSupabaseConnection,
  checkSupabaseSchemaStatus,
  SupabaseSchemaStatus,
  signUpAdmin,
  loginAdmin,
  logoutAdmin,
  getActiveAdminSession,
  AdminUser,
} from '../lib/supabase';

const LOCAL_STORAGE_DATA_KEY = 'krish_portfolio_data';

interface PortfolioContextType {
  data: PortfolioData;
  isLoading: boolean;
  isSaving: boolean;
  saveStatus: string;
  supabaseConnected: boolean;
  schemaStatus: SupabaseSchemaStatus | null;
  adminUser: AdminUser | null;
  // Auth
  login: (email: string, password: string) => Promise<{
    success: boolean;
    error?: string;
    notAuthorized?: boolean;
    userId?: string;
    userEmail?: string;
    noAdminsConfigured?: boolean;
  }>;
  signUp: (email: string, password: string) => Promise<{
    success: boolean;
    error?: string;
    notAuthorized?: boolean;
    userId?: string;
    userEmail?: string;
    noAdminsConfigured?: boolean;
  }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<AdminUser | null>;
  refreshSupabaseStatus: () => Promise<void>;
  // Section updaters
  updateHomepage: (content: Partial<HomepageContent>) => void;
  updateAbout: (content: Partial<AboutContent>) => void;
  updateSkills: (skills: SkillItem[]) => void;
  addSkill: (skill: Omit<SkillItem, 'id'>) => void;
  editSkill: (id: string, skill: Partial<SkillItem>) => void;
  deleteSkill: (id: string) => void;
  updateProjects: (projects: ProjectItem[]) => void;
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  editProject: (id: string, project: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  updateCertificates: (certs: CertificateItem[]) => void;
  addCertificate: (cert: Omit<CertificateItem, 'id'>) => void;
  editCertificate: (id: string, cert: Partial<CertificateItem>) => void;
  deleteCertificate: (id: string) => void;
  updateBlog: (posts: BlogPostItem[]) => void;
  addBlogPost: (post: Omit<BlogPostItem, 'id'>) => void;
  editBlogPost: (id: string, post: Partial<BlogPostItem>) => void;
  deleteBlogPost: (id: string) => void;
  updateContact: (contact: Partial<ContactInfo>) => void;
  submitContactInquiry: (inquiry: { name: string; email: string; subject?: string; message: string }) => Promise<boolean>;
  markInquiryRead: (id: string) => void;
  deleteInquiry: (id: string) => void;
  updateSocialLinks: (links: SocialLinkItem[]) => void;
  addSocialLink: (link: Omit<SocialLinkItem, 'id'>) => void;
  editSocialLink: (id: string, link: Partial<SocialLinkItem>) => void;
  deleteSocialLink: (id: string) => void;
  updateSeo: (seo: Partial<SeoConfig>) => void;
  addMedia: (media: Omit<MediaItem, 'id'>) => void;
  deleteMedia: (id: string) => void;
  updateSettings: (settings: Partial<WebsiteSettings>) => void;
  saveChanges: (newData?: PortfolioData) => Promise<{ success: boolean; message: string }>;
  resetToDefaults: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_DATA_KEY);
      if (stored) {
        return { ...initialPortfolioData, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn('Failed to load portfolio data from localStorage', e);
    }
    return initialPortfolioData;
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string>('All changes synced');
  const [supabaseConnected, setSupabaseConnected] = useState<boolean>(false);
  const [schemaStatus, setSchemaStatus] = useState<SupabaseSchemaStatus | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  // Synchronize data to the public DOM elements so public visitors see updated content
  const syncPublicDom = useCallback((currentData: PortfolioData) => {
    try {
      // 1. Navigation Logo
      const navLogo = document.querySelector('.nav-logo');
      if (navLogo && currentData.settings.logoText) {
        navLogo.textContent = currentData.settings.logoText;
      }

      // 2. Hero Elements
      const heroTitle = document.querySelector('.hero-title');
      if (heroTitle && currentData.homepage.heading) {
        heroTitle.textContent = currentData.homepage.heading;
      }

      const heroSubrole = document.querySelector('.hero-subrole');
      if (heroSubrole && currentData.homepage.subrole) {
        heroSubrole.textContent = currentData.homepage.subrole;
      }

      const heroIntro = document.querySelector('.hero-intro');
      if (heroIntro && currentData.homepage.intro) {
        heroIntro.textContent = currentData.homepage.intro;
      }

      const heroEyebrow = document.querySelector('.hero-eyebrow');
      if (heroEyebrow && currentData.homepage.eyebrow) {
        heroEyebrow.innerHTML = `<span class="dot"></span> ${currentData.homepage.eyebrow}`;
      }

      // Hero buttons
      const heroCtas = document.querySelectorAll('.hero-ctas .btn');
      if (heroCtas.length >= 2) {
        if (currentData.homepage.btn1Text) heroCtas[0].textContent = currentData.homepage.btn1Text;
        if (currentData.homepage.btn1Link) heroCtas[0].setAttribute('href', currentData.homepage.btn1Link);
        if (currentData.homepage.btn2Text) heroCtas[1].textContent = currentData.homepage.btn2Text;
        if (currentData.homepage.btn2Link) heroCtas[1].setAttribute('href', currentData.homepage.btn2Link);
      }

      // Hero Images
      const heroPortraitImg = document.getElementById('heroPortraitImg') as HTMLImageElement;
      if (heroPortraitImg && currentData.homepage.heroImage) {
        heroPortraitImg.src = currentData.homepage.heroImage;
      }

      const brandPortraitImg = document.getElementById('brandPortraitImg') as HTMLImageElement;
      if (brandPortraitImg && currentData.homepage.heroImage) {
        brandPortraitImg.src = currentData.homepage.heroImage;
      }

      // 3. About Elements
      const aboutLead = document.querySelector('.about-lead');
      if (aboutLead && currentData.about.lead) {
        aboutLead.textContent = currentData.about.lead;
      }

      const aboutBody = document.querySelector('.about-body');
      if (aboutBody && currentData.about.body) {
        aboutBody.textContent = currentData.about.body;
      }

      // 4. Contact Details
      const contactLinks = document.querySelectorAll('#contact a[href^="mailto:"]');
      contactLinks.forEach((el) => {
        el.setAttribute('href', `mailto:${currentData.contact.email}`);
        el.textContent = currentData.contact.email;
      });

      // 5. Footer Copyright
      const footerCopyright = document.querySelector('.footer-inner div:first-child');
      if (footerCopyright && currentData.settings.footerCopyright) {
        footerCopyright.textContent = currentData.settings.footerCopyright;
      }

      // 6. Meta Title and Description
      if (currentData.seo.title && !window.location.pathname.startsWith('/admin')) {
        document.title = currentData.seo.title;
      }
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && currentData.seo.metaDescription) {
        metaDesc.setAttribute('content', currentData.seo.metaDescription);
      }
    } catch (e) {
      console.warn('Public DOM sync warning:', e);
    }
  }, []);

  // Check Supabase connection and initial data load
  const refreshSupabaseStatus = useCallback(async () => {
    if (isSupabaseConfigured()) {
      const result = await testSupabaseConnection();
      setSupabaseConnected(result.success);
      const schema = await checkSupabaseSchemaStatus();
      setSchemaStatus(schema);
    } else {
      setSupabaseConnected(false);
      setSchemaStatus(null);
    }
  }, []);

  const checkAuth = useCallback(async (): Promise<AdminUser | null> => {
    const session = await getActiveAdminSession();
    setAdminUser(session);
    return session;
  }, []);

  // Fetch published content from Supabase if configured
  const loadData = useCallback(async () => {
    setIsLoading(true);
    await checkAuth();
    await refreshSupabaseStatus();

    const client = getSupabase();
    if (client && isSupabaseConfigured()) {
      try {
        const { data: dbData, error } = await client
          .from('portfolio_content')
          .select('section, data');

        if (!error && dbData && dbData.length > 0) {
          const merged: any = { ...initialPortfolioData };
          dbData.forEach((row: any) => {
            if (row.section && row.data) {
              merged[row.section] = row.data;
            }
          });
          setData(merged);
          localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(merged));
          syncPublicDom(merged);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Error loading from Supabase tables, falling back to local store:', err);
      }
    }

    // Fallback: local storage
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_DATA_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const merged = { ...initialPortfolioData, ...parsed };
        setData(merged);
        syncPublicDom(merged);
      } else {
        syncPublicDom(initialPortfolioData);
      }
    } catch (e) {
      syncPublicDom(initialPortfolioData);
    }
    setIsLoading(false);
  }, [checkAuth, refreshSupabaseStatus, syncPublicDom]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Save changes to localStorage and Supabase
  const saveChanges = useCallback(
    async (newData?: PortfolioData): Promise<{ success: boolean; message: string }> => {
      const targetData = newData || data;
      setIsSaving(true);
      setSaveStatus('Saving changes...');

      // 1. Save locally
      try {
        localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(targetData));
      } catch (e) {
        console.error('Failed to save to localStorage:', e);
      }

      // 2. Synchronize public DOM
      syncPublicDom(targetData);

      // 3. Save to Supabase if client is ready
      const client = getSupabase();
      if (client && isSupabaseConfigured()) {
        try {
          const sections = ['homepage', 'about', 'skills', 'projects', 'certificates', 'blog', 'contact', 'socialLinks', 'seo', 'media', 'settings'];
          const upsertPromises = sections.map((sec) =>
            client
              .from('portfolio_content')
              .upsert(
                {
                  id: sec,
                  section: sec,
                  data: (targetData as any)[sec],
                  updated_at: new Date().toISOString(),
                },
                { onConflict: 'id' }
              )
          );

          await Promise.allSettled(upsertPromises);
          setIsSaving(false);
          setSaveStatus('Saved to Supabase & Live Site');
          return { success: true, message: 'All changes successfully synchronized to Supabase and published.' };
        } catch (err: any) {
          console.warn('Supabase upsert note:', err.message);
          setIsSaving(false);
          setSaveStatus('Saved locally (Supabase tables pending migration)');
          return {
            success: true,
            message: 'Changes saved locally! Make sure to run the SQL migration script in your Supabase SQL editor.',
          };
        }
      }

      setIsSaving(false);
      setSaveStatus('Saved to Local Store');
      return { success: true, message: 'Changes saved locally. Configure Supabase in Settings to sync with cloud database.' };
    },
    [data, syncPublicDom]
  );

  // Authentication methods
  const login = async (email: string, password: string) => {
    const res = await loginAdmin(email, password);
    if (res.success && res.user) {
      setAdminUser(res.user);
      return { success: true };
    }
    return {
      success: false,
      error: res.error,
      notAuthorized: res.notAuthorized,
      userId: res.userId,
      userEmail: res.userEmail,
      noAdminsConfigured: res.noAdminsConfigured,
    };
  };

  const signUp = async (email: string, password: string) => {
    const res = await signUpAdmin(email, password);
    if (res.success && res.user) {
      setAdminUser(res.user);
      return { success: true };
    }
    return {
      success: false,
      error: res.error,
      notAuthorized: res.notAuthorized,
      userId: res.userId,
      userEmail: res.userEmail,
      noAdminsConfigured: res.noAdminsConfigured,
    };
  };

  const logout = async () => {
    await logoutAdmin();
    setAdminUser(null);
  };

  // Section Handlers
  const updateHomepage = (content: Partial<HomepageContent>) => {
    setData((prev) => {
      const updated = { ...prev, homepage: { ...prev.homepage, ...content } };
      saveChanges(updated);
      return updated;
    });
  };

  const updateAbout = (content: Partial<AboutContent>) => {
    setData((prev) => {
      const updated = { ...prev, about: { ...prev.about, ...content } };
      saveChanges(updated);
      return updated;
    });
  };

  const updateSkills = (skills: SkillItem[]) => {
    setData((prev) => {
      const updated = { ...prev, skills };
      saveChanges(updated);
      return updated;
    });
  };

  const addSkill = (skill: Omit<SkillItem, 'id'>) => {
    const newSkill: SkillItem = {
      ...skill,
      id: 'skill-' + Date.now(),
    };
    updateSkills([...data.skills, newSkill]);
  };

  const editSkill = (id: string, skill: Partial<SkillItem>) => {
    updateSkills(data.skills.map((s) => (s.id === id ? { ...s, ...skill } : s)));
  };

  const deleteSkill = (id: string) => {
    updateSkills(data.skills.filter((s) => s.id !== id));
  };

  const updateProjects = (projects: ProjectItem[]) => {
    setData((prev) => {
      const updated = { ...prev, projects };
      saveChanges(updated);
      return updated;
    });
  };

  const addProject = (project: Omit<ProjectItem, 'id'>) => {
    const newProj: ProjectItem = {
      ...project,
      id: (project.title || 'project').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'project-' + Date.now(),
    };
    updateProjects([...data.projects, newProj]);
  };

  const editProject = (id: string, project: Partial<ProjectItem>) => {
    updateProjects(data.projects.map((p) => (p.id === id ? { ...p, ...project } : p)));
  };

  const deleteProject = (id: string) => {
    updateProjects(data.projects.filter((p) => p.id !== id));
  };

  const updateCertificates = (certificates: CertificateItem[]) => {
    setData((prev) => {
      const updated = { ...prev, certificates };
      saveChanges(updated);
      return updated;
    });
  };

  const addCertificate = (cert: Omit<CertificateItem, 'id'>) => {
    const newCert: CertificateItem = {
      ...cert,
      id: 'cert-' + Date.now(),
    };
    updateCertificates([...data.certificates, newCert]);
  };

  const editCertificate = (id: string, cert: Partial<CertificateItem>) => {
    updateCertificates(data.certificates.map((c) => (c.id === id ? { ...c, ...cert } : c)));
  };

  const deleteCertificate = (id: string) => {
    updateCertificates(data.certificates.filter((c) => c.id !== id));
  };

  const updateBlog = (blog: BlogPostItem[]) => {
    setData((prev) => {
      const updated = { ...prev, blog };
      saveChanges(updated);
      return updated;
    });
  };

  const addBlogPost = (post: Omit<BlogPostItem, 'id'>) => {
    const newPost: BlogPostItem = {
      ...post,
      id: 'blog-' + Date.now(),
    };
    updateBlog([newPost, ...data.blog]);
  };

  const editBlogPost = (id: string, post: Partial<BlogPostItem>) => {
    updateBlog(data.blog.map((b) => (b.id === id ? { ...b, ...post } : b)));
  };

  const deleteBlogPost = (id: string) => {
    updateBlog(data.blog.filter((b) => b.id !== id));
  };

  const updateContact = (contact: Partial<ContactInfo>) => {
    setData((prev) => {
      const updated = { ...prev, contact: { ...prev.contact, ...contact } };
      saveChanges(updated);
      return updated;
    });
  };

  const submitContactInquiry = async (inquiry: { name: string; email: string; subject?: string; message: string }): Promise<boolean> => {
    const newInquiry = {
      id: 'inq-' + Date.now(),
      name: inquiry.name,
      email: inquiry.email,
      subject: inquiry.subject || 'Portfolio Contact Inquiry',
      message: inquiry.message,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      read: false,
    };

    // Save to local store
    setData((prev) => {
      const updated = {
        ...prev,
        contact: {
          ...prev.contact,
          inquiries: [newInquiry, ...(prev.contact.inquiries || [])],
        },
      };
      saveChanges(updated);
      return updated;
    });

    // If Supabase is available, insert into contact_inquiries table
    const client = getSupabase();
    if (client && isSupabaseConfigured()) {
      try {
        await client.from('contact_inquiries').insert([
          {
            name: inquiry.name,
            email: inquiry.email,
            subject: inquiry.subject,
            message: inquiry.message,
          },
        ]);
      } catch (e) {
        console.warn('Error inserting contact inquiry into Supabase', e);
      }
    }

    return true;
  };

  const markInquiryRead = (id: string) => {
    setData((prev) => {
      const updatedInquiries = (prev.contact.inquiries || []).map((inq) =>
        inq.id === id ? { ...inq, read: true } : inq
      );
      const updated = {
        ...prev,
        contact: { ...prev.contact, inquiries: updatedInquiries },
      };
      saveChanges(updated);
      return updated;
    });
  };

  const deleteInquiry = (id: string) => {
    setData((prev) => {
      const updatedInquiries = (prev.contact.inquiries || []).filter((inq) => inq.id !== id);
      const updated = {
        ...prev,
        contact: { ...prev.contact, inquiries: updatedInquiries },
      };
      saveChanges(updated);
      return updated;
    });
  };

  const updateSocialLinks = (socialLinks: SocialLinkItem[]) => {
    setData((prev) => {
      const updated = { ...prev, socialLinks };
      saveChanges(updated);
      return updated;
    });
  };

  const addSocialLink = (link: Omit<SocialLinkItem, 'id'>) => {
    const newLink: SocialLinkItem = {
      ...link,
      id: 'soc-' + Date.now(),
    };
    updateSocialLinks([...data.socialLinks, newLink]);
  };

  const editSocialLink = (id: string, link: Partial<SocialLinkItem>) => {
    updateSocialLinks(data.socialLinks.map((s) => (s.id === id ? { ...s, ...link } : s)));
  };

  const deleteSocialLink = (id: string) => {
    updateSocialLinks(data.socialLinks.filter((s) => s.id !== id));
  };

  const updateSeo = (seo: Partial<SeoConfig>) => {
    setData((prev) => {
      const updated = { ...prev, seo: { ...prev.seo, ...seo } };
      saveChanges(updated);
      return updated;
    });
  };

  const addMedia = (media: Omit<MediaItem, 'id'>) => {
    const newMedia: MediaItem = {
      ...media,
      id: 'med-' + Date.now(),
    };
    setData((prev) => {
      const updated = { ...prev, media: [newMedia, ...prev.media] };
      saveChanges(updated);
      return updated;
    });
  };

  const deleteMedia = (id: string) => {
    setData((prev) => {
      const updated = { ...prev, media: prev.media.filter((m) => m.id !== id) };
      saveChanges(updated);
      return updated;
    });
  };

  const updateSettings = (settings: Partial<WebsiteSettings>) => {
    setData((prev) => {
      const updated = { ...prev, settings: { ...prev.settings, ...settings } };
      saveChanges(updated);
      return updated;
    });
  };

  const resetToDefaults = () => {
    if (window.confirm('Reset all portfolio content to factory defaults? This will overwrite local customizations.')) {
      setData(initialPortfolioData);
      saveChanges(initialPortfolioData);
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isLoading,
        isSaving,
        saveStatus,
        supabaseConnected,
        schemaStatus,
        adminUser,
        login,
        signUp,
        logout,
        checkAuth,
        refreshSupabaseStatus,
        updateHomepage,
        updateAbout,
        updateSkills,
        addSkill,
        editSkill,
        deleteSkill,
        updateProjects,
        addProject,
        editProject,
        deleteProject,
        updateCertificates,
        addCertificate,
        editCertificate,
        deleteCertificate,
        updateBlog,
        addBlogPost,
        editBlogPost,
        deleteBlogPost,
        updateContact,
        submitContactInquiry,
        markInquiryRead,
        deleteInquiry,
        updateSocialLinks,
        addSocialLink,
        editSocialLink,
        deleteSocialLink,
        updateSeo,
        addMedia,
        deleteMedia,
        updateSettings,
        saveChanges,
        resetToDefaults,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
