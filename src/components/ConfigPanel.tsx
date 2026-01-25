import { useConfigStore } from '../store/configStore';

export function ConfigPanel() {
  const config = useConfigStore((state) => state.config);
  const updateConfig = useConfigStore((state) => state.updateConfig);
  const resetConfig = useConfigStore((state) => state.resetConfig);

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
            onClick={resetConfig}
            className="text-sm bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
          >
            Reset
          </button>
        </div>

        {/* Scene Selection */}
        <section className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
          <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent flex items-center gap-2">
            <span className="text-2xl">🌍</span> Scene
          </h3>
          
          <div className="flex gap-3">
            <button
              onClick={() => updateConfig({ currentScene: 'default' })}
              className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 font-semibold ${
                config.currentScene === 'default'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-glow scale-105'
                  : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700'
              }`}
            >
              Default
            </button>
            <button
              onClick={() => updateConfig({ currentScene: 'garage' })}
              className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 font-semibold ${
                config.currentScene === 'garage'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-glow scale-105'
                  : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700'
              }`}
            >
              Garage
            </button>
            <button
              onClick={() => updateConfig({ currentScene: 'racetrack' })}
              className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 font-semibold ${
                config.currentScene === 'racetrack'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-glow scale-105'
                  : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700'
              }`}
            >
              Racetrack
            </button>
          </div>
        </section>

        {/* Body Section */}
        <section className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
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
                onClick={() => updateConfig({ bodyMaterial: 'matte' })}
                className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 font-semibold ${
                  config.bodyMaterial === 'matte'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-glow scale-105'
                    : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700'
                }`}
              >
                Matte
              </button>
              <button
                onClick={() => updateConfig({ bodyMaterial: 'glossy' })}
                className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 font-semibold ${
                  config.bodyMaterial === 'glossy'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-glow scale-105'
                    : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700'
                }`}
              >
                Glossy
              </button>
            </div>
          </div>
        </section>

        {/* Wheels Section */}
        <section className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
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
        </section>

        {/* Front Lamps Section */}
        <section className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
          <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent flex items-center gap-2">
            <span className="text-2xl">💡</span> Front Lamps
          </h3>
          
          <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
            <label className="text-sm font-medium text-gray-300">Lights On</label>
            <button
              onClick={() => updateConfig({ frontLampsOn: !config.frontLampsOn })}
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
        </section>

        {/* Back Lamps Section */}
        <section className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
          <h3 className="text-xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-2">
            <span className="text-2xl">🔴</span> Back Lamps
          </h3>
          
          <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
            <label className="text-sm font-medium text-gray-300">Lights On</label>
            <button
              onClick={() => updateConfig({ backLampsOn: !config.backLampsOn })}
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
        </section>

        {/* Windows Section */}
        <section className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
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
                onClick={() => updateConfig({ windowTint: 'clear' })}
                className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 font-semibold ${
                  config.windowTint === 'clear'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-glow scale-105'
                    : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700'
                }`}
              >
                Clear
              </button>
              <button
                onClick={() => updateConfig({ windowTint: 'tinted' })}
                className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 font-semibold ${
                  config.windowTint === 'tinted'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-glow scale-105'
                    : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700'
                }`}
              >
                Tinted
              </button>
            </div>
          </div>
        </section>

        {/* Spoiler Section */}
        <section className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
          <h3 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent flex items-center gap-2">
            <span className="text-2xl">🏎️</span> Spoiler
          </h3>
          
          <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
            <label className="text-sm font-medium text-gray-300">Visible</label>
            <button
              onClick={() => updateConfig({ spoilerVisible: !config.spoilerVisible })}
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
                  onClick={() => updateConfig({ spoilerColor: 'body' })}
                  className={`py-3 px-3 rounded-lg transition-all duration-300 font-semibold text-sm ${
                    config.spoilerColor === 'body'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-glow scale-105'
                      : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700'
                  }`}
                >
                  Body
                </button>
                <button
                  onClick={() => updateConfig({ spoilerColor: 'carbon' })}
                  className={`py-3 px-3 rounded-lg transition-all duration-300 font-semibold text-sm ${
                    config.spoilerColor === 'carbon'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-glow scale-105'
                      : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700'
                  }`}
                >
                  Carbon
                </button>
                <button
                  onClick={() => updateConfig({ spoilerColor: 'black' })}
                  className={`py-3 px-3 rounded-lg transition-all duration-300 font-semibold text-sm ${
                    config.spoilerColor === 'black'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-glow scale-105'
                      : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700'
                  }`}
                >
                  Black
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Metal Elements Section */}
        <section className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 mb-6">
          <h3 className="text-xl font-bold bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent flex items-center gap-2">
            <span className="text-2xl">⚡</span> Metal Elements
          </h3>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">Material Type</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => updateConfig({ metalType: 'chrome' })}
                className={`py-3 px-3 rounded-lg transition-all duration-300 font-semibold text-sm ${
                  config.metalType === 'chrome'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-glow scale-105'
                    : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700'
                }`}
              >
                Chrome
              </button>
              <button
                onClick={() => updateConfig({ metalType: 'brushed' })}
                className={`py-3 px-3 rounded-lg transition-all duration-300 font-semibold text-sm ${
                  config.metalType === 'brushed'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-glow scale-105'
                    : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700'
                }`}
              >
                Brushed
              </button>
              <button
                onClick={() => updateConfig({ metalType: 'black' })}
                className={`py-3 px-3 rounded-lg transition-all duration-300 font-semibold text-sm ${
                  config.metalType === 'black'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-glow scale-105'
                    : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700'
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
        </section>
      </div>
    </div>
  );
}