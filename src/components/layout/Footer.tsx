import React from "react";
import Link from "next/link";
import { Rocket } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-24 pb-12 relative overflow-hidden">
      {/* Decorative inner glow */}
      <div className="absolute top-0 left-0 w-full h-px bg-white/20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-display">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16 px-4">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="bg-white p-2 transition-transform group-hover:scale-110 shadow-xl">
                <Rocket className="text-primary w-5 h-5" />
              </div>
              <span className="font-black text-2xl tracking-tighter text-white uppercase italic">
                Focus<span className="text-white/80 italic">Polytech</span>
              </span>
            </Link>
            <p className="text-white/80 max-w-sm mb-8 text-base font-bold leading-relaxed">
              L'écosystème de productivité ultime pour les futurs ingénieurs de l'ENSPY. <br /> Rigueur scientifique & Excellence.
            </p>
          </div>
          
          <div>
            <h4 className="font-black text-white mb-8 uppercase text-xs tracking-[0.2em] italic border-b border-white/20 pb-2">Ingénierie</h4>
            <ul className="space-y-4">
              <li><Link href="/dashboard/tasks" className="text-sm font-black text-white/70 hover:text-white transition-colors uppercase tracking-widest">Score Algorithm</Link></li>
              <li><Link href="/dashboard/focus" className="text-sm font-black text-white/70 hover:text-white transition-colors uppercase tracking-widest">Focus Timer</Link></li>
              <li><Link href="/dashboard/stats" className="text-sm font-black text-white/70 hover:text-white transition-colors uppercase tracking-widest">XP Metric</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white mb-8 uppercase text-xs tracking-[0.2em] italic border-b border-white/20 pb-2">Réseau</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm font-black text-white/70 hover:text-white transition-colors uppercase tracking-widest">Discord ENSPY</Link></li>
              <li><Link href="#" className="text-sm font-black text-white/70 hover:text-white transition-colors uppercase tracking-widest">Documentation</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[11px] text-white/60 font-black uppercase tracking-[0.3em] italic">
            © {new Date().getFullYear()} FocusPolytech — ÉDITION INGÉNIEUR
          </p>
          <div className="flex gap-10">
            <Link href="#" className="text-[10px] font-black text-white/60 hover:text-white transition-colors uppercase tracking-widest italic">Legal</Link>
            <Link href="#" className="text-[10px] font-black text-white/60 hover:text-white transition-colors uppercase tracking-widest italic">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
