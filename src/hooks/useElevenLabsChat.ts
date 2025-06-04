'use client';

import { useConversation } from '@elevenlabs/react';
import { useCallback, useEffect, useState, useRef } from 'react';

// Define types for conversation events and messages
export interface ConversationMessage {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
  isTranscript?: boolean;
  isFinal?: boolean;
}

export interface ConversationState {
  messages: ConversationMessage[];
  isConnected: boolean;
  isSpeaking: boolean;
  isListening: boolean;
  conversationId?: string;
  error?: string;
  audioLevel: number; // Add audio level for voice activity
}

// Hook configuration options
export interface UseElevenLabsChatOptions {
  agentId?: string;
  onMessage?: (message: ConversationMessage) => void;
  onError?: (error: string) => void;
  dynamicVariables?: {
    lessonType?: string;
    userLevel?: string;
    userName?: string;
    [key: string]: string | undefined;
  };
  textOnly?: boolean;
}

export function useElevenLabsChat(options: UseElevenLabsChatOptions = {}) {
  const [state, setState] = useState<ConversationState>({
    messages: [],
    isConnected: false,
    isSpeaking: false,
    isListening: false,
    audioLevel: 0,
  });

  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize the conversation hook
  const conversation = useConversation({
    onConnect: () => {
      console.log('ElevenLabs: Connected');
      setState(prev => ({ ...prev, isConnected: true, error: undefined }));
    },
    onDisconnect: () => {
      console.log('ElevenLabs: Disconnected');
      setState(prev => ({ ...prev, isConnected: false }));
      stopAudioMonitoring();
    },
    onMessage: (props) => {
      console.log('=== ElevenLabs onMessage received ===');
      console.log('Full props:', JSON.stringify(props, null, 2));
      console.log('Props type:', typeof props);
      console.log('Props keys:', Object.keys(props));
      
      // Handle the standard SDK format
      if (props.message && props.source) {
        console.log(`Message from ${props.source}: ${props.message}`);
        
        const isUser = props.source === 'user';
        const newMessage: ConversationMessage = {
          id: `${props.source}-${Date.now()}`,
          type: isUser ? 'user' : 'agent',
          content: props.message,
          timestamp: new Date(),
          isTranscript: isUser,
        };
        
        setState(prev => ({
          ...prev,
          messages: [...prev.messages, newMessage],
        }));
        
        options.onMessage?.(newMessage);
      } else {
        console.log('Message does not match expected format (message + source)');
      }
    },
    onError: (message, context) => {
      console.error('ElevenLabs Error:', message, context);
      setState(prev => ({ ...prev, error: message }));
      options.onError?.(message);
    },
  });

  // Log conversation object to see what methods/properties are available
  useEffect(() => {
    if (conversation) {
      console.log('Conversation object:', conversation);
      console.log('Conversation methods:', Object.getOwnPropertyNames(conversation));
      console.log('Conversation status:', conversation.status);
      
      // Check for any transcript-related properties
      const conversationKeys = Object.keys(conversation);
      console.log('All conversation keys:', conversationKeys);
      
      // Log prototype methods
      const proto = Object.getPrototypeOf(conversation);
      if (proto) {
        console.log('Prototype methods:', Object.getOwnPropertyNames(proto));
      }
      
      // Check for any transcript or message properties
      console.log('Checking for transcript properties...');
      if ('transcript' in conversation) console.log('Found transcript property:', conversation.transcript);
      if ('messages' in conversation) console.log('Found messages property:', conversation.messages);
      if ('history' in conversation) console.log('Found history property:', conversation.history);
      if ('transcripts' in conversation) console.log('Found transcripts property:', conversation.transcripts);
      
      // Check for WebSocket or event emitter access
      console.log('Checking for WebSocket or event access...');
      if ('websocket' in conversation) console.log('Found websocket property');
      if ('ws' in conversation) console.log('Found ws property');
      if ('socket' in conversation) console.log('Found socket property');
      if ('on' in conversation) console.log('Found on method (event emitter)');
      if ('addEventListener' in conversation) console.log('Found addEventListener method');
      if ('subscribe' in conversation) console.log('Found subscribe method');
    }
  }, [conversation]);

  // Additional debug logging for connection status
  useEffect(() => {
    console.log('Connection state changed:', {
      isConnected: state.isConnected,
      isSpeaking: state.isSpeaking,
      isListening: state.isListening,
      conversationId: state.conversationId,
    });
  }, [state.isConnected, state.isSpeaking, state.isListening, state.conversationId]);

  // Update speaking/listening states
  useEffect(() => {
    setState(prev => ({
      ...prev,
      isSpeaking: conversation.isSpeaking || false,
      isListening: !conversation.isSpeaking && state.isConnected,
    }));
  }, [conversation.isSpeaking, state.isConnected]);

  // Audio monitoring for voice activity
  const startAudioMonitoring = async (stream: MediaStream) => {
    try {
      // Type-safe AudioContext creation
      const AudioContextConstructor = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextConstructor) {
        throw new Error('AudioContext not supported');
      }
      
      audioContextRef.current = new AudioContextConstructor();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 512;
      analyserRef.current.smoothingTimeConstant = 0.7;
      analyserRef.current.minDecibels = -70;
      analyserRef.current.maxDecibels = -10;
      
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      microphoneRef.current.connect(analyserRef.current);
      
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      
      const updateAudioLevel = () => {
        if (!analyserRef.current) return;
        
        analyserRef.current.getByteFrequencyData(dataArray);
        
        // Calculate average with more sensitivity
        const sum = dataArray.reduce((acc, val) => acc + val, 0);
        const average = sum / dataArray.length;
        
        // More aggressive normalization for better sensitivity
        // Divide by 64 instead of 128 for higher values
        const normalizedLevel = Math.min(average / 64, 1);
        
        // Apply exponential scaling to make small sounds more visible
        const scaledLevel = Math.pow(normalizedLevel, 0.5); // Square root for better low-end response
        
        setState(prev => ({ ...prev, audioLevel: scaledLevel }));
        
        animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
      };
      
      updateAudioLevel();
    } catch (error) {
      console.error('Failed to start audio monitoring:', error);
    }
  };

  const stopAudioMonitoring = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
      microphoneRef.current = null;
    }
    
    if (analyserRef.current) {
      analyserRef.current = null;
    }
    
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    setState(prev => ({ ...prev, audioLevel: 0 }));
  };

  // Client tools for interactive features
  const clientTools = {
    // These need to match the client events configured in ElevenLabs dashboard
    agent_response: (response: string) => {
      console.log('Agent response received via client tool:', response);
      const newMessage: ConversationMessage = {
        id: `agent-${Date.now()}`,
        type: 'agent',
        content: response,
        timestamp: new Date(),
      };
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, newMessage],
      }));
      options.onMessage?.(newMessage);
      return 'Response logged';
    },
    user_transcript: (transcript: string) => {
      console.log('User transcript received via client tool:', transcript);
      const newMessage: ConversationMessage = {
        id: `user-${Date.now()}`,
        type: 'user',
        content: transcript,
        timestamp: new Date(),
        isTranscript: true,
      };
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, newMessage],
      }));
      options.onMessage?.(newMessage);
      return 'Transcript logged';
    },
    showPronunciationFeedback: (params: { word: string; feedback: string }) => {
      console.log('Pronunciation feedback:', params);
      // Implementation will be added later
      return 'Feedback shown';
    },
    updateProgress: (params: { type: string; value: number }) => {
      console.log('Progress update:', params);
      // Implementation will be added later
      return 'Progress updated';
    },
    showWordSuggestion: (params: { word: string; suggestion: string }) => {
      console.log('Word suggestion:', params);
      // Implementation will be added later
      return 'Suggestion shown';
    },
  };

  // Start conversation
  const startConversation = useCallback(async (preferredDeviceId?: string) => {
    try {
      // Request microphone permission and get stream
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          deviceId: preferredDeviceId ? { exact: preferredDeviceId } : undefined,
        } 
      });
      
      // Start audio monitoring
      await startAudioMonitoring(stream);
      
      const agentId = options.agentId || process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
      
      if (!agentId) {
        throw new Error('Agent ID is required');
      }

      // Start the conversation with client tools
      const conversationId = await conversation.startSession({
        agentId,
        clientTools,
      });

      setState(prev => ({ ...prev, conversationId }));
      
      console.log('Conversation started with ID:', conversationId);
      console.log('Conversation object after start:', conversation);
      
      return conversationId;
    } catch (error) {
      console.error('Failed to start conversation:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to start conversation';
      
      // Provide more helpful error messages
      if (errorMessage.includes('Permission denied')) {
        setState(prev => ({ 
          ...prev, 
          error: 'Permiso de micrófono denegado. Por favor, permite el acceso al micrófono.'
        }));
      } else if (errorMessage.includes('Agent ID')) {
        setState(prev => ({ 
          ...prev, 
          error: 'Configuración incorrecta. Contacta al administrador.'
        }));
      } else if (errorMessage.includes('Requested device not found')) {
        setState(prev => ({ 
          ...prev, 
          error: 'Micrófono seleccionado no encontrado. Por favor, selecciona otro dispositivo.'
        }));
      } else {
        setState(prev => ({ 
          ...prev, 
          error: errorMessage
        }));
      }
      
      throw error;
    }
  }, [conversation, options.agentId]);

  // End conversation
  const endConversation = useCallback(async () => {
    try {
      await conversation.endSession();
      stopAudioMonitoring();
      setState(prev => ({ 
        ...prev, 
        conversationId: undefined,
        messages: [],
      }));
    } catch (error) {
      console.error('Failed to end conversation:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to end conversation';
      setState(prev => ({ 
        ...prev, 
        error: errorMessage
      }));
    }
  }, [conversation]);

  // Send text message
  const sendTextMessage = useCallback((text: string) => {
    if (!state.isConnected) return;
    
    console.log('Attempting to send text message:', text);
    
    // First, add to our local state
    const newMessage: ConversationMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: text,
      timestamp: new Date(),
    };
    
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
    
    // Check what send methods are available
    console.log('Checking conversation send methods...');
    if (conversation.sendUserMessage) {
      console.log('Using sendUserMessage method');
      conversation.sendUserMessage(text);
    } else {
      console.error('sendUserMessage method not found on conversation object');
      console.log('Available methods:', Object.getOwnPropertyNames(conversation));
      console.log('Conversation object:', conversation);
    }
  }, [conversation, state.isConnected]);

  // Volume control
  const updateVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
    if (conversation.setVolume) {
      conversation.setVolume({ volume: clampedVolume });
    }
  }, [conversation]);

  // Mute control
  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
    // Note: Actual mute implementation depends on ElevenLabs SDK capabilities
  }, []);

  // Clear messages
  const clearMessages = useCallback(() => {
    setState(prev => ({ ...prev, messages: [] }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAudioMonitoring();
    };
  }, []);

  return {
    // State
    messages: state.messages,
    isConnected: state.isConnected,
    isSpeaking: state.isSpeaking,
    isListening: state.isListening,
    conversationId: state.conversationId,
    error: state.error,
    volume,
    isMuted,
    status: conversation.status,
    audioLevel: state.audioLevel,
    
    // Actions
    startConversation,
    endConversation,
    sendTextMessage,
    updateVolume,
    toggleMute,
    clearMessages,
    
    // Raw conversation object for advanced use cases
    conversation,
  };
} 