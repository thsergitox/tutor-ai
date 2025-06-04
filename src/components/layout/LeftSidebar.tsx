'use client';

import React from 'react';
import { Smartphone, BarChart3, UtensilsCrossed, ChevronRight, Settings, Save } from 'lucide-react';
import Link from 'next/link';

interface LeftSidebarProps {
  lessonTitle: string;
  onToggleSidebar?: () => void;
  isMobileOpen?: boolean;
}

export default function LeftSidebar({ 
  lessonTitle = "Entrevista de Trabajo: Rol de Ingeniero",
  onToggleSidebar,
  isMobileOpen
}: LeftSidebarProps) {
  const progressPercentage = 65;
  
  const stats = [
    { value: '14', label: 'Días de racha', color: 'text-brand-primary' },
    { value: '520', label: 'Puntos XP', color: 'text-brand-primary' },
    { value: '8', label: 'Logros', color: 'text-brand-primary' },
    { value: '75%', label: 'Precisión', color: 'text-brand-primary' },
  ];

  const recentLessons = [
    {
      id: 1,
      title: 'Tecnología',
      description: 'Vocabulario y conversaciones sobre gadgets',
      icon: Smartphone,
      href: '/lessons/tecnologia',
    },
    {
      id: 2,
      title: 'Reunión de Negocios',
      description: 'Escenario profesional interactivo',
      icon: BarChart3,
      href: '/lessons/negocios',
    },
    {
      id: 3,
      title: 'Restaurante',
      description: 'Práctica de pedidos y conversación casual',
      icon: UtensilsCrossed,
      href: '/lessons/restaurante',
    },
  ];

  return (
    <aside 
      className={`lg:block w-80 bg-gray-50 border-r border-gray-200 h-full overflow-y-auto transition-transform duration-300 ease-in-out transform ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static fixed top-0 left-0 z-40 lg:z-auto`}
    >
      <div className="p-6 space-y-6 h-full">
        <div className="pb-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800 mb-3 break-words">
            {lessonTitle}
          </h1>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <button 
              className="w-full sm:w-auto flex items-center justify-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              <Settings className="w-4 h-4 mr-2" />
              Cambiar Escenario
            </button>
            <button className="w-full sm:w-auto flex items-center justify-center px-3 py-2 bg-brand-primary text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              <Save className="w-4 h-4 mr-2" />
              Guardar Chat
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Tu Progreso</h2>
            <span className="px-3 py-1 text-white text-xs font-medium rounded-full" style={{ backgroundColor: '#2A6CC8' }}>
              Nivel B1
            </span>
          </div>
          
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="h-2.5 rounded-full transition-all duration-300"
                style={{ 
                  width: `${progressPercentage}%`,
                  backgroundColor: '#48BB78'
                }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-gray-50 p-3 rounded-lg">
                <div className="text-xl font-bold" style={{ color: '#2A6CC8' }}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Otras Lecciones
          </h3>
          
          <div className="space-y-3">
            {recentLessons.map((lesson) => {
              const IconComponent = lesson.icon;
              return (
                <Link
                  key={lesson.id}
                  href={lesson.href}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#63B3ED' }}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-800 group-hover:text-brand-primary transition-colors">
                      {lesson.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {lesson.description}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-primary transition-colors flex-shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      {isMobileOpen && (
        <div 
          onClick={onToggleSidebar} 
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
        ></div>
      )}
    </aside>
  );
} 