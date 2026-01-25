import { useRef } from 'react';
import * as THREE from 'three';

export function RacetrackScene() {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef}>
      {/* Grass Field - Large area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial 
          color="#2d5016" 
          roughness={0.9}
        />
      </mesh>

      {/* Racing Track - Main straight section */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[8, 50]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          roughness={0.7}
        />
      </mesh>

      {/* White Starting Line - Front */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 20]} receiveShadow>
        <planeGeometry args={[8, 0.8]} />
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.5}
        />
      </mesh>

      {/* White Finish Line - Back (with checkers pattern effect) */}
      <group position={[0, 0.02, -20]} rotation={[-Math.PI / 2, 0, 0]}>
        {/* Create checkerboard pattern with alternating white/black squares */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[-3.5 + i, 0, 0]} receiveShadow>
            <planeGeometry args={[1, 0.8]} />
            <meshStandardMaterial 
              color={i % 2 === 0 ? '#ffffff' : '#1a1a1a'} 
              roughness={0.5}
            />
          </mesh>
        ))}
      </group>

      {/* Center Dashed Line */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh 
          key={`dash-${i}`}
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, 0.02, 18 - i * 4]} 
          receiveShadow
        >
          <planeGeometry args={[0.2, 1.5]} />
          <meshStandardMaterial 
            color="#ffff00" 
            roughness={0.5}
          />
        </mesh>
      ))}

      {/* Left Track Edge Line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3.8, 0.02, 0]} receiveShadow>
        <planeGeometry args={[0.4, 50]} />
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.5}
        />
      </mesh>

      {/* Right Track Edge Line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.8, 0.02, 0]} receiveShadow>
        <planeGeometry args={[0.4, 50]} />
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.5}
        />
      </mesh>

      {/* Left Barriers - Red and White */}
      {Array.from({ length: 25 }).map((_, i) => (
        <mesh 
          key={`left-barrier-${i}`}
          position={[-5, 0.5, 22 - i * 2]} 
          castShadow 
          receiveShadow
        >
          <boxGeometry args={[0.3, 1, 1.5]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? '#ff0000' : '#ffffff'} 
            roughness={0.6}
          />
        </mesh>
      ))}

      {/* Right Barriers - Red and White */}
      {Array.from({ length: 25 }).map((_, i) => (
        <mesh 
          key={`right-barrier-${i}`}
          position={[5, 0.5, 22 - i * 2]} 
          castShadow 
          receiveShadow
        >
          <boxGeometry args={[0.3, 1, 1.5]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? '#ff0000' : '#ffffff'} 
            roughness={0.6}
          />
        </mesh>
      ))}

      {/* Directional Sunlight - simulating outdoor daylight */}
      <directionalLight
        position={[20, 30, 10]}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={100}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        color="#fffacd"
      />

      {/* Additional ambient fill light for outdoor feel */}
      <hemisphereLight
        args={['#87ceeb', '#2d5016', 0.5]}
        position={[0, 20, 0]}
      />

      {/* Grandstand/Viewing area - Simple representation */}
      <mesh position={[-15, 2, 0]} castShadow>
        <boxGeometry args={[4, 4, 30]} />
        <meshStandardMaterial 
          color="#4a4a4a" 
          roughness={0.7}
        />
      </mesh>

      {/* Seating rows on grandstand */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh 
          key={`seat-${i}`}
          position={[-13 + i * 0.5, 1 + i * 0.5, 0]} 
          castShadow
        >
          <boxGeometry args={[0.4, 0.3, 28]} />
          <meshStandardMaterial 
            color="#ff6b35" 
            roughness={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}
