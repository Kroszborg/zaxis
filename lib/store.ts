import { create } from 'zustand';
import { ComponentModel } from '@/types/component';

interface ComponentState {
  selectedComponent: ComponentModel | null;
  customization: {
    scale: [number, number, number];
    rotation: [number, number, number];
    position: [number, number, number];
    color: string;
    metalness: number;
    roughness: number;
  };
  setSelectedComponent: (component: ComponentModel | null) => void;
  updateCustomization: (updates: Partial<ComponentState['customization']>) => void;
  resetCustomization: () => void;
}

const defaultCustomization = {
  scale: [1, 1, 1] as [number, number, number],
  rotation: [0, 0, 0] as [number, number, number],
  position: [0, 0, 0] as [number, number, number],
  color: '#3B82F6',
  metalness: 0.5,
  roughness: 0.2,
};

export const useComponentStore = create<ComponentState>((set) => ({
  selectedComponent: null,
  customization: defaultCustomization,
  setSelectedComponent: (component) => 
    set({ selectedComponent: component, customization: defaultCustomization }),
  updateCustomization: (updates) =>
    set((state) => ({
      customization: { ...state.customization, ...updates }
    })),
  resetCustomization: () => set({ customization: defaultCustomization }),
}));