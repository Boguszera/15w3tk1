import { useState, useEffect } from 'react';
import { Scene } from './components/Scene';
import { ConfigPanel } from './components/ConfigPanel';
import { LoadingScreen } from './components/LoadingScreen';
import { useConfigStore } from './store/configStore';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const loadFromLocalStorage = useConfigStore((state) => state.loadFromLocalStorage);

  useEffect(() => {
    // Load saved configuration on mount
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}
      
      <div className="flex h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
        {/* Config Panel - hidden on mobile unless opened, always visible on desktop */}
        {!isFullscreen && (
          <div className={`
            fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out
            lg:relative lg:translate-x-0
            ${isPanelOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <ConfigPanel />
          </div>
        )}

        {/* Mobile panel toggle button */}
        {!isFullscreen && (
          <button
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className="lg:hidden fixed top-6 left-6 z-40 px-4 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600/90 to-blue-600/90 hover:from-purple-700 hover:to-blue-700 backdrop-blur-sm shadow-lg transition-all duration-300 transform hover:scale-105 border border-white/10 text-sm"
          >
            {isPanelOpen ? '✕' : '☰'}
          </button>
        )}

        {/* Overlay for mobile when panel is open */}
        {!isFullscreen && isPanelOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-20"
            onClick={() => setIsPanelOpen(false)}
          />
        )}
        
        <div className="flex-1 relative">
          <Scene />
          
          {/* Fullscreen toggle button */}
          <button
            onClick={toggleFullscreen}
            className="absolute top-6 right-6 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600/90 to-blue-600/90 hover:from-purple-700 hover:to-blue-700 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 z-10 border border-white/10 text-sm sm:text-base"
          >
            {isFullscreen ? '✕' : '⛶'} <span className="hidden sm:inline">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
