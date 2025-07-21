"use client";

import React, { Suspense, useRef, useEffect, memo } from "react";
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

function ParticleSystem({ customization }: { customization: any }) {
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
      {/* Particle field */}
      {Array.from({ length: 50 }, (_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 3,
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial
            color={customization.color}
            emissive={customization.color}
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}
      {/* Central energy source */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color="#ffff00"
          emissive="#ffff00"
          emissiveIntensity={0.8}
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

function QuantumCube({ customization }: { customization: any }) {
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
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });
  return (
    <group ref={groupRef}>
      {/* Energy field background */}
      <mesh>
        <sphereGeometry args={[1.8, 16, 16]} />
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={0.1}
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Main quantum cube */}
      <mesh>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={0.6}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Inner quantum core */}
      <mesh>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Probability wave rings - better positioned */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 1.0 + (i % 2) * 0.2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}
            rotation={[0, 0, angle]}
          >
            <torusGeometry args={[0.2, 0.02, 8, 16]} />
            <meshStandardMaterial
              color={["#00ffff", "#ff00ff", "#ffff00"][i % 3]}
              emissive={["#00ffff", "#ff00ff", "#ffff00"][i % 3]}
              emissiveIntensity={0.4}
              transparent
              opacity={0.6}
            />
          </mesh>
        );
      })}

      {/* Quantum superposition particles - better positioned */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 1.2 + Math.random() * 0.3;
        return (
          <mesh
            key={`particle-${i}`}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              (Math.random() - 0.5) * 0.8,
            ]}
          >
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial
              color={["#ff00ff", "#00ffff", "#ffff00", "#ff6600"][i % 4]}
              emissive={["#ff00ff", "#00ffff", "#ffff00", "#ff6600"][i % 4]}
              emissiveIntensity={0.7}
              transparent
              opacity={0.8}
            />
          </mesh>
        );
      })}

      {/* Quantum entanglement lines - better positioned */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 1.5;
        return (
          <mesh
            key={`entanglement-${i}`}
            position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}
            rotation={[0, 0, angle]}
          >
            <cylinderGeometry args={[0.008, 0.008, 0.6, 6]} />
            <meshStandardMaterial
              color="#00ffff"
              emissive="#00ffff"
              emissiveIntensity={0.5}
              transparent
              opacity={0.7}
            />
          </mesh>
        );
      })}

      {/* Additional quantum effects */}
      {Array.from({ length: 4 }, (_, i) => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <mesh
            key={`effect-${i}`}
            position={[Math.cos(angle) * 1.3, Math.sin(angle) * 1.3, 0]}
          >
            <torusGeometry args={[0.15, 0.01, 6, 12]} />
            <meshStandardMaterial
              color="#ffff00"
              emissive="#ffff00"
              emissiveIntensity={0.3}
              transparent
              opacity={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function TimeMachine({ customization }: { customization: any }) {
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
      groupRef.current.rotation.y += 0.03;
    }
  });
  return (
    <group ref={groupRef}>
      {/* Main body */}
      <mesh>
        <cylinderGeometry args={[0.4, 0.4, 0.8, 16]} />
        <meshStandardMaterial color="#D97706" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Spinning rings */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[(i * Math.PI) / 3, 0, 0]}>
          <torusGeometry args={[0.6 + i * 0.2, 0.1, 16, 32]} />
          <meshStandardMaterial
            color="#DC2626"
            emissive="#DC2626"
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
      {/* Time portal effect */}
      <mesh>
        <torusGeometry args={[0.5, 0.05, 16, 32]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.6}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}

