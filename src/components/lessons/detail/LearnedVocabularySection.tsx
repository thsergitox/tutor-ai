import React from 'react';
import { LearnedWordItem } from '@/model/lessonsData';
import { BookOpen, ChevronRight } from 'lucide-react'; // Icons

interface LearnedVocabularySectionProps {
  words: LearnedWordItem[];
}

export default function LearnedVocabularySection({ words }: LearnedVocabularySectionProps) {
  if (!words || words.length === 0) {
    return (
      <div className="mb-8 p-6 sm:p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Vocabulario Clave</h2>
        <p className="text-gray-500">No hay vocabulario clave asociado a esta lección.</p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">Vocabulario Clave</h2>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {words.map((item, index) => (
            <li key={item.id} className="p-5 sm:p-6 hover:bg-gray-50 transition-colors duration-150">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <BookOpen className="w-5 h-5 text-brand-primary opacity-70" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-md sm:text-lg font-semibold text-brand-primary mb-1">
                    {item.word}
                  </h3>
                  <p className="text-sm text-gray-700 mb-1.5">
                    {item.definition}
                  </p>
                  {item.exampleSentence && (
                    <p className="text-xs sm:text-sm text-gray-500 italic">
                      Ej: "{item.exampleSentence}"
                    </p>
                  )}
                </div>
                {/* Could add a button/icon here for more details or practice */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 