import { useCallback, useRef, useState } from 'react';

export interface WebSocketMessage {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
  isTranscript?: boolean;
}

export interface UseElevenLabsWebSocketOptions {
  agentId?: string;
  apiKey?: string;
  onMessage?: (message: WebSocketMessage) => void;
  onError?: (error: string) => void;
}

export function useElevenLabsWebSocket(options: UseElevenLabsWebSocketOptions = {}) {
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string>();
  const wsRef = useRef<WebSocket | null>(null);

  const connect = useCallback(async () => {
    try {
      const agentId = options.agentId || process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
      const apiKey = options.apiKey || process.env.ELEVENLABS_API_KEY;
      
      if (!agentId || !apiKey) {
        throw new Error('Agent ID and API Key are required');
      }

      // Construct WebSocket URL based on ElevenLabs documentation
      const wsUrl = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${agentId}`;
      
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        
        // Send authentication
        ws.send(JSON.stringify({
          type: 'authentication',
          api_key: apiKey
        }));
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('WebSocket message received:', data);

        // Handle different event types based on documentation
        switch (data.type) {
          case 'conversation_initiation_metadata':
            console.log('Conversation initialized:', data);
            break;
            
          case 'user_transcript':
            // This is what we're missing in the current implementation!
            const userTranscript = data.user_transcription_event?.user_transcript;
            if (userTranscript) {
              const message: WebSocketMessage = {
                id: `user-${Date.now()}`,
                type: 'user',
                content: userTranscript,
                timestamp: new Date(),
                isTranscript: true
              };
              setMessages(prev => [...prev, message]);
              options.onMessage?.(message);
            }
            break;
            
          case 'agent_response':
            const agentResponse = data.agent_response_event?.agent_response;
            if (agentResponse) {
              const message: WebSocketMessage = {
                id: `agent-${Date.now()}`,
                type: 'agent',
                content: agentResponse,
                timestamp: new Date()
              };
              setMessages(prev => [...prev, message]);
              options.onMessage?.(message);
            }
            break;
            
          case 'audio':
            // Handle audio playback
            console.log('Audio event received');
            break;
            
          case 'ping':
            // Respond to ping
            ws.send(JSON.stringify({ type: 'pong' }));
            break;
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setError('WebSocket connection error');
        options.onError?.('WebSocket connection error');
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
      };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect';
      setError(errorMessage);
      options.onError?.(errorMessage);
    }
  }, [options]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  const sendAudio = useCallback((audioData: ArrayBuffer) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      // Convert audio to base64 and send
      const base64Audio = btoa(String.fromCharCode(...new Uint8Array(audioData)));
      wsRef.current.send(JSON.stringify({
        type: 'audio',
        audio_base_64: base64Audio
      }));
    }
  }, []);

  const sendUserMessage = useCallback((text: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'user_message',
        text: text
      }));
    }
  }, []);

  return {
    messages,
    isConnected,
    error,
    connect,
    disconnect,
    sendAudio,
    sendUserMessage
  };
} 