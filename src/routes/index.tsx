import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { HeroSchematic } from '../components/site/HeroSchematic';
import { CtaBand } from '../components/site/CtaBand';
import { projects } from '../lib/dashboard-data';

export const Route = createFileRoute('/')({ component: Home });

const capabilities = [
  ['01', 'Project Delivery', 'Turning plans into structured, accountable execution.'],
  ['02', 'PMO & Governance', 'Creating practical frameworks, cadence and decision visibility.'],
  ['03', 'Project Controls', 'Managing schedule, cost, risk, change and performance.'],
  ['04', 'Reporting & Insight', 'Turning project data into clear management decisions.'],
];

const methodology = [
  ['01', 'Understand', 'Understand objectives, scope, stakeholders and constraints.'],
  ['02', 'Structure', 'Establish ownership, governance, plans and delivery frameworks.'],
  ['03', 'Control', 'Monitor schedule, cost, risk, change, dependencies and performance.'],
  ['04', 'Communicate', 'Create clear reporting and decision-making visibility.'],
  ['05', 'Deliver', 'Drive actions, resolve issues and maintain delivery momentum.'],
];

const tools = [
  ['Project Management', 'Planning · Scheduling · Delivery Management · Stakeholder Management · Governance'],
  ['Project Controls', 'Schedule Control · Cost Control · Risk · Change Control · Dependencies'],
  ['PMO', 'Governance · Reporting · Standards · Cadence · Portfolio Visibility'],
  ['Data & Reporting', 'Dashboards · Management Reporting · KPIs · Performance Tracking'],
];

const software = 'Power BI · DAX · Tableau · Excel · SQL (Basic) · Python (Pandas) · Jira · Confluence · MS Project · Trello · Asana · Lucidchart · Notion';

const caseStudies = [
  ['01', 'Executive BI Dashboard', 'Coordinated a 5-member cross-functional team and helped reduce reporting time by approximately 40% through automated refresh cycles and standardised templates.'],
  ['02', 'Credit Risk Prediction Model', 'Owned the product backlog, sprint boards and risk register, supporting on-schedule delivery of a model reaching 85%+ accuracy.'],
  ['03', 'Dynamic Pricing Engine', 'Tracked milestones and stakeholder communication across four sprint cycles, closing the project with zero escalation incidents.'],
];

