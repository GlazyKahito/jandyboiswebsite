'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Send, CheckCircle2, AlertCircle, Mail, MapPin, Building, Clock } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';

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
    <section id="contact" className="relative border-t border-line px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="08"
          label="Epistolary Desk"
          title={t('contact_title') || 'Epistolary Correspondence'}
          subtitle={t('contact_subtitle') || 'Send an Inquiry to Professor Janardhan Aghav'}
        />

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: Faculty Office Dossier */}
          <Reveal className="lg:col-span-5">
            <h3 className="label text-phosphor">Faculty Address &amp; Chambers</h3>

            <dl className="mt-4 divide-y divide-line border-y border-line text-sm">
              <div className="flex items-start gap-4 py-4">
                <Building size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                <div>
                  <dt className="label">Institution</dt>
                  <dd className="mt-1 text-ivory">{p.institution}</dd>
                  <dd className="text-xs text-moss">Department of Biological Sciences</dd>
                </div>
              </div>

              <div className="flex items-start gap-4 py-4">
                <MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                <div>
                  <dt className="label">Location</dt>
                  <dd className="mt-1 text-parchment/85">{p.location}</dd>
                </div>
              </div>

              <div className="flex items-start gap-4 py-4">
                <Mail size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                <div>
                  <dt className="label">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${p.email}`} className="break-all text-parchment/85 underline decoration-gold/40 underline-offset-4 transition-colors hover:text-phosphor">
                      {p.email}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-4 py-4">
                <Clock size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                <div>
                  <dt className="label">Consultation</dt>
                  <dd className="mt-1 text-parchment/85">Post-Lecture Hours (Monday – Friday)</dd>
                </div>
              </div>
            </dl>

            <p className="mt-5 font-mono text-[11px] leading-relaxed text-bronze/80">
              Notice: All academic notes, student queries, and lecture collaboration requests are catalogued in the faculty registry.
            </p>
          </Reveal>

          {/* Right Column: Correspondence Form */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="panel ticks p-6 sm:p-10">
              {submitted ? (
                <div className="space-y-4 py-12 text-center">
                  <CheckCircle2 size={34} strokeWidth={1.25} className="mx-auto text-moss" />
                  <h3 className="font-serif text-3xl font-light text-ivory">
                    Correspondence Recorded
                  </h3>
                  <p className="mx-auto max-w-md text-sm leading-relaxed text-parchment/75">
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
                    className="btn btn-ghost mt-4"
                  >
                    Draft Another Letter
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
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
                    <div className="flex items-center gap-2 border border-red-500/50 bg-red-950/30 p-3 font-mono text-xs text-red-200">
                      <AlertCircle size={14} className="shrink-0" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                    {/* Name */}
                    <div>
                      <label className="label block">
                        {t('contact_name_label') || "Your Full Name"} *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Rajesh Sharma"
                        className={`field ${errors.name ? 'field-error' : ''}`}
                      />
                      {errors.name && <span className="mt-1.5 block font-mono text-[11px] text-red-400">{errors.name}</span>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="label block">
                        {t('contact_email_label') || "Official Email Address"} *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g., rajesh@domain.edu"
                        className={`field ${errors.email ? 'field-error' : ''}`}
                      />
                      {errors.email && <span className="mt-1.5 block font-mono text-[11px] text-red-400">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                    {/* Purpose */}
                    <div>
                      <label className="label block">
                        {t('contact_purpose_label') || "Nature of Inquiry"}
                      </label>
                      <select
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        className="field"
                      >
                        {purposes.map((p) => (
                          <option key={p} value={p} className="bg-soot text-parchment">
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="label block">
                        {t('contact_subject_label') || "Subject Matter"} *
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g., Query regarding Plant Morphology"
                        className={`field ${errors.subject ? 'field-error' : ''}`}
                      />
                      {errors.subject && <span className="mt-1.5 block font-mono text-[11px] text-red-400">{errors.subject}</span>}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="label block">
                      {t('contact_message_label') || "Detailed Message"} *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your dispatch here..."
                      className={`field ${errors.message ? 'field-error' : ''}`}
                    />
                    {errors.message && <span className="mt-1.5 block font-mono text-[11px] text-red-400">{errors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary btn-shimmer w-full py-4 disabled:opacity-50"
                  >
                    <Send size={15} />
                    <span>{loading ? (t('contact_submitting') || "Sealing Envelope...") : (t('contact_submit_btn') || "Dispatch Correspondence")}</span>
                  </button>
                </form>
              )}
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
