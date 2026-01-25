export type MaterialType = 'matte' | 'glossy';
export type WindowTint = 'clear' | 'tinted';
export type SpoilerColor = 'body' | 'carbon' | 'black';
export type MetalType = 'chrome' | 'brushed' | 'black';
export type SceneType = 'default' | 'garage' | 'racetrack';

export interface SceneConfig {
  backgroundColor: string;
  ambientLightIntensity: number;
  directionalLightIntensity: number;
  groundColor: string;
  cameraPosition: [number, number, number];
}

export const sceneConfigs: Record<SceneType, SceneConfig> = {
  default: {
    backgroundColor: '#1a1a1a',
    ambientLightIntensity: 0.6,
    directionalLightIntensity: 1.5,
    groundColor: '#2a2a2a',
    cameraPosition: [5, 3, 5],
  },
  garage: {
    backgroundColor: '#0f0f0f',
    ambientLightIntensity: 0.8,
    directionalLightIntensity: 2.0,
    groundColor: '#1a1a1a',
    cameraPosition: [4, 2, 4],
  },
  racetrack: {
    backgroundColor: '#87ceeb',
    ambientLightIntensity: 1.0,
    directionalLightIntensity: 2.5,
    groundColor: '#228b22',
    cameraPosition: [6, 4, 6],
  },
};

export interface CarConfiguration {
  // Scene
  currentScene: SceneType;
  // Body
  bodyColor: string;
  bodyMaterial: MaterialType;
  
  // Wheels
  wheelColor: string;
  
  // Lamps
  frontLampsOn: boolean;
  frontLampsIntensity: number;
  frontLampsColor: string;
  backLampsOn: boolean;
  backLampsIntensity: number;
  backLampsColor: string;
  
  // Windows
  windowTransparency: number;
  windowTint: WindowTint;
  
  // Spoiler
  spoilerVisible: boolean;
  spoilerColor: SpoilerColor;
  
  // Metal elements
  metalType: MetalType;
  metalRoughness: number;
  metalMetalness: number;
}

export const defaultConfiguration: CarConfiguration = {
  currentScene: 'default',
  bodyColor: '#ff0000',
  bodyMaterial: 'glossy',
  wheelColor: '#2c2c2c',
  frontLampsOn: false,
  frontLampsIntensity: 2,
  frontLampsColor: '#ffffff',
  backLampsOn: false,
  backLampsIntensity: 2,
  backLampsColor: '#ff0000',
  windowTransparency: 0.3,
  windowTint: 'clear',
  spoilerVisible: true,
  spoilerColor: 'body',
  metalType: 'chrome',
  metalRoughness: 0.2,
  metalMetalness: 1.0,
};
