import { useRef, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { use3DAnimation } from '@/hooks/use-3d-animation';

interface TreeProps {
  customization: {
    scale: [number, number, number];
    rotation: [number, number, number];
    position: [number, number, number];
    color: string;
    metalness: number;
    roughness: number;
    emissiveIntensity?: number;
    animationSpeed?: number;
  };
}

export const Tree = memo(function Tree({ customization }: TreeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const leavesRef = useRef<THREE.Group>(null);

  // Use shared animation hook for scale, rotation, position
  use3DAnimation(groupRef, customization);

  // Gentle swaying animation for leaves
  useFrame((state) => {
    if (leavesRef.current) {
      const time = state.clock.elapsedTime;
      const speed = customization.animationSpeed || 1.0;

      // Sway leaves gently in the wind
      leavesRef.current.rotation.z = Math.sin(time * speed) * 0.05;
      leavesRef.current.rotation.x = Math.cos(time * speed * 0.7) * 0.03;
    }
  });

  const trunkColor = customization.color || '#8B4513';
  const leavesColor = '#22C55E'; // Green for leaves

  return (
    <group ref={groupRef}>
      {/* Tree Trunk */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.4, 2, 12]} />
        <meshStandardMaterial
          color={trunkColor}
          metalness={customization.metalness * 0.1}
          roughness={Math.max(customization.roughness, 0.8)}
        />
      </mesh>

      {/* Leaves - Multi-tier design */}
      <group ref={leavesRef}>
        {/* Bottom tier - largest */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <coneGeometry args={[1.2, 1.5, 8]} />
          <meshStandardMaterial
            color={leavesColor}
            metalness={0.0}
            roughness={0.8}
            emissive={leavesColor}
            emissiveIntensity={(customization.emissiveIntensity || 0) * 0.3}
          />
        </mesh>

        {/* Middle tier */}
        <mesh position={[0, 2.2, 0]} castShadow>
          <coneGeometry args={[1.0, 1.2, 8]} />
          <meshStandardMaterial
            color={leavesColor}
            metalness={0.0}
            roughness={0.8}
            emissive={leavesColor}
            emissiveIntensity={(customization.emissiveIntensity || 0) * 0.3}
          />
        </mesh>

        {/* Top tier - smallest */}
        <mesh position={[0, 2.8, 0]} castShadow>
          <coneGeometry args={[0.7, 1.0, 8]} />
          <meshStandardMaterial
            color={leavesColor}
            metalness={0.0}
            roughness={0.8}
            emissive={leavesColor}
            emissiveIntensity={(customization.emissiveIntensity || 0) * 0.3}
          />
        </mesh>
      </group>
    </group>
  );
});
