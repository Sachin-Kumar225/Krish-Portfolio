import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  BookOpen,
  Eye,
  EyeOff,
  Search,
  Upload,
  Calendar,
  Clock,
  ExternalLink,
  Layers,
  Heading,
  FileText,
  Quote,
  List,
  FolderOpen,
} from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { BlogPostItem, BlogContentBlock } from '../../../data/defaultPortfolioData';
import { uploadMediaFile } from '../../../lib/supabase';
import { MediaPickerModal } from '../MediaPickerModal';

export const BlogView: React.FC = () => {
  const { data, addBlogPost, editBlogPost, deleteBlogPost, addMedia } = usePortfolio();
  const blogPosts = data.blog;

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPostItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [tagline, setTagline] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [category, setCategory] = useState('Growth & Acquisition');
  const [coverBadge, setCoverBadge] = useState('Paid Media Strategy');
  const [readTime, setReadTime] = useState('6 min read');
  const [date, setDate] = useState('October 2025');
  const [featuredImage, setFeaturedImage] = useState('/user-profile-image.jpeg');
  const [published, setPublished] = useState(true);
  const [authorName, setAuthorName] = useState('Krish Kumar');
  const [authorRole, setAuthorRole] = useState('Digital Marketer & Creative Strategist');
  const [tags, setTags] = useState<string[]>(['Growth', 'Performance Marketing']);
  const [newTag, setNewTag] = useState('');

  // SEO Fields
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDesc, setSeoDesc] = useState('');

  // Rich Content Blocks
  const [contentBlocks, setContentBlocks] = useState<BlogContentBlock[]>([
    { type: 'lead', text: 'Introduction lead paragraph summarizing the core insight.' },
    { type: 'heading', level: 2, text: 'Key Strategic Takeaway' },
    { type: 'paragraph', text: 'Detailed breakdown of the methodology and performance metrics.' },
  ]);

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingPost) {
      setSlug(slugify(val));
    }
  };

  const openAddModal = () => {
    setEditingPost(null);
    setTitle('');
    setSlug('');
    setTagline('');
    setShortDesc('');
    setCategory('Growth & Acquisition');
    setCoverBadge('Paid Media Strategy');
    setReadTime('5 min read');
    setDate(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
    setFeaturedImage('/user-profile-image.jpeg');
    setPublished(true);
    setAuthorName('Krish Kumar');
    setAuthorRole('Digital Marketer & Creative Strategist');
    setTags(['Strategy', 'Growth']);
    setSeoTitle('');
    setSeoDesc('');
    setContentBlocks([
      { type: 'lead', text: 'The foundational insight behind this campaign and testing methodology.' },
      { type: 'heading', level: 2, text: 'Core Pillar 1: Signal Telemetry' },
      { type: 'paragraph', text: 'How machine learning algorithms process first-party user intent.' },
    ]);
    setModalOpen(true);
  };

  const openEditModal = (post: BlogPostItem) => {
    setEditingPost(post);
    setTitle(post.title);
    setSlug(post.slug);
    setTagline(post.tagline || '');
    setShortDesc(post.shortDescription);
    setCategory(post.category);
    setCoverBadge(post.coverBadge || post.category);
    setReadTime(post.readTime || '5 min read');
    setDate(post.date || '');
    setFeaturedImage(post.featuredImage || '/user-profile-image.jpeg');
    setPublished(post.published !== false);
    setAuthorName(post.author?.name || 'Krish Kumar');
    setAuthorRole(post.author?.role || 'Digital Marketer & Creative Strategist');
    setTags(post.tags || []);
    setSeoTitle(post.seoTitle || '');
    setSeoDesc(post.seoDescription || '');
    setContentBlocks(post.content || []);
    setModalOpen(true);
  };

  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await uploadMediaFile(file, 'portfolio-media', 'blog');
      if (res.url) {
        setFeaturedImage(res.url);
        addMedia({
          name: file.name,
          url: res.url,
          category: 'blog',
          fileType: file.type,
          fileSize: `${Math.round(file.size / 1024)} KB`,
          dateAdded: new Date().toISOString().split('T')[0],
        });
      }
    } catch (err) {
      console.error('Featured image upload failed:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    if (!tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
    }
    setNewTag('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Block management
  const addBlock = (type: 'lead' | 'heading' | 'paragraph' | 'callout' | 'quote') => {
    const newB: BlogContentBlock =
      type === 'heading'
        ? { type: 'heading', level: 2, text: 'New Section Heading' }
        : type === 'callout'
        ? { type: 'callout', title: 'Strategic Rule', text: 'Important takeaway or rule.' }
        : type === 'quote'
        ? { type: 'quote', quote: 'Design without metrics is just art.', author: 'Krish Kumar' }
        : { type, text: 'Write content here...' };

    setContentBlocks([...contentBlocks, newB]);
  };

  const updateBlock = (index: number, updated: Partial<BlogContentBlock>) => {
    const next = [...contentBlocks];
    next[index] = { ...next[index], ...updated };
    setContentBlocks(next);
  };

  const removeBlock = (index: number) => {
    setContentBlocks(contentBlocks.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!title.trim() || !slug.trim()) return;

    const payload = {
      slug: slug.trim(),
      title: title.trim(),
      tagline: tagline.trim(),
      shortDescription: shortDesc.trim(),
      category: category.trim(),
      coverBadge: coverBadge.trim(),
      readTime: readTime.trim(),
      date: date.trim(),
      isoDate: new Date().toISOString(),
      featuredImage: featuredImage.trim(),
      tags,
      published,
      author: {
        name: authorName.trim(),
        role: authorRole.trim(),
      },
      content: contentBlocks,
      seoTitle: seoTitle.trim() || `${title.trim()} | Krish Kumar`,
      seoDescription: seoDesc.trim() || shortDesc.trim(),
    };

    if (editingPost) {
      editBlogPost(editingPost.id, payload);
    } else {
      addBlogPost(payload);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string, postTitle: string) => {
    if (window.confirm(`Are you sure you want to delete "${postTitle}"?`)) {
      deleteBlogPost(id);
    }
  };

  const filteredPosts = blogPosts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.tags || []).some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    if (statusFilter === 'published') return matchesSearch && p.published;
    if (statusFilter === 'draft') return matchesSearch && !p.published;
    return matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white">Blog &amp; Thought Leadership</h2>
          <p className="text-xs text-slate-400 mt-1">
            Author and publish blueprints, strategic frameworks, design systems guides, and SEO-optimized articles.
          </p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles by title, category, or tags..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 shrink-0">
          {(['all', 'published', 'draft'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setStatusFilter(mode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                statusFilter === mode
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700/80 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    post.published
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {post.published ? 'Published' : 'Draft'}
                </span>
                <span className="text-xs text-indigo-400 font-semibold">{post.category}</span>
                <span className="text-xs text-slate-400">· {post.date}</span>
                <span className="text-xs text-slate-400">· {post.readTime}</span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                {post.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {post.shortDescription || post.tagline}
              </p>

              <div className="flex flex-wrap items-center gap-2 mt-2.5">
                <span className="text-[11px] text-slate-400 font-mono">/blog/{post.slug}</span>
                {(post.tags || []).slice(0, 4).map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-950 text-slate-300 border border-slate-800"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-end md:self-center shrink-0">
              <a
                href={`/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
                title="View live post"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => editBlogPost(post.id, { published: !post.published })}
                className="p-2 text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
                title={post.published ? 'Set to Draft' : 'Publish Live'}
              >
                {post.published ? (
                  <Eye className="w-4 h-4 text-emerald-400" />
                ) : (
                  <EyeOff className="w-4 h-4 text-amber-400" />
                )}
              </button>

              <button
                type="button"
                onClick={() => openEditModal(post)}
                className="p-2 text-slate-400 hover:text-indigo-400 bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
                title="Edit article"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleDelete(post.id, post.title)}
                className="p-2 text-slate-400 hover:text-rose-400 bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
                title="Delete article"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs">
            No articles found. Click &quot;Write New Article&quot; above to create one.
          </div>
        )}
      </div>

      {/* Write / Edit Article Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto space-y-5 custom-scrollbar">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingPost ? `Edit Article: ${editingPost.title}` : 'Create New Thought Leadership Article'}
              </h3>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pubCheck"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="accent-indigo-500 rounded"
                />
                <label htmlFor="pubCheck" className="text-xs text-slate-300 font-semibold cursor-pointer">
                  {published ? 'Publish Immediately' : 'Save as Draft'}
                </label>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Article Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. How to Scale Meta Ads to 3.5x ROAS in 2026"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">URL Slug (Crawlable /blog/[slug]) *</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(slugify(e.target.value))}
                    placeholder="scaling-meta-ads-roas-2026"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Tagline */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Tagline / Subheading</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Why dynamic creative iteration and signal telemetry outperform broad hacking..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Category, Badge, Read Time, Date */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Growth & Acquisition"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Cover Badge</label>
                  <input
                    type="text"
                    value={coverBadge}
                    onChange={(e) => setCoverBadge(e.target.value)}
                    placeholder="Paid Media Strategy"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="6 min read"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Publication Date</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="October 18, 2025"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Short Description (Excerpt)</label>
                <textarea
                  rows={2}
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="In-depth playbook detailing how to escape ad fatigue..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Featured Image */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Featured Article Image</label>
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    placeholder="/user-profile-image.jpeg or https://..."
                    className="flex-1 min-w-[200px] px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setIsPickerOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shrink-0 transition-colors shadow-sm"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>Media Library</span>
                  </button>
                  <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer border border-slate-700 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFeaturedImageUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Topic Tags</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-slate-950 text-slate-200 border border-slate-800"
                    >
                      <span>#{t}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(t)}
                        className="text-slate-400 hover:text-rose-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    placeholder="Add tag (e.g. Meta Ads)..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                  >
                    Add Tag
                  </button>
                </div>
              </div>

              {/* Rich Content Blocks Builder */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-indigo-400 block text-xs">Article Content Blocks</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => addBlock('heading')}
                      className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-800 flex items-center gap-1"
                    >
                      <Heading className="w-3 h-3" />
                      <span>+ Heading</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => addBlock('paragraph')}
                      className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-800 flex items-center gap-1"
                    >
                      <FileText className="w-3 h-3" />
                      <span>+ Paragraph</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => addBlock('callout')}
                      className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-800 flex items-center gap-1"
                    >
                      <Layers className="w-3 h-3" />
                      <span>+ Callout</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => addBlock('quote')}
                      className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-800 flex items-center gap-1"
                    >
                      <Quote className="w-3 h-3" />
                      <span>+ Quote</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  {contentBlocks.map((block, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 space-y-2 relative group"
                    >
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold uppercase">
                        <span>Block #{idx + 1}: {block.type}</span>
                        <button
                          type="button"
                          onClick={() => removeBlock(idx)}
                          className="text-slate-400 hover:text-rose-400"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>

                      {block.type === 'heading' && (
                        <input
                          type="text"
                          value={block.text || ''}
                          onChange={(e) => updateBlock(idx, { text: e.target.value })}
                          placeholder="Heading text..."
                          className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-800 text-white text-xs font-bold"
                        />
                      )}

                      {(block.type === 'paragraph' || block.type === 'lead') && (
                        <textarea
                          rows={2}
                          value={block.text || ''}
                          onChange={(e) => updateBlock(idx, { text: e.target.value })}
                          placeholder="Paragraph text..."
                          className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-800 text-white text-xs"
                        />
                      )}

                      {block.type === 'callout' && (
                        <div className="space-y-1.5">
                          <input
                            type="text"
                            value={block.title || ''}
                            onChange={(e) => updateBlock(idx, { title: e.target.value })}
                            placeholder="Callout title..."
                            className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-800 text-white text-xs font-bold"
                          />
                          <textarea
                            rows={2}
                            value={block.text || ''}
                            onChange={(e) => updateBlock(idx, { text: e.target.value })}
                            placeholder="Callout text..."
                            className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-800 text-white text-xs"
                          />
                        </div>
                      )}

                      {block.type === 'quote' && (
                        <div className="space-y-1.5">
                          <textarea
                            rows={2}
                            value={block.quote || ''}
                            onChange={(e) => updateBlock(idx, { quote: e.target.value })}
                            placeholder="Quote text..."
                            className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-800 text-white text-xs italic"
                          />
                          <input
                            type="text"
                            value={block.author || ''}
                            onChange={(e) => updateBlock(idx, { author: e.target.value })}
                            placeholder="Quote attribution / author..."
                            className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-800 text-white text-xs"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* SEO Meta Overrides */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-semibold text-slate-300 block text-xs">SEO &amp; Social Search Engine Overrides</span>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">SEO Title (Browser &amp; Google)</label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="Defaults to article title..."
                    className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Meta Description</label>
                  <textarea
                    rows={2}
                    value={seoDesc}
                    onChange={(e) => setSeoDesc(e.target.value)}
                    placeholder="Defaults to short description..."
                    className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-white text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
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
                className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30"
              >
                {editingPost ? 'Save Article Changes' : 'Publish Article'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Featured Blog Image Media Picker Modal */}
      <MediaPickerModal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelect={(url) => {
          setFeaturedImage(url);
        }}
        title="Select Blog Post Featured Asset"
        defaultCategory="blog"
        allowedTypes="images"
      />
    </div>
  );
};
