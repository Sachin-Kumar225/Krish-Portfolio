import React, { useState } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  FileText,
  Search,
  Check,
  AlertCircle,
  FolderOpen,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { MediaItem } from '../../data/defaultPortfolioData';
import { uploadMediaFile, validateMediaFile, formatBytes, MAX_MEDIA_FILE_SIZE } from '../../lib/supabase';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string, item?: MediaItem) => void;
  title?: string;
  defaultCategory?: 'profile' | 'projects' | 'certificates' | 'blog' | 'general';
  allowedTypes?: 'images' | 'all';
}

export const MediaPickerModal: React.FC<MediaPickerModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  title = 'Select Media Asset',
  defaultCategory,
  allowedTypes = 'images',
}) => {
  const { data, addMedia, adminUser } = usePortfolio();
  const mediaList = data.media || [];

  const [activeTab, setActiveTab] = useState<'browse' | 'upload'>('browse');
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  // Quick upload state
  const [uploadCategory, setUploadCategory] = useState<'profile' | 'projects' | 'certificates' | 'blog' | 'general'>(
    defaultCategory || 'general'
  );
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Filter media items
  const filteredItems = mediaList.filter((item) => {
    // Type restriction
    if (allowedTypes === 'images' && item.fileType?.includes('pdf')) {
      return false;
    }
    // Category filter
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      return matchName || matchCategory;
    }
    return true;
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setUploadError(null);

    // 1. Client-side file validation
    const validation = validateMediaFile(file, {
      maxSizeBytes: MAX_MEDIA_FILE_SIZE,
    });

    if (!validation.valid) {
      setUploadError(validation.error || 'Invalid file format or size.');
      return;
    }

    if (allowedTypes === 'images' && file.type === 'application/pdf') {
      setUploadError('Only image formats are permitted for this selector.');
      return;
    }

    setIsUploading(true);
    try {
      const res = await uploadMediaFile(file, 'portfolio-media', uploadCategory);
      if (res.error) {
        setUploadError(res.error);
      } else if (res.url) {
        const newItem = addMedia({
          name: file.name,
          url: res.url,
          storagePath: res.path,
          category: uploadCategory,
          fileType: file.type || 'image/jpeg',
          fileSize: formatBytes(file.size),
          dateAdded: new Date().toISOString().split('T')[0],
        });

        // Auto-select and switch back to browse
        setSelectedItem(newItem);
        setActiveTab('browse');
      }
    } catch (err: any) {
      setUploadError(err.message || 'File upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleConfirm = () => {
    if (selectedItem) {
      onSelect(selectedItem.url, selectedItem);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[88vh] rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <FolderOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{title}</h3>
              <p className="text-[11px] text-slate-400">
                Browse stored assets in Supabase Storage or upload a new file.
              </p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 pb-0 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-900 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('browse')}
              className={`px-3.5 py-2 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === 'browse'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Media Library ({filteredItems.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`px-3.5 py-2 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'upload'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload New File</span>
            </button>
          </div>

          {activeTab === 'browse' && (
            <div className="relative w-48 sm:w-64 pb-2">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search assets..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'browse' ? (
            <div className="space-y-4">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {(['all', 'profile', 'projects', 'certificates', 'blog', 'general'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold capitalize transition-colors ${
                      selectedCategory === cat
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid of Items */}
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                  {filteredItems.map((item) => {
                    const isSelected = selectedItem?.id === item.id;
                    const isPdf = item.fileType?.includes('pdf');

                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className={`group relative rounded-xl overflow-hidden border cursor-pointer transition-all flex flex-col bg-slate-950 ${
                          isSelected
                            ? 'border-indigo-500 ring-2 ring-indigo-500/40 shadow-lg shadow-indigo-500/10'
                            : 'border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {/* Thumbnail */}
                        <div className="h-28 bg-slate-950 relative overflow-hidden flex items-center justify-center">
                          {isPdf ? (
                            <div className="text-center p-2 text-slate-400">
                              <FileText className="w-8 h-8 mx-auto text-indigo-400" />
                              <span className="text-[9px] mt-1 block uppercase font-bold">PDF Document</span>
                            </div>
                          ) : (
                            <img
                              src={item.url}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                          )}

                          {/* Selected check badge */}
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}

                          <span className="absolute bottom-1.5 left-1.5 text-[9px] font-semibold px-1.5 py-0.5 rounded bg-black/70 text-slate-300 capitalize">
                            {item.category}
                          </span>
                        </div>

                        {/* Caption */}
                        <div className="p-2.5">
                          <p className="text-[11px] font-medium text-white truncate" title={item.name}>
                            {item.name}
                          </p>
                          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                            <span>{item.fileSize || 'Standard'}</span>
                            <span>{item.dateAdded}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-16 text-center rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
                  <ImageIcon className="w-10 h-10 text-slate-600 mx-auto" />
                  <p className="text-xs text-slate-400">No media assets match your filter.</p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('upload')}
                    className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload a new image</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Upload Tab */
            <div className="max-w-md mx-auto py-4 space-y-4">
              <div className="p-6 rounded-xl border-2 border-dashed border-slate-700 bg-slate-950 text-center space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6" />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white">Upload to Supabase Storage</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Supports JPEG, PNG, WebP, SVG, and PDF (Max 10MB).
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 pt-2">
                  <span className="text-xs font-semibold text-slate-400">Destination:</span>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value as any)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                  >
                    <option value="profile">Profile &amp; Hero</option>
                    <option value="projects">Projects &amp; Case Studies</option>
                    <option value="certificates">Certificates &amp; PDFs</option>
                    <option value="blog">Blog Articles</option>
                    <option value="general">General Assets</option>
                  </select>
                </div>

                {uploadError && (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2 text-left">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                <div>
                  <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer shadow-lg shadow-indigo-600/20 transition-all">
                    <Upload className="w-4 h-4" />
                    <span>{isUploading ? 'Uploading to Bucket...' : 'Select File from Computer'}</span>
                    <input
                      type="file"
                      accept={allowedTypes === 'images' ? 'image/jpeg,image/png,image/webp,image/gif,image/svg+xml' : 'image/*,application/pdf'}
                      onChange={handleFileUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            {selectedItem ? (
              <div className="flex items-center gap-2.5 truncate">
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                  {selectedItem.fileType?.includes('pdf') ? (
                    <FileText className="w-4 h-4 text-indigo-400 m-2" />
                  ) : (
                    <img src={selectedItem.url} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold text-white truncate">{selectedItem.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{selectedItem.fileSize} · {selectedItem.category}</p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400">Select an asset to continue.</p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!selectedItem}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-indigo-600/20 transition-all"
            >
              Select &amp; Apply
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
