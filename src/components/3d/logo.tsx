import { useRef, useEffect } from "react";
import { Center, Text3D } from "@react-three/drei";
import { Group } from "three";
import gsap from "gsap";
import { Canvas, useFrame } from "@react-three/fiber";
import { useState, useRef as useReactRef } from "react";

export function Logo() {
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(groupRef.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(groupRef.current.position, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <group ref={groupRef}>
      <Center>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={1.2}
          height={0.28}
          curveSegments={16}
          bevelEnabled
          bevelSize={0.04}
          bevelThickness={0.08}
        >
          ZAXIS
          <meshPhysicalMaterial
            color="#1741e0"
            metalness={0.85}
            roughness={0.08}
            clearcoat={0.5}
            clearcoatRoughness={0.1}
          />
        </Text3D>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={1.2}
          height={0.32}
          curveSegments={16}
          bevelEnabled
          bevelSize={0.04}
          bevelThickness={0.08}
          position={[0, 0, -0.04]}
        >
          ZAXIS
          <meshStandardMaterial color="#000" metalness={0.2} roughness={0.5} />
        </Text3D>
      </Center>
    </group>
  );
}

// Wrapper component for use outside of Three.js canvas
export function LogoWrapper() {
  return (
    <div className="w-[450px] h-[450px] relative">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Logo />
      </Canvas>
    </div>
  );
}

function InteractiveLogo({ pointer }: { pointer: { x: number; y: number } }) {
  const logoGroup = useReactRef<Group>(null);
  useFrame(() => {
    if (logoGroup.current) {
      logoGroup.current.rotation.y +=
        (pointer.x - logoGroup.current.rotation.y) * 0.08;
      logoGroup.current.rotation.x +=
        (pointer.y - logoGroup.current.rotation.x) * 0.08;
    }
  });
  return (
    <group ref={logoGroup} position={[0, 0, 0]}>
      <Logo />
    </group>
  );
}

export function Hero3DBackground() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  function handlePointerMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setPointer({ x: x * 0.5, y: y * 0.3 });
  }

  return (
    <div
      className="relative mx-auto my-0 flex items-center justify-center w-full"
      style={{ width: 450, height: 300, maxWidth: "100%" }}
      onPointerMove={handlePointerMove}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <InteractiveLogo pointer={pointer} />
      </Canvas>
    </div>
  );
}
