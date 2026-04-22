"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/context/AppContext";
import { Card } from "@/components/ui/Card";
import { BarChart3, Clock, Zap, Calendar, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StatsPage() {
  const { stats, sessions } = useApp();

  // Mock data for a simple chart
  const weekData = [
    { day: "Lun", value: 65 },
    { day: "Mar", value: 45 },
    { day: "Mer", value: 80 },
    { day: "Jeu", value: 30 },
    { day: "Ven", value: 95 },
    { day: "Sam", value: 20 },
    { day: "Dim", value: 10 },
  ];

  const maxVal = Math.max(...weekData.map(d => d.value));

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <h2 className="text-2xl font-black uppercase tracking-tighter text-text-main flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-primary" />
          Analyse de Performance
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Card */}
          <Card className="lg:col-span-2 p-8 border-none shadow-none bg-white">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-text-main">Temps de Focus Hebdomadaire</h3>
                <p className="text-[10px] text-text-secondary uppercase font-bold tracking-widest mt-1">Derniers 7 jours (minutes)</p>
              </div>
              <div className="flex items-center gap-2 text-secondary font-bold text-sm">
                <ArrowUpRight size={16} />
                +12% vs semaine dernière
              </div>
            </div>

            <div className="h-64 flex items-end justify-between gap-4">
              {weekData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                  <div 
                    className="w-full bg-primary/10 group-hover:bg-primary transition-all rounded-none relative"
                    style={{ height: `${(d.value / maxVal) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-black bg-text-main text-white px-2 py-1 rounded-none">
                      {d.value}m
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase text-text-secondary">{d.day}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Metrics */}
          <div className="space-y-6">
            <Card className="p-6 bg-primary text-white border-none">
              <div className="flex flex-col gap-4">
                <Zap size={32} className="opacity-50" />
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">Efficacité Moyenne</div>
                  <div className="text-3xl font-black">94%</div>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-white border-gray-200">
              <div className="flex flex-col gap-4">
                <Clock size={32} className="text-secondary" />
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1">Durée Moyenne Session</div>
                  <div className="text-3xl font-black text-text-main">28.5m</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-text-main">Sessions Récentes</h3>
          <Card className="overflow-hidden border-none shadow-none bg-white">
            <table className="w-full text-left">
              <thead className="bg-bg-alt border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-secondary">Date</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-secondary">Type</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-secondary">Durée</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-secondary">Récompense</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-sm">
                {sessions.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-text-secondary italic">Aucune donnée historique disponible.</td>
                  </tr>
                ) : (
                  sessions.map((s) => (
                    <tr key={s.id} className="hover:bg-bg-main transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Calendar size={14} className="text-text-secondary" />
                          {new Date(s.startTime).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2 py-1 text-[9px] font-black uppercase border",
                          s.type === 'POMODORO' ? "border-primary text-primary" : "border-secondary text-secondary"
                        )}>
                          {s.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono">{s.duration}m</td>
                      <td className="px-6 py-4 font-black text-primary">+{s.xpEarned} XP</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