function NeuralNetwork({ customization }: { customization: any }) {
  const groupRef = useRef<THREE.Group>(null);

  // Create structured neural network layers with better positioning
  const layers = [
    { nodes: 5, y: -0.6, spacing: 0.3 }, // Input layer
    { nodes: 7, y: -0.2, spacing: 0.25 }, // Hidden layer 1
    { nodes: 5, y: 0.2, spacing: 0.3 }, // Hidden layer 2
    { nodes: 3, y: 0.6, spacing: 0.4 }, // Output layer
  ];

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
      {/* Create neural network layers */}
      {layers.map((layer, layerIndex) => (
        <group key={`layer-${layerIndex}`}>
          {/* Nodes in this layer */}
          {Array.from({ length: layer.nodes }, (_, nodeIndex) => {
            const x = (nodeIndex - (layer.nodes - 1) / 2) * layer.spacing;
            const position: [number, number, number] = [x, layer.y, 0];

            return (
              <mesh key={`node-${layerIndex}-${nodeIndex}`} position={position}>
                <sphereGeometry args={[0.05, 12, 12]} />
                <meshStandardMaterial
                  color={
                    layerIndex === 0
                      ? "#00ff00"
                      : layerIndex === layers.length - 1
                      ? "#ff6b6b"
                      : "#4169E1"
                  }
                  emissive={
                    layerIndex === 0
                      ? "#00ff00"
                      : layerIndex === layers.length - 1
                      ? "#ff6b6b"
                      : "#4169E1"
                  }
                  emissiveIntensity={0.6}
                />
                {/* Node glow */}
                <mesh position={[0, 0, 0]}>
                  <sphereGeometry args={[0.07, 8, 8]} />
                  <meshStandardMaterial
                    color={
                      layerIndex === 0
                        ? "#00ff00"
                        : layerIndex === layers.length - 1
                        ? "#ff6b6b"
                        : "#4169E1"
                    }
                    emissive={
                      layerIndex === 0
                        ? "#00ff00"
                        : layerIndex === layers.length - 1
                        ? "#ff6b6b"
                        : "#4169E1"
                    }
                    emissiveIntensity={0.2}
                    transparent
                    opacity={0.3}
                  />
                </mesh>
              </mesh>
            );
          })}
        </group>
      ))}

      {/* Connections between layers */}
      {layers.slice(0, -1).map((layer, layerIndex) => {
        const nextLayer = layers[layerIndex + 1];

        return Array.from(
          { length: layer.nodes * nextLayer.nodes },
          (_, index) => {
            const i = Math.floor(index / nextLayer.nodes);
            const j = index % nextLayer.nodes;

            const x1 = (i - (layer.nodes - 1) / 2) * layer.spacing;
            const x2 = (j - (nextLayer.nodes - 1) / 2) * nextLayer.spacing;

            const start: [number, number, number] = [x1, layer.y, 0];
            const end: [number, number, number] = [x2, nextLayer.y, 0];

            // Calculate connection direction and length
            const direction = [
              end[0] - start[0],
              end[1] - start[1],
              end[2] - start[2],
            ];
            const length = Math.sqrt(
              direction[0] ** 2 + direction[1] ** 2 + direction[2] ** 2
            );
            const center: [number, number, number] = [
              (start[0] + end[0]) / 2,
              (start[1] + end[1]) / 2,
              (start[2] + end[2]) / 2,
            ];

            return (
              <mesh
                key={`connection-${layerIndex}-${i}-${j}`}
                position={center}
                rotation={[
                  Math.atan2(
                    Math.sqrt(direction[0] ** 2 + direction[2] ** 2),
                    direction[1]
                  ),
                  0,
                  Math.atan2(direction[2], direction[0]),
                ]}
              >
                <cylinderGeometry args={[0.006, 0.006, length, 6]} />
                <meshStandardMaterial
                  color="#4169E1"
                  emissive="#4169E1"
                  emissiveIntensity={0.3}
                  transparent
                  opacity={0.7}
                />
              </mesh>
            );
          }
        );
      })}

      {/* Data flow particles */}
      {Array.from({ length: 12 }, (_, i) => (
        <mesh
          key={`particle-${i}`}
          position={[
            (Math.random() - 0.5) * 1.2,
            (Math.random() - 0.5) * 1.2,
            (Math.random() - 0.5) * 0.5,
          ]}
        >
          <sphereGeometry args={[0.015, 6, 6]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.8}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

function CrystalPrism({ customization }: { customization: any }) {
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
      {/* Main prism */}
      <mesh>
        <coneGeometry args={[0.4, 0.8, 6]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Rainbow effect */}
      {Array.from({ length: 7 }, (_, i) => (
        <mesh
          key={i}
          position={[0, 0, 0.1 + i * 0.05]}
          rotation={[0, 0, (i * Math.PI) / 7]}
        >
          <planeGeometry args={[0.6, 0.6]} />
          <meshStandardMaterial
            color={
              [
                "#ff0000",
                "#ff7f00",
                "#ffff00",
                "#00ff00",
                "#0000ff",
                "#4b0082",
                "#9400d3",
              ][i]
            }
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function PlasmaBall({ customization }: { customization: any }) {
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
      {/* Glass sphere container */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.1}
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Central electrode */}
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#ffff00"
          emissive="#ffff00"
          emissiveIntensity={1.0}
        />
      </mesh>

      {/* Plasma arcs - more realistic electric arcs */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 0.4;
        const height = 0.3 + Math.random() * 0.2;

        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius * 0.5,
              Math.sin(angle) * radius * 0.3,
              Math.sin(angle) * radius * 0.5,
            ]}
            rotation={[
              Math.random() * Math.PI,
              Math.random() * Math.PI,
              Math.random() * Math.PI,
            ]}
          >
            <cylinderGeometry args={[0.008, 0.003, height, 6]} />
            <meshStandardMaterial
              color={["#ffff00", "#ff6600", "#ff0066"][i % 3]}
              emissive={["#ffff00", "#ff6600", "#ff0066"][i % 3]}
              emissiveIntensity={0.9}
            />
          </mesh>
        );
      })}

      {/* Energy tendrils */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 0.3;

        return (
          <mesh
            key={`tendril-${i}`}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius * 0.5,
              Math.sin(angle) * radius,
            ]}
          >
            <torusGeometry args={[0.15, 0.005, 8, 16]} />
            <meshStandardMaterial
              color="#00ffff"
              emissive="#00ffff"
              emissiveIntensity={0.7}
              transparent
              opacity={0.8}
            />
          </mesh>
        );
      })}

      {/* Floating energy particles */}
      {Array.from({ length: 20 }, (_, i) => (
        <mesh
          key={`particle-${i}`}
          position={[
            (Math.random() - 0.5) * 1.0,
            (Math.random() - 0.5) * 1.0,
            (Math.random() - 0.5) * 1.0,
          ]}
        >
          <sphereGeometry args={[0.015, 6, 6]} />
          <meshStandardMaterial
            color={["#ffff00", "#ff6600", "#00ffff"][i % 3]}
            emissive={["#ffff00", "#ff6600", "#00ffff"][i % 3]}
            emissiveIntensity={0.6}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      {/* Base stand */}
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 0.1, 8]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function FractalTree({ customization }: { customization: any }) {
  const groupRef = useRef<THREE.Group>(null);

  // Create fractal tree branches with proper positioning
  const createBranches = () => {
    const branches: React.ReactElement[] = [];

    // Main trunk
    branches.push(
      <mesh key="trunk" position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.08, 0.06, 1, 8]} />
        <meshStandardMaterial color="#8B4513" metalness={0.1} roughness={0.8} />
      </mesh>
    );

    // Level 1 branches (3 branches)
    const level1Positions = [
      { x: -0.2, y: 0.8, z: 0, rotY: -Math.PI / 4 },
      { x: 0.2, y: 0.8, z: 0, rotY: Math.PI / 4 },
      { x: 0, y: 0.9, z: 0.2, rotY: 0 },
    ];

    level1Positions.forEach((pos, i) => {
      branches.push(
        <mesh
          key={`branch1-${i}`}
          position={[pos.x, pos.y, pos.z]}
          rotation={[0, pos.rotY, 0]}
        >
          <cylinderGeometry args={[0.06, 0.04, 0.6, 6]} />
          <meshStandardMaterial
            color="#228B22"
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>
      );
    });

    // Level 2 branches (6 branches)
    const level2Positions = [
      { x: -0.3, y: 1.0, z: -0.1, rotY: -Math.PI / 3 },
      { x: -0.1, y: 1.1, z: -0.2, rotY: -Math.PI / 6 },
      { x: 0.3, y: 1.0, z: -0.1, rotY: Math.PI / 3 },
      { x: 0.1, y: 1.1, z: -0.2, rotY: Math.PI / 6 },
      { x: -0.1, y: 1.2, z: 0.3, rotY: -Math.PI / 6 },
      { x: 0.1, y: 1.2, z: 0.3, rotY: Math.PI / 6 },
    ];

    level2Positions.forEach((pos, i) => {
      branches.push(
        <mesh
          key={`branch2-${i}`}
          position={[pos.x, pos.y, pos.z]}
          rotation={[0, pos.rotY, 0]}
        >
          <cylinderGeometry args={[0.04, 0.02, 0.4, 6]} />
          <meshStandardMaterial
            color="#228B22"
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>
      );
    });

    // Level 3 branches (12 branches)
    const level3Positions = [
      { x: -0.4, y: 1.2, z: -0.2, rotY: -Math.PI / 2 },
      { x: -0.2, y: 1.3, z: -0.3, rotY: -Math.PI / 3 },
      { x: 0.4, y: 1.2, z: -0.2, rotY: Math.PI / 2 },
      { x: 0.2, y: 1.3, z: -0.3, rotY: Math.PI / 3 },
      { x: -0.2, y: 1.4, z: 0.4, rotY: -Math.PI / 3 },
      { x: 0.2, y: 1.4, z: 0.4, rotY: Math.PI / 3 },
      { x: -0.3, y: 1.1, z: 0.1, rotY: -Math.PI / 4 },
      { x: 0.3, y: 1.1, z: 0.1, rotY: Math.PI / 4 },
      { x: -0.1, y: 1.3, z: -0.1, rotY: -Math.PI / 6 },
      { x: 0.1, y: 1.3, z: -0.1, rotY: Math.PI / 6 },
      { x: -0.1, y: 1.4, z: 0.2, rotY: -Math.PI / 6 },
      { x: 0.1, y: 1.4, z: 0.2, rotY: Math.PI / 6 },
    ];

    level3Positions.forEach((pos, i) => {
      branches.push(
        <mesh
          key={`branch3-${i}`}
          position={[pos.x, pos.y, pos.z]}
          rotation={[0, pos.rotY, 0]}
        >
          <cylinderGeometry args={[0.02, 0.01, 0.3, 6]} />
          <meshStandardMaterial
            color="#228B22"
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>
      );
    });

    // Add leaves at the end of branches
    const leafPositions = [
      { x: -0.4, y: 1.4, z: -0.2 },
      { x: -0.2, y: 1.5, z: -0.3 },
      { x: 0.4, y: 1.4, z: -0.2 },
      { x: 0.2, y: 1.5, z: -0.3 },
      { x: -0.2, y: 1.6, z: 0.4 },
      { x: 0.2, y: 1.6, z: 0.4 },
      { x: -0.3, y: 1.3, z: 0.1 },
      { x: 0.3, y: 1.3, z: 0.1 },
      { x: -0.1, y: 1.5, z: -0.1 },
      { x: 0.1, y: 1.5, z: -0.1 },
      { x: -0.1, y: 1.6, z: 0.2 },
      { x: 0.1, y: 1.6, z: 0.2 },
    ];

    leafPositions.forEach((pos, i) => {
      branches.push(
        <mesh key={`leaf-${i}`} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial
            color="#32CD32"
            metalness={0.1}
            roughness={0.9}
          />
        </mesh>
      );
    });

    return branches;
  };

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
      {/* Ground/base */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 8]} />
        <meshStandardMaterial color="#654321" metalness={0.1} roughness={0.9} />
      </mesh>

      {/* Create fractal tree structure */}
      {createBranches()}

      {/* Floating particles around the tree */}
      {Array.from({ length: 15 }, (_, i) => (
        <mesh
          key={`particle-${i}`}
          position={[
            (Math.random() - 0.5) * 2,
            Math.random() * 2,
            (Math.random() - 0.5) * 2,
          ]}
        >
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshStandardMaterial
            color={["#98FB98", "#90EE90", "#32CD32"][i % 3]}
            emissive={["#98FB98", "#90EE90", "#32CD32"][i % 3]}
            emissiveIntensity={0.3}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

function HolographicUI({ customization }: { customization: any }) {
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
      {/* Main panel */}
      <mesh>
        <boxGeometry args={[2, 1.5, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Holographic displays */}
      {Array.from({ length: 6 }, (_, i) => (
        <mesh
          key={i}
          position={[((i % 3) - 1) * 0.6, Math.floor(i / 3) * 0.4 - 0.2, 0.06]}
        >
          <boxGeometry args={[0.4, 0.3, 0.02]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.6}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
      {/* Data streams */}
      {Array.from({ length: 12 }, (_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 1.8,
            (Math.random() - 0.5) * 1.3,
            0.08,
          ]}
        >
          <sphereGeometry args={[0.01, 8, 8]} />
          <meshStandardMaterial
            color="#00ff00"
            emissive="#00ff00"
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

function SteampunkEngine({ customization }: { customization: any }) {
  const groupRef = useRef<THREE.Group>(null);
  const pistonRefs = useRef<THREE.Group[]>([]);
  const gearRefs = useRef<THREE.Mesh[]>([]);
  const flywheelRef = useRef<THREE.Mesh>(null);
  const steamRefs = useRef<THREE.Mesh[]>([]);
  const gaugeRefs = useRef<THREE.Mesh[]>([]);

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

    // Animate pistons
    pistonRefs.current.forEach((piston, i) => {
      if (piston) {
        piston.position.y =
          Math.sin(state.clock.elapsedTime * 2 + i * Math.PI) * 0.1;
      }
    });

    // Animate gears
    gearRefs.current.forEach((gear, i) => {
      if (gear) {
        gear.rotation.z += 0.02 * (i % 2 === 0 ? 1 : -1);
      }
    });

    // Animate flywheel
    if (flywheelRef.current) {
      flywheelRef.current.rotation.z += 0.03;
    }

    // Animate steam particles
    steamRefs.current.forEach((steam, i) => {
      if (steam && steam.material) {
        steam.position.y += 0.01;
        const material = steam.material as THREE.MeshStandardMaterial;
        if (material.opacity !== undefined) {
          material.opacity =
            Math.sin(state.clock.elapsedTime * 3 + i) * 0.3 + 0.2;
        }
        if (steam.position.y > 1.5) {
          steam.position.y = 0.2;
        }
      }
    });

    // Animate pressure gauges
    gaugeRefs.current.forEach((gauge, i) => {
      if (gauge) {
        gauge.rotation.z = Math.sin(state.clock.elapsedTime + i) * 0.1;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Enhanced base platform with rivets */}
      <mesh position={[0, -0.8, 0]}>
        <boxGeometry args={[2.4, 0.12, 1.4]} />
        <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Base rivets */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 0.8;
        return (
          <mesh
            key={`base-rivet-${i}`}
            position={[
              Math.cos(angle) * radius,
              -0.74,
              Math.sin(angle) * radius * 0.6,
            ]}
          >
            <cylinderGeometry args={[0.02, 0.02, 0.04, 8]} />
            <meshStandardMaterial
              color="#1F2937"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        );
      })}

      {/* Main engine body with detailed texture */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 1.0, 16]} />
        <meshStandardMaterial color="#D97706" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Engine body decorative rings */}
      {[-0.3, 0, 0.3].map((y, i) => (
        <mesh key={`ring-${i}`} position={[0, y, 0]}>
          <torusGeometry args={[0.52, 0.02, 8, 16]} />
          <meshStandardMaterial
            color="#B45309"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Engine top cap with pressure relief valve */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.08, 16]} />
        <meshStandardMaterial color="#B45309" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Pressure relief valve */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#DC2626" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Engine bottom base */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.08, 16]} />
        <meshStandardMaterial color="#92400E" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Enhanced pistons with connecting rods */}
      {[-0.35, 0.35].map((x, i) => (
        <group
          key={i}
          position={[x, 0, 0]}
          ref={(el) => {
            if (el) pistonRefs.current[i] = el;
          }}
        >
          {/* Piston cylinder with cooling fins */}
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.3, 8]} />
            <meshStandardMaterial
              color="#DC2626"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>

          {/* Cooling fins */}
          {Array.from({ length: 6 }, (_, j) => (
            <mesh key={`fin-${j}`} position={[0, 0.25 + (j - 2.5) * 0.05, 0]}>
              <boxGeometry args={[0.15, 0.01, 0.02]} />
              <meshStandardMaterial
                color="#B91C1C"
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          ))}

          {/* Piston rod with crosshead */}
          <mesh position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.5, 6]} />
            <meshStandardMaterial
              color="#7F1D1D"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>

          {/* Crosshead */}
          <mesh position={[0, -0.3, 0]}>
            <boxGeometry args={[0.15, 0.08, 0.1]} />
            <meshStandardMaterial
              color="#6B7280"
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>

          {/* Piston head with rings */}
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.04, 8]} />
            <meshStandardMaterial
              color="#991B1B"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>

          {/* Piston rings */}
          {[0.42, 0.38].map((y, j) => (
            <mesh key={`ring-${j}`} position={[0, y, 0]}>
              <torusGeometry args={[0.09, 0.005, 8, 16]} />
              <meshStandardMaterial
                color="#374151"
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Enhanced steam pipes with valves and pressure gauges */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <group
            key={i}
            position={[Math.cos(angle) * 0.7, Math.sin(angle) * 0.7, 0]}
          >
            {/* Pipe */}
            <mesh>
              <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
              <meshStandardMaterial
                color="#6B7280"
                metalness={0.7}
                roughness={0.3}
              />
            </mesh>

            {/* Valve with handle */}
            <mesh position={[0, 0.25, 0]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial
                color="#374151"
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>

            {/* Valve handle */}
            <mesh position={[0, 0.25, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.15, 6]} />
              <meshStandardMaterial
                color="#1F2937"
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          </group>
        );
      })}

      {/* Enhanced gears with teeth */}
      {Array.from({ length: 4 }, (_, i) => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <group
            key={`gear-group-${i}`}
            position={[Math.cos(angle) * 0.8, Math.sin(angle) * 0.8, 0]}
          >
            {/* Main gear */}
            <mesh
              ref={(el) => {
                if (el) gearRefs.current[i] = el;
              }}
            >
              <torusGeometry args={[0.15, 0.03, 8, 16]} />
              <meshStandardMaterial
                color="#92400E"
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>

            {/* Gear teeth */}
            {Array.from({ length: 12 }, (_, j) => {
              const toothAngle = (j / 12) * Math.PI * 2;
              return (
                <mesh
                  key={`tooth-${j}`}
                  position={[
                    Math.cos(toothAngle) * 0.18,
                    Math.sin(toothAngle) * 0.18,
                    0,
                  ]}
                >
                  <boxGeometry args={[0.02, 0.02, 0.04]} />
                  <meshStandardMaterial
                    color="#B45309"
                    metalness={0.8}
                    roughness={0.2}
                  />
                </mesh>
              );
            })}
          </group>
        );
      })}

      {/* Enhanced pressure gauges with dials */}
      {[-0.3, 0.3].map((x, i) => (
        <group key={`gauge-group-${i}`} position={[x, 0.7, 0]}>
          {/* Gauge body */}
          <mesh
            ref={(el) => {
              if (el) gaugeRefs.current[i] = el;
            }}
          >
            <cylinderGeometry args={[0.08, 0.08, 0.06, 8]} />
            <meshStandardMaterial
              color="#1F2937"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>

          {/* Gauge dial */}
          <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.01, 8]} />
            <meshStandardMaterial
              color="#F3F4F6"
              metalness={0.1}
              roughness={0.8}
            />
          </mesh>

          {/* Gauge needle */}
          <mesh position={[0, 0.045, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.06, 0.005, 0.002]} />
            <meshStandardMaterial
              color="#DC2626"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </group>
      ))}

      {/* Enhanced steam effects with particles */}
      {Array.from({ length: 20 }, (_, i) => (
        <mesh
          key={`steam-${i}`}
          ref={(el) => {
            if (el) steamRefs.current[i] = el;
          }}
          position={[
            (Math.random() - 0.5) * 1.0,
            0.2 + Math.random() * 0.8,
            (Math.random() - 0.5) * 1.0,
          ]}
        >
          <sphereGeometry args={[0.02 + Math.random() * 0.02, 6, 6]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.3}
            metalness={0.1}
            roughness={0.9}
          />
        </mesh>
      ))}

      {/* Enhanced central flywheel with spokes */}
      <group position={[0, 0, 0]}>
        {/* Main flywheel ring */}
        <mesh ref={flywheelRef}>
          <torusGeometry args={[0.35, 0.04, 8, 16]} />
          <meshStandardMaterial
            color="#B45309"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Flywheel spokes */}
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <mesh
              key={`spoke-${i}`}
              position={[Math.cos(angle) * 0.175, Math.sin(angle) * 0.175, 0]}
              rotation={[0, 0, angle]}
            >
              <boxGeometry args={[0.35, 0.02, 0.02]} />
              <meshStandardMaterial
                color="#92400E"
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          );
        })}

        {/* Central hub */}
        <mesh>
          <cylinderGeometry args={[0.1, 0.1, 0.06, 8]} />
          <meshStandardMaterial
            color="#92400E"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* Enhanced support brackets with rivets */}
      {[-0.9, 0.9].map((x, i) => (
        <group key={`bracket-group-${i}`} position={[x, -0.3, 0]}>
          {/* Main bracket */}
          <mesh>
            <boxGeometry args={[0.12, 0.5, 0.12]} />
            <meshStandardMaterial
              color="#6B7280"
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>

          {/* Bracket rivets */}
          {[0.15, -0.15].map((y, j) => (
            <mesh key={`bracket-rivet-${j}`} position={[0, y, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 0.12, 6]} />
              <meshStandardMaterial
                color="#1F2937"
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Additional mechanical details */}
      {/* Crankshaft */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 1.0, 8]} />
        <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Connecting rods */}
      {[-0.35, 0.35].map((x, i) => (
        <mesh key={`connecting-rod-${i}`} position={[x, -0.2, 0]}>
          <boxGeometry args={[0.04, 0.3, 0.04]} />
          <meshStandardMaterial
            color="#6B7280"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* Oil reservoir */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 8]} />
        <meshStandardMaterial color="#1F2937" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Oil level indicator */}
      <mesh position={[0.35, -0.6, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.15, 6]} />
        <meshStandardMaterial color="#E5E7EB" metalness={0.1} roughness={0.8} />
      </mesh>
    </group>
  );
}

function DataSphere({ customization }: { customization: any }) {
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
      groupRef.current.rotation.x += 0.01;
    }
  });
  return (
    <group ref={groupRef}>
      {/* Main sphere */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.3}
          transparent
          opacity={0.7}
        />
      </mesh>
      {/* Data streams */}
      {Array.from({ length: 20 }, (_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI) / 10) * 0.6,
            Math.sin((i * Math.PI) / 10) * 0.6,
            (Math.random() - 0.5) * 0.4,
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial
            color="#00ff00"
            emissive="#00ff00"
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}
      {/* Information nodes */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI) / 4) * 0.8,
            Math.sin((i * Math.PI) / 4) * 0.8,
            0,
          ]}
        >
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial
            color="#ff00ff"
            emissive="#ff00ff"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

