import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { CONTACT, whatsappLink, formatEnquiry, type Enquiry } from '@/lib/contact';
import { SocialLinks } from '@/components/site/SocialLinks';

export const Route = createFileRoute('/contact')({ component: ContactPage });
const empty: Enquiry = { name: '', email: '', company: '', budget: '', message: '' };

function ContactPage() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<'idle' | 'sent' | 'failed'>('idle');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(empty);

  const set = (k: keyof Enquiry) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const p = { ...form, name: form.name.trim(), email: form.email.trim(), company: form.company.trim(), budget: form.budget.trim(), message: form.message.trim() };
    if (!p.name || !p.email || !p.email.includes('@') || p.message.length < 5) {
      setError('Please add your name, a valid email and a brief of at least 5 characters.');
      setStatus('failed');
      return;
    }

    const subject = encodeURIComponent(`New project enquiry — ${p.name}`);
    const body = encodeURIComponent(formatEnquiry(p));
    const mailto = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setSent(p);
    setStatus('sent');
    window.location.href = mailto;
  }

  return <main className="mx-auto max-w-6xl px-5 py-16">
    <p className="num text-xs uppercase tracking-[0.2em] text-accent">Contact</p>
    <h1 className="mt-3 text-3xl font-semibold md:text-5xl">Discuss a project</h1>
    <p className="mt-4 max-w-2xl text-sm text-muted-foreground">Send a short brief — scope, timeline and what's currently going wrong.</p>
    <div className="mt-12 grid gap-12 md:grid-cols-[1.2fr_1fr]">
      <form onSubmit={submit} className="space-y-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          {(['name', 'email', 'company', 'budget'] as const).map((k) => <label key={k}>
            <span className="num text-xs uppercase text-muted-foreground">{k}</span>
            <input required={k === 'name' || k === 'email'} type={k === 'email' ? 'email' : 'text'} value={form[k]} onChange={set(k)} className="hairline mt-2 w-full bg-surface px-3 py-2 text-sm" />
          </label>)}
        </div>
        <label><span className="num text-xs uppercase text-muted-foreground">Project brief</span><textarea required rows={6} value={form.message} onChange={set('message')} className="hairline mt-2 w-full bg-surface px-3 py-2 text-sm" /></label>
        <button className="bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Send enquiry</button>
        {status === 'failed' && <div className="hairline bg-surface p-4 text-sm">{error}</div>}
        {status === 'sent' && <div className="hairline bg-surface p-4 text-sm">Your email app should open now. If it doesn't, <a href={whatsappLink(sent)} target="_blank" rel="noreferrer" className="text-accent">send the enquiry on WhatsApp</a> or email <a href={`mailto:${CONTACT.email}`} className="text-accent">{CONTACT.email}</a>.</div>}
      </form>
      <aside>
        <div className="hairline bg-surface p-5"><SocialLinks className="flex-col" /></div>
        <div className="hairline mt-6 bg-surface p-5"><p className="num text-xs uppercase text-muted-foreground">Phone</p><a href={`tel:+${CONTACT.phoneIntl}`} className="mt-3 block text-2xl text-primary">{CONTACT.phone}</a></div>
      </aside>
    </div>
  </main>;
}
