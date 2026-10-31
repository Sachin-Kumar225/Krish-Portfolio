import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Image as ImageIcon,
  Upload,
  FolderOpen,
  RotateCcw,
} from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { EducationItem, ExperienceItem, StatItem } from '../../../data/defaultPortfolioData';
import { uploadMediaFile } from '../../../lib/supabase';
import { MediaPickerModal } from '../MediaPickerModal';

export const AboutView: React.FC = () => {
  const { data, updateAbout, addMedia } = usePortfolio();
  const ab = data.about;

  const [isPhotoPickerOpen, setIsPhotoPickerOpen] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const [newStatLabel, setNewStatLabel] = useState('');
  const [newStatValue, setNewStatValue] = useState('');

  // Education state
  const [eduModalOpen, setEduModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<EducationItem | null>(null);
  const [eduDegree, setEduDegree] = useState('');
  const [eduSchool, setEduSchool] = useState('');
  const [eduPeriod, setEduPeriod] = useState('');
  const [eduDetails, setEduDetails] = useState('');

  // Experience state
  const [expModalOpen, setExpModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<ExperienceItem | null>(null);
  const [expRole, setExpRole] = useState('');
  const [expCompany, setExpCompany] = useState('');
  const [expPeriod, setExpPeriod] = useState('');
  const [expDescription, setExpDescription] = useState('');

  const [newPillText, setNewPillText] = useState('');

  // Handle Photo Upload
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    try {
      const res = await uploadMediaFile(file, 'portfolio-media', 'about');
      if (res.url) {
        updateAbout({ photo: res.url });
        addMedia({
          name: file.name,
          url: res.url,
          category: 'profile',
          fileType: file.type,
          fileSize: `${Math.round(file.size / 1024)} KB`,
          dateAdded: new Date().toISOString().split('T')[0],
        });
      }
    } catch (err) {
      console.error('Failed to upload about photo', err);
    }
  };

  // Stats
  const handleAddStat = () => {
    if (!newStatLabel.trim() || !newStatValue.trim()) return;
    const newStat: StatItem = {
      id: 'stat-' + Date.now(),
      label: newStatLabel.trim(),
      value: newStatValue.trim(),
    };
    updateAbout({ stats: [...(ab.stats || []), newStat] });
    setNewStatLabel('');
    setNewStatValue('');
  };

  const handleDeleteStat = (id: string) => {
    updateAbout({ stats: (ab.stats || []).filter((s) => s.id !== id) });
  };

  // Education Modal
  const openEduModal = (edu?: EducationItem) => {
    if (edu) {
      setEditingEdu(edu);
      setEduDegree(edu.degree);
      setEduSchool(edu.school);
      setEduPeriod(edu.period);
      setEduDetails(edu.details);
    } else {
      setEditingEdu(null);
      setEduDegree('');
      setEduSchool('');
      setEduPeriod('');
      setEduDetails('');
    }
    setEduModalOpen(true);
  };

  const handleSaveEdu = () => {
    if (!eduDegree.trim() || !eduSchool.trim()) return;
    if (editingEdu) {
      const updated = (ab.education || []).map((e) =>
        e.id === editingEdu.id
          ? { ...e, degree: eduDegree, school: eduSchool, period: eduPeriod, details: eduDetails }
          : e
      );
      updateAbout({ education: updated });
    } else {
      const newEdu: EducationItem = {
        id: 'edu-' + Date.now(),
        degree: eduDegree,
        school: eduSchool,
        period: eduPeriod,
        details: eduDetails,
      };
      updateAbout({ education: [...(ab.education || []), newEdu] });
    }
    setEduModalOpen(false);
  };

  const handleDeleteEdu = (id: string) => {
    updateAbout({ education: (ab.education || []).filter((e) => e.id !== id) });
  };

  // Experience Modal
  const openExpModal = (exp?: ExperienceItem) => {
    if (exp) {
      setEditingExp(exp);
      setExpRole(exp.role);
      setExpCompany(exp.company);
      setExpPeriod(exp.period);
      setExpDescription(exp.description);
    } else {
      setEditingExp(null);
      setExpRole('');
      setExpCompany('');
      setExpPeriod('');
      setExpDescription('');
    }
    setExpModalOpen(true);
  };

  const handleSaveExp = () => {
    if (!expRole.trim() || !expCompany.trim()) return;
    if (editingExp) {
      const updated = (ab.experience || []).map((e) =>
        e.id === editingExp.id
          ? { ...e, role: expRole, company: expCompany, period: expPeriod, description: expDescription }
          : e
      );
      updateAbout({ experience: updated });
    } else {
      const newExp: ExperienceItem = {
        id: 'exp-' + Date.now(),
        role: expRole,
        company: expCompany,
        period: expPeriod,
        description: expDescription,
      };
      updateAbout({ experience: [...(ab.experience || []), newExp] });
    }
    setExpModalOpen(false);
  };

  const handleDeleteExp = (id: string) => {
    updateAbout({ experience: (ab.experience || []).filter((e) => e.id !== id) });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
        <h2 className="text-base font-bold text-white">About Section &amp; Background History</h2>
        <p className="text-xs text-slate-400 mt-1">
          Edit the public biography paragraphs, career milestones, academic background, and professional achievements.
        </p>
      </div>

      {/* Main Bio Copy */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">Biographical Narrative</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Section Tag</label>
            <input
              type="text"
              value={ab.tag}
              onChange={(e) => updateAbout({ tag: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Headline</label>
            <input
              type="text"
              value={ab.title}
              onChange={(e) => updateAbout({ title: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Lead Paragraph (Bold Intro)</label>
          <textarea
            rows={3}
            value={ab.lead}
            onChange={(e) => updateAbout({ lead: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 resize-y"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Body Paragraph (Philosophy &amp; Focus)</label>
          <textarea
            rows={3}
            value={ab.body}
            onChange={(e) => updateAbout({ body: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 resize-y"
          />
        </div>
      </div>

      {/* About Section Photo */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">About Section Profile Photo</h3>

        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="w-28 h-36 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0 relative">
            <img
              src={ab.photo || data.homepage.heroImage || '/user-profile-image.jpeg'}
              alt="About Photo Preview"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2 left-2 text-[9px] font-semibold text-white/90 px-1.5 py-0.5 rounded bg-black/60">
              Active Photo
            </span>
          </div>

          <div className="space-y-3 flex-1">
            <p className="text-xs text-slate-300">
              Choose or upload a dedicated photo for the public biography and background card.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPhotoPickerOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span>Choose from Media Library</span>
              </button>

              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer border border-slate-700 transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>{isUploadingPhoto ? 'Uploading...' : 'Upload New Photo'}</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePhotoUpload}
                  disabled={isUploadingPhoto}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => updateAbout({ photo: data.homepage.heroImage })}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Sync with Hero Photo</span>
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Direct Image URL</label>
              <input
                type="text"
                value={ab.photo || ''}
                onChange={(e) => updateAbout({ photo: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                placeholder="/user-profile-image.jpeg or https://..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Experience History */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Work Experience &amp; Career Milestones</h3>
          </div>
          <button
            type="button"
            onClick={() => openExpModal()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Experience</span>
          </button>
        </div>

        <div className="space-y-3">
          {(ab.experience || []).map((exp) => (
            <div
              key={exp.id}
              className="p-4 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start justify-between gap-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{exp.role}</h4>
                  <span className="text-xs text-indigo-400">· {exp.company}</span>
                </div>
                <span className="inline-block text-[11px] text-slate-400 font-medium my-0.5">{exp.period}</span>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">{exp.description}</p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => openExpModal(exp)}
                  className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-900 rounded"
                  title="Edit entry"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteExp(exp.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded"
                  title="Delete entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {(!ab.experience || ab.experience.length === 0) && (
            <div className="text-center py-6 text-xs text-slate-400">
              No experience records added yet. Click &quot;Add Experience&quot; above.
            </div>
          )}
        </div>
      </div>

      {/* Education History */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-bold text-white">Education &amp; Degrees</h3>
          </div>
          <button
            type="button"
            onClick={() => openEduModal()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Education</span>
          </button>
        </div>

        <div className="space-y-3">
          {(ab.education || []).map((edu) => (
            <div
              key={edu.id}
              className="p-4 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start justify-between gap-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{edu.degree}</h4>
                  <span className="text-xs text-sky-400">· {edu.school}</span>
                </div>
                <span className="inline-block text-[11px] text-slate-400 font-medium my-0.5">{edu.period}</span>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">{edu.details}</p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => openEduModal(edu)}
                  className="p-1.5 text-slate-400 hover:text-sky-400 hover:bg-slate-900 rounded"
                  title="Edit entry"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteEdu(edu.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded"
                  title="Delete entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {(!ab.education || ab.education.length === 0) && (
            <div className="text-center py-6 text-xs text-slate-400">
              No education records added yet. Click &quot;Add Education&quot; above.
            </div>
          )}
        </div>
      </div>

      {/* Key Stats Counter */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">Key Metrics &amp; Achievements</h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(ab.stats || []).map((st) => (
            <div key={st.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800 relative group">
              <span className="block text-lg font-extrabold text-white">{st.value}</span>
              <span className="block text-[11px] text-slate-400 mt-0.5">{st.label}</span>
              <button
                type="button"
                onClick={() => handleDeleteStat(st.id)}
                className="absolute top-2 right-2 text-slate-400 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2">
          <input
            type="text"
            placeholder="Metric Value (e.g. $4.2M+)"
            value={newStatValue}
            onChange={(e) => setNewStatValue(e.target.value)}
            className="w-36 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder="Metric Label (e.g. Ad Spend Managed)"
            value={newStatLabel}
            onChange={(e) => setNewStatLabel(e.target.value)}
            className="flex-1 min-w-[200px] px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
          />
          <button
            type="button"
            onClick={handleAddStat}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Stat</span>
          </button>
        </div>
      </div>

      {/* Education Modal */}
      {eduModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-lg space-y-4">
            <h3 className="text-base font-bold text-white">
              {editingEdu ? 'Edit Education Entry' : 'Add Education Entry'}
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Degree / Course</label>
                <input
                  type="text"
                  value={eduDegree}
                  onChange={(e) => setEduDegree(e.target.value)}
                  placeholder="e.g. Bachelor of Business Administration"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Institution / University</label>
                <input
                  type="text"
                  value={eduSchool}
                  onChange={(e) => setEduSchool(e.target.value)}
                  placeholder="e.g. Delhi University"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Years / Period</label>
                <input
                  type="text"
                  value={eduPeriod}
                  onChange={(e) => setEduPeriod(e.target.value)}
                  placeholder="e.g. 2019 - 2022"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Details &amp; Specialization</label>
                <textarea
                  rows={2}
                  value={eduDetails}
                  onChange={(e) => setEduDetails(e.target.value)}
                  placeholder="e.g. Specialization in Marketing & Consumer Psychology..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEduModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdu}
                className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold"
              >
                Save Education
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Experience Modal */}
      {expModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-lg space-y-4">
            <h3 className="text-base font-bold text-white">
              {editingExp ? 'Edit Experience Entry' : 'Add Experience Entry'}
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Job Role / Position</label>
                <input
                  type="text"
                  value={expRole}
                  onChange={(e) => setExpRole(e.target.value)}
                  placeholder="e.g. Senior Growth Marketer & UI Lead"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={expCompany}
                  onChange={(e) => setExpCompany(e.target.value)}
                  placeholder="e.g. Apex Digital Agency"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Time Period</label>
                <input
                  type="text"
                  value={expPeriod}
                  onChange={(e) => setExpPeriod(e.target.value)}
                  placeholder="e.g. 2023 - Present"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Role Description &amp; Achievements</label>
                <textarea
                  rows={3}
                  value={expDescription}
                  onChange={(e) => setExpDescription(e.target.value)}
                  placeholder="Key responsibilities, spend managed, results achieved..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setExpModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveExp}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
              >
                Save Experience
              </button>
            </div>
          </div>
        </div>
      )}

      {/* About Profile Photo Picker Modal */}
      <MediaPickerModal
        isOpen={isPhotoPickerOpen}
        onClose={() => setIsPhotoPickerOpen(false)}
        onSelect={(url) => {
          updateAbout({ photo: url });
        }}
        title="Select About Profile Photo"
        defaultCategory="profile"
        allowedTypes="images"
      />
    </div>
  );
};
