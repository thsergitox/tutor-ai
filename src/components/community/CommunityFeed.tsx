'use client';

import React from 'react';
import Link from 'next/link';
import {
  mockCommunityChallenge,
  mockTopParticipants,
  mockLanguageExchangeUsers,
  CommunityChallenge,
  TopParticipant,
  LanguageExchangeUser,
} from '@/model/lessonsData';
import {
  ChevronDown,
  PlusCircle,
  Users,
  Award,
  MessageCircle, // For Iniciar Conversacion / Conectar
  TrendingUp,
  Info, // For days remaining
} from 'lucide-react';

const StatCard: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg text-center shadow-sm">
    <p className="text-2xl font-bold text-brand-primary">{value}</p>
    <p className="text-xs text-gray-600">{label}</p>
  </div>
);

export default function CommunityFeed() {
  const challenge = mockCommunityChallenge;
  const topParticipants = mockTopParticipants;
  const exchangeUsers = mockLanguageExchangeUsers;

  return (
    <div className="flex-1 bg-gray-50 p-6 sm:p-8 overflow-y-auto">
      {/* Header: Title, Filter, Create Post Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Comunidad de Aprendizaje</h1>
          <p className="text-sm text-gray-600 mt-1">Conecta, practica y aprende con otros estudiantes.</p>
        </div>
      </div>

      {/* Reto Global Semanal */}
      <div className="bg-gradient-to-br from-brand-primary to-blue-600 text-white p-6 sm:p-8 rounded-xl shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 opacity-20">
          <Award className="w-full h-full text-white" />
        </div>
        <div className="flex justify-between items-start mb-3">
            <h2 className="text-xl sm:text-2xl font-semibold flex items-center">
                <challenge.icon className="w-6 h-6 mr-2.5 opacity-80" />
                {challenge.title}
            </h2>
            <span className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center">
                <Info className="w-3.5 h-3.5 mr-1.5" /> {challenge.daysRemaining} días restantes
            </span>
        </div>
        <p className="text-sm opacity-90 mb-6 max-w-3xl">{challenge.description}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <StatCard label="Participantes" value={challenge.participants} />
          <StatCard label="Tu racha actual" value={challenge.userStreak} />
          <StatCard label="Tus puntos" value={challenge.userPoints} />
          <StatCard label="Tu ranking" value={`#${challenge.userRanking}`} />
        </div>
      </div>

      {/* Top Participantes */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-800">Top Usuarios de la Semana</h2>
          <Link href="/community/leaderboard/all" className="text-sm font-medium text-brand-primary hover:underline">
            Ver todos
          </Link>
        </div>
        <div className="space-y-4">
          {topParticipants.map((participant) => (
            <div key={participant.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-lg font-semibold text-gray-400 w-6 text-center">{participant.rank}</span>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${participant.avatarColor || 'bg-brand-secondary'}`}>
                {participant.avatarInitials}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{participant.name}</p>
                <p className="text-xs text-gray-500">{participant.level}</p>
              </div>
              <p className="text-md font-bold text-brand-primary">{participant.points} pts</p>
            </div>
          ))}
        </div>
      </div>

      {/* Intercambio de Idiomas */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">Intercambio de Idiomas</h2>
          <div className="flex items-center space-x-3">
            <Link href="/community/exchanges/all" className="text-sm font-medium text-brand-primary hover:underline">
              Ver todos
            </Link>
            <button className="bg-brand-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:brightness-90 transition-colors flex items-center">
              <Users className="w-4 h-4 mr-2" /> Encontrar compañero
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-6 max-w-3xl">
          Conecta con hablantes nativos y otros estudiantes para practicar conversación. Intercambia tu idioma nativo por la oportunidad de practicar inglés en un ambiente colaborativo y sin presiones.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {exchangeUsers.map((user) => (
            <div key={user.id} className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-semibold mb-3 ${user.avatarColor || 'bg-brand-secondary'}`}>
                  {user.avatarInitials}
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">{user.name}</h4>
                <div className="text-xs text-gray-500 mb-3">
                  <span>Habla: {user.nativeLanguage}</span>
                  <span className="mx-1.5">|</span>
                  <span>Aprende: {user.learningLanguage} ({user.learningLevel})</span>
                </div>
                <button className="w-full bg-brand-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:brightness-90 transition-colors flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 mr-2" /> Conectar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// Need to add Link to imports if not already done, but it's not used here directly yet.
// For now, the links in Top Participantes and Intercambio de Idiomas sections are placeholders.
// If actual navigation is needed, import Link from 'next/link'. 