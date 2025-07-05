"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  Sphere,
  MeshDistortMaterial,
  OrbitControls,
} from "@react-three/drei";
import { useHeroStore } from "@/lib/hero-store";
import * as THREE from "three";

function HeroObject() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { customization } = useHeroStore();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y += customization.rotationSpeed;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float
        speed={customization.floatSpeed}
        rotationIntensity={1}
        floatIntensity={2}
      >
        {/* Main central object */}
        <mesh
          ref={meshRef}
          castShadow
          position={[0, 0, 0]}
          scale={customization.mainObjectScale}
        >
          <icosahedronGeometry args={[1.2, 1]} />
          <MeshDistortMaterial
            color={customization.mainObjectColor}
            metalness={customization.mainObjectMetalness}
            roughness={customization.mainObjectRoughness}
            distort={customization.mainObjectDistort}
            speed={customization.mainObjectSpeed}
            emissive={customization.mainObjectEmissive}
            emissiveIntensity={customization.mainObjectEmissiveIntensity}
          />
        </mesh>

        {/* Orbiting spheres */}
        <Float speed={2} rotationIntensity={2} floatIntensity={1}>
          <Sphere
            args={[customization.sphere1Scale]}
            position={customization.sphere1Position}
            castShadow
          >
            <meshStandardMaterial
              color={customization.sphere1Color}
              metalness={0.8}
              roughness={0.2}
              emissive={customization.sphere1Color}
              emissiveIntensity={0.1}
            />
          </Sphere>
        </Float>

        <Float speed={1.8} rotationIntensity={1.5} floatIntensity={1.5}>
          <Sphere
            args={[customization.sphere2Scale]}
            position={customization.sphere2Position}
            castShadow
          >
            <meshStandardMaterial
              color={customization.sphere2Color}
              metalness={0.7}
              roughness={0.3}
              emissive={customization.sphere2Color}
              emissiveIntensity={0.1}
            />
          </Sphere>
        </Float>

        <Float speed={2.2} rotationIntensity={0.8} floatIntensity={2.5}>
          <Sphere
            args={[customization.sphere3Scale]}
            position={customization.sphere3Position}
            castShadow
          >
            <meshStandardMaterial
              color={customization.sphere3Color}
              metalness={0.6}
              roughness={0.4}
              emissive={customization.sphere3Color}
              emissiveIntensity={0.1}
            />
          </Sphere>
        </Float>

        {/* Wireframe rings */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <torusGeometry args={[2.8, 0.02, 16, 100]} />
          <meshBasicMaterial
            color={customization.ring1Color}
            transparent
            opacity={customization.ring1Opacity}
          />
        </mesh>

        <mesh rotation={[0, Math.PI / 4, Math.PI / 3]} position={[0, 0, 0]}>
          <torusGeometry args={[3.3, 0.01, 16, 100]} />
          <meshBasicMaterial
            color={customization.ring2Color}
            transparent
            opacity={customization.ring2Opacity}
          />
        </mesh>
      </Float>
    </group>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const { customization } = useHeroStore();

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  const positions = useMemo(() => {
    const pos = new Float32Array(customization.particleCount * 3);
    for (let i = 0; i < customization.particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [customization.particleCount]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={customization.particleColor}
        size={customization.particleSize}
        transparent
        opacity={customization.particleOpacity}
        sizeAttenuation
      />
    </points>
  );
}

export function HeroScene() {
  const { customization } = useHeroStore();

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={customization.ambientIntensity} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={customization.directionalIntensity}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight
          position={[-10, -5, -5]}
          intensity={customization.pointLight1Intensity}
          color={customization.pointLight1Color}
        />
        <pointLight
          position={[5, 5, 5]}
          intensity={customization.pointLight2Intensity}
          color={customization.pointLight2Color}
        />

        <Suspense fallback={null}>
          <HeroObject />
          <ParticleField />
        </Suspense>

        <Environment preset="studio" />

        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      </Canvas>
    </div>
  );
}
