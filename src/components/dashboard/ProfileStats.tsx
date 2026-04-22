"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { Card } from "@/components/ui/Card";
import { Badge as BadgeUI } from "@/components/ui/Badge";
import { Trophy, Star, Target, Zap, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const ALL_BADGES = [
  { id: "1", name: "En Feu", description: "3 sessions en une journée", icon: Zap, color: "text-orange-500", bg: "bg-orange-500/10", unlocked: true },
  { id: "2", name: "Chasseur", description: "10 tâches terminées", icon: Target, color: "text-primary", bg: "bg-primary/10", unlocked: true },
  { id: "3", name: "Légende", description: "Top 10 du classement", icon: Trophy, color: "text-tertiary", bg: "bg-tertiary/10", unlocked: false },
  { id: "4", name: "Focus Maître", description: "50 heures de focus total", icon: Award, color: "text-secondary", bg: "bg-secondary/10", unlocked: false },
];

export const ProfileStats = () => {
  const { stats } = useApp();

  return (
    <div className="space-y-12">
      {/* Header Profile */}
      <section className="flex flex-col md:flex-row items-center gap-10">
        <div className="w-40 h-40 bg-primary text-white flex items-center justify-center text-6xl font-black rounded-none border-8 border-bg-main shadow-2xl relative shadow-primary/20">
          JD
          <div className="absolute -bottom-4 -right-4 bg-tertiary text-white w-12 h-12 flex items-center justify-center text-xl font-black border-4 border-bg-main">
            {stats.level}
          </div>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-text-main mb-2">Jean Dupont</h2>
          <p className="text-text-secondary uppercase text-[10px] font-black tracking-[0.3em] mb-6 inline-block border-b-2 border-primary pb-1">
            Génie Informatique — 4ème année
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="px-6 py-3 bg-bg-alt/40 border border-white/10 backdrop-blur-sm">
              <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1">Influence</div>
              <div className="text-xl font-bold text-text-main">Légendaire</div>
            </div>
            <div className="px-6 py-3 bg-bg-alt/40 border border-white/10 backdrop-blur-sm">
              <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1">Ratio Focus</div>
              <div className="text-xl font-bold text-text-main">92%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Temps Total", value: `${stats.totalFocusTime}m`, icon: Zap },
          { label: "XP Cumulé", value: stats.xp, icon: Star },
          { label: "Tâches Finies", value: stats.tasksCompleted, icon: Target },
          { label: "Série Record", value: "15j", icon: Trophy },
        ].map((stat, idx) => (
          <Card key={idx} className="p-6 text-center border-white/5 bg-bg-alt/20">
            <div className="flex justify-center mb-4">
              <stat.icon className="text-primary" size={20} />
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1">{stat.label}</div>
            <div className="text-2xl font-black text-text-main">{stat.value}</div>
          </Card>
        ))}
      </div>

      {/* Badge Collection */}
      <div className="space-y-6">
        <h3 className="text-sm font-black uppercase tracking-widest text-text-main">Collection de Badges</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {ALL_BADGES.map((badge) => (
            <Card key={badge.id} className={cn(
              "p-8 text-center transition-all border-2 backdrop-blur-md",
              badge.unlocked ? "border-primary/20 bg-bg-alt/40" : "border-white/5 bg-white/5 opacity-30 grayscale"
            )}>
              <div className={cn("inline-flex p-4 rounded-none mb-4", badge.unlocked ? badge.bg : "bg-white/5")}>
                <badge.icon size={32} className={badge.unlocked ? badge.color : "text-text-secondary"} />
              </div>
              <div className="text-sm font-black uppercase tracking-tighter text-text-main mb-1">{badge.name}</div>
              <p className="text-[10px] text-text-secondary leading-tight">{badge.description}</p>
              {!badge.unlocked && <div className="mt-4 text-[9px] font-bold text-text-secondary uppercase tracking-widest">[Verrouillé]</div>}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
