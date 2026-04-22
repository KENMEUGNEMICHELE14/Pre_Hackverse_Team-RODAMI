import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card = ({ className, hoverEffect = true, children, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "bg-bg-alt/40 backdrop-blur-md rounded-none p-6 border border-white/5 transition-all duration-300",
        hoverEffect && "hover:border-primary/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
