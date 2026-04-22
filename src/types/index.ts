export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: TaskStatus;
  deadline: string; // ISO String
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  level: number;
  xp: number;
  totalFocusTime: number; // minutes
  sessionsCompleted: number;
  tasksCompleted: number;
  streak: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  stats: UserStats;
  badges: Badge[];
}

export interface FocusSession {
  id: string;
  startTime: string;
  duration: number; // minutes
  type: 'POMODORO' | 'SHORT_BREAK' | 'LONG_BREAK';
  completed: boolean;
  xpEarned: number;
}
