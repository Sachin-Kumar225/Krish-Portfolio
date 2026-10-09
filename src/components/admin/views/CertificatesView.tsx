import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  Award,
  ExternalLink,
  Upload,
  CheckCircle,
  Eye,
  EyeOff,
  FileText,
} from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { CertificateItem } from '../../../data/defaultPortfolioData';
import { uploadMediaFile } from '../../../lib/supabase';

export const CertificatesView: React.FC = () => {
  const { data, addCertificate, editCertificate, deleteCertificate, addMedia } = usePortfolio();
  const certs = data.certificates;

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<CertificateItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [credentialId, setCredentialId] = useState('');
  const [link, setLink] = useState('');
  const [imageUrl, setImageUrl] = useState('/user-profile-image.jpeg');
  const [description, setDescription] = useState('');
  const [published, setPublished] = useState(true);

  const openAddModal = () => {
    setEditingCert(null);
    setName('');
    setOrganization('Meta');
    setIssueDate('2025');
    setCredentialId('');
    setLink('');
    setImageUrl('/user-profile-image.jpeg');
    setDescription('');
    setPublished(true);
    setModalOpen(true);
  };

  const openEditModal = (cert: CertificateItem) => {
    setEditingCert(cert);
    setName(cert.name);
    setOrganization(cert.organization);
    setIssueDate(cert.issueDate);
    setCredentialId(cert.credentialId);
    setLink(cert.link || '');
    setImageUrl(cert.imageUrl || '/user-profile-image.jpeg');
    setDescription(cert.description);
    setPublished(cert.published !== false);
    setModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await uploadMediaFile(file, 'portfolio-media', 'certificates');
      if (res.url) {
        setImageUrl(res.url);
        addMedia({
          name: file.name,
          url: res.url,
          category: 'certificates',
          fileType: file.type || 'application/pdf',
          fileSize: `${Math.round(file.size / 1024)} KB`,
          dateAdded: new Date().toISOString().split('T')[0],
        });
      }
    } catch (err) {
      console.error('Certificate upload failed:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = () => {
    if (!name.trim() || !organization.trim()) return;

    const payload = {
      name: name.trim(),
      organization: organization.trim(),
      issueDate: issueDate.trim(),
      credentialId: credentialId.trim(),
      link: link.trim(),
      imageUrl: imageUrl.trim(),
      description: description.trim(),
      published,
    };

    if (editingCert) {
      editCertificate(editingCert.id, payload);
    } else {
      addCertificate(payload);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string, certName: string) => {
    if (window.confirm(`Delete certificate "${certName}"?`)) {
      deleteCertificate(id);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white">Certificates &amp; Credentials</h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage your verified industry certifications, issuing bodies, credential IDs, and document uploads.
          </p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Certificate</span>
        </button>
      </div>

      {/* Certificates List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certs.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700/80 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {c.name}
                    </h3>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {c.organization} · {c.issueDate}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => editCertificate(c.id, { published: !c.published })}
                    className="p-1.5 text-slate-400 hover:text-white rounded"
                    title={c.published ? 'Visible' : 'Hidden'}
                  >
                    {c.published ? (
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => openEditModal(c)}
                    className="p-1.5 text-slate-400 hover:text-indigo-400 rounded"
                    title="Edit certificate"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(c.id, c.name)}
                    className="p-1.5 text-slate-400 hover:text-rose-400 rounded"
                    title="Delete certificate"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-300 mt-3 leading-relaxed">{c.description}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 font-mono">
                ID: {c.credentialId || 'N/A'}
              </span>
              {c.link && (
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-semibold text-[11px]"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}

        {certs.length === 0 && (
          <div className="col-span-full text-center py-12 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs">
            No certificates added yet. Click &quot;Add Certificate&quot; above to create one.
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-lg space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <h3 className="text-base font-bold text-white">
              {editingCert ? `Edit Certificate: ${editingCert.name}` : 'Add New Certificate'}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Certificate Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Meta Certified Digital Marketing Associate"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Issuing Organization *</label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Meta, Google, HubSpot..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Issue Date / Year</label>
                  <input
                    type="text"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    placeholder="e.g. 2025"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Credential ID</label>
                <input
                  type="text"
                  value={credentialId}
                  onChange={(e) => setCredentialId(e.target.value)}
                  placeholder="e.g. META-DMA-10924"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Verification Link</label>
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://credly.com/..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Upload Image/PDF */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Upload Certificate File (Image or PDF)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="URL or uploaded path..."
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                  <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer border border-slate-700 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploading ? 'Uploading...' : 'Upload File'}</span>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Description / Competencies</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Certified mastery in audience targeting, dynamic creative iteration..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="certPubCheck"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="accent-indigo-500 rounded"
                />
                <label htmlFor="certPubCheck" className="text-xs text-slate-300 font-medium">
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
                {editingCert ? 'Save Changes' : 'Create Certificate'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