function MagneticField({ customization }: { customization: any }) {
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
      {/* Field lines */}
      {Array.from({ length: 12 }, (_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI) / 6) * 0.8,
            Math.sin((i * Math.PI) / 6) * 0.8,
            0,
          ]}
        >
          <cylinderGeometry args={[0.02, 0.02, 1.5, 8]} />
          <meshStandardMaterial
            color="#4169E1"
            emissive="#4169E1"
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
      {/* Magnetic particles */}
      {Array.from({ length: 30 }, (_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
          ]}
        >
          <sphereGeometry args={[0.01, 8, 8]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function FloatingIsland({ customization }: { customization: any }) {
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
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });
  return (
    <group ref={groupRef}>
      {/* Island base - more organic shape */}
      <mesh>
        <cylinderGeometry args={[1.2, 1.4, 0.4, 12]} />
        <meshStandardMaterial color="#8B4513" metalness={0.1} roughness={0.8} />
      </mesh>
      {/* Top surface with grass */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.15, 12]} />
        <meshStandardMaterial color="#228B22" metalness={0.1} roughness={0.9} />
      </mesh>
      {/* Central rock formation */}
      <mesh position={[0, 0.4, 0]}>
        <coneGeometry args={[0.3, 0.6, 8]} />
        <meshStandardMaterial color="#696969" metalness={0.2} roughness={0.7} />
      </mesh>
      {/* Trees */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 0.7;
        return (
          <group
            key={i}
            position={[Math.cos(angle) * radius, 0.3, Math.sin(angle) * radius]}
          >
            {/* Tree trunk */}
            <mesh position={[0, 0.2, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.4, 6]} />
              <meshStandardMaterial
                color="#8B4513"
                metalness={0.1}
                roughness={0.8}
              />
            </mesh>
            {/* Tree foliage */}
            <mesh position={[0, 0.5, 0]}>
              <sphereGeometry args={[0.15, 8, 8]} />
              <meshStandardMaterial
                color="#32CD32"
                metalness={0.1}
                roughness={0.9}
              />
            </mesh>
          </group>
        );
      })}
      {/* Cascading waterfalls */}
      {Array.from({ length: 3 }, (_, i) => (
        <group key={i} position={[0, -0.1 - i * 0.2, 0]}>
          {Array.from({ length: 5 }, (_, j) => (
            <mesh key={j} position={[0, -j * 0.1, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.1, 8]} />
              <meshStandardMaterial
                color="#4169E1"
                transparent
                opacity={0.7}
                metalness={0.1}
                roughness={0.2}
              />
            </mesh>
          ))}
        </group>
      ))}
      {/* Floating magical particles */}
      {Array.from({ length: 20 }, (_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 2.5,
            0.5 + Math.random() * 1.5,
            (Math.random() - 0.5) * 2.5,
          ]}
        >
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial
            color={["#FFD700", "#FF69B4", "#00CED1", "#98FB98"][i % 4]}
            emissive={["#FFD700", "#FF69B4", "#00CED1", "#98FB98"][i % 4]}
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
      {/* Underwater glow */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.1, 16]} />
        <meshStandardMaterial
          color="#00CED1"
          emissive="#00CED1"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}

