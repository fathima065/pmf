import { Link } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';

export function CtaBand({title='Have a project that needs structure?',copy="Send a short brief — scope, timeline, and what's currently going wrong. You'll get an honest read on what it would take to bring it under control."}:{title?:string;copy?:string}){
  const ref=useRef<HTMLElement>(null);
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){setVisible(true);return;}
    const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setVisible(true);observer.disconnect();}},{threshold:.25});
    if(ref.current) observer.observe(ref.current);
    return()=>observer.disconnect();
  },[]);
  return <section ref={ref} className={`border-y border-border bg-surface cta-reveal ${visible?'is-visible':''}`}><div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-14 md:flex-row md:items-center md:justify-between"><div className="max-w-xl"><h2 className="text-2xl font-semibold md:text-3xl cta-item">{title}</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground cta-item">{copy}</p></div><Link to="/contact" className="bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground cta-item cta-button">Discuss a project</Link></div></section>
}
