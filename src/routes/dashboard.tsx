import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { projects, type Severity } from '../lib/dashboard-data';
import { downloadProjectReport } from '../lib/export-report';

export const Route = createFileRoute('/dashboard')({ component: Dashboard });
const rank: Record<Severity, number> = { high: 0, medium: 1, low: 2 };

function Dashboard() {
  const [id, setId] = useState(projects[0]!.id);
  const [highFirst, setHighFirst] = useState(true);
  const p = projects.find((x) => x.id === id) ?? projects[0]!;
  const risks = useMemo(() => [...p.risks].sort((a, b) => highFirst ? rank[a.severity] - rank[b.severity] : rank[b.severity] - rank[a.severity]), [p.risks, highFirst]);
  const max = Math.max(...p.spend.map((s) => Math.max(s.planned, s.actual)), 1);
  return <main className="dashboard-page mx-auto max-w-6xl px-5 py-10 md:py-16">
    <div className="flex flex-col gap-5 border-b border-border pb-7 md:flex-row md:items-end md:justify-between">
      <div><p className="num text-xs uppercase tracking-[0.2em] text-accent">04 — Project Controls</p><h1 className="mt-2 text-3xl font-semibold md:text-5xl">Project controls snapshot</h1><p className="mt-3 text-sm text-muted-foreground">A practical view of schedule, cost, risk, milestones and delivery performance.</p><p className="mt-2 num text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Illustrative project controls · sample data only</p></div>
      <div className="flex flex-col gap-2 sm:flex-row"><select aria-label="Select project" value={p.id} onChange={(e) => setId(e.target.value)} className="hairline min-h-11 bg-surface px-3 py-2 text-sm">{projects.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select><button onClick={() => downloadProjectReport(p, true)} className="hairline min-h-11 px-4 py-2 text-sm">Export CSV</button></div>
    </div>
    <div className="mt-6 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-5">
      {[["Schedule", p.kpi.scheduleHealth], ["Budget used", `${p.kpi.budgetUsed}%`], ["Open risks", p.kpi.openRisks], ["Milestones", `${p.kpi.milestonesDone}/${p.kpi.milestonesTotal}`], ["Overall progress", `${Math.round(p.workstreams.reduce((sum, w) => sum + w.progress, 0) / p.workstreams.length)}%`]].map(([k, v]) => <div key={k} className="bg-surface p-4"><div className="num text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{k}</div><div className="mt-2 text-xl font-semibold">{v}</div></div>)}
    </div>
    <section className="hairline mt-5 bg-surface p-5 md:p-6"><div className="flex items-end justify-between gap-4"><div><p className="num text-[10px] uppercase tracking-[0.16em] text-accent">Workstreams</p><h2 className="mt-1 text-lg font-semibold">Delivery progress</h2></div><span className="num text-xs text-muted-foreground">{p.range}</span></div>{p.workstreams.map((w) => <div key={w.name} className="mt-4 grid grid-cols-[minmax(110px,180px)_1fr_42px] items-center gap-3"><span className="text-xs">{w.name}</span><div className="h-2 bg-background"><div className="h-full bg-primary" style={{ width: `${w.progress}%` }} /></div><span className="num text-right text-xs">{w.progress}%</span></div>)}</section>
    <div className="mt-5 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
      <section className="hairline bg-surface"><header className="flex items-center justify-between border-b border-border p-5"><div><p className="num text-[10px] uppercase tracking-[0.16em] text-accent">Risk</p><h2 className="mt-1 text-lg font-semibold">Risks & issues</h2></div><button onClick={() => setHighFirst((v) => !v)} className="num text-[10px] uppercase text-accent">{highFirst ? 'High first' : 'Low first'}</button></header><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-xs"><thead><tr className="border-b border-border"><th className="p-3">ID</th><th className="p-3">Description</th><th className="p-3">Owner</th><th className="p-3">Severity</th><th className="p-3">Status</th><th className="p-3">Due</th></tr></thead><tbody>{risks.map((r) => <tr key={r.id} className="border-b border-border last:border-0"><td className="p-3 text-accent">{r.id}</td><td className="p-3">{r.description}</td><td className="p-3 text-muted-foreground">{r.owner}</td><td className="p-3 uppercase">{r.severity}</td><td className="p-3">{r.status}</td><td className="p-3 text-muted-foreground">{r.due}</td></tr>)}</tbody></table></div></section>
      <section className="hairline bg-surface"><header className="border-b border-border p-5"><p className="num text-[10px] uppercase tracking-[0.16em] text-accent">Activity</p><h2 className="mt-1 text-lg font-semibold">Recent activity</h2></header><ul className="p-5">{p.activity.map((a, i) => <li key={i} className="border-b border-border py-3 last:border-0"><div className="num text-[10px] uppercase text-muted-foreground">{a.time} · {a.actor}</div><p className="mt-1 text-xs leading-relaxed">{a.text}</p></li>)}</ul></section>
    </div>
    <section className="hairline mt-5 bg-surface p-5 md:p-6"><div className="flex items-end justify-between"><div><p className="num text-[10px] uppercase tracking-[0.16em] text-accent">Cost</p><h2 className="mt-1 text-lg font-semibold">Spend — planned vs actual (£k)</h2></div><div className="num text-[10px] text-muted-foreground">PLANNED / ACTUAL</div></div><div className="mt-6 flex items-end gap-4 overflow-x-auto">{p.spend.map((s) => <div key={s.month} className="min-w-[55px] flex-1"><div className="flex h-36 items-end justify-center gap-1"><div className="w-1/3 bg-accent" style={{ height: `${s.planned / max * 100}%` }} /><div className="w-1/3 bg-primary" style={{ height: `${s.actual / max * 100}%` }} /></div><div className="num mt-2 text-center text-[10px] text-muted-foreground">{s.month}</div></div>)}</div></section>
  </main>;
}
