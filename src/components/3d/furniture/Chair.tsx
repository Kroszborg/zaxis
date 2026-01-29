"use client";

import React, { memo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";
import { ComponentCustomization } from "@/types/component";
import { use3DAnimation } from "@/hooks/use-3d-animation";

interface ChairProps {
  customization: ComponentCustomization;
}

/**
 * Chair Component
 *
 * Modern minimalist chair with seat, backrest, and four legs
 * Features gentle rotation animation
 */
export const Chair = memo(function Chair({ customization }: ChairProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Use custom animation hook for scale, rotation, position
  use3DAnimation(groupRef, customization);

  const chairColor = customization.color || "#8B4513";
  const animationSpeed = customization.animationSpeed || 1.0;

  useFrame(() => {
    // Slow rotation to showcase the chair
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.004 * animationSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Seat */}
      <RoundedBox args={[0.8, 0.08, 0.8]} radius={0.03} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={chairColor}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </RoundedBox>

      {/* Seat Cushion Detail (slightly raised) */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.7, 0.03, 0.7]} />
        <meshStandardMaterial
          color={chairColor}
          metalness={customization.metalness * 0.5}
          roughness={Math.min(customization.roughness + 0.2, 1.0)}
        />
      </mesh>

      {/* Backrest */}
      <RoundedBox
        args={[0.8, 0.9, 0.08]}
        radius={0.03}
        position={[0, 0.5, -0.36]}
      >
        <meshStandardMaterial
          color={chairColor}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </RoundedBox>

      {/* Backrest Support Bars (vertical slats) */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh
          key={`slat-${i}`}
          position={[-0.3 + i * 0.15, 0.5, -0.36]}
        >
          <boxGeometry args={[0.05, 0.7, 0.04]} />
          <meshStandardMaterial
            color={chairColor}
            metalness={customization.metalness * 0.8}
            roughness={customization.roughness}
          />
        </mesh>
      ))}

      {/* Front Left Leg */}
      <mesh position={[-0.35, -0.35, 0.35]}>
        <cylinderGeometry args={[0.04, 0.04, 0.7, 12]} />
        <meshStandardMaterial
          color={chairColor}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>

      {/* Front Right Leg */}
      <mesh position={[0.35, -0.35, 0.35]}>
        <cylinderGeometry args={[0.04, 0.04, 0.7, 12]} />
        <meshStandardMaterial
          color={chairColor}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>

      {/* Back Left Leg */}
      <mesh position={[-0.35, -0.35, -0.35]}>
        <cylinderGeometry args={[0.04, 0.04, 0.7, 12]} />
        <meshStandardMaterial
          color={chairColor}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>

      {/* Back Right Leg */}
      <mesh position={[0.35, -0.35, -0.35]}>
        <cylinderGeometry args={[0.04, 0.04, 0.7, 12]} />
        <meshStandardMaterial
          color={chairColor}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>

      {/* Leg Support Bars (horizontal braces) */}

      {/* Front support */}
      <mesh position={[0, -0.6, 0.35]}>
        <cylinderGeometry args={[0.025, 0.025, 0.7, 8]} />
        <meshStandardMaterial
          color={chairColor}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>

      {/* Back support */}
      <mesh position={[0, -0.6, -0.35]}>
        <cylinderGeometry args={[0.025, 0.025, 0.7, 8]} />
        <meshStandardMaterial
          color={chairColor}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>

      {/* Left side support */}
      <mesh position={[-0.35, -0.6, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.025, 0.025, 0.7, 8]} />
        <meshStandardMaterial
          color={chairColor}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>

      {/* Right side support */}
      <mesh position={[0.35, -0.6, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.025, 0.025, 0.7, 8]} />
        <meshStandardMaterial
          color={chairColor}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>

      {/* Armrests (optional detail) */}
      <RoundedBox
        args={[0.08, 0.08, 0.5]}
        radius={0.02}
        position={[-0.44, 0.15, -0.05]}
      >
        <meshStandardMaterial
          color={chairColor}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </RoundedBox>

      <RoundedBox
        args={[0.08, 0.08, 0.5]}
        radius={0.02}
        position={[0.44, 0.15, -0.05]}
      >
        <meshStandardMaterial
          color={chairColor}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </RoundedBox>
    </group>
  );
});
