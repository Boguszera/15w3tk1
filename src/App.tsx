import { useState, useEffect } from 'react';
import { Scene } from './components/Scene';
import { ConfigPanel } from './components/ConfigPanel';
import { LoadingScreen } from './components/LoadingScreen';
import { useConfigStore } from './store/configStore';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
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
        {!isFullscreen && <ConfigPanel />}
        
        <div className="flex-1 relative">
          <Scene />
          
          {/* Fullscreen toggle button */}
          <button
            onClick={toggleFullscreen}
            className="absolute top-6 right-6 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600/90 to-blue-600/90 hover:from-purple-700 hover:to-blue-700 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 z-10 border border-white/10"
          >
            {isFullscreen ? '✕ Exit Fullscreen' : '⛶ Fullscreen'}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
