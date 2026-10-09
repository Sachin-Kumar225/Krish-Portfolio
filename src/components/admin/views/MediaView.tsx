import React, { useState } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  Filter,
  FileText,
} from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { uploadMediaFile } from '../../../lib/supabase';

export const MediaView: React.FC = () => {
  const { data, addMedia, deleteMedia } = usePortfolio();
  const mediaList = data.media || [];

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [uploadCategory, setUploadCategory] = useState<'profile' | 'projects' | 'certificates' | 'blog' | 'general'>('general');
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const res = await uploadMediaFile(file, 'portfolio-media', uploadCategory);
        if (res.url) {
          addMedia({
            name: file.name,
            url: res.url,
            category: uploadCategory,
            fileType: file.type || 'image/jpeg',
            fileSize: `${Math.round(file.size / 1024)} KB`,
            dateAdded: new Date().toISOString().split('T')[0],
          });
        }
      } catch (err) {
        console.error('Failed to upload file:', err);
      }
    }
    setIsUploading(false);
  };

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete media item "${name}"?`)) {
      deleteMedia(id);
    }
  };

  const filteredMedia = categoryFilter === 'all'
    ? mediaList
    : mediaList.filter((m) => m.category === categoryFilter);

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
        <h2 className="text-base font-bold text-white">Central Media &amp; Asset Library</h2>
        <p className="text-xs text-slate-400 mt-1">
          Upload and manage images for profiles, project case studies, certificates, and blog articles. Assets are saved to Supabase Storage with public access policies.
        </p>
      </div>

      {/* Upload Zone */}
      <div className="p-6 rounded-xl bg-slate-900 border-2 border-dashed border-slate-800 hover:border-indigo-500/50 transition-colors text-center">
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto">
            <Upload className="w-6 h-6" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-white">Upload New Media Asset</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Supports JPEG, PNG, WebP, SVG, and PDF documents.
            </p>
          </div>

          {/* Upload Category Selector */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="text-xs font-semibold text-slate-400">Save to:</span>
            <select
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="profile">Profile &amp; Hero</option>
              <option value="projects">Projects &amp; Case Studies</option>
              <option value="certificates">Certificates &amp; PDFs</option>
              <option value="blog">Blog Articles</option>
              <option value="general">General Assets</option>
            </select>
          </div>

          <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer shadow-lg shadow-indigo-600/20 transition-all">
            <Upload className="w-4 h-4" />
            <span>{isUploading ? 'Uploading to Supabase...' : 'Select Files to Upload'}</span>
            <input
              type="file"
              multiple
              accept="image/*,application/pdf"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {(['all', 'profile', 'projects', 'certificates', 'blog', 'general'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
              categoryFilter === cat
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat} ({cat === 'all' ? mediaList.length : mediaList.filter((m) => m.category === cat).length})
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="rounded-xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col group"
          >
            {/* Thumbnail */}
            <div className="h-32 bg-slate-950 relative overflow-hidden flex items-center justify-center">
              {item.fileType?.includes('pdf') ? (
                <div className="text-center p-4 text-slate-400">
                  <FileText className="w-10 h-10 mx-auto text-indigo-400" />
                  <span className="text-[10px] mt-1 block uppercase font-bold">PDF Document</span>
                </div>
              ) : (
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
              <span className="absolute top-2 left-2 text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/70 text-slate-200 capitalize">
                {item.category}
              </span>
            </div>

            {/* Info & Actions */}
            <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h4 className="text-xs font-semibold text-white truncate" title={item.name}>
                  {item.name}
                </h4>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                  <span>{item.fileSize || 'Standard'}</span>
                  <span>{item.dateAdded}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => handleCopyUrl(item.id, item.url)}
                  className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 text-slate-400 hover:text-white"
                    title="Open full view"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.name)}
                    className="p-1 text-slate-400 hover:text-rose-400"
                    title="Delete media"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredMedia.length === 0 && (
          <div className="col-span-full text-center py-12 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs">
            No media files found in this category. Upload new assets above.
          </div>
        )}
      </div>
    </div>
  );
};
