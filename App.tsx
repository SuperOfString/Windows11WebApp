import React, { useState } from 'react';
import { INITIAL_STATE, APPS, WALLPAPER_URL } from './constants';
import { AppID, DesktopState, WindowState, AppConfig } from './types';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import DesktopIcon from './components/DesktopIcon';
import Window from './components/Window';

// App Components
import Calculator from './components/apps/Calculator';
import Word from './components/apps/Word';
import Excel from './components/apps/Excel';
import PowerPoint from './components/apps/PowerPoint';
import Explorer from './components/apps/Explorer';
import Browser from './components/apps/Browser';
import CalendarApp from './components/apps/CalendarApp';
import Copilot from './components/apps/Copilot';
import VideoPlayer from './components/apps/VideoPlayer';
import Photos from './components/apps/Photos';

const App: React.FC = () => {
  const [desktopState, setDesktopState] = useState<DesktopState>(INITIAL_STATE);

  const bringToFront = (id: AppID) => {
    setDesktopState(prev => {
      const maxZ = Math.max(...(Object.values(prev.windows) as WindowState[]).map(w => w.zIndex), 0);
      return {
        ...prev,
        activeWindowId: id,
        isStartMenuOpen: false, // Close start menu when clicking window
        windows: {
          ...prev.windows,
          [id]: {
            ...prev.windows[id],
            zIndex: maxZ + 1,
            isMinimized: false
          }
        }
      };
    });
  };

  const openApp = (id: AppID) => {
    if (desktopState.windows[id].isOpen) {
      if (desktopState.windows[id].isMinimized) {
        bringToFront(id);
      } else {
        // If active, maybe minimize? Standard windows behavior is stay active or bring to front.
        bringToFront(id);
      }
    } else {
      setDesktopState(prev => {
         const maxZ = Math.max(...(Object.values(prev.windows) as WindowState[]).map(w => w.zIndex), 0);
         return {
            ...prev,
            activeWindowId: id,
            isStartMenuOpen: false,
            windows: {
                ...prev.windows,
                [id]: {
                    ...prev.windows[id],
                    isOpen: true,
                    isMinimized: false,
                    zIndex: maxZ + 1
                }
            }
         };
      });
    }
  };

  const closeApp = (id: AppID) => {
    setDesktopState(prev => ({
      ...prev,
      activeWindowId: prev.activeWindowId === id ? null : prev.activeWindowId,
      windows: {
        ...prev.windows,
        [id]: {
          ...prev.windows[id],
          isOpen: false,
          isMaximized: false,
          isMinimized: false
        }
      }
    }));
  };

  const minimizeApp = (id: AppID) => {
    setDesktopState(prev => ({
      ...prev,
      activeWindowId: null,
      windows: {
        ...prev.windows,
        [id]: {
          ...prev.windows[id],
          isMinimized: true
        }
      }
    }));
  };

  const toggleMaximizeApp = (id: AppID) => {
    setDesktopState(prev => ({
      ...prev,
      windows: {
        ...prev.windows,
        [id]: {
          ...prev.windows[id],
          isMaximized: !prev.windows[id].isMaximized
        }
      }
    }));
  };

  const toggleStartMenu = () => {
    setDesktopState(prev => ({
      ...prev,
      isStartMenuOpen: !prev.isStartMenuOpen
    }));
  };

  const renderAppContent = (id: AppID) => {
    switch (id) {
      case 'calculator': return <Calculator />;
      case 'word': return <Word />;
      case 'excel': return <Excel />;
      case 'powerpoint': return <PowerPoint />;
      case 'explorer': return <Explorer />;
      case 'edge': return <Browser />;
      case 'calendar': return <CalendarApp />;
      case 'copilot': return <Copilot />;
      case 'videoplayer': return <VideoPlayer />;
      case 'photos': return <Photos />;
      case 'settings': return <div className="p-8 flex items-center justify-center h-full text-gray-500">Settings are not implemented in this demo.</div>;
      default: return null;
    }
  };

  return (
    <div 
        className="h-screen w-screen overflow-hidden bg-cover bg-center select-none relative"
        style={{ backgroundImage: `url(${WALLPAPER_URL})` }}
    >
      {/* Desktop Icons */}
      <div className="absolute top-0 left-0 bottom-12 p-2 flex flex-col flex-wrap content-start gap-2 z-0">
        {(Object.values(APPS) as AppConfig[]).filter(app => app.id !== 'settings' && app.id !== 'copilot').map(app => (
            <DesktopIcon key={app.id} app={app} onClick={() => openApp(app.id)} />
        ))}
      </div>

      {/* Windows */}
      {(Object.values(desktopState.windows) as WindowState[]).map(winState => (
          <Window
            key={winState.id}
            app={APPS[winState.id]}
            state={winState}
            isActive={desktopState.activeWindowId === winState.id}
            onClose={() => closeApp(winState.id)}
            onMinimize={() => minimizeApp(winState.id)}
            onMaximize={() => toggleMaximizeApp(winState.id)}
            onFocus={() => bringToFront(winState.id)}
          >
            {renderAppContent(winState.id)}
          </Window>
      ))}

      {/* Start Menu */}
      <StartMenu 
        isOpen={desktopState.isStartMenuOpen} 
        apps={APPS} 
        onAppClick={(id) => openApp(id)}
        onClose={() => setDesktopState(prev => ({ ...prev, isStartMenuOpen: false }))}
      />

      {/* Taskbar */}
      <Taskbar 
        apps={APPS}
        windows={desktopState.windows}
        activeWindowId={desktopState.activeWindowId}
        isStartMenuOpen={desktopState.isStartMenuOpen}
        onToggleStart={toggleStartMenu}
        onAppClick={(id) => {
            if (desktopState.windows[id].isOpen && desktopState.activeWindowId === id && !desktopState.windows[id].isMinimized) {
                minimizeApp(id);
            } else {
                openApp(id);
            }
        }}
      />
    </div>
  );
};

export default App;