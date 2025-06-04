'use client';

import React, { useState, useEffect } from 'react';
import {
  mockCurrentUserLevelId,
  mockMcerLevels,
  mockAiGenerationTags,
  mockRecommendedLessons,
  mockLessonCategories,
  mockNewLessonNotificationData,
  McerLevel,
  AiGenerationTag,
  RecommendedLessonCard,
  LessonCategoryCard,
  NewLessonNotification
} from '@/model/lessonsData';
import { Sparkles, Zap, CheckCircle, Sliders, Users, Plane, GraduationCap, Briefcase, BookOpen, Plus, X as CloseIcon } from 'lucide-react'; // Added Plus for FAB, CloseIcon

const UserLevelBadge: React.FC = () => {
  const currentUserLevel = mockMcerLevels.find(level => level.id === mockCurrentUserLevelId);
  if (!currentUserLevel) return null;

  return (
    <span 
      className={`px-2.5 py-1 text-xs font-semibold text-white rounded-md ${currentUserLevel.color || 'bg-brand-primary'}`}
    >
      {currentUserLevel.description}
    </span>
  );
};

const RecommendedLessonCardComponent: React.FC<{ lesson: RecommendedLessonCard }> = ({ lesson }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col cursor-pointer">
      {lesson.imageUrl && <img src={lesson.imageUrl} alt={lesson.title} className="w-full h-32 object-cover"/>}
      {!lesson.imageUrl && <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-gray-400">Preview</div>}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${lesson.level === 'B1' ? 'bg-brand-primary text-white' : 'bg-gray-200 text-gray-700'}`}>
            {lesson.level}
          </span>
          {lesson.badgeText && (
            <span className={`text-xs font-bold px-2 py-0.5 rounded text-white ${lesson.badgeColor || 'bg-gray-700'}`}>
              {lesson.badgeText}
            </span>
          )}
        </div>
        <h4 className="text-md font-semibold text-gray-800 mb-1.5 leading-tight flex-grow">{lesson.title}</h4>
        <div className="text-xs text-gray-500 mb-2 flex items-center space-x-3">
          <span>{lesson.lessonCount} lecciones</span>
          <span>{lesson.studentCount} estudiantes</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-brand-primary h-1.5 rounded-full"
            style={{ width: `${lesson.progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const CategoryCardComponent: React.FC<{ category: LessonCategoryCard }> = ({ category }) => {
  const Icon = category.icon;
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center space-x-4 cursor-pointer">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${category.iconBgColor || 'bg-gray-100'}`}>
        <Icon className="w-6 h-6 text-brand-primary" />
      </div>
      <div>
        <h4 className="text-md font-semibold text-gray-800">{category.title}</h4>
        <p className="text-xs text-gray-600">{category.description}</p>
      </div>
    </div>
  );
};

export default function LessonsPageContent() {
  const [showNotification, setShowNotification] = useState(true);
  const NotificationIcon = mockNewLessonNotificationData.icon || BookOpen;

  return (
    <div className="flex-1 bg-gray-50 p-6 sm:p-8 overflow-y-auto relative">
      {/* New Lesson Notification */} 
      {showNotification && (
        <div className="fixed top-20 right-6 sm:right-8 z-50 max-w-sm w-full bg-white p-4 rounded-lg shadow-xl border border-green-200 flex items-start space-x-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <NotificationIcon className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-green-700">{mockNewLessonNotificationData.title}</h3>
            <p className="text-xs text-gray-600">{mockNewLessonNotificationData.description}</p>
          </div>
          <button onClick={() => setShowNotification(false)} className="text-gray-400 hover:text-gray-600">
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Main Title & User Level */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
          Lecciones Personalizadas
        </h1>
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-600">Tu nivel actual:</span>
          <UserLevelBadge />
        </div>
      </div>

      {/* AI Lesson Generation Section - Updated Styles */}
      <div className="bg-slate-50 p-6 sm:p-8 rounded-xl shadow-lg mb-8 border border-gray-200">
        <div className="flex items-center space-x-2 mb-3">
          <Sparkles className="w-6 h-6 text-brand-primary opacity-80" /> 
          <span className="text-sm font-medium uppercase tracking-wider text-brand-primary opacity-80">Generado por IA</span>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Construye tu lección personalizada</h2>
        <p className="text-sm text-gray-700 mb-4 max-w-2xl">
          Define el tema, nivel y tipo de lección que necesitas, y nuestro sistema de IA generará una lección perfectamente adaptada a tus objetivos de aprendizaje.
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {mockAiGenerationTags.map(tag => {
            const TagIcon = tag.icon || CheckCircle;
            return (
              <span key={tag.id} className="bg-brand-primary bg-opacity-10 text-brand-primary px-3 py-1.5 rounded-full text-xs font-medium flex items-center space-x-1.5">
                <TagIcon className="w-3.5 h-3.5" />
                <span>{tag.label}</span>
              </span>
            );
          })}
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="bg-brand-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm">
            Crear Lección
          </button>
          <button className="border border-brand-primary text-brand-primary bg-white px-5 py-2.5 rounded-lg font-medium hover:bg-brand-primary hover:text-white transition-colors text-sm">
            Ver Ejemplos
          </button>
        </div>
      </div>

      {/* Recommended For You */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recomendados para ti</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {mockRecommendedLessons.map(lesson => (
            <RecommendedLessonCardComponent key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Categorías</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {mockLessonCategories.map(category => (
            <CategoryCardComponent key={category.id} category={category} />
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-brand-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:bg-blue-700 transition-colors z-40"
        aria-label="Crear nueva lección"
      >
        <Plus className="w-7 h-7" />
      </button>

    </div>
  );
} 