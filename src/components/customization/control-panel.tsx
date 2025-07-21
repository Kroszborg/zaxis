"use client";

import { useComponentStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  RotateCcw,
  Copy,
  Download,
  Palette,
  Move,
  RotateCw as RotateIcon,
  Zap,
  Sparkles,
  Eye,
  Settings,
  Smartphone,
  Monitor,
} from "lucide-react";
import { generateComponentCode } from "@/lib/code-generator";
import { toast } from "sonner";

// Enhanced material presets with better color options for all component types
const materialPresets = [
  {
    name: "Steel",
    color: "#6B7280",
    metalness: 0.8,
    roughness: 0.2,
    category: "metal",
  },
  {
    name: "Aluminum",
    color: "#9CA3AF",
    metalness: 0.7,
    roughness: 0.3,
    category: "metal",
  },
  {
    name: "Brass",
    color: "#D97706",
    metalness: 0.9,
    roughness: 0.1,
    category: "metal",
  },
  {
    name: "Copper",
    color: "#DC2626",
    metalness: 0.9,
    roughness: 0.1,
    category: "metal",
  },
  {
    name: "Gold",
    color: "#F59E0B",
    metalness: 1.0,
    roughness: 0.0,
    category: "metal",
  },
  {
    name: "Silver",
    color: "#E5E7EB",
    metalness: 1.0,
    roughness: 0.0,
    category: "metal",
  },
  {
    name: "Plastic",
    color: "#3B82F6",
    metalness: 0.0,
    roughness: 0.8,
    category: "plastic",
  },
  {
    name: "Glass",
    color: "#E0E7FF",
    metalness: 0.0,
    roughness: 0.0,
    category: "glass",
  },
  {
    name: "Neon Blue",
    color: "#00D4FF",
    metalness: 0.0,
    roughness: 0.2,
    category: "emissive",
  },
  {
    name: "Neon Green",
    color: "#00FF88",
    metalness: 0.0,
    roughness: 0.2,
    category: "emissive",
  },
  {
    name: "Neon Pink",
    color: "#FF0080",
    metalness: 0.0,
    roughness: 0.2,
    category: "emissive",
  },
  {
    name: "Wood",
    color: "#8B4513",
    metalness: 0.0,
    roughness: 0.9,
    category: "organic",
  },
  {
    name: "Stone",
    color: "#6B7280",
    metalness: 0.0,
    roughness: 0.8,
    category: "organic",
  },
  {
    name: "Ceramic",
    color: "#F3F4F6",
    metalness: 0.0,
    roughness: 0.1,
    category: "ceramic",
  },
  {
    name: "Carbon",
    color: "#1F2937",
    metalness: 0.8,
    roughness: 0.4,
    category: "carbon",
  },
  {
    name: "Titanium",
    color: "#9CA3AF",
    metalness: 0.9,
    roughness: 0.2,
    category: "metal",
  },
];

