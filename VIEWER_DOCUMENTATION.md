# 3D Component Viewer Documentation

## Overview

The 3D Component Viewer is a powerful tool for viewing, customizing, and exporting 3D components built with React Three Fiber. It provides a responsive interface that works seamlessly on both mobile and desktop devices.

## Features

### 🎨 Color Presets System
- **16 Material Presets**: Pre-configured materials with optimized properties
- **Component-Specific Recommendations**: Smart suggestions based on component type
- **Real-time Preview**: See changes instantly in the 3D viewer
- **Custom Color Picker**: Fine-tune colors with hex input or color picker

### 📱 Responsive Design
- **Mobile-Optimized**: Touch-friendly controls and compact layout
- **Desktop Enhanced**: Full-featured interface with advanced controls
- **Adaptive Layout**: Automatically adjusts based on screen size
- **Performance Optimized**: Smooth animations and interactions

### 🔧 Customization Controls
- **Material Properties**: Color, metalness, roughness, and glow intensity
- **Transform Controls**: Scale and rotation speed
- **Real-time Updates**: Changes apply instantly to the 3D model
- **Reset Functionality**: Return to component defaults

## How to Use

### 1. Navigation

#### Desktop Layout
- **Header**: Component name, description, and action buttons
- **Tabs**: Viewer, Customize, Code, and Info sections
- **Side-by-side**: 3D viewer and controls panel in customize mode

#### Mobile Layout
- **Compact Header**: Essential information with mobile indicators
- **Stacked Layout**: Controls appear above the 3D viewer
- **Touch Optimized**: Larger touch targets and simplified controls

### 2. Color Presets

#### Available Materials

