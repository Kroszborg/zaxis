# ZAxis - Advanced 3D Component Library

<div align="center">
  <img src="https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg" alt="ZAxis Logo" width="200" height="200" style="border-radius: 20px;">
  
  <h3>🚀 The Future of 3D Web Development</h3>
  
  [![Next.js](https://img.shields.io/badge/Next.js-13.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React Three Fiber](https://img.shields.io/badge/R3F-8.17-blue?style=for-the-badge&logo=react)](https://docs.pmnd.rs/react-three-fiber)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)
</div>

## 🌟 Overview

**ZAxis** is a cutting-edge 3D component library that revolutionizes how developers create, customize, and integrate 3D elements into web applications. Built with React Three Fiber, Next.js, and modern web technologies, ZAxis provides an intuitive platform for real-time 3D component visualization and code generation.

### ✨ Key Features

- 🎨 **Real-time 3D Customization** - Live editing of materials, lighting, animations, and effects
- 🔧 **Instant Code Generation** - Export clean JSX/TSX code with your customizations
- 🎯 **Production Ready** - Optimized components built for performance and scalability
- 🌈 **Advanced Materials** - Support for metallic, glass, emissive, and custom materials
- ⚡ **GSAP Animations** - Smooth, professional animations and micro-interactions
- 📱 **Responsive Design** - Perfect experience across all devices and screen sizes
- 🎭 **Dark/Light Themes** - Beautiful themes with seamless switching
- 🔍 **Component Browser** - Organized library with search and filtering capabilities

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/zaxis.git
cd zaxis

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see ZAxis in action!

## 🏗️ Project Structure

```
zaxis/
├── app/                    # Next.js App Router
│   ├── browse/            # Component browser page
│   ├── viewer/            # 3D component viewer
│   ├── globals.css        # Global styles and animations
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx           # Landing page with hero section
├── components/
│   ├── 3d/               # 3D rendering components
│   │   ├── hero-scene.tsx # Interactive hero 3D scene
│   │   └── model-viewer.tsx # Main 3D model viewer
│   ├── customization/    # Control panels and UI
│   │   ├── control-panel.tsx # Component customization
│   │   └── hero-control-panel.tsx # Hero scene controls
│   ├── layout/           # Layout components
│   │   └── navbar.tsx    # Navigation with theme toggle
│   ├── theme/            # Theme components
│   │   └── theme-toggle.tsx # Dark/light mode switch
│   └── ui/               # Shadcn/ui components
├── lib/                  # Utilities and stores
│   ├── code-generator.ts # JSX/TSX code generation
│   ├── hero-code-generator.ts # Hero scene code export
│   ├── components-data.ts # Sample component data
│   ├── store.ts          # Component state management
│   └── hero-store.ts     # Hero scene state
├── types/                # TypeScript definitions
└── public/               # Static assets
    └── models/           # 3D model files (.glb/.gltf)
```

## 🎯 Core Features

### 🎨 Real-time 3D Customization

ZAxis provides intuitive controls for every aspect of 3D components:

- **Transform Controls**: Scale, rotation, and position with live preview
- **Material Properties**: Metalness, roughness, color, and emissive effects
- **Lighting Setup**: Ambient, directional, and point lights with color control
- **Animation Settings**: Float speed, rotation speed, and particle effects
- **Advanced Effects**: Distortion, emissive intensity, and particle systems

### 🔧 Code Generation

Export production-ready code in multiple formats:

```jsx
// Generated JSX Example
import { useGLTF } from '@react-three/drei';
import { useRef, useEffect } from 'react';

export function CustomBoltComponent() {
  const { scene } = useGLTF('/models/hex-bolt.glb');
  const meshRef = useRef();

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.scale.set(1.2, 1.2, 1.2);
      meshRef.current.rotation.set(0, 0.5, 0);
      // ... material customizations
    }
  }, [scene]);

  return <primitive ref={meshRef} object={scene} />;
}
```

### 🌈 Theme System

ZAxis includes a sophisticated theme system:

- **Dark Mode**: Deep blacks with vibrant accents
- **Light Mode**: Clean whites with subtle shadows
- **Smooth Transitions**: Animated theme switching
- **System Preference**: Automatic theme detection

## 🛠️ Technology Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React framework with App Router | 13.5+ |
| **React Three Fiber** | React renderer for Three.js | 8.17+ |
| **@react-three/drei** | Useful helpers for R3F | 9.114+ |
| **Three.js** | 3D graphics library | 0.169+ |
| **GSAP** | Professional animations | 3.12+ |
| **Tailwind CSS** | Utility-first CSS framework | 3.3+ |
| **Shadcn/ui** | Beautiful UI components | Latest |
| **Zustand** | State management | 5.0+ |
| **TypeScript** | Type safety | 5.2+ |

## 📖 Usage Examples

### Basic Component Integration

```tsx
import { ModelViewer } from '@/components/3d/model-viewer';

export function MyComponent() {
  return (
    <div className="h-96">
      <ModelViewer 
        modelPath="/models/hex-bolt.glb"
        controls={true}
        className="w-full h-full"
      />
    </div>
  );
}
```

### Custom Hero Scene

```tsx
import { HeroScene } from '@/components/3d/hero-scene';

export function CustomHero() {
  return (
    <section className="h-screen">
      <HeroScene />
    </section>
  );
}
```

### Component Browser Integration

```tsx
import { ComponentCard } from '@/components/ui/component-card';
import { sampleComponents } from '@/lib/components-data';

export function ComponentGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {sampleComponents.map((component) => (
        <ComponentCard key={component.id} component={component} />
      ))}
    </div>
  );
}
```

## 🎨 Customization Guide

### Adding New Components

1. **Create 3D Model**: Export as `.glb` or `.gltf` format
2. **Add to Data**: Update `lib/components-data.ts`
3. **Configure Materials**: Define available material options
4. **Set Defaults**: Specify default scale, rotation, and position

```typescript
// Example component definition
{
  id: 'custom-gear',
  name: 'Custom Gear',
  description: 'Precision-engineered mechanical gear',
  category: 'mechanical',
  tags: ['gear', 'mechanical', 'precision'],
  modelPath: '/models/custom-gear.glb',
  thumbnailPath: 'https://example.com/thumbnail.jpg',
  defaultScale: [1, 1, 1],
  defaultRotation: [0, 0, 0],
  materials: ['steel', 'aluminum', 'brass'],
  complexity: 'medium',
  downloadCount: 0,
  rating: 5.0,
}
```

### Theme Customization

Modify `app/globals.css` to customize the color scheme:

```css
:root {
  --background: 0 0% 3%;
  --foreground: 0 0% 98%;
  --primary: 217.2 91.2% 59.8%;
  --accent: 262.1 83.3% 57.8%;
  /* ... other variables */
}
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build the project
npm run build

# Deploy to Netlify
# Upload the 'out' folder to Netlify
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - Amazing React renderer for Three.js
- [Three.js](https://threejs.org/) - The foundation of 3D web graphics
- [Shadcn/ui](https://ui.shadcn.com/) - Beautiful and accessible UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [GSAP](https://greensock.com/gsap/) - Professional animation library

## 📞 Support

- 📧 Email: support@zaxis.dev
- 💬 Discord: [Join our community](https://discord.gg/zaxis)
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/zaxis/issues)
- 📖 Documentation: [docs.zaxis.dev](https://docs.zaxis.dev)

---

<div align="center">
  <p>Made with ❤️ by the ZAxis team</p>
  <p>⭐ Star us on GitHub if you find ZAxis useful!</p>
</div>