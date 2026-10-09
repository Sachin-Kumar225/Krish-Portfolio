import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Share2,
  Eye,
  EyeOff,
  Globe,
} from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { SocialLinkItem } from '../../../data/defaultPortfolioData';

export const SocialLinksView: React.FC = () => {
  const { data, addSocialLink, editSocialLink, deleteSocialLink } = usePortfolio();
  const links = data.socialLinks;

  const [modalOpen, setModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<SocialLinkItem | null>(null);

  // Form State
  const [platform, setPlatform] = useState('LinkedIn');
  const [label, setLabel] = useState('LinkedIn');
  const [url, setUrl] = useState('https://linkedin.com/in/');
  const [enabled, setEnabled] = useState(true);

  const openAddModal = () => {
    setEditingLink(null);
    setPlatform('LinkedIn');
    setLabel('LinkedIn');
    setUrl('https://');
    setEnabled(true);
    setModalOpen(true);
  };

  const openEditModal = (item: SocialLinkItem) => {
    setEditingLink(item);
    setPlatform(item.platform);
    setLabel(item.label);
    setUrl(item.url);
    setEnabled(item.enabled !== false);
    setModalOpen(true);
  };

  const handlePlatformChange = (p: string) => {
    setPlatform(p);
    setLabel(p);
    if (!editingLink) {
      if (p === 'LinkedIn') setUrl('https://linkedin.com/in/');
      else if (p === 'Instagram') setUrl('https://instagram.com/');
      else if (p === 'Twitter') setUrl('https://x.com/');
      else if (p === 'GitHub') setUrl('https://github.com/');
      else if (p === 'Dribbble') setUrl('https://dribbble.com/');
      else if (p === 'Behance') setUrl('https://behance.net/');
      else if (p === 'Email') setUrl('mailto:hello@krishkumar.design');
    }
  };

  const handleSave = () => {
    if (!label.trim() || !url.trim()) return;

    const payload = {
      platform: platform.trim(),
      label: label.trim(),
      url: url.trim(),
      icon: platform.toLowerCase(),
      enabled,
    };

    if (editingLink) {
      editSocialLink(editingLink.id, payload);
    } else {
      addSocialLink(payload);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete social link "${name}"?`)) {
      deleteSocialLink(id);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white">Social Media &amp; Profiles</h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage links to your professional profiles, networks, and creative portfolios.
          </p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Social Link</span>
        </button>
      </div>

      {/* Links List */}
      <div className="space-y-3">
        {links.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700/80 transition-all flex items-center justify-between gap-4 group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-300 font-bold shrink-0">
                <Share2 className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {item.label}
                  </h3>
                  <span className="text-[11px] text-slate-400">({item.platform})</span>
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-indigo-400 truncate block mt-0.5"
                >
                  {item.url}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => editSocialLink(item.id, { enabled: !item.enabled })}
                className="p-1.5 text-slate-400 hover:text-white rounded"
                title={item.enabled ? 'Active on public site' : 'Disabled'}
              >
                {item.enabled ? (
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                )}
              </button>
              <button
                type="button"
                onClick={() => openEditModal(item)}
                className="p-1.5 text-slate-400 hover:text-indigo-400 rounded"
                title="Edit link"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(item.id, item.label)}
                className="p-1.5 text-slate-400 hover:text-rose-400 rounded"
                title="Delete link"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {links.length === 0 && (
          <div className="text-center py-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs">
            No social links added yet. Click &quot;Add Social Link&quot; above to create one.
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-base font-bold text-white">
              {editingLink ? `Edit Link: ${editingLink.label}` : 'Add Social Media Link'}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Platform</label>
                <select
                  value={platform}
                  onChange={(e) => handlePlatformChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Twitter">Twitter / X</option>
                  <option value="GitHub">GitHub</option>
                  <option value="Dribbble">Dribbble</option>
                  <option value="Behance">Behance</option>
                  <option value="Email">Email</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Custom">Custom Website</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Display Label</label>
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="e.g. LinkedIn or Follow on Instagram"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Profile Destination URL</label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="socPubCheck"
                  checked={enabled}
                  onChange={(e) => setEnabled(e.target.checked)}
                  className="accent-indigo-500 rounded"
                />
                <label htmlFor="socPubCheck" className="text-xs text-slate-300 font-medium cursor-pointer">
                  Visible on public website
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
              >
                {editingLink ? 'Save Changes' : 'Add Link'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
