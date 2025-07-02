'use client';

import { useComponentStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RotateCcw, Copy, Download } from 'lucide-react';
import { generateComponentCode } from '@/lib/code-generator';
import { toast } from 'sonner';

export function ControlPanel() {
  const { selectedComponent, customization, updateCustomization, resetCustomization } = useComponentStore();

  if (!selectedComponent) {
    return (
      <Card className="glass-morphism">
        <CardHeader>
          <CardTitle>Select a Component</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Choose a component to start customizing.</p>
        </CardContent>
      </Card>
    );
  }

  const handleCopyCode = () => {
    const code = generateComponentCode(selectedComponent, customization);
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard!');
  };

  const handleExport = () => {
    const config = {
      component: selectedComponent,
      customization,
      timestamp: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedComponent.name.toLowerCase().replace(/\s+/g, '-')}-config.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Configuration exported!');
  };

  return (
    <div className="space-y-6">
      <Card className="glass-morphism">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {selectedComponent.name}
            <Button
              variant="outline"
              size="sm"
              onClick={resetCustomization}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Scale Controls */}
          <div className="space-y-3">
            <Label>Scale</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label className="w-8">X</Label>
                <Slider
                  value={[customization.scale[0]]}
                  onValueChange={([value]) => 
                    updateCustomization({ scale: [value, customization.scale[1], customization.scale[2]] })
                  }
                  min={0.1}
                  max={3}
                  step={0.1}
                  className="flex-1"
                />
                <span className="w-12 text-sm text-muted-foreground">
                  {customization.scale[0].toFixed(1)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Label className="w-8">Y</Label>
                <Slider
                  value={[customization.scale[1]]}
                  onValueChange={([value]) => 
                    updateCustomization({ scale: [customization.scale[0], value, customization.scale[2]] })
                  }
                  min={0.1}
                  max={3}
                  step={0.1}
                  className="flex-1"
                />
                <span className="w-12 text-sm text-muted-foreground">
                  {customization.scale[1].toFixed(1)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Label className="w-8">Z</Label>
                <Slider
                  value={[customization.scale[2]]}
                  onValueChange={([value]) => 
                    updateCustomization({ scale: [customization.scale[0], customization.scale[1], value] })
                  }
                  min={0.1}
                  max={3}
                  step={0.1}
                  className="flex-1"
                />
                <span className="w-12 text-sm text-muted-foreground">
                  {customization.scale[2].toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Rotation Controls */}
          <div className="space-y-3">
            <Label>Rotation</Label>
            <div className="space-y-2">
              {(['X', 'Y', 'Z'] as const).map((axis, index) => (
                <div key={axis} className="flex items-center space-x-2">
                  <Label className="w-8">{axis}</Label>
                  <Slider
                    value={[customization.rotation[index]]}
                    onValueChange={([value]) => {
                      const newRotation = [...customization.rotation] as [number, number, number];
                      newRotation[index] = value;
                      updateCustomization({ rotation: newRotation });
                    }}
                    min={-Math.PI}
                    max={Math.PI}
                    step={0.1}
                    className="flex-1"
                  />
                  <span className="w-12 text-sm text-muted-foreground">
                    {(customization.rotation[index] * 180 / Math.PI).toFixed(0)}°
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Material Controls */}
          <div className="space-y-3">
            <Label>Material</Label>
            <div className="space-y-3">
              <div>
                <Label className="text-sm">Color</Label>
                <Input
                  type="color"
                  value={customization.color}
                  onChange={(e) => updateCustomization({ color: e.target.value })}
                  className="w-full h-10"
                />
              </div>
              <div>
                <Label className="text-sm">Metalness</Label>
                <Slider
                  value={[customization.metalness]}
                  onValueChange={([value]) => updateCustomization({ metalness: value })}
                  min={0}
                  max={1}
                  step={0.01}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-sm">Roughness</Label>
                <Slider
                  value={[customization.roughness]}
                  onValueChange={([value]) => updateCustomization({ roughness: value })}
                  min={0}
                  max={1}
                  step={0.01}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Controls */}
      <Card className="glass-morphism">
        <CardHeader>
          <CardTitle>Export</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button onClick={handleCopyCode} className="w-full">
            <Copy className="h-4 w-4 mr-2" />
            Copy JSX Code
          </Button>
          <Button onClick={handleExport} variant="outline" className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Export Config
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}