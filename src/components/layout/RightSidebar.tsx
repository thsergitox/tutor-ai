'use client';

import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import { useElevenLabs } from '@/providers/ElevenLabsProvider';

interface RightSidebarProps {
  onToggleSidebar?: () => void;
  isMobileOpen?: boolean;
}

export default function RightSidebar({ 
  onToggleSidebar,
  isMobileOpen
}: RightSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showError, setShowError] = useState(false);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
  
  const {
    isConnected,
    isSpeaking,
    isListening,
    volume,
    isMuted,
    error,
    audioLevel,
    startConversation,
    endConversation,
    updateVolume,
    toggleMute,
  } = useElevenLabs();

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
        
        // Load saved preference
        const savedDeviceId = localStorage.getItem('preferredMicrophoneId');
        if (savedDeviceId && audioInputs.some(d => d.deviceId === savedDeviceId)) {
          setSelectedDeviceId(savedDeviceId);
        }
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

  // Handle microphone button click
  const handleMicrophoneClick = async () => {
    try {
      if (isConnected) {
        await endConversation();
      } else {
        await startConversation(selectedDeviceId || undefined);
      }
    } catch (err) {
      console.error('Failed to toggle conversation:', err);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  // Show error message if there's an error
  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    updateVolume(newVolume);
  };

  const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const deviceId = e.target.value;
    setSelectedDeviceId(deviceId);
    if (deviceId) {
      localStorage.setItem('preferredMicrophoneId', deviceId);
    } else {
      localStorage.removeItem('preferredMicrophoneId');
    }
  };

  return (
    <aside 
      className={`lg:block bg-gray-50 border-l border-gray-200 h-full overflow-y-auto transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-80'
      } ${
        isMobileOpen ? 'translate-x-0' : 'translate-x-full'
      } lg:translate-x-0 lg:static fixed top-0 right-0 z-40 lg:z-auto`}
    >
      <div className="p-6 space-y-6 h-full flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className={`text-lg font-semibold text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>
            Asistente de Voz
          </h2>
          <button
            onClick={toggleCollapse}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors lg:block hidden"
            aria-label={isCollapsed ? 'Expandir' : 'Colapsar'}
          >
            {isCollapsed ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>

        {/* Error Message */}
        {showError && error && (
          <div className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative ${isCollapsed ? 'hidden' : 'block'}`}>
            <span className="block sm:inline text-sm">{error}</span>
          </div>
        )}

        {/* Avatar Section */}
        <div className={`bg-white rounded-lg p-6 shadow-sm ${isCollapsed ? 'p-3' : ''}`}>
          <div className="flex flex-col items-center">
            <div className={`relative ${isCollapsed ? 'w-12 h-12' : 'w-32 h-32'} mb-4`}>
              {/* Animated Orb Avatar */}
              <div className={`${isCollapsed ? 'w-12 h-12' : 'w-32 h-32'} rounded-full relative overflow-hidden`}>
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 opacity-80"></div>
                
                {/* Animated orb layers */}
                <div className={`absolute inset-0 rounded-full ${isConnected && isListening ? 'animate-pulse' : ''}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent rounded-full"></div>
                </div>
                
                {/* Voice activity ripples - now triggered by actual audio level */}
                {isConnected && isListening && audioLevel > 0.03 && (
                  <>
                    <div 
                      className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"
                      style={{ 
                        animationDuration: `${1.5 - audioLevel}s`,
                        opacity: audioLevel 
                      }}
                    ></div>
                    <div 
                      className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" 
                      style={{ 
                        animationDelay: '0.5s',
                        animationDuration: `${1.5 - audioLevel}s`,
                        opacity: audioLevel * 0.8 
                      }}
                    ></div>
                    <div 
                      className="absolute inset-0 rounded-full border-2 border-white/10 animate-ping" 
                      style={{ 
                        animationDelay: '1s',
                        animationDuration: `${1.5 - audioLevel}s`,
                        opacity: audioLevel * 0.6 
                      }}
                    ></div>
                  </>
                )}
                
                {/* Speaking animation */}
                {isConnected && isSpeaking && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex space-x-1">
                      <div className="w-1 h-8 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1 h-12 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1 h-10 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      <div className="w-1 h-14 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: '450ms' }}></div>
                      <div className="w-1 h-8 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                    </div>
                  </div>
                )}
                
                {/* Center glow effect - reacts to audio level */}
                <div className={`absolute inset-0 flex items-center justify-center ${isCollapsed ? 'scale-75' : ''}`}>
                  <div 
                    className={`${isCollapsed ? 'w-6 h-6' : 'w-16 h-16'} rounded-full bg-white/20 blur-xl transition-all duration-100`}
                    style={{
                      transform: `scale(${1 + audioLevel * 0.5})`,
                      opacity: 0.2 + audioLevel * 0.8
                    }}
                  ></div>
                </div>
              </div>
              
              {/* Connection status indicator */}
              <div className={`absolute -bottom-1 -right-1 ${isCollapsed ? 'w-3 h-3' : 'w-6 h-6'} rounded-full flex items-center justify-center ${
                isConnected ? 'bg-green-500' : 'bg-gray-400'
              }`}>
                <div className={`${isCollapsed ? 'w-1.5 h-1.5' : 'w-3 h-3'} rounded-full bg-white`}></div>
              </div>
            </div>
            {!isCollapsed && (
              <>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">TutorAI</h3>
                <p className="text-sm text-gray-600 text-center">
                  {isConnected 
                    ? (isSpeaking ? 'Hablando...' : isListening ? 'Escuchando...' : 'Conectado')
                    : 'Presiona el micrófono para hablar'}
                </p>
                {/* Voice Activity Indicator */}
                {isConnected && isListening && (
                  <div className="mt-2 w-full max-w-[200px]">
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-100"
                        style={{ width: `${audioLevel * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-center">
                      {audioLevel > 0.03 ? 'Detectando voz...' : 'Sin actividad de voz'}
                    </p>
                  </div>
                )}
                {/* Transcript Status Note */}
                {!isConnected && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-700">
                      <strong>Nota:</strong> Si no ves transcripciones, verifica que tu agente en ElevenLabs tenga habilitada la voz y no esté en modo solo texto.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Voice Controls */}
        <div className={`bg-white rounded-lg p-6 shadow-sm ${isCollapsed ? 'p-3' : ''}`}>
          {!isCollapsed && <h4 className="text-sm font-semibold text-gray-700 mb-4">Controles de Voz</h4>}
          
          {/* Microphone Selector */}
          {!isCollapsed && !isConnected && (
            <div className="mb-4">
              <label className="text-xs text-gray-600 block mb-2">Seleccionar Micrófono</label>
              <select
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleDeviceChange}
                value={selectedDeviceId}
              >
                <option value="">Micrófono por defecto</option>
                {audioDevices.map(device => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label || `Micrófono ${device.deviceId.substring(0, 8)}`}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {audioDevices.length === 0 
                  ? 'No se encontraron micrófonos. Verifica los permisos.'
                  : `${audioDevices.length} micrófono(s) disponible(s)`}
              </p>
            </div>
          )}
          
          {/* Current Microphone Display */}
          {!isCollapsed && isConnected && selectedDeviceId && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">Micrófono actual:</p>
              <p className="text-sm text-gray-800 font-medium truncate">
                {audioDevices.find(d => d.deviceId === selectedDeviceId)?.label || 'Micrófono seleccionado'}
              </p>
            </div>
          )}
          
          <div className={`flex ${isCollapsed ? 'flex-col' : 'flex-row'} items-center justify-center gap-4`}>
            <button
              onClick={handleMicrophoneClick}
              className={`p-4 rounded-full transition-all duration-200 ${
                isConnected 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              } ${isCollapsed ? 'p-3' : ''} ${
                isConnected && audioLevel > 0.03 ? 'ring-4 ring-blue-300 ring-opacity-50' : ''
              }`}
              aria-label={isConnected ? 'Detener conversación' : 'Iniciar conversación'}
            >
              {isConnected ? (
                <MicOff className={isCollapsed ? 'w-5 h-5' : 'w-6 h-6'} />
              ) : (
                <Mic className={isCollapsed ? 'w-5 h-5' : 'w-6 h-6'} />
              )}
            </button>
            
            <button
              onClick={toggleMute}
              className={`p-3 rounded-full transition-all duration-200 ${
                isMuted 
                  ? 'bg-gray-300 text-gray-600' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              } ${isCollapsed ? 'p-2' : ''}`}
              aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
            >
              {isMuted ? (
                <VolumeX className={isCollapsed ? 'w-4 h-4' : 'w-5 h-5'} />
              ) : (
                <Volume2 className={isCollapsed ? 'w-4 h-4' : 'w-5 h-5'} />
              )}
            </button>
          </div>

          {/* Volume Slider */}
          {!isCollapsed && !isMuted && (
            <div className="mt-4">
              <label className="text-xs text-gray-600 block mb-2">Volumen</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Tips Section */}
        {!isCollapsed && (
          <div className="bg-blue-50 rounded-lg p-4 mt-auto">
            <h4 className="text-sm font-semibold text-blue-800 mb-2">💡 Consejos</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Habla claramente y a un ritmo natural</li>
              <li>• Espera a que el avatar termine de hablar</li>
              <li>• Puedes interrumpir diciendo &quot;Para&quot;</li>
              <li>• {audioLevel > 0.03 ? '🎤 El micrófono está captando tu voz' : 'El micrófono está listo para escuchar'}</li>
            </ul>
          </div>
        )}
      </div>
      
      {isMobileOpen && (
        <div 
          onClick={onToggleSidebar} 
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
        ></div>
      )}
    </aside>
  );
} 