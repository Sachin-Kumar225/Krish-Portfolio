import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Trash2,
  CheckCircle,
  Inbox,
  Send,
  Eye,
  Settings,
} from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';

export const ContactView: React.FC = () => {
  const { data, updateContact, markInquiryRead, deleteInquiry } = usePortfolio();
  const ct = data.contact;

  const [activeInquiryId, setActiveInquiryId] = useState<string | null>(null);

  const inquiries = ct.inquiries || [];
  const unreadCount = inquiries.filter((i) => !i.read).length;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
        <h2 className="text-base font-bold text-white">Contact Information &amp; Public Inquiries</h2>
        <p className="text-xs text-slate-400 mt-1">
          Manage your public contact channels, availability status, form settings, and client inquiries.
        </p>
      </div>

      {/* Contact Channels */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">Direct Contact Channels</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              <span>Public Email Address</span>
            </label>
            <input
              type="email"
              value={ct.email}
              onChange={(e) => updateContact({ email: e.target.value })}
              placeholder="hello@krishkumar.design"
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>Phone / WhatsApp Number</span>
            </label>
            <input
              type="text"
              value={ct.phone}
              onChange={(e) => updateContact({ phone: e.target.value })}
              placeholder="+91 98765 43210"
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>Location / Timezone</span>
            </label>
            <input
              type="text"
              value={ct.location}
              onChange={(e) => updateContact({ location: e.target.value })}
              placeholder="New Delhi, India (Available Worldwide · UTC+5:30)"
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Availability Status Pill</span>
            </label>
            <input
              type="text"
              value={ct.availability}
              onChange={(e) => updateContact({ availability: e.target.value })}
              placeholder="Available for Q2/Q3 Projects & Select Consultations"
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Form Settings */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">Contact Form Settings</h3>

        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
          <div>
            <span className="text-xs font-semibold text-white block">Enable Public Contact Form</span>
            <span className="text-[11px] text-slate-400">
              When enabled, visitors can submit messages directly through your website.
            </span>
          </div>
          <input
            type="checkbox"
            checked={ct.formEnabled !== false}
            onChange={(e) => updateContact({ formEnabled: e.target.checked })}
            className="w-4 h-4 accent-indigo-500 rounded"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Notification Recipient Email
          </label>
          <input
            type="email"
            value={ct.recipientEmail || ct.email}
            onChange={(e) => updateContact({ recipientEmail: e.target.value })}
            placeholder="Where form submissions should be forwarded"
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Success Message (Shown to visitor upon submission)
          </label>
          <textarea
            rows={2}
            value={ct.successMessage}
            onChange={(e) => updateContact({ successMessage: e.target.value })}
            placeholder="Thank you for reaching out! I typically respond within 24 hours."
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Inquiries Inbox */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Inbox className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Client Inquiries Inbox</h3>
            {unreadCount > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950">
                {unreadCount} UNREAD
              </span>
            )}
          </div>
          <span className="text-xs text-slate-400">Total: {inquiries.length}</span>
        </div>

        <div className="space-y-3">
          {inquiries.map((inq) => {
            const isExpanded = activeInquiryId === inq.id;
            return (
              <div
                key={inq.id}
                className={`p-4 rounded-xl border transition-all ${
                  inq.read
                    ? 'bg-slate-950/60 border-slate-800/80'
                    : 'bg-emerald-950/20 border-emerald-800/60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-white">{inq.name}</span>
                      <a
                        href={`mailto:${inq.email}`}
                        className="text-xs text-indigo-400 hover:underline"
                      >
                        {inq.email}
                      </a>
                      {!inq.read && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950">
                          NEW
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-slate-300">{inq.subject}</div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-[10px] text-slate-400 mr-2">{inq.date}</span>
                    <button
                      type="button"
                      onClick={() => markInquiryRead(inq.id)}
                      className="p-1.5 text-slate-400 hover:text-emerald-400 rounded"
                      title={inq.read ? 'Mark as read' : 'Mark read'}
                    >
                      <CheckCircle className={`w-3.5 h-3.5 ${inq.read ? 'text-slate-600' : 'text-emerald-400'}`} />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteInquiry(inq.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 rounded"
                      title="Delete message"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-2.5 p-3 rounded-lg bg-slate-900/90 border border-slate-800/80 leading-relaxed">
                  {inq.message}
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <a
                    href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject || 'Portfolio Inquiry')}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold transition-colors"
                  >
                    <Send className="w-3 h-3" />
                    <span>Reply via Email</span>
                  </a>
                </div>
              </div>
            );
          })}

          {inquiries.length === 0 && (
            <div className="text-center py-10 text-xs text-slate-400">
              No inquiries yet. When visitors fill out your contact form, submissions appear here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
