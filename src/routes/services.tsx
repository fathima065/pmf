import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { CtaBand } from '../components/site/CtaBand';

export const Route = createFileRoute('/services')({ component: Services });

const services = [
  ['Project Management', 'Delivery leadership, planning, coordination, governance and decision support.'],
  ['PMO Setup & Improvement', 'Practical PMO structures, standards, reporting packs, cadence and governance.'],
  ['Project Controls', 'Schedule, cost, change, risk and performance controls designed around the project.'],
  ['Reporting & Dashboards', 'Concise management information that turns project data into actions and decisions.'],
];

function Services() {
  const introRef = useRef<HTMLDivElement>(null);
  const serviceRefs = useRef<(HTMLElement | null)[]>([]);
  const [introVisible, setIntroVisible] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setIntroVisible(true);
      setActive(services.length - 1);
      return;
    }

    const introObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntroVisible(true);
        introObserver.disconnect();
      }
    }, { threshold: 0.2 });

    if (introRef.current) introObserver.observe(introRef.current);

    const serviceObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number((entry.target as HTMLElement).dataset.index ?? 0);
          setActive((current) => Math.max(current, index));
        }
      });
    }, { threshold: 0.35, rootMargin: '-8% 0px -35% 0px' });

    serviceRefs.current.forEach((node) => node && serviceObserver.observe(node));
    return () => {
      introObserver.disconnect();
      serviceObserver.disconnect();
    };
  }, []);

  return <div>
    <main className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <div ref={introRef} className={introVisible ? 'services-intro is-visible' : 'services-intro'}>
        <p className="num text-xs uppercase tracking-[0.22em] text-accent services-fade">Services</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold md:text-6xl services-fade">Practical controls for complex delivery.</h1>
      </div>

      <div className="services-journey mt-12">
        <div className="services-progress" aria-hidden="true">
          <div className="services-progress-track" />
          <div className="services-progress-active" style={{ height: `${((active + 1) / services.length) * 100}%` }} />
          {services.map((_, i) => <span key={i} className={i <= active ? 'services-progress-dot is-active' : 'services-progress-dot'} style={{ top: `${(i / (services.length - 1)) * 100}%` }} />)}
        </div>
        <div className="grid gap-px bg-border md:grid-cols-2">
          {services.map(([title, copy], i) => <article
            key={title}
            ref={(node) => { serviceRefs.current[i] = node; }}
            data-index={i}
            className={`service-item service-reveal service-delay-${i} bg-background p-7 ${i <= active ? 'is-active' : ''}`}
          >
            <div className="num text-xs text-muted-foreground service-number">0{i + 1}</div>
            <h2 className="mt-5 text-xl font-semibold service-title">{title}</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground service-copy">{copy}</p>
          </article>)}
        </div>
      </div>
    </main>
    <CtaBand />
  </div>;
}
