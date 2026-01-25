import { useRef } from 'react';
import * as THREE from 'three';

export function GarageScene() {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef}>
      {/* Concrete Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          color="#3a3a3a" 
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 5, -10]} receiveShadow castShadow>
        <boxGeometry args={[20, 10, 0.5]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          roughness={0.9}
        />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-10, 5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[20, 10, 0.5]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          roughness={0.9}
        />
      </mesh>

      {/* Right Wall */}
      <mesh position={[10, 5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[20, 10, 0.5]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          roughness={0.9}
        />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 10, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          roughness={0.8}
        />
      </mesh>

      {/* Fluorescent Light Strips - Left Side */}
      <group position={[-4, 9.5, 0]}>
        {/* Light fixture box */}
        <mesh castShadow>
          <boxGeometry args={[1, 0.3, 12]} />
          <meshStandardMaterial 
            color="#e0e0e0" 
            roughness={0.3}
            metalness={0.5}
          />
        </mesh>
        {/* Actual light sources */}
        <spotLight
          position={[0, -0.2, -4]}
          angle={Math.PI / 3}
          penumbra={0.5}
          intensity={150}
          castShadow
          shadow-bias={-0.0001}
          color="#fff8e7"
        />
        <spotLight
          position={[0, -0.2, 0]}
          angle={Math.PI / 3}
          penumbra={0.5}
          intensity={150}
          castShadow
          shadow-bias={-0.0001}
          color="#fff8e7"
        />
        <spotLight
          position={[0, -0.2, 4]}
          angle={Math.PI / 3}
          penumbra={0.5}
          intensity={150}
          castShadow
          shadow-bias={-0.0001}
          color="#fff8e7"
        />
      </group>

      {/* Fluorescent Light Strips - Right Side */}
      <group position={[4, 9.5, 0]}>
        {/* Light fixture box */}
        <mesh castShadow>
          <boxGeometry args={[1, 0.3, 12]} />
          <meshStandardMaterial 
            color="#e0e0e0" 
            roughness={0.3}
            metalness={0.5}
          />
        </mesh>
        {/* Actual light sources */}
        <spotLight
          position={[0, -0.2, -4]}
          angle={Math.PI / 3}
          penumbra={0.5}
          intensity={150}
          castShadow
          shadow-bias={-0.0001}
          color="#fff8e7"
        />
        <spotLight
          position={[0, -0.2, 0]}
          angle={Math.PI / 3}
          penumbra={0.5}
          intensity={150}
          castShadow
          shadow-bias={-0.0001}
          color="#fff8e7"
        />
        <spotLight
          position={[0, -0.2, 4]}
          angle={Math.PI / 3}
          penumbra={0.5}
          intensity={150}
          castShadow
          shadow-bias={-0.0001}
          color="#fff8e7"
        />
      </group>

      {/* Tool Cabinet - Left Side */}
      <mesh position={[-9, 2, -8]} castShadow>
        <boxGeometry args={[1.5, 4, 2]} />
        <meshStandardMaterial 
          color="#cc0000" 
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Work Bench - Right Side */}
      <mesh position={[8, 1.5, -8]} castShadow>
        <boxGeometry args={[2, 3, 3]} />
        <meshStandardMaterial 
          color="#8b4513" 
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}
