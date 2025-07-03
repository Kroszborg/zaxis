# ZAxis Component Documentation

## Overview

ZAxis provides 20+ 3D components across four categories: Basic Shapes, Technical Components, Special Effects, and Helpers.

## 🟦 Basic Shapes

### Cube
- **Type**: `cube`
- **Features**: Standard 3D cube with customizable materials
- **Best for**: Basic 3D shapes, building blocks

### Sphere
- **Type**: `sphere`
- **Features**: Smooth spherical geometry with realistic lighting
- **Best for**: Organic shapes, smooth surfaces

### Cylinder
- **Type**: `cylinder`
- **Features**: Cylindrical shape with configurable dimensions
- **Best for**: Pipes, rods, cylindrical objects

### Cone
- **Type**: `cone`
- **Features**: Conical shape with smooth geometry
- **Best for**: Pointed objects, geometric shapes

### Torus
- **Type**: `torus`
- **Features**: Ring-shaped geometry with customizable parameters
- **Best for**: Rings, donut shapes, curved surfaces

### Plane
- **Type**: `plane`
- **Features**: Flat surface for backgrounds and floors
- **Best for**: Ground planes, walls, flat surfaces

### Pyramid
- **Type**: `pyramid`
- **Features**: Triangular pyramid with sharp edges
- **Best for**: Geometric shapes, architectural elements

### Capsule
- **Type**: `capsule`
- **Features**: Rounded capsule shape with smooth ends
- **Best for**: Pills, rounded objects, organic shapes

## 🔧 Technical Components

### Hex Bolt
- **Type**: `hex-bolt`
- **Features**: Detailed bolt with hexagonal head and threaded shaft
- **Animation**: Continuous rotation
- **Best for**: Mechanical assemblies, hardware

### Door Hinge
- **Type**: `door-hinge`
- **Features**: Functional hinge with two plates and center pin
- **Best for**: Doors, mechanical joints

### Metal Panel
- **Type**: `metal-panel`
- **Features**: Industrial panel with decorative rivets
- **Best for**: Industrial design, structural elements

### Gear Assembly
- **Type**: `gear-assembly`
- **Features**: Interlocking gears with animated rotation
- **Animation**: Continuous gear rotation
- **Best for**: Mechanical systems, gear demonstrations

### Circuit Board
- **Type**: `circuit-board`
- **Features**: Electronic board with glowing traces and components
- **Effects**: Emissive materials, glow effects
- **Best for**: Electronics, tech demonstrations

### Ornate Bracket
- **Type**: `ornate-bracket`
- **Features**: Decorative bracket with intricate details
- **Best for**: Decorative elements, ornamental design

## ✨ Special Effects

### Floating Sphere
- **Type**: `floating-sphere`
- **Features**: Animated sphere with floating motion and glow
- **Animation**: Vertical floating, rotation
- **Best for**: Showcase elements, visual effects

### Geometric Cube
- **Type**: `geometric-cube`
- **Features**: Complex cube with wireframe overlay
- **Best for**: Technical demonstrations, geometric art

### Wireframe Sphere
- **Type**: `wireframe-sphere`
- **Features**: Transparent sphere with wireframe structure
- **Best for**: Technical visualization, wireframe art

### Text 3D
- **Type**: `text-3d`
- **Features**: Three-dimensional text rendering
- **Best for**: Titles, labels, text effects

### Hero Block
- **Type**: `hero-block`
- **Features**: Showcase component with advanced lighting
- **Animation**: Rotation, glow effects
- **Best for**: Hero sections, showcase elements

### Showcase Card
- **Type**: `showcase-card`
- **Features**: Card with shadow effects and animations
- **Animation**: Floating motion, rotation
- **Best for**: UI elements, card designs

## 🔧 Helper Components

### Directional Light
- **Type**: `directional-light`
- **Features**: Configurable directional light source
- **Best for**: Scene lighting, light demonstrations

### Perspective Camera
- **Type**: `perspective-camera`
- **Features**: Perspective camera with controls
- **Best for**: Camera demonstrations, view controls

### Grid Helper
- **Type**: `grid-helper`
- **Features**: Reference grid for 3D space
- **Best for**: Spatial reference, measurement

### Axes Helper
- **Type**: `axes-helper`
- **Features**: Coordinate system visualization
- **Best for**: Orientation reference, coordinate systems

## 🎯 Customization Options

All components support these customization parameters:

```typescript
interface ComponentCustomization {
  scale: [number, number, number];      // X, Y, Z scale factors
  rotation: [number, number, number];   // X, Y, Z rotation in radians
  position: [number, number, number];   // X, Y, Z position
  color: string;                        // Material color (hex)
  metalness: number;                    // Metalness factor (0-1)
  roughness: number;                    // Roughness factor (0-1)
  emissiveIntensity: number;           // Glow intensity (0-1)
  animationSpeed: number;              // Animation speed multiplier
  particleCount: number;               // Number of particles (if applicable)
  distortion: number;                  // Distortion effect (0-1)
}
```

## 🚀 Performance Tips

1. **Choose Appropriate Components**
   - Use simple shapes for performance-critical applications
   - Reserve complex components for showcases

2. **Optimize Customization**
   - Avoid extreme scale values
   - Keep rotation values reasonable
   - Use appropriate material properties

3. **Scene Management**
   - Limit active components
   - Implement proper cleanup
   - Use level-of-detail techniques

## 📖 Usage Examples

### Basic Usage
```jsx
import { ModelViewer } from '@/components/3d/model-viewer';

<ModelViewer componentType="cube" />
```

### With Customization
```jsx
import { useComponentStore } from '@/lib/store';

const { customization } = useComponentStore();

<ModelViewer 
  componentType="sphere" 
  customization={customization}
/>
```

### Multiple Components
```jsx
<div className="grid grid-cols-2 gap-4">
  <ModelViewer componentType="cube" />
  <ModelViewer componentType="sphere" />
</div>
```

## 🔗 Related

- [Performance Guidelines](./README.md#performance-guidelines)
- [API Reference](./API.md)
- [Troubleshooting](./README.md#troubleshooting) 