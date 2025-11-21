import { 
  Monitor, 
  Globe, 
  FileText, 
  Calculator, 
  Calendar as CalendarIcon, 
  Bot, 
  Settings,
  FolderClosed,
  Presentation,
  Video,
  Image,
  FileSpreadsheet
} from 'lucide-react';
import { AppConfig, AppID, DesktopState } from './types';

export const APPS: Record<AppID, AppConfig> = {
  explorer: {
    id: 'explorer',
    title: 'File Explorer',
    icon: FolderClosed,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-100',
    preferredWidth: 800,
    preferredHeight: 600
  },
  edge: {
    id: 'edge',
    title: 'Edge',
    icon: Globe,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
    preferredWidth: 1000,
    preferredHeight: 700
  },
  word: {
    id: 'word',
    title: 'Word',
    icon: FileText,
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    preferredWidth: 900,
    preferredHeight: 700
  },
  excel: {
    id: 'excel',
    title: 'Excel',
    icon: FileSpreadsheet,
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    preferredWidth: 1000,
    preferredHeight: 700
  },
  powerpoint: {
    id: 'powerpoint',
    title: 'PowerPoint',
    icon: Presentation,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    preferredWidth: 1000,
    preferredHeight: 700
  },
  videoplayer: {
    id: 'videoplayer',
    title: 'Media Player',
    icon: Video,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    preferredWidth: 800,
    preferredHeight: 600
  },
  photos: {
    id: 'photos',
    title: 'Photos',
    icon: Image,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
    preferredWidth: 900,
    preferredHeight: 700
  },
  calculator: {
    id: 'calculator',
    title: 'Calculator',
    icon: Calculator,
    color: 'text-orange-500',
    bgColor: 'bg-orange-100',
    preferredWidth: 320,
    preferredHeight: 500
  },
  calendar: {
    id: 'calendar',
    title: 'Calendar',
    icon: CalendarIcon,
    color: 'text-red-500',
    bgColor: 'bg-red-100',
    preferredWidth: 800,
    preferredHeight: 600
  },
  copilot: {
    id: 'copilot',
    title: 'Copilot',
    icon: Bot,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-100',
    preferredWidth: 400,
    preferredHeight: 800
  },
  settings: {
    id: 'settings',
    title: 'Settings',
    icon: Settings,
    color: 'text-gray-500',
    bgColor: 'bg-gray-100',
    preferredWidth: 800,
    preferredHeight: 600
  }
};

export const INITIAL_STATE: DesktopState = {
  windows: {
    explorer: { id: 'explorer', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    edge: { id: 'edge', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 2 },
    word: { id: 'word', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 3 },
    excel: { id: 'excel', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 4 },
    powerpoint: { id: 'powerpoint', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 5 },
    videoplayer: { id: 'videoplayer', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 6 },
    photos: { id: 'photos', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 7 },
    calculator: { id: 'calculator', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 8 },
    calendar: { id: 'calendar', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 9 },
    copilot: { id: 'copilot', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    settings: { id: 'settings', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 11 },
  },
  activeWindowId: null,
  isStartMenuOpen: false,
  isCalendarOpen: false,
};

export const WALLPAPER_URL = "https://picsum.photos/id/15/1920/1080"; // Scenic waterfall/nature