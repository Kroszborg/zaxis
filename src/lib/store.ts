import { create } from 'zustand';
import { ComponentModel, ComponentCustomization } from '@/types/component';

interface ComponentState {
  selectedComponent: ComponentModel | null;
  customization: ComponentCustomization;
  setSelectedComponent: (component: ComponentModel | null) => void;
  updateCustomization: (updates: Partial<ComponentCustomization>) => void;
  resetCustomization: () => void;
}

export const useComponentStore = create<ComponentState>((set) => ({
  selectedComponent: null,
  customization: {
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    color: '#3B82F6',
    metalness: 0.5,
    roughness: 0.2,
    emissiveIntensity: 0.2,
    animationSpeed: 1.0,
    particleCount: 12,
    distortion: 0.0,
  },
  setSelectedComponent: (component) => set({ selectedComponent: component }),
  updateCustomization: (updates) =>
    set((state) => ({
      customization: { ...state.customization, ...updates },
    })),
  resetCustomization: () =>
    set({
      customization: {
        scale: [1, 1, 1],
        rotation: [0, 0, 0],
        position: [0, 0, 0],
        color: '#3B82F6',
        metalness: 0.5,
        roughness: 0.2,
        emissiveIntensity: 0.2,
        animationSpeed: 1.0,
        particleCount: 12,
        distortion: 0.0,
      },
    }),
}));