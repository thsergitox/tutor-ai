import React from 'react';
import LessonsSidebar from '@/components/lessons/LessonsSidebar';
import LessonsPageContent from '@/components/lessons/LessonsPageContent';

export default function LessonsPage() {
  return (
    <div className="flex h-full bg-gray-100">
      <LessonsSidebar />
      <LessonsPageContent />
    </div>
  );
} 