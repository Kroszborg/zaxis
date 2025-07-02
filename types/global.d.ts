import '@react-three/fiber';

/// <reference types="@react-three/fiber" />

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Three.js primitives
      group: any;
      mesh: any;
      primitive: any;
      
      // Geometries
      boxGeometry: any;
      sphereGeometry: any;
      planeGeometry: any;
      cylinderGeometry: any;
      coneGeometry: any;
      torusGeometry: any;
      icosahedronGeometry: any;
      octahedronGeometry: any;
      tetrahedronGeometry: any;
      ringGeometry: any;
      circleGeometry: any;
      bufferGeometry: any;
      
      // Materials
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      meshPhongMaterial: any;
      meshLambertMaterial: any;
      meshPhysicalMaterial: any;
      meshToonMaterial: any;
      meshDepthMaterial: any;
      meshNormalMaterial: any;
      meshMatcapMaterial: any;
      lineBasicMaterial: any;
      lineDashedMaterial: any;
      pointsMaterial: any;
      spriteMaterial: any;
      rawShaderMaterial: any;
      shaderMaterial: any;
      
      // Lights
      ambientLight: any;
      directionalLight: any;
      pointLight: any;
      spotLight: any;
      hemisphereLight: any;
      rectAreaLight: any;
      
      // Other objects
      line: any;
      lineSegments: any;
      points: any;
      sprite: any;
      instancedMesh: any;
      skinnedMesh: any;
      bone: any;
      skeleton: any;
      
      // Buffer attributes
      bufferAttribute: any;
      instancedBufferAttribute: any;
      
      // Drei components
      Float: any;
      Environment: any;
      ContactShadows: any;
      OrbitControls: any;
      Sphere: any;
      MeshDistortMaterial: any;
    }
  }
} 