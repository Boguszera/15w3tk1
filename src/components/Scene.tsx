import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { CarModel } from './CarModel';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

export function Scene() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null);

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [5, 3, 5], fov: 50 }}
        shadows
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <color attach="background" args={['#1a1a1a']} />
        
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.5}
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
        
        <Suspense fallback={null}>
          <CarModel />
        </Suspense>
        
        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        
        {/* Contact shadows for better visual effect */}
        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.5}
          scale={10}
          blur={2}
          far={4}
        />
        
        {/* Camera controls */}
        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
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
