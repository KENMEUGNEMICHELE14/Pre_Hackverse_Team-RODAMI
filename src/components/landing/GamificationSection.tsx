"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Flame, Star, Trophy, Users } from "lucide-react";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";

export const GamificationSection = () => {
  const { ref, controls } = useScrollReveal();

  return (
    <section className="py-20 bg-bg-main overflow-hidden relative border-t border-white/5">
      <div className="absolute top-0 right-0 w-1/4 h-full bg-primary/5 -skew-x-12 translate-x-1/2 opacity-20 blur-3xl rounded-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 glass border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            Elite Academy
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-8 uppercase tracking-tighter italic">
            Zéro <span className="text-primary not-italic">Compromis</span>
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed max-w-lg font-medium opacity-70">
            Transformez chaque heure de code en prestige. Dominez le classement de l'ENSPY par votre rigueur.
          </p>
        </div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="relative max-w-2xl mx-auto"
        >
          <div className="glass p-6 md:p-10 relative z-10 glow-border shadow-2xl border-t-4 border-primary">
            <div className="flex flex-col sm:flex-row items-center gap-8 mb-10">
              <div className="relative shrink-0">
                <div className="w-20 h-20 bg-white flex items-center justify-center font-black text-3xl italic text-primary shadow-xl rounded-2xl">
                  JD
                </div>
                <div className="absolute -bottom-2 -right-2 bg-primary text-white text-[9px] font-black px-2 py-1 rounded-md">LVL 12</div>
              </div>
              
              <div className="text-center sm:text-left flex-1">
                <h3 className="font-black text-2xl uppercase tracking-tighter italic text-white mb-1">
                  Jean <span className="text-primary">Dupont</span>
                </h3>
                <div className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mb-4">GÉNIE INFORMATIQUE IV</div>
                
                <div className="flex justify-center sm:justify-start gap-6 border-t border-white/5 pt-4">
                  <div className="text-center sm:text-left">
                     <span className="block text-[8px] font-black text-white/40 uppercase">Série</span>
                     <span className="text-lg font-black italic text-white">12j</span>
                  </div>
                  <div className="text-center sm:text-left">
                     <span className="block text-[8px] font-black text-white/40 uppercase">Focus</span>
                     <span className="text-lg font-black italic text-white">142h</span>
                  </div>
                  <div className="text-center sm:text-left">
                     <span className="block text-[8px] font-black text-white/40 uppercase">XP</span>
                     <span className="text-lg font-black italic text-white text-primary">12k</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-[9px] mb-2 font-black uppercase tracking-[0.1em] text-text-secondary opacity-60">
                  <span>Progression de Carrière</span>
                  <span className="text-primary">62%</span>
                </div>
                <div className="w-full bg-white/5 h-2 overflow-hidden relative border border-white/5 rounded-full">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "62.5%" }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="bg-primary h-full relative"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/10 blur-[80px] rounded-full -z-10" />
        </motion.div>
      </div>
    </section>
  );
};
