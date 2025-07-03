# ZAxis - 3D Component Library

A modern, performant 3D component library built with Next.js, React Three Fiber, and TypeScript. Features interactive 3D models with real-time customization and code generation.

## 🚀 Features

- **Interactive 3D Models**: 20+ pre-built 3D components with realistic materials
- **Real-time Customization**: Live preview of material, scale, rotation, and position changes
- **Code Generation**: Automatic React Three Fiber code generation for each component
- **Performance Optimized**: Memoized components and optimized rendering pipeline
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **3D Graphics**: React Three Fiber + Three.js
- **Animations**: GSAP for smooth transitions
- **UI Components**: shadcn/ui + Tailwind CSS
- **State Management**: Zustand for global state
- **TypeScript**: Full type safety throughout the application

## 📁 Project Structure

```
zaxis/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── browse/            # Component browsing page
│   │   ├── viewer/            # 3D component viewer
│   │   └── layout.tsx         # Root layout
│   ├── components/
│   │   ├── 3d/               # 3D model components
│   │   │   ├── model-viewer.tsx
│   │   │   └── hero-scene.tsx
│   │   ├── customization/    # Customization controls
│   │   │   ├── control-panel.tsx
│   │   │   └── hero-control-panel.tsx
│   │   ├── layout/           # Layout components
│   │   │   ├── navbar.tsx
│   │   │   └── footer.tsx
│   │   ├── ui/               # shadcn/ui components
│   │   └── theme-provider.tsx
│   ├── lib/                  # Utility functions and stores
│   │   ├── store.ts          # Zustand store
│   │   ├── code-generator.ts # Code generation logic
│   │   ├── components-data.ts # Component definitions
│   │   └── utils.ts          # Utility functions
│   └── types/                # TypeScript type definitions
├── public/
│   └── components/           # Component thumbnail images
└── package.json
```

## 🎯 Performance Optimizations

### Viewer Page Optimizations
- **Memoized Component Lookup**: Prevents unnecessary recalculations when searching for components
- **Optimized useEffect Dependencies**: Reduces unnecessary rerenders by tracking only relevant state changes
- **Memoized Event Handlers**: Prevents recreation of functions on every render
- **Memoized Code Generation**: Caches generated code to avoid recalculation

### 3D Model Optimizations
- **React.memo**: All 3D components are memoized to prevent unnecessary rerenders
- **Optimized GSAP Animations**: Smooth transitions with proper cleanup
- **Efficient Geometry**: Optimized mesh geometries for better performance
- **Lazy Loading**: Components load only when needed

### Store Optimizations
- **Selective State Updates**: Only update relevant parts of the state
- **Immutable Updates**: Proper state immutability for better performance
- **Minimal Re-renders**: Store structure designed to minimize component updates

## 🎨 Component Types

### Basic Shapes
- **Cube**: Basic 3D cube with customizable materials
- **Sphere**: Smooth sphere with realistic lighting
- **Cylinder**: Cylindrical shape with configurable dimensions
- **Cone**: Conical shape with smooth geometry
- **Torus**: Ring-shaped geometry with customizable parameters
- **Plane**: Flat surface for backgrounds and floors
- **Pyramid**: Triangular pyramid with sharp edges
- **Capsule**: Rounded capsule shape

### Technical Components
- **Hex Bolt**: Detailed bolt with hexagonal head and threaded shaft
- **Door Hinge**: Functional hinge with two plates and center pin
- **Metal Panel**: Industrial panel with decorative rivets
- **Gear Assembly**: Interlocking gears with animated rotation
- **Circuit Board**: Electronic board with glowing traces and components
- **Ornate Bracket**: Decorative bracket with intricate details

### Special Effects
- **Floating Sphere**: Animated sphere with hover effects
- **Geometric Cube**: Complex cube with wireframe overlay
- **Wireframe Sphere**: Transparent sphere with wireframe structure
- **Text 3D**: Three-dimensional text rendering
- **Hero Block**: Showcase component with advanced effects
- **Showcase Card**: Card component with shadow and glow effects

### Helpers
- **Directional Light**: Configurable lighting component
- **Perspective Camera**: Camera controls and positioning
- **Grid Helper**: Reference grid for 3D space
- **Axes Helper**: Coordinate system visualization

## 🔧 Customization Options

Each 3D component supports the following customization parameters:

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

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/zaxis.git
cd zaxis
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## 📖 Usage

### Browsing Components
1. Navigate to `/browse` to see all available components
2. Use the search bar to filter components by name
3. Filter by category, complexity, or materials
4. Click on any component to view it in the 3D viewer

### Customizing Components
1. Select a component in the viewer
2. Switch to the "Customize" tab
3. Use the control panel to adjust:
   - Scale, rotation, and position
   - Material properties (color, metalness, roughness)
   - Animation and effect parameters
4. See real-time updates in the 3D preview

### Generating Code
1. Customize your component as desired
2. Switch to the "Code" tab
3. Copy the generated React Three Fiber code
4. Use the code in your own projects

### Exporting Configurations
1. Customize a component to your liking
2. Click the "Export" button in the header
3. Download the JSON configuration file
4. Import the configuration later to restore your settings

## 🎯 Performance Guidelines

### For Developers
- **Use React.memo**: Wrap components that receive stable props
- **Optimize useEffect**: Only include necessary dependencies
- **Memoize Expensive Operations**: Use useMemo for calculations
- **Callback Memoization**: Use useCallback for event handlers
- **Lazy Loading**: Load components only when needed

### For 3D Models
- **Efficient Geometries**: Use appropriate geometry types
- **Material Optimization**: Reuse materials when possible
- **Animation Cleanup**: Properly dispose of GSAP animations
- **Texture Management**: Optimize texture sizes and formats

## 🐛 Troubleshooting

### Common Issues

**3D Models Not Loading**
- Check browser WebGL support
- Ensure Three.js dependencies are installed
- Verify component type exists in the switch statement

**Performance Issues**
- Reduce polygon count for complex models
- Optimize material properties
- Check for memory leaks in animations

**Code Generation Errors**
- Verify component type is supported
- Check customization object structure
- Ensure all required properties are present

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Adding New Components
1. Create the 3D model component in `src/components/3d/model-viewer.tsx`
2. Add the component to the `Component3D` switch statement
3. Update `src/lib/components-data.ts` with component metadata
4. Add thumbnail image to `public/components/`
5. Test the component thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) for 3D rendering
- [Three.js](https://threejs.org/) for WebGL graphics
- [GSAP](https://greensock.com/gsap/) for animations
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the troubleshooting section

---

Built with ❤️ using Next.js, React Three Fiber, and modern web technologies.