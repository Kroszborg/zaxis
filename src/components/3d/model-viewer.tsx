"use client";

import { Suspense, useRef, useEffect, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Text3D,
  Center,
} from "@react-three/drei";
import { useComponentStore } from "@/lib/store";
import * as THREE from "three";
import gsap from "gsap";

interface Component3DProps {
  componentType: string;
  customization: any;
}

/**
 * HexBolt Component
 *
 * 3D model of a hexagonal bolt with threaded shaft.
 * Features smooth animations and material customization.
 */
const HexBolt = memo(({ customization }: { customization: any }) => {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: customization.scale[0],
        y: customization.scale[1],
        z: customization.scale[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: customization.rotation[0],
        y: customization.rotation[1],
        z: customization.rotation[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.position, {
        x: customization.position[0],
        y: customization.position[1],
        z: customization.position[2],
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [customization]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Hexagonal head */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 6]} />
        <meshStandardMaterial
          color={customization.color}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>
      {/* Threaded shaft */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 1, 8]} />
        <meshStandardMaterial
          color={customization.color}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>
    </group>
  );
});

HexBolt.displayName = "HexBolt";

/**
 * DoorHinge Component
 *
 * 3D model of a door hinge with two plates and center pin.
 * Supports full material customization.
 */
const DoorHinge = memo(({ customization }: { customization: any }) => {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: customization.scale[0],
        y: customization.scale[1],
        z: customization.scale[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: customization.rotation[0],
        y: customization.rotation[1],
        z: customization.rotation[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.position, {
        x: customization.position[0],
        y: customization.position[1],
        z: customization.position[2],
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [customization]);

  return (
    <group ref={groupRef}>
      {/* Left plate */}
      <mesh position={[-0.8, 0, 0]}>
        <boxGeometry args={[1.2, 0.1, 0.6]} />
        <meshStandardMaterial
          color={customization.color}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>
      {/* Right plate */}
      <mesh position={[0.8, 0, 0]}>
        <boxGeometry args={[1.2, 0.1, 0.6]} />
        <meshStandardMaterial
          color={customization.color}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>
      {/* Center pin */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 8]} />
        <meshStandardMaterial
          color={customization.color}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>
    </group>
  );
});

DoorHinge.displayName = "DoorHinge";

/**
 * MetalPanel Component
 *
 * 3D model of a metal panel with decorative rivets.
 * Features realistic metal materials and positioning.
 */
const MetalPanel = memo(({ customization }: { customization: any }) => {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: customization.scale[0],
        y: customization.scale[1],
        z: customization.scale[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: customization.rotation[0],
        y: customization.rotation[1],
        z: customization.rotation[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.position, {
        x: customization.position[0],
        y: customization.position[1],
        z: customization.position[2],
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [customization]);

  return (
    <group ref={groupRef}>
      {/* Main panel */}
      <mesh>
        <boxGeometry args={[2, 0.05, 1.5]} />
        <meshStandardMaterial
          color={customization.color}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>
      {/* Rivets */}
      {[-0.7, 0.7, -0.5, 0.5].map((x, i) =>
        [-0.6, 0.6].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[x, 0.025, z]}>
            <cylinderGeometry args={[0.05, 0.05, 0.1, 8]} />
            <meshStandardMaterial
              color={customization.color}
              metalness={customization.metalness}
              roughness={customization.roughness}
            />
          </mesh>
        ))
      )}
    </group>
  );
});

MetalPanel.displayName = "MetalPanel";

function GearAssembly({ customization }: { customization: any }) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: customization.scale[0],
        y: customization.scale[1],
        z: customization.scale[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: customization.rotation[0],
        y: customization.rotation[1],
        z: customization.rotation[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.position, {
        x: customization.position[0],
        y: customization.position[1],
        z: customization.position[2],
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [customization]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Large center gear */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.2, 16]} />
        <meshStandardMaterial
          color={customization.color}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>
      {/* Small gears around */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI) / 2) * 1.5,
            0,
            Math.sin((i * Math.PI) / 2) * 1.5,
          ]}
        >
          <cylinderGeometry args={[0.4, 0.4, 0.2, 12]} />
          <meshStandardMaterial
            color={customization.color}
            metalness={customization.metalness}
            roughness={customization.roughness}
          />
        </mesh>
      ))}
    </group>
  );
}

