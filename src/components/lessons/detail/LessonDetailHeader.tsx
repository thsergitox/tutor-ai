import React from 'react';
import { LessonContent } from '@/model/lessonsData';
import Image from 'next/image'; // Using next/image for better optimization
import { Clock, BarChart2, BookOpen } from 'lucide-react'; // Example icons

interface LessonDetailHeaderProps {
  lesson: LessonContent;
}

const DetailItem: React.FC<{ icon: React.ElementType, label: string, value: string }> = ({ icon: Icon, label, value }) => (
  <div className="flex items-center text-sm text-gray-600">
    <Icon className="w-4 h-4 mr-1.5 text-brand-primary opacity-80" />
    <span className="font-medium">{label}:</span>
    <span className="ml-1">{value}</span>
  </div>
);

export default function LessonDetailHeader({ lesson }: LessonDetailHeaderProps) {
  return (
    <div className="mb-8 bg-white rounded-xl shadow-lg overflow-hidden">
      {lesson.coverImageUrl && (
        <div className="w-full h-56 sm:h-72 md:h-80 relative">
          <Image 
            src={lesson.coverImageUrl} 
            alt={lesson.title} 
            layout="fill"
            objectFit="cover"
            priority // Good to add for LCP elements
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
      )}
      <div className="p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-brand-primary mb-3 leading-tight">
          {lesson.title}
        </h1>
        <p className="text-gray-700 text-md mb-6">
          {lesson.description}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-2">
          <DetailItem icon={BookOpen} label="Categoría" value={lesson.category} />
          <DetailItem icon={BarChart2} label="Dificultad" value={lesson.difficulty} />
          <DetailItem icon={Clock} label="Tiempo Estimado" value={lesson.estimatedTime} />
        </div>
      </div>
    </div>
  );
} 