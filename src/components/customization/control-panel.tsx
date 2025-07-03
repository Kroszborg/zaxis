"use client";

import { useComponentStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
} from "lucide-react";
import { generateComponentCode } from "@/lib/code-generator";
import { toast } from "sonner";

const materialPresets = [
  { name: "Steel", color: "#6B7280", metalness: 0.8, roughness: 0.2 },
  { name: "Aluminum", color: "#9CA3AF", metalness: 0.7, roughness: 0.3 },
  { name: "Brass", color: "#D97706", metalness: 0.9, roughness: 0.1 },
  { name: "Copper", color: "#DC2626", metalness: 0.9, roughness: 0.1 },
  { name: "Plastic", color: "#3B82F6", metalness: 0.0, roughness: 0.8 },
  { name: "Glass", color: "#E0E7FF", metalness: 0.0, roughness: 0.0 },
  { name: "Gold", color: "#F59E0B", metalness: 1.0, roughness: 0.0 },
  { name: "Silver", color: "#E5E7EB", metalness: 1.0, roughness: 0.0 },
];

export function ControlPanel() {
  const {
    selectedComponent,
    customization,
    updateCustomization,
    resetCustomization,
  } = useComponentStore();

  if (!selectedComponent) {
    return (
      <Card className="glass-morphism card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="h-5 w-5 text-primary" />
            <span>Select a Component</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted/30 rounded-full flex items-center justify-center">
              <Palette className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              Choose a component to start customizing.
            </p>
          </div>
        </CardContent>
      </Card>
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
    toast.success(`Applied ${preset.name} material!`);
  };

  return (
    <div className="space-y-6">
      {/* Component Header */}
      <Card className="glass-morphism card-hover">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>{selectedComponent.name}</span>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={resetCustomization}
            className="btn-glow"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Category:</span>
            <Badge variant="outline" className="capitalize">
              {selectedComponent.category}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Complexity:</span>
            <Badge variant="secondary" className="capitalize">
              {selectedComponent.complexity}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Material Presets */}
      <Card className="glass-morphism card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="h-5 w-5 text-primary" />
            <span>Material Presets</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {materialPresets.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                onClick={() => applyMaterialPreset(preset)}
                className="justify-start h-auto p-3 hover-glow"
              >
                <div
                  className="w-4 h-4 rounded mr-2 border"
                  style={{ backgroundColor: preset.color }}
                />
                <span className="text-xs">{preset.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transform Controls */}
      <Card className="glass-morphism card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Move className="h-5 w-5 text-primary" />
            <span>Transform</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Scale Controls */}
          <div className="space-y-3">
            <Label className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Scale</span>
            </Label>
            <div className="space-y-3">
              {(["X", "Y", "Z"] as const).map((axis, index) => (
                <div key={axis} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">{axis}</Label>
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {customization.scale[index].toFixed(1)}
                    </span>
                  </div>
                  <Slider
                    value={[customization.scale[index]]}
                    onValueChange={([value]) => {
                      const newScale = [...customization.scale] as [
                        number,
                        number,
                        number
                      ];
                      newScale[index] = value;
                      updateCustomization({ scale: newScale });
                    }}
                    min={0.1}
                    max={3}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Rotation Controls */}
          <div className="space-y-3">
            <Label className="flex items-center space-x-2">
              <RotateIcon className="h-4 w-4" />
              <span>Rotation</span>
            </Label>
            <div className="space-y-3">
              {(["X", "Y", "Z"] as const).map((axis, index) => (
                <div key={axis} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">{axis}</Label>
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {(
                        (customization.rotation[index] * 180) /
                        Math.PI
                      ).toFixed(0)}
                      °
                    </span>
                  </div>
                  <Slider
                    value={[customization.rotation[index]]}
                    onValueChange={([value]) => {
                      const newRotation = [...customization.rotation] as [
                        number,
                        number,
                        number
                      ];
                      newRotation[index] = value;
                      updateCustomization({ rotation: newRotation });
                    }}
                    min={-Math.PI}
                    max={Math.PI}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Material Controls */}
      <Card className="glass-morphism card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5 text-primary" />
            <span>Material Properties</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Color */}
          <div className="space-y-2">
            <Label className="text-sm">Color</Label>
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
                className="flex-1"
                placeholder="#000000"
              />
            </div>
          </div>

          <Separator />

          {/* Metalness */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Metalness</Label>
              <span className="text-sm text-muted-foreground">
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
              <Label className="text-sm">Roughness</Label>
              <span className="text-sm text-muted-foreground">
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
        </CardContent>
      </Card>

      {/* Export Controls */}
      <Card className="glass-morphism card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-primary" />
            <span>Export</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button onClick={handleCopyCode} className="w-full btn-glow">
            <Copy className="h-4 w-4 mr-2" />
            Copy Code
          </Button>
          <Button variant="outline" onClick={handleExport} className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Export Config
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