function Home() {
  const methodRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const dashboard = projects[0]!;

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setActiveStep(methodology.length - 1);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number((entry.target as HTMLElement).dataset.index ?? 0);
          setActiveStep((current) => Math.max(current, index));
        }
      });
    }, { threshold: 0.5, rootMargin: '-10% 0px -30% 0px' });

    methodRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const progress = ((activeStep + 1) / methodology.length) * 100;

  return <div>
    <section className="home-hero mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.2fr_.8fr] md:items-center md:py-24">
      <div>
        <p className="home-hero-item num text-xs uppercase tracking-[0.22em] text-accent">Project Management · PMO · Project Controls</p>
        <h1 className="home-hero-item mt-5 text-5xl font-semibold leading-[1.02] md:text-7xl">Structured delivery.<br />Clear controls.<br /><span className="text-primary">Better outcomes.</span></h1>
        <p className="home-hero-item mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">I bring structure, visibility and control to complex delivery environments — connecting scope, schedule, cost, risk and reporting into a system teams can actually run.</p>
        <div className="home-hero-item mt-8 flex flex-wrap gap-3">
          <Link to="/contact" className="bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Discuss a project</Link>
          <a href="#selected-work" className="hairline px-5 py-3 text-sm">Explore my work</a>
        </div>
        <div className="home-scroll-indicator home-hero-item mt-10" aria-hidden="true"><span /> Scroll to explore</div>
      </div>
      <div className="home-hero-item hairline bg-surface p-5"><HeroSchematic /></div>
    </section>

    <section className="border-y border-border">
      <div className="mx-auto grid max-w-6xl gap-px bg-border md:grid-cols-3">
        {[
          ['01 · Structure', 'Clear governance, ownership, baselines and decision paths.'],
          ['02 · Control', 'Integrated schedule, cost, risk and change visibility.'],
          ['03 · Delivery', 'Actionable reporting that helps teams make decisions early.'],
        ].map(([label, copy]) => <div key={label} className="bg-background p-6"><div className="num text-xs uppercase text-muted-foreground">{label}</div><p className="mt-3 text-sm">{copy}</p></div>)}
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-5 py-16 md:py-20" id="what-i-do">
      <div className="mb-8 max-w-2xl"><p className="num text-xs uppercase tracking-[0.2em] text-accent">What I Do</p><h2 className="mt-3 text-3xl font-semibold md:text-4xl">Practical support for complex delivery.</h2></div>
      <div className="grid gap-px bg-border md:grid-cols-2">
        {capabilities.map(([number, title, copy], i) => <article key={title} className={`home-reveal home-delay-${i} bg-background p-7`}><div className="num text-xs text-muted-foreground">{number}</div><h3 className="mt-5 text-xl font-semibold">{title}</h3><p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{copy}</p></article>)}
      </div>
    </section>

    <section className="border-y border-border bg-surface" id="how-i-work">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="max-w-2xl"><p className="num text-xs uppercase tracking-[0.2em] text-accent">How I Work</p><h2 className="mt-3 text-3xl font-semibold md:text-4xl">Structure → control → visibility → decision.</h2></div>
        <div className="methodology-journey mt-12" style={{ '--method-progress': `${progress}%` } as CSSProperties}>
          <div className="methodology-line" aria-hidden="true"><span /></div>
          <div className="grid gap-8 md:grid-cols-5 md:gap-4">
            {methodology.map(([number, title, copy], i) => <article key={title} ref={(node) => { methodRefs.current[i] = node; }} data-index={i} className={`methodology-step ${i <= activeStep ? 'is-active' : ''}`}><div className="methodology-node num">{number}</div><h3 className="mt-5 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p></article>)}
          </div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-5 py-16 md:py-20" id="services-preview">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><p className="num text-xs uppercase tracking-[0.2em] text-accent">Services</p><h2 className="mt-3 text-3xl font-semibold md:text-4xl">What I can deliver.</h2></div><Link to="/services" className="text-sm text-accent">View all services →</Link></div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {[
          ['01', 'Project Management', 'Delivery leadership, planning, coordination, governance and decision support.'],
          ['02', 'PMO Setup & Improvement', 'Practical PMO structures, standards, reporting packs, cadence and governance.'],
          ['03', 'Project Controls', 'Schedule, cost, change, risk and performance controls designed around the project.'],
          ['04', 'Reporting & Dashboards', 'Concise management information that turns project data into actions and decisions.'],
        ].map(([number, title, copy], i) => <article key={title} className={`service-item home-reveal home-delay-${i} bg-background p-7 hairline`}><div className="num text-xs text-muted-foreground service-number">{number}</div><h3 className="mt-5 text-xl font-semibold service-title">{title}</h3><p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground service-copy">{copy}</p></article>)}
      </div>
    </section>

    <section className="border-y border-border bg-surface" id="dashboard-preview">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div><p className="num text-xs uppercase tracking-[0.2em] text-accent">Project Controls Dashboard</p><h2 className="mt-3 text-3xl font-semibold md:text-4xl">Project Controls, made visible.</h2><p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">Turning project data into a clear view of schedule, cost, risk, milestones and delivery performance.</p><Link to="/dashboard" className="mt-7 inline-block bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">View Project Dashboard</Link></div>
          <div className="dashboard-preview hairline bg-background p-4 sm:p-5">
            <div className="dashboard-piece flex items-center justify-between border-b border-border pb-4"><div><div className="num text-[10px] uppercase text-muted-foreground">Demo data · {dashboard.name}</div><div className="mt-1 text-sm font-semibold">Project controls snapshot</div></div><span className="num text-xs text-accent">{dashboard.kpi.scheduleHealth}</span></div>
            <div className="dashboard-piece mt-4 grid grid-cols-2 gap-px bg-border sm:grid-cols-4">{[['Schedule', dashboard.kpi.scheduleHealth], ['Budget used', `${dashboard.kpi.budgetUsed}%`], ['Open risks', dashboard.kpi.openRisks], ['Milestones', `${dashboard.kpi.milestonesDone}/${dashboard.kpi.milestonesTotal}`]].map(([k, v]) => <div key={k} className="bg-surface p-3"><div className="num text-[10px] uppercase text-muted-foreground">{k}</div><div className="mt-2 text-sm font-semibold">{v}</div></div>)}</div>
            <div className="dashboard-piece mt-4 hairline bg-surface p-4"><div className="num text-[10px] uppercase text-muted-foreground">Workstreams</div>{dashboard.workstreams.slice(0, 4).map((w) => <div key={w.name} className="mt-3 grid grid-cols-[110px_1fr_36px] items-center gap-2"><span className="truncate text-[11px]">{w.name}</span><div className="h-1.5 bg-background"><div className="h-full bg-primary" style={{ width: `${w.progress}%` }} /></div><span className="num text-[10px]">{w.progress}%</span></div>)}</div>
            <div className="dashboard-piece mt-4 grid gap-4 sm:grid-cols-2"><div className="hairline bg-surface p-4"><div className="num text-[10px] uppercase text-muted-foreground">Risk focus</div><p className="mt-2 text-xs leading-relaxed">Schedule, cost, ownership and mitigation visibility.</p></div><div className="hairline bg-surface p-4"><div className="num text-[10px] uppercase text-muted-foreground">Milestones</div><p className="mt-2 text-xs leading-relaxed">Progress tracked against the delivery baseline.</p></div></div>
          </div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-5 py-16 md:py-20" id="selected-work">
      <div className="max-w-2xl"><p className="num text-xs uppercase tracking-[0.2em] text-accent">Selected Experience</p><h2 className="mt-3 text-3xl font-semibold md:text-4xl">Evidence of structured delivery.</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Selected project examples from my existing experience. No client information is added beyond the project details already documented.</p></div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {caseStudies.map(([number, title, outcome]) => <article key={title} className="hairline bg-surface p-6"><div className="num text-xs text-accent">{number}</div><h3 className="mt-5 text-xl font-semibold">{title}</h3><div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground"><div><span className="num text-[10px] uppercase text-accent">Approach</span><p className="mt-1">Structured coordination, tracking and stakeholder communication.</p></div><div><span className="num text-[10px] uppercase text-accent">Outcome</span><p className="mt-1">{outcome}</p></div></div></article>)}
      </div>
    </section>

    <section className="border-y border-border bg-surface" id="expertise">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="max-w-2xl"><p className="num text-xs uppercase tracking-[0.2em] text-accent">Tools & Expertise</p><h2 className="mt-3 text-3xl font-semibold md:text-4xl">A practical delivery toolkit.</h2></div>
        <div className="mt-8 grid gap-px bg-border md:grid-cols-2">{tools.map(([title, copy]) => <div key={title} className="bg-background p-6"><p className="num text-xs uppercase tracking-[0.16em] text-accent">{title}</p><p className="mt-4 text-sm leading-7 text-muted-foreground">{copy}</p></div>)}</div>
        <div className="mt-5 hairline bg-background p-6"><p className="num text-xs uppercase tracking-[0.16em] text-accent">Confirmed Tools</p><p className="mt-4 text-sm leading-7 text-muted-foreground">{software}</p></div>
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-5 py-16 md:py-20" id="about-fathima">
      <div className="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-start"><div><p className="num text-xs uppercase tracking-[0.2em] text-accent">About Fathima</p><h2 className="mt-3 text-3xl font-semibold md:text-4xl">Structured delivery, practical governance.</h2></div><div className="max-w-2xl space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base"><p className="text-foreground">I work across project coordination, PMO and project controls with a focus on making delivery easier to understand and act on.</p><p>My approach is practical: establish clear ownership, make risks and dependencies visible, create useful reporting, and keep decisions connected to delivery reality.</p><p>With experience across BI, Fintech and Analytics engineering environments, I bring structured coordination, clear communication and data-led decision support to complex delivery work.</p><Link to="/about" className="inline-block pt-2 text-accent">Read more about Fathima →</Link></div></div>
    </section>

    <CtaBand title="Have a project that needs structure?" copy="Send a short brief — scope, timeline, and what's currently going wrong. You'll get an honest view of what it would take to bring it under control." />
  </div>;
}
