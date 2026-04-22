"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { revealVariants } from "@/hooks/useScrollReveal";

export const CTASection = () => {
  return (
    <section className="py-20 bg-bg-main relative overflow-hidden">
      {/* Decorative Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.01] select-none pointer-events-none z-0 uppercase italic tracking-tighter leading-none">
        Join Focus
      </div>

      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[size:40px_40px] bg-[linear-gradient(to_right,#1e3a8a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a_1px,transparent_1px)]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
          className="glass p-10 md:p-16 text-center relative overflow-hidden glow-border border-b-4 border-primary"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/2 blur-2xl" />
          
          <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10 leading-[0.9] uppercase tracking-tighter italic text-white">
            Prenez <br />
            <span className="text-primary not-italic">le contrôle</span>
          </h2>
          
          <p className="text-base text-text-secondary mb-12 max-w-lg mx-auto relative z-10 font-bold uppercase tracking-widest border-t border-white/5 pt-10 opacity-70">
            L'excellence n'attend pas. <br /> 
            Rejoignez l'élite technologique.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
            <Link href="/auth/register">
              <Button size="lg" className="h-16 px-10 text-sm bg-primary hover:bg-primary-hover shadow-xl transition-all font-black italic uppercase tracking-wider">
                Créer mon compte
              </Button>
            </Link>
            <Link href="/dashboard/stats">
              <Button size="lg" variant="secondary" className="h-16 px-10 text-sm glass text-white hover:bg-white/5 transition-all font-black italic uppercase tracking-wider">
                Classement
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
