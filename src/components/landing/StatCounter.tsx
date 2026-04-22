"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StatCounterProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export const StatCounter = ({ value, label, prefix = "", suffix = "" }: StatCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center group-hover:-translate-y-2 transition-transform duration-500">
      <div className="text-5xl md:text-7xl font-display font-black text-white mb-4 italic tracking-tighter drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-primary font-black uppercase tracking-[0.2em] text-[10px] md:text-xs">
        {label}
      </div>
    </div>
  );
};
