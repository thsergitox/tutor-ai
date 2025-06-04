'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mockSidebarNavItems, mockWeeklyGoals, SidebarNavItem, WeeklyGoal } from '@/model/lessonsData';

export default function DashboardSidebar() { // Renamed from LessonsSidebar
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-white border-r border-gray-200 p-6 flex flex-col space-y-6 h-full overflow-y-auto">
      <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
        Análisis
      </div>

      {/* Navigation Items */}
      <nav className="space-y-1">
        {mockSidebarNavItems.map((item: SidebarNavItem) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors duration-150 
                ${isActive 
                  ? 'bg-brand-primary bg-opacity-10 text-brand-primary font-medium' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-brand-primary' : 'text-gray-500'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <hr className="border-gray-200" />

      {/* Weekly Goals */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Objetivos Semanales
        </h3>
        <div className="space-y-4">
          {mockWeeklyGoals.map((goal: WeeklyGoal) => {
            const percentage = goal.target > 0 ? (goal.current / goal.target) * 100 : 0;
            return (
              <div key={goal.id}>
                <div className="flex justify-between text-sm text-gray-700 mb-1">
                  <span>{goal.label}</span>
                  <span className="font-medium text-brand-primary">
                    {goal.current}/{goal.target}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${goal.color}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                 <div className="text-right text-xs text-gray-500 mt-1">
                    {Math.round(percentage)}%
                 </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
} 