'use client';

import React from 'react';
import ChatArea from '@/components/chat/ChatArea';

// Props que ChatPageClient espera recibir
export interface ChatPageClientProps {
  params?: { id: string }; // params pueden ser necesarios para obtener datos o lógica específica
  isLeftSidebarOpen?: boolean;
  toggleLeftSidebar?: () => void;
  toggleRightSidebar?: () => void;
}

export default function ChatPageClient({ 
  toggleRightSidebar 
}: ChatPageClientProps) {
  
  return (
    <ChatArea onToggleRightSidebar={toggleRightSidebar} />
  );
} 