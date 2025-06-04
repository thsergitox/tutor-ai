import React from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardDashboard from '@/components/dashboard/DashboardDashboard';

export default function DashboardPage() {
  return (
    <div className="flex h-full bg-gray-100">
      <DashboardSidebar />
      <DashboardDashboard />
    </div>
  );
}
