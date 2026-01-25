import { useEffect, useMemo, useRef } from 'react';
import { useConfigStore } from '../store/configStore';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

type GLTFNodes = Record<string, THREE.Object3D>;

type GLTFResult = {
  nodes: GLTFNodes;
  scene: THREE.Group;
};

function setMaterialDeep(object: THREE.Object3D | undefined, material: THREE.Material) {
  if (!object) return;

  object.traverse((o) => {
    if ((o as THREE.Mesh).isMesh) {
      const mesh = o as THREE.Mesh;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.material = material;
    }
  });
}

function getFirstMeshMaterial(object: THREE.Object3D | undefined) {
  let mat: THREE.MeshStandardMaterial | undefined;
  if (!object) return mat;

  object.traverse((o) => {
    if (mat) return;
    if ((o as THREE.Mesh).isMesh) {
      const mesh = o as THREE.Mesh;
      const m = mesh.material as THREE.Material | THREE.Material[];
      const first = Array.isArray(m) ? m[0] : m;
      if (first && (first as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
        mat = first as THREE.MeshStandardMaterial;
      }
    }
  });

  return mat;
}

export function CarModel() {
  const config = useConfigStore((state) => state.config);

  const { nodes } = useGLTF('./car_model.glb') as unknown as GLTFResult;

  // Poprawne nazwy z Twojego loga:
  const bodyObj = nodes['body'];
  const wheelsObj = nodes['wheels'];
  const windowsObj = nodes['windows_1'];
  const metalObj = nodes['metal_elements'];
  const spoilerObj = nodes['spoiler'];

  // UWAGA: u Ciebie jest "frontligts" (literówka w GLB)
  const frontLightsObj = nodes['frontligts'] ?? nodes['frontlamps'];
  const backLightsObj = nodes['backlamps'] ?? nodes['backlights'] ?? nodes['backligts'];

  // Body material
  const bodyMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: config.bodyColor,
      roughness: config.bodyMaterial === 'matte' ? 0.9 : 0.2,
      metalness: 0.2,
    });
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
      depthWrite: false,
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

    return new THREE.MeshStandardMaterial({ color, roughness, metalness });
  }, [config.spoilerColor, config.bodyColor, config.bodyMaterial]);

  // Metal elements material
  const metalMaterial = useMemo(() => {
    let color = '#ffffff';
    if (config.metalType === 'brushed') color = '#cccccc';
    else if (config.metalType === 'black') color = '#1a1a1a';

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
  const intensity = config.backLampsOn ? Math.max(0.5, config.backLampsIntensity) : 0;
  return new THREE.MeshStandardMaterial({
    color: config.backLampsColor,
    emissive: config.backLampsColor,
    emissiveIntensity: intensity,
  });
}, [config.backLampsOn, config.backLampsIntensity, config.backLampsColor]);

  // Przypinamy materiały do całych "grup" (rekurencyjnie do mesh children)
  useEffect(() => {
    setMaterialDeep(bodyObj, bodyMaterial);
    setMaterialDeep(wheelsObj, wheelMaterial);
    setMaterialDeep(windowsObj, windowMaterial);
    setMaterialDeep(metalObj, metalMaterial);

    // lampy
    setMaterialDeep(frontLightsObj, frontLampMaterial);
    setMaterialDeep(backLightsObj, backLampMaterial);

    // spoiler tylko jak ma być widoczny
    if (config.spoilerVisible) setMaterialDeep(spoilerObj, spoilerMaterial);
  }, [
    bodyObj,
    wheelsObj,
    windowsObj,
    metalObj,
    spoilerObj,
    frontLightsObj,
    backLightsObj,
    bodyMaterial,
    wheelMaterial,
    windowMaterial,
    metalMaterial,
    spoilerMaterial,
    frontLampMaterial,
    backLampMaterial,
    config.spoilerVisible,
  ]);

  // Smooth transition dla koloru karoserii:
  // lerpujemy kolor na pierwszym MeshStandardMaterial znalezionym w body
  const bodyMatRef = useRef<THREE.MeshStandardMaterial | undefined>(undefined);

  useEffect(() => {
    bodyMatRef.current = getFirstMeshMaterial(bodyObj) ?? undefined;
  }, [bodyObj]);

  useFrame(() => {
    const mat = bodyMatRef.current;
    if (!mat) return;
    const target = new THREE.Color(config.bodyColor);
    mat.color.lerp(target, 0.1);
  });

  // Debug (możesz potem usunąć)
  useEffect(() => {
    console.log('GLB nodes keys:', Object.keys(nodes));
  }, [nodes]);

  // Renderujemy obiekty jako primitive (bo to mogą być Group, nie Mesh)
  return (
    <group>
      {bodyObj && <primitive object={bodyObj} />}
      {wheelsObj && <primitive object={wheelsObj} />}
      {windowsObj && <primitive object={windowsObj} />}
      {metalObj && <primitive object={metalObj} />}

      {frontLightsObj && <primitive object={frontLightsObj} />}
      {backLightsObj && <primitive object={backLightsObj} />}

      {config.spoilerVisible && spoilerObj && <primitive object={spoilerObj} />}
    </group>
  );
}

useGLTF.preload('./car_model.glb');