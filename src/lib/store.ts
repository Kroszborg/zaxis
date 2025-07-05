import { create } from 'zustand';
import { ComponentModel, ComponentCustomization } from '@/types/component';

interface ComponentState {
  selectedComponent: ComponentModel | null;
  customization: ComponentCustomization;
  setSelectedComponent: (component: ComponentModel | null) => void;
  updateCustomization: (updates: Partial<ComponentCustomization>) => void;
  resetCustomization: () => void;
  resetToComponentDefaults: (component: ComponentModel) => void;
}

// Default customization values optimized for all component types
const defaultCustomization: ComponentCustomization = {
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
};

// Component-specific default customizations
const componentDefaults: Record<string, Partial<ComponentCustomization>> = {
  'hex-bolt': {
    color: '#6B7280',
    metalness: 0.8,
    roughness: 0.2,
    scale: [1, 1, 1],
  },
  'door-hinge': {
    color: '#D97706',
    metalness: 0.9,
    roughness: 0.1,
    scale: [1, 1, 1],
  },
  'metal-panel': {
    color: '#9CA3AF',
    metalness: 0.7,
    roughness: 0.3,
    scale: [1, 1, 1],
  },
  'gear-assembly': {
    color: '#6B7280',
    metalness: 0.8,
    roughness: 0.2,
    scale: [1, 1, 1],
    animationSpeed: 0.5,
  },
  'circuit-board': {
    color: '#1F2937',
    metalness: 0.8,
    roughness: 0.4,
    scale: [1, 1, 1],
    emissiveIntensity: 0.3,
  },
  'ornate-bracket': {
    color: '#D97706',
    metalness: 0.9,
    roughness: 0.1,
    scale: [1, 1, 1],
  },
  'floating-sphere': {
    color: '#00D4FF',
    metalness: 0.0,
    roughness: 0.2,
    scale: [1, 1, 1],
    emissiveIntensity: 0.8,
    animationSpeed: 1.5,
  },
  'geometric-cube': {
    color: '#E0E7FF',
    metalness: 0.0,
    roughness: 0.0,
    scale: [1, 1, 1],
    distortion: 0.1,
  },
  'wireframe-sphere': {
    color: '#00D4FF',
    metalness: 0.0,
    roughness: 0.2,
    scale: [1, 1, 1],
    emissiveIntensity: 0.6,
    animationSpeed: 1.2,
  },
  'cube': {
    color: '#3B82F6',
    metalness: 0.0,
    roughness: 0.8,
    scale: [1, 1, 1],
  },
  'sphere': {
    color: '#3B82F6',
    metalness: 0.0,
    roughness: 0.8,
    scale: [1, 1, 1],
  },
  'torus': {
    color: '#3B82F6',
    metalness: 0.0,
    roughness: 0.8,
    scale: [1, 1, 1],
  },
  'cone': {
    color: '#3B82F6',
    metalness: 0.0,
    roughness: 0.8,
    scale: [1, 1, 1],
  },
  'plane': {
    color: '#3B82F6',
    metalness: 0.0,
    roughness: 0.8,
    scale: [1, 1, 1],
  },
  'text-3d': {
    color: '#3B82F6',
    metalness: 0.0,
    roughness: 0.8,
    scale: [1, 1, 1],
  },
  'directional-light': {
    color: '#F59E0B',
    metalness: 0.0,
    roughness: 0.2,
    scale: [1, 1, 1],
    emissiveIntensity: 1.0,
  },
  'perspective-camera': {
    color: '#1F2937',
    metalness: 0.8,
    roughness: 0.4,
    scale: [1, 1, 1],
  },
  'grid-helper': {
    color: '#00D4FF',
    metalness: 0.0,
    roughness: 0.2,
    scale: [1, 1, 1],
    emissiveIntensity: 0.4,
  },
  'axes-helper': {
    color: '#00D4FF',
    metalness: 0.0,
    roughness: 0.2,
    scale: [1, 1, 1],
    emissiveIntensity: 0.4,
  },
  'cylinder': {
    color: '#3B82F6',
    metalness: 0.0,
    roughness: 0.8,
    scale: [1, 1, 1],
  },
  'pyramid': {
    color: '#8B4513',
    metalness: 0.0,
    roughness: 0.8,
    scale: [1, 1, 1],
  },
  'capsule': {
    color: '#3B82F6',
    metalness: 0.0,
    roughness: 0.8,
    scale: [1, 1, 1],
  },
  'hero-block': {
    color: '#E0E7FF',
    metalness: 0.0,
    roughness: 0.0,
    scale: [1.5, 0.5, 1],
    emissiveIntensity: 0.3,
  },
  'showcase-card': {
    color: '#E0E7FF',
    metalness: 0.0,
    roughness: 0.0,
    scale: [1.2, 0.2, 0.8],
  },
};

export const useComponentStore = create<ComponentState>((set, get) => ({
  selectedComponent: null,
  customization: { ...defaultCustomization },
  
  setSelectedComponent: (component) => {
    set({ selectedComponent: component });
    
    // Apply component-specific defaults when selecting a new component
    if (component) {
      const componentDefault = componentDefaults[component.componentType] || {};
      const newCustomization = {
        ...defaultCustomization,
        ...componentDefault,
        // Use component's default scale if available
        scale: component.defaultScale || defaultCustomization.scale,
        rotation: component.defaultRotation || defaultCustomization.rotation,
        position: component.defaultPosition || defaultCustomization.position,
      };
      set({ customization: newCustomization });
    }
  },
  
  updateCustomization: (updates) =>
    set((state) => ({
      customization: { ...state.customization, ...updates },
    })),
    
  resetCustomization: () => {
    const { selectedComponent } = get();
    if (selectedComponent) {
      const componentDefault = componentDefaults[selectedComponent.componentType] || {};
      const resetCustomization = {
        ...defaultCustomization,
        ...componentDefault,
        scale: selectedComponent.defaultScale || defaultCustomization.scale,
        rotation: selectedComponent.defaultRotation || defaultCustomization.rotation,
        position: selectedComponent.defaultPosition || defaultCustomization.position,
      };
      set({ customization: resetCustomization });
    } else {
      set({ customization: { ...defaultCustomization } });
    }
  },
  
  resetToComponentDefaults: (component) => {
    const componentDefault = componentDefaults[component.componentType] || {};
    const resetCustomization = {
      ...defaultCustomization,
      ...componentDefault,
      scale: component.defaultScale || defaultCustomization.scale,
      rotation: component.defaultRotation || defaultCustomization.rotation,
      position: component.defaultPosition || defaultCustomization.position,
    };
    set({ customization: resetCustomization });
  },
}));