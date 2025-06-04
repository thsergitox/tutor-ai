import { BarChart3, BookOpen, CheckCircle, Clock, Award, Zap, MessageSquare, TrendingUp, Edit3, PieChart, History, Palette, Brain, Users, Target as TargetIcon, FileText, Sliders, AlertTriangle, Briefcase, Plane, GraduationCap, Lightbulb } from 'lucide-react';

// Interfaces
export interface SidebarNavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
}

export interface WeeklyGoal {
  id: string;
  label: string;
  current: number;
  target: number;
  color: string; // Tailwind color class for progress bar
}

export interface StatCardItem {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ElementType;
  iconBgColor?: string; // Tailwind class for icon background
}

export interface ActivityDataItem {
  day: string; // e.g., 'Lun', 'Mar'
  value: number;
}

export interface WeeklyActivityData {
  weekId: string;
  weekLabel: string; // e.g., "Semana Actual", "Semana Anterior"
  data: ActivityDataItem[];
}

export interface SkillProgress {
  id: string;
  name: string;
  level: string;
  percentage: number;
  color: string; // Tailwind color class for text/badge
}

export interface SkillDetail {
  id: string;
  label: string;
  value: string;
  targetLevel: string;
  progressPercentage: number;
  objective: string;
  objectiveIcon: React.ElementType;
  skills: SkillProgress[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface OverallLevel {
  title: string;
  currentLevel: string;
  progressToNext: number; // Percentage
  nextLevel: string;
}

// --- NEW INTERFACES AND DATA FOR CUSTOM LESSONS PAGE ---

export interface LessonFilter {
  id: string;
  label: string;
}

export interface McerLevel {
  id: string;
  level: string; // e.g., A1, B1
  description: string; // e.g., Básico, Intermedio
  color?: string; // Tailwind bg color class for active state, e.g., 'bg-brand-primary'
}

export interface AiGenerationTag {
  id: string;
  label: string;
  icon?: React.ElementType; // Optional icon
}

export interface RecommendedLessonCard {
  id: string;
  level: string; // e.g., B1
  title: string;
  lessonCount: number;
  studentCount: string; // e.g., "2.4k"
  progress: number; // Percentage 0-100
  badgeText?: string; // e.g., "Más Popular", "Nuevo"
  badgeColor?: string; // Tailwind bg color class for badge
  imageUrl?: string; // Optional image for the card
}

export interface LessonCategoryCard {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType; // Icon for the category
  iconBgColor?: string; // Tailwind bg color for icon container
}

export interface NewLessonNotification {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface HelpAssistantCallout {
  title: string;
  description: string;
  buttonText: string;
  icon: React.ElementType;
}

// Mock Data
export const mockSidebarNavItems: SidebarNavItem[] = [
  { id: 'panel', label: 'Panel Principal', icon: PieChart, href: '/dashboard' }, // Updated href
  { id: 'stats', label: 'Estadísticas', icon: BarChart3, href: '/dashboard/stats' }, // Assuming sub-route
  { id: 'history', label: 'Historial', icon: History, href: '/dashboard/history' }, // Assuming sub-route
];

export const mockWeeklyGoals: WeeklyGoal[] = [
  { id: 'dailyPractice', label: 'Práctica diaria', current: 5, target: 7, color: 'bg-brand-success' },
  { id: 'newVocab', label: 'Vocab. nuevo', current: 48, target: 50, color: 'bg-brand-primary' },
  { id: 'phoneticPrecision', label: 'Precisión fónica', current: 68, target: 100, color: 'bg-brand-warning' },
];

export const mockStatCards: StatCardItem[] = [
  {
    id: 'studyTime',
    title: 'Tiempo de Estudio',
    value: '32h',
    change: '+18% vs. mes anterior',
    changeType: 'increase',
    icon: Clock,
    iconBgColor: 'bg-blue-100',
  },
  {
    id: 'completedDialogues',
    title: 'Diálogos Completados',
    value: '48',
    change: '+12% vs. mes anterior',
    changeType: 'increase',
    icon: MessageSquare,
    iconBgColor: 'bg-green-100',
  },
  {
    id: 'phoneticPrecisionRate',
    title: 'Precisión Fonética',
    value: '78%',
    change: '+5% vs. mes anterior',
    changeType: 'increase',
    icon: TargetIcon, 
    iconBgColor: 'bg-red-100',
  },
  {
    id: 'learnedVocab',
    title: 'Vocab. Aprendido',
    value: '215',
    change: '+3% vs. mes anterior',
    changeType: 'increase',
    icon: BookOpen,
    iconBgColor: 'bg-purple-100',
  },
];

export const mockWeeklyActivityData: WeeklyActivityData[] = [
  {
    weekId: 'previous2',
    weekLabel: 'Hace 2 Semanas (17 - 23 Jun)',
    data: [
      { day: 'Lun', value: 10 }, 
      { day: 'Mar', value: 25 }, 
      { day: 'Mié', value: 50 }, 
      { day: 'Jue', value: 20 }, 
      { day: 'Vie', value: 40 }, 
      { day: 'Sáb', value: 60 }, 
      { day: 'Dom', value: 30 }, 
    ]
  },
  {
    weekId: 'previous1',
    weekLabel: 'Semana Anterior (24 - 30 Jun)',
    data: [
      { day: 'Lun', value: 20 }, 
      { day: 'Mar', value: 35 }, 
      { day: 'Mié', value: 60 }, 
      { day: 'Jue', value: 30 }, 
      { day: 'Vie', value: 50 }, 
      { day: 'Sáb', value: 70 }, 
      { day: 'Dom', value: 40 }, 
    ]
  },
  {
    weekId: 'current',
    weekLabel: 'Semana Actual (1 - 7 Jul)',
    data: [
      { day: 'Lun', value: 30 }, 
      { day: 'Mar', value: 45 }, 
      { day: 'Mié', value: 70 }, 
      { day: 'Jue', value: 40 }, 
      { day: 'Vie', value: 60 }, 
      { day: 'Sáb', value: 80 }, 
      { day: 'Dom', value: 50 }, 
    ]
  },
];

export const mockWrittenSkill: SkillDetail = {
  id: 'written',
  label: 'Habilidad Escrita',
  value: 'B2',
  targetLevel: 'C1',
  progressPercentage: 42,
  objective: 'Aumentar el uso de conectores y frases idiomáticas.',
  objectiveIcon: Edit3,
  skills: [
    { id: 'coherence', name: 'Coherencia', level: '85%', percentage: 85, color: 'text-brand-primary' },
    { id: 'vocabularyWritten', name: 'Vocabulario', level: '88%', percentage: 88, color: 'text-brand-primary' },
    { id: 'grammarWritten', name: 'Gramática', level: '82%', percentage: 82, color: 'text-brand-primary' },
  ],
};

export const mockAchievement: Achievement = {
  id: 'levelB2Written',
  title: '¡Nuevo Logro!',
  description: 'Has alcanzado el nivel B2 en escritura.',
  icon: Award, 
};

export const mockOverallLevelData: OverallLevel = {
  title: 'Nivel General de Inglés',
  currentLevel: 'B1 Intermedio',
  progressToNext: 75,
  nextLevel: 'B2 Intermedio-Alto',
};

// Mock Data for Custom Lessons Page

export const mockLessonFilters: LessonFilter[] = [
  { id: 'all', label: 'Todos' },
  { id: 'conversation', label: 'Conversación' },
  { id: 'vocabulary', label: 'Vocabulario' },
  { id: 'grammar', label: 'Gramática' },
  { id: 'listening', label: 'Escucha' },
  { id: 'writing', label: 'Escritura' },
];

export const mockMcerLevels: McerLevel[] = [
  { id: 'a1', level: 'A1', description: 'Básico', color: 'bg-green-500' },
  { id: 'a2', level: 'A2', description: 'Elemental', color: 'bg-lime-500' },
  { id: 'b1', level: 'B1', description: 'Intermedio', color: 'bg-brand-primary' },
  { id: 'b2', level: 'B2', description: 'Avanzado', color: 'bg-orange-500' },
  { id: 'c1', level: 'C1', description: 'Superior', color: 'bg-red-500' },
  { id: 'c2', level: 'C2', description: 'Maestría', color: 'bg-purple-500' },
];

export const mockCurrentUserLevelId = 'b1'; // To highlight B1 in the UI

export const mockAiGenerationTags: AiGenerationTag[] = [
  { id: 'personalized', label: 'Objetivos personalizados', icon: CheckCircle },
  { id: 'adaptive', label: 'Adaptado a tu nivel', icon: Sliders },
  { id: 'fast', label: 'Listo en segundos', icon: Zap },
];

export const mockRecommendedLessons: RecommendedLessonCard[] = [
  {
    id: 'meetings',
    level: 'B1',
    title: 'Inglés para Reuniones y Presentaciones',
    lessonCount: 8,
    studentCount: '2.4k',
    progress: 25,
    badgeText: 'Más Popular',
    badgeColor: 'bg-pink-500',
  },
  {
    id: 'idioms',
    level: 'B1',
    title: 'Expresiones Idiomáticas y Phrasal Verbs',
    lessonCount: 12,
    studentCount: '1.8k',
    progress: 0,
    badgeText: 'Nuevo',
    badgeColor: 'bg-gray-800',
  },
  {
    id: 'tenses',
    level: 'B1',
    title: 'Tiempos Verbales para Narración',
    lessonCount: 6,
    studentCount: '3.1k',
    progress: 100,
  },
];

export const mockLessonCategories: LessonCategoryCard[] = [
  {
    id: 'business',
    title: 'Inglés de Negocios',
    description: 'Reuniones, presentaciones y negociación',
    icon: Briefcase, // Placeholder, replace with actual icon if available in lucide
    iconBgColor: 'bg-orange-100',
  },
  {
    id: 'travel',
    title: 'Inglés para Viajes',
    description: 'Conversaciones para turismo y hospitalidad',
    icon: Plane, // Placeholder
    iconBgColor: 'bg-teal-100',
  },
  {
    id: 'academic',
    title: 'Inglés Académico',
    description: 'Ensayos, debates y presentaciones',
    icon: GraduationCap, // Placeholder
    iconBgColor: 'bg-indigo-100',
  },
];

export const mockNewLessonNotificationData: NewLessonNotification = {
  id: 'newLessonNotif1',
  title: '¡Nueva lección disponible!',
  description: 'Lección de escritura profesional añadida a tu plan.',
  icon: BookOpen, // Or similar icon
};

export const mockHelpCalloutData: HelpAssistantCallout = {
  title: '¿Necesitas ayuda?',
  description: 'Nuestro asistente de IA puede guiarte para encontrar las lecciones más adecuadas para tus objetivos.',
  buttonText: 'Hablar con el asistente',
  icon: Lightbulb, // Placeholder
}; 

// --- NEW INTERFACES AND DATA FOR INDIVIDUAL LESSON DETAIL VIEW ---

export interface LearnedWordItem {
  id: string;
  word: string;
  definition: string;
  exampleSentence?: string;
}

export interface LessonChatItem {
  id: string; // This will be used for the route /chat/[id]
  title: string;
  status: 'completed' | 'in_progress' | 'not_started';
  icon?: React.ElementType; // e.g., MessageSquare
  description?: string;
}

export interface LessonContent {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string; // e.g., B1, B2
  estimatedTime: string; // e.g., "45 minutos"
  associatedChats: LessonChatItem[];
  learnedWords: LearnedWordItem[];
  summary: string; // Text summary for the chatbot
  coverImageUrl?: string;
}

// Mock Data for a single lesson content
export const mockActiveLessonContent: LessonContent = {
  id: 'business-negotiation-101',
  title: 'Dominando la Negociación en Inglés de Negocios',
  description: 'Aprende frases clave, estrategias y practica escenarios de negociación para cerrar tratos con confianza.',
  category: 'Inglés de Negocios',
  difficulty: 'B2 Avanzado',
  estimatedTime: '1 hora 30 minutos',
  coverImageUrl: '/images/lesson-placeholder-business.jpg', // Example path, ensure image exists or use placeholder
  associatedChats: [
    {
      id: 'negociation-warmup-chat',
      title: 'Calentamiento: Rompiendo el Hielo',
      status: 'completed',
      icon: MessageSquare,
      description: 'Practica introducciones y charla informal antes de la negociación.'
    },
    {
      id: 'price-discussion-chat',
      title: 'Escenario: Discusión de Precios',
      status: 'in_progress',
      icon: MessageSquare,
      description: 'Navega una conversación sobre precios y condiciones.'
    },
    {
      id: 'closing-deal-chat',
      title: 'Escenario: Cerrando el Trato',
      status: 'not_started',
      icon: MessageSquare,
      description: 'Practica las frases finales para asegurar un acuerdo.'
    },
  ],
  learnedWords: [
    { id: 'lw1', word: 'Leverage', definition: 'Usar algo para obtener el resultado deseado.', exampleSentence: 'She tried to leverage her connections to get the job.' },
    { id: 'lw2', word: 'Concession', definition: 'Algo que se cede en una negociación.', exampleSentence: 'The company made a concession on the price.' },
    { id: 'lw3', word: 'Counter-offer', definition: 'Una oferta hecha en respuesta a otra oferta.', exampleSentence: 'He rejected their initial proposal and made a counter-offer.' },
    { id: 'lw4', word: 'Bottom line', definition: 'El punto o factor más crucial; el precio más bajo aceptable.', exampleSentence: 'My bottom line is $50,000 for this project.' },
    { id: 'lw5', word: 'Mutual benefit', definition: 'Ventaja o ganancia para todas las partes involucradas.', exampleSentence: 'They aimed for a solution of mutual benefit.' },
  ],
  summary: 'En esta lección, has practicado cómo iniciar una negociación, discutir precios y condiciones, y cerrar un trato. Aprendiste vocabulario clave como leverage, concession, counter-offer, bottom line, y mutual benefit. ¡Sigue practicando para mejorar tus habilidades de negociación en inglés!',
};

// --- NEW INTERFACES AND DATA FOR COMMUNITY PAGE ---

export interface PopularTopic {
  id: string;
  title: string;
  postCount: number;
  status: 'active' | 'trending';
  icon: React.ElementType;
  color?: string; // for icon background or accents
}

export interface OnlineUser {
  id: string;
  name: string;
  avatarInitials: string;
  level: string; // e.g., B2, C1
  avatarColor?: string; // Tailwind bg color for avatar
}

export interface CommunityChallenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  userStreak: number;
  userPoints: number;
  userRanking: number;
  daysRemaining: number;
  icon: React.ElementType;
}

export interface TopParticipant {
  id: string;
  rank: number;
  name: string;
  avatarInitials: string;
  level: string;
  points: number;
  avatarColor?: string; // Tailwind bg color for avatar
}

export interface LanguageExchangeUser {
  id: string;
  name: string;
  avatarInitials: string;
  nativeLanguage: string;
  learningLanguage: string;
  learningLevel: string;
  avatarColor?: string; // Tailwind bg color for avatar
}

// Mock Data for Community Page

export const mockPopularTopics: PopularTopic[] = [
  {
    id: 'topic1',
    title: 'Expresiones Idiomáticas',
    postCount: 32,
    status: 'active',
    icon: Palette, // Placeholder, could be Brain, MessageSquare
    color: 'bg-orange-100'
  },
  {
    id: 'topic2',
    title: 'Gaming en Inglés',
    postCount: 28,
    status: 'active',
    icon: Users, // Placeholder, could be Gamepad2
    color: 'bg-green-100'
  },
  {
    id: 'topic3',
    title: 'Inglés Profesional',
    postCount: 45,
    status: 'trending',
    icon: Briefcase, // Placeholder
    color: 'bg-blue-100'
  },
];

export const mockOnlineUsers: OnlineUser[] = [
  { id: 'user1', name: 'María Torres', avatarInitials: 'MT', level: 'B2', avatarColor: 'bg-pink-500' },
  { id: 'user2', name: 'Juan López', avatarInitials: 'JL', level: 'C1', avatarColor: 'bg-indigo-500' },
  { id: 'user3', name: 'Karen Rodríguez', avatarInitials: 'KR', level: 'B1', avatarColor: 'bg-teal-500' },
];

export const mockCommunityChallenge: CommunityChallenge = {
  id: 'challenge1',
  title: 'Reto Global Semanal: 30 Días de Conversación',
  description: 'Participa en al menos una conversación diaria durante 30 días consecutivos. Mantén tu racha y gana puntos extra por usar el vocabulario del tema semanal. ¡Compite con otros estudiantes y alcanza la cima del leaderboard!',
  participants: 438,
  userStreak: 10,
  userPoints: 180,
  userRanking: 42,
  daysRemaining: 20,
  icon: Award, // Placeholder, could be Trophy
};

export const mockTopParticipants: TopParticipant[] = [
  { id: 'tp1', rank: 1, name: 'Laura Martínez', avatarInitials: 'LM', level: 'C1 - Avanzado', points: 320, avatarColor: 'bg-yellow-400' },
  { id: 'tp2', rank: 2, name: 'Pedro Álvarez', avatarInitials: 'PA', level: 'B2 - Intermedio Alto', points: 285, avatarColor: 'bg-gray-400' },
  { id: 'tp3', rank: 3, name: 'Carlos Mendoza', avatarInitials: 'CM', level: 'B1 - Intermedio', points: 260, avatarColor: 'bg-orange-400' },
];

export const mockLanguageExchangeUsers: LanguageExchangeUser[] = [
  {
    id: 'leu1',
    name: 'Ana Morales',
    avatarInitials: 'AM',
    nativeLanguage: 'Español',
    learningLanguage: 'Inglés',
    learningLevel: 'B2',
    avatarColor: 'bg-sky-500'
  },
  {
    id: 'leu2',
    name: 'David Brown',
    avatarInitials: 'DB',
    nativeLanguage: 'Inglés',
    learningLanguage: 'Español',
    learningLevel: 'A2',
    avatarColor: 'bg-blue-500'
  },
  {
    id: 'leu3',
    name: 'Françoise Girard',
    avatarInitials: 'FG',
    nativeLanguage: 'Francés',
    learningLanguage: 'Inglés',
    learningLevel: 'C1',
    avatarColor: 'bg-purple-500'
  },
]; 