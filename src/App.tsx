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
      
      <div className="flex h-screen bg-gray-900 overflow-hidden">
        {!isFullscreen && <ConfigPanel />}
        
        <div className="flex-1 relative">
          <Scene />
          
          {/* Fullscreen toggle button */}
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors z-10"
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
