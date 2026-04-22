"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FocusTimer } from "@/components/dashboard/FocusTimer";
import { useApp } from "@/context/AppContext";
import { Timer, History } from "lucide-react";

export default function FocusPage() {
  const { sessions } = useApp();

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <FocusTimer />
        </div>

        <div className="lg:col-span-1">
          <div className="bg-bg-alt/40 border border-white/5 backdrop-blur-md">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-widest text-text-main flex items-center gap-2">
                <History size={16} />
                Historique
              </h3>
              <span className="text-[10px] font-bold text-text-secondary">{sessions.length} sessions</span>
            </div>
            
            <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
              {sessions.length === 0 ? (
                <div className="text-center py-10 bg-white/5 border border-dashed border-white/10">
                  <p className="text-xs text-text-secondary italic">Aucune session pour le moment</p>
                </div>
              ) : (
                sessions.map((session) => (
                  <div key={session.id} className="border-l-2 border-primary pl-4 py-1">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-bold text-text-main">{session.type}</span>
                      <span className="text-[10px] font-medium text-text-secondary">
                        {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-text-secondary">{session.duration} minutes</span>
                      <span className="text-primary font-black">+{session.xpEarned} XP</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
