"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const AnimatedTimer = () => {
  const [timeLeft, setTimeLeft] = useState(1500); // 25:00

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 1500));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-48 h-48 md:w-64 md:h-64 rounded-full border-[6px] border-primary/20 flex items-center justify-center relative"
      >
        <div className="text-4xl md:text-6xl font-mono font-bold text-primary">
          {formatTime(timeLeft)}
        </div>
        
        {/* Animated ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="48%"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeDasharray="300"
            strokeDashoffset="100"
            className="text-primary transition-all duration-1000"
          />
        </svg>
      </motion.div>
      
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
        <div className="bg-white px-4 py-2 rounded-full shadow-md text-xs font-bold text-primary uppercase tracking-widest border border-primary/10">
          Focus Session
        </div>
      </div>
    </div>
  );
};
