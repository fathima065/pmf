import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { CONTACT, formatEnquiry, type Enquiry } from '@/lib/contact';
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

  const set = (k: keyof Enquiry) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((current) => ({ ...current, [k]: '' }));
    if (status !== 'idle') setStatus('idle');
  };

  function validate() {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Full name is required.';
    if (!form.email.trim()) next.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Please enter a valid email address.';
    if (!form.projectType) next.projectType = 'Please select a project type.';
    if (!form.projectStage) next.projectStage = 'Please select a project stage.';
    if (!form.message.trim()) next.message = 'Message is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      await submitEnquiry({ data: { ...form, name: form.name.trim(), email: form.email.trim(), company: form.company.trim(), message: form.message.trim() } });
      setStatus('success');
      setForm(empty);
      setErrors({});
    } catch {
      setStatus('error');
    }
  }

  function cancel() {
    setForm(empty);
    setErrors({});
    setStatus('idle');
  }

  const fieldClass = 'hairline mt-2 w-full bg-surface px-3 py-3 text-sm outline-none transition focus:border-accent';

  return <main className="mx-auto max-w-6xl px-5 py-16 md:py-20">
    <p className="num text-xs uppercase tracking-[0.2em] text-accent">Contact</p>
    <h1 className="mt-3 text-3xl font-semibold md:text-5xl">Discuss a project</h1>
    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">Share a few details about your project, and I'll get back to you soon.</p>

    <div className="mt-12 grid gap-12 md:grid-cols-[1.2fr_1fr]">
      <section className="hairline bg-surface p-5 md:p-7" aria-label="Project enquiry form">
        {status === 'success' ? <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
          <div className="flex h-12 w-12 items-center justify-center border border-primary text-primary">✓</div>
          <h2 className="mt-6 text-2xl font-semibold">Enquiry received</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">Thank you. Your enquiry has been sent successfully. I'll get back to you soon.</p>
          <button type="button" onClick={cancel} className="hairline mt-7 px-5 py-3 text-sm">Send another enquiry</button>
        </div> : <form onSubmit={submit} noValidate className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label><span className="num text-xs uppercase tracking-[0.12em] text-muted-foreground">Full Name</span><input autoComplete="name" value={form.name} onChange={set('name')} className={fieldClass} />{errors.name && <span className="mt-1 block text-xs text-primary">{errors.name}</span>}</label>
            <label><span className="num text-xs uppercase tracking-[0.12em] text-muted-foreground">Email Address</span><input autoComplete="email" type="email" value={form.email} onChange={set('email')} className={fieldClass} />{errors.email && <span className="mt-1 block text-xs text-primary">{errors.email}</span>}</label>
            <label><span className="num text-xs uppercase tracking-[0.12em] text-muted-foreground">Company / Organisation</span><input autoComplete="organization" value={form.company} onChange={set('company')} className={fieldClass} /></label>
            <label><span className="num text-xs uppercase tracking-[0.12em] text-muted-foreground">Project Type</span><select value={form.projectType} onChange={set('projectType')} className={fieldClass}><option value="">Select project type</option>{projectTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select>{errors.projectType && <span className="mt-1 block text-xs text-primary">{errors.projectType}</span>}</label>
          </div>
          <label><span className="num text-xs uppercase tracking-[0.12em] text-muted-foreground">Project Stage</span><select value={form.projectStage} onChange={set('projectStage')} className={fieldClass}><option value="">Select project stage</option>{projectStages.map((stage) => <option key={stage} value={stage}>{stage}</option>)}</select>{errors.projectStage && <span className="mt-1 block text-xs text-primary">{errors.projectStage}</span>}</label>
          <label><span className="num text-xs uppercase tracking-[0.12em] text-muted-foreground">Message</span><textarea rows={7} value={form.message} onChange={set('message')} placeholder="Tell me briefly about your project, timeline and what you need help with." className={fieldClass} />{errors.message && <span className="mt-1 block text-xs text-primary">{errors.message}</span>}</label>
          <input tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} className="hidden" aria-hidden="true" />
          {status === 'error' && <p role="alert" className="hairline border-primary/40 bg-background p-3 text-sm text-primary">Something went wrong while sending your enquiry. Please try again.</p>}
          <div className="flex flex-wrap gap-3 pt-1">
            <button type="submit" disabled={status === 'sending'} className="bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-wait disabled:opacity-60">{status === 'sending' ? 'Sending…' : 'Send Enquiry'}</button>
            <button type="button" onClick={cancel} disabled={status === 'sending'} className="hairline px-6 py-3 text-sm disabled:opacity-50">Cancel</button>
          </div>
        </form>}
      </section>

      <aside>
        <div className="hairline bg-surface p-5"><SocialLinks className="flex-col" /></div>
        <div className="hairline mt-6 bg-surface p-5"><p className="num text-xs uppercase text-muted-foreground">Phone</p><a href={`tel:+${CONTACT.phoneIntl}`} className="mt-3 block text-2xl text-primary">{CONTACT.phone}</a></div>
        <div className="hairline mt-6 bg-surface p-5"><p className="num text-xs uppercase text-muted-foreground">Email</p><a href={`mailto:${CONTACT.email}`} className="mt-3 block break-all text-sm text-accent">{CONTACT.email}</a></div>
      </aside>
    </div>
  </main>;
}
