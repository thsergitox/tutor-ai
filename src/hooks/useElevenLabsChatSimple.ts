'use client';

import { useConversation } from '@elevenlabs/react';
import { useCallback, useState } from 'react';

export interface ConversationMessage {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
}

export interface UseElevenLabsChatSimpleOptions {
  agentId?: string;
  onMessage?: (message: ConversationMessage) => void;
  onError?: (error: string) => void;
}

/**
 * Simplified ElevenLabs chat hook following the official documentation
 * This should work without any dashboard configuration of client events
 */
export function useElevenLabsChatSimple(options: UseElevenLabsChatSimpleOptions = {}) {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string>();

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to ElevenLabs');
      setIsConnected(true);
      setError(undefined);
    },
    onDisconnect: () => {
      console.log('Disconnected from ElevenLabs');
      setIsConnected(false);
    },
    onMessage: (message) => {
      // According to the docs, messages come through here directly
      console.log('Message received:', message);
      
      // The message object structure may vary, so let's handle different formats
      if (message) {
        const newMessage: ConversationMessage = {
          id: `msg-${Date.now()}-${Math.random()}`,
          type: 'agent', // Default to agent, will need to determine from message
          content: typeof message === 'string' ? message : JSON.stringify(message),
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, newMessage]);
        options.onMessage?.(newMessage);
      }
    },
    onError: (error: unknown) => {
      console.error('ElevenLabs Error:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      setError(errorMessage);
      options.onError?.(errorMessage);
    },
  });

  const startConversation = useCallback(async (preferredDeviceId?: string) => {
    try {
      console.log('Requesting microphone permission...');
      
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ 
        audio: {
          deviceId: preferredDeviceId ? { exact: preferredDeviceId } : undefined,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        } 
      });
      
      const agentId = options.agentId || process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
      if (!agentId) {
        throw new Error('Agent ID is required');
      }

      console.log('Starting conversation with agent:', agentId);
      
      // According to docs, just pass agentId directly
      const conversationId = await conversation.startSession({
        agentId,
      });

      console.log('Conversation started with ID:', conversationId);
      return conversationId;
      
    } catch (error) {
      console.error('Failed to start conversation:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to start conversation';
      setError(errorMessage);
      throw error;
    }
  }, [conversation, options.agentId]);

  const endConversation = useCallback(async () => {
    try {
      await conversation.endSession();
      setMessages([]);
    } catch (error) {
      console.error('Failed to end conversation:', error);
    }
  }, [conversation]);

  return {
    messages,
    isConnected,
    isSpeaking: conversation.isSpeaking || false,
    isListening: isConnected && !conversation.isSpeaking,
    error,
    status: conversation.status,
    
    startConversation,
    endConversation,
    clearMessages: () => setMessages([]),
  };
} 