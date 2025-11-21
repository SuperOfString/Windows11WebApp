import React, { useState, useEffect } from 'react';
import { AppID, AppConfig, WindowState } from '../types';
import { Search, Wifi, Battery, Volume2 } from 'lucide-react';

interface TaskbarProps {
  apps: Record<AppID, AppConfig>;
  windows: Record<AppID, WindowState>;
  activeWindowId: AppID | null;
  isStartMenuOpen: boolean;
  onToggleStart: () => void;
  onAppClick: (id: AppID) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({
  apps,
  windows,
  activeWindowId,
  isStartMenuOpen,
  onToggleStart,
  onAppClick
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' });
  };

  // Pinned apps order
  const pinnedApps: AppID[] = ['explorer', 'edge', 'word', 'excel', 'powerpoint', 'videoplayer', 'photos', 'calendar', 'calculator', 'copilot'];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-[#f3f3f3]/90 backdrop-blur-xl flex items-center justify-between px-3 z-50 border-t border-white/40 shadow-lg">
      
      {/* Weather / Widgets Placeholder (Left) */}
      <div className="hidden md:flex items-center w-32 pl-2 hover:bg-white/50 rounded-md transition-colors cursor-pointer py-1">
        <div className="flex flex-col leading-none">
          <span className="text-xs font-semibold text-gray-700">72°F</span>
          <span className="text-[10px] text-gray-500">Mostly Sunny</span>
        </div>
      </div>

      {/* Center Icons */}
      <div className="flex-1 flex items-center justify-center space-x-1">
        {/* Start Button */}
        <button
          onClick={onToggleStart}
          className={`p-2 rounded-md transition-all duration-200 hover:bg-white/60 active:scale-95 ${isStartMenuOpen ? 'bg-white/60 shadow-inner' : ''}`}
        >
           <svg viewBox="0 0 24 24" className="w-6 h-6">
            <path fill="#00ADEF" d="M0 3.44L9.38 2.11v9.03H0V3.44zm0 17.12L9.38 21.9v-9.03H0v7.67zm10.94 1.55L24 24V12.86H10.94v9.25zM24 0L10.94 1.89v9.25H24V0z"/>
           </svg>
        </button>

        {/* Search (Visual Only) */}
        <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-md hover:bg-white/60 cursor-pointer group">
            <Search className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
        </div>

        {/* App Icons */}
        {pinnedApps.map((id) => {
          const app = apps[id];
          const isOpen = windows[id].isOpen;
          const isActive = activeWindowId === id && !windows[id].isMinimized;

          return (
            <button
              key={id}
              onClick={() => onAppClick(id)}
              className={`relative group w-10 h-10 flex items-center justify-center rounded-md transition-all duration-200 hover:bg-white/60 active:scale-95 ${isActive ? 'bg-white/40' : ''}`}
              title={app.title}
            >
              <app.icon className={`w-6 h-6 ${app.color} filter drop-shadow-sm`} />
              
              {/* Open Indicator Dot */}
              {isOpen && (
                <span className={`absolute bottom-0.5 w-1.5 h-1 rounded-full transition-all duration-200 ${isActive ? 'w-4 bg-blue-500' : 'bg-gray-400'}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* System Tray (Right) */}
      <div className="flex items-center justify-end space-x-2 w-32">
        <div className="hidden sm:flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-white/60 cursor-pointer">
            <Wifi className="w-4 h-4 text-gray-700" />
            <Volume2 className="w-4 h-4 text-gray-700" />
            <Battery className="w-4 h-4 text-gray-700" />
        </div>
        <div className="flex flex-col items-end px-2 py-1 rounded-md hover:bg-white/60 cursor-pointer" onClick={() => onAppClick('calendar')}>
          <span className="text-xs font-medium text-gray-800">{formatTime(time)}</span>
          <span className="text-[10px] text-gray-600">{formatDate(time)}</span>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;