import { useEffect, type ReactNode } from 'react';

const REVEAL_SELECTOR = [
  'main section:not([class*="reveal"]):not([data-motion-ignore])',
  'main article:not([class*="reveal"]):not([data-motion-ignore])',
  'main form:not([data-motion-ignore])',
].join(',');

function prepare(root: ParentNode) {
  root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((element, index) => {
    element.classList.add('motion-reveal');
    element.style.setProperty('--motion-delay', `${Math.min(index * 70, 280)}ms`);
  });

  root.querySelectorAll<HTMLElement>('[style*="width:"]').forEach((element) => {
    if (element.dataset.motionProgress || element.closest('[data-motion-ignore]')) return;
    const width = element.style.width;
    if (!/^\d+(\.\d+)?%$/.test(width)) return;
    element.dataset.motionProgress = 'true';
    element.style.setProperty('--motion-progress', width);
    element.classList.add('motion-progress');
  });
}

export function MotionSystem({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const main = document.querySelector('main');
    if (!main || reduced) return;

    document.documentElement.classList.add('motion-ready');
    prepare(main);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );

    main.querySelectorAll<HTMLElement>('.motion-reveal, .motion-progress').forEach((element) => observer.observe(element));

    const mutationObserver = new MutationObserver(() => {
      prepare(main);
      main.querySelectorAll<HTMLElement>('.motion-reveal, .motion-progress').forEach((element) => {
        if (!element.classList.contains('is-visible')) observer.observe(element);
      });
    });
    mutationObserver.observe(main, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
      document.documentElement.classList.remove('motion-ready');
    };
  }, []);

  return children;
}
