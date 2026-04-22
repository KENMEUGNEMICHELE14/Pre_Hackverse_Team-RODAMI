import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card = ({ className, hoverEffect = true, children, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "bg-white rounded-none shadow-md p-6 border border-gray-100 transition-all duration-300",
        hoverEffect && "hover:shadow-lg hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
