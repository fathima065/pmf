import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, Link, createRootRouteWithContext, HeadContent, Scripts } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import appCss from '../styles/styles.css?url';
import themeCss from '../styles/theme.css?url';
import editorialNumbersCss from '../styles/editorial-numbers.css?url';
import pageLayoutCss from '../styles/page-layout.css?url';
import finalPolishCss from '../styles/final-polish.css?url';
import lightModeFixCss from '../styles/light-mode-fix.css?url';
import qaFixesCss from '../styles/qa-fixes.css?url';
import { Nav } from '../components/site/Nav';
import { Footer } from '../components/site/Footer';
import { MotionSystem } from '../components/site/MotionSystem';

const themeBootScript = `(() => { try { const saved = localStorage.getItem('fathima-theme'); const theme = saved === 'light' || saved === 'dark' ? saved : (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'); document.documentElement.dataset.theme = theme; document.documentElement.style.colorScheme = theme; } catch {} })()`;

function NotFound() { return <div className="flex min-h-screen items-center justify-center px-5"><div className="text-center"><h1 className="text-7xl font-bold">404</h1><p className="mt-3 text-muted-foreground">Page not found.</p><Link to="/" className="mt-5 inline-block bg-primary px-4 py-2 text-sm text-primary-foreground">Go home</Link></div></div>; }
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) { console.error(error); return <div className="flex min-h-screen items-center justify-center px-5"><div className="text-center"><h1 className="text-xl font-semibold">This page didn't load</h1><button onClick={reset} className="mt-5 bg-primary px-4 py-2 text-sm text-primary-foreground">Try again</button></div></div>; }

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { title: 'Fathima Np — Project Management · PMO · Project Controls' },
      { name: 'description', content: 'Fathima Np — Project Management, PMO, project controls and reporting.' },
      { name: 'theme-color', content: '#0d0f13' },
      { property: 'og:title', content: 'Fathima Np — Project Management · PMO · Project Controls' },
      { property: 'og:description', content: 'Structured delivery. Clear controls. Better outcomes.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://fathimanp.vercel.app/' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'stylesheet', href: themeCss },
      { rel: 'stylesheet', href: editorialNumbersCss },
      { rel: 'stylesheet', href: pageLayoutCss },
      { rel: 'stylesheet', href: finalPolishCss },
      { rel: 'stylesheet', href: lightModeFixCss },
      { rel: 'stylesheet', href: qaFixesCss },
      { rel: 'canonical', href: 'https://fathimanp.vercel.app/' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap' },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) { return <html lang="en"><head><HeadContent /><script dangerouslySetInnerHTML={{ __html: themeBootScript }} /></head><body>{children}<Scripts /></body></html>; }
function RootComponent() { const { queryClient } = Route.useRouteContext(); return <QueryClientProvider client={queryClient}><MotionSystem><div className="flex min-h-screen flex-col"><Nav /><div className="flex-1"><Outlet /></div><Footer /></div></MotionSystem></QueryClientProvider>; }
