"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { AnimatedTimer } from "@/components/landing/AnimatedTimer";
import { Badge } from "@/components/ui/Badge";
import { revealVariants } from "@/hooks/useScrollReveal";

export const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-bg-main">
      {/* Absolute Decorative Background Text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-black text-white/[0.02] select-none pointer-events-none whitespace-nowrap z-0 uppercase italic tracking-tighter">
        Polytech Excellence Focus
      </div>

      {/* Background gradients */}
      <div className="absolute top-0 right-0 -z-10 w-full lg:w-3/4 h-full opacity-60 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 bg-primary/20 aspect-square rounded-full scale-125 translate-x-1/4 -translate-y-1/4 blur-[180px]" />
        <div className="absolute bottom-0 right-0 bg-secondary/10 aspect-square rounded-full scale-110 translate-x-1/3 translate-y-1/3 blur-[180px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 glass glow-border mb-10">
              <span className="w-2 h-2 bg-primary animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.3em] font-black text-primary-hover">
                Plateforme d'Ingénierie du Focus
              </span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] mb-10 uppercase tracking-tighter italic">
              Redéfinissez <br />
              <span className="text-primary-hover not-italic">l'efficacité</span> <br />
              <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '2px white' }}>à Polytech</span>
            </h1>

            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-12 max-w-xl font-medium border-l-4 border-primary/40 pl-10">
              Conçu pour la rigueur scientifique. Gérez vos tâches, optimisez vos sessions de travail et rejoignez l'élite des étudiants performants.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8">
              <Link href="/auth/register">
                <Button size="lg" className="h-20 px-12 text-lg shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all rounded-none uppercase font-black italic tracking-tight">
                  Lancer mon Focus
                </Button>
              </Link>
              <div className="flex items-center gap-6 px-8 py-3 glass border-white/5">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(v => <div key={v} className="w-10 h-10 bg-slate-800 border-2 border-bg-main" />)}
                </div>
                <div>
                   <div className="text-base font-black text-white tracking-widest">+1,250</div>
                   <div className="text-[9px] uppercase font-bold text-text-secondary tracking-widest opacity-50">Ingénieurs Actifs</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-tr from-primary/30 to-secondary/30 blur-xl opacity-30 animate-pulse" />
            <div className="relative glass p-4 glow-border shadow-[0_0_50px_rgba(59,130,246,0.15)]">
              <img 
                src="/assets/hero.png" 
                alt="Polytech Workspace" 
                className="w-full h-auto opacity-95 grayscale-[0.3] hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute -top-6 -right-6 bg-primary text-white px-8 py-4 font-black text-2xl italic shadow-2xl rotate-2">
                25:00
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
