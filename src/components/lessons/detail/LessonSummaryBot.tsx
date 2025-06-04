'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Lightbulb } from 'lucide-react'; // Or Brain, Sparkles

interface LessonSummaryBotProps {
  summary: string;
  lessonTitle: string;
}

export default function LessonSummaryBot({ summary, lessonTitle }: LessonSummaryBotProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!summary) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-brand-primary text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-xl hover:brightness-110 transition-all duration-200 z-40 group"
        aria-label="Ver resumen de la lección"
      >
        <Lightbulb className="w-7 h-7 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 z-50 transition-opacity duration-300 ease-out animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full transform transition-all duration-300 ease-out animate-scaleUp">
            <div className="p-5 sm:p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg sm:text-xl font-semibold text-brand-primary flex items-center">
                <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 mr-2.5 flex-shrink-0" />
                Resumen de "{lessonTitle}"
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-brand-danger p-1 rounded-full hover:bg-red-50 transition-colors"
                aria-label="Cerrar resumen"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            <div className="p-5 sm:p-6 max-h-[60vh] overflow-y-auto">
              <p className="text-gray-700 whitespace-pre-line text-sm sm:text-base leading-relaxed">
                {summary}
              </p>
            </div>
            <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-200 text-right rounded-b-xl">
              <button 
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-brand-primary text-white text-sm font-medium rounded-lg hover:brightness-110 transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Basic CSS for animations - consider moving to globals.css if used elsewhere */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-scaleUp {
          animation: scaleUp 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
} 