'use client';

import React, { useState, useEffect } from 'react';
import {
  mockStatCards,
  mockWrittenSkill,
  mockAchievement,
  mockWeeklyActivityData, // Use new weekly data
  mockOverallLevelData, // Use new overall level data
  StatCardItem,
  ActivityDataItem, // This is for individual day data
  WeeklyActivityData, // Type for the whole week structure
  SkillDetail,
  Achievement,
  OverallLevel
} from '@/model/lessonsData';
import { ChevronDown, TrendingUp, TrendingDown, Minus, Award, ChevronLeft, ChevronRight } from 'lucide-react';

// Helper function to determine trend icon and color
const TrendIndicator: React.FC<{ type: 'increase' | 'decrease' | 'neutral' }> = ({ type }) => {
  if (type === 'increase') return <TrendingUp className="w-4 h-4 text-green-500" />;
  if (type === 'decrease') return <TrendingDown className="w-4 h-4 text-red-500" />;
  return <Minus className="w-4 h-4 text-gray-500" />;
};

export default function DashboardDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('Últimos 30 días');
  const [currentWeekIndex, setCurrentWeekIndex] = useState(mockWeeklyActivityData.length > 0 ? mockWeeklyActivityData.length - 1 : 0); 
  const [showAchievement, setShowAchievement] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAchievement(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const currentWeekData: WeeklyActivityData | undefined = mockWeeklyActivityData[currentWeekIndex];
  const activityDataForChart: ActivityDataItem[] = currentWeekData ? currentWeekData.data : [];
  const maxActivityValue = Math.max(...activityDataForChart.map(d => d.value), 0);

  const handlePreviousWeek = () => {
    setCurrentWeekIndex(prev => Math.max(0, prev - 1));
  };
  const handleNextWeek = () => {
    setCurrentWeekIndex(prev => Math.min(mockWeeklyActivityData.length - 1, prev + 1));
  };

  return (
    <div className="flex-1 bg-gray-100 p-6 sm:p-8 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-0">
          Análisis de Progreso
        </h1>
        <div className="relative">
          <button className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            <span>Periodo: {selectedPeriod}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {mockStatCards.map((stat: StatCardItem) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="bg-white p-5 rounded-xl shadow-sm flex flex-col justify-between">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.iconBgColor || 'bg-gray-100'}`}>
                  <Icon className="w-5 h-5 text-brand-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</p>
                <div className="flex items-center text-xs">
                  <TrendIndicator type={stat.changeType} />
                  <span className={`ml-1 ${stat.changeType === 'increase' ? 'text-green-600' : stat.changeType === 'decrease' ? 'text-red-600' : 'text-gray-500'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Language Level Progress Bar */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6 sm:mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">{mockOverallLevelData.title}</h2>
        <p className="text-sm text-gray-500 mb-3">Tu progreso general en el idioma.</p>
        <div className="flex items-center mb-1">
          <span className="text-lg font-bold text-brand-primary">{mockOverallLevelData.currentLevel}</span>
          <span className="text-xs text-gray-500 ml-auto">Siguiente Nivel: {mockOverallLevelData.nextLevel}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-brand-success h-4 rounded-full flex items-center justify-center text-white text-xs font-medium transition-all duration-500"
            style={{ width: `${mockOverallLevelData.progressToNext}%` }}
          >
            {mockOverallLevelData.progressToNext}%
          </div>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">Actividad de Aprendizaje</h2>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handlePreviousWeek}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentWeekIndex === 0}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-sm font-medium text-gray-700 w-40 text-center">
              {currentWeekData ? currentWeekData.weekLabel : 'Cargando...'}
            </span> 
            <button 
              onClick={handleNextWeek}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentWeekIndex === mockWeeklyActivityData.length - 1}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="h-64 w-full">
          <div className="flex items-end h-full space-x-2 sm:space-x-3 md:space-x-4 px-2">
            {activityDataForChart.map((item: ActivityDataItem) => (
              <div key={item.day} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-brand-secondary rounded-t-md transition-all duration-300 hover:bg-brand-primary"
                  style={{ height: `${maxActivityValue > 0 ? (item.value / maxActivityValue) * 100 : 0}%` }}
                  title={`${item.day}: ${item.value}`}
                ></div>
                <span className="text-xs text-gray-500 mt-1.5">{item.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Sections in a grid - Habilidad Oral REMOVED */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {[mockWrittenSkill].map((skill: SkillDetail) => {
          if (!skill) return null; 
          const ObjectiveIcon = skill.objectiveIcon;
          return (
            <div key={skill.id} className="bg-white p-6 rounded-xl shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-semibold text-gray-800">{skill.label}</h2>
                <span className={`px-3 py-1 text-xs font-semibold text-brand-primary bg-brand-primary bg-opacity-10 rounded-full`}>
                  {skill.value}
                </span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                {skill.skills.map(s => (
                  <div key={s.id} className="text-center">
                    <p className={`text-xl font-bold ${s.color}`}>{s.level}</p>
                    <p className="text-xs text-gray-500">{s.name}</p>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progreso hacia {skill.targetLevel}</span>
                  <span className="font-medium text-brand-primary">{skill.progressPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-brand-primary h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${skill.progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-secondary flex items-center justify-center">
                     <ObjectiveIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-brand-primary mb-0.5">Próximo objetivo</h4>
                    <p className="text-xs text-gray-600">{skill.objective}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Achievement Notification */}
      {mockAchievement && (
        <div 
          className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 max-w-xs w-full lg:max-w-sm lg:w-auto 
                     transition-all duration-700 ease-out transform 
                     ${showAchievement ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="bg-white p-4 rounded-xl shadow-lg border border-yellow-300">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-md font-semibold text-yellow-700">{mockAchievement.title}</h3>
                <p className="text-sm text-gray-600">{mockAchievement.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations Placeholder */}
       <div className="bg-white p-6 rounded-xl shadow-sm mt-6 sm:mt-8">
         <h2 className="text-xl font-semibold text-gray-800">Recomendaciones Personalizadas</h2>
         <p className="text-gray-500 mt-2 text-sm">Más detalles y recomendaciones personalizadas aparecerán aquí pronto.</p>
       </div>

    </div>
  );
} 