'use client';

import { useConversation } from '@elevenlabs/react';

export default function ElevenLabsTest() {
  const conversation = useConversation();
  
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Eleven Labs Test Component</h2>
      <p>Status: {conversation.status || 'Ready'}</p>
      <p>Import successful! ✅</p>
    </div>
  );
} 