'use client';

import { useElevenLabs } from '@/providers/ElevenLabsProvider';
import { ElevenLabsProvider } from '@/providers/ElevenLabsProvider';
import { useState, useEffect } from 'react';

function TestContent() {
  const {
    messages,
    isConnected,
    isSpeaking,
    isListening,
    error,
    audioLevel,
    startConversation,
    endConversation,
    sendTextMessage,
  } = useElevenLabs();

  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
  const [textInput, setTextInput] = useState<string>('');

  // Get available audio devices
  useEffect(() => {
    const getAudioDevices = async () => {
      try {
        // Request permission first to get device labels
        await navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => stream.getTracks().forEach(track => track.stop()));
        
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioInputs = devices.filter(device => device.kind === 'audioinput');
        setAudioDevices(audioInputs);
      } catch (err) {
        console.error('Failed to enumerate devices:', err);
      }
    };

    getAudioDevices();

    // Listen for device changes
    navigator.mediaDevices.addEventListener('devicechange', getAudioDevices);
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', getAudioDevices);
    };
  }, []);

  const handleStartConversation = async () => {
    try {
      await startConversation(selectedDeviceId || undefined);
    } catch (err) {
      console.error('Failed to start conversation:', err);
    }
  };

  const handleSendText = () => {
    if (textInput.trim() && isConnected) {
      sendTextMessage(textInput.trim());
      setTextInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Eleven Labs Integration Test</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Microphone Selection</h2>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedDeviceId}
            onChange={(e) => setSelectedDeviceId(e.target.value)}
            disabled={isConnected}
          >
            <option value="">Default Microphone</option>
            {audioDevices.map(device => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Microphone ${device.deviceId.substring(0, 8)}`}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-2">
            Found {audioDevices.length} microphone(s). Select one before starting the conversation.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
          <div className="space-y-2">
            <p>Connected: <span className={isConnected ? 'text-green-600' : 'text-red-600'}>{isConnected ? 'Yes' : 'No'}</span></p>
            <p>Speaking: <span className={isSpeaking ? 'text-green-600' : 'text-gray-600'}>{isSpeaking ? 'Yes' : 'No'}</span></p>
            <p>Listening: <span className={isListening ? 'text-green-600' : 'text-gray-600'}>{isListening ? 'Yes' : 'No'}</span></p>
            {error && <p className="text-red-600">Error: {error}</p>}
          </div>
          
          {/* Audio Level Visualization */}
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Audio Level: {(audioLevel * 100).toFixed(0)}%</p>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-100"
                style={{ width: `${audioLevel * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {audioLevel > 0.03 ? '🎤 Voice detected!' : 'No voice activity'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Controls</h2>
          <div className="space-x-4">
            <button
              onClick={isConnected ? endConversation : handleStartConversation}
              className={`px-4 py-2 rounded ${
                isConnected 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isConnected ? 'End Conversation' : 'Start Conversation'}
            </button>
            
            {isConnected && (
              <button
                onClick={() => sendTextMessage('Hello from test!')}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
                Send Test Message
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Text Input Test</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendText()}
              placeholder="Type a message and press Enter"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!isConnected}
            />
            <button
              onClick={handleSendText}
              disabled={!isConnected || !textInput.trim()}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:bg-gray-300"
            >
              Send
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Test sending text messages to see if they appear in the message list
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Messages ({messages.length})</h2>
          {messages.length === 0 ? (
            <p className="text-gray-500">No messages yet. Start a conversation and speak to see transcripts.</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {messages.map((msg) => (
                <div key={msg.id} className={`p-3 rounded ${msg.type === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <p className="font-semibold">{msg.type === 'user' ? 'User' : 'AI'}</p>
                  <p>{msg.content}</p>
                  <p className="text-xs text-gray-500">
                    {msg.timestamp.toLocaleTimeString()}
                    {msg.isTranscript && ' (Transcript)'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Debug Info & Troubleshooting</h2>
          <p className="text-sm text-gray-600">
            Check the browser console (F12) for detailed logs.
          </p>
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm font-semibold text-yellow-800 mb-2">🔍 Troubleshooting Steps:</p>
            <ol className="text-sm text-gray-700 list-decimal list-inside space-y-2">
              <li>Open browser console and look for &quot;=== ElevenLabs onMessage received ===&quot;</li>
              <li>Try sending a text message using the input above - do you see it in the console?</li>
              <li>Speak clearly after starting conversation - check if any messages appear in console</li>
              <li>Look for &quot;Message from user:&quot; or &quot;Message from ai:&quot; in the logs</li>
            </ol>
            
            <p className="text-sm font-semibold text-yellow-800 mb-2 mt-4">⚠️ Common Issues:</p>
            <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
              <li><strong>No transcripts:</strong> Agent might be in text-only mode</li>
              <li><strong>No messages at all:</strong> WebSocket connection issue</li>
              <li><strong>Only AI messages:</strong> Voice input not being processed</li>
            </ul>
            
            <p className="text-sm font-semibold text-yellow-800 mb-2 mt-4">📋 Agent Requirements:</p>
            <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
              <li>Voice must be enabled (not text-only)</li>
              <li>Language settings must match your speech</li>
              <li>No privacy settings blocking transcripts</li>
              <li>Agent must be properly configured with voice capabilities</li>
            </ul>
            
            <p className="text-sm font-semibold text-red-800 mb-2 mt-4">🚨 CRITICAL: Client Events Configuration</p>
            <div className="bg-red-50 border border-red-200 rounded p-3 mt-2">
              <p className="text-sm text-gray-700 font-semibold mb-2">To fix transcript issues, you MUST:</p>
              <ol className="text-sm text-gray-700 list-decimal list-inside space-y-2">
                <li>Go to your ElevenLabs Dashboard</li>
                <li>Navigate to your agent settings</li>
                <li>Go to <strong>Advanced → Client Events</strong></li>
                <li>Add these two events:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li><code className="bg-gray-100 px-1 rounded">agent_response</code></li>
                    <li><code className="bg-gray-100 px-1 rounded">user_transcript</code></li>
                  </ul>
                </li>
                <li>Save your agent configuration</li>
                <li>Refresh this page and try again</li>
              </ol>
              <p className="text-xs text-gray-600 mt-3">
                Without these client events configured, the SDK cannot receive transcripts!
              </p>
            </div>
            
            <p className="text-sm font-semibold text-blue-800 mb-2 mt-4">💡 SDK Version Info</p>
            <div className="bg-blue-50 rounded p-3">
              <p className="text-sm text-gray-700">
                Using <code className="bg-gray-100 px-1 rounded">@elevenlabs/react v0.1.6</code>
              </p>
              <p className="text-xs text-gray-600 mt-1">
                This version requires client events to be configured for transcript handling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestPage() {
  return (
    <ElevenLabsProvider>
      <TestContent />
    </ElevenLabsProvider>
  );
} 