function PortalGate({ customization }: { customization: any }) {
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
      {/* Portal ring */}
      <mesh>
        <torusGeometry args={[1, 0.2, 16, 32]} />
        <meshStandardMaterial
          color="#4169E1"
          emissive="#4169E1"
          emissiveIntensity={0.6}
        />
      </mesh>
      {/* Inner portal */}
      <mesh>
        <torusGeometry args={[0.8, 0.1, 16, 32]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>
      {/* Energy swirls */}
      {Array.from({ length: 12 }, (_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI) / 6) * 0.9,
            Math.sin((i * Math.PI) / 6) * 0.9,
            0,
          ]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color="#ff00ff"
            emissive="#ff00ff"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

function CrystalCluster({ customization }: { customization: any }) {
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
      {/* Main crystal */}
      <mesh>
        <coneGeometry args={[0.3, 0.8, 6]} />
        <meshStandardMaterial
          color="#00ffff"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Smaller crystals */}
      {Array.from({ length: 6 }, (_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI) / 3) * 0.4,
            Math.sin((i * Math.PI) / 3) * 0.4,
            0,
          ]}
          rotation={[0, 0, (i * Math.PI) / 3]}
        >
          <coneGeometry args={[0.1, 0.3, 4]} />
          <meshStandardMaterial
            color="#ff00ff"
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
      {/* Base */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 8]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// New 3D Components
function HolographicDisplay({ customization }: { customization: any }) {
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
      {/* Base platform */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.1, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Holographic projection */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.2, 0.8, 0.02]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Glowing border */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.3, 0.9, 0.01]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.6}
          transparent
          opacity={0.4}
        />
      </mesh>
      {/* Data visualization bars */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={i} position={[(i - 3.5) * 0.15, 0.4, 0.02]}>
          <boxGeometry args={[0.1, 0.3 + Math.random() * 0.4, 0.01]} />
          <meshStandardMaterial
            color="#00ff00"
            emissive="#00ff00"
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
      {/* Floating data points */}
      {Array.from({ length: 12 }, (_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 1,
            Math.random() * 0.8,
            (Math.random() - 0.5) * 0.5,
          ]}
        >
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}
      {/* Support beam */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 8]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function EnergyCore({ customization }: { customization: any }) {
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
      groupRef.current.rotation.z += 0.01;
    }
  });
  return (
    <group ref={groupRef}>
      {/* Outer casing */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.3}
        />
      </mesh>
      {/* Core sphere */}
      <mesh>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          color="#ff6600"
          emissive="#ff6600"
          emissiveIntensity={0.8}
        />
      </mesh>
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#ff6600"
          emissive="#ff6600"
          emissiveIntensity={0.2}
          transparent
          opacity={0.4}
        />
      </mesh>
      {/* Rotating rings */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[(i * Math.PI) / 3, 0, 0]}>
          <torusGeometry args={[0.45 + i * 0.15, 0.03, 16, 32]} />
          <meshStandardMaterial
            color="#ffaa00"
            emissive="#ffaa00"
            emissiveIntensity={0.6}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
      {/* Energy particles */}
      {Array.from({ length: 20 }, (_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI) / 10) * (0.4 + Math.random() * 0.3),
            Math.sin((i * Math.PI) / 10) * (0.4 + Math.random() * 0.3),
            (Math.random() - 0.5) * 0.4,
          ]}
        >
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshStandardMaterial
            color="#ffff00"
            emissive="#ffff00"
            emissiveIntensity={0.7}
          />
        </mesh>
      ))}
      {/* Base platform */}
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.1, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Support beams */}
      {Array.from({ length: 4 }, (_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI) / 2) * 0.6,
            -0.35,
            Math.sin((i * Math.PI) / 2) * 0.6,
          ]}
        >
          <cylinderGeometry args={[0.02, 0.02, 0.7, 8]} />
          <meshStandardMaterial
            color="#333333"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function NeonSign({ customization }: { customization: any }) {
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
      {/* Sign base */}
      <mesh>
        <boxGeometry args={[2, 0.5, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Neon tubes */}
      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={i} position={[0, (i - 2.5) * 0.08, 0.06]}>
          <cylinderGeometry args={[0.02, 0.02, 1.8, 8]} />
          <meshStandardMaterial
            color="#ff00ff"
            emissive="#ff00ff"
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
      {/* Glow effect */}
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[2.2, 0.6, 0.02]} />
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>
      {/* Mounting brackets */}
      {[-1.1, 1.1].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]}>
          <boxGeometry args={[0.1, 0.6, 0.1]} />
          <meshStandardMaterial
            color="#333333"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      ))}
      {/* Text elements */}
      {Array.from({ length: 4 }, (_, i) => (
        <mesh key={i} position={[(i - 1.5) * 0.4, 0, 0.07]}>
          <boxGeometry args={[0.3, 0.02, 0.02]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
      {/* Ambient glow */}
      <mesh position={[0, 0, 0.1]}>
        <boxGeometry args={[2.5, 0.8, 0.01]} />
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={0.1}
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}

// Practical UI Components
function ModernCard({ customization }: { customization: any }) {
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
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      groupRef.current.rotation.y += 0.005;
    }
  });
  return (
    <group ref={groupRef}>
      {/* Main card */}
      <mesh>
        <boxGeometry args={[1.5, 0.1, 2]} />
        <meshStandardMaterial
          color={customization.color}
          metalness={customization.metalness}
          roughness={customization.roughness}
        />
      </mesh>
      {/* Glossy overlay */}
      <mesh>
        <boxGeometry args={[1.5, 0.11, 2]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.1}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* Accent line */}
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[1.5, 0.01, 0.1]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Shadow */}
      <mesh position={[0, -0.06, 0]}>
        <boxGeometry args={[1.6, 0.02, 2.1]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function FloatingButton({ customization }: { customization: any }) {
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
      {/* Button base */}
      <mesh>
        <cylinderGeometry args={[0.4, 0.4, 0.1, 16]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Glow effect */}
      <mesh>
        <cylinderGeometry args={[0.45, 0.45, 0.05, 16]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.4}
          transparent
          opacity={0.3}
        />
      </mesh>
      {/* Icon */}
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[0.2, 0.02, 0.2]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Shadow */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.02, 16]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function ProgressBar({ customization }: { customization: any }) {
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
      {/* Background bar */}
      <mesh>
        <boxGeometry args={[2, 0.1, 0.3]} />
        <meshStandardMaterial color="#374151" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Progress fill */}
      <mesh position={[-0.5, 0, 0]}>
        <boxGeometry args={[1, 0.08, 0.25]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Glow effect */}
      <mesh position={[-0.5, 0, 0]}>
        <boxGeometry args={[1, 0.12, 0.35]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.1}
          transparent
          opacity={0.3}
        />
      </mesh>
      {/* End cap */}
      <mesh position={[0.5, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 8]} />
        <meshStandardMaterial color="#6b7280" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}

