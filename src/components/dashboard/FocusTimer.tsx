"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, Coffee, Brain } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

type TimerMode = 'POMODORO' | 'SHORT_BREAK' | 'LONG_BREAK';

const MODES: Record<TimerMode, { label: string; minutes: number; color: string }> = {
  POMODORO: { label: "Focus", minutes: 25, color: "text-primary" },
  SHORT_BREAK: { label: "Pause Courte", minutes: 5, color: "text-secondary" },
  LONG_BREAK: { label: "Pause Longue", minutes: 15, color: "text-secondary" },
};

export const FocusTimer = () => {
  const { completeSession } = useApp();
  const [mode, setMode] = useState<TimerMode>('POMODORO');
  const [timeLeft, setTimeLeft] = useState(MODES.POMODORO.minutes * 60);
  const [isActive, setIsActive] = useState(false);

  const resetTimer = useCallback((newMode?: TimerMode) => {
    const targetMode = newMode || mode;
    setIsActive(false);
    setMode(targetMode);
    setTimeLeft(MODES[targetMode].minutes * 60);
  }, [mode]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      completeSession(MODES[mode].minutes, mode);
      // Auto-switch modes or play sound
      if (mode === 'POMODORO') {
        alert("Session terminée ! Prenez une pause.");
        resetTimer('SHORT_BREAK');
      } else {
        alert("Pause terminée ! Prêt à bosser ?");
        resetTimer('POMODORO');
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, completeSession, resetTimer]);

  const toggleTimer = () => setIsActive(!isActive);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / (MODES[mode].minutes * 60)) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-12 text-center relative overflow-hidden border-4 border-primary/10">
        {/* Progress Background */}
        <div 
          className="absolute bottom-0 left-0 h-1 bg-primary/20 transition-all duration-1000" 
          style={{ width: `${100 - progress}%` }} 
        />

        <div className="flex justify-center gap-4 mb-12">
          {(Object.keys(MODES) as TimerMode[]).map((m) => (
            <button
              key={m}
              onClick={() => resetTimer(m)}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all border ${
                mode === m 
                  ? "bg-primary text-white border-primary shadow-lg" 
                  : "bg-white text-text-secondary border-gray-200 hover:border-primary/50"
              }`}
            >
              {MODES[m].label}
            </button>
          ))}
        </div>

        <div className="mb-12">
          <div className="text-[120px] font-mono font-black text-text-main leading-none tracking-tighter variant-numeric-tabular">
            {formatTime(timeLeft)}
          </div>
          <div className={`text-[10px] font-black uppercase tracking-[0.3em] mt-4 ${MODES[mode].color}`}>
            {isActive ? "Session en cours" : "Prêt à l'action"}
          </div>
        </div>

        <div className="flex justify-center items-center gap-6">
          <Button 
            size="lg" 
            onClick={toggleTimer}
            className="w-48 h-16 text-lg flex items-center justify-center gap-3"
          >
            {isActive ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
            {isActive ? "Pause" : "Démarrer"}
          </Button>
          
          <button 
            onClick={() => resetTimer()}
            className="w-16 h-16 flex items-center justify-center border-2 border-gray-200 text-text-secondary hover:text-danger hover:border-danger transition-all"
          >
            <RotateCcw size={24} />
          </button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <div className="bg-white p-8 border border-gray-200 flex items-center gap-6">
          <div className="bg-primary/5 p-4 text-primary">
            <Brain size={32} />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1">Session Complète</div>
            <div className="text-xl font-bold">+50 XP</div>
          </div>
        </div>
        <div className="bg-white p-8 border border-gray-200 flex items-center gap-6">
          <div className="bg-secondary/5 p-4 text-secondary">
            <Coffee size={32} />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1">Pause Longue</div>
            <div className="text-xl font-bold">+120 XP</div>
          </div>
        </div>
      </div>
    </div>
  );
};
