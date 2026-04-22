"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Timer, 
  CheckSquare, 
  BarChart3, 
  User as UserIcon,
  LogOut,
  Rocket,
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Focus Timer", href: "/dashboard/focus", icon: Timer },
  { name: "Mes Tâches", href: "/dashboard/tasks", icon: CheckSquare },
  { name: "Statistiques", href: "/dashboard/stats", icon: BarChart3 },
  { name: "Mon Profil", href: "/dashboard/profile", icon: UserIcon },
];

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, clear session/cookies here
    router.push("/");
  };

  // Mock user data - normally from a context
  const user = {
    name: "Jean Dupont",
    level: 12,
    xp: 1250,
    nextLevelXp: 2000
  };

  const xpPercentage = (user.xp / user.nextLevelXp) * 100;

  return (
    <div className="flex h-screen bg-bg-main overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden lg:flex">
        <div className="p-6 border-b border-gray-200">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-none">
              <Rocket className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-text-main">
              Focus<span className="text-primary italic">Polytech</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-none text-sm font-medium transition-all group",
                  isActive 
                    ? "bg-primary text-white shadow-lg" 
                    : "text-text-secondary hover:bg-gray-100 hover:text-text-main"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-text-secondary group-hover:text-primary")} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium text-danger hover:bg-red-50 transition-all rounded-none"
          >
            <LogOut className="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4">
            {pathname !== '/dashboard' && (
              <Button 
                variant="tertiary" 
                size="sm" 
                className="group pr-4 border-r border-gray-200"
                onClick={() => router.push('/dashboard')}
              >
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Retour
              </Button>
            )}
            <h2 className="text-lg font-bold text-text-main uppercase tracking-widest border-l-4 border-primary pl-4">
              {sidebarLinks.find(l => l.href === pathname)?.name || "Tableau de bord"}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end gap-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-tighter text-text-secondary">Niveau {user.level}</span>
                <span className="text-[10px] font-bold text-primary">{user.xp} / {user.nextLevelXp} XP</span>
              </div>
              <div className="w-48 h-1.5 bg-gray-100 rounded-none border border-gray-200 overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-1000" 
                  style={{ width: `${xpPercentage}%` }}
                />
              </div>
            </div>
            
            <div className="w-10 h-10 bg-bg-main border border-gray-200 flex items-center justify-center font-bold text-primary rounded-none">
              JD
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[size:40px_40px] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]" />
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
