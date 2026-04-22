"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Task, UserStats, FocusSession, Priority, TaskStatus } from "@/types";
import { v4 as uuidv4 } from "uuid";

interface AppContextType {
  tasks: Task[];
  stats: UserStats;
  sessions: FocusSession[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  deleteTask: (id: string) => void;
  addXP: (amount: number) => void;
  completeSession: (duration: number, type: FocusSession['type']) => void;
  getSortedTasks: () => Task[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<UserStats>({
    level: 1,
    xp: 0,
    totalFocusTime: 0,
    sessionsCompleted: 0,
    tasksCompleted: 0,
    streak: 0,
  });
  const [sessions, setSessions] = useState<FocusSession[]>([]);

  // Load from LocalStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("focus_tasks");
    const savedStats = localStorage.getItem("focus_stats");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedStats) setStats(JSON.parse(savedStats));
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem("focus_tasks", JSON.stringify(tasks));
    localStorage.setItem("focus_stats", JSON.stringify(stats));
  }, [tasks, stats]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
      status: 'TODO',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTaskStatus = (id: string, status: TaskStatus) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        if (status === 'DONE' && t.status !== 'DONE') {
          addXP(30);
          setStats(prev => ({ ...prev, tasksCompleted: prev.tasksCompleted + 1 }));
        }
        return { ...t, status, updatedAt: new Date().toISOString() };
      }
      return t;
    }));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const addXP = (amount: number) => {
    setStats(prev => {
      let newXp = prev.xp + amount;
      let newLevel = prev.level;
      const xpToNext = prev.level * 1000; // Simplified scaling

      if (newXp >= xpToNext) {
        newXp -= xpToNext;
        newLevel += 1;
      }
      return { ...prev, xp: newXp, level: newLevel };
    });
  };

  const completeSession = (duration: number, type: FocusSession['type']) => {
    const xpMap = { POMODORO: 50, SHORT_BREAK: 0, LONG_BREAK: 120 };
    const xp = xpMap[type] || 0;

    const newSession: FocusSession = {
      id: uuidv4(),
      startTime: new Date().toISOString(),
      duration,
      type,
      completed: true,
      xpEarned: xp,
    };

    setSessions([newSession, ...sessions]);
    setStats(prev => ({
      ...prev,
      totalFocusTime: prev.totalFocusTime + duration,
      sessionsCompleted: prev.sessionsCompleted + (type === 'POMODORO' ? 1 : 0),
    }));
    if (xp > 0) addXP(xp);
  };

  const calculateScore = (task: Task) => {
    if (task.status === 'DONE') return -1;

    const priorityScore = { HIGH: 3, MEDIUM: 2, LOW: 1 }[task.priority];
    
    // Urgency
    const deadline = new Date(task.deadline);
    const now = new Date();
    const diffDays = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    let urgencyScore = 0;
    if (diffDays <= 1) urgencyScore = 5;
    else if (diffDays <= 3) urgencyScore = 3;
    else if (diffDays <= 7) urgencyScore = 1;

    const investmentScore = task.status === 'IN_PROGRESS' ? 1 : 0;

    return (priorityScore * 3) + urgencyScore + investmentScore;
  };

  const getSortedTasks = () => {
    return [...tasks].sort((a, b) => calculateScore(b) - calculateScore(a));
  };

  return (
    <AppContext.Provider value={{
      tasks,
      stats,
      sessions,
      addTask,
      updateTaskStatus,
      deleteTask,
      addXP,
      completeSession,
      getSortedTasks
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
