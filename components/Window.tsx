import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { AppConfig, WindowState } from '../types';

interface WindowProps {
  app: AppConfig;
  state: WindowState;
  isActive: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({
  app,
  state,
  isActive,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  children
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  if (!state.isOpen) return null;

  // When minimized, we hide it but keep it in DOM (or unmount if preferred, but hiding allows state preservation)
  // For this simplified version, we'll just return null if minimized to save resources, 
  // but typically you'd want to keep state. Let's use visibility: hidden style if needed, 
  // but here we assume parent handles mounting.
  // Wait, if we unmount, we lose internal app state (like calculator current value).
  // Better to hide via display: none.
  
  const style: React.CSSProperties = {
    display: state.isMinimized ? 'none' : 'flex',
    zIndex: state.zIndex,
    width: state.isMaximized ? '100%' : app.preferredWidth || 800,
    height: state.isMaximized ? '100%' : app.preferredHeight || 600,
    position: state.isMaximized ? 'fixed' : 'absolute',
    left: state.isMaximized ? 0 : undefined,
    top: state.isMaximized ? 0 : undefined,
  };

  // If maximized, disable dragging
  const isDraggable = !state.isMaximized;

  const WindowContent = (
    <div
      ref={nodeRef}
      className={`flex flex-col bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden transition-shadow duration-200 ${
        isActive ? 'ring-1 ring-black/10' : 'opacity-95'
      }`}
      style={style}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div className="h-9 flex items-center justify-between bg-gray-50 border-b border-gray-100 px-2 select-none cursor-default handle w-full">
        <div className="flex items-center space-x-2 px-2">
          <app.icon className={`w-4 h-4 ${app.color}`} />
          <span className="text-xs font-medium text-gray-700">{app.title}</span>
        </div>
        <div className="flex items-center">
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(); }} 
            className="p-2 hover:bg-gray-200 rounded-md transition-colors group"
          >
            <Minus className="w-3 h-3 text-gray-500 group-hover:text-black" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onMaximize(); }} 
            className="p-2 hover:bg-gray-200 rounded-md transition-colors group"
          >
            {state.isMaximized ? (
              <Maximize2 className="w-3 h-3 text-gray-500 group-hover:text-black" />
            ) : (
              <Square className="w-3 h-3 text-gray-500 group-hover:text-black" />
            )}
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }} 
            className="p-2 hover:bg-red-500 hover:text-white rounded-md transition-colors group"
          >
            <X className="w-3 h-3 text-gray-500 group-hover:text-white" />
          </button>
        </div>
      </div>

      {/* App Content */}
      <div className="flex-1 relative overflow-auto bg-white cursor-default">
        {children}
      </div>
    </div>
  );

  if (state.isMaximized) {
    return WindowContent;
  }

  return (
    <Draggable
      handle=".handle"
      nodeRef={nodeRef}
      defaultPosition={{ x: 100, y: 50 }}
      bounds="parent"
      onStart={onFocus}
    >
      {WindowContent}
    </Draggable>
  );
};

export default Window;
