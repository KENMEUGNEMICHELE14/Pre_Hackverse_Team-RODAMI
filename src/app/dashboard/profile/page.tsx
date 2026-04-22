"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProfileStats } from "@/components/dashboard/ProfileStats";

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <ProfileStats />
      </div>
    </DashboardLayout>
  );
}