// Component-specific presets
const componentPresets = {
  "hex-bolt": ["Steel", "Brass", "Aluminum", "Titanium"],
  "door-hinge": ["Steel", "Brass", "Copper", "Aluminum"],
  "metal-panel": ["Aluminum", "Steel", "Titanium", "Carbon"],
  "gear-assembly": ["Steel", "Brass", "Plastic", "Carbon"],
  "circuit-board": ["Carbon", "Copper", "Plastic", "Ceramic"],
  "ornate-bracket": ["Brass", "Gold", "Silver", "Copper"],
  "floating-sphere": ["Neon Blue", "Neon Green", "Neon Pink", "Glass"],
  "geometric-cube": ["Glass", "Neon Blue", "Plastic", "Steel"],
  "wireframe-sphere": ["Neon Blue", "Neon Green", "Neon Pink", "Silver"],
  cube: ["Plastic", "Steel", "Glass", "Wood"],
  sphere: ["Plastic", "Steel", "Glass", "Stone"],
  torus: ["Plastic", "Steel", "Glass", "Ceramic"],
  cone: ["Plastic", "Steel", "Glass", "Stone"],
  plane: ["Plastic", "Steel", "Glass", "Wood"],
  "text-3d": ["Plastic", "Steel", "Glass", "Gold"],
  "directional-light": ["Neon Blue", "Neon Green", "Neon Pink", "Gold"],
  "perspective-camera": ["Carbon", "Plastic", "Steel", "Ceramic"],
  "grid-helper": ["Neon Blue", "Neon Green", "Silver", "Plastic"],
  "axes-helper": ["Neon Blue", "Neon Green", "Neon Pink", "Silver"],
  cylinder: ["Plastic", "Steel", "Glass", "Wood"],
  pyramid: ["Stone", "Glass", "Steel", "Gold"],
  capsule: ["Plastic", "Steel", "Glass", "Ceramic"],
  "hero-block": ["Glass", "Steel", "Neon Blue", "Carbon"],
  "showcase-card": ["Glass", "Steel", "Plastic", "Carbon"],
  "holographic-display": ["Glass", "Neon Blue", "Neon Green", "Holographic"],
  "energy-core": ["Energy", "Neon Orange", "Neon Yellow", "Gold"],
  "neon-sign": ["Neon Blue", "Neon Green", "Neon Pink", "Neon Red"],
  "floating-island": ["Stone", "Grass", "Wood", "Earth"],
  "portal-gate": ["Energy", "Neon Blue", "Neon Purple", "Holographic"],
  "crystal-cluster": ["Crystal", "Glass", "Neon Blue", "Diamond"],
  "steampunk-engine": ["Brass", "Copper", "Steel", "Iron"],
  "data-sphere": ["Holographic", "Neon Blue", "Glass", "Energy"],
  "magnetic-field": ["Energy", "Neon Blue", "Neon Green", "Field"],
  "quantum-cube": ["Quantum", "Neon Purple", "Glass", "Energy"],
  "time-machine": ["Brass", "Copper", "Energy", "Steel"],
  "neural-network": ["Neural", "Neon Blue", "Energy", "Holographic"],
  "crystal-prism": ["Crystal", "Glass", "Neon Blue", "Diamond"],
  "plasma-ball": ["Plasma", "Neon Orange", "Energy", "Glass"],
  "fractal-tree": ["Wood", "Nature", "Organic", "Earth"],
  "holographic-ui": ["Holographic", "Glass", "Neon Blue", "Energy"],
  "modern-card": ["Glass", "Steel", "Plastic", "Carbon"],
  "floating-button": ["Glass", "Neon Blue", "Steel", "Plastic"],
  "progress-bar": ["Plastic", "Neon Blue", "Steel", "Glass"],
  "notification-badge": ["Neon Red", "Neon Orange", "Glass", "Plastic"],
};