function CircuitBoard({ customization }: { customization: any }) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: customization.scale[0],
        y: customization.scale[1],
        z: customization.scale[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: customization.rotation[0],
        y: customization.rotation[1],
        z: customization.rotation[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.position, {
        x: customization.position[0],
        y: customization.position[1],
        z: customization.position[2],
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [customization]);

  return (
    <group ref={groupRef}>
      {/* PCB base */}
      <mesh>
        <boxGeometry args={[2, 0.05, 1.5]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.1} roughness={0.8} />
      </mesh>
      {/* Circuit traces */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={i} position={[0, 0.025, (i - 3.5) * 0.2]}>
          <boxGeometry args={[1.8, 0.01, 0.05]} />
          <meshStandardMaterial
            color="#00ff00"
            emissive="#00ff00"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
      {/* Components */}
      {[-0.8, 0.8].map((x, i) =>
        [-0.6, 0.6].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[x, 0.1, z]}>
            <boxGeometry args={[0.3, 0.1, 0.3]} />
            <meshStandardMaterial
              color="#ff0000"
              emissive="#ff0000"
              emissiveIntensity={0.3}
            />
          </mesh>
        ))
      )}
    </group>
  );
}

function OrnateBracket({ customization }: { customization: any }) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: customization.scale[0],
        y: customization.scale[1],
        z: customization.scale[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: customization.rotation[0],
        y: customization.rotation[1],
        z: customization.rotation[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.position, {
        x: customization.position[0],
        y: customization.position[1],
        z: customization.position[2],
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [customization]);

  return (
    <group ref={groupRef}>
      {/* Main bracket */}
      <mesh>
        <boxGeometry args={[1.5, 0.1, 1]} />
        <meshStandardMaterial
          color={customization.color}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>
      {/* Ornate details */}
      {[-0.6, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0.05, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.2, 8]} />
          <meshStandardMaterial
            color={customization.color}
            metalness={customization.metalness}
            roughness={customization.roughness}
          />
        </mesh>
      ))}
    </group>
  );
}

