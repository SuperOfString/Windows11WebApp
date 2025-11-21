import React from 'react';
import { AppConfig } from '../types';

interface DesktopIconProps {
  app: AppConfig;
  onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ app, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center w-[84px] h-[96px] hover:bg-white/20 rounded-md focus:bg-white/30 focus:outline-none group transition-colors mb-2"
    >
      <div className={`${app.bgColor} p-3 rounded-xl shadow-sm group-hover:scale-105 transition-transform bg-opacity-90`}>
        <app.icon className={`w-8 h-8 ${app.color}`} />
      </div>
      <span className="mt-1 text-xs text-white drop-shadow-md font-medium line-clamp-2 text-center px-1" style={{textShadow: '0 1px 3px rgba(0,0,0,0.8)'}}>
        {app.title}
      </span>
    </button>
  );
};

export default DesktopIcon;
