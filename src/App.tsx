import React, { useState, useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

function AppContent() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname);
  const { adminUser, isLoading, data } = usePortfolio();

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const publicEl = document.getElementById('public-website');

    if (currentPath === '/admin-login') {
      document.body.classList.add('admin-mode');
      if (publicEl) publicEl.style.display = 'none';
      document.title = 'Admin Login — Krish Kumar';
    } else if (currentPath === '/admin' || currentPath.startsWith('/admin/')) {
      // Protected Route check
      if (!isLoading && !adminUser) {
        // Redirect non-authenticated users to /admin-login
        window.history.replaceState({}, '', '/admin-login');
        setCurrentPath('/admin-login');
      } else {
        document.body.classList.add('admin-mode');
        if (publicEl) publicEl.style.display = 'none';
        document.title = 'Admin Space — Krish Kumar';
      }
    } else {
      // Public site route
      document.body.classList.remove('admin-mode');
      if (publicEl) publicEl.style.display = '';
      if (currentPath === '/') {
        document.title = data.seo.title || 'Krish Kumar — Digital Marketer, UI/UX Designer & Creative Strategist';
      }
    }
  }, [currentPath, adminUser, isLoading, data.seo.title]);

  // If visiting admin-login
  if (currentPath === '/admin-login') {
    return (
      <AdminLogin
        onLoginSuccess={() => navigateTo('/admin')}
      />
    );
  }

  // If visiting /admin
  if (currentPath === '/admin' || currentPath.startsWith('/admin/')) {
    if (isLoading) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm font-medium">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <span>Verifying Admin Authorization...</span>
          </div>
        </div>
      );
    }

    if (adminUser) {
      return <AdminDashboard />;
    }

    // Fallback while redirect takes effect
    return (
      <AdminLogin
        onLoginSuccess={() => navigateTo('/admin')}
      />
    );
  }

  // Public visitor mode: public website HTML is shown
  return null;
}

export default function App() {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
}
