'use client';

import React, { useState } from 'react';
import { Flame, Mic, Volume2, VolumeX, MoreHorizontal } from 'lucide-react';

interface RightSidebarProps {
  isMobileOpen?: boolean;
  onToggleSidebar?: () => void;
}

export default function RightSidebar({ isMobileOpen, onToggleSidebar }: RightSidebarProps) {
  const [isListeningState, setIsListeningState] = useState(false);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMicVisualState = () => {
    setIsListeningState(!isListeningState);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <>
      <aside 
        className={`xl:block w-80 bg-gray-100 border-l border-gray-200 h-full overflow-y-auto transition-transform duration-300 ease-in-out transform ${
          isMobileOpen ? 'translate-x-0' : 'translate-x-full'
        } xl:translate-x-0 xl:static fixed top-0 right-0 z-40 xl:z-auto`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Top Stats Card */}
          <div className="bg-white rounded-lg p-4 shadow-sm mb-8">
            <div className="space-y-4">
              {/* Días de racha */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Flame className="w-5 h-5" style={{ color: '#ED8936' }} />
                  <span className="text-sm text-gray-600">días de racha</span>
                </div>
                <div className="text-lg font-bold" style={{ color: '#2A6CC8' }}>14</div>
              </div>

              {/* Meta diaria */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 rounded-full" style={{ backgroundColor: '#F56565' }}></div>
                  <span className="text-sm text-gray-600">meta diaria</span>
                </div>
                <div className="text-lg font-bold" style={{ color: '#2A6CC8' }}>75%</div>
              </div>
            </div>
          </div>

          {/* Avatar de Voz - Centro */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative">
              <div 
                className={`w-48 h-48 rounded-full border-4 transition-all duration-300 ${
                  isListeningState 
                    ? 'border-blue-400 shadow-lg shadow-blue-200 scale-105' 
                    : 'border-blue-300'
                }`}
                style={{ backgroundColor: '#E2E8F0' }}
              >
                {isListeningState && (
                  <div className="absolute inset-0 rounded-full border-4 border-blue-400 animate-ping opacity-30"></div>
                )}
              </div>
            </div>
          </div>

          {/* Controles de Interacción */}
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex justify-center space-x-4 mb-4">
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6" style={{ color: '#2A6CC8' }} />
                  ) : (
                    <Volume2 className="w-6 h-6" style={{ color: '#2A6CC8' }} />
                  )}
                </button>
                
                <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                  <MoreHorizontal className="w-6 h-6" style={{ color: '#2A6CC8' }} />
                </button>
              </div>
              <div className="flex justify-center space-x-1">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-6 rounded-full ${
                      i < (volume / 100) * 8 ? 'bg-blue-400' : 'bg-gray-300'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={toggleMicVisualState}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isListeningState 
                    ? 'bg-red-500 shadow-lg scale-110' 
                    : 'bg-red-400 hover:bg-red-500'
                }`}
              >
                <Mic className="w-6 h-6 text-white" />
              </button>
              <div className="flex-1 mx-4">
                <div className="flex space-x-1">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 h-1 rounded-full ${
                        isListeningState && i < 15 ? 'bg-blue-400' : 'bg-gray-300'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-center text-xs text-gray-500">
              {isListeningState ? 'Escuchando...' : 'Toca el micrófono para hablar'}
            </div>
          </div>
        </div>
      </aside>
      {isMobileOpen && (
        <div 
          onClick={onToggleSidebar} 
          className="fixed inset-0 bg-black opacity-50 z-30 xl:hidden"
        ></div>
      )}
    </>
  );
} 