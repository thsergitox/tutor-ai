'use client';

import React, { useState } from 'react';
import {
  mockLessonFilters,
  mockMcerLevels,
  mockHelpCalloutData,
  mockCurrentUserLevelId,
  LessonFilter,
  McerLevel,
} from '@/model/lessonsData';
import { Search, HelpCircle } from 'lucide-react'; // Assuming Lightbulb was a placeholder and HelpCircle is more suitable for "Necesitas ayuda?"

export default function LessonsSidebar() {
  const [selectedFilter, setSelectedFilter] = useState<string>(mockLessonFilters[0]?.id || 'all');
  const [selectedMcerLevel, setSelectedMcerLevel] = useState<string>(mockCurrentUserLevelId);
  const HelpIcon = mockHelpCalloutData.icon || HelpCircle; // Use defined icon or fallback

  return (
    <aside className="w-full md:w-80 bg-white border-r border-gray-200 p-5 sm:p-6 flex flex-col space-y-6 h-full overflow-y-auto">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Buscar lecciones..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-brand-primary focus:border-brand-primary"
        />
      </div>

      {/* Filter by Type */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Filtrar por tipo</h3>
        <div className="flex flex-wrap gap-2">
          {mockLessonFilters.map((filter: LessonFilter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${selectedFilter === filter.id 
                  ? 'bg-brand-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* MCER Levels - Updated active state color */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Niveles MCER</h3>
        <div className="grid grid-cols-3 gap-2">
          {mockMcerLevels.map((level: McerLevel) => {
            const isActive = selectedMcerLevel === level.id;
            return (
              <button
                key={level.id}
                onClick={() => setSelectedMcerLevel(level.id)}
                className={`p-3 rounded-lg border transition-colors text-center 
                  ${isActive 
                    ? 'bg-brand-success text-white border-transparent shadow-md' // Active state
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300' // Non-active state
                  }`}
              >
                <span className={`block font-bold text-base sm:text-lg ${isActive ? 'text-white' : 'text-gray-800'}`}>{level.level}</span>
                <span className={`block text-xs 
                  ${isActive ? 'text-white opacity-90' : 'text-gray-500'}
                `}>
                  {level.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Need Help? Callout */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mt-auto">
        <div className="flex items-center mb-2">
          <HelpIcon className="w-6 h-6 text-brand-primary mr-2 flex-shrink-0" />
          <h4 className="font-semibold text-brand-primary">{mockHelpCalloutData.title}</h4>
        </div>
        <p className="text-xs text-gray-600 mb-3">{mockHelpCalloutData.description}</p>
        <button className="w-full bg-brand-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          {mockHelpCalloutData.buttonText}
        </button>
      </div>
    </aside>
  );
} 