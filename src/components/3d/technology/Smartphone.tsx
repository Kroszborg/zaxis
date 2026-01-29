import { useRef, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { use3DAnimation } from '@/hooks/use-3d-animation';
import { RoundedBox } from '@react-three/drei';

interface SmartphoneProps {
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

export const Smartphone = memo(function Smartphone({ customization }: SmartphoneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);

  use3DAnimation(groupRef, customization);

  // Gentle floating and rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      const speed = customization.animationSpeed || 1.0;

      groupRef.current.rotation.y += 0.005 * speed;
      groupRef.current.position.y += Math.sin(time * speed) * 0.002;
    }

    // Pulsing screen glow
    if (screenRef.current) {
      const time = state.clock.elapsedTime;
      const speed = customization.animationSpeed || 1.0;
      const material = screenRef.current.material as THREE.MeshStandardMaterial;

      material.emissiveIntensity =
        0.5 + Math.sin(time * speed * 2) * 0.1;
    }
  });

  const phoneColor = customization.color || '#1F2937';
  const screenColor = '#0EA5E9';

  return (
    <group ref={groupRef}>
      {/* Phone Body */}
      <RoundedBox
        args={[1, 2, 0.15]}
        radius={0.08}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={phoneColor}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </RoundedBox>

      {/* Screen */}
      <mesh
        ref={screenRef}
        position={[0, 0.1, 0.076]}
        castShadow
      >
        <boxGeometry args={[0.88, 1.7, 0.01]} />
        <meshStandardMaterial
          color={screenColor}
          metalness={0.1}
          roughness={0.1}
          emissive={screenColor}
          emissiveIntensity={customization.emissiveIntensity || 0.5}
        />
      </mesh>

      {/* Camera Notch */}
      <mesh position={[0, 0.88, 0.076]}>
        <boxGeometry args={[0.15, 0.05, 0.01]} />
        <meshStandardMaterial
          color="#000000"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Home Button / Gesture Bar */}
      <mesh position={[0, -0.85, 0.076]}>
        <boxGeometry args={[0.25, 0.03, 0.01]} />
        <meshStandardMaterial
          color="#FFFFFF"
          metalness={0.2}
          roughness={0.3}
          opacity={0.5}
          transparent
        />
      </mesh>

      {/* Side Buttons */}
      <mesh position={[0.51, 0.3, 0]}>
        <boxGeometry args={[0.02, 0.15, 0.08]} />
        <meshStandardMaterial
          color={phoneColor}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>

      {/* Volume Buttons */}
      <mesh position={[-0.51, 0.4, 0]}>
        <boxGeometry args={[0.02, 0.08, 0.06]} />
        <meshStandardMaterial
          color={phoneColor}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>

      <mesh position={[-0.51, 0.25, 0]}>
        <boxGeometry args={[0.02, 0.08, 0.06]} />
        <meshStandardMaterial
          color={phoneColor}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>
    </group>
  );
});
