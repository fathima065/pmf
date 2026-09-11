import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { CtaBand } from '../components/site/CtaBand';

export const Route = createFileRoute('/about')({ component: About });

// Update this single value when the confirmed company operating history is available.
const COMPANY_OPERATION_YEARS = '10+';

function About() {
  const experienceRef = useRef<HTMLElement>(null);
  const [experienceVisible, setExperienceVisible] = useState(false);

  useEffect(() => {
    const element = experienceRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setExperienceVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div>
    <main className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <p className="num text-xs uppercase tracking-[0.22em] text-accent">About</p>

      <section className="mt-6 grid gap-10 md:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="num text-xs uppercase tracking-[0.18em] text-muted-foreground">FATHIMA NP</p>
          <h1 className="mt-3 text-4xl font-semibold md:text-6xl">Project Manager<br />Technical Project Coordinator<br />IT PMO Analyst</h1>
          <div className="mt-6 space-y-2 text-sm text-muted-foreground">
            <p>npfathima06@gmail.com</p>
            <p>+91 79025 85902 · Kochi, Kerala, India</p>
            <a className="text-accent" href="https://www.linkedin.com/in/fathima-np" target="_blank" rel="noreferrer">linkedin.com/in/fathima-np</a>
          </div>
        </div>
        <div className="space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
          <p className="text-foreground"><strong>Professional Summary</strong></p>
          <p>Technical Project Coordinator with 2+ years of full-time experience supporting Agile software delivery across BI, Fintech, and Analytics engineering teams. Skilled in SDLC coordination, sprint planning, backlog management, and UAT coordination using Jira and Confluence.</p>
          <p>Experienced in tracking scope, milestones, risks and cross-team dependencies across concurrent technical projects while producing automated Power BI reporting for engineering leadership and C-level sponsors.</p>
          <p>PSM I (Scrum.org) candidate with hands-on exposure to Python-based data and machine-learning projects.</p>
        </div>
      </section>

      <section className="mt-16 grid gap-8 md:grid-cols-2">
        <div className="hairline bg-surface p-6">
          <p className="num text-xs uppercase tracking-[0.18em] text-accent">Core Competencies</p>
          <p className="mt-4 text-sm leading-7">Agile / Scrum · Sprint Planning · Backlog Management · SDLC Coordination · UAT Coordination · Risk & Issue Tracking · Jira & Confluence Administration · Power BI Reporting · Stakeholder Management</p>
        </div>
        <div className="hairline bg-surface p-6">
          <p className="num text-xs uppercase tracking-[0.18em] text-accent">PMO & Governance</p>
          <p className="mt-4 text-sm leading-7">PMO Governance · SOP & Process Documentation · Process Improvement · Workflow Optimisation · Milestone & Scope Tracking · Cross-team Dependency Tracking</p>
        </div>
        <div className="hairline bg-surface p-6">
          <p className="num text-xs uppercase tracking-[0.18em] text-accent">Reporting & Technical</p>
          <p className="mt-4 text-sm leading-7">Power BI · DAX · Tableau · Excel · SQL (Basic) · Python (Pandas) · Jira · Confluence · MS Project · Trello · Asana · Lucidchart · Notion</p>
        </div>
        <div className="hairline bg-surface p-6">
          <p className="num text-xs uppercase tracking-[0.18em] text-accent">Communication</p>
          <p className="mt-4 text-sm leading-7">Stakeholder Management · Cross-functional Collaboration · Multicultural Team Coordination</p>
        </div>
      </section>

      <section ref={experienceRef} className={`company-experience mt-16${experienceVisible ? ' is-visible' : ''}`} aria-label="Company experience">
        <div className="company-experience-card hairline bg-surface px-6 py-8 text-center md:px-8 md:py-10">
          <p className="company-experience-number num text-5xl font-semibold tracking-tight text-primary md:text-7xl">{COMPANY_OPERATION_YEARS}</p>
          <p className="company-experience-label num mt-3 text-xs uppercase tracking-[0.22em] text-accent">Years of Operation</p>
          <p className="company-experience-copy mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">Supporting structured project delivery and business operations.</p>
        </div>
      </section>

      <section className="mt-16">
        <p className="num text-xs uppercase tracking-[0.18em] text-accent">Professional Experience</p>
        <div className="mt-5 hairline bg-surface p-6 md:p-8">
          <div className="flex flex-col justify-between gap-2 md:flex-row">
            <div><h2 className="text-2xl font-semibold">Operations & Project Coordination Analyst</h2><p className="mt-1 text-sm text-muted-foreground">Iboen Tech, Kochi (Remote) · Full-Time</p></div>
            <p className="num text-xs text-muted-foreground">Sept 2024 – June 2026</p>
          </div>
          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <li>• Directed end-to-end delivery tracking across 6 concurrent BI, Fintech, and Analytics software projects using Jira and Confluence.</li>
            <li>• Built automated Power BI dashboards and standardised MIS reporting templates, cutting stakeholder reporting time by an estimated 40%.</li>
            <li>• Reduced sprint delivery delays by approximately 30% through structured blocker reviews, risk escalation and dependency tracking.</li>
            <li>• Owned SLA adherence and KPI governance across delivery cycles, sustaining zero SLA breaches over an 8-month engagement.</li>
            <li>• Authored SOPs, UAT checklists and WBS milestone logs in Confluence, reducing manual overhead and supporting engineering onboarding.</li>
            <li>• Facilitated daily Agile ceremonies including standups, sprint planning, sprint reviews and retrospectives.</li>
          </ul>
        </div>
      </section>

      <section className="mt-16">
        <p className="num text-xs uppercase tracking-[0.18em] text-accent">Key Projects</p>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <div className="hairline p-5"><h3 className="font-semibold">Executive BI Dashboard</h3><p className="mt-2 text-xs text-muted-foreground">Coordination Lead · Power BI · Jira · Confluence · Python · Excel</p><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Coordinated a 5-member cross-functional team and helped reduce reporting time by approximately 40% through automated refresh cycles and standardised templates.</p></div>
          <div className="hairline p-5"><h3 className="font-semibold">Credit Risk Prediction Model</h3><p className="mt-2 text-xs text-muted-foreground">Agile PMO Support · Python · Scikit-learn · Pandas · Jira</p><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Owned the product backlog, sprint boards and risk register, supporting on-schedule delivery of a model reaching 85%+ accuracy.</p></div>
          <div className="hairline p-5"><h3 className="font-semibold">Dynamic Pricing Engine</h3><p className="mt-2 text-xs text-muted-foreground">Delivery Coordination · Python · Pandas · Matplotlib · Confluence</p><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Tracked milestones and stakeholder communication across four sprint cycles, closing the project with zero escalation incidents.</p></div>
        </div>
      </section>

      <section className="mt-16 grid gap-8 md:grid-cols-2">
        <div><p className="num text-xs uppercase tracking-[0.18em] text-accent">Certifications</p><ul className="mt-4 space-y-2 text-sm text-muted-foreground"><li>Google Project Management Certificate — Coursera / Google — Completed</li><li>Microsoft Power BI Data Analyst (PL-300) — Microsoft — Completed</li><li>Google Data Analytics Professional Certificate — Coursera / Google — Completed</li><li>Data Analytics Certification — ExcelR — Completed</li><li>PSM I – Professional Scrum Master — Scrum.org — In Progress</li></ul></div>
        <div><p className="num text-xs uppercase tracking-[0.18em] text-accent">Education</p><p className="mt-4 text-sm text-muted-foreground">B.Com (Finance) — University of Calicut, Kerala · 2023–2026</p></div>
      </section>
    </main>
    <CtaBand title="Need more control over delivery?" />
  </div>;
}
