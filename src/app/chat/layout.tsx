import React from 'react';
import ChatLayoutClient from './ChatLayoutClient'; // Import the new client component

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Este es ahora un Server Component. La lógica de cliente está en ChatLayoutClient.
  return (
    <ChatLayoutClient>{children}</ChatLayoutClient>
  );
} 