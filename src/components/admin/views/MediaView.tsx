import React, { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  Search,
  RefreshCw,
  Eye,
  X,
  AlertCircle,
  FileText,
  Grid,
  List,
  Sparkles,
  ShieldAlert,
  ArrowRightLeft,
  Calendar,
  HardDrive,
} from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { MediaItem } from '../../../data/defaultPortfolioData';
import {
  uploadMediaFile,
  replaceMediaStorageFile,
  validateMediaFile,
  formatBytes,
  MAX_MEDIA_FILE_SIZE,
} from '../../../lib/supabase';

export const MediaView: React.FC = () => {
  const { data, addMedia, replaceMedia, deleteMedia, syncMediaFromStorage, adminUser } = usePortfolio();
  const mediaList = data.media || [];

  // Filter & Search states
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Upload states
  const [uploadCategory, setUploadCategory] = useState<'profile' | 'projects' | 'certificates' | 'blog' | 'general'>('general');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  // Clipboard copy state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Preview Lightbox state
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);

  // Replace Asset modal state
  const [replaceTarget, setReplaceTarget] = useState<MediaItem | null>(null);
  const [isReplacing, setIsReplacing] = useState(false);
  const [replaceError, setReplaceError] = useState<string | null>(null);

  // Delete Confirmation state
  const [deleteTarget, setDeleteTarget] = useState<MediaItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const replaceInputRef = useRef<HTMLInputElement | null>(null);

  // Filtered media items
  const filteredMedia = mediaList.filter((item) => {
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesSearch =
      !searchQuery.trim() ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fileType?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate stats
  const totalItems = mediaList.length;
  const totalCategories = new Set(mediaList.map((m) => m.category)).size;

  // Handle file validation and upload
  const processUploadFiles = async (files: FileList | File[]) => {
    if (!adminUser) {
      setUploadError('Unauthorized: You must be an authenticated administrator to upload media.');
      return;
    }

    setUploadError(null);
    setUploadSuccess(null);
    setIsUploading(true);

    let successCount = 0;
    const errors: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // 1. Validate file type and size
      const validation = validateMediaFile(file, {
        maxSizeBytes: MAX_MEDIA_FILE_SIZE,
      });

      if (!validation.valid) {
        errors.push(`${file.name}: ${validation.error}`);
        continue;
      }

      // 2. Upload to Supabase Storage bucket 'portfolio-media'
      try {
        const res = await uploadMediaFile(file, 'portfolio-media', uploadCategory);
        if (res.error) {
          errors.push(`${file.name}: ${res.error}`);
        } else if (res.url) {
          addMedia({
            name: file.name,
            url: res.url,
            storagePath: res.path,
            category: uploadCategory,
            fileType: file.type || 'image/jpeg',
            fileSize: formatBytes(file.size),
            dateAdded: new Date().toISOString().split('T')[0],
          });
          successCount++;
        }
      } catch (err: any) {
        errors.push(`${file.name}: ${err.message || 'Upload exception'}`);
      }
    }

    setIsUploading(false);

    if (errors.length > 0) {
      setUploadError(errors.join(' | '));
    }
    if (successCount > 0) {
      setUploadSuccess(`Successfully uploaded ${successCount} asset${successCount > 1 ? 's' : ''} to Supabase Storage.`);
      setTimeout(() => setUploadSuccess(null), 4000);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processUploadFiles(e.target.files);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processUploadFiles(e.dataTransfer.files);
    }
  };

  // Replace Asset handler
  const handleReplaceFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!replaceTarget || !e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    if (!adminUser) {
      setReplaceError('Unauthorized: You must be an authenticated administrator.');
      return;
    }

    // Validate
    const validation = validateMediaFile(file, { maxSizeBytes: MAX_MEDIA_FILE_SIZE });
    if (!validation.valid) {
      setReplaceError(validation.error || 'Invalid replacement file.');
      return;
    }

    setIsReplacing(true);
    setReplaceError(null);

    try {
      const res = await replaceMediaStorageFile(
        replaceTarget.storagePath,
        file,
        'portfolio-media',
        replaceTarget.category
      );

      if (res.error) {
        setReplaceError(res.error);
      } else if (res.url) {
        replaceMedia(replaceTarget.id, {
          name: file.name,
          url: res.url,
          storagePath: res.path,
          fileType: file.type || 'image/jpeg',
          fileSize: formatBytes(file.size),
          dateAdded: new Date().toISOString().split('T')[0],
        });

        // Close replace modal
        setReplaceTarget(null);
        setUploadSuccess(`Successfully replaced "${replaceTarget.name}" with "${file.name}".`);
        setTimeout(() => setUploadSuccess(null), 3000);
      }
    } catch (err: any) {
      setReplaceError(err.message || 'Replace operation failed');
    } finally {
      setIsReplacing(false);
      if (replaceInputRef.current) replaceInputRef.current.value = '';
    }
  };

  // Delete confirmation handler
  const confirmDelete = async () => {
    if (!deleteTarget) return;

    if (!adminUser) {
      alert('Unauthorized: You must be an authenticated administrator to delete media.');
      return;
    }

    setIsDeleting(true);
    try {
      await deleteMedia(deleteTarget.id);
      if (previewItem?.id === deleteTarget.id) {
        setPreviewItem(null);
      }
      setDeleteTarget(null);
    } catch (err: any) {
      console.error('Delete error:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Sync bucket assets
  const handleSyncBucket = async () => {
    setIsSyncing(true);
    setSyncMessage(null);
    try {
      const res = await syncMediaFromStorage();
      if (res.error) {
        setSyncMessage(`Sync notice: ${res.error}`);
      } else if (res.addedCount > 0) {
        setSyncMessage(`Found and synced ${res.addedCount} new asset${res.addedCount > 1 ? 's' : ''} from Supabase Storage bucket.`);
      } else {
        setSyncMessage('All files in Supabase Storage bucket "portfolio-media" are already synchronized.');
      }
    } catch (err: any) {
      setSyncMessage(`Sync error: ${err.message || 'Unknown error'}`);
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncMessage(null), 5000);
    }
  };

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header & Stats Banner */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white">Central Media &amp; Asset Library</h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Bucket: portfolio-media
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Secure admin repository for portraits, project mockups, verified certificate credentials, and blog headers.
          </p>
        </div>

        {/* Sync Bucket Button */}
        <button
          type="button"
          onClick={handleSyncBucket}
          disabled={isSyncing}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors shrink-0 disabled:opacity-50"
          title="Scan and import any unlinked files directly from Supabase Storage bucket"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-indigo-400' : ''}`} />
          <span>{isSyncing ? 'Syncing Bucket...' : 'Sync Bucket Files'}</span>
        </button>
      </div>

      {/* Sync Message Alert */}
      {syncMessage && (
        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>{syncMessage}</span>
          </div>
          <button type="button" onClick={() => setSyncMessage(null)} className="text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Upload Success Alert */}
      {uploadSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{uploadSuccess}</span>
        </div>
      )}

      {/* Upload Error Alert */}
      {uploadError && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{uploadError}</span>
          </div>
          <button type="button" onClick={() => setUploadError(null)} className="text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Upload Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`p-6 rounded-xl border-2 border-dashed transition-all text-center ${
          isDragging
            ? 'border-indigo-500 bg-indigo-500/5 ring-4 ring-indigo-500/10'
            : 'border-slate-800 bg-slate-900 hover:border-slate-700'
        }`}
      >
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto">
            <Upload className="w-6 h-6" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-white">Upload New Portfolio Assets</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Drag &amp; drop files here, or browse from your computer. Validated formats: JPEG, PNG, WebP, GIF, SVG, PDF (Max 10MB).
            </p>
          </div>

          {/* Destination Category Picker */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="text-xs font-semibold text-slate-400">Target Folder:</span>
            <select
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="profile">Profile &amp; Hero Photos</option>
              <option value="projects">Projects &amp; Case Studies</option>
              <option value="certificates">Certificates &amp; Credentials</option>
              <option value="blog">Blog Featured Articles</option>
              <option value="general">General Website Assets</option>
            </select>
          </div>

          <div>
            <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer shadow-lg shadow-indigo-600/20 transition-all">
              <Upload className="w-4 h-4" />
              <span>{isUploading ? 'Uploading to Bucket...' : 'Select Files to Upload'}</span>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,application/pdf"
                onChange={handleFileInputChange}
                disabled={isUploading}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Filter, Search & View Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
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

        {/* Search & View Mode */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assets..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              title="Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Media Content View */}
      {viewMode === 'grid' ? (
        /* Grid Mode */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredMedia.map((item) => {
            const isPdf = item.fileType?.includes('pdf');

            return (
              <div
                key={item.id}
                className="rounded-xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col group"
              >
                {/* Thumbnail & Preview Trigger */}
                <div
                  onClick={() => setPreviewItem(item)}
                  className="h-32 bg-slate-950 relative overflow-hidden flex items-center justify-center cursor-pointer group-hover:opacity-95"
                >
                  {isPdf ? (
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

                  <span className="absolute top-2 left-2 text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/75 text-slate-200 capitalize">
                    {item.category}
                  </span>

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-black/80 px-2 py-1 rounded-md backdrop-blur-sm">
                      <Eye className="w-3 h-3" />
                      <span>Preview</span>
                    </span>
                  </div>
                </div>

                {/* Details & Actions */}
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
                      title="Copy Public URL"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setReplaceTarget(item);
                          setReplaceError(null);
                        }}
                        className="p-1 text-slate-400 hover:text-amber-400 transition-colors"
                        title="Replace Image"
                      >
                        <ArrowRightLeft className="w-3.5 h-3.5" />
                      </button>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-slate-400 hover:text-white transition-colors"
                        title="Open file in new tab"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(item)}
                        className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                        title="Delete asset"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List Mode */
        <div className="rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-[11px] uppercase font-bold text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Preview</th>
                  <th className="py-3 px-4">File Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Upload Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredMedia.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-2 px-4">
                      <div
                        onClick={() => setPreviewItem(item)}
                        className="w-10 h-10 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 cursor-pointer flex items-center justify-center shrink-0"
                      >
                        {item.fileType?.includes('pdf') ? (
                          <FileText className="w-5 h-5 text-indigo-400" />
                        ) : (
                          <img src={item.url} alt="" className="w-full h-full object-cover" />
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-4 font-medium text-white max-w-xs truncate" title={item.name}>
                      {item.name}
                    </td>
                    <td className="py-2 px-4">
                      <span className="capitalize px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-slate-400">{item.fileSize || 'Standard'}</td>
                    <td className="py-2 px-4 text-slate-400">{item.dateAdded}</td>
                    <td className="py-2 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleCopyUrl(item.id, item.url)}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-200 font-medium"
                        >
                          {copiedId === item.id ? 'Copied!' : 'Copy URL'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setReplaceTarget(item);
                            setReplaceError(null);
                          }}
                          className="p-1.5 rounded text-slate-400 hover:text-amber-400 hover:bg-slate-800"
                          title="Replace"
                        >
                          <ArrowRightLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(item)}
                          className="p-1.5 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredMedia.length === 0 && (
        <div className="text-center py-14 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 space-y-2">
          <ImageIcon className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-xs">No media files found matching your search or category filter.</p>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 1. Full Preview Lightbox Modal                       */}
      {/* ---------------------------------------------------- */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col overflow-hidden text-slate-100">
            {/* Modal Header */}
            <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
              <div className="flex items-center gap-2 truncate">
                <span className="text-xs font-bold text-white truncate">{previewItem.name}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 capitalize">
                  {previewItem.category}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Media Canvas */}
            <div className="p-6 bg-slate-950 flex items-center justify-center min-h-[300px] max-h-[60vh] overflow-hidden">
              {previewItem.fileType?.includes('pdf') ? (
                <div className="text-center p-8 space-y-3">
                  <FileText className="w-16 h-16 text-indigo-400 mx-auto" />
                  <p className="text-sm font-bold text-white">PDF Document Asset</p>
                  <a
                    href={previewItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Full PDF in New Tab</span>
                  </a>
                </div>
              ) : (
                <img
                  src={previewItem.url}
                  alt={previewItem.name}
                  className="max-h-[55vh] max-w-full object-contain rounded-lg shadow-xl"
                />
              )}
            </div>

            {/* Metadata & Controls Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="grid grid-cols-2 sm:flex sm:items-center gap-3 text-slate-400 text-[11px]">
                <div>
                  <span className="font-semibold text-slate-300">Size:</span> {previewItem.fileSize || 'Standard'}
                </div>
                <div>
                  <span className="font-semibold text-slate-300">Added:</span> {previewItem.dateAdded}
                </div>
                {previewItem.storagePath && (
                  <div className="col-span-2 sm:col-span-1 truncate max-w-xs">
                    <span className="font-semibold text-slate-300">Path:</span> {previewItem.storagePath}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => handleCopyUrl(previewItem.id, previewItem.url)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700"
                >
                  {copiedId === previewItem.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied URL</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setReplaceTarget(previewItem);
                    setReplaceError(null);
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" />
                  <span>Replace</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeleteTarget(previewItem)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 text-xs font-medium border border-rose-500/30"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 2. Replace Asset Modal                               */}
      {/* ---------------------------------------------------- */}
      {replaceTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 space-y-4 text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Replace Media Asset</h3>
              </div>
              <button
                type="button"
                onClick={() => setReplaceTarget(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Replacing <span className="font-semibold text-white">"{replaceTarget.name}"</span> will upload the new file to Supabase Storage and safely purge the old asset.
            </p>

            {replaceError && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{replaceError}</span>
              </div>
            )}

            <div className="p-4 rounded-xl border-2 border-dashed border-slate-700 bg-slate-950 text-center space-y-3">
              <Upload className="w-8 h-8 text-amber-400 mx-auto" />
              <p className="text-xs text-slate-300">Select the new replacement file from your device:</p>
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold cursor-pointer shadow-md transition-all">
                <Upload className="w-3.5 h-3.5" />
                <span>{isReplacing ? 'Uploading replacement...' : 'Choose Replacement File'}</span>
                <input
                  ref={replaceInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,application/pdf"
                  onChange={handleReplaceFileChange}
                  disabled={isReplacing}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setReplaceTarget(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 3. Delete Confirmation Modal                         */}
      {/* ---------------------------------------------------- */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 space-y-4 text-slate-100">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-sm font-bold text-white">Permanently Delete Asset?</h3>
              <p className="text-xs text-slate-400">
                Are you sure you want to remove <span className="font-semibold text-white">"{deleteTarget.name}"</span>?
                This file will be purged from Supabase Storage bucket and the Media Library.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 shadow-md shadow-rose-600/20 transition-all disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete Asset'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
