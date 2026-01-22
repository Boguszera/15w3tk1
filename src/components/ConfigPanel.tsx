import { useConfigStore } from '../store/configStore';

export function ConfigPanel() {
  const config = useConfigStore((state) => state.config);
  const updateConfig = useConfigStore((state) => state.updateConfig);
  const resetConfig = useConfigStore((state) => state.resetConfig);

  return (
    <div className="w-80 h-full bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white overflow-y-auto shadow-2xl">
      {/* Modern panel styling with gradient background */}
      <div className="p-6 space-y-8">
        {/* Enhanced header section with gradient and improved spacing */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 shadow-lg -mx-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-1">Car Configurator</h2>
              <p className="text-blue-100 text-sm">Customize your dream car</p>
            </div>
            <button
              onClick={resetConfig}
              className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg animate-on-hover"
              aria-label="Reset configuration"
            >
              {/* Enhanced reset button with shake animation on hover */}
              <span className="flex items-center gap-2 text-sm font-semibold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset
              </span>
            </button>
          </div>
        </div>

        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0) scale(1.05); }
            25% { transform: translateX(-2px) scale(1.05); }
            75% { transform: translateX(2px) scale(1.05); }
          }
          .animate-on-hover:hover {
            animation: shake 0.3s ease-in-out;
          }
        `}</style>

        {/* Body Section - Enhanced with icon and modern styling */}
        <section className="space-y-4 bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 transition-all duration-300 hover:border-blue-500/30">
          <h3 className="text-lg font-semibold flex items-center gap-3 pb-3 border-b border-gradient-to-r from-blue-500 to-transparent">
            {/* Body icon */}
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Body</span>
          </h3>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300 mb-2">Paint Color</label>
            {/* Enhanced color picker with better styling */}
            <div className="relative">
              <input
                type="color"
                value={config.bodyColor}
                onChange={(e) => updateConfig({ bodyColor: e.target.value })}
                className="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-600 hover:border-blue-500 transition-all duration-300 shadow-md"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300 mb-2">Material</label>
            {/* Enhanced buttons with gradient and hover effects */}
            <div className="flex gap-3">
              <button
                onClick={() => updateConfig({ bodyMaterial: 'matte' })}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                  config.bodyMaterial === 'matte'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-gray-700 hover:bg-gray-600 hover:shadow-lg'
                }`}
              >
                Matte
              </button>
              <button
                onClick={() => updateConfig({ bodyMaterial: 'glossy' })}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                  config.bodyMaterial === 'glossy'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-gray-700 hover:bg-gray-600 hover:shadow-lg'
                }`}
              >
                Glossy
              </button>
            </div>
          </div>
        </section>

        {/* Visual separator */}
        <div className="border-t border-gray-700/50"></div>

        {/* Wheels Section - Enhanced with icon and modern styling */}
        <section className="space-y-4 bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 transition-all duration-300 hover:border-blue-500/30">
          <h3 className="text-lg font-semibold flex items-center gap-3 pb-3 border-b border-gradient-to-r from-blue-500 to-transparent">
            {/* Wheel icon */}
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
            </svg>
            <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Wheels</span>
          </h3>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300 mb-2">Wheel Color</label>
            {/* Enhanced color picker with better styling */}
            <div className="relative">
              <input
                type="color"
                value={config.wheelColor}
                onChange={(e) => updateConfig({ wheelColor: e.target.value })}
                className="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-600 hover:border-blue-500 transition-all duration-300 shadow-md"
              />
            </div>
          </div>
        </section>

        {/* Visual separator */}
        <div className="border-t border-gray-700/50"></div>

        {/* Front Lamps Section - Enhanced with icon and modern styling */}
        <section className="space-y-4 bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 transition-all duration-300 hover:border-blue-500/30">
          <h3 className="text-lg font-semibold flex items-center gap-3 pb-3 border-b border-gradient-to-r from-blue-500 to-transparent">
            {/* Light bulb icon */}
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Front Lamps</span>
          </h3>
          
          <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
            <label className="text-sm font-medium text-gray-300">Lights On</label>
            {/* Enhanced toggle switch */}
            <button
              onClick={() => updateConfig({ frontLampsOn: !config.frontLampsOn })}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                config.frontLampsOn ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/50' : 'bg-gray-600'
              }`}
              aria-label="Toggle front lamps"
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-md ${
                  config.frontLampsOn ? 'transform translate-x-7' : ''
                }`}
              />
            </button>
          </div>

          {config.frontLampsOn && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-300">
                  Intensity: <span className="text-blue-400 font-semibold">{config.frontLampsIntensity.toFixed(1)}</span>
                </label>
                {/* Enhanced slider with better styling */}
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={config.frontLampsIntensity}
                  onChange={(e) =>
                    updateConfig({ frontLampsIntensity: parseFloat(e.target.value) })
                  }
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider-thumb"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-300">Light Color</label>
                <div className="relative">
                  <input
                    type="color"
                    value={config.frontLampsColor}
                    onChange={(e) => updateConfig({ frontLampsColor: e.target.value })}
                    className="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-600 hover:border-blue-500 transition-all duration-300 shadow-md"
                  />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Visual separator */}
        <div className="border-t border-gray-700/50"></div>

        {/* Back Lamps Section - Enhanced with icon and modern styling */}
        <section className="space-y-4 bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 transition-all duration-300 hover:border-blue-500/30">
          <h3 className="text-lg font-semibold flex items-center gap-3 pb-3 border-b border-gradient-to-r from-blue-500 to-transparent">
            {/* Rear light icon */}
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
            </svg>
            <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Back Lamps</span>
          </h3>
          
          <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
            <label className="text-sm font-medium text-gray-300">Lights On</label>
            {/* Enhanced toggle switch */}
            <button
              onClick={() => updateConfig({ backLampsOn: !config.backLampsOn })}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                config.backLampsOn ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/50' : 'bg-gray-600'
              }`}
              aria-label="Toggle back lamps"
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-md ${
                  config.backLampsOn ? 'transform translate-x-7' : ''
                }`}
              />
            </button>
          </div>

          {config.backLampsOn && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-300">
                  Intensity: <span className="text-blue-400 font-semibold">{config.backLampsIntensity.toFixed(1)}</span>
                </label>
                {/* Enhanced slider with better styling */}
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={config.backLampsIntensity}
                  onChange={(e) =>
                    updateConfig({ backLampsIntensity: parseFloat(e.target.value) })
                  }
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider-thumb"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-300">Light Color</label>
                <div className="relative">
                  <input
                    type="color"
                    value={config.backLampsColor}
                    onChange={(e) => updateConfig({ backLampsColor: e.target.value })}
                    className="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-600 hover:border-blue-500 transition-all duration-300 shadow-md"
                  />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Visual separator */}
        <div className="border-t border-gray-700/50"></div>

        {/* Windows Section - Enhanced with icon and modern styling */}
        <section className="space-y-4 bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 transition-all duration-300 hover:border-blue-500/30">
          <h3 className="text-lg font-semibold flex items-center gap-3 pb-3 border-b border-gradient-to-r from-blue-500 to-transparent">
            {/* Window icon */}
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
            <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Windows</span>
          </h3>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              Transparency: <span className="text-blue-400 font-semibold">{config.windowTransparency.toFixed(2)}</span>
            </label>
            {/* Enhanced slider with better styling */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={config.windowTransparency}
              onChange={(e) =>
                updateConfig({ windowTransparency: parseFloat(e.target.value) })
              }
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300 mb-2">Tint</label>
            {/* Enhanced buttons with gradient and hover effects */}
            <div className="flex gap-3">
              <button
                onClick={() => updateConfig({ windowTint: 'clear' })}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                  config.windowTint === 'clear'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-gray-700 hover:bg-gray-600 hover:shadow-lg'
                }`}
              >
                Clear
              </button>
              <button
                onClick={() => updateConfig({ windowTint: 'tinted' })}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                  config.windowTint === 'tinted'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-gray-700 hover:bg-gray-600 hover:shadow-lg'
                }`}
              >
                Tinted
              </button>
            </div>
          </div>
        </section>

        {/* Visual separator */}
        <div className="border-t border-gray-700/50"></div>

        {/* Spoiler Section - Enhanced with icon and modern styling */}
        <section className="space-y-4 bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 transition-all duration-300 hover:border-blue-500/30">
          <h3 className="text-lg font-semibold flex items-center gap-3 pb-3 border-b border-gradient-to-r from-blue-500 to-transparent">
            {/* Spoiler icon */}
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Spoiler</span>
          </h3>
          
          <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
            <label className="text-sm font-medium text-gray-300">Visible</label>
            {/* Enhanced toggle switch */}
            <button
              onClick={() => updateConfig({ spoilerVisible: !config.spoilerVisible })}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                config.spoilerVisible ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/50' : 'bg-gray-600'
              }`}
              aria-label="Toggle spoiler visibility"
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-md ${
                  config.spoilerVisible ? 'transform translate-x-7' : ''
                }`}
              />
            </button>
          </div>

          {config.spoilerVisible && (
            <div className="space-y-3 animate-fadeIn">
              <label className="block text-sm font-medium text-gray-300 mb-2">Color</label>
              {/* Enhanced buttons with gradient and hover effects */}
              <div className="flex gap-2">
                <button
                  onClick={() => updateConfig({ spoilerColor: 'body' })}
                  className={`flex-1 py-3 px-3 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                    config.spoilerColor === 'body'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50'
                      : 'bg-gray-700 hover:bg-gray-600 hover:shadow-lg'
                  }`}
                >
                  Body
                </button>
                <button
                  onClick={() => updateConfig({ spoilerColor: 'carbon' })}
                  className={`flex-1 py-3 px-3 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                    config.spoilerColor === 'carbon'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50'
                      : 'bg-gray-700 hover:bg-gray-600 hover:shadow-lg'
                  }`}
                >
                  Carbon
                </button>
                <button
                  onClick={() => updateConfig({ spoilerColor: 'black' })}
                  className={`flex-1 py-3 px-3 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                    config.spoilerColor === 'black'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50'
                      : 'bg-gray-700 hover:bg-gray-600 hover:shadow-lg'
                  }`}
                >
                  Black
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Visual separator */}
        <div className="border-t border-gray-700/50"></div>

        {/* Metal Elements Section - Enhanced with icon and modern styling */}
        <section className="space-y-4 bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 transition-all duration-300 hover:border-blue-500/30">
          <h3 className="text-lg font-semibold flex items-center gap-3 pb-3 border-b border-gradient-to-r from-blue-500 to-transparent">
            {/* Metal icon */}
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Metal Elements</span>
          </h3>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300 mb-2">Material Type</label>
            {/* Enhanced buttons with gradient and hover effects */}
            <div className="flex gap-2">
              <button
                onClick={() => updateConfig({ metalType: 'chrome' })}
                className={`flex-1 py-3 px-3 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                  config.metalType === 'chrome'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-gray-700 hover:bg-gray-600 hover:shadow-lg'
                }`}
              >
                Chrome
              </button>
              <button
                onClick={() => updateConfig({ metalType: 'brushed' })}
                className={`flex-1 py-3 px-3 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                  config.metalType === 'brushed'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-gray-700 hover:bg-gray-600 hover:shadow-lg'
                }`}
              >
                Brushed
              </button>
              <button
                onClick={() => updateConfig({ metalType: 'black' })}
                className={`flex-1 py-3 px-3 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                  config.metalType === 'black'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-gray-700 hover:bg-gray-600 hover:shadow-lg'
                }`}
              >
                Black
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              Roughness: <span className="text-blue-400 font-semibold">{config.metalRoughness.toFixed(2)}</span>
            </label>
            {/* Enhanced slider with better styling */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={config.metalRoughness}
              onChange={(e) =>
                updateConfig({ metalRoughness: parseFloat(e.target.value) })
              }
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              Metalness: <span className="text-blue-400 font-semibold">{config.metalMetalness.toFixed(2)}</span>
            </label>
            {/* Enhanced slider with better styling */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={config.metalMetalness}
              onChange={(e) =>
                updateConfig({ metalMetalness: parseFloat(e.target.value) })
              }
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
