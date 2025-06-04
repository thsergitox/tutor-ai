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