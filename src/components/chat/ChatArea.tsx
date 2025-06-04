'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import { useElevenLabs } from '@/providers/ElevenLabsProvider';

interface ChatAreaProps {
  onToggleRightSidebar?: () => void;
}

export default function ChatArea({ onToggleRightSidebar }: ChatAreaProps) {
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const {
    messages,
    isConnected,
    isSpeaking,
    isListening,
    sendTextMessage,
    startConversation,
    endConversation,
  } = useElevenLabs();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Show typing indicator when AI is speaking
  useEffect(() => {
    setIsTyping(isSpeaking);
  }, [isSpeaking]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && isConnected) {
      sendTextMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleMicToggle = async () => {
    try {
      if (isConnected) {
        await endConversation();
      } else {
        await startConversation();
      }
    } catch (error) {
      console.error('Failed to toggle conversation:', error);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Conversación con TutorAI</h2>
            <p className="text-sm text-gray-600">
              {isConnected 
                ? (isSpeaking ? 'Hablando...' : isListening ? 'Escuchando...' : 'Conectado')
                : 'Desconectado'}
            </p>
          </div>
          <button
            onClick={onToggleRightSidebar}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Mic className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                ¡Comienza una conversación!
              </h3>
              <p className="text-sm text-gray-500 max-w-sm mx-auto">
                Haz clic en el micrófono para hablar con TutorAI o escribe un mensaje para comenzar.
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                    {message.isTranscript && ' • Transcrito'}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <button
            type="button"
            onClick={handleMicToggle}
            className={`p-3 rounded-full transition-all duration-200 ${
              isConnected
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
            aria-label={isConnected ? 'Detener conversación' : 'Iniciar conversación'}
          >
            {isConnected ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </button>
          
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={isConnected ? "Escribe un mensaje..." : "Inicia la conversación primero"}
            className="flex-1 px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={!isConnected}
          />
          
          <button
            type="submit"
            disabled={!inputMessage.trim() || !isConnected}
            className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        
        {!isConnected && (
          <p className="text-xs text-gray-500 mt-2 text-center">
            Presiona el micrófono para comenzar la conversación
          </p>
        )}
      </div>
    </div>
  );
} 