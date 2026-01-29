import { useRef, memo, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { use3DAnimation } from '@/hooks/use-3d-animation';

interface BarChartProps {
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

export const BarChart = memo(function BarChart({ customization }: BarChartProps) {
  const groupRef = useRef<THREE.Group>(null);
  const barsRef = useRef<THREE.Group>(null);

  use3DAnimation(groupRef, customization);

  // Generate bar data (heights)
  const barData = useMemo(() => {
    return [0.5, 1.2, 0.8, 1.5, 0.9, 1.3, 1.0];
  }, []);

  // Animate bars with wave effect
  useFrame((state) => {
    if (barsRef.current) {
      const time = state.clock.elapsedTime;
      const speed = customization.animationSpeed || 1.0;

      barsRef.current.children.forEach((bar, index) => {
        const offset = index * 0.3;
        const wave = Math.sin(time * speed + offset) * 0.05;
        bar.scale.y = 1 + wave;
      });
    }

    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003 * (customization.animationSpeed || 1.0);
    }
  });

  const barColors = [
    '#EF4444', // Red
    '#F59E0B', // Orange
    '#EAB308', // Yellow
    '#22C55E', // Green
    '#0EA5E9', // Blue
    '#8B5CF6', // Purple
    '#EC4899', // Pink
  ];

  return (
    <group ref={groupRef}>
      {/* Base Platform */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[3.5, 0.1, 2]} />
        <meshStandardMaterial
          color="#1F2937"
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>

      {/* Grid Lines */}
      {[0, 0.5, 1.0, 1.5].map((height, i) => (
        <mesh key={i} position={[0, height, -1]}>
          <boxGeometry args={[3.5, 0.01, 0.01]} />
          <meshStandardMaterial
            color="#6B7280"
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}

      {/* Bars */}
      <group ref={barsRef}>
        {barData.map((height, index) => {
          const xPos = -1.5 + index * 0.5;
          const color = customization.color === '#3B82F6'
            ? barColors[index]
            : customization.color;

          return (
            <group key={index} position={[xPos, 0, 0]}>
              {/* Bar */}
              <mesh
                position={[0, height / 2, 0]}
                castShadow
                receiveShadow
              >
                <boxGeometry args={[0.35, height, 0.35]} />
                <meshStandardMaterial
                  color={color}
                  metalness={customization.metalness}
                  roughness={customization.roughness}
                  emissive={color}
                  emissiveIntensity={customization.emissiveIntensity || 0.2}
                />
              </mesh>

              {/* Value Label */}
              <mesh position={[0, height + 0.15, 0]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={0.5}
                />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* X-Axis */}
      <mesh position={[0, 0, 1.05]}>
        <boxGeometry args={[3.5, 0.02, 0.02]} />
        <meshStandardMaterial color="#9CA3AF" />
      </mesh>

      {/* Y-Axis */}
      <mesh position={[-1.75, 0.75, 1.05]}>
        <boxGeometry args={[0.02, 1.5, 0.02]} />
        <meshStandardMaterial color="#9CA3AF" />
      </mesh>

      {/* Z-Axis */}
      <mesh position={[-1.75, 0, 0]}>
        <boxGeometry args={[0.02, 0.02, 2]} />
        <meshStandardMaterial color="#9CA3AF" />
      </mesh>
    </group>
  );
});
