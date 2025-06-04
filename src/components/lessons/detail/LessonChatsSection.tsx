import React from 'react';
import Link from 'next/link';
import { LessonChatItem } from '@/model/lessonsData';
import { MessageSquare, CheckCircle, AlertCircle, PlayCircle } from 'lucide-react'; // Icons for status and default

interface LessonChatsSectionProps {
  chats: LessonChatItem[];
}

const getStatusAttributes = (status: LessonChatItem['status']) => {
  switch (status) {
    case 'completed':
      return { Icon: CheckCircle, color: 'text-brand-success', bgColor: 'bg-brand-success/10', label: 'Completado' };
    case 'in_progress':
      return { Icon: PlayCircle, color: 'text-brand-warning', bgColor: 'bg-brand-warning/10', label: 'En Progreso' };
    case 'not_started':
    default:
      return { Icon: AlertCircle, color: 'text-gray-500', bgColor: 'bg-gray-100', label: 'Pendiente' };
  }
};

export default function LessonChatsSection({ chats }: LessonChatsSectionProps) {
  if (!chats || chats.length === 0) {
    return (
      <div className="mb-8 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Prácticas de Conversación</h2>
        <p className="text-gray-500">No hay prácticas de conversación asociadas a esta lección.</p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">Prácticas de Conversación</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {chats.map((chat) => {
          const statusAttrs = getStatusAttributes(chat.status);
          const ChatIcon = chat.icon || MessageSquare;

          return (
            <Link href={`/chat/${chat.id}`} key={chat.id} className="block group">
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col overflow-hidden border border-transparent hover:border-brand-primary/50">
                <div className="p-5 sm:p-6 flex-grow">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg ${statusAttrs.bgColor}`}>
                      <ChatIcon className={`w-6 h-6 ${statusAttrs.color}`} />
                    </div>
                    <span 
                      className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusAttrs.bgColor} ${statusAttrs.color}`}
                    >
                      {statusAttrs.label}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-brand-primary transition-colors duration-200 mb-1.5">
                    {chat.title}
                  </h3>
                  {chat.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {chat.description}
                    </p>
                  )}
                </div>
                <div className="px-5 sm:px-6 py-3 bg-gray-50 border-t border-gray-100">
                    <span className="text-xs font-medium text-brand-primary group-hover:underline">
                        Comenzar Práctica &rarr;
                    </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 