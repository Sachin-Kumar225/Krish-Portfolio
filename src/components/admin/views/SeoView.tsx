import React, { useState } from 'react';
import {
  Search,
  Globe,
  FileCode,
  CheckCircle,
  ExternalLink,
  Code,
  Share2,
} from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';

export const SeoView: React.FC = () => {
  const { data, updateSeo } = usePortfolio();
  const seo = data.seo;

  const [activeTab, setActiveTab] = useState<'meta' | 'robots' | 'sitemap' | 'schema'>('meta');

  // Generate dynamic sitemap preview
  const blogUrls = (data.blog || []).filter((b) => b.published).map((b) => `/blog/${b.slug}`);
  const sitemapUrls = ['/', '/blog', ...blogUrls];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
        <h2 className="text-base font-bold text-white">Search Engine Optimization &amp; Metadata</h2>
        <p className="text-xs text-slate-400 mt-1">
          Configure search engine titles, social share preview cards, canonical paths, robots.txt, and Schema.org structured data.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 space-x-4 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('meta')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'meta'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Meta &amp; Search Previews
        </button>
        <button
          onClick={() => setActiveTab('robots')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'robots'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          robots.txt Rules
        </button>
        <button
          onClick={() => setActiveTab('sitemap')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'sitemap'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          sitemap.xml ({sitemapUrls.length} URLs)
        </button>
        <button
          onClick={() => setActiveTab('schema')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'schema'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Schema.org JSON-LD
        </button>
      </div>

      {/* Tab 1: Meta Tags & Preview */}
      {activeTab === 'meta' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">Global Metadata</h3>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-300">Global Website Title</label>
                <span className="text-[11px] text-slate-400">{seo.title.length} / 65 characters</span>
              </div>
              <input
                type="text"
                value={seo.title}
                onChange={(e) => updateSeo({ title: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-300">Meta Description</label>
                <span className="text-[11px] text-slate-400">{seo.metaDescription.length} / 160 characters</span>
              </div>
              <textarea
                rows={3}
                value={seo.metaDescription}
                onChange={(e) => updateSeo({ metaDescription: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Canonical Base URL</label>
                <input
                  type="text"
                  value={seo.canonicalUrl}
                  onChange={(e) => updateSeo({ canonicalUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">OpenGraph Share Image URL</label>
                <input
                  type="text"
                  value={seo.ogImage}
                  onChange={(e) => updateSeo({ ogImage: e.target.value })}
                  placeholder="/user-profile-image.jpeg"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Google SERP Preview */}
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Google Search Result Snippet Preview
            </span>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1 max-w-xl">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <span className="font-semibold text-slate-200">Krish Kumar</span>
                <span>›</span>
                <span className="truncate">{seo.canonicalUrl || 'https://krishkumar.design'}</span>
              </div>
              <h4 className="text-base text-sky-400 hover:underline cursor-pointer font-medium leading-snug">
                {seo.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                {seo.metaDescription}
              </p>
            </div>
          </div>

          {/* Social Share Preview Card */}
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Social Card (Twitter / LinkedIn / OpenGraph) Preview
            </span>
            <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 max-w-md shadow-md">
              <div className="h-44 bg-slate-900 overflow-hidden relative">
                <img
                  src={seo.ogImage || '/user-profile-image.jpeg'}
                  alt="OG Card"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  KRISHKUMAR.DESIGN
                </span>
                <h5 className="text-sm font-bold text-white truncate">{seo.title}</h5>
                <p className="text-xs text-slate-400 line-clamp-2">{seo.metaDescription}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: robots.txt */}
      {activeTab === 'robots' && (
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div>
              <h3 className="text-sm font-bold text-white">robots.txt Configuration</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Served dynamically at <code className="text-indigo-400 font-mono">/robots.txt</code>.
              </p>
            </div>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>View Live /robots.txt</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <textarea
            rows={8}
            value={seo.robotsTxt}
            onChange={(e) => updateSeo({ robotsTxt: e.target.value })}
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-indigo-300 font-mono text-xs focus:outline-none focus:border-indigo-500 leading-relaxed"
          />
        </div>
      )}

      {/* Tab 3: sitemap.xml */}
      {activeTab === 'sitemap' && (
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div>
              <h3 className="text-sm font-bold text-white">Dynamic XML Sitemap</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Automatically maintained and served at <code className="text-indigo-400 font-mono">/sitemap.xml</code>.
              </p>
            </div>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>Inspect Live /sitemap.xml</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300 block">Indexed URL Entities ({sitemapUrls.length})</span>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs text-slate-300 max-h-64 overflow-y-auto">
              {sitemapUrls.map((u, idx) => (
                <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-900 last:border-0">
                  <span className="text-indigo-300">{u}</span>
                  <span className="text-[10px] text-slate-500">
                    {idx === 0 ? 'priority: 1.0 · daily' : idx === 1 ? 'priority: 0.9 · daily' : 'priority: 0.8 · monthly'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Schema.org Structured Data */}
      {activeTab === 'schema' && (
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
            Schema.org JSON-LD Structured Data
          </h3>
          <p className="text-xs text-slate-400">
            Rich data markup embedded in <code className="text-indigo-400">&lt;head&gt;</code> for Google Knowledge Graph and Search Carousels.
          </p>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto max-h-96">
            <pre>
{JSON.stringify(
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${seo.canonicalUrl}#person`,
        "name": "Krish Kumar",
        "jobTitle": "Digital Marketer, UI/UX Designer & Creative Strategist",
        "url": seo.canonicalUrl,
        "image": `${seo.canonicalUrl}user-profile-image.jpeg`,
        "sameAs": data.socialLinks.map((s) => s.url),
      },
      {
        "@type": "WebSite",
        "@id": `${seo.canonicalUrl}#website`,
        "name": "Krish Kumar Portfolio",
        "url": seo.canonicalUrl,
        "publisher": { "@id": `${seo.canonicalUrl}#person` },
      },
      {
        "@type": "Blog",
        "@id": `${seo.canonicalUrl}blog#blog`,
        "name": "Krish Kumar Insights & Blog",
        "blogPost": data.blog.filter((b) => b.published).map((b) => ({
          "@type": "BlogPosting",
          "headline": b.title,
          "url": `${seo.canonicalUrl}blog/${b.slug}`,
          "datePublished": b.isoDate || b.date,
          "author": { "@type": "Person", "name": b.author?.name || "Krish Kumar" },
        })),
      },
    ],
  },
  null,
  2
)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