**Metals**
- Steel (#6B7280) - High metalness, medium roughness
- Aluminum (#9CA3AF) - Medium metalness, higher roughness
- Brass (#D97706) - High metalness, low roughness
- Copper (#DC2626) - High metalness, low roughness
- Gold (#F59E0B) - Maximum metalness, no roughness
- Silver (#E5E7EB) - Maximum metalness, no roughness
- Titanium (#9CA3AF) - High metalness, low roughness

**Plastics & Glass**
- Plastic (#3B82F6) - No metalness, high roughness
- Glass (#E0E7FF) - No metalness, no roughness

**Emissive Materials**
- Neon Blue (#00D4FF) - Glowing blue with low roughness
- Neon Green (#00FF88) - Glowing green with low roughness
- Neon Pink (#FF0080) - Glowing pink with low roughness

**Organic Materials**
- Wood (#8B4513) - No metalness, very high roughness
- Stone (#6B7280) - No metalness, high roughness

**Special Materials**
- Ceramic (#F3F4F6) - No metalness, very low roughness
- Carbon (#1F2937) - High metalness, medium roughness

#### Component-Specific Recommendations

Each component type has optimized material recommendations:

- **Mechanical Parts** (bolts, hinges, gears): Steel, Brass, Aluminum, Titanium
- **Electronic Components** (circuit boards): Carbon, Copper, Plastic, Ceramic
- **Decorative Items** (brackets, text): Brass, Gold, Silver, Bronze
- **Geometric Shapes** (spheres, cubes): Plastic, Glass, Neon colors
- **Lighting Elements** (directional lights): Neon colors, Gold
- **Helpers** (grid, axes): Neon colors, Silver, Plastic

### 3. Customization Workflow

#### Step 1: Select a Component
1. Navigate to the browse page
2. Choose a component from the catalog
3. Click to open the viewer

#### Step 2: Apply Material Presets
1. Go to the "Customize" tab
2. Choose from recommended materials (top section)
3. Or browse all materials (bottom section)
4. Click any material to apply instantly

#### Step 3: Fine-tune Properties
1. **Color**: Use the color picker or hex input
2. **Metalness**: 0 (plastic) to 1 (metal)
3. **Roughness**: 0 (smooth) to 1 (rough)
4. **Glow Intensity**: 0 (no glow) to 2 (bright glow)

#### Step 4: Adjust Transform
1. **Scale**: 0.1x to 3x (uniform scaling)
2. **Rotation Speed**: 0 (static) to 3x (fast rotation)

#### Step 5: Export
1. **Copy Code**: Get React Three Fiber code
2. **Export Config**: Download JSON configuration

### 4. Mobile-Specific Features

#### Touch Controls
- **Larger Buttons**: Easy-to-tap material preset buttons
- **Simplified Sliders**: Touch-friendly control ranges
- **Compact Layout**: Controls stack above 3D viewer
- **Mobile Indicator**: Shows when in mobile mode

#### Performance Optimizations
- **Reduced Complexity**: Simplified controls on small screens
- **Optimized Rendering**: Adjusted 3D viewer size for mobile
- **Touch Gestures**: Pinch to zoom, swipe to rotate (if supported)

## Component Types and Defaults

### Mechanical Components
- **Hex Bolt**: Steel material, medium scale
- **Door Hinge**: Brass material, standard scale
- **Metal Panel**: Aluminum material, standard scale
- **Gear Assembly**: Steel material, slower animation

### Electronic Components
- **Circuit Board**: Carbon material, subtle glow
- **Directional Light**: Gold material, high glow intensity

### Geometric Components
- **Floating Sphere**: Neon blue, high glow, fast animation
- **Geometric Cube**: Glass material, distortion effect
- **Wireframe Sphere**: Neon blue, medium glow, medium animation

### Basic Primitives
- **Cube, Sphere, Torus, Cone, Plane**: Plastic material, standard scale
- **Cylinder, Pyramid, Capsule**: Plastic material, standard scale

### Decorative Components
- **Ornate Bracket**: Brass material, standard scale
- **3D Text**: Plastic material, standard scale
- **Hero Block**: Glass material, wide scale, subtle glow
- **Showcase Card**: Glass material, flat scale

### Helper Components
- **Grid Helper**: Neon blue, medium glow
- **Axes Helper**: Neon blue, medium glow
- **Perspective Camera**: Carbon material, standard scale

## Technical Details

### Store Management
The viewer uses Zustand for state management with:
- Component selection and metadata
- Customization properties
- Component-specific defaults
- Reset functionality

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Performance Features
- **Memoized Components**: Prevents unnecessary re-renders
- **Optimized Effects**: Efficient GSAP animations
- **Lazy Loading**: Components load on demand
- **Suspense Boundaries**: Smooth loading states

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### Common Issues

**Color Presets Not Working**
1. Check if the component type is supported
2. Verify the store is properly initialized
3. Ensure the 3D viewer is mounted

**Mobile Layout Issues**
1. Clear browser cache
2. Check viewport meta tag
3. Verify CSS is loading properly

**Performance Problems**
1. Reduce animation speed
2. Lower glow intensity
3. Use simpler materials
4. Check device capabilities

### Best Practices

**For Developers**
1. Always test on both mobile and desktop
2. Use component-specific defaults
3. Implement proper error boundaries
4. Optimize 3D models for web

**For Users**
1. Start with recommended materials
2. Use subtle adjustments for best results
3. Export configurations for reuse
4. Test on target devices

## API Reference

### Store Methods
```typescript
// Select a component
setSelectedComponent(component: ComponentModel)

// Update customization
updateCustomization(updates: Partial<ComponentCustomization>)

// Reset to defaults
resetCustomization()

// Reset to component defaults
resetToComponentDefaults(component: ComponentModel)
```

### Customization Properties
```typescript
interface ComponentCustomization {
  scale: [number, number, number];
  rotation: [number, number, number];
  position: [number, number, number];
  color: string;
  metalness: number;
  roughness: number;
  emissiveIntensity?: number;
  animationSpeed?: number;
  particleCount?: number;
  distortion?: number;
}
```

## Future Enhancements

### Planned Features
- **Material Library**: User-created material presets
- **Animation Presets**: Pre-configured animation sequences
- **Export Formats**: Additional export options (GLTF, OBJ)
- **Collaboration**: Share configurations with others
- **Advanced Controls**: Individual axis scaling and rotation

### Performance Improvements
- **WebGL Optimizations**: Better rendering performance
- **Lazy Loading**: Component-specific code splitting
- **Caching**: Material preset caching
- **Compression**: Optimized 3D model formats

---

This documentation is maintained and updated regularly. For the latest information, check the project repository or contact the development team. 