import { useRef, useMemo } from 'react';
import { useConfigStore } from '../store/configStore';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function CarModel() {
  const config = useConfigStore((state) => state.config);
  const bodyRef = useRef<THREE.Mesh>(null);
  const spoilerRef = useRef<THREE.Mesh>(null);

  // Body material
  const bodyMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      color: config.bodyColor,
      roughness: config.bodyMaterial === 'matte' ? 0.9 : 0.2,
      metalness: 0.2,
    });
    return material;
  }, [config.bodyColor, config.bodyMaterial]);

  // Wheel material
  const wheelMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: config.wheelColor,
      roughness: 0.8,
      metalness: 0.1,
    });
  }, [config.wheelColor]);

  // Window material
  const windowMaterial = useMemo(() => {
    const tintColor = config.windowTint === 'tinted' ? 0x333333 : 0xffffff;
    return new THREE.MeshPhysicalMaterial({
      color: tintColor,
      transmission: config.windowTransparency,
      transparent: true,
      roughness: 0.1,
      metalness: 0,
      opacity: 1 - config.windowTransparency * 0.8,
    });
  }, [config.windowTransparency, config.windowTint]);

  // Spoiler material
  const spoilerMaterial = useMemo(() => {
    let color = config.bodyColor;
    let roughness = config.bodyMaterial === 'matte' ? 0.9 : 0.2;
    let metalness = 0.2;

    if (config.spoilerColor === 'carbon') {
      color = '#1a1a1a';
      roughness = 0.3;
      metalness = 0.5;
    } else if (config.spoilerColor === 'black') {
      color = '#000000';
      roughness = 0.5;
      metalness = 0.3;
    }

    return new THREE.MeshStandardMaterial({
      color,
      roughness,
      metalness,
    });
  }, [config.spoilerColor, config.bodyColor, config.bodyMaterial]);

  // Metal elements material
  const metalMaterial = useMemo(() => {
    let color = '#ffffff';
    if (config.metalType === 'brushed') {
      color = '#cccccc';
    } else if (config.metalType === 'black') {
      color = '#1a1a1a';
    }

    return new THREE.MeshStandardMaterial({
      color,
      roughness: config.metalRoughness,
      metalness: config.metalMetalness,
    });
  }, [config.metalType, config.metalRoughness, config.metalMetalness]);

  // Lamp materials with emission
  const frontLampMaterial = useMemo(() => {
    const intensity = config.frontLampsOn ? config.frontLampsIntensity : 0;
    return new THREE.MeshStandardMaterial({
      color: config.frontLampsColor,
      emissive: config.frontLampsColor,
      emissiveIntensity: intensity,
    });
  }, [config.frontLampsOn, config.frontLampsIntensity, config.frontLampsColor]);

  const backLampMaterial = useMemo(() => {
    const intensity = config.backLampsOn ? config.backLampsIntensity : 0;
    return new THREE.MeshStandardMaterial({
      color: config.backLampsColor,
      emissive: config.backLampsColor,
      emissiveIntensity: intensity,
    });
  }, [config.backLampsOn, config.backLampsIntensity, config.backLampsColor]);

  // Animate materials for smooth transitions
  useFrame(() => {
    if (bodyRef.current) {
      const material = bodyRef.current.material as THREE.MeshStandardMaterial;
      const targetColor = new THREE.Color(config.bodyColor);
      material.color.lerp(targetColor, 0.1);
    }
  });

  return (
    <group>
      {/* Body - main car body */}
      <mesh ref={bodyRef} position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.8, 4]} />
        <primitive object={bodyMaterial} />
      </mesh>

      {/* Cabin */}
      <mesh position={[0, 1.2, -0.3]} castShadow>
        <boxGeometry args={[1.6, 0.7, 2]} />
        <primitive object={bodyMaterial} />
      </mesh>

      {/* Windows */}
      <mesh position={[0.81, 1.2, -0.3]} castShadow>
        <boxGeometry args={[0.02, 0.6, 1.8]} />
        <primitive object={windowMaterial} />
      </mesh>
      <mesh position={[-0.81, 1.2, -0.3]} castShadow>
        <boxGeometry args={[0.02, 0.6, 1.8]} />
        <primitive object={windowMaterial} />
      </mesh>
      <mesh position={[0, 1.2, 0.6]} castShadow>
        <boxGeometry args={[1.6, 0.6, 0.02]} />
        <primitive object={windowMaterial} />
      </mesh>
      <mesh position={[0, 1.2, -1.2]} castShadow>
        <boxGeometry args={[1.6, 0.6, 0.02]} />
        <primitive object={windowMaterial} />
      </mesh>

      {/* Wheels */}
      {[
        [-0.8, 0.3, 1.3],
        [0.8, 0.3, 1.3],
        [-0.8, 0.3, -1.3],
        [0.8, 0.3, -1.3],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
            <primitive object={wheelMaterial} />
          </mesh>
        </group>
      ))}

      {/* Front lamps */}
      <mesh position={[0.6, 0.6, 2.1]} castShadow>
        <boxGeometry args={[0.3, 0.2, 0.1]} />
        <primitive object={frontLampMaterial} />
      </mesh>
      <mesh position={[-0.6, 0.6, 2.1]} castShadow>
        <boxGeometry args={[0.3, 0.2, 0.1]} />
        <primitive object={frontLampMaterial} />
      </mesh>

      {/* Back lamps */}
      <mesh position={[0.6, 0.6, -2.1]} castShadow>
        <boxGeometry args={[0.3, 0.2, 0.1]} />
        <primitive object={backLampMaterial} />
      </mesh>
      <mesh position={[-0.6, 0.6, -2.1]} castShadow>
        <boxGeometry args={[0.3, 0.2, 0.1]} />
        <primitive object={backLampMaterial} />
      </mesh>

      {/* Spoiler */}
      {config.spoilerVisible && (
        <group ref={spoilerRef}>
          <mesh position={[0, 1.3, -1.8]} castShadow>
            <boxGeometry args={[1.6, 0.1, 0.4]} />
            <primitive object={spoilerMaterial} />
          </mesh>
          <mesh position={[0.6, 1.1, -1.8]} castShadow>
            <boxGeometry args={[0.1, 0.3, 0.3]} />
            <primitive object={spoilerMaterial} />
          </mesh>
          <mesh position={[-0.6, 1.1, -1.8]} castShadow>
            <boxGeometry args={[0.1, 0.3, 0.3]} />
            <primitive object={spoilerMaterial} />
          </mesh>
        </group>
      )}

      {/* Metal elements - grille, mirrors, etc. */}
      <mesh position={[0, 0.5, 2.05]} castShadow>
        <boxGeometry args={[1.2, 0.3, 0.05]} />
        <primitive object={metalMaterial} />
      </mesh>
      <mesh position={[0.95, 1.0, 0]} castShadow>
        <boxGeometry args={[0.1, 0.15, 0.2]} />
        <primitive object={metalMaterial} />
      </mesh>
      <mesh position={[-0.95, 1.0, 0]} castShadow>
        <boxGeometry args={[0.1, 0.15, 0.2]} />
        <primitive object={metalMaterial} />
      </mesh>
    </group>
  );
}
