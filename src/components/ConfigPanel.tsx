import { useConfigStore } from '../store/configStore';

export function ConfigPanel() {
  const config = useConfigStore((state) => state.config);
  const updateConfig = useConfigStore((state) => state.updateConfig);
  const resetConfig = useConfigStore((state) => state.resetConfig);

  return (
    <div className="w-80 h-full bg-gray-900 text-white overflow-y-auto shadow-2xl">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Car Configurator</h2>
          <button
            onClick={resetConfig}
            className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Body Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">Body</h3>
          
          <div>
            <label className="block text-sm mb-2">Paint Color</label>
            <input
              type="color"
              value={config.bodyColor}
              onChange={(e) => updateConfig({ bodyColor: e.target.value })}
              className="w-full h-10 rounded cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Material</label>
            <div className="flex gap-2">
              <button
                onClick={() => updateConfig({ bodyMaterial: 'matte' })}
                className={`flex-1 py-2 px-4 rounded transition-colors ${
                  config.bodyMaterial === 'matte'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                Matte
              </button>
              <button
                onClick={() => updateConfig({ bodyMaterial: 'glossy' })}
                className={`flex-1 py-2 px-4 rounded transition-colors ${
                  config.bodyMaterial === 'glossy'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                Glossy
              </button>
            </div>
          </div>
        </section>

        {/* Wheels Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">Wheels</h3>
          
          <div>
            <label className="block text-sm mb-2">Wheel Color</label>
            <input
              type="color"
              value={config.wheelColor}
              onChange={(e) => updateConfig({ wheelColor: e.target.value })}
              className="w-full h-10 rounded cursor-pointer"
            />
          </div>
        </section>

        {/* Front Lamps Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">Front Lamps</h3>
          
          <div className="flex items-center justify-between">
            <label className="text-sm">Lights On</label>
            <button
              onClick={() => updateConfig({ frontLampsOn: !config.frontLampsOn })}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                config.frontLampsOn ? 'bg-blue-600' : 'bg-gray-700'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  config.frontLampsOn ? 'transform translate-x-6' : ''
                }`}
              />
            </button>
          </div>

          {config.frontLampsOn && (
            <>
              <div>
                <label className="block text-sm mb-2">
                  Intensity: {config.frontLampsIntensity.toFixed(1)}
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

              <div>
                <label className="block text-sm mb-2">Light Color</label>
                <input
                  type="color"
                  value={config.frontLampsColor}
                  onChange={(e) => updateConfig({ frontLampsColor: e.target.value })}
                  className="w-full h-10 rounded cursor-pointer"
                />
              </div>
            </>
          )}
        </section>

        {/* Back Lamps Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">Back Lamps</h3>
          
          <div className="flex items-center justify-between">
            <label className="text-sm">Lights On</label>
            <button
              onClick={() => updateConfig({ backLampsOn: !config.backLampsOn })}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                config.backLampsOn ? 'bg-blue-600' : 'bg-gray-700'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  config.backLampsOn ? 'transform translate-x-6' : ''
                }`}
              />
            </button>
          </div>

          {config.backLampsOn && (
            <>
              <div>
                <label className="block text-sm mb-2">
                  Intensity: {config.backLampsIntensity.toFixed(1)}
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

              <div>
                <label className="block text-sm mb-2">Light Color</label>
                <input
                  type="color"
                  value={config.backLampsColor}
                  onChange={(e) => updateConfig({ backLampsColor: e.target.value })}
                  className="w-full h-10 rounded cursor-pointer"
                />
              </div>
            </>
          )}
        </section>

        {/* Windows Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">Windows</h3>
          
          <div>
            <label className="block text-sm mb-2">
              Transparency: {config.windowTransparency.toFixed(2)}
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

          <div>
            <label className="block text-sm mb-2">Tint</label>
            <div className="flex gap-2">
              <button
                onClick={() => updateConfig({ windowTint: 'clear' })}
                className={`flex-1 py-2 px-4 rounded transition-colors ${
                  config.windowTint === 'clear'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                Clear
              </button>
              <button
                onClick={() => updateConfig({ windowTint: 'tinted' })}
                className={`flex-1 py-2 px-4 rounded transition-colors ${
                  config.windowTint === 'tinted'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                Tinted
              </button>
            </div>
          </div>
        </section>

        {/* Spoiler Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">Spoiler</h3>
          
          <div className="flex items-center justify-between">
            <label className="text-sm">Visible</label>
            <button
              onClick={() => updateConfig({ spoilerVisible: !config.spoilerVisible })}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                config.spoilerVisible ? 'bg-blue-600' : 'bg-gray-700'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  config.spoilerVisible ? 'transform translate-x-6' : ''
                }`}
              />
            </button>
          </div>

          {config.spoilerVisible && (
            <div>
              <label className="block text-sm mb-2">Color</label>
              <div className="flex gap-2">
                <button
                  onClick={() => updateConfig({ spoilerColor: 'body' })}
                  className={`flex-1 py-2 px-4 rounded transition-colors ${
                    config.spoilerColor === 'body'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  Body
                </button>
                <button
                  onClick={() => updateConfig({ spoilerColor: 'carbon' })}
                  className={`flex-1 py-2 px-4 rounded transition-colors ${
                    config.spoilerColor === 'carbon'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  Carbon
                </button>
                <button
                  onClick={() => updateConfig({ spoilerColor: 'black' })}
                  className={`flex-1 py-2 px-4 rounded transition-colors ${
                    config.spoilerColor === 'black'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  Black
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Metal Elements Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">
            Metal Elements
          </h3>
          
          <div>
            <label className="block text-sm mb-2">Material Type</label>
            <div className="flex gap-2">
              <button
                onClick={() => updateConfig({ metalType: 'chrome' })}
                className={`flex-1 py-2 px-4 rounded transition-colors ${
                  config.metalType === 'chrome'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                Chrome
              </button>
              <button
                onClick={() => updateConfig({ metalType: 'brushed' })}
                className={`flex-1 py-2 px-4 rounded transition-colors ${
                  config.metalType === 'brushed'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                Brushed
              </button>
              <button
                onClick={() => updateConfig({ metalType: 'black' })}
                className={`flex-1 py-2 px-4 rounded transition-colors ${
                  config.metalType === 'black'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                Black
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">
              Roughness: {config.metalRoughness.toFixed(2)}
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

          <div>
            <label className="block text-sm mb-2">
              Metalness: {config.metalMetalness.toFixed(2)}
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