function FloatingSphere({ customization }: { customization: any }) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: customization.scale[0],
        y: customization.scale[1],
        z: customization.scale[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: customization.rotation[0],
        y: customization.rotation[1],
        z: customization.rotation[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.position, {
        x: customization.position[0],
        y: customization.position[1],
        z: customization.position[2],
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [customization]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
      groupRef.current.rotation.y += 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={customization.color}
          metalness={customization.metalness}
          roughness={customization.roughness}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Particle effects */}
      {Array.from({ length: 20 }, (_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial
            color={customization.color}
            emissive={customization.color}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

function GeometricCube({ customization }: { customization: any }) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: customization.scale[0],
        y: customization.scale[1],
        z: customization.scale[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: customization.rotation[0],
        y: customization.rotation[1],
        z: customization.rotation[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.position, {
        x: customization.position[0],
        y: customization.position[1],
        z: customization.position[2],
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [customization]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      groupRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={customization.color}
          metalness={customization.metalness}
          roughness={customization.roughness}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

function WireframeSphere({ customization }: { customization: any }) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: customization.scale[0],
        y: customization.scale[1],
        z: customization.scale[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: customization.rotation[0],
        y: customization.rotation[1],
        z: customization.rotation[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.position, {
        x: customization.position[0],
        y: customization.position[1],
        z: customization.position[2],
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [customization]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial
          color={customization.color}
          emissive={customization.color}
          emissiveIntensity={0.3}
          wireframe
        />
      </mesh>
    </group>
  );
}

// Basic primitive components
function Cube({ customization }: { customization: any }) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: customization.scale[0],
        y: customization.scale[1],
        z: customization.scale[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: customization.rotation[0],
        y: customization.rotation[1],
        z: customization.rotation[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.position, {
        x: customization.position[0],
        y: customization.position[1],
        z: customization.position[2],
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [customization]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={customization.color}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>
    </group>
  );
}

function Sphere({ customization }: { customization: any }) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: customization.scale[0],
        y: customization.scale[1],
        z: customization.scale[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: customization.rotation[0],
        y: customization.rotation[1],
        z: customization.rotation[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.position, {
        x: customization.position[0],
        y: customization.position[1],
        z: customization.position[2],
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [customization]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={customization.color}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>
    </group>
  );
}

function Torus({ customization }: { customization: any }) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: customization.scale[0],
        y: customization.scale[1],
        z: customization.scale[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: customization.rotation[0],
        y: customization.rotation[1],
        z: customization.rotation[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.position, {
        x: customization.position[0],
        y: customization.position[1],
        z: customization.position[2],
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [customization]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[0.5, 0.2, 16, 32]} />
        <meshStandardMaterial
          color={customization.color}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>
    </group>
  );
}

function Cone({ customization }: { customization: any }) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: customization.scale[0],
        y: customization.scale[1],
        z: customization.scale[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: customization.rotation[0],
        y: customization.rotation[1],
        z: customization.rotation[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.position, {
        x: customization.position[0],
        y: customization.position[1],
        z: customization.position[2],
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [customization]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <coneGeometry args={[0.5, 1, 32]} />
        <meshStandardMaterial
          color={customization.color}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>
    </group>
  );
}

function Plane({ customization }: { customization: any }) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: customization.scale[0],
        y: customization.scale[1],
        z: customization.scale[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: customization.rotation[0],
        y: customization.rotation[1],
        z: customization.rotation[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.position, {
        x: customization.position[0],
        y: customization.position[1],
        z: customization.position[2],
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [customization]);

  return (
    <group ref={groupRef}>
      <mesh>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial
          color={customization.color}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>
    </group>
  );
}

function Text3DComponent({ customization }: { customization: any }) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: customization.scale[0],
        y: customization.scale[1],
        z: customization.scale[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: customization.rotation[0],
        y: customization.rotation[1],
        z: customization.rotation[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.position, {
        x: customization.position[0],
        y: customization.position[1],
        z: customization.position[2],
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [customization]);

  return (
    <group ref={groupRef}>
      <Center>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.3}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          ZAXIS
          <meshStandardMaterial
            color={customization.color}
            metalness={customization.metalness}
            roughness={customization.roughness}
          />
        </Text3D>
      </Center>
    </group>
  );
}

function DirectionalLight({ customization }: { customization: any }) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: customization.scale[0],
        y: customization.scale[1],
        z: customization.scale[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: customization.rotation[0],
        y: customization.rotation[1],
        z: customization.rotation[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.position, {
        x: customization.position[0],
        y: customization.position[1],
        z: customization.position[2],
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [customization]);

  return (
    <group ref={groupRef}>
      {/* Light representation */}
      <mesh>
        <cylinderGeometry args={[0.1, 0.1, 0.5, 8]} />
        <meshStandardMaterial
          color="#ffff00"
          emissive="#ffff00"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Light rays */}
      {Array.from({ length: 5 }, (_, i) => (
        <mesh
          key={i}
          position={[0, -0.3 - i * 0.1, 0]}
          rotation={[0, 0, (i * Math.PI) / 10]}
        >
          <boxGeometry args={[0.02, 0.1, 0.02]} />
          <meshStandardMaterial
            color="#ffff00"
            emissive="#ffff00"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function PerspectiveCamera({ customization }: { customization: any }) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: customization.scale[0],
        y: customization.scale[1],
        z: customization.scale[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: customization.rotation[0],
        y: customization.rotation[1],
        z: customization.rotation[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.position, {
        x: customization.position[0],
        y: customization.position[1],
        z: customization.position[2],
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [customization]);

  return (
    <group ref={groupRef}>
      {/* Camera body */}
      <mesh>
        <boxGeometry args={[0.3, 0.2, 0.4]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Lens */}
      <mesh position={[0, 0, 0.25]}>
        <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
        <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function GridHelper({ customization }: { customization: any }) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: customization.scale[0],
        y: customization.scale[1],
        z: customization.scale[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: customization.rotation[0],
        y: customization.rotation[1],
        z: customization.rotation[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.position, {
        x: customization.position[0],
        y: customization.position[1],
        z: customization.position[2],
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [customization]);

  return (
    <group ref={groupRef}>
      <gridHelper args={[5, 10, customization.color || "#888888"]} />
    </group>
  );
}

function AxesHelper({ customization }: { customization: any }) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: customization.scale[0],
        y: customization.scale[1],
        z: customization.scale[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: customization.rotation[0],
        y: customization.rotation[1],
        z: customization.rotation[2],
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.position, {
        x: customization.position[0],
        y: customization.position[1],
        z: customization.position[2],
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [customization]);

  return (
    <group ref={groupRef}>
      <axesHelper args={[2]} />
    </group>
  );
}

function Cylinder({ customization }: { customization: any }) {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: customization.scale[0],
        y: customization.scale[1],
        z: customization.scale[2],
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(groupRef.current.rotation, {
        x: customization.rotation[0],
        y: customization.rotation[1],
        z: customization.rotation[2],
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(groupRef.current.position, {
        x: customization.position[0],
        y: customization.position[1],
        z: customization.position[2],
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [customization]);
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });
  return (
    <group ref={groupRef}>
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
        <meshStandardMaterial
          color={customization.color}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>
    </group>
  );
}

function Pyramid({ customization }: { customization: any }) {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: customization.scale[0],
        y: customization.scale[1],
        z: customization.scale[2],
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(groupRef.current.rotation, {
        x: customization.rotation[0],
        y: customization.rotation[1],
        z: customization.rotation[2],
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(groupRef.current.position, {
        x: customization.position[0],
        y: customization.position[1],
        z: customization.position[2],
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [customization]);
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });
  return (
    <group ref={groupRef}>
      <mesh>
        <coneGeometry args={[0.7, 1, 4]} />
        <meshStandardMaterial
          color={customization.color}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>
    </group>
  );
}

function Capsule({ customization }: { customization: any }) {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: customization.scale[0],
        y: customization.scale[1],
        z: customization.scale[2],
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(groupRef.current.rotation, {
        x: customization.rotation[0],
        y: customization.rotation[1],
        z: customization.rotation[2],
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(groupRef.current.position, {
        x: customization.position[0],
        y: customization.position[1],
        z: customization.position[2],
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [customization]);
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });
  return (
    <group ref={groupRef}>
      {/* Capsule body */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.4, 0.6, 16, 32]} />
        <meshStandardMaterial
          color={customization.color}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>
    </group>
  );
}

function HeroBlock({ customization }: { customization: any }) {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: customization.scale[0],
        y: customization.scale[1],
        z: customization.scale[2],
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(groupRef.current.rotation, {
        x: customization.rotation[0],
        y: customization.rotation[1],
        z: customization.rotation[2],
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(groupRef.current.position, {
        x: customization.position[0],
        y: customization.position[1],
        z: customization.position[2],
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [customization]);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      groupRef.current.rotation.y += 0.01;
    }
  });
  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[1.5, 0.5, 1]} />
        <meshStandardMaterial
          color={customization.color}
          metalness={customization.metalness}
          roughness={customization.roughness}
          emissive={customization.color}
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Glow effect */}
      <mesh scale={[1.2, 0.1, 1.2]} position={[0, -0.3, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={customization.color}
          emissive={customization.color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}

function ShowcaseCard({ customization }: { customization: any }) {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: customization.scale[0],
        y: customization.scale[1],
        z: customization.scale[2],
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(groupRef.current.rotation, {
        x: customization.rotation[0],
        y: customization.rotation[1],
        z: customization.rotation[2],
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(groupRef.current.position, {
        x: customization.position[0],
        y: customization.position[1],
        z: customization.position[2],
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [customization]);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
      groupRef.current.rotation.y += 0.01;
    }
  });
  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[1.2, 0.2, 0.8]} />
        <meshStandardMaterial
          color={customization.color}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>
      {/* Shadow effect */}
      <mesh scale={[1.3, 0.01, 1]} position={[0, -0.12, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={customization.color}
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
}

/**
 * Component3D Component
 *
 * Factory component that renders the appropriate 3D model based on component type.
 * Uses memoization to prevent unnecessary rerenders when props haven't changed.
 *
 * @param componentType - Type of 3D component to render
 * @param customization - Customization parameters for the component
 */
const Component3D = memo(
  ({ componentType, customization }: Component3DProps) => {
    switch (componentType) {
      case "hex-bolt":
        return <HexBolt customization={customization} />;
      case "door-hinge":
        return <DoorHinge customization={customization} />;
      case "metal-panel":
        return <MetalPanel customization={customization} />;
      case "gear-assembly":
        return <GearAssembly customization={customization} />;
      case "circuit-board":
        return <CircuitBoard customization={customization} />;
      case "ornate-bracket":
        return <OrnateBracket customization={customization} />;
      case "floating-sphere":
        return <FloatingSphere customization={customization} />;
      case "geometric-cube":
        return <GeometricCube customization={customization} />;
      case "wireframe-sphere":
        return <WireframeSphere customization={customization} />;
      case "cube":
        return <Cube customization={customization} />;
      case "sphere":
        return <Sphere customization={customization} />;
      case "torus":
        return <Torus customization={customization} />;
      case "cone":
        return <Cone customization={customization} />;
      case "plane":
        return <Plane customization={customization} />;
      case "text-3d":
        return <Text3DComponent customization={customization} />;
      case "directional-light":
        return <DirectionalLight customization={customization} />;
      case "perspective-camera":
        return <PerspectiveCamera customization={customization} />;
      case "grid-helper":
        return <GridHelper customization={customization} />;
      case "axes-helper":
        return <AxesHelper customization={customization} />;
      case "cylinder":
        return <Cylinder customization={customization} />;
      case "pyramid":
        return <Pyramid customization={customization} />;
      case "capsule":
        return <Capsule customization={customization} />;
      case "hero-block":
        return <HeroBlock customization={customization} />;
      case "showcase-card":
        return <ShowcaseCard customization={customization} />;
      default:
        return <Cube customization={customization} />;
    }
  }
);

Component3D.displayName = "Component3D";

interface ModelViewerProps {
  componentType?: string;
  className?: string;
  controls?: boolean;
}

/**
 * ModelViewer Component
 *
 * Main 3D viewer component that renders 3D models using React Three Fiber.
 * Provides a complete 3D environment with lighting, shadows, and controls.
 *
 * Features:
 * - Real-time 3D rendering with WebGL
 * - Interactive orbit controls
 * - Dynamic lighting and shadows
 * - Environment mapping
 * - Performance optimized with memoization
 *
 * @param componentType - Type of 3D component to render
 * @param className - Additional CSS classes
 * @param controls - Whether to show orbit controls
 */
export const ModelViewer = memo(
  ({
    componentType = "cube",
    className = "",
    controls = true,
  }: ModelViewerProps) => {
    const { customization } = useComponentStore();

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

          <Suspense fallback={<Cube customization={customization} />}>
            <Component3D
              componentType={componentType}
              customization={customization}
            />
          </Suspense>

          <ContactShadows
            position={[0, -1.4, 0]}
            opacity={0.75}
            scale={10}
            blur={2.5}
            far={4}
          />

          <Environment preset="studio" />

          {controls && (
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
            />
          )}
        </Canvas>
      </div>
    );
  }
);

ModelViewer.displayName = "ModelViewer";
