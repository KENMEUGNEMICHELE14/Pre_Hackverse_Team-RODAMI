"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Timer, CheckSquare, BarChart3, Rocket } from "lucide-react";

export const DashboardPreview = () => {
  return (
    <section className="py-40 bg-bg-main relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 glass border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-6">
            Espace Ingénieur
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-text-main uppercase tracking-tighter italic">
            Focus <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '1px var(--color-text-main)' }}>Chirurgical</span>
          </h2>
        </div>

        <div className="relative group">
          <div className="absolute -inset-10 bg-primary/10 blur-[120px] rounded-full opacity-30" />
          
          <Card className="relative overflow-hidden glass glow-border p-0 shadow-2xl">
            <div className="flex h-[600px]">
              {/* Sidebar Mock */}
              <div className="w-20 border-r border-white/5 bg-white/5 hidden md:flex flex-col items-center py-10 gap-12">
                <div className="bg-primary p-2 rounded-lg">
                  <Rocket className="text-white w-5 h-5 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                </div>
                <Timer className="text-primary w-6 h-6" />
                <CheckSquare className="text-text-secondary/50 w-6 h-6" />
                <BarChart3 className="text-text-secondary/50 w-6 h-6" />
              </div>

              {/* Content Mock */}
              <div className="flex-1 p-12 relative overflow-hidden bg-slate-950/20">
                <div className="flex justify-between items-center mb-16">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tighter border-l-4 border-primary pl-6">Centre de Focus</h3>
                    <p className="text-text-secondary font-bold text-[10px] uppercase tracking-widest mt-2 ml-6 opacity-50">SÉQUENCE : POMODORO #1</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-primary drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">25:00</div>
                    <Badge variant="emerald" className="mt-2 bg-secondary/20 text-secondary border-none">XP : +50</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary/50 mb-6 font-mono">Tâches Critiques</div>
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-6 p-5 border border-white/5 bg-white/5 relative overflow-hidden group/item hover:bg-white/10 transition-colors rounded-xl">
                        <div className={`w-1 h-full absolute left-0 top-0 ${i === 1 ? 'bg-primary' : 'bg-white/10'}`} />
                        <div className="w-5 h-5 border border-white/20 rounded-md" />
                        <div>
                          <p className="font-bold uppercase tracking-tight text-xs">Analyse Structurelle S2</p>
                          <p className="text-[9px] font-bold text-text-secondary/60">SCORE : {20 - i * 3}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="glass glow-border p-10 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 opacity-20" />
                    <div className="w-32 h-32 rounded-full border-4 border-white/5 flex items-center justify-center mb-10 relative">
                       <div className="text-2xl font-black text-white/90">25:00</div>
                       <div className="absolute inset-0 border-4 border-primary border-r-transparent border-t-transparent animate-[spin_4s_linear_infinite]" />
                    </div>
                    <button className="bg-primary text-white font-black text-xs uppercase tracking-widest px-8 py-4 shadow-xl hover:scale-105 transition-transform rounded-xl">Démarrer</button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="absolute -top-6 -right-6 bg-secondary text-white px-6 py-2 font-black text-sm rotate-6 shadow-2xl z-20 rounded-md">
            OPTIMISÉ ENSPY
          </div>
        </div>
      </div>
    </section>
  );
};
