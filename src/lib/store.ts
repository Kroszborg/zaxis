import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ComponentModel, ComponentCustomization } from '@/types/component';

interface ComponentState {
  selectedComponent: ComponentModel | null;
  customization: ComponentCustomization;
  favorites: string[]; // Array of component IDs
  setSelectedComponent: (component: ComponentModel | null) => void;
  updateCustomization: (updates: Partial<ComponentCustomization>) => void;
  resetCustomization: () => void;
  resetToComponentDefaults: (component: ComponentModel) => void;
  toggleFavorite: (componentId: string) => void;
  isFavorite: (componentId: string) => boolean;
  clearFavorites: () => void;
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
  'holographic-display': {
    color: '#00D4FF',
    metalness: 0.0,
    roughness: 0.0,
    scale: [1.5, 1, 0.1],
    emissiveIntensity: 0.3,
  },
  'energy-core': {
    color: '#FF6600',
    metalness: 0.0,
    roughness: 0.2,
    scale: [1, 1, 1],
    emissiveIntensity: 0.8,
  },
  'neon-sign': {
    color: '#FF0080',
    metalness: 0.0,
    roughness: 0.2,
    scale: [2, 0.5, 0.1],
    emissiveIntensity: 0.5,
  },
  'floating-island': {
    color: '#8B4513',
    metalness: 0.0,
    roughness: 0.8,
    scale: [2, 1, 2],
  },
  'portal-gate': {
    color: '#8B5CF6',
    metalness: 0.0,
    roughness: 0.2,
    scale: [1.5, 2, 0.3],
    emissiveIntensity: 0.6,
  },
  'crystal-cluster': {
    color: '#00D4FF',
    metalness: 0.0,
    roughness: 0.0,
    scale: [1, 1, 1],
  },
  'steampunk-engine': {
    color: '#D97706',
    metalness: 0.8,
    roughness: 0.2,
    scale: [1.2, 1, 1],
  },
  'data-sphere': {
    color: '#00D4FF',
    metalness: 0.0,
    roughness: 0.2,
    scale: [1, 1, 1],
    emissiveIntensity: 0.3,
  },
  'magnetic-field': {
    color: '#00D4FF',
    metalness: 0.0,
    roughness: 0.2,
    scale: [1.5, 1.5, 1.5],
    emissiveIntensity: 0.4,
  },
  'quantum-cube': {
    color: '#8B5CF6',
    metalness: 0.0,
    roughness: 0.2,
    scale: [1, 1, 1],
    emissiveIntensity: 0.5,
  },
  'time-machine': {
    color: '#D97706',
    metalness: 0.8,
    roughness: 0.2,
    scale: [1.3, 1.3, 1.3],
  },
  'neural-network': {
    color: '#00D4FF',
    metalness: 0.0,
    roughness: 0.2,
    scale: [1.5, 1.5, 1.5],
    emissiveIntensity: 0.4,
  },
  'crystal-prism': {
    color: '#00D4FF',
    metalness: 0.0,
    roughness: 0.0,
    scale: [1, 1, 1],
  },
  'plasma-ball': {
    color: '#FF6600',
    metalness: 0.0,
    roughness: 0.2,
    scale: [1, 1, 1],
    emissiveIntensity: 0.8,
  },
  'fractal-tree': {
    color: '#8B4513',
    metalness: 0.0,
    roughness: 0.8,
    scale: [1, 2, 1],
  },
  'holographic-ui': {
    color: '#00D4FF',
    metalness: 0.0,
    roughness: 0.0,
    scale: [2, 1.5, 0.1],
    emissiveIntensity: 0.3,
  },
  'modern-card': {
    color: '#E0E7FF',
    metalness: 0.0,
    roughness: 0.0,
    scale: [1.2, 0.8, 1.5],
  },
  'floating-button': {
    color: '#00D4FF',
    metalness: 0.0,
    roughness: 0.2,
    scale: [1, 1, 1],
    emissiveIntensity: 0.3,
  },
  'progress-bar': {
    color: '#3B82F6',
    metalness: 0.0,
    roughness: 0.8,
    scale: [1.5, 0.8, 1],
  },
  'notification-badge': {
    color: '#EF4444',
    metalness: 0.0,
    roughness: 0.2,
    scale: [1, 1, 1],
    emissiveIntensity: 0.5,
  },
  // New Components
  'tree': {
    color: '#8B4513',
    metalness: 0.1,
    roughness: 0.9,
    scale: [1, 1, 1],
    animationSpeed: 1.0,
  },
  'smartphone': {
    color: '#1F2937',
    metalness: 0.8,
    roughness: 0.2,
    scale: [1, 1, 1],
    emissiveIntensity: 0.5,
  },
  'bar-chart': {
    color: '#3B82F6',
    metalness: 0.3,
    roughness: 0.4,
    scale: [1, 1, 1],
    emissiveIntensity: 0.2,
  },
  'laptop': {
    color: '#1F2937',
    metalness: 0.8,
    roughness: 0.2,
    scale: [1, 1, 1],
    emissiveIntensity: 0.5,
    animationSpeed: 1.0,
  },
  'chair': {
    color: '#8B4513',
    metalness: 0.2,
    roughness: 0.8,
    scale: [1, 1, 1],
    animationSpeed: 1.0,
  },
  'pie-chart': {
    color: '#3B82F6',
    metalness: 0.3,
    roughness: 0.4,
    scale: [1, 1, 1],
    emissiveIntensity: 0.1,
    animationSpeed: 1.0,
  },
};

export const useComponentStore = create<ComponentState>()(
  persist(
    (set, get) => ({
      selectedComponent: null,
      customization: { ...defaultCustomization },
      favorites: [],

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

      toggleFavorite: (componentId) => {
        set((state) => {
          const isFav = state.favorites.includes(componentId);
          return {
            favorites: isFav
              ? state.favorites.filter((id) => id !== componentId)
              : [...state.favorites, componentId],
          };
        });
      },

      isFavorite: (componentId) => {
        return get().favorites.includes(componentId);
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: 'zaxis-storage',
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);