import React from 'react';
import ChatPageClient, { ChatPageClientProps } from './ChatPageClient'; // Import the new client component and its props type

// Esta es la interfaz de props que ChatPage (Server Component) espera recibir
// incluyendo aquellas inyectadas por ChatLayoutClient
interface ChatPageServerProps {
  params: { id: string };
  isLeftSidebarOpenViaLayout?: boolean; // Inyectada por ChatLayoutClient
  toggleLeftSidebarViaLayout?: () => void; // Inyectada por ChatLayoutClient
}

export default function ChatPage(props: ChatPageServerProps) {
  // Este es ahora un Server Component.
  // La lógica de cliente y el estado están en ChatPageClient.
  // Podrías hacer fetch de datos aquí usando props.params.id si fuera necesario
  // y pasarlos a ChatPageClient.
  // Por ahora, simplemente pasamos todas las props recibidas.

  return (
    <ChatPageClient {...props} />
  );
} 