'use client';

import { useConversation } from '@elevenlabs/react';
import { useCallback, useEffect, useState, useRef } from 'react';

export interface ConversationMessage {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
  isTranscript?: boolean;
}

export interface UseElevenLabsChatOptions {
  agentId?: string;
  onMessage?: (message: ConversationMessage) => void;
  onError?: (error: string) => void;
}

/**
 * Fixed implementation of ElevenLabs chat hook that properly handles transcripts
 * Requires client events (agent_response, user_transcript) to be configured in ElevenLabs dashboard
 */
export function useElevenLabsChatFixed(options: UseElevenLabsChatOptions = {}) {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string>();
  const [audioLevel, setAudioLevel] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // Create message handler that properly adds messages
  const addMessage = useCallback((message: ConversationMessage) => {
    console.log('Adding message:', message);
    setMessages(prev => [...prev, message]);
    options.onMessage?.(message);
  }, [options]);

  // Initialize conversation with proper client tools
  const conversation = useConversation({
    onConnect: () => {
      console.log('✅ Connected to ElevenLabs');
      setIsConnected(true);
      setError(undefined);
    },
    onDisconnect: () => {
      console.log('❌ Disconnected from ElevenLabs');
      setIsConnected(false);
      stopAudioMonitoring();
    },
    onMessage: (props) => {
      // Log everything we receive
      console.log('📨 Raw message received:', JSON.stringify(props, null, 2));
      
      // Handle standard message format
      if (props && typeof props === 'object') {
        // Check for message + source format (standard)
        if ('message' in props && 'source' in props) {
          const { message, source } = props as { message: string; source: string };
          console.log(`💬 ${source}: ${message}`);
          
          const newMessage: ConversationMessage = {
            id: `${source}-${Date.now()}-${Math.random()}`,
            type: source === 'user' ? 'user' : 'agent',
            content: message,
            timestamp: new Date(),
            isTranscript: source === 'user',
          };
          
          addMessage(newMessage);
        }
        // Check for other possible formats
        else if ('text' in props) {
          console.log('📝 Text message:', props);
        }
        else if ('transcript' in props) {
          console.log('🎤 Transcript:', props);
        }
      }
    },
    onError: (message, context) => {
      console.error('❌ ElevenLabs Error:', message, context);
      setError(message);
      options.onError?.(message);
    },
  });

  // Audio monitoring functions
  const startAudioMonitoring = async (stream: MediaStream) => {
    try {
      const AudioContextConstructor = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextConstructor) return;
      
      audioContextRef.current = new AudioContextConstructor();
      const analyser = audioContextRef.current.createAnalyser();
      analyser.fftSize = 256;
      analyser.minDecibels = -60;
      analyser.maxDecibels = -10;
      analyser.smoothingTimeConstant = 0.85;
      
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyser);
      analyserRef.current = analyser;
      
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      
      const updateLevel = () => {
        if (!analyserRef.current) return;
        
        analyserRef.current.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        const normalized = Math.min(average / 128, 1);
        setAudioLevel(normalized);
        
        requestAnimationFrame(updateLevel);
      };
      
      updateLevel();
    } catch (err) {
      console.error('Audio monitoring failed:', err);
    }
  };

  const stopAudioMonitoring = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    setAudioLevel(0);
  };

  // Start conversation with enhanced client tools
  const startConversation = useCallback(async (preferredDeviceId?: string) => {
    try {
      console.log('🎤 Requesting microphone access...');
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          deviceId: preferredDeviceId ? { exact: preferredDeviceId } : undefined,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        } 
      });
      
      await startAudioMonitoring(stream);
      
      const agentId = options.agentId || process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
      if (!agentId) {
        throw new Error('Agent ID is required');
      }

      console.log('🚀 Starting session with agent:', agentId);
      
      // Define client tools that match the events configured in ElevenLabs dashboard
      const clientTools = {
        agent_response: (params: { response: string }) => {
          console.log('🤖 Agent response via client tool:', params.response);
          addMessage({
            id: `agent-tool-${Date.now()}`,
            type: 'agent',
            content: params.response,
            timestamp: new Date(),
          });
          return 'Response logged';
        },
        user_transcript: (params: { transcript: string }) => {
          console.log('🗣️ User transcript via client tool:', params.transcript);
          addMessage({
            id: `user-tool-${Date.now()}`,
            type: 'user',
            content: params.transcript,
            timestamp: new Date(),
            isTranscript: true,
          });
          return 'Transcript logged';
        },
      };

      const conversationId = await conversation.startSession({
        agentId,
        clientTools,
      });

      console.log('✅ Conversation started with ID:', conversationId);
      return conversationId;
      
    } catch (error) {
      console.error('❌ Failed to start conversation:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to start conversation';
      setError(errorMessage);
      throw error;
    }
  }, [conversation, options.agentId, addMessage]);

  // End conversation
  const endConversation = useCallback(async () => {
    try {
      await conversation.endSession();
      stopAudioMonitoring();
      setMessages([]);
    } catch (error) {
      console.error('Failed to end conversation:', error);
    }
  }, [conversation]);

  // Send text message
  const sendTextMessage = useCallback((text: string) => {
    if (!isConnected) {
      console.warn('Cannot send message: not connected');
      return;
    }
    
    console.log('📤 Sending text message:', text);
    
    // Add user message immediately
    addMessage({
      id: `user-text-${Date.now()}`,
      type: 'user',
      content: text,
      timestamp: new Date(),
    });
    
    // Try different methods to send the message
    const conv = conversation as unknown as { 
      sendUserMessage?: (text: string) => void;
      send?: (text: string) => void;
      sendMessage?: (text: string) => void;
    };
    
    if (typeof conv.sendUserMessage === 'function') {
      console.log('Using sendUserMessage method');
      conv.sendUserMessage(text);
    } else if (typeof conv.send === 'function') {
      console.log('Using send method');
      conv.send(text);
    } else if (typeof conv.sendMessage === 'function') {
      console.log('Using sendMessage method');
      conv.sendMessage(text);
    } else {
      console.error('No send method found on conversation object');
      console.log('Available methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(conversation)));
    }
  }, [conversation, isConnected, addMessage]);

  // Cleanup
  useEffect(() => {
    return () => {
      stopAudioMonitoring();
    };
  }, []);

  return {
    messages,
    isConnected,
    isSpeaking: conversation.isSpeaking || false,
    isListening: isConnected && !conversation.isSpeaking,
    error,
    audioLevel,
    status: conversation.status,
    
    startConversation,
    endConversation,
    sendTextMessage,
    clearMessages: () => setMessages([]),
  };
} 