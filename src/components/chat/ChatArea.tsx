'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send } from 'lucide-react';

interface Message {
  id: number;
  type: 'bot' | 'user';
  content: string;
  timestamp: string;
  pronunciation?: 'good' | 'fair' | 'poor';
}

interface WordSuggestion {
  word: string;
  suggestion: string;
}

interface ChatAreaProps {
  onActivateMic?: () => void;
}

export default function ChatArea({ onActivateMic }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: "Good morning! I'm Sarah from TechCorp. Thanks for coming in today. Could you tell me a bit about your experience with software development?",
      timestamp: '10:32 AM'
    },
    {
      id: 2,
      type: 'user',
      content: "Good morning! Thank you for having me. I have been working as a software developer for three years, focusing on applications and database management.",
      timestamp: '10:33 AM',
      pronunciation: 'good'
    },
    {
      id: 3,
      type: 'bot',
      content: "That's great! And what specific technologies are you most comfortable with?",
      timestamp: '10:33 AM'
    },
    // Add more messages to test scrolling
    {
      id: 4,
      type: 'user',
      content: "I am proficient in JavaScript, React, Node.js, and Python. I also have experience with SQL and NoSQL databases like PostgreSQL and MongoDB.",
      timestamp: '10:34 AM'
    },
    {
      id: 5,
      type: 'bot',
      content: "Excellent. Can you describe a challenging project you worked on and how you overcame the obstacles?",
      timestamp: '10:35 AM'
    },
    {
      id: 6,
      type: 'user',
      content: "Certainly. In my previous role, we had to migrate a legacy system to a new microservices architecture under a tight deadline. The main challenge was ensuring data integrity and minimizing downtime...",
      timestamp: '10:36 AM'
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isInputMicListening, setIsInputMicListening] = useState(false);
  const messagesContainerRef = useRef<null | HTMLDivElement>(null);

  // Simulación de detección de palabras nuevas
  const wordSuggestion: WordSuggestion = {
    word: 'specific',
    suggestion: 'Intenta usar "I am proficient in..." o "I specialize in..." para sonar más profesional en entrevistas.'
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        type: 'user',
        content: inputText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleMicClick = () => {
    setIsInputMicListening(!isInputMicListening);
    if (onActivateMic) {
      onActivateMic();
    }
    // Add actual voice input logic here in the future
  };

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Messages Area - This will scroll */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto space-y-4 p-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="max-w-[70%]">
              <div
                className={`rounded-lg px-4 py-3 shadow-sm ${
                  message.type === 'user'
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
                style={{
                  backgroundColor: message.type === 'user' ? '#2A6CC8' : '#F3F4F6' // Explicit bg for bot
                }}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                {message.pronunciation && (
                  <div className="mt-2 text-xs opacity-90">
                    ✓ Muy buena pronunciación
                  </div>
                )}
              </div>
              <div className="text-xs text-gray-500 mt-1 px-1">
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Word Suggestion (Fixed above input area) */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div 
          className="border-l-4 bg-orange-50 p-4 rounded-r-lg"
          style={{ borderColor: '#ED8936' }}
        >
          <div className="flex items-start">
            <div className="flex-1">
              <h4 
                className="text-sm font-semibold mb-1"
                style={{ color: '#ED8936' }}
              >
                ✨ Sugerencia Personalizada
              </h4>
              <p className="text-sm text-gray-700">
                {wordSuggestion.suggestion}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Input Area (Fixed at the bottom) */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            <div 
              className="flex items-end border-2 rounded-lg px-4 py-3 bg-white shadow-sm"
              style={{ borderColor: '#2A6CC8' }}
            >
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu respuesta..."
                className="flex-1 resize-none outline-none text-sm bg-transparent"
                rows={1}
                style={{ minHeight: '24px', maxHeight: '100px' }} // Adjusted minHeight
              />
              <div className="flex items-center space-x-2 ml-3">
                <button
                  onClick={handleMicClick}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    isInputMicListening 
                      ? 'bg-red-500 shadow-lg scale-110' 
                      : 'bg-red-400 hover:bg-red-500'
                  }`}
                >
                  <Mic className="w-5 h-5 text-white" /> {/* Increased icon size */}
                </button>
                <button
                  onClick={handleSendMessage}
                  className="p-2 rounded-full transition-colors duration-200 text-white"
                  style={{ backgroundColor: '#2A6CC8' }}
                  disabled={!inputText.trim()}
                >
                  <Send className="w-5 h-5" /> {/* Increased icon size */}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Status indicator */}
        <div className="mt-2 text-center">
          <div className="text-xs text-gray-500">
            {isInputMicListening ? '🎤 Escuchando...' : 'Presiona Enter para enviar o usa el micrófono'}
          </div>
        </div>
      </div>
    </div>
  );
} 