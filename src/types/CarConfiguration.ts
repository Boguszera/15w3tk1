export type MaterialType = 'matte' | 'glossy';
export type WindowTint = 'clear' | 'tinted';
export type SpoilerColor = 'body' | 'carbon' | 'black';
export type MetalType = 'chrome' | 'brushed' | 'black';

export interface CarConfiguration {
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
