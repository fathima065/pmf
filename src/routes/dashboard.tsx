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
  const risks = useMemo(
    () => [...p.risks].sort((a, b) => (highFirst ? rank[a.severity] - rank[b.severity] : rank[b.severity] - rank[a.severity])),
    [p.risks, highFirst],
  );
  const max = Math.max(...p.spend.map((s) => Math.max(s.planned, s.actual)), 1);

  return (
    <main className="dashboard-page mx-auto max-w-6xl px-5 py-10 md:py-16">
      <div className="dashboard-header flex flex-col gap-5 border-b border-border pb-7 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <p className="num text-xs uppercase tracking-[0.2em] text-accent">Illustrative Dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold md:text-5xl">Project controls snapshot</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">Sample interface — data shown for demonstration purposes only.</p>
        </div>
        <div className="dashboard-actions flex flex-col gap-2 sm:flex-row">
          <select aria-label="Select illustrative dashboard" value={p.id} onChange={(e) => setId(e.target.value)} className="dashboard-control hairline bg-surface px-3 py-2 text-sm">
            {projects.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
          </select>
          <button onClick={() => downloadProjectReport(p, true)} className="dashboard-control hairline px-3 py-2 text-sm">Export CSV</button>
        </div>
      </div>

      <div className="mt-7 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        {[['Schedule', p.kpi.scheduleHealth], ['Budget used', `${p.kpi.budgetUsed}%`], ['Open risks', p.kpi.openRisks], ['Milestones', `${p.kpi.milestonesDone}/${p.kpi.milestonesTotal}`]].map(([k, v]) => (
          <div key={k} className="dashboard-kpi bg-surface p-4 sm:p-5">
            <div className="num text-[11px] uppercase text-muted-foreground">{k}</div>
            <div className="mt-2 text-xl font-semibold">{v}</div>
          </div>
        ))}
      </div>

      <section className="dashboard-panel hairline mt-5 bg-surface p-4 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-sm font-semibold">Workstreams</h2>
          <span className="num text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Illustrative</span>
        </div>
        <div className="mt-4 space-y-4">
          {p.workstreams.map((w) => (
            <div key={w.name} className="dashboard-workstream grid grid-cols-[92px_1fr_42px] items-center gap-3 sm:grid-cols-[150px_1fr_48px]">
              <span className="truncate text-xs">{w.name}</span>
              <div className="h-2 rounded-full bg-background/70"><div className="h-full rounded-full bg-primary" style={{ width: `${w.progress}%` }} /></div>
              <span className="num text-right text-xs">{w.progress}%</span>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <section className="dashboard-panel hairline bg-surface">
          <header className="flex items-center justify-between gap-4 border-b border-border p-4 sm:p-5">
            <div>
              <h2 className="font-display text-sm font-semibold">Risks & issues</h2>
              <p className="mt-1 text-xs text-muted-foreground">Illustrative control register</p>
            </div>
            <button onClick={() => setHighFirst((v) => !v)} className="num shrink-0 text-[11px] text-accent">{highFirst ? 'High first' : 'Low first'}</button>
          </header>

          <div className="dashboard-risk-table hidden md:block">
            <table className="w-full table-fixed text-left text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="w-[18%] p-3">ID</th><th className="w-[34%] p-3">Description</th><th className="w-[19%] p-3">Owner</th><th className="w-[14%] p-3">Severity</th><th className="w-[15%] p-3">Due</th>
                </tr>
              </thead>
              <tbody>
                {risks.map((r) => (
                  <tr key={r.id} className="border-b border-border last:border-0">
                    <td className="p-3 align-top text-accent">{r.id}</td><td className="p-3 align-top">{r.description}</td><td className="p-3 align-top text-muted-foreground">{r.owner}</td><td className="p-3 align-top uppercase">{r.severity}</td><td className="p-3 align-top text-muted-foreground">{r.due}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="dashboard-risk-cards divide-y divide-border md:hidden">
            {risks.map((r) => (
              <article key={r.id} className="p-4">
                <div className="flex items-start justify-between gap-3"><span className="num text-[10px] uppercase tracking-[0.14em] text-accent">{r.id}</span><span className="num text-[10px] uppercase text-muted-foreground">{r.severity}</span></div>
                <p className="mt-3 text-sm leading-relaxed">{r.description}</p>
                <div className="mt-3 grid grid-cols-2 gap-3 text-xs"><div><span className="num text-[9px] uppercase text-muted-foreground">Owner</span><p className="mt-1">{r.owner}</p></div><div><span className="num text-[9px] uppercase text-muted-foreground">Due</span><p className="mt-1">{r.due}</p></div></div>
              </article>
            ))}
          </div>
        </section>

        <section className="dashboard-panel hairline bg-surface">
          <h2 className="border-b border-border p-4 font-display text-sm font-semibold sm:p-5">Recent activity</h2>
          <ul className="p-4 sm:p-5">
            {p.activity.map((a, i) => <li key={i} className="border-b border-border py-3 last:border-0"><div className="num text-[10px] uppercase text-muted-foreground">{a.time} · {a.actor}</div><p className="mt-1 text-xs leading-relaxed">{a.text}</p></li>)}
          </ul>
        </section>
      </div>

      <section className="dashboard-panel hairline mt-5 bg-surface p-4 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><h2 className="font-display text-sm font-semibold">Spend — planned vs actual (£k)</h2><p className="mt-1 text-xs text-muted-foreground">Illustrative phase values</p></div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {p.spend.map((s) => (
            <div key={s.month} className="dashboard-spend-item">
              <div className="flex h-32 items-end justify-center gap-2 rounded-sm bg-background/50 p-2 sm:h-40">
                <div className="w-1/3 rounded-t bg-accent/80" style={{ height: `${s.planned / max * 100}%`, minHeight: s.planned ? '3px' : '0px' }} />
                <div className="w-1/3 rounded-t bg-primary" style={{ height: `${s.actual / max * 100}%`, minHeight: s.actual ? '3px' : '0px' }} />
              </div>
              <div className="num mt-2 text-center text-[10px] text-muted-foreground">{s.month}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
