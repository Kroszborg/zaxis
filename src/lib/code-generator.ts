import { ComponentModel } from '@/types/component';
import { ComponentCustomization } from '@/types/component';

export function generateComponentCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  
  const componentFunctions = {
    'hex-bolt': generateHexBoltCode,
    'door-hinge': generateDoorHingeCode,
    'metal-panel': generateMetalPanelCode,
    'gear-assembly': generateGearAssemblyCode,
    'circuit-board': generateCircuitBoardCode,
    'ornate-bracket': generateOrnateBracketCode,
    'floating-sphere': generateFloatingSphereCode,
    'geometric-cube': generateGeometricCubeCode,
    'wireframe-sphere': generateWireframeSphereCode,
    'cube': generateCubeCode,
    'sphere': generateSphereCode,
    'torus': generateTorusCode,
    'cone': generateConeCode,
    'plane': generatePlaneCode,
    'text-3d': generateText3DCode,
    'directional-light': generateDirectionalLightCode,
    'perspective-camera': generatePerspectiveCameraCode,
    'grid-helper': generateGridHelperCode,
    'axes-helper': generateAxesHelperCode,
    'cylinder': generateCylinderCode,
    'pyramid': generatePyramidCode,
    'capsule': generateCapsuleCode,
    'hero-block': generateHeroBlockCode,
    'showcase-card': generateShowcaseCardCode,
    'holographic-display': generateHolographicDisplayCode,
    'energy-core': generateEnergyCoreCode,
    'neon-sign': generateNeonSignCode,
    'floating-island': generateFloatingIslandCode,
    'portal-gate': generatePortalGateCode,
    'crystal-cluster': generateCrystalClusterCode,
    'steampunk-engine': generateSteampunkEngineCode,
    'data-sphere': generateDataSphereCode,
    'magnetic-field': generateMagneticFieldCode,
    'quantum-cube': generateQuantumCubeCode,
    'time-machine': generateTimeMachineCode,
    'neural-network': generateNeuralNetworkCode,
    'crystal-prism': generateCrystalPrismCode,
    'plasma-ball': generatePlasmaBallCode,
    'fractal-tree': generateFractalTreeCode,
    'holographic-ui': generateHolographicUICode,
    'modern-card': generateModernCardCode,
    'floating-button': generateFloatingButtonCode,
    'progress-bar': generateProgressBarCode,
    'notification-badge': generateNotificationBadgeCode,
  };

  const generator = componentFunctions[component.componentType as keyof typeof componentFunctions];
  return generator ? generator(component, customization) : generateCubeCode(component, customization);
}

function generateHexBoltCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: ${scale[0]},
        y: ${scale[1]},
        z: ${scale[2]},
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: ${rotation[0]},
        y: ${rotation[1]},
        z: ${rotation[2]},
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.position, {
        x: ${position[0]},
        y: ${position[1]},
        z: ${position[2]},
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, []);

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
          color="${color}"
          metalness={${metalness}}
          roughness={${roughness}}
        />
      </mesh>
      {/* Threaded shaft */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 1, 8]} />
        <meshStandardMaterial
          color="${color}"
          metalness={${metalness}}
          roughness={${roughness}}
        />
      </mesh>
    </group>
  );
}`;
}

function generateDoorHingeCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: ${scale[0]},
        y: ${scale[1]},
        z: ${scale[2]},
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: ${rotation[0]},
        y: ${rotation[1]},
        z: ${rotation[2]},
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.position, {
        x: ${position[0]},
        y: ${position[1]},
        z: ${position[2]},
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <group ref={groupRef}>
      {/* Left plate */}
      <mesh position={[-0.8, 0, 0]}>
        <boxGeometry args={[1.2, 0.1, 0.6]} />
        <meshStandardMaterial
          color="${color}"
          metalness={${metalness}}
          roughness={${roughness}}
        />
      </mesh>
      {/* Right plate */}
      <mesh position={[0.8, 0, 0]}>
        <boxGeometry args={[1.2, 0.1, 0.6]} />
        <meshStandardMaterial
          color="${color}"
          metalness={${metalness}}
          roughness={${roughness}}
        />
      </mesh>
      {/* Center pin */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 8]} />
        <meshStandardMaterial
          color="${color}"
          metalness={${metalness}}
          roughness={${roughness}}
        />
      </mesh>
    </group>
  );
}`;
}

function generateMetalPanelCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: ${scale[0]},
        y: ${scale[1]},
        z: ${scale[2]},
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: ${rotation[0]},
        y: ${rotation[1]},
        z: ${rotation[2]},
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.position, {
        x: ${position[0]},
        y: ${position[1]},
        z: ${position[2]},
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <group ref={groupRef}>
      {/* Main panel */}
      <mesh>
        <boxGeometry args={[2, 0.05, 1.5]} />
        <meshStandardMaterial
          color="${color}"
          metalness={${metalness}}
          roughness={${roughness}}
        />
      </mesh>
      {/* Rivets */}
      {[-0.7, 0.7, -0.5, 0.5].map((x, i) => 
        [-0.6, 0.6].map((z, j) => (
          <mesh key={\`\${i}-\${j}\`} position={[x, 0.025, z]}>
            <cylinderGeometry args={[0.05, 0.05, 0.1, 8]} />
            <meshStandardMaterial
              color="${color}"
              metalness={${metalness}}
              roughness={${roughness}}
            />
          </mesh>
        ))
      )}
    </group>
  );
}`;
}

function generateGearAssemblyCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: ${scale[0]},
        y: ${scale[1]},
        z: ${scale[2]},
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: ${rotation[0]},
        y: ${rotation[1]},
        z: ${rotation[2]},
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.position, {
        x: ${position[0]},
        y: ${position[1]},
        z: ${position[2]},
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Large center gear */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.2, 12]} />
        <meshStandardMaterial
          color="${color}"
          metalness={${metalness}}
          roughness={${roughness}}
        />
      </mesh>
      {/* Small gears around */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * 1.2;
        const z = Math.sin(angle) * 1.2;
        return (
          <mesh key={i} position={[x, 0, z]}>
            <cylinderGeometry args={[0.3, 0.3, 0.15, 8]} />
            <meshStandardMaterial
              color="${color}"
              metalness={${metalness}}
              roughness={${roughness}}
            />
          </mesh>
        );
      })}
    </group>
  );
}`;
}

function generateCircuitBoardCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: ${scale[0]},
        y: ${scale[1]},
        z: ${scale[2]},
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: ${rotation[0]},
        y: ${rotation[1]},
        z: ${rotation[2]},
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.position, {
        x: ${position[0]},
        y: ${position[1]},
        z: ${position[2]},
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <group ref={groupRef}>
      {/* Main board */}
      <mesh>
        <boxGeometry args={[1.5, 0.02, 1]} />
        <meshStandardMaterial
          color="#2d3748"
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
      {/* Circuit traces */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={i} position={[0, 0.011, (i - 3.5) * 0.25]}>
          <boxGeometry args={[1.4, 0.002, 0.02]} />
          <meshStandardMaterial
            color="#48bb78"
            emissive="#48bb78"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
      {/* Components */}
      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={\`comp-\${i}\`} position={[0, 0.015, (i - 2.5) * 0.3]}>
          <boxGeometry args={[0.1, 0.01, 0.1]} />
          <meshStandardMaterial
            color="#e53e3e"
            emissive="#e53e3e"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}`;
}

function generateOrnateBracketCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: ${scale[0]},
        y: ${scale[1]},
        z: ${scale[2]},
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: ${rotation[0]},
        y: ${rotation[1]},
        z: ${rotation[2]},
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.position, {
        x: ${position[0]},
        y: ${position[1]},
        z: ${position[2]},
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <group ref={groupRef}>
      {/* Main bracket */}
      <mesh>
        <boxGeometry args={[1, 0.2, 0.8]} />
        <meshStandardMaterial
          color="${color}"
          metalness={${metalness}}
          roughness={${roughness}}
        />
      </mesh>
      {/* Decorative elements */}
      {[-0.3, 0.3].map((x, i) => (
        <mesh key={i} position={[x, 0.1, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.1, 8]} />
          <meshStandardMaterial
            color="${color}"
            metalness={${metalness}}
            roughness={${roughness}}
          />
        </mesh>
      ))}
    </group>
  );
}`;
}

function generateFloatingSphereCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: ${scale[0]},
        y: ${scale[1]},
        z: ${scale[2]},
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: ${rotation[0]},
        y: ${rotation[1]},
        z: ${rotation[2]},
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.position, {
        x: ${position[0]},
        y: ${position[1]},
        z: ${position[2]},
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, []);

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
          color="${color}"
          metalness={${metalness}}
          roughness={${roughness}}
          emissive="${color}"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Particle ring */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x = Math.cos(angle) * 0.8;
        const z = Math.sin(angle) * 0.8;
        return (
          <mesh key={i} position={[x, 0, z]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
              color="${color}"
              emissive="${color}"
              emissiveIntensity={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}`;
}

function generateGeometricCubeCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: ${scale[0]},
        y: ${scale[1]},
        z: ${scale[2]},
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: ${rotation[0]},
        y: ${rotation[1]},
        z: ${rotation[2]},
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.position, {
        x: ${position[0]},
        y: ${position[1]},
        z: ${position[2]},
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      groupRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="${color}"
          metalness={${metalness}}
          roughness={${roughness}}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}`;
}

function generateWireframeSphereCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: ${scale[0]},
        y: ${scale[1]},
        z: ${scale[2]},
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: ${rotation[0]},
        y: ${rotation[1]},
        z: ${rotation[2]},
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(groupRef.current.position, {
        x: ${position[0]},
        y: ${position[1]},
        z: ${position[2]},
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, []);

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
          color="${color}"
          emissive="${color}"
          emissiveIntensity={0.3}
          wireframe
        />
      </mesh>
    </group>
  );
}`;
}

function generateCubeCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: ${scale[0]},
        y: ${scale[1]},
        z: ${scale[2]},
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(groupRef.current.rotation, {
        x: ${rotation[0]},
        y: ${rotation[1]},
        z: ${rotation[2]},
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(groupRef.current.position, {
        x: ${position[0]},
        y: ${position[1]},
        z: ${position[2]},
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, []);
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });
  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} />
      </mesh>
    </group>
  );
}`;
}

function generateSphereCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: ${scale[0]},
        y: ${scale[1]},
        z: ${scale[2]},
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(groupRef.current.rotation, {
        x: ${rotation[0]},
        y: ${rotation[1]},
        z: ${rotation[2]},
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(groupRef.current.position, {
        x: ${position[0]},
        y: ${position[1]},
        z: ${position[2]},
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, []);
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });
  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} />
      </mesh>
    </group>
  );
}`;
}

function generateTorusCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: ${scale[0]},
        y: ${scale[1]},
        z: ${scale[2]},
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(groupRef.current.rotation, {
        x: ${rotation[0]},
        y: ${rotation[1]},
        z: ${rotation[2]},
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(groupRef.current.position, {
        x: ${position[0]},
        y: ${position[1]},
        z: ${position[2]},
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, []);
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });
  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[0.5, 0.2, 16, 32]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} />
      </mesh>
    </group>
  );
}`;
}

function generateConeCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: ${scale[0]},
        y: ${scale[1]},
        z: ${scale[2]},
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(groupRef.current.rotation, {
        x: ${rotation[0]},
        y: ${rotation[1]},
        z: ${rotation[2]},
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(groupRef.current.position, {
        x: ${position[0]},
        y: ${position[1]},
        z: ${position[2]},
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, []);
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });
  return (
    <group ref={groupRef}>
      <mesh>
        <coneGeometry args={[0.5, 1, 32]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} />
      </mesh>
    </group>
  );
}`;
}

function generatePlaneCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: ${scale[0]},
        y: ${scale[1]},
        z: ${scale[2]},
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(groupRef.current.rotation, {
        x: ${rotation[0]},
        y: ${rotation[1]},
        z: ${rotation[2]},
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(groupRef.current.position, {
        x: ${position[0]},
        y: ${position[1]},
        z: ${position[2]},
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, []);
  return (
    <group ref={groupRef}>
      <mesh>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} />
      </mesh>
    </group>
  );
}`;
}

function generateText3DCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { Center, Text3D } from '@react-three/drei';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: ${scale[0]},
        y: ${scale[1]},
        z: ${scale[2]},
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(groupRef.current.rotation, {
        x: ${rotation[0]},
        y: ${rotation[1]},
        z: ${rotation[2]},
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(groupRef.current.position, {
        x: ${position[0]},
        y: ${position[1]},
        z: ${position[2]},
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, []);
  return (
    <group ref={groupRef}>
      <Center>
        <Text3D font="/fonts/helvetiker_regular.typeface.json" size={0.3} height={0.1} curveSegments={12}>
          ZAXIS
          <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} />
        </Text3D>
      </Center>
    </group>
  );
}`;
}

function generateDirectionalLightCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { position } = customization;
  return `import { useRef, useEffect } from 'react';
import { DirectionalLightHelper } from 'three';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const lightRef = useRef(null);
  useEffect(() => {
    if (lightRef.current) {
      // Optionally add a helper
      // new DirectionalLightHelper(lightRef.current, 1);
    }
  }, []);
  return (
    <directionalLight ref={lightRef} position={[${position[0]}, ${position[1]}, ${position[2]}]} intensity={1} />
  );
}`;
}

function generatePerspectiveCameraCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { position, rotation } = customization;
  return `import { useRef, useEffect } from 'react';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const cameraRef = useRef(null);
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(${position[0]}, ${position[1]}, ${position[2]});
      cameraRef.current.rotation.set(${rotation[0]}, ${rotation[1]}, ${rotation[2]});
    }
  }, []);
  return (
    <perspectiveCamera ref={cameraRef} fov={50} />
  );
}`;
}

function generateGridHelperCode(component: ComponentModel, customization: ComponentCustomization): string {
  return `import { useRef } from 'react';

export function ${component.name.replace(/\s+/g, '')}Component() {
  return (
    <gridHelper args={[5, 10, '${customization.color}']} />
  );
}`;
}

function generateAxesHelperCode(component: ComponentModel, customization: ComponentCustomization): string {
  return `import { useRef } from 'react';

export function ${component.name.replace(/\s+/g, '')}Component() {
  return (
    <axesHelper args={[2]} />
  );
}`;
}

function generateCylinderCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, { x: ${scale[0]}, y: ${scale[1]}, z: ${scale[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.rotation, { x: ${rotation[0]}, y: ${rotation[1]}, z: ${rotation[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.position, { x: ${position[0]}, y: ${position[1]}, z: ${position[2]}, duration: 0.5, ease: "power2.out" });
    }
  }, []);
  useFrame(() => { if (groupRef.current) { groupRef.current.rotation.y += 0.01; } });
  return (
    <group ref={groupRef}>
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} />
      </mesh>
    </group>
  );
}`;
}

function generatePyramidCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, { x: ${scale[0]}, y: ${scale[1]}, z: ${scale[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.rotation, { x: ${rotation[0]}, y: ${rotation[1]}, z: ${rotation[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.position, { x: ${position[0]}, y: ${position[1]}, z: ${position[2]}, duration: 0.5, ease: "power2.out" });
    }
  }, []);
  useFrame(() => { if (groupRef.current) { groupRef.current.rotation.y += 0.01; } });
  return (
    <group ref={groupRef}>
      <mesh>
        <coneGeometry args={[0.7, 1, 4]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} />
      </mesh>
    </group>
  );
}`;
}

function generateCapsuleCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, { x: ${scale[0]}, y: ${scale[1]}, z: ${scale[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.rotation, { x: ${rotation[0]}, y: ${rotation[1]}, z: ${rotation[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.position, { x: ${position[0]}, y: ${position[1]}, z: ${position[2]}, duration: 0.5, ease: "power2.out" });
    }
  }, []);
  useFrame(() => { if (groupRef.current) { groupRef.current.rotation.y += 0.01; } });
  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.4, 0.6, 16, 32]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} />
      </mesh>
    </group>
  );
}`;
}

function generateHeroBlockCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, { x: ${scale[0]}, y: ${scale[1]}, z: ${scale[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.rotation, { x: ${rotation[0]}, y: ${rotation[1]}, z: ${rotation[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.position, { x: ${position[0]}, y: ${position[1]}, z: ${position[2]}, duration: 0.5, ease: "power2.out" });
    }
  }, []);
  useFrame((state) => { if (groupRef.current) { groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1; groupRef.current.rotation.y += 0.01; } });
  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[1.5, 0.5, 1]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} emissive={color} emissiveIntensity={0.2} />
      </mesh>
      <mesh scale={[1.2, 0.1, 1.2]} position={[0, -0.3, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="${color}" emissive={color} emissiveIntensity={0.5} transparent opacity={0.2} />
      </mesh>
    </group>
  );
}`;
}

function generateShowcaseCardCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, { x: ${scale[0]}, y: ${scale[1]}, z: ${scale[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.rotation, { x: ${rotation[0]}, y: ${rotation[1]}, z: ${rotation[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.position, { x: ${position[0]}, y: ${position[1]}, z: ${position[2]}, duration: 0.5, ease: "power2.out" });
    }
  }, []);
  useFrame((state) => { if (groupRef.current) { groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05; groupRef.current.rotation.y += 0.01; } });
  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[1.2, 0.2, 0.8]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} />
      </mesh>
      <mesh scale={[1.3, 0.01, 1]} position={[0, -0.12, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="${color}" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}`;
}

// Additional code generators for new components
function generateHolographicDisplayCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, { x: ${scale[0]}, y: ${scale[1]}, z: ${scale[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.rotation, { x: ${rotation[0]}, y: ${rotation[1]}, z: ${rotation[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.position, { x: ${position[0]}, y: ${position[1]}, z: ${position[2]}, duration: 0.5, ease: "power2.out" });
    }
  }, []);
  useFrame((state) => { if (groupRef.current) { groupRef.current.rotation.y += 0.01; } });
  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[1.5, 1, 0.1]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}`;
}

function generateEnergyCoreCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, { x: ${scale[0]}, y: ${scale[1]}, z: ${scale[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.rotation, { x: ${rotation[0]}, y: ${rotation[1]}, z: ${rotation[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.position, { x: ${position[0]}, y: ${position[1]}, z: ${position[2]}, duration: 0.5, ease: "power2.out" });
    }
  }, []);
  useFrame((state) => { if (groupRef.current) { groupRef.current.rotation.y += 0.02; } });
  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} emissive={color} emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}`;
}

function generateNeonSignCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, { x: ${scale[0]}, y: ${scale[1]}, z: ${scale[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.rotation, { x: ${rotation[0]}, y: ${rotation[1]}, z: ${rotation[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.position, { x: ${position[0]}, y: ${position[1]}, z: ${position[2]}, duration: 0.5, ease: "power2.out" });
    }
  }, []);
  useFrame((state) => { if (groupRef.current) { groupRef.current.rotation.y += 0.01; } });
  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[2, 0.5, 0.1]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}`;
}

function generateFloatingIslandCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, { x: ${scale[0]}, y: ${scale[1]}, z: ${scale[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.rotation, { x: ${rotation[0]}, y: ${rotation[1]}, z: ${rotation[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.position, { x: ${position[0]}, y: ${position[1]}, z: ${position[2]}, duration: 0.5, ease: "power2.out" });
    }
  }, []);
  useFrame((state) => { if (groupRef.current) { groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1; } });
  return (
    <group ref={groupRef}>
      <mesh>
        <cylinderGeometry args={[1, 0.5, 0.3, 8]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} />
      </mesh>
    </group>
  );
}`;
}

function generatePortalGateCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, { x: ${scale[0]}, y: ${scale[1]}, z: ${scale[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.rotation, { x: ${rotation[0]}, y: ${rotation[1]}, z: ${rotation[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.position, { x: ${position[0]}, y: ${position[1]}, z: ${position[2]}, duration: 0.5, ease: "power2.out" });
    }
  }, []);
  useFrame((state) => { if (groupRef.current) { groupRef.current.rotation.y += 0.02; } });
  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[1, 0.1, 8, 16]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} emissive={color} emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}`;
}

function generateCrystalClusterCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, { x: ${scale[0]}, y: ${scale[1]}, z: ${scale[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.rotation, { x: ${rotation[0]}, y: ${rotation[1]}, z: ${rotation[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.position, { x: ${position[0]}, y: ${position[1]}, z: ${position[2]}, duration: 0.5, ease: "power2.out" });
    }
  }, []);
  useFrame((state) => { if (groupRef.current) { groupRef.current.rotation.y += 0.01; } });
  return (
    <group ref={groupRef}>
      <mesh>
        <coneGeometry args={[0.3, 0.8, 6]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} />
      </mesh>
    </group>
  );
}`;
}

function generateSteampunkEngineCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, { x: ${scale[0]}, y: ${scale[1]}, z: ${scale[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.rotation, { x: ${rotation[0]}, y: ${rotation[1]}, z: ${rotation[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.position, { x: ${position[0]}, y: ${position[1]}, z: ${position[2]}, duration: 0.5, ease: "power2.out" });
    }
  }, []);
  useFrame((state) => { if (groupRef.current) { groupRef.current.rotation.y += 0.005; } });
  return (
    <group ref={groupRef}>
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 1.0, 16]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} />
      </mesh>
    </group>
  );
}`;
}

function generateDataSphereCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, { x: ${scale[0]}, y: ${scale[1]}, z: ${scale[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.rotation, { x: ${rotation[0]}, y: ${rotation[1]}, z: ${rotation[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.position, { x: ${position[0]}, y: ${position[1]}, z: ${position[2]}, duration: 0.5, ease: "power2.out" });
    }
  }, []);
  useFrame((state) => { if (groupRef.current) { groupRef.current.rotation.y += 0.01; } });
  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} emissive={color} emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}`;
}

function generateMagneticFieldCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, { x: ${scale[0]}, y: ${scale[1]}, z: ${scale[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.rotation, { x: ${rotation[0]}, y: ${rotation[1]}, z: ${rotation[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.position, { x: ${position[0]}, y: ${position[1]}, z: ${position[2]}, duration: 0.5, ease: "power2.out" });
    }
  }, []);
  useFrame((state) => { if (groupRef.current) { groupRef.current.rotation.y += 0.01; } });
  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} emissive={color} emissiveIntensity={0.4} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}`;
}

function generateQuantumCubeCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, { x: ${scale[0]}, y: ${scale[1]}, z: ${scale[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.rotation, { x: ${rotation[0]}, y: ${rotation[1]}, z: ${rotation[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.position, { x: ${position[0]}, y: ${position[1]}, z: ${position[2]}, duration: 0.5, ease: "power2.out" });
    }
  }, []);
  useFrame((state) => { if (groupRef.current) { groupRef.current.rotation.y += 0.02; } });
  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}`;
}

function generateTimeMachineCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, { x: ${scale[0]}, y: ${scale[1]}, z: ${scale[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.rotation, { x: ${rotation[0]}, y: ${rotation[1]}, z: ${rotation[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.position, { x: ${position[0]}, y: ${position[1]}, z: ${position[2]}, duration: 0.5, ease: "power2.out" });
    }
  }, []);
  useFrame((state) => { if (groupRef.current) { groupRef.current.rotation.y += 0.01; } });
  return (
    <group ref={groupRef}>
      <mesh>
        <cylinderGeometry args={[0.5, 0.3, 1.2, 8]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} />
      </mesh>
    </group>
  );
}`;
}

function generateNeuralNetworkCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, { x: ${scale[0]}, y: ${scale[1]}, z: ${scale[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.rotation, { x: ${rotation[0]}, y: ${rotation[1]}, z: ${rotation[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.position, { x: ${position[0]}, y: ${position[1]}, z: ${position[2]}, duration: 0.5, ease: "power2.out" });
    }
  }, []);
  useFrame((state) => { if (groupRef.current) { groupRef.current.rotation.y += 0.01; } });
  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} emissive={color} emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}`;
}

function generateCrystalPrismCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, { x: ${scale[0]}, y: ${scale[1]}, z: ${scale[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.rotation, { x: ${rotation[0]}, y: ${rotation[1]}, z: ${rotation[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.position, { x: ${position[0]}, y: ${position[1]}, z: ${position[2]}, duration: 0.5, ease: "power2.out" });
    }
  }, []);
  useFrame((state) => { if (groupRef.current) { groupRef.current.rotation.y += 0.01; } });
  return (
    <group ref={groupRef}>
      <mesh>
        <coneGeometry args={[0.4, 0.8, 6]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} />
      </mesh>
    </group>
  );
}`;
}

function generatePlasmaBallCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, { x: ${scale[0]}, y: ${scale[1]}, z: ${scale[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.rotation, { x: ${rotation[0]}, y: ${rotation[1]}, z: ${rotation[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.position, { x: ${position[0]}, y: ${position[1]}, z: ${position[2]}, duration: 0.5, ease: "power2.out" });
    }
  }, []);
  useFrame((state) => { if (groupRef.current) { groupRef.current.rotation.y += 0.01; } });
  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} emissive={color} emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}`;
}

function generateFractalTreeCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, { x: ${scale[0]}, y: ${scale[1]}, z: ${scale[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.rotation, { x: ${rotation[0]}, y: ${rotation[1]}, z: ${rotation[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.position, { x: ${position[0]}, y: ${position[1]}, z: ${position[2]}, duration: 0.5, ease: "power2.out" });
    }
  }, []);
  useFrame((state) => { if (groupRef.current) { groupRef.current.rotation.y += 0.01; } });
  return (
    <group ref={groupRef}>
      <mesh>
        <cylinderGeometry args={[0.1, 0.05, 1.5, 8]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} />
      </mesh>
    </group>
  );
}`;
}

function generateHolographicUICode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, { x: ${scale[0]}, y: ${scale[1]}, z: ${scale[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.rotation, { x: ${rotation[0]}, y: ${rotation[1]}, z: ${rotation[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.position, { x: ${position[0]}, y: ${position[1]}, z: ${position[2]}, duration: 0.5, ease: "power2.out" });
    }
  }, []);
  useFrame((state) => { if (groupRef.current) { groupRef.current.rotation.y += 0.01; } });
  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[2, 1.5, 0.1]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}`;
}

function generateModernCardCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, { x: ${scale[0]}, y: ${scale[1]}, z: ${scale[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.rotation, { x: ${rotation[0]}, y: ${rotation[1]}, z: ${rotation[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.position, { x: ${position[0]}, y: ${position[1]}, z: ${position[2]}, duration: 0.5, ease: "power2.out" });
    }
  }, []);
  useFrame((state) => { if (groupRef.current) { groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05; groupRef.current.rotation.y += 0.01; } });
  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[1.2, 0.8, 1.5]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} />
      </mesh>
    </group>
  );
}`;
}

function generateFloatingButtonCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, { x: ${scale[0]}, y: ${scale[1]}, z: ${scale[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.rotation, { x: ${rotation[0]}, y: ${rotation[1]}, z: ${rotation[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.position, { x: ${position[0]}, y: ${position[1]}, z: ${position[2]}, duration: 0.5, ease: "power2.out" });
    }
  }, []);
  useFrame((state) => { if (groupRef.current) { groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1; groupRef.current.rotation.y += 0.01; } });
  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} emissive={color} emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}`;
}

function generateProgressBarCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, { x: ${scale[0]}, y: ${scale[1]}, z: ${scale[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.rotation, { x: ${rotation[0]}, y: ${rotation[1]}, z: ${rotation[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.position, { x: ${position[0]}, y: ${position[1]}, z: ${position[2]}, duration: 0.5, ease: "power2.out" });
    }
  }, []);
  useFrame((state) => { if (groupRef.current) { groupRef.current.rotation.y += 0.01; } });
  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[1.5, 0.8, 1]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} />
      </mesh>
    </group>
  );
}`;
}

function generateNotificationBadgeCode(component: ComponentModel, customization: ComponentCustomization): string {
  const { scale, rotation, position, color, metalness, roughness } = customization;
  return `import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export function ${component.name.replace(/\s+/g, '')}Component() {
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, { x: ${scale[0]}, y: ${scale[1]}, z: ${scale[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.rotation, { x: ${rotation[0]}, y: ${rotation[1]}, z: ${rotation[2]}, duration: 0.5, ease: "power2.out" });
      gsap.to(groupRef.current.position, { x: ${position[0]}, y: ${position[1]}, z: ${position[2]}, duration: 0.5, ease: "power2.out" });
    }
  }, []);
  useFrame((state) => { if (groupRef.current) { groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05; groupRef.current.rotation.y += 0.01; } });
  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="${color}" metalness={${metalness}} roughness={${roughness}} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}`;
}