'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { usePathname } from 'next/navigation';

// Interfaz para las props que ChatPage (el hijo) espera recibir inyectadas
interface ExpectedChildProps {
  isLeftSidebarOpenViaLayout?: boolean;
  toggleLeftSidebarViaLayout?: () => void;
  // params podría ser necesario si ChatPageClient lo usa directamente y no lo recibe de ChatPage (Server)
}

interface ChatLayoutClientProps {
  children: React.ReactNode;
}

export default function ChatLayoutClient({ children }: ChatLayoutClientProps) {
  const [isLeftSidebarMobileOpen, setIsLeftSidebarMobileOpen] = useState(false);
  const pathname = usePathname();
  const isChatPage = pathname.startsWith('/chat');

  const toggleLeftSidebarMobile = () => {
    if (isChatPage) { // Solo permitir toggle si estamos en una página de chat
      setIsLeftSidebarMobileOpen(!isLeftSidebarMobileOpen);
    }
  };

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement<ExpectedChildProps>(child)) {
      // Inyectamos las props necesarias para que ChatPage (o su wrapper cliente) las reciba
      return React.cloneElement(child, {
        isLeftSidebarOpenViaLayout: isLeftSidebarMobileOpen,
        toggleLeftSidebarViaLayout: toggleLeftSidebarMobile,
      });
    }
    return child;
  });

  return (
    <div className="h-screen bg-white flex flex-col">
      <Header 
        onMobileNavToggle={isChatPage ? toggleLeftSidebarMobile : undefined} 
        isChatPage={isChatPage}
      />
      <div className="flex-1 overflow-hidden">
        {childrenWithProps}
      </div>
    </div>
  );
} 