import { ComponentModel } from '@/types/component';

interface Customization {
  scale: [number, number, number];
  rotation: [number, number, number];
  position: [number, number, number];
  color: string;
  metalness: number;
  roughness: number;
}

export function generateComponentCode(component: ComponentModel, customization: Customization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  
  return `import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const { scene } = useGLTF('${component.modelPath}');
  const meshRef = useRef<THREE.Group>(null);

  // Apply customizations
  useEffect(() => {
    if (meshRef.current) {
      // Scale
      meshRef.current.scale.set(${scale[0]}, ${scale[1]}, ${scale[2]});
      
      // Rotation
      meshRef.current.rotation.set(${rotation[0]}, ${rotation[1]}, ${rotation[2]});
      
      // Position
      meshRef.current.position.set(${position[0]}, ${position[1]}, ${position[2]});
      
      // Material properties
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.color.setHex(0x${color.replace('#', '')});
            child.material.metalness = ${metalness};
            child.material.roughness = ${roughness};
          }
        }
      });
    }
  }, [scene]);

  return <primitive ref={meshRef} object={scene} />;
}

// Usage in your scene:
// <${component.name.replace(/\s+/g, '')}Component />`;
}