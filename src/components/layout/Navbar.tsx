"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Menu, X, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Focus Timer", href: "/dashboard/focus" },
  { name: "Classement", href: "/dashboard/stats" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled 
          ? "bg-primary/95 backdrop-blur-xl border-white/10 py-3 shadow-2xl" 
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-white p-1.5 rounded-none transition-transform group-hover:scale-110 shadow-lg">
            <Rocket className="text-primary w-5 h-5" />
          </div>
          <span className="font-black text-xl tracking-tighter text-white uppercase italic">
            Focus<span className={cn("italic", isScrolled ? "text-white/80" : "text-white/70")}>Polytech</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[10px] font-black text-white hover:text-white/70 uppercase tracking-widest transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-6 border-l border-white/10 pl-8">
            <Link href="/auth/login">
              <Button variant="tertiary" className="text-[10px] font-black uppercase tracking-widest text-white hover:text-white/70">Se connecter</Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm" className="text-[10px] font-black uppercase tracking-widest px-6 h-10 rounded-none bg-white text-primary hover:bg-white/90">S'inscrire</Button>
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-text-main"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-primary border-b border-white/10 p-8 absolute top-full left-0 w-full flex flex-col gap-6 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs font-black text-white uppercase tracking-widest"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-white/10" />
          <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
            <Button variant="secondary" className="w-full bg-white/10 text-white border-white/20">Se connecter</Button>
          </Link>
          <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
            <Button className="w-full bg-white text-primary">S'inscrire</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};
