import { LucideIcon } from 'lucide-react';

export type AppID = 'explorer' | 'edge' | 'word' | 'powerpoint' | 'calculator' | 'calendar' | 'copilot' | 'settings' | 'videoplayer';

export interface AppConfig {
  id: AppID;
  title: string;
  icon: LucideIcon;
  color: string; // Tailwind text color class
  bgColor: string; // Tailwind bg color class
  preferredWidth?: number;
  preferredHeight?: number;
}

export interface WindowState {
  id: AppID;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
}

export interface DesktopState {
  windows: Record<AppID, WindowState>;
  activeWindowId: AppID | null;
  isStartMenuOpen: boolean;
  isCalendarOpen: boolean;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}