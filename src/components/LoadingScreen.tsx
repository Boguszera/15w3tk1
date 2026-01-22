import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadComplete, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-black flex items-center justify-center z-50 animate-fade-in">
      <div className="text-center px-6">
        <div className="mb-10 animate-slide-up">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Car Configurator
          </h1>
          <p className="text-gray-400 text-lg font-medium">Initializing 3D Experience...</p>
        </div>
        
        <div className="w-80 mx-auto">
          {/* Progress bar container */}
          <div className="h-3 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-gray-700/50 shadow-lg">
            <div
              className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-between text-sm">
            <span className="text-gray-400 font-medium">Loading Assets</span>
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text font-bold text-lg">
              {progress}%
            </span>
          </div>
        </div>

        {/* Loading dots animation */}
        <div className="mt-8 flex justify-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
