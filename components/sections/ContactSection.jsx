'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Send, CheckCircle2, AlertCircle, Mail, MapPin, Building, Clock } from 'lucide-react';

export default function ContactSection({ profile }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: 'Academic enquiry',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const p = profile || {
    institution: 'SRJC, Thane',
    location: 'Thane, Maharashtra, India',
    email: 'janardhan.aghav@srjc.edu.in',
  };

  const purposes = [
    'Academic enquiry',
    'Student support',
    'Teaching resources',
    'Collaboration',
    'Professional opportunity',
    'Other'
  ];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please specify the subject of your inquiry.';
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please write a message of at least 10 characters.';
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || 'Failed to dispatch inquiry.');
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      setServerError('An unexpected communication error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 relative bg-[#1c130d] border-t border-[#A67C52]/20">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-[#C1A477]">
            <Mail size={15} className="text-[#A67C52]" />
            <span>Epistolary Desk</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F2E9D7]">
            {t('contact_title') || 'Epistolary Correspondence'}
          </h2>
          <p className="text-sm sm:text-base font-serif italic text-[#A67C52]">
            {t('contact_subtitle') || 'Send an Inquiry to Professor Janardhan Aghav'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Faculty Office Dossier */}
          <div className="md:col-span-5 space-y-6">
            <div className="academic-panel rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-serif font-bold text-[#F2E9D7] border-b border-[#A67C52]/30 pb-2">
                Faculty Address &amp; Chambers
              </h3>

              <div className="space-y-3 text-xs sm:text-sm font-serif">
                <div className="flex items-start gap-3 text-[#E8DCC5]/80">
                  <Building size={16} className="text-[#A67C52] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-[#F2E9D7]">{p.institution}</span>
                    <span className="text-xs text-[#73734E]">Department of Biological Sciences</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-[#E8DCC5]/80">
                  <MapPin size={16} className="text-[#A67C52] shrink-0 mt-0.5" />
                  <span>{p.location}</span>
                </div>

                <div className="flex items-start gap-3 text-[#E8DCC5]/80">
                  <Mail size={16} className="text-[#A67C52] shrink-0 mt-0.5" />
                  <a href={`mailto:${p.email}`} className="hover:text-[#C1A477] transition-colors underline">
                    {p.email}
                  </a>
                </div>

                <div className="flex items-start gap-3 text-[#E8DCC5]/80">
                  <Clock size={16} className="text-[#A67C52] shrink-0 mt-0.5" />
                  <span>Consultation: Post-Lecture Hours (Monday – Friday)</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#A67C52]/20">
                <p className="text-[11px] font-mono text-[#A67C52]">
                  Notice: All academic notes, student queries, and lecture collaboration requests are catalogued in the faculty registry.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Correspondence Form */}
          <div className="md:col-span-7">
            <div className="academic-panel rounded-lg p-6 sm:p-8 relative">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#302117] border-2 border-[#A67C52] flex items-center justify-center mx-auto text-[#C1A477]">
                    <CheckCircle2 size={30} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#F2E9D7]">
                    Correspondence Recorded
                  </h3>
                  <p className="text-xs sm:text-sm font-serif text-[#E8DCC5]/80 max-w-md mx-auto leading-relaxed">
                    {t('contact_success') || "Your correspondence has been securely recorded. An acknowledgement copy has been dispatched to the faculty archive."}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        purpose: 'Academic enquiry',
                        subject: '',
                        message: '',
                        honeypot: '',
                      });
                    }}
                    className="mt-4 px-4 py-2 text-xs font-mono uppercase bg-[#302117] border border-[#A67C52] text-[#C1A477] hover:bg-[#A67C52] hover:text-[#211711] transition-all rounded"
                  >
                    Draft Another Letter
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot hidden input */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {serverError && (
                    <div className="p-3 bg-red-950/40 border border-red-800/60 rounded text-red-200 text-xs flex items-center gap-2">
                      <AlertCircle size={14} className="shrink-0" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-mono uppercase text-[#A67C52] block">
                        {t('contact_name_label') || "Your Full Name"} *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Rajesh Sharma"
                        className={`w-full px-3.5 py-2 bg-[#191715] border rounded text-xs sm:text-sm text-[#E8DCC5] focus:outline-none focus:border-[#C1A477] transition-colors ${
                          errors.name ? 'border-red-500' : 'border-[#A67C52]/40'
                        }`}
                      />
                      {errors.name && <span className="text-[11px] text-red-400 font-mono block">{errors.name}</span>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-xs font-mono uppercase text-[#A67C52] block">
                        {t('contact_email_label') || "Official Email Address"} *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g., rajesh@domain.edu"
                        className={`w-full px-3.5 py-2 bg-[#191715] border rounded text-xs sm:text-sm text-[#E8DCC5] focus:outline-none focus:border-[#C1A477] transition-colors ${
                          errors.email ? 'border-red-500' : 'border-[#A67C52]/40'
                        }`}
                      />
                      {errors.email && <span className="text-[11px] text-red-400 font-mono block">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Purpose */}
                    <div className="space-y-1">
                      <label className="text-xs font-mono uppercase text-[#A67C52] block">
                        {t('contact_purpose_label') || "Nature of Inquiry"}
                      </label>
                      <select
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        className="w-full px-3 py-2 bg-[#191715] border border-[#A67C52]/40 rounded text-xs sm:text-sm text-[#E8DCC5] focus:outline-none focus:border-[#C1A477] transition-colors"
                      >
                        {purposes.map((p) => (
                          <option key={p} value={p} className="bg-[#211711] text-[#E8DCC5]">
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Subject */}
                    <div className="space-y-1">
                      <label className="text-xs font-mono uppercase text-[#A67C52] block">
                        {t('contact_subject_label') || "Subject Matter"} *
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g., Query regarding Plant Morphology"
                        className={`w-full px-3.5 py-2 bg-[#191715] border rounded text-xs sm:text-sm text-[#E8DCC5] focus:outline-none focus:border-[#C1A477] transition-colors ${
                          errors.subject ? 'border-red-500' : 'border-[#A67C52]/40'
                        }`}
                      />
                      {errors.subject && <span className="text-[11px] text-red-400 font-mono block">{errors.subject}</span>}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-[#A67C52] block">
                      {t('contact_message_label') || "Detailed Message"} *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your dispatch here..."
                      className={`w-full px-3.5 py-2 bg-[#191715] border rounded text-xs sm:text-sm text-[#E8DCC5] focus:outline-none focus:border-[#C1A477] transition-colors ${
                        errors.message ? 'border-red-500' : 'border-[#A67C52]/40'
                      }`}
                    />
                    {errors.message && <span className="text-[11px] text-red-400 font-mono block">{errors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[#A67C52] text-[#211711] font-serif font-bold text-xs sm:text-sm tracking-wider uppercase rounded hover:bg-[#C1A477] transition-all shadow-md active:scale-95 disabled:opacity-50"
                  >
                    <Send size={15} />
                    <span>{loading ? (t('contact_submitting') || "Sealing Envelope...") : (t('contact_submit_btn') || "Dispatch Correspondence")}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
