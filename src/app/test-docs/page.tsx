'use client';

import { useConversation } from '@elevenlabs/react';
import { useCallback, useState } from 'react';

// Define possible message formats based on what we might receive
type MessageFormat = 
  | { message: string; source: string }
  | { text: string }
  | { transcript: string }
  | Record<string, unknown>;

export default function TestDocsPage() {
  const [messages, setMessages] = useState<{ text: string; timestamp: string }[]>([]);
  const [isPrivateAgent, setIsPrivateAgent] = useState(false);
  
  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected');
      addMessage('System: Connected to ElevenLabs');
    },
    onDisconnect: () => {
      console.log('Disconnected');
      addMessage('System: Disconnected from ElevenLabs');
    },
    onMessage: (message) => {
      console.log('Message:', message);
      
      // Log detailed message analysis
      console.log('Message type:', typeof message);
      console.log('Message keys:', message ? Object.keys(message) : 'null');
      
      // Check for different possible message formats
      if (message && typeof message === 'object') {
        const msg = message as MessageFormat;
        if ('message' in msg && 'source' in msg) {
          console.log('Standard format detected - source:', msg.source, 'message:', msg.message);
          addMessage(`${msg.source}: ${msg.message}`);
        } else if ('text' in msg) {
          console.log('Text format detected:', msg.text);
          addMessage(`Text: ${msg.text}`);
        } else if ('transcript' in msg) {
          console.log('Transcript format detected:', msg.transcript);
          addMessage(`Transcript: ${msg.transcript}`);
        } else {
          addMessage(`Unknown format: ${JSON.stringify(message)}`);
        }
      } else {
        addMessage(`Message: ${JSON.stringify(message)}`);
      }
    },
    onError: (error) => {
      console.error('Error:', error);
      addMessage(`Error: ${error}`);
    },
  });

  const addMessage = (text: string) => {
    setMessages(prev => [...prev, { 
      text, 
      timestamp: new Date().toLocaleTimeString() 
    }]);
  };

  const getSignedUrl = async (): Promise<string> => {
    const response = await fetch("/api/elevenlabs-signed-url");
    if (!response.ok) {
      throw new Error(`Failed to get signed url: ${response.statusText}`);
    }
    const { signedUrl } = await response.json();
    return signedUrl;
  };

  const startConversation = useCallback(async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      if (isPrivateAgent) {
        // For private agents, use signed URL
        const signedUrl = await getSignedUrl();
        await conversation.startSession({
          signedUrl,
        });
      } else {
        // For public agents, use agent ID directly
        const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
        if (!agentId) {
          throw new Error('Agent ID not configured');
        }
        await conversation.startSession({
          agentId,
        });
      }

    } catch (error) {
      console.error('Failed to start conversation:', error);
      addMessage(`Error: ${error}`);
    }
  }, [conversation, isPrivateAgent]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">
          ElevenLabs Conversational AI - Documentation Test
        </h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Agent Type</h2>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isPrivateAgent}
              onChange={(e) => setIsPrivateAgent(e.target.checked)}
              disabled={conversation.status === 'connected'}
            />
            Use Private Agent (requires API key)
          </label>
          <p className="text-sm text-gray-600 mt-2">
            {isPrivateAgent 
              ? 'Will use signed URL authentication via API route'
              : 'Will use public agent with direct agent ID'
            }
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="flex gap-2">
            <button
              onClick={startConversation}
              disabled={conversation.status === 'connected'}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Start Conversation
            </button>
            <button
              onClick={stopConversation}
              disabled={conversation.status !== 'connected'}
              className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300"
            >
              Stop Conversation
            </button>
          </div>

          <div className="flex flex-col items-center">
            <p>Status: {conversation.status}</p>
            <p>Agent is {conversation.isSpeaking ? 'speaking' : 'listening'}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Messages & Debug Log</h2>
          <div className="max-h-96 overflow-y-auto space-y-2">
            {messages.length === 0 ? (
              <p className="text-gray-500">No messages yet. Start a conversation to see logs.</p>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className="text-sm">
                  <span className="text-gray-500">[{msg.timestamp}]</span> {msg.text}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-6 mt-6">
          <h3 className="font-semibold text-yellow-800 mb-2">Important Notes:</h3>
          <ol className="text-sm text-gray-700 list-decimal list-inside space-y-2">
            <li>This implementation follows the official ElevenLabs Next.js documentation exactly</li>
            <li>No client events configuration is needed in the dashboard</li>
            <li>For public agents: Use agent ID directly</li>
            <li>For private agents: Use signed URL from server API route</li>
            <li>Check console for detailed logs of all messages received</li>
          </ol>
        </div>
      </div>
    </main>
  );
} 