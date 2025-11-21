import React from 'react';
import { AppID, AppConfig } from '../types';
import { Search, Power, User, ChevronRight } from 'lucide-react';

interface StartMenuProps {
  isOpen: boolean;
  apps: Record<AppID, AppConfig>;
  onAppClick: (id: AppID) => void;
  onClose: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ isOpen, apps, onAppClick }) => {
  if (!isOpen) return null;

  // Define grid apps for the start menu
  const pinnedApps: AppID[] = ['edge', 'word', 'excel', 'powerpoint', 'explorer', 'videoplayer', 'photos', 'calendar', 'calculator', 'copilot', 'settings'];

  return (
    <div className="fixed bottom-14 left-1/2 transform -translate-x-1/2 w-[640px] h-[600px] max-w-[95vw] max-h-[80vh] bg-[#f3f3f3]/95 backdrop-blur-2xl rounded-lg shadow-2xl border border-white/40 z-50 flex flex-col overflow-hidden transition-all animate-in slide-in-from-bottom-10 duration-200">
      
      {/* Search Bar */}
      <div className="p-6 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Type here to search" 
            className="w-full bg-[#fbfbfb] border border-gray-300 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm"
            autoFocus
          />
        </div>
      </div>

      {/* Pinned Section */}
      <div className="flex-1 p-6 pt-2 overflow-y-auto">
        <div className="flex justify-between items-center mb-4 px-2">
            <h3 className="text-sm font-semibold text-gray-700">Pinned</h3>
            <button className="flex items-center text-xs text-gray-500 hover:bg-white/50 px-2 py-1 rounded">
                All apps <ChevronRight className="w-3 h-3 ml-1" />
            </button>
        </div>
        
        <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
          {pinnedApps.map(id => {
            const app = apps[id];
            return (
                <button 
                    key={id}
                    onClick={() => onAppClick(id)}
                    className="flex flex-col items-center justify-center p-2 hover:bg-white/50 rounded-md group transition-colors"
                >
                    <div className={`${app.bgColor} p-3 rounded-lg mb-2 shadow-sm group-hover:scale-105 transition-transform`}>
                         <app.icon className={`w-6 h-6 ${app.color}`} />
                    </div>
                    <span className="text-xs text-gray-700 font-medium">{app.title}</span>
                </button>
            );
          })}
        </div>

        <div className="mt-8 px-2">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Recommended</h3>
            <div className="space-y-1">
                <div className="flex items-center p-2 hover:bg-white/50 rounded-md cursor-pointer">
                    <div className="bg-blue-100 p-2 rounded mr-3">
                        <apps.word.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-700">Resume.docx</span>
                        <span className="text-[10px] text-gray-500">Recently opened</span>
                    </div>
                </div>
                <div className="flex items-center p-2 hover:bg-white/50 rounded-md cursor-pointer">
                    <div className="bg-yellow-100 p-2 rounded mr-3">
                        <apps.explorer.icon className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-700">Project Alpha</span>
                        <span className="text-[10px] text-gray-500">Yesterday at 4:20 PM</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#f3f3f3] border-t border-gray-200 p-4 flex justify-between items-center px-8">
        <button className="flex items-center hover:bg-white/50 p-2 rounded-md transition-colors">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3">
                U
            </div>
            <span className="text-sm font-medium text-gray-700">User</span>
        </button>
        <button className="p-2 hover:bg-white/50 rounded-md transition-colors">
            <Power className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default StartMenu;