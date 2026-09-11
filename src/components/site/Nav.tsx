import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/contact', label: 'Contact' },
] as const;

export function Logo() {
  return <span className="font-display inline-flex items-center gap-2 text-lg font-bold"><span className="h-2 w-2 bg-primary" />Fathima Np</span>;
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <header className={`site-nav sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur ${scrolled ? 'site-nav-scrolled' : ''}`}>
    <div className="site-nav-inner mx-auto flex max-w-6xl items-center justify-between px-5">
      <Link to="/" onClick={() => setOpen(false)} aria-label="Fathima Np home"><Logo /></Link>
      <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
        {links.map((l) => <Link key={l.to} to={l.to} activeOptions={{ exact: l.to === '/' }} className="font-display text-sm text-muted-foreground transition-colors hover:text-foreground">{l.label}</Link>)}
        <Link to="/contact" className="bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]">Discuss a Project</Link>
      </nav>
      <button
        type="button"
        className="hairline flex h-9 w-9 items-center justify-center text-sm md:hidden"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? '×' : '☰'}
      </button>
    </div>
    <nav id="mobile-navigation" className={`mobile-nav border-t border-border bg-surface px-5 md:hidden ${open ? 'is-open' : ''}`} aria-label="Mobile navigation">
      {links.map((l) => <Link key={l.to} to={l.to} onClick={() => setOpen(false)} activeOptions={{ exact: l.to === '/' }} className="block border-b border-border py-3 text-sm">{l.label}</Link>)}
      <Link to="/contact" onClick={() => setOpen(false)} className="mt-3 block bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground">Discuss a Project</Link>
    </nav>
  </header>;
}
