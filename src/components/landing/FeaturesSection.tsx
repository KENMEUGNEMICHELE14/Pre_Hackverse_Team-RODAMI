"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Timer, CheckSquare, BarChart3, Award } from "lucide-react";
import { useScrollReveal, revealVariants } from "@/hooks/useScrollReveal";

const features = [
  {
    title: "Timer Optimisé",
    description: "Des sessions de travail basées sur la technique Pomodoro avec des pauses intelligentes.",
    icon: Timer,
    color: "text-primary",
  },
  {
    title: "Gestion de Tâches",
    description: "Priorisez vos devoirs et projets selon la méthode d'Eisenhower pour une efficacité maximale.",
    icon: CheckSquare,
    color: "text-secondary",
  },
  {
    title: "Statistiques Détailées",
    description: "Visualisez votre temps de focus par matière et suivez votre progression hebdomadaire.",
    icon: BarChart3,
    color: "text-blue-500",
  },
  {
    title: "Système de Badges",
    description: "Gagnez de l'XP et débloquez des badges exclusifs en complétant vos objectifs focus.",
    icon: Award,
    color: "text-tertiary",
  },
];

export const FeaturesSection = () => {
  const { ref, controls } = useScrollReveal();

  return (
    <section id="features" className="py-16 bg-bg-main relative overflow-hidden">
      {/* Decorative Grid and Text */}
      <div className="absolute top-0 right-0 p-12 text-[8vw] font-black text-white/[0.015] select-none pointer-events-none z-0 uppercase italic tracking-tighter leading-none">
        Logiciel <br /> de Précision
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-4">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 glass border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              Système de Performance v4.0
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.85] mb-8 uppercase tracking-tighter italic">
              Zéro <span className="text-primary not-italic">Distraction</span> <br />
              <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '2px white' }}>Ingénierie</span>
            </h2>
            <div className="w-16 h-1 bg-primary mb-8" />
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-xl font-medium border-l-2 border-primary/20 pl-6">
              Nous avons modélisé le flux de travail des meilleurs étudiants de Polytech pour créer une interface qui s'adapte à votre intensité cognitive.
            </p>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="absolute -inset-10 bg-primary/10 blur-[80px] rounded-full opacity-20" />
            <div className="glass p-1.5 max-w-md mx-auto lg:mx-0 w-full glow-border shadow-xl relative z-20">
              <img 
                src="/assets/features.png" 
                alt="Architecture Logicielle" 
                className="w-full h-auto opacity-90 grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, idx) => (
            <motion.div key={idx} variants={revealVariants}>
              <Card className="h-full p-10 glass glow-border hover:border-primary/50 transition-all duration-700 group relative overflow-hidden">
                <div className="absolute -top-10 -right-10 text-8xl font-black text-white/[0.03] group-hover:text-white/[0.05] transition-colors">{idx + 1}</div>
                <div className={`${feature.color} mb-10 transition-transform group-hover:scale-110 group-hover:rotate-6 drop-shadow-[0_0_12px_rgba(59,130,246,0.4)]`}>
                  <feature.icon size={36} />
                </div>
                <h3 className="text-xl font-black text-white mb-6 uppercase tracking-tight italic">{feature.title}</h3>
                <p className="text-text-secondary text-[11px] leading-relaxed font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