export function ControlPanel() {
  const {
    selectedComponent,
    customization,
    updateCustomization,
    resetCustomization,
  } = useComponentStore();
  const isMobile = useIsMobile();

  if (!selectedComponent) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-4">
          <Eye className="w-12 h-12 text-muted-foreground mx-auto" />
          <p className="text-muted-foreground">No component selected</p>
        </div>
      </div>
    );
  }

  const handleCopyCode = () => {
    const code = generateComponentCode(selectedComponent, customization);
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!", {
      description: "The generated code is ready to use in your project.",
    });
  };

  const handleExport = () => {
    const config = {
      component: selectedComponent,
      customization,
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedComponent.name
      .toLowerCase()
      .replace(/\s+/g, "-")}-config.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Configuration exported!", {
      description: "You can import this configuration later.",
    });
  };

  const applyMaterialPreset = (preset: (typeof materialPresets)[0]) => {
    updateCustomization({
      color: preset.color,
      metalness: preset.metalness,
      roughness: preset.roughness,
    });
    toast.success(`Applied ${preset.name} material!`, {
      description: `Color: ${preset.color}, Metalness: ${preset.metalness}, Roughness: ${preset.roughness}`,
    });
  };

  // Get recommended presets for current component
  const recommendedPresets =
    componentPresets[
      selectedComponent.componentType as keyof typeof componentPresets
    ] || [];
  const filteredPresets = materialPresets.filter((preset) =>
    recommendedPresets.includes(preset.name)
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Component Header */}
      <Card className="glass-morphism card-hover border-border/50">
        <CardHeader className="flex flex-row items-center justify-between pb-3 sm:pb-4 px-4 sm:px-6">
          <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <span>{selectedComponent.name}</span>
          </CardTitle>
          <div className="flex items-center gap-2">
            {isMobile && (
              <Badge variant="secondary" className="text-xs">
                <Smartphone className="h-3 w-3 mr-1" />
                Mobile
              </Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={resetCustomization}
              className="btn-glow text-xs"
            >
              <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-muted-foreground">Category:</span>
            <Badge variant="outline" className="capitalize text-xs">
              {selectedComponent.category}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-muted-foreground">Complexity:</span>
            <Badge variant="secondary" className="capitalize text-xs">
              {selectedComponent.complexity}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Material Presets */}
      <Card className="glass-morphism card-hover border-border/50">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
            <Palette className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <span>Material Presets</span>
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Recommended materials for {selectedComponent.name}
          </p>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {filteredPresets.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                onClick={() => applyMaterialPreset(preset)}
                className="justify-start h-auto p-2 sm:p-3 hover-glow text-xs"
              >
                <div
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded mr-2 border"
                  style={{ backgroundColor: preset.color }}
                />
                <span className="text-xs">{preset.name}</span>
              </Button>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <Label className="text-xs sm:text-sm font-medium">
              All Materials
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {materialPresets.map((preset) => (
                <Button
                  key={preset.name}
                  variant="ghost"
                  size="sm"
                  onClick={() => applyMaterialPreset(preset)}
                  className="justify-start h-auto p-2 hover-glow text-xs"
                >
                  <div
                    className="w-3 h-3 rounded mr-2 border"
                    style={{ backgroundColor: preset.color }}
                  />
                  <span className="text-xs">{preset.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transform Controls */}
      <Card className="glass-morphism card-hover border-border/50">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
            <Move className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <span>Transform</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-4 sm:px-6">
          {/* Scale */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs sm:text-sm">Scale</Label>
              <span className="text-xs text-muted-foreground">
                {customization.scale[0].toFixed(1)}x
              </span>
            </div>
            <Slider
              value={[customization.scale[0]]}
              onValueChange={([value]) =>
                updateCustomization({ scale: [value, value, value] })
              }
              min={0.1}
              max={3}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Small</span>
              <span>Large</span>
            </div>
          </div>

          <Separator />

          {/* Rotation */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs sm:text-sm">Rotation Speed</Label>
              <span className="text-xs text-muted-foreground">
                {customization.animationSpeed?.toFixed(1)}x
              </span>
            </div>
            <Slider
              value={[customization.animationSpeed || 1]}
              onValueChange={([value]) =>
                updateCustomization({ animationSpeed: value })
              }
              min={0}
              max={3}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Static</span>
              <span>Fast</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Material Properties */}
      <Card className="glass-morphism card-hover border-border/50">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
            <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <span>Material Properties</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
          {/* Color */}
          <div className="space-y-2">
            <Label className="text-xs sm:text-sm">Color</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="color"
                value={customization.color}
                onChange={(e) => updateCustomization({ color: e.target.value })}
                className="w-12 h-10 p-1 rounded border"
              />
              <Input
                value={customization.color}
                onChange={(e) => updateCustomization({ color: e.target.value })}
                className="flex-1 text-xs sm:text-sm"
                placeholder="#000000"
              />
            </div>
          </div>

          <Separator />

          {/* Metalness */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs sm:text-sm">Metalness</Label>
              <span className="text-xs text-muted-foreground">
                {customization.metalness.toFixed(2)}
              </span>
            </div>
            <Slider
              value={[customization.metalness]}
              onValueChange={([value]) =>
                updateCustomization({ metalness: value })
              }
              min={0}
              max={1}
              step={0.01}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Plastic</span>
              <span>Metal</span>
            </div>
          </div>

          {/* Roughness */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs sm:text-sm">Roughness</Label>
              <span className="text-xs text-muted-foreground">
                {customization.roughness.toFixed(2)}
              </span>
            </div>
            <Slider
              value={[customization.roughness]}
              onValueChange={([value]) =>
                updateCustomization({ roughness: value })
              }
              min={0}
              max={1}
              step={0.01}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Smooth</span>
              <span>Rough</span>
            </div>
          </div>

          {/* Emissive Intensity */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs sm:text-sm">Glow Intensity</Label>
              <span className="text-xs text-muted-foreground">
                {customization.emissiveIntensity?.toFixed(2) || "0.20"}
              </span>
            </div>
            <Slider
              value={[customization.emissiveIntensity || 0.2]}
              onValueChange={([value]) =>
                updateCustomization({ emissiveIntensity: value })
              }
              min={0}
              max={2}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>None</span>
              <span>Bright</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Controls */}
      <Card className="glass-morphism card-hover border-border/50">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
            <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <span>Export</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 px-4 sm:px-6">
          <Button
            onClick={handleCopyCode}
            className="w-full btn-glow text-xs sm:text-sm"
          >
            <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            Copy Code
          </Button>
          <Button
            variant="outline"
            onClick={handleExport}
            className="w-full text-xs sm:text-sm"
          >
            <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            Export Config
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
