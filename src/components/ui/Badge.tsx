import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "amber" | "emerald" | "blue";
}

export const Badge = ({ className, variant = "amber", children, ...props }: BadgeProps) => {
  const variants = {
    amber: "bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]",
    emerald: "bg-[#D1FAE5] text-[#047857] border-[#A7F3D0]",
    blue: "bg-[#DBEAFE] text-[#1E40AF] border-[#BFDBFE]",
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
