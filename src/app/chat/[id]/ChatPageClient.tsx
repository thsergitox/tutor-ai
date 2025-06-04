'use client';

import React, { useState } from 'react';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import ChatArea from '@/components/chat/ChatArea';

// Props que ChatPageClient espera recibir
export interface ChatPageClientProps {
  params: { id: string }; // params pueden ser necesarios para obtener datos o lógica específica
  isLeftSidebarOpenViaLayout?: boolean;
  toggleLeftSidebarViaLayout?: () => void;
  // Aquí podrías añadir props que vengan del Server Component ChatPage, ej. initialLessonData
}

export default function ChatPageClient({ 
  params, // params se pasa por si es necesario en el futuro, aunque no se use activamente ahora
  isLeftSidebarOpenViaLayout,
  toggleLeftSidebarViaLayout 
}: ChatPageClientProps) {
  
  // Estado para el RightSidebar, manejado localmente en el cliente
  const [isRightSidebarMobileOpen, setIsRightSidebarMobileOpen] = useState(false);

  // El título de la lección puede ser estático, venir de props, o de un fetch aquí si fuera necesario
  const lessonTitle = "Entrevista de Trabajo: Rol de Ingeniero"; 

  const openRightSidebarMobile = () => {
    setIsRightSidebarMobileOpen(true);
  };

  const closeRightSidebarMobile = () => {
    setIsRightSidebarMobileOpen(false);
  };

  // Usamos las props del layout para el LeftSidebar
  const isLeftSidebarEffectivelyOpen = isLeftSidebarOpenViaLayout || false;
  const toggleLeftSidebar = toggleLeftSidebarViaLayout || (() => {});

  return (
    <div className="flex h-full bg-white">
      <LeftSidebar 
        lessonTitle={lessonTitle} 
        isMobileOpen={isLeftSidebarEffectivelyOpen}
        onToggleSidebar={toggleLeftSidebar} 
      />
      
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <div className="flex-1 overflow-hidden">
          <ChatArea onActivateMic={openRightSidebarMobile} />
        </div>
      </main>
      
      <RightSidebar 
        isMobileOpen={isRightSidebarMobileOpen} 
        onToggleSidebar={closeRightSidebarMobile} 
      />
    </div>
  );
} 