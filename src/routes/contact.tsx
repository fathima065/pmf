import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { CONTACT, type Enquiry } from '@/lib/contact';
import { submitEnquiry } from '@/lib/contact.functions';
import { SocialLinks } from '@/components/site/SocialLinks';

export const Route = createFileRoute('/contact')({ component: ContactPage });

const empty: Enquiry = { name: '', email: '', company: '', projectType: '', projectStage: '', message: '', website: '' };
const projectTypes = ['Project Management', 'PMO Setup & Improvement', 'Project Controls', 'Reporting & Dashboards', 'Project Recovery', 'Other'];
const projectStages = ['Planning', 'In Progress', 'At Risk', 'Recovery', 'Closing', 'Other'];

function ContactPage() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = (k: keyof Enquiry) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { setForm((f) => ({ ...f, [k]: e.target.value })); setErrors((current) => ({ ...current, [k]: '' })); if (status !== 'idle') setStatus('idle'); };
  function validate() { const next: Record<string, string> = {}; if (!form.name.trim()) next.name = 'Full name is required.'; if (!form.email.trim()) next.email = 'Email address is required.'; else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Please enter a valid email address.'; if (!form.projectType) next.projectType = 'Please select a project type.'; if (!form.projectStage) next.projectStage = 'Please select a project stage.'; setErrors(next); return Object.keys(next).length === 0; }
  async function submit(e: React.FormEvent) { e.preventDefault(); if (!validate()) return; setStatus('sending'); try { await submitEnquiry({ data: { ...form, name: form.name.trim(), email: form.email.trim(), company: form.company.trim(), message: '' } }); setStatus('success'); setForm(empty); setErrors({}); } catch { setStatus('error'); } }
  function cancel() { setForm(empty); setErrors({}); setStatus('idle'); }
  const fieldClass = 'contact-field';

  return <main className="page-shell contact-page">
    <header className="contact-hero page-header">
      <div><p className="section-kicker">09 — CONTACT</p><h1>Discuss a project</h1><p>Share a few details about your project, and I'll get back to you soon.</p></div>
      <div className="contact-hero-note"><span>START A CONVERSATION</span><strong>Structure first.<br />Clarity follows.</strong></div>
    </header>

    <div className="contact-grid">
      <section className="contact-form-panel" aria-label="Project enquiry form">
        <div className="contact-panel-head"><span className="panel-index">01</span><div><h2>Project enquiry</h2><p>Tell me what you are working on.</p></div></div>
        {status === 'success' ? <div className="contact-success"><div className="success-mark" aria-hidden="true">✓</div><h2>Enquiry received</h2><p>Thank you. Your enquiry has been sent successfully. I'll get back to you soon.</p><button type="button" onClick={cancel} className="button-secondary">Send another enquiry</button></div> : <form onSubmit={submit} noValidate>
          <div className="contact-fields-grid">
            <label><span>Full Name</span><input autoComplete="name" value={form.name} onChange={set('name')} className={fieldClass} aria-invalid={Boolean(errors.name)} />{errors.name && <small>{errors.name}</small>}</label>
            <label><span>Email Address</span><input autoComplete="email" type="email" value={form.email} onChange={set('email')} className={fieldClass} aria-invalid={Boolean(errors.email)} />{errors.email && <small>{errors.email}</small>}</label>
            <label><span>Company / Organisation</span><input autoComplete="organization" value={form.company} onChange={set('company')} className={fieldClass} /></label>
            <label><span>Project Type</span><select value={form.projectType} onChange={set('projectType')} className={fieldClass} aria-invalid={Boolean(errors.projectType)}><option value="">Select project type</option>{projectTypes.map((type) => <option key={type}>{type}</option>)}</select>{errors.projectType && <small>{errors.projectType}</small>}</label>
          </div>
          <label className="contact-field-full"><span>Project Stage</span><select value={form.projectStage} onChange={set('projectStage')} className={fieldClass} aria-invalid={Boolean(errors.projectStage)}><option value="">Select project stage</option>{projectStages.map((stage) => <option key={stage}>{stage}</option>)}</select>{errors.projectStage && <small>{errors.projectStage}</small>}</label>
          <input tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} className="hidden" aria-hidden="true" />
          {status === 'error' && <p role="alert" className="contact-error">Something went wrong while sending your enquiry. Please try again.</p>}
          <div className="contact-form-actions"><button type="submit" disabled={status === 'sending'} className="button-primary">{status === 'sending' ? 'Sending…' : 'Send Enquiry'}</button><button type="button" onClick={cancel} disabled={status === 'sending'} className="button-secondary">Cancel</button></div>
        </form>}
      </section>

      <aside className="contact-aside">
        <div className="contact-aside-intro"><span className="panel-index">02</span><h2>Direct contact</h2><p>Prefer a direct conversation? Use the details below.</p></div>
        <div className="contact-detail"><span>Phone</span><a href={`tel:+${CONTACT.phoneIntl}`}>{CONTACT.phone}</a></div>
        <div className="contact-detail"><span>Email</span><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></div>
        <div className="contact-social"><span className="panel-index">03</span><h2>Online</h2><SocialLinks className="flex-col" /></div>
      </aside>
    </div>
  </main>;
}
