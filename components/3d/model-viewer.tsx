'use client';

import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useGLTF } from '@react-three/drei';
import { useComponentStore } from '@/lib/store';
import * as THREE from 'three';
import gsap from 'gsap';

interface ModelProps {
  modelPath: string;
}

function Model({ modelPath }: ModelProps) {
  const { scene } = useGLTF(modelPath);
  const meshRef = useRef<THREE.Group>(null);
  const { customization } = useComponentStore();

  useEffect(() => {
    if (meshRef.current) {
      // Apply customizations with GSAP animations
      gsap.to(meshRef.current.scale, {
        x: customization.scale[0],
        y: customization.scale[1],
        z: customization.scale[2],
        duration: 0.5,
        ease: 'power2.out',
      });

      gsap.to(meshRef.current.rotation, {
        x: customization.rotation[0],
        y: customization.rotation[1],
        z: customization.rotation[2],
        duration: 0.5,
        ease: 'power2.out',
      });

      gsap.to(meshRef.current.position, {
        x: customization.position[0],
        y: customization.position[1],
        z: customization.position[2],
        duration: 0.5,
        ease: 'power2.out',
      });

      // Apply material properties
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.color.setHex(customization.color.replace('#', '0x'));
            child.material.metalness = customization.metalness;
            child.material.roughness = customization.roughness;
          }
        }
      });
    }
  }, [customization, scene]);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle idle animation
      meshRef.current.rotation.y += 0.005;
    }
  });

  return <primitive ref={meshRef} object={scene} />;
}

function Fallback() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#3B82F6" metalness={0.5} roughness={0.2} />
    </mesh>
  );
}

interface ModelViewerProps {
  modelPath?: string;
  className?: string;
  controls?: boolean;
}

export function ModelViewer({ 
  modelPath = '/models/default-cube.glb', 
  className = '',
  controls = true 
}: ModelViewerProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -5, -5]} intensity={0.5} />
        
        <Suspense fallback={<Fallback />}>
          {modelPath !== '/models/default-cube.glb' ? (
            <Model modelPath={modelPath} />
          ) : (
            <Fallback />
          )}
        </Suspense>
        
        <ContactShadows
          position={[0, -1.4, 0]}
          opacity={0.75}
          scale={10}
          blur={2.5}
          far={4}
        />
        
        <Environment preset="studio" />
        
        {controls && <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />}
      </Canvas>
    </div>
  );
}