"use client";

import React, { memo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";
import { ComponentCustomization } from "@/types/component";
import { use3DAnimation } from "@/hooks/use-3d-animation";

interface LaptopProps {
  customization: ComponentCustomization;
}

/**
 * Laptop Component
 *
 * Modern laptop with screen, keyboard base, and glowing display
 * Features gentle floating animation and screen glow effect
 */
export const Laptop = memo(function Laptop({ customization }: LaptopProps) {
  const groupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);

  // Use custom animation hook for scale, rotation, position
  use3DAnimation(groupRef, customization);

  const baseColor = customization.color || "#1F2937";
  const screenColor = "#0EA5E9";
  const keyboardColor = "#374151";
  const animationSpeed = customization.animationSpeed || 1.0;

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Gentle floating animation
    if (groupRef.current) {
      groupRef.current.position.y +=
        Math.sin(time * animationSpeed) * 0.001;
      groupRef.current.rotation.y += 0.003 * animationSpeed;
    }

    // Pulsing screen glow
    if (screenRef.current) {
      const material = screenRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity =
        (customization.emissiveIntensity || 0.5) +
        Math.sin(time * 2 * animationSpeed) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Keyboard Base */}
      <RoundedBox args={[2.2, 0.15, 1.5]} radius={0.05} position={[0, -0.5, 0.3]}>
        <meshStandardMaterial
          color={baseColor}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </RoundedBox>

      {/* Keyboard Keys (grid pattern) */}
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 12 }).map((_, col) => (
          <mesh
            key={`key-${row}-${col}`}
            position={[
              -1.0 + col * 0.18,
              -0.42,
              -0.2 + row * 0.18,
            ]}
          >
            <boxGeometry args={[0.14, 0.03, 0.14]} />
            <meshStandardMaterial
              color={keyboardColor}
              metalness={customization.metalness * 0.5}
              roughness={Math.max(customization.roughness, 0.6)}
            />
          </mesh>
        ))
      )}

      {/* Touchpad */}
      <mesh position={[0, -0.42, 0.5]}>
        <boxGeometry args={[0.8, 0.02, 0.6]} />
        <meshStandardMaterial
          color="#1F2937"
          metalness={customization.metalness * 0.3}
          roughness={0.1}
        />
      </mesh>

      {/* Screen Base (hinge area) */}
      <mesh position={[0, -0.5, -0.45]} rotation={[0, 0, 0]}>
        <boxGeometry args={[2.3, 0.1, 0.1]} />
        <meshStandardMaterial
          color={baseColor}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>

      {/* Screen Frame */}
      <RoundedBox
        args={[2.2, 1.4, 0.08]}
        radius={0.05}
        position={[0, 0.2, -0.5]}
        rotation={[-0.2, 0, 0]}
      >
        <meshStandardMaterial
          color={baseColor}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </RoundedBox>

      {/* Screen Display (glowing) */}
      <mesh
        ref={screenRef}
        position={[0, 0.2, -0.46]}
        rotation={[-0.2, 0, 0]}
      >
        <planeGeometry args={[2.0, 1.25]} />
        <meshStandardMaterial
          color={screenColor}
          emissive={screenColor}
          emissiveIntensity={customization.emissiveIntensity || 0.5}
          metalness={0.0}
          roughness={0.2}
        />
      </mesh>

      {/* Screen Content Simulation (Grid Lines) */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={`line-${i}`}
          position={[-0.8 + i * 0.25, 0.2, -0.45]}
          rotation={[-0.2, 0, 0]}
        >
          <boxGeometry args={[0.02, 1.0, 0.01]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FFFFFF"
            emissiveIntensity={0.2}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}

      {/* Camera Notch */}
      <mesh position={[0, 0.85, -0.46]} rotation={[-0.2, 0, 0]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial
          color="#1F2937"
          emissive="#4B5563"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Screen Glow Effect (subtle ambient light) */}
      <pointLight
        position={[0, 0.2, -0.3]}
        color={screenColor}
        intensity={0.3}
        distance={1.5}
      />
    </group>
  );
});
