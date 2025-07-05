# Quick Setup Guide - 3D Component Viewer

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern browser with WebGL support

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd zaxis

# Install dependencies
npm install

# Start development server
npm run dev
```

### Access the Viewer
1. Open your browser to `http://localhost:3000`
2. Navigate to the "Browse" page
3. Click on any component to open the viewer
4. Or directly visit `/viewer?id=<component-id>`

## 📱 Mobile vs Desktop

### Mobile Experience (< 768px)
- **Compact Layout**: Controls stack above 3D viewer
- **Touch Optimized**: Larger buttons and touch-friendly sliders
- **Simplified Interface**: Essential controls only
- **Mobile Indicator**: Shows when in mobile mode

### Desktop Experience (≥ 768px)
- **Full Layout**: Side-by-side viewer and controls
- **Advanced Controls**: All customization options available
- **Enhanced Performance**: Higher resolution and smoother animations
- **Keyboard Support**: Full keyboard navigation

## 🎨 Using Color Presets

### Step 1: Select a Component
1. Go to the "Browse" page
2. Choose a component (e.g., "Hex Bolt", "Floating Sphere")
3. Click to open the viewer

### Step 2: Apply Material Presets
1. Click the "Customize" tab
2. **Recommended Materials** (top section):
   - Shows materials optimized for the selected component
   - Click any material to apply instantly
3. **All Materials** (bottom section):
   - Browse all 16 available material presets
   - Includes metals, plastics, glass, neon colors, and more

### Step 3: Fine-tune Properties
1. **Color**: Use the color picker or hex input
2. **Metalness**: 0 (plastic) to 1 (metal)
3. **Roughness**: 0 (smooth) to 1 (rough)
4. **Glow Intensity**: 0 (no glow) to 2 (bright glow)

### Step 4: Adjust Transform
1. **Scale**: 0.1x to 3x (uniform scaling)
2. **Rotation Speed**: 0 (static) to 3x (fast rotation)

## 🔧 Component-Specific Tips

### Mechanical Components
- **Hex Bolt**: Try Steel, Brass, or Titanium for realistic appearance
- **Door Hinge**: Brass or Copper work well for hardware
- **Gear Assembly**: Steel with slower animation for mechanical feel

### Geometric Components
- **Floating Sphere**: Neon colors with high glow for sci-fi look
- **Geometric Cube**: Glass material for modern appearance
- **Wireframe Sphere**: Neon colors for futuristic effect

### Basic Primitives
- **Cube/Sphere/Torus**: Plastic for prototyping, Glass for modern look
- **Cone/Pyramid**: Stone material for architectural feel

### Decorative Components
- **Ornate Bracket**: Brass or Gold for elegant appearance
- **3D Text**: Plastic for readability, Gold for luxury feel

## 📤 Exporting Your Work

### Copy Code
1. Go to the "Code" tab
2. Click "Copy" button
3. Paste into your React Three Fiber project

### Export Configuration
1. Go to the "Code" tab
2. Click "Export Config" button
3. JSON file downloads with all settings
4. Can be imported later to restore exact configuration

## 🐛 Troubleshooting

### Color Presets Not Working
```bash
# Check if component is supported
# Verify in src/lib/components-data.ts

# Clear browser cache
# Hard refresh (Ctrl+F5 or Cmd+Shift+R)
```

### Mobile Issues
```bash
# Check viewport meta tag in layout.tsx
# Verify responsive breakpoints
# Test on actual mobile device
```

### Performance Issues
```bash
# Reduce animation speed
# Lower glow intensity
# Use simpler materials
# Check device WebGL support
```

## 🎯 Best Practices

### For Optimal Experience
1. **Start with Recommended Materials**: They're optimized for each component
2. **Use Subtle Adjustments**: Small changes often look better
3. **Test on Target Devices**: Mobile and desktop can differ
4. **Export Configurations**: Save your work for reuse

### For Developers
1. **Test Responsive Design**: Always check mobile layout
2. **Use Component Defaults**: Leverage built-in optimizations
3. **Optimize Performance**: Monitor frame rates and loading times
4. **Handle Errors Gracefully**: Implement proper error boundaries

## 📚 Additional Resources

### Documentation
- [Full Documentation](./VIEWER_DOCUMENTATION.md)
- [Component Types](./src/types/component.ts)
- [Store Management](./src/lib/store.ts)

### Examples
- [Material Presets](./src/components/customization/control-panel.tsx)
- [3D Models](./src/components/3d/model-viewer.tsx)
- [Responsive Layout](./src/app/viewer/page.tsx)

### External Resources
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Documentation](https://threejs.org/docs/)
- [GSAP Animation](https://greensock.com/docs/)

## 🔄 Updates and Maintenance

### Regular Updates
- Check for new material presets
- Update component defaults as needed
- Monitor performance on different devices
- Test with new browser versions

### Contributing
1. Fork the repository
2. Create a feature branch
3. Test on mobile and desktop
4. Submit a pull request

---

**Need Help?** Check the full documentation or create an issue in the repository. 