function NotificationBadge({ customization }: { customization: any }) {
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
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 2) * 0.05;
      groupRef.current.rotation.y += 0.02;
    }
  });
  return (
    <group ref={groupRef}>
      {/* Main badge */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={0.4}
        />
      </mesh>
      {/* Glow effect */}
      <mesh>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={0.2}
          transparent
          opacity={0.4}
        />
      </mesh>
      {/* Number */}
      <mesh position={[0, 0, 0.25]}>
        <boxGeometry args={[0.15, 0.15, 0.02]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Pulse effect */}
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={0.1}
          transparent
          opacity={0.2}
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
      case "particle-system":
        return <ParticleSystem customization={customization} />;
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
      case "holographic-display":
        return <HolographicDisplay customization={customization} />;
      case "energy-core":
        return <EnergyCore customization={customization} />;
      case "neon-sign":
        return <NeonSign customization={customization} />;
      case "floating-island":
        return <FloatingIsland customization={customization} />;
      case "portal-gate":
        return <PortalGate customization={customization} />;
      case "crystal-cluster":
        return <CrystalCluster customization={customization} />;
      case "steampunk-engine":
        return <SteampunkEngine customization={customization} />;
      case "data-sphere":
        return <DataSphere customization={customization} />;
      case "magnetic-field":
        return <MagneticField customization={customization} />;
      case "quantum-cube":
        return <QuantumCube customization={customization} />;
      case "time-machine":
        return <TimeMachine customization={customization} />;
      case "neural-network":
        return <NeuralNetwork customization={customization} />;
      case "crystal-prism":
        return <CrystalPrism customization={customization} />;
      case "plasma-ball":
        return <PlasmaBall customization={customization} />;
      case "fractal-tree":
        return <FractalTree customization={customization} />;
      case "holographic-ui":
        return <HolographicUI customization={customization} />;
      case "modern-card":
        return <ModernCard customization={customization} />;
      case "floating-button":
        return <FloatingButton customization={customization} />;
      case "progress-bar":
        return <ProgressBar customization={customization} />;
      case "notification-badge":
        return <NotificationBadge customization={customization} />;
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
