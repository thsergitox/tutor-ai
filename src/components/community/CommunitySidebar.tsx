'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  mockPopularTopics,
  mockOnlineUsers,
  PopularTopic,
  OnlineUser,
} from '@/model/lessonsData';
import {
  Search,
  Globe,
  MessagesSquare,
  BarChart3,
  TrendingUp,
  Flame,
  ChevronRight,
  Gamepad2, // Example for Gaming
  Briefcase,
} from 'lucide-react';

// Sidebar navigation items
const communityNavItems = [
  { id: 'feed', label: 'Feed Global', icon: Globe, href: '/community/feed' },
  { id: 'leaderboard', label: 'Leaderboard', icon: BarChart3, href: '/community/leaderboard' },
];

// Helper to choose an icon for popular topics if not explicitly set or if placeholder
const getTopicIcon = (topic: PopularTopic): React.ElementType => {
  if (topic.title.toLowerCase().includes('gaming')) return Gamepad2;
  if (topic.title.toLowerCase().includes('profesional')) return Briefcase;
  return topic.icon; // Default from mock data
};

export default function CommunitySidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-80 bg-white border-r border-gray-200 p-5 sm:p-6 flex flex-col space-y-6 h-full overflow-y-auto">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar en la comunidad..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-brand-primary focus:border-brand-primary"
        />
      </div>

      {/* Navigation Links */}
      <nav className="space-y-1">
        {communityNavItems.map((item) => {
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

      <hr className="border-gray-200" />

      

      {/* Usuarios Online */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Usuarios Online
        </h3>
        <div className="space-y-3">
          {mockOnlineUsers.map((user) => (
            <div key={user.id} className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3 ${user.avatarColor || 'bg-brand-secondary'}`}>
                {user.avatarInitials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{user.name}</p>
                <p className="text-xs text-gray-500">Nivel: {user.level}</p>
              </div>
              <button className="ml-3 px-3 py-1.5 border border-brand-primary text-brand-primary text-xs font-medium rounded-md hover:bg-brand-primary hover:text-white transition-colors">
                Conectar
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
} 