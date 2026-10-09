import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Github,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  Eye,
  EyeOff,
  Search,
  Tag,
} from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { ProjectItem } from '../../../data/defaultPortfolioData';
import { uploadMediaFile } from '../../../lib/supabase';

export const ProjectsView: React.FC = () => {
  const { data, addProject, editProject, deleteProject, addMedia } = usePortfolio();
  const projects = data.projects;

  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState('Growth & Acquisition');
  const [client, setClient] = useState('');
  const [timeline, setTimeline] = useState('');
  const [role, setRole] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [coverImage, setCoverImage] = useState('/user-profile-image.jpeg');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [tools, setTools] = useState<string[]>([]);
  const [newTool, setNewTool] = useState('');
  const [challenge, setChallenge] = useState('');
  const [solution, setSolution] = useState('');
  const [results, setResults] = useState('');
  const [published, setPublished] = useState(true);

  // Metrics state
  const [metric1Label, setMetric1Label] = useState('ROAS Achieved');
  const [metric1Value, setMetric1Value] = useState('3.6x');
  const [metric2Label, setMetric2Label] = useState('CAC Reduction');
  const [metric2Value, setMetric2Value] = useState('-34%');

  const openAddModal = () => {
    setEditingProject(null);
    setTitle('');
    setTagline('');
    setCategory('Growth & Acquisition');
    setClient('');
    setTimeline('2025 · 3 Months');
    setRole('Lead Strategist & Designer');
    setShortDesc('');
    setFullDesc('');
    setCoverImage('/user-profile-image.jpeg');
    setLiveUrl('');
    setGithubUrl('');
    setTools(['Meta Ads Manager', 'Figma', 'GA4']);
    setChallenge('');
    setSolution('');
    setResults('');
    setPublished(true);
    setMetric1Label('ROAS Achieved');
    setMetric1Value('3.5x');
    setMetric2Label('Conversions');
    setMetric2Value('15,000+');
    setModalOpen(true);
  };

  const openEditModal = (proj: ProjectItem) => {
    setEditingProject(proj);
    setTitle(proj.title);
    setTagline(proj.tagline || '');
    setCategory(proj.category);
    setClient(proj.client || '');
    setTimeline(proj.timeline || '');
    setRole(proj.role || '');
    setShortDesc(proj.shortDescription);
    setFullDesc(proj.fullDescription);
    setCoverImage(proj.coverImage || '/user-profile-image.jpeg');
    setLiveUrl(proj.liveUrl || '');
    setGithubUrl(proj.githubUrl || '');
    setTools(proj.tools || []);
    setChallenge(proj.challenge || '');
    setSolution(proj.solution || '');
    setResults(proj.results || '');
    setPublished(proj.published !== false);

    if (proj.metrics && proj.metrics.length > 0) {
      setMetric1Label(proj.metrics[0].label || 'Metric 1');
      setMetric1Value(proj.metrics[0].value || '');
      if (proj.metrics.length > 1) {
        setMetric2Label(proj.metrics[1].label || 'Metric 2');
        setMetric2Value(proj.metrics[1].value || '');
      }
    }
    setModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await uploadMediaFile(file, 'portfolio-media', 'projects');
      if (res.url) {
        setCoverImage(res.url);
        addMedia({
          name: file.name,
          url: res.url,
          category: 'projects',
          fileType: file.type,
          fileSize: `${Math.round(file.size / 1024)} KB`,
          dateAdded: new Date().toISOString().split('T')[0],
        });
      }
    } catch (err) {
      console.error('Failed to upload project image:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddTool = () => {
    if (!newTool.trim()) return;
    if (!tools.includes(newTool.trim())) {
      setTools([...tools, newTool.trim()]);
    }
    setNewTool('');
  };

  const handleRemoveTool = (toolToRemove: string) => {
    setTools(tools.filter((t) => t !== toolToRemove));
  };

  const handleSave = () => {
    if (!title.trim()) return;

    const metrics = [
      { label: metric1Label.trim(), value: metric1Value.trim() },
      { label: metric2Label.trim(), value: metric2Value.trim() },
    ].filter((m) => m.label && m.value);

    const projectPayload = {
      title: title.trim(),
      tagline: tagline.trim(),
      category: category.trim(),
      client: client.trim(),
      timeline: timeline.trim(),
      role: role.trim(),
      shortDescription: shortDesc.trim(),
      fullDescription: fullDesc.trim(),
      coverImage: coverImage.trim(),
      tools,
      liveUrl: liveUrl.trim(),
      githubUrl: githubUrl.trim(),
      published,
      metrics,
      challenge: challenge.trim(),
      solution: solution.trim(),
      results: results.trim(),
    };

    if (editingProject) {
      editProject(editingProject.id, projectPayload);
    } else {
      addProject(projectPayload);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string, projTitle: string) => {
    if (window.confirm(`Are you sure you want to delete "${projTitle}"?`)) {
      deleteProject(id);
    }
  };

  const filteredProjects = projects.filter((p) => {
    const q = searchTerm.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white">Projects &amp; Case Studies</h2>
          <p className="text-xs text-slate-400 mt-1">
            Create in-depth client case studies with metrics, image mockups, technology stacks, and live links.
          </p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search projects by title, category, or tools..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700/80 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group"
          >
            {/* Left Info */}
            <div className="flex items-start gap-4 min-w-0">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                <img
                  src={p.coverImage || '/user-profile-image.jpeg'}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      p.published
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    {p.published ? 'Live on Site' : 'Draft / Hidden'}
                  </span>
                  <span className="text-xs text-indigo-400 font-semibold">{p.category}</span>
                  {p.client && <span className="text-xs text-slate-400">· {p.client}</span>}
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {p.shortDescription}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {(p.tools || []).slice(0, 5).map((tool, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-950 text-slate-300 border border-slate-800"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-end md:self-center shrink-0">
              {p.liveUrl && (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
                  title="Open live URL"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {p.githubUrl && (
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
                  title="Open GitHub repo"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              <button
                type="button"
                onClick={() => editProject(p.id, { published: !p.published })}
                className="p-2 text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
                title={p.published ? 'Unpublish' : 'Publish'}
              >
                {p.published ? (
                  <Eye className="w-4 h-4 text-emerald-400" />
                ) : (
                  <EyeOff className="w-4 h-4 text-amber-400" />
                )}
              </button>
              <button
                type="button"
                onClick={() => openEditModal(p)}
                className="p-2 text-slate-400 hover:text-indigo-400 bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
                title="Edit case study"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(p.id, p.title)}
                className="p-2 text-slate-400 hover:text-rose-400 bg-slate-950 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
                title="Delete project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs">
            No projects found matching your search. Click &quot;Add New Project&quot; above to create one.
          </div>
        )}
      </div>

      {/* Add / Edit Project Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto space-y-5 custom-scrollbar">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingProject ? `Edit Case Study: ${editingProject.title}` : 'Add New Project'}
              </h3>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="projPubCheck"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="accent-indigo-500 rounded"
                />
                <label htmlFor="projPubCheck" className="text-xs text-slate-300 font-semibold cursor-pointer">
                  Published Live
                </label>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Project Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Digital Marketing Campaign"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Growth & Acquisition"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
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
                  placeholder="e.g. Full-Funnel Paid Acquisition & Scaled Conversion Telemetry"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Client, Timeline & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Client Name</label>
                  <input
                    type="text"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="e.g. Aura FinTech Global"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Timeline</label>
                  <input
                    type="text"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    placeholder="e.g. Q3-Q4 2025 · 4 Months"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Your Role</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Lead Growth Strategist"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Cover Image / Visual Asset</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="/user-profile-image.jpeg or https://..."
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                  <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer border border-slate-700 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Short Description (Card Summary)</label>
                <textarea
                  rows={2}
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="Concise overview shown on the project card..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Full Case Study Overview</label>
                <textarea
                  rows={3}
                  value={fullDesc}
                  onChange={(e) => setFullDesc(e.target.value)}
                  placeholder="In-depth narrative of objectives, execution, and architecture..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Tools & Tech Chips */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Technologies &amp; Tools</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {tools.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-slate-950 text-slate-200 border border-slate-800"
                    >
                      <span>{t}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTool(t)}
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
                    value={newTool}
                    onChange={(e) => setNewTool(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTool())}
                    placeholder="e.g. Meta Ads, Figma, React..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddTool}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                  >
                    Add Tool
                  </button>
                </div>
              </div>

              {/* URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Live Project / Demo URL</label>
                  <input
                    type="text"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">GitHub / Code Repository URL</label>
                  <input
                    type="text"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Key Results & Metrics */}
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80 space-y-3">
                <span className="font-semibold text-indigo-400 block text-xs">Featured Metrics / Highlights</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Metric 1 Label (e.g. ROAS Achieved)"
                      value={metric1Label}
                      onChange={(e) => setMetric1Label(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-white text-xs mb-1"
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g. 3.6x)"
                      value={metric1Value}
                      onChange={(e) => setMetric1Value(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-white text-xs font-bold"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Metric 2 Label (e.g. CAC Reduction)"
                      value={metric2Label}
                      onChange={(e) => setMetric2Label(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-white text-xs mb-1"
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g. -34%)"
                      value={metric2Value}
                      onChange={(e) => setMetric2Value(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-white text-xs font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Deep Dive Breakdown */}
              <div className="space-y-3 pt-2">
                <h4 className="font-semibold text-slate-300 text-xs">Challenge, Solution &amp; Impact Breakdown</h4>
                <div>
                  <label className="block text-slate-400 mb-1 text-[11px]">The Challenge</label>
                  <textarea
                    rows={2}
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    placeholder="Ad fatigue, high friction onboarding, rising CAC..."
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 text-[11px]">The Solution</label>
                  <textarea
                    rows={2}
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    placeholder="Modular dynamic creative matrix, 1-tap mobile verification..."
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 text-[11px]">Results &amp; Business Impact</label>
                  <textarea
                    rows={2}
                    value={results}
                    onChange={(e) => setResults(e.target.value)}
                    placeholder="Scaled ad spend profitably to $7,500/day while keeping ROAS above 4.1x..."
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
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
                {editingProject ? 'Save Changes' : 'Create Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
