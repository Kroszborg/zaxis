"use client";

import React, { memo, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ComponentCustomization } from "@/types/component";
import { use3DAnimation } from "@/hooks/use-3d-animation";

interface PieChartProps {
  customization: ComponentCustomization;
}

/**
 * PieChart Component
 *
 * 3D pie chart with 5 colored segments
 * Features gentle rotation and hover-like separation animation
 */
export const PieChart = memo(function PieChart({
  customization,
}: PieChartProps) {
  const groupRef = useRef<THREE.Group>(null);
  const segmentsRef = useRef<THREE.Group>(null);

  // Use custom animation hook for scale, rotation, position
  use3DAnimation(groupRef, customization);

  const animationSpeed = customization.animationSpeed || 1.0;

  // Pie chart data: percentages and colors
  const segments = useMemo(
    () => [
      { percentage: 30, color: "#EF4444", label: "Red" }, // 30%
      { percentage: 25, color: "#3B82F6", label: "Blue" }, // 25%
      { percentage: 20, color: "#10B981", label: "Green" }, // 20%
      { percentage: 15, color: "#F59E0B", label: "Orange" }, // 15%
      { percentage: 10, color: "#8B5CF6", label: "Purple" }, // 10%
    ],
    []
  );

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Slow rotation of entire chart
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003 * animationSpeed;
    }

    // Gentle "breathing" animation on segments
    if (segmentsRef.current) {
      segmentsRef.current.children.forEach((segment, index) => {
        const offset = index * 0.5;
        const breathe = Math.sin(time * animationSpeed + offset) * 0.02;
        segment.scale.y = 1 + breathe;
      });
    }
  });

  // Generate pie slices
  const renderSlices = () => {
    const radius = 1.0;
    const thickness = 0.3;
    let currentAngle = 0;

    return segments.map((segment, index) => {
      const angle = (segment.percentage / 100) * Math.PI * 2;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      const midAngle = (startAngle + endAngle) / 2;

      // Calculate position offset for separation effect
      const separationDistance = 0.05;
      const xOffset = Math.cos(midAngle) * separationDistance;
      const zOffset = Math.sin(midAngle) * separationDistance;

      currentAngle = endAngle;

      // Create cylinder geometry for slice
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.absarc(0, 0, radius, startAngle, endAngle, false);
      shape.lineTo(0, 0);

      const extrudeSettings = {
        depth: thickness,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 3,
      };

      return (
        <mesh
          key={`segment-${index}`}
          position={[xOffset, 0, zOffset]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <extrudeGeometry args={[shape, extrudeSettings]} />
          <meshStandardMaterial
            color={segment.color}
            metalness={customization.metalness}
            roughness={customization.roughness}
            emissive={segment.color}
            emissiveIntensity={customization.emissiveIntensity || 0.1}
          />
        </mesh>
      );
    });
  };

  // Generate labels (small spheres above each segment)
  const renderLabels = () => {
    const radius = 1.2;
    let currentAngle = 0;

    return segments.map((segment, index) => {
      const angle = (segment.percentage / 100) * Math.PI * 2;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      const midAngle = (startAngle + endAngle) / 2;

      const x = Math.cos(midAngle) * radius;
      const z = Math.sin(midAngle) * radius;

      currentAngle = endAngle;

      return (
        <mesh key={`label-${index}`} position={[x, 0.5, z]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color={segment.color}
            emissive={segment.color}
            emissiveIntensity={0.5}
          />
        </mesh>
      );
    });
  };

  return (
    <group ref={groupRef}>
      {/* Base platform */}
      <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.5, 64]} />
        <meshStandardMaterial
          color="#1F2937"
          metalness={customization.metalness * 0.5}
          roughness={0.8}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Pie segments container */}
      <group ref={segmentsRef}>{renderSlices()}</group>

      {/* Labels */}
      {renderLabels()}

      {/* Center cylinder (chart axis) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.35, 16]} />
        <meshStandardMaterial
          color="#6B7280"
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>

      {/* Grid reference lines */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 1.5;
        const z = Math.sin(angle) * 1.5;

        return (
          <mesh
            key={`grid-${i}`}
            position={[x / 2, -0.19, z / 2]}
            rotation={[-Math.PI / 2, 0, angle]}
          >
            <planeGeometry args={[0.01, 1.5]} />
            <meshStandardMaterial
              color="#4B5563"
              transparent
              opacity={0.2}
            />
          </mesh>
        );
      })}

      {/* Percentage text indicators (using small boxes as placeholders) */}
      {segments.map((segment, index) => {
        const radius = 0.6;
        let currentAngle = 0;

        // Calculate cumulative angle for this segment
        for (let i = 0; i < index; i++) {
          currentAngle += (segments[i].percentage / 100) * Math.PI * 2;
        }

        const angle = (segment.percentage / 100) * Math.PI * 2;
        const midAngle = currentAngle + angle / 2;

        const x = Math.cos(midAngle) * radius;
        const z = Math.sin(midAngle) * radius;

        return (
          <mesh
            key={`text-${index}`}
            position={[x, 0.15, z]}
            rotation={[0, -midAngle, 0]}
          >
            <boxGeometry args={[0.15, 0.05, 0.02]} />
            <meshStandardMaterial
              color="#FFFFFF"
              emissive="#FFFFFF"
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
});
