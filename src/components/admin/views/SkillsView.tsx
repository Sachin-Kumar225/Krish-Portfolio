import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  Sparkles,
  CheckCircle,
  Eye,
  EyeOff,
  Layers,
} from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { SkillItem } from '../../../data/defaultPortfolioData';

export const SkillsView: React.FC = () => {
  const { data, addSkill, editSkill, deleteSkill } = usePortfolio();
  const skills = data.skills;

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Performance Marketing');
  const [proficiency, setProficiency] = useState(90);
  const [icon, setIcon] = useState('🎯');
  const [description, setDescription] = useState('');
  const [published, setPublished] = useState(true);

  // Categories list
  const categories = Array.from(new Set(['all', ...skills.map((s) => s.category)]));

  const filteredSkills = selectedCategory === 'all'
    ? skills
    : skills.filter((s) => s.category === selectedCategory);

  const openAddModal = () => {
    setEditingSkill(null);
    setName('');
    setCategory(selectedCategory === 'all' ? 'Performance Marketing' : selectedCategory);
    setProficiency(90);
    setIcon('🎯');
    setDescription('');
    setPublished(true);
    setModalOpen(true);
  };

  const openEditModal = (skill: SkillItem) => {
    setEditingSkill(skill);
    setName(skill.name);
    setCategory(skill.category);
    setProficiency(skill.proficiency);
    setIcon(skill.icon || '🎯');
    setDescription(skill.description);
    setPublished(skill.published !== false);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!name.trim()) return;

    if (editingSkill) {
      editSkill(editingSkill.id, {
        name: name.trim(),
        category,
        proficiency,
        icon,
        description: description.trim(),
        published,
      });
    } else {
      addSkill({
        name: name.trim(),
        category,
        proficiency,
        icon,
        description: description.trim(),
        published,
      });
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string, skillName: string) => {
    if (window.confirm(`Delete skill "${skillName}"?`)) {
      deleteSkill(id);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white">Skills &amp; Service Capabilities</h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage your service pillars, capability tags, proficiency metrics, and category filters.
          </p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Skill</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat} {cat === 'all' ? `(${skills.length})` : `(${skills.filter((s) => s.category === cat).length})`}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredSkills.map((sk) => (
          <div
            key={sk.id}
            className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700/80 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{sk.icon || '🎯'}</span>
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {sk.name}
                    </h3>
                    <span className="text-[11px] text-indigo-400 font-medium">{sk.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => editSkill(sk.id, { published: !sk.published })}
                    className="p-1.5 text-slate-400 hover:text-white rounded"
                    title={sk.published ? 'Published (click to unpublish)' : 'Hidden (click to publish)'}
                  >
                    {sk.published ? (
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => openEditModal(sk)}
                    className="p-1.5 text-slate-400 hover:text-indigo-400 rounded"
                    title="Edit skill"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(sk.id, sk.name)}
                    className="p-1.5 text-slate-400 hover:text-rose-400 rounded"
                    title="Delete skill"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mt-2.5">{sk.description}</p>
            </div>

            {/* Proficiency Bar */}
            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span>Proficiency / Mastery</span>
                <span className="font-semibold text-white">{sk.proficiency}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full"
                  style={{ width: `${sk.proficiency}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}

        {filteredSkills.length === 0 && (
          <div className="col-span-full text-center py-12 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs">
            No skills found in this category. Click &quot;Add New Skill&quot; above to create one.
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-lg space-y-4">
            <h3 className="text-base font-bold text-white">
              {editingSkill ? `Edit Skill: ${editingSkill.name}` : 'Add New Skill'}
            </h3>

            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Skill Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Meta Ads ROAS Scaling"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Icon / Emoji</label>
                  <input
                    type="text"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    placeholder="🎯"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm text-center focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Performance Marketing"
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                  <select
                    onChange={(e) => e.target.value && setCategory(e.target.value)}
                    value=""
                    className="px-2 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs"
                  >
                    <option value="" disabled>Existing</option>
                    <option value="Performance Marketing">Performance Marketing</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Creative Strategy">Creative Strategy</option>
                    <option value="Technical & Tools">Technical & Tools</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-300">Proficiency: {proficiency}%</label>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={proficiency}
                  onChange={(e) => setProficiency(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain your approach, techniques and client results..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="publishedCheck"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="accent-indigo-500 rounded"
                />
                <label htmlFor="publishedCheck" className="text-xs text-slate-300 font-medium">
                  Visible on public website
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3">
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
                {editingSkill ? 'Save Changes' : 'Create Skill'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
