import React from 'react';
import { mockActiveLessonContent, LessonContent } from '@/model/lessonsData';
import LessonDetailHeader from '@/components/lessons/detail/LessonDetailHeader';
import LessonChatsSection from '@/components/lessons/detail/LessonChatsSection';
import LearnedVocabularySection from '@/components/lessons/detail/LearnedVocabularySection';
import LessonSummaryBot from '@/components/lessons/detail/LessonSummaryBot';
// We will create these components in the next steps
// import LearnedVocabularySection from '@/components/lessons/detail/LearnedVocabularySection';
// import LessonSummaryBot from '@/components/lessons/detail/LessonSummaryBot';

interface LessonDetailPageProps {
  params: { lessonId: string };
}

export default async function LessonDetailPage({ params }: LessonDetailPageProps) {
  // In a real app, you would fetch lessonData based on params.lessonId
  // For now, we use mock data and ignore params.lessonId
  const lessonData: LessonContent = mockActiveLessonContent;

  if (!lessonData) {
    return <div className="p-8 text-center text-gray-600">Lección no encontrada.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 pb-24">
      <LessonDetailHeader lesson={lessonData} />
      <LessonChatsSection chats={lessonData.associatedChats} />
      <LearnedVocabularySection words={lessonData.learnedWords} />
      <LessonSummaryBot summary={lessonData.summary} lessonTitle={lessonData.title} />

      {/* Placeholder for LessonSummaryBot */}
      <div className="fixed bottom-8 right-8">
        {/* Chatbot button will go here */}
        <button className="bg-brand-primary text-white p-4 rounded-full shadow-lg hover:brightness-90 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </button>
      </div>
    </div>
  );
} 