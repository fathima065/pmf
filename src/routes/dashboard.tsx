import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { projects, type Severity } from '../lib/dashboard-data';

export const Route = createFileRoute('/dashboard')({ component: Dashboard });

const rank: Record<Severity, number> = { high: 0, medium: 1, low: 2 };

function Dashboard() {
  const [id, setId] = useState(projects[0]!.id);
  const [highFirst, setHighFirst] = useState(true);
  const p = projects.find((x) => x.id === id) ?? projects[0]!;
  const risks = useMemo(() => [...p.risks].sort((a, b) => (highFirst ? rank[a.severity] - rank[b.severity] : rank[b.severity] - rank[a.severity])), [p.risks, highFirst]);

  return <main className="page-shell dashboard-page">
    <header className="dashboard-header page-header">
      <div className="dashboard-header-copy">
        <p className="section-kicker">04 — PROJECT CONTROLS</p>
        <div className="dashboard-title-row">
          <div><h1>Project controls snapshot</h1><p>Sample interface — data shown for demonstration purposes only. No real client information is displayed.</p></div>
          <span className="illustrative-badge">ILLUSTRATIVE PROJECT CONTROLS</span>
        </div>
      </div>
      <div className="dashboard-actions">
        <label className="dashboard-select-wrap"><span className="sr-only">Select illustrative dashboard</span><select aria-label="Select illustrative dashboard" value={p.id} onChange={(e) => setId(e.target.value)} className="dashboard-control">{projects.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select></label>
      </div>
    </header>

    <section className="dashboard-kpi-grid" aria-label="Project health indicators">
      {[
        ['Project Health', `${p.kpi.projectHealth}%`],
        ['Schedule', `${p.kpi.schedulePercent}%`],
        ['Budget Used', `${p.kpi.budgetUsed}%`],
        ['Open Risks', String(p.kpi.openRisks).padStart(2, '0')],
        ['Milestones', `${String(p.kpi.milestonesDone).padStart(2, '0')} / ${String(p.kpi.milestonesTotal).padStart(2, '0')}`],
        ['Overall Progress', `${p.kpi.overallProgress}%`],
      ].map(([k, v]) => <article key={k} className="dashboard-kpi dashboard-panel"><span>{k}</span><strong>{v}</strong></article>)}
    </section>

    <section className="dashboard-panel dashboard-workstreams-panel">
      <header className="dashboard-panel-head"><div><span className="panel-index">01</span><div><h2>Workstreams</h2><p>Illustrative progress against planned delivery.</p></div></div><span className="panel-meta">{p.workstreams.length.toString().padStart(2, '0')} streams</span></header>
      <div className="workstream-list">{p.workstreams.map((w) => <div key={w.name} className="workstream-row"><div className="workstream-name"><span>{w.name}</span><small>Planned {w.planned}%</small></div><div className="workstream-track"><span style={{ width: `${w.progress}%` }} /></div><strong>{w.progress}%</strong></div>)}</div>
    </section>

    <div className="dashboard-two-column">
      <section className="dashboard-panel">
        <header className="dashboard-panel-head"><div><span className="panel-index">02</span><div><h2>Risks & issues</h2><p>Illustrative control register.</p></div></div><button type="button" className="panel-action" onClick={() => setHighFirst((v) => !v)}>{highFirst ? 'High first' : 'Low first'}</button></header>
        <div className="risk-list">{risks.map((r) => <article key={r.id} className="risk-item"><div className="risk-top"><span className="risk-id">{r.id}</span><span className={`risk-severity risk-${r.severity}`}>{r.severity}</span></div><h3>{r.description}</h3><div className="risk-meta"><span><small>Owner</small>{r.owner}</span><span><small>Status</small>{r.status}</span><span><small>Due</small>{r.due}</span></div></article>)}</div>
      </section>

      <section className="dashboard-panel">
        <header className="dashboard-panel-head"><div><span className="panel-index">03</span><div><h2>Recent activity</h2><p>Illustrative control events.</p></div></div></header>
        <ul className="activity-list">{p.activity.map((a, i) => <li key={`${a.text}-${i}`}><span>{a.time}</span><div><strong>{a.actor}</strong><p>{a.text}</p></div></li>)}</ul>
      </section>
    </div>

    <section className="dashboard-panel dashboard-visual-panel">
      <header className="dashboard-panel-head"><div><span className="panel-index">04</span><div><h2>Planned vs actual</h2><p>Illustrative phase-level control view.</p></div></div><span className="panel-meta">Phase view</span></header>
      <div className="control-visual-grid"><div className="phase-bars">{p.spend.map((s) => <div key={s.month} className="phase-bar"><div className="bar-area"><span className="bar-plan" style={{ height: `${Math.max(8, s.planned || 18)}%` }} /><span className="bar-actual" style={{ height: `${Math.max(14, s.actual || 28)}%` }} /></div><small>{s.month}</small></div>)}</div><div className="control-summary"><span className="panel-index">CONTROL VIEW</span><strong>Delivery visibility</strong><p>Schedule, risk, milestone and performance information presented as an illustrative project-controls interface.</p><div className="legend"><span><i className="legend-plan" /> Planned</span><span><i className="legend-actual" /> Actual</span></div></div></div>
    </section>
  </main>;
}
