'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useElevenLabsChat, UseElevenLabsChatOptions, ConversationMessage } from '@/hooks/useElevenLabsChat';

// Context type
interface ElevenLabsContextType {
  // State
  messages: ConversationMessage[];
  isConnected: boolean;
  isSpeaking: boolean;
  isListening: boolean;
  conversationId?: string;
  error?: string;
  volume: number;
  isMuted: boolean;
  status: string;
  audioLevel: number;
  
  // Actions
  startConversation: (preferredDeviceId?: string) => Promise<string>;
  endConversation: () => Promise<void>;
  sendTextMessage: (text: string) => void;
  updateVolume: (volume: number) => void;
  toggleMute: () => void;
  clearMessages: () => void;
}

// Create context
const ElevenLabsContext = createContext<ElevenLabsContextType | null>(null);

// Provider props
interface ElevenLabsProviderProps extends UseElevenLabsChatOptions {
  children: ReactNode;
}

// Provider component
export function ElevenLabsProvider({ children, ...options }: ElevenLabsProviderProps) {
  const elevenLabs = useElevenLabsChat(options);

  return (
    <ElevenLabsContext.Provider value={elevenLabs}>
      {children}
    </ElevenLabsContext.Provider>
  );
}

// Custom hook to use the context
export function useElevenLabs() {
  const context = useContext(ElevenLabsContext);
  
  if (!context) {
    throw new Error('useElevenLabs must be used within an ElevenLabsProvider');
  }
  
  return context;
} 