import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { CarModel } from './CarModel';
import { GarageScene } from './GarageScene';
import { RacetrackScene } from './RacetrackScene';
import { Suspense, useRef, useEffect } from 'react';
import * as THREE from 'three';
// import { useConfigStore } from '../store/configStore'; // To na razie wyłączamy, bo używamy propsów
import { sceneConfigs } from '../types/CarConfiguration';

// 1. Definiujemy typy scen (muszą pasować do kluczy w sceneConfigs)
export type SceneType = 'default' | 'garage' | 'racetrack';

// 2. Definiujemy interfejs propsów
interface SceneProps {
  currentScene: SceneType;
}

// 3. Odbieramy currentScene z propsów funkcji
export function Scene({ currentScene }: SceneProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null);

  // UWAGA: Usunąłem linijkę z useConfigStore, ponieważ teraz currentScene przychodzi "z góry" (z App.tsx).
  // Dzięki temu unikamy konfliktu nazw i błędu TypeScript.
  
  const sceneConfig = sceneConfigs[currentScene];

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  // Update camera position when scene changes
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  }, [currentScene]);

  return (
    <div className="relative w-full h-full">
      <Canvas
        // Używamy pozycji kamery z konfiguracji
        camera={{ position: sceneConfig.cameraPosition, fov: 50 }}
        shadows
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        // Klucz wymusza odświeżenie Canvasu przy zmianie sceny
        key={currentScene}
      >
        <color attach="background" args={[sceneConfig.backgroundColor]} />
        
        {/* Base Lighting - Applied to all scenes */}
        <ambientLight intensity={sceneConfig.ambientLightIntensity} />
        
        {/* Scene-specific rendering */}
        {currentScene === 'default' && (
          <>
            <directionalLight
              position={[5, 10, 5]}
              intensity={sceneConfig.directionalLightIntensity}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
            />
            <directionalLight position={[-5, 5, -5]} intensity={0.5} />
            <pointLight position={[0, 5, 0]} intensity={0.3} />
            
            {/* Default Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
              <planeGeometry args={[50, 50]} />
              <meshStandardMaterial color={sceneConfig.groundColor} />
            </mesh>
          </>
        )}

        {currentScene === 'garage' && (
          <>
            <GarageScene />
          </>
        )}

        {currentScene === 'racetrack' && (
          <>
            <RacetrackScene />
          </>
        )}
        
        <Suspense fallback={null}>
          <CarModel />
        </Suspense>
        
        {/* Contact shadows for better visual effect */}
        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.5}
          scale={10}
          blur={2}
          far={4}
        />
        
        {/* Camera controls with auto-rotate for dynamic presentation */}
        {/* Auto-rotate speed of 1.0 provides slow, cinematic camera movement */}
        {/* Users can manually override by interacting with the controls */}
        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={1.0}
          minDistance={3}
          maxDistance={20}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
      
      {/* Camera reset button */}
      <button
        onClick={resetCamera}
        className="absolute bottom-6 left-6 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600/90 to-blue-600/90 hover:from-purple-700 hover:to-blue-700 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 border border-white/10 text-sm sm:text-base"
      >
        🔄 <span className="hidden sm:inline">Reset Camera</span>
      </button>
    </div>
  );
}