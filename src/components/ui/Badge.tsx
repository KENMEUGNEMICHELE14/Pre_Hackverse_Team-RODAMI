import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "amber" | "emerald" | "blue";
}

export const Badge = ({ className, variant = "amber", children, ...props }: BadgeProps) => {
  const variants = {
    amber: "bg-tertiary/10 text-tertiary border-tertiary/30 shadow-[0_0_10px_rgba(245,158,11,0.1)]",
    emerald: "bg-secondary/10 text-secondary border-secondary/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]",
    blue: "bg-primary/10 text-primary border-primary/30 shadow-[0_0_10px_rgba(59,130,246,0.1)]",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-none text-[10px] uppercase tracking-wider font-bold border transition-all duration-200",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
