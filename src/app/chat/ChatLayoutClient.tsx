'use client';

import React, { cloneElement, useState } from 'react';
import { usePathname } from 'next/navigation';
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { ElevenLabsProvider } from "@/providers/ElevenLabsProvider";

// Interfaz para las props que ChatPage (el hijo) espera recibir inyectadas
interface ChatPageProps {
  isLeftSidebarOpen: boolean;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
}

export default function ChatLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLeftSidebarOpenMobile, setIsLeftSidebarOpenMobile] = useState(false);
  const [isRightSidebarOpenMobile, setIsRightSidebarOpenMobile] = useState(false);
  const selectedLesson = 'Entrevista de Trabajo: Rol de Ingeniero';
  
  const pathname = usePathname();
  const isChatPage = pathname.startsWith('/chat');

  const toggleLeftSidebarMobile = () => {
    setIsLeftSidebarOpenMobile(!isLeftSidebarOpenMobile);
  };

  const toggleRightSidebarMobile = () => {
    setIsRightSidebarOpenMobile(!isRightSidebarOpenMobile);
  };

  // Solo necesitamos manipular los children si estamos en una página de chat
  const childrenWithProps = React.Children.map(children, (child) => {
    if (isChatPage && React.isValidElement<ChatPageProps>(child)) {
      return cloneElement(child, { 
        isLeftSidebarOpen: isLeftSidebarOpenMobile,
        toggleLeftSidebar: toggleLeftSidebarMobile,
        toggleRightSidebar: toggleRightSidebarMobile 
      });
    }
    return child;
  });

  // Dynamic variables for personalizing the AI agent
  const dynamicVariables = {
    lessonType: selectedLesson,
    userLevel: 'intermediate',
    userName: 'User', // This could come from user profile
  };

  return (
    <ElevenLabsProvider
      dynamicVariables={dynamicVariables}
      onMessage={(message) => {
        console.log('New message:', message);
      }}
      onError={(error) => {
        console.error('Eleven Labs error:', error);
      }}
    >
      <div className="flex h-screen bg-[#141414] text-white overflow-hidden">
        <LeftSidebar 
          lessonTitle={selectedLesson}
          onToggleSidebar={toggleLeftSidebarMobile}
          isMobileOpen={isLeftSidebarOpenMobile}
        />
        <div className="flex-1 flex">
          {childrenWithProps}
        </div>
        <RightSidebar 
          onToggleSidebar={toggleRightSidebarMobile}
          isMobileOpen={isRightSidebarOpenMobile}
        />
      </div>
    </ElevenLabsProvider>
  );
} 