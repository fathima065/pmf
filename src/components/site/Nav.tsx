import { Link } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/contact', label: 'Contact' },
] as const;

export function Logo() {
  return <span className="font-display inline-flex items-center gap-2 text-lg font-bold"><span className="h-2 w-2 bg-primary" aria-hidden="true" />Fathima Np</span>;
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    menuButtonRef.current?.focus();
  }, [open]);

  const closeMenu = () => setOpen(false);

  return <header className={`site-nav sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur ${scrolled ? 'site-nav-scrolled' : ''}`}>
    <div className="site-nav-inner mx-auto flex max-w-6xl items-center justify-between px-5">
      <Link to="/" onClick={closeMenu} aria-label="Fathima Np home"><Logo /></Link>
      <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
        {links.map((l) => <Link key={l.to} to={l.to} activeOptions={{ exact: l.to === '/' }} className="font-display text-sm text-muted-foreground transition-colors hover:text-foreground">{l.label}</Link>)}
        <ThemeToggle />
        <Link to="/contact" className="bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]">Discuss a Project</Link>
      </nav>
      <div className="flex items-center gap-2 md:hidden">
        <ThemeToggle />
        <button
          ref={menuButtonRef}
          type="button"
          className="hairline flex h-10 w-10 items-center justify-center text-sm"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} strokeWidth={1.8} /> : <Menu size={18} strokeWidth={1.8} />}
        </button>
      </div>
    </div>
    <div className={`mobile-nav-overlay md:hidden ${open ? 'is-open' : ''}`} aria-hidden="true" onClick={closeMenu} />
    <nav id="mobile-navigation" className={`mobile-nav border-t border-border bg-surface px-5 md:hidden ${open ? 'is-open' : ''}`} aria-label="Mobile navigation" aria-hidden={!open}>
      {links.map((l) => <Link key={l.to} to={l.to} onClick={closeMenu} activeOptions={{ exact: l.to === '/' }} className="block border-b border-border py-4 text-sm">{l.label}</Link>)}
      <Link to="/contact" onClick={closeMenu} className="mt-4 block bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground">Discuss a Project</Link>
    </nav>
  </header>;
}
