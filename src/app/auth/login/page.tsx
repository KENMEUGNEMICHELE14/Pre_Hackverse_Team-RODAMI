"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Rocket, Mail, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center p-6 relative overflow-hidden">
      {/* Back button */}
      <div className="absolute top-8 left-8 z-50">
        <Link href="/">
          <button className="group flex items-center gap-3 px-5 py-2.5 glass glow-border text-white/70 hover:text-white hover:bg-white/10 transition-all rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Accueil</span>
          </button>
        </Link>
      </div>

      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[size:40px_40px] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]" />
      
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/10 blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="bg-primary p-2 rounded-none transition-transform group-hover:scale-110">
              <Rocket className="text-white w-6 h-6" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-text-main uppercase">
              Focus<span className="text-primary italic">Polytech</span>
            </span>
          </Link>
          <h1 className="text-4xl font-light text-text-main leading-none uppercase tracking-tighter">
            Bon retour <span className="font-black">parmi nous</span>
          </h1>
        </div>

        <Card className="p-10 border-t-8 border-t-primary bg-bg-alt/60 backdrop-blur-xl shadow-2xl border-x-white/5 border-b-white/5">
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-2">Adresse Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-bg-main border border-white/10 p-4 pl-12 rounded-xl focus:border-primary outline-none font-bold text-text-main transition-all"
                    placeholder="etudiant@polytech.cm"
                    autoComplete="username"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Mot de passe</label>
                  <Link href="#" className="text-[9px] font-bold text-primary uppercase hover:underline">Oublié ?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-bg-main border border-white/10 p-4 pl-12 rounded-xl focus:border-primary outline-none font-bold text-text-main transition-all"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full h-16 text-lg flex items-center justify-center gap-3 group">
              Se connecter
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>

            <div className="text-center pt-4">
              <p className="text-xs text-text-secondary uppercase font-bold tracking-widest">
                Pas encore de compte ? <br />
                <Link href="/auth/register" className="text-primary hover:underline mt-2 inline-block">Créer un profil d'ingénieur</Link>
              </p>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
