import { useConfigStore } from '../store/configStore';
import { motion } from 'framer-motion';
import { soundManager } from '../utils/soundManager';
import { useEffect } from 'react';

export function ConfigPanel() {
  const config = useConfigStore((state) => state.config);
  const updateConfig = useConfigStore((state) => state.updateConfig);
  const resetConfig = useConfigStore((state) => state.resetConfig);

  // Initialize sounds once on mount
  useEffect(() => {
    soundManager.initializeSounds();
    
    // Cleanup on unmount
    return () => {
      soundManager.cleanup();
    };
  }, []);

  // Play ambient sound when in garage scene
  useEffect(() => {
    soundManager.toggleAmbient(config.currentScene === 'garage');
    soundManager.toggleRacetrackAmbient(config.currentScene === 'racetrack');
  }, [config.currentScene]);

  // Helper function to handle button clicks with sound
  const handleButtonClick = (action: () => void) => {
    soundManager.playButtonClick();
    action();
  };

  return (
    <div className="w-full sm:w-96 h-full bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white overflow-y-auto shadow-2xl border-r border-gray-800 custom-scrollbar animate-slide-in">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Car Configurator
            </h2>
            <p className="text-sm text-gray-400 mt-1">Customize your dream car</p>
          </div>
          <button
            onClick={() => handleButtonClick(resetConfig)}
            className="text-sm bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/50 hover:shadow-red-500/70 font-semibold"
          >
            Reset
          </button>
        </div>

        {/* Scene Selection */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
        >
          <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent flex items-center gap-2">
            <span className="text-2xl">🌍</span> Scene
          </h3>
          
          <div className="flex gap-3">
            <button
              onClick={() => handleButtonClick(() => updateConfig({ currentScene: 'default' }))}
              className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 font-semibold hover:scale-105 ${
                config.currentScene === 'default'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700 hover:backdrop-blur-lg'
              }`}
            >
              Default
            </button>
            <button
              onClick={() => handleButtonClick(() => updateConfig({ currentScene: 'garage' }))}
              className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 font-semibold hover:scale-105 ${
                config.currentScene === 'garage'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700 hover:backdrop-blur-lg'
              }`}
            >
              Garage
            </button>
            <button
              onClick={() => handleButtonClick(() => updateConfig({ currentScene: 'racetrack' }))}
              className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 font-semibold hover:scale-105 ${
                config.currentScene === 'racetrack'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700 hover:backdrop-blur-lg'
              }`}
            >
              Racetrack
            </button>
          </div>
        </motion.section>

        {/* Body Section */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
        >
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-2">
            <span className="text-2xl">🎨</span> Body
          </h3>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">Paint Color</label>
            <input
              type="color"
              value={config.bodyColor}
              onChange={(e) => updateConfig({ bodyColor: e.target.value })}
              className="w-full h-12 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">Material Finish</label>
            <div className="flex gap-3">
              <button
                onClick={() => handleButtonClick(() => updateConfig({ bodyMaterial: 'matte' }))}
                className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 font-semibold hover:scale-105 ${
                  config.bodyMaterial === 'matte'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700 hover:backdrop-blur-lg'
                }`}
              >
                Matte
              </button>
              <button
                onClick={() => handleButtonClick(() => updateConfig({ bodyMaterial: 'glossy' }))}
                className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 font-semibold hover:scale-105 ${
                  config.bodyMaterial === 'glossy'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700 hover:backdrop-blur-lg'
                }`}
              >
                Glossy
              </button>
            </div>
          </div>
        </motion.section>

        {/* Wheels Section */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
        >
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2">
            <span className="text-2xl">⚙️</span> Wheels
          </h3>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">Wheel Color</label>
            <input
              type="color"
              value={config.wheelColor}
              onChange={(e) => updateConfig({ wheelColor: e.target.value })}
              className="w-full h-12 rounded-lg cursor-pointer"
            />
          </div>
        </motion.section>

        {/* Front Lamps Section */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
        >
          <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent flex items-center gap-2">
            <span className="text-2xl">💡</span> Front Lamps
          </h3>
          
          <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
            <label className="text-sm font-medium text-gray-300">Lights On</label>
            <button
              onClick={() => handleButtonClick(() => updateConfig({ frontLampsOn: !config.frontLampsOn }))}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                config.frontLampsOn ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/50' : 'bg-gray-700'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-300 shadow-lg ${
                  config.frontLampsOn ? 'transform translate-x-7' : ''
                }`}
              />
            </button>
          </div>

          {config.frontLampsOn && (
            <div className="space-y-4 animate-slide-up">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Intensity: <span className="text-purple-400 font-semibold">{config.frontLampsIntensity.toFixed(1)}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={config.frontLampsIntensity}
                  onChange={(e) =>
                    updateConfig({ frontLampsIntensity: parseFloat(e.target.value) })
                  }
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-300">Light Color</label>
                <input
                  type="color"
                  value={config.frontLampsColor}
                  onChange={(e) => updateConfig({ frontLampsColor: e.target.value })}
                  className="w-full h-12 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          )}
        </motion.section>

        {/* Back Lamps Section */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
        >
          <h3 className="text-xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-2">
            <span className="text-2xl">🔴</span> Back Lamps
          </h3>
          
          <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
            <label className="text-sm font-medium text-gray-300">Lights On</label>
            <button
              onClick={() => handleButtonClick(() => updateConfig({ backLampsOn: !config.backLampsOn }))}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                config.backLampsOn ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/50' : 'bg-gray-700'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-300 shadow-lg ${
                  config.backLampsOn ? 'transform translate-x-7' : ''
                }`}
              />
            </button>
          </div>

          {config.backLampsOn && (
            <div className="space-y-4 animate-slide-up">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Intensity: <span className="text-purple-400 font-semibold">{config.backLampsIntensity.toFixed(1)}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={config.backLampsIntensity}
                  onChange={(e) =>
                    updateConfig({ backLampsIntensity: parseFloat(e.target.value) })
                  }
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-300">Light Color</label>
                <input
                  type="color"
                  value={config.backLampsColor}
                  onChange={(e) => updateConfig({ backLampsColor: e.target.value })}
                  className="w-full h-12 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          )}
        </motion.section>

        {/* Windows Section */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
        >
          <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
            <span className="text-2xl">🪟</span> Windows
          </h3>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Transparency: <span className="text-purple-400 font-semibold">{config.windowTransparency.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={config.windowTransparency}
              onChange={(e) =>
                updateConfig({ windowTransparency: parseFloat(e.target.value) })
              }
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">Window Tint</label>
            <div className="flex gap-3">
              <button
                onClick={() => handleButtonClick(() => updateConfig({ windowTint: 'clear' }))}
                className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 font-semibold hover:scale-105 ${
                  config.windowTint === 'clear'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700 hover:backdrop-blur-lg'
                }`}
              >
                Clear
              </button>
              <button
                onClick={() => handleButtonClick(() => updateConfig({ windowTint: 'tinted' }))}
                className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 font-semibold hover:scale-105 ${
                  config.windowTint === 'tinted'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700 hover:backdrop-blur-lg'
                }`}
              >
                Tinted
              </button>
            </div>
          </div>
        </motion.section>

        {/* Spoiler Section */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
        >
          <h3 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent flex items-center gap-2">
            <span className="text-2xl">🏎️</span> Spoiler
          </h3>
          
          <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
            <label className="text-sm font-medium text-gray-300">Visible</label>
            <button
              onClick={() => handleButtonClick(() => updateConfig({ spoilerVisible: !config.spoilerVisible }))}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                config.spoilerVisible ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/50' : 'bg-gray-700'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-300 shadow-lg ${
                  config.spoilerVisible ? 'transform translate-x-7' : ''
                }`}
              />
            </button>
          </div>

          {config.spoilerVisible && (
            <div className="space-y-3 animate-slide-up">
              <label className="block text-sm font-medium text-gray-300">Spoiler Color</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleButtonClick(() => updateConfig({ spoilerColor: 'body' }))}
                  className={`py-3 px-3 rounded-lg transition-all duration-300 font-semibold text-sm hover:scale-105 ${
                    config.spoilerColor === 'body'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
                      : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700 hover:backdrop-blur-lg'
                  }`}
                >
                  Body
                </button>
                <button
                  onClick={() => handleButtonClick(() => updateConfig({ spoilerColor: 'carbon' }))}
                  className={`py-3 px-3 rounded-lg transition-all duration-300 font-semibold text-sm hover:scale-105 ${
                    config.spoilerColor === 'carbon'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
                      : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700 hover:backdrop-blur-lg'
                  }`}
                >
                  Carbon
                </button>
                <button
                  onClick={() => handleButtonClick(() => updateConfig({ spoilerColor: 'black' }))}
                  className={`py-3 px-3 rounded-lg transition-all duration-300 font-semibold text-sm hover:scale-105 ${
                    config.spoilerColor === 'black'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
                      : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700 hover:backdrop-blur-lg'
                  }`}
                >
                  Black
                </button>
              </div>
            </div>
          )}
        </motion.section>

        {/* Metal Elements Section */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 mb-6"
        >
          <h3 className="text-xl font-bold bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent flex items-center gap-2">
            <span className="text-2xl">⚡</span> Metal Elements
          </h3>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">Material Type</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleButtonClick(() => updateConfig({ metalType: 'chrome' }))}
                className={`py-3 px-3 rounded-lg transition-all duration-300 font-semibold text-sm hover:scale-105 ${
                  config.metalType === 'chrome'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700 hover:backdrop-blur-lg'
                }`}
              >
                Chrome
              </button>
              <button
                onClick={() => handleButtonClick(() => updateConfig({ metalType: 'brushed' }))}
                className={`py-3 px-3 rounded-lg transition-all duration-300 font-semibold text-sm hover:scale-105 ${
                  config.metalType === 'brushed'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700 hover:backdrop-blur-lg'
                }`}
              >
                Brushed
              </button>
              <button
                onClick={() => handleButtonClick(() => updateConfig({ metalType: 'black' }))}
                className={`py-3 px-3 rounded-lg transition-all duration-300 font-semibold text-sm hover:scale-105 ${
                  config.metalType === 'black'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700 hover:backdrop-blur-lg'
                }`}
              >
                Black
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Roughness: <span className="text-purple-400 font-semibold">{config.metalRoughness.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={config.metalRoughness}
              onChange={(e) =>
                updateConfig({ metalRoughness: parseFloat(e.target.value) })
              }
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Metalness: <span className="text-purple-400 font-semibold">{config.metalMetalness.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={config.metalMetalness}
              onChange={(e) =>
                updateConfig({ metalMetalness: parseFloat(e.target.value) })
              }
              className="w-full"
            />
          </div>
        </motion.section>
      </div>
    </div>
  );
}