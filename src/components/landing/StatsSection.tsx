"use client";

import React from "react";
import { StatCounter } from "@/components/landing/StatCounter";

export const StatsSection = () => {
  return (
    <section className="py-20 bg-bg-main relative overflow-hidden border-y border-white/5">
      {/* Decorative Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.01] select-none pointer-events-none z-0 uppercase tracking-tighter">
        Data Performance
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 italic tracking-tighter uppercase">
            L'Impact en <span className="text-primary-hover">Chiffres</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-24">
          <div className="text-center group border-l-2 border-white/5 hover:border-primary/50 transition-all pl-10 h-32 flex flex-col justify-center">
            <StatCounter value={1250} label="Ingénieurs Actifs" suffix="+" />
          </div>
          <div className="text-center group border-l-2 border-white/5 hover:border-primary/50 transition-all pl-10 h-32 flex flex-col justify-center">
            <StatCounter value={45} label="Kiloheures Focus" suffix="k+" />
          </div>
          <div className="text-center group border-l-2 border-white/5 hover:border-primary/50 transition-all pl-10 h-32 flex flex-col justify-center">
            <StatCounter value={8500} label="Badges Décernés" />
          </div>
          <div className="text-center group border-l-2 border-white/5 hover:border-primary/50 transition-all pl-10 h-32 flex flex-col justify-center">
            <StatCounter value={98} label="Taux de Réussite" suffix="%" />
          </div>
        </div>
      </div>
    </section>
  );
};
