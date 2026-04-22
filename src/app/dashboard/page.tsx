"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/context/AppContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Timer, CheckCircle, TrendingUp, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const { stats, getSortedTasks } = useApp();
  const sortedTasks = getSortedTasks();
  const topTask = sortedTasks.find(t => t.status !== 'DONE');

  const summaryCards = [
    { label: "Temps de Focus", value: `${stats.totalFocusTime}m`, icon: Timer, color: "text-primary", bg: "bg-primary/10" },
    { label: "Tâches Complétées", value: stats.tasksCompleted, icon: CheckCircle, color: "text-secondary", bg: "bg-secondary/10" },
    { label: "Série Actuelle", value: `${stats.streak} j`, icon: TrendingUp, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Niveau Actuel", value: stats.level, icon: Trophy, color: "text-tertiary", bg: "bg-tertiary/10" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-light text-text-main leading-tight mb-2">
              Bonjour, <span className="font-black uppercase tracking-tighter italic">Jean</span>
            </h1>
            <p className="text-text-secondary border-l-4 border-primary pl-4 uppercase text-[10px] font-black tracking-[0.2em]">
              Prêt pour une session de focus intense ?
            </p>
          </div>
          <Link href="/dashboard/focus">
            <Button size="lg" className="h-16 px-10 flex items-center gap-3 group">
              Démarrer un Focus
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </section>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Card key={idx} className="p-6 border-b-4 border-b-transparent hover:border-b-primary transition-all bg-bg-alt/20">
                <div className="flex items-center gap-4">
                  <div className={cn("p-3 rounded-none", card.bg, card.color)}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1">{card.label}</div>
                    <div className="text-2xl font-black text-text-main">{card.value}</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top Priority Task */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-widest text-text-main">
                Priorité absolue
              </h3>
              <Link href="/dashboard/tasks" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">
                Voir toutes les tâches
              </Link>
            </div>

            {topTask ? (
              <Card className="p-10 border-2 border-primary/20 bg-bg-alt/40 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4">
                  <Badge variant="blue" className="animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.3)]">À faire maintenant</Badge>
                </div>
                <div className="max-w-xl">
                  <h4 className="text-3xl font-black text-text-main mb-4 leading-tight uppercase tracking-tighter">
                    {topTask.title}
                  </h4>
                  <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-text-secondary mb-8">
                    <span className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-red-500" />
                      Priorité {topTask.priority}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-primary" />
                      Deadline: {new Date(topTask.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  <Link href="/dashboard/tasks">
                    <Button variant="secondary" className="px-8 border-primary text-primary hover:bg-primary/10">
                      Gérer la tâche
                    </Button>
                  </Link>
                </div>
              </Card>
            ) : (
              <Card className="p-20 text-center border-dashed border-white/10 bg-bg-alt/20">
                <p className="text-text-secondary italic">Aucune tâche en attente. Profitez-en ou créez-en une !</p>
              </Card>
            )}
          </div>

          {/* Quick News / Gamification */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-text-main">
              Évolution
            </h3>
            <Card className="p-8 bg-bg-alt/40 border-white/5">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-primary text-white flex items-center justify-center text-4xl font-black mb-4 rounded-none shadow-xl border-4 border-bg-main shadow-primary/20">
                  {stats.level}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1">Niveau Actuel</div>
                <div className="text-sm font-bold text-text-main mb-6 uppercase tracking-tighter">Master Focus</div>
                
                <div className="w-full bg-white/5 h-2 rounded-none mb-2 overflow-hidden border border-white/10">
                  <div 
                    className="h-full bg-primary transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                    style={{ width: `${(stats.xp / (stats.level * 1000)) * 100}%` }}
                  />
                </div>
                <div className="text-[9px] font-bold text-text-secondary uppercase">
                  {stats.xp} / {stats.level * 1000} XP pour le niveau {stats.level + 1}
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-secondary/10 border-secondary/20">
              <div className="flex items-center gap-4">
                <div className="bg-secondary text-white p-2 shadow-lg shadow-secondary/20">
                  <Trophy size={20} />
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-secondary">
                  Dernier badge obtenu : <br />
                  <span className="text-text-main text-xs normal-case font-bold tracking-normal">Chasseur de tâches</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
