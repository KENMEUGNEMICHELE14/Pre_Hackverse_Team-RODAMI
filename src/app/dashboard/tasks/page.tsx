"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TaskList } from "@/components/dashboard/TaskList";

export default function TasksPage() {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <TaskList />
      </div>
    </DashboardLayout>
  );
}
