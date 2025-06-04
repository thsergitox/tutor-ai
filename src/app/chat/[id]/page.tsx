import React from 'react';
import ChatPageClient, { ChatPageClientProps } from './ChatPageClient';

// Props that ChatPage receives from ChatLayoutClient
interface ChatPageServerProps extends ChatPageClientProps {
  params: { id: string };
}

export default function ChatPage(props: ChatPageServerProps) {
  // This is a Server Component.
  // Client logic and state are in ChatPageClient.
  // You could fetch data here using props.params.id if needed
  // and pass it to ChatPageClient.

  return (
    <ChatPageClient {...props} />
  );
} 