import { create } from 'zustand';

interface HeroCustomization {
  // Main object properties
  mainObjectColor: string;
  mainObjectMetalness: number;
  mainObjectRoughness: number;
  mainObjectEmissive: string;
  mainObjectEmissiveIntensity: number;
  mainObjectDistort: number;
  mainObjectSpeed: number;
  mainObjectScale: number;
  
  // Orbiting spheres
  sphere1Color: string;
  sphere1Position: [number, number, number];
  sphere1Scale: number;
  
  sphere2Color: string;
  sphere2Position: [number, number, number];
  sphere2Scale: number;
  
  sphere3Color: string;
  sphere3Position: [number, number, number];
  sphere3Scale: number;
  
  // Lighting
  ambientIntensity: number;
  directionalIntensity: number;
  pointLight1Color: string;
  pointLight1Intensity: number;
  pointLight2Color: string;
  pointLight2Intensity: number;
  
  // Animation
  floatSpeed: number;
  rotationSpeed: number;
  
  // Particles
  particleCount: number;
  particleColor: string;
  particleSize: number;
  particleOpacity: number;
  
  // Rings
  ring1Color: string;
  ring1Opacity: number;
  ring2Color: string;
  ring2Opacity: number;
}

interface HeroState {
  customization: HeroCustomization;
  updateCustomization: (updates: Partial<HeroCustomization>) => void;
  resetCustomization: () => void;
}

const defaultCustomization: HeroCustomization = {
  // Main object
  mainObjectColor: '#3B82F6',
  mainObjectMetalness: 0.9,
  mainObjectRoughness: 0.1,
  mainObjectEmissive: '#1E40AF',
  mainObjectEmissiveIntensity: 0.2,
  mainObjectDistort: 0.3,
  mainObjectSpeed: 2,
  mainObjectScale: 1.2,
  
  // Spheres
  sphere1Color: '#8B5CF6',
  sphere1Position: [3, 1, 0],
  sphere1Scale: 0.3,
  
  sphere2Color: '#10B981',
  sphere2Position: [-2.5, -1, 1],
  sphere2Scale: 0.2,
  
  sphere3Color: '#F59E0B',
  sphere3Position: [1.5, -2, -1],
  sphere3Scale: 0.15,
  
  // Lighting
  ambientIntensity: 0.3,
  directionalIntensity: 1.5,
  pointLight1Color: '#8B5CF6',
  pointLight1Intensity: 0.8,
  pointLight2Color: '#10B981',
  pointLight2Intensity: 0.6,
  
  // Animation
  floatSpeed: 1.5,
  rotationSpeed: 0.005,
  
  // Particles
  particleCount: 100,
  particleColor: '#3B82F6',
  particleSize: 0.05,
  particleOpacity: 0.6,
  
  // Rings
  ring1Color: '#3B82F6',
  ring1Opacity: 0.3,
  ring2Color: '#8B5CF6',
  ring2Opacity: 0.2,
};

export const useHeroStore = create<HeroState>((set) => ({
  customization: defaultCustomization,
  updateCustomization: (updates) =>
    set((state) => ({
      customization: { ...state.customization, ...updates }
    })),
  resetCustomization: () => set({ customization: defaultCustomization }),
}));