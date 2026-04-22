"use client";

import React, { useState } from "react";
import { Plus, Trash2, CheckCircle, Clock, Play, Tag, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/context/AppContext";
import { Priority, TaskStatus } from "@/types";
import { cn } from "@/lib/utils";

export const TaskList = () => {
  const { getSortedTasks, addTask, updateTaskStatus, deleteTask } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>("MEDIUM");
  const [newTaskDeadline, setNewTaskDeadline] = useState(new Date().toISOString().split('T')[0]);

  const sortedTasks = getSortedTasks();

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addTask({
      title: newTaskTitle,
      priority: newTaskPriority,
      deadline: newTaskDeadline,
    });
    setNewTaskTitle("");
    setIsAdding(false);
  };

  const getPriorityColor = (p: Priority) => {
    switch (p) {
      case 'HIGH': return 'text-red-600';
      case 'MEDIUM': return 'text-amber-600';
      case 'LOW': return 'text-emerald-600';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black uppercase tracking-tighter text-text-main flex items-center gap-3">
          <CheckCircle className="w-8 h-8 text-primary" />
          Mes Tâches
        </h2>
        <Button onClick={() => setIsAdding(true)} className="flex items-center gap-2">
          <Plus size={18} />
          Nouvelle Tâche
        </Button>
      </div>

      {isAdding && (
        <Card className="p-8 border-2 border-primary/20 bg-primary/5">
          <form onSubmit={handleAddTask} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-2">Titre de la tâche</label>
                <input 
                  type="text" 
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full bg-bg-main border border-white/10 p-4 rounded-xl focus:border-primary outline-none text-lg font-bold text-text-main transition-all"
                  placeholder="Qu'allez-vous accomplir ?"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-2">Priorité</label>
                <select 
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as Priority)}
                  className="w-full bg-bg-main border border-white/10 p-4 rounded-xl focus:border-primary outline-none text-text-main"
                >
                  <option value="LOW" className="bg-bg-main">Basse</option>
                  <option value="MEDIUM" className="bg-bg-main">Moyenne</option>
                  <option value="HIGH" className="bg-bg-main">Haute</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary block mb-2">Date limite (Deadline)</label>
                <input 
                  type="date" 
                  value={newTaskDeadline}
                  onChange={(e) => setNewTaskDeadline(e.target.value)}
                  className="w-full bg-bg-main border border-white/10 p-4 rounded-xl focus:border-primary outline-none text-text-main"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Button type="submit" className="flex-1">Créer la tâche</Button>
              <Button variant="secondary" onClick={() => setIsAdding(false)} className="w-32">Annuler</Button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        {sortedTasks.length === 0 ? (
          <div className="text-center py-20 bg-bg-alt/20 border border-dashed border-white/10">
            <p className="text-text-secondary">Aucune tâche enregistrée. Commencez par en créer une !</p>
          </div>
        ) : (
          sortedTasks.map((task, idx) => (
            <Card key={task.id} className={cn(
              "p-6 group transition-all duration-300 border-l-8 bg-bg-alt/20",
              idx === 0 && task.status !== 'DONE' ? "border-l-primary shadow-xl ring-2 ring-primary/5" : "border-l-white/5",
              task.status === 'DONE' && "opacity-40 grayscale shadow-none"
            )}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {idx === 0 && task.status !== 'DONE' && (
                      <Badge variant="blue" className="bg-primary text-white border-none animate-pulse">À faire maintenant</Badge>
                    )}
                    <Badge variant={task.status === 'DONE' ? 'emerald' : 'amber'} className="text-[9px]">
                      {task.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <h3 className={cn("text-xl font-bold text-text-main mb-2", task.status === 'DONE' && "line-through")}>
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-text-secondary">
                    <span className="flex items-center gap-1.5">
                      <Tag size={12} className={getPriorityColor(task.priority)} />
                      Priorité {task.priority}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      Deadline: {new Date(task.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {task.status !== 'DONE' && (
                    <>
                      {task.status === 'TODO' ? (
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => updateTaskStatus(task.id, 'IN_PROGRESS')}
                          className="flex items-center gap-2"
                        >
                          <Play size={14} /> Démarrer
                        </Button>
                      ) : (
                        <Button 
                          size="sm"
                          onClick={() => updateTaskStatus(task.id, 'DONE')}
                          className="flex items-center gap-2 bg-secondary hover:bg-secondary/90"
                        >
                          <CheckCircle size={14} /> Terminer
                        </Button>
                      )}
                    </>
                  )}
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="p-3 text-text-secondary hover:text-danger hover:bg-red-50 transition-all border border-transparent hover:border-danger/20"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

const CheckSquare = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect x="3" y="3" width="18" height="18" rx="0" strokeWidth="3"/>
    <path d="M9 12l2 2 4-4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
