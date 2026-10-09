import React, { useState } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { uploadMediaFile } from '../../../lib/supabase';

export const HomepageView: React.FC = () => {
  const { data, updateHomepage, addMedia, isSaving, saveChanges } = usePortfolio();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [newPillText, setNewPillText] = useState<string>('');

  const hp = data.homepage;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const result = await uploadMediaFile(file, 'portfolio-media', 'profile');
      if (result.url) {
        updateHomepage({ heroImage: result.url });
        addMedia({
          name: file.name,
          url: result.url,
          category: 'profile',
          fileType: file.type,
          fileSize: `${Math.round(file.size / 1024)} KB`,
          dateAdded: new Date().toISOString().split('T')[0],
        });
        await saveChanges();
      }
    } catch (err) {
      console.error('Failed to upload hero image:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddPill = () => {
    if (!newPillText.trim()) return;
    const current = hp.heroPills || [];
    updateHomepage({ heroPills: [...current, newPillText.trim()] });
    setNewPillText('');
  };

  const handleRemovePill = (index: number) => {
    const current = hp.heroPills || [];
    updateHomepage({ heroPills: current.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Intro Header */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
        <h2 className="text-base font-bold text-white">Hero &amp; Homepage Configuration</h2>
        <p className="text-xs text-slate-400 mt-1">
          Customize the landing headline, role description, personal portrait photo, and action buttons shown on the public homepage.
        </p>
      </div>

      {/* Main Copy Fields */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">Headings &amp; Descriptions</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Eyebrow Badge</label>
            <input
              type="text"
              value={hp.eyebrow}
              onChange={(e) => updateHomepage({ eyebrow: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
              placeholder="e.g. Portfolio 2026"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Main Heading</label>
            <input
              type="text"
              value={hp.heading}
              onChange={(e) => updateHomepage({ heading: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
              placeholder="e.g. Hi, I'm Krish Kumar."
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Subrole / Tagline</label>
          <input
            type="text"
            value={hp.subrole}
            onChange={(e) => updateHomepage({ subrole: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
            placeholder="e.g. Digital Marketer · UI/UX Designer · Creative Strategist"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Intro Paragraph</label>
          <textarea
            rows={3}
            value={hp.intro}
            onChange={(e) => updateHomepage({ intro: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 resize-y"
            placeholder="Introduce your focus, value proposition and expertise..."
          />
        </div>
      </div>

      {/* Hero Profile Image Section */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">Profile / Hero Image</h3>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Image Preview */}
          <div className="relative w-36 h-48 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shrink-0 shadow-md">
            <img
              src={hp.heroImage || '/user-profile-image.jpeg'}
              alt="Hero Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            <span className="absolute bottom-2 left-2 text-[10px] font-semibold text-white/90 px-1.5 py-0.5 rounded bg-black/60">
              Active Photo
            </span>
          </div>

          {/* Upload Controls */}
          <div className="space-y-3 flex-1">
            <p className="text-xs text-slate-300">
              Upload a new photo for your personal portrait card. Images are uploaded to Supabase Storage and displayed across the Hero and About cards.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer transition-colors shadow-sm">
                <Upload className="w-3.5 h-3.5" />
                <span>{isUploading ? 'Uploading...' : 'Upload New Photo'}</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => updateHomepage({ heroImage: '/user-profile-image.jpeg' })}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default</span>
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Direct Image URL</label>
              <input
                type="text"
                value={hp.heroImage}
                onChange={(e) => updateHomepage({ heroImage: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                placeholder="/user-profile-image.jpeg or https://..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Buttons & CTAs */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">Hero Action Buttons</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Button 1 */}
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800/80 space-y-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Primary Button</span>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Button Label</label>
              <input
                type="text"
                value={hp.btn1Text}
                onChange={(e) => updateHomepage({ btn1Text: e.target.value })}
                className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Destination Link</label>
              <input
                type="text"
                value={hp.btn1Link}
                onChange={(e) => updateHomepage({ btn1Link: e.target.value })}
                className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Button 2 */}
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800/80 space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Secondary Button</span>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Button Label</label>
              <input
                type="text"
                value={hp.btn2Text}
                onChange={(e) => updateHomepage({ btn2Text: e.target.value })}
                className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Destination Link</label>
              <input
                type="text"
                value={hp.btn2Link}
                onChange={(e) => updateHomepage({ btn2Link: e.target.value })}
                className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Badges */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">Hero Floating Pill Badges</h3>
        <p className="text-xs text-slate-400">
          These pills float gracefully with 3D parallax on the public hero section.
        </p>

        <div className="flex flex-wrap gap-2">
          {(hp.heroPills || []).map((pill, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950 border border-slate-700 text-xs font-medium text-slate-200"
            >
              <span>{pill}</span>
              <button
                type="button"
                onClick={() => handleRemovePill(idx)}
                className="text-slate-400 hover:text-rose-400 transition-colors"
                title="Remove pill"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="text"
            value={newPillText}
            onChange={(e) => setNewPillText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddPill()}
            placeholder="Add new floating pill..."
            className="flex-1 max-w-sm px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
          />
          <button
            type="button"
            onClick={handleAddPill}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Pill</span>
          </button>
        </div>
      </div>
    </div>
  );
};
