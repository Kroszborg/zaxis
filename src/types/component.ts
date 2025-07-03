export interface ComponentModel {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  componentType:
    | 'hex-bolt'
    | 'door-hinge'
    | 'metal-panel'
    | 'gear-assembly'
    | 'circuit-board'
    | 'ornate-bracket'
    | 'floating-sphere'
    | 'geometric-cube'
    | 'wireframe-sphere'
    | 'particle-system'
    | 'cube'
    | 'sphere'
    | 'torus'
    | 'cone'
    | 'plane'
    | 'text-3d'
    | 'directional-light'
    | 'perspective-camera'
    | 'grid-helper'
    | 'axes-helper'
    | 'cylinder'
    | 'pyramid'
    | 'capsule'
    | 'hero-block'
    | 'showcase-card';
  thumbnailPath: string;
  defaultScale: [number, number, number];
  defaultRotation: [number, number, number];
  defaultPosition: [number, number, number];
  materials: string[];
  complexity: 'simple' | 'medium' | 'complex';
  downloadCount: number;
  rating: number;
  features: string[]; // Animation features, effects, etc.
}

export interface ComponentCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}

export interface ComponentCustomization {
  scale: [number, number, number];
  rotation: [number, number, number];
  position: [number, number, number];
  color: string;
  metalness: number;
  roughness: number;
  emissiveIntensity?: number;
  animationSpeed?: number;
  particleCount?: number;
  distortion?: number;
}