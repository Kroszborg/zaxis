"use client";

import { useState } from "react";
import { useHeroStore } from "@/lib/hero-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  RotateCcw,
  Copy,
  Download,
  Settings,
  Palette,
  Lightbulb,
  Sparkles,
  Code,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { generateHeroCode } from "@/lib/hero-code-generator";

export function HeroControlPanel() {
  const { customization, updateCustomization, resetCustomization } =
    useHeroStore();
  const [codeFormat, setCodeFormat] = useState<"jsx" | "tsx">("tsx");

  const handleCopyCode = () => {
    const code = generateHeroCode(customization, codeFormat);
    navigator.clipboard.writeText(code);
    toast.success(`${codeFormat.toUpperCase()} code copied to clipboard!`);
  };

  const handleExportConfig = () => {
    const config = {
      heroCustomization: customization,
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    };

    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hero-scene-config-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Configuration exported!");
  };

  return (
    <div className="w-full h-full">
      <Tabs defaultValue="object" className="w-full mb-4 h-full">
        <TabsList className="grid w-full grid-cols-4 rounded-2xl bg-muted/40 p-1 mb-4 sticky top-0 z-20">
          <TabsTrigger value="object">Object</TabsTrigger>
          <TabsTrigger value="lights">Lights</TabsTrigger>
          <TabsTrigger value="effects">Effects</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>
        <Card className="glass-morphism w-full max-w-3xl mx-auto p-0 h-[600px] xl:h-[700px] 2xl:h-[800px] flex flex-col">
          <CardHeader className="pb-2 px-8 pt-8 flex flex-row items-center justify-between sticky top-0 z-10 bg-card/90 dark:bg-card/80 backdrop-blur-md rounded-t-3xl">
            <div className="flex items-center space-x-2 text-xl font-semibold">
              <Settings className="h-6 w-6 text-primary" />
              <span>Live 3D Controls</span>
            </div>
            <Button variant="outline" size="sm" onClick={resetCustomization}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset All
            </Button>
          </CardHeader>
          <div className="px-8 pb-8 flex-1 min-h-0 flex flex-col">
            <p className="text-muted-foreground mb-6">
              Customize the 3D scene in real-time and export the code instantly
            </p>
            <CardContent className="space-y-8 p-0 flex-1 min-h-0 overflow-y-auto">
              <TabsContent value="object" className="space-y-8">
                {/* Main Object Controls */}
                <div className="space-y-4">
                  <Label className="flex items-center space-x-2 text-lg font-semibold">
                    <Palette className="h-5 w-5" />
                    <span>Main Object</span>
                  </Label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Color</Label>
                        <Input
                          type="color"
                          value={customization.mainObjectColor}
                          onChange={(e) =>
                            updateCustomization({
                              mainObjectColor: e.target.value,
                            })
                          }
                          className="w-full h-12 mt-2"
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Scale</Label>
                        <Slider
                          value={[customization.mainObjectScale]}
                          onValueChange={([value]) =>
                            updateCustomization({ mainObjectScale: value })
                          }
                          min={0.5}
                          max={2}
                          step={0.1}
                          className="mt-2"
                        />
                        <span className="text-sm text-muted-foreground">
                          {customization.mainObjectScale.toFixed(1)}
                        </span>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Metalness</Label>
                        <Slider
                          value={[customization.mainObjectMetalness]}
                          onValueChange={([value]) =>
                            updateCustomization({ mainObjectMetalness: value })
                          }
                          min={0}
                          max={1}
                          step={0.1}
                          className="mt-2"
                        />
                        <span className="text-sm text-muted-foreground">
                          {customization.mainObjectMetalness.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Roughness</Label>
                        <Slider
                          value={[customization.mainObjectRoughness]}
                          onValueChange={([value]) =>
                            updateCustomization({ mainObjectRoughness: value })
                          }
                          min={0}
                          max={1}
                          step={0.1}
                          className="mt-2"
                        />
                        <span className="text-sm text-muted-foreground">
                          {customization.mainObjectRoughness.toFixed(1)}
                        </span>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">
                          Distortion
                        </Label>
                        <Slider
                          value={[customization.mainObjectDistort]}
                          onValueChange={([value]) =>
                            updateCustomization({ mainObjectDistort: value })
                          }
                          min={0}
                          max={1}
                          step={0.1}
                          className="mt-2"
                        />
                        <span className="text-sm text-muted-foreground">
                          {customization.mainObjectDistort.toFixed(1)}
                        </span>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">
                          Animation Speed
                        </Label>
                        <Slider
                          value={[customization.mainObjectSpeed]}
                          onValueChange={([value]) =>
                            updateCustomization({ mainObjectSpeed: value })
                          }
                          min={0.5}
                          max={5}
                          step={0.1}
                          className="mt-2"
                        />
                        <span className="text-sm text-muted-foreground">
                          {customization.mainObjectSpeed.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sphere Controls */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">
                    Orbiting Spheres
                  </Label>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((num) => (
                      <div
                        key={num}
                        className="space-y-3 p-4 bg-muted/20 rounded-lg"
                      >
                        <Label className="text-sm font-medium">
                          Sphere {num}
                        </Label>
                        <div className="space-y-3">
                          <div>
                            <Label className="text-xs text-muted-foreground">
                              Color
                            </Label>
                            <Input
                              type="color"
                              value={
                                customization[
                                  `sphere${num}Color` as keyof typeof customization
                                ] as string
                              }
                              onChange={(e) =>
                                updateCustomization({
                                  [`sphere${num}Color`]: e.target.value,
                                })
                              }
                              className="w-full h-8"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">
                              Scale
                            </Label>
                            <Slider
                              value={[
                                customization[
                                  `sphere${num}Scale` as keyof typeof customization
                                ] as number,
                              ]}
                              onValueChange={([value]) =>
                                updateCustomization({
                                  [`sphere${num}Scale`]: value,
                                })
                              }
                              min={0.1}
                              max={0.5}
                              step={0.05}
                              className="mt-1"
                            />
                            <span className="text-xs text-muted-foreground">
                              {(
                                customization[
                                  `sphere${num}Scale` as keyof typeof customization
                                ] as number
                              ).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="lights" className="space-y-8">
                <div className="space-y-4">
                  <Label className="flex items-center space-x-2 text-lg font-semibold">
                    <Lightbulb className="h-5 w-5" />
                    <span>Lighting Setup</span>
                  </Label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">
                          Ambient Intensity
                        </Label>
                        <Slider
                          value={[customization.ambientIntensity]}
                          onValueChange={([value]) =>
                            updateCustomization({ ambientIntensity: value })
                          }
                          min={0}
                          max={1}
                          step={0.1}
                          className="mt-2"
                        />
                        <span className="text-sm text-muted-foreground">
                          {customization.ambientIntensity.toFixed(1)}
                        </span>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">
                          Directional Intensity
                        </Label>
                        <Slider
                          value={[customization.directionalIntensity]}
                          onValueChange={([value]) =>
                            updateCustomization({ directionalIntensity: value })
                          }
                          min={0}
                          max={3}
                          step={0.1}
                          className="mt-2"
                        />
                        <span className="text-sm text-muted-foreground">
                          {customization.directionalIntensity.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">
                          Point Light 1
                        </Label>
                        <div className="flex space-x-2 mt-2">
                          <Input
                            type="color"
                            value={customization.pointLight1Color}
                            onChange={(e) =>
                              updateCustomization({
                                pointLight1Color: e.target.value,
                              })
                            }
                            className="w-16 h-10"
                          />
                          <div className="flex-1">
                            <Slider
                              value={[customization.pointLight1Intensity]}
                              onValueChange={([value]) =>
                                updateCustomization({
                                  pointLight1Intensity: value,
                                })
                              }
                              min={0}
                              max={2}
                              step={0.1}
                            />
                            <span className="text-xs text-muted-foreground">
                              {customization.pointLight1Intensity.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">
                          Point Light 2
                        </Label>
                        <div className="flex space-x-2 mt-2">
                          <Input
                            type="color"
                            value={customization.pointLight2Color}
                            onChange={(e) =>
                              updateCustomization({
                                pointLight2Color: e.target.value,
                              })
                            }
                            className="w-16 h-10"
                          />
                          <div className="flex-1">
                            <Slider
                              value={[customization.pointLight2Intensity]}
                              onValueChange={([value]) =>
                                updateCustomization({
                                  pointLight2Intensity: value,
                                })
                              }
                              min={0}
                              max={2}
                              step={0.1}
                            />
                            <span className="text-xs text-muted-foreground">
                              {customization.pointLight2Intensity.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="effects" className="space-y-8">
                <div className="space-y-4">
                  <Label className="flex items-center space-x-2 text-lg font-semibold">
                    <Sparkles className="h-5 w-5" />
                    <span>Effects & Animation</span>
                  </Label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">
                          Float Speed
                        </Label>
                        <Slider
                          value={[customization.floatSpeed]}
                          onValueChange={([value]) =>
                            updateCustomization({ floatSpeed: value })
                          }
                          min={0.5}
                          max={3}
                          step={0.1}
                          className="mt-2"
                        />
                        <span className="text-sm text-muted-foreground">
                          {customization.floatSpeed.toFixed(1)}
                        </span>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">
                          Rotation Speed
                        </Label>
                        <Slider
                          value={[customization.rotationSpeed * 1000]}
                          onValueChange={([value]) =>
                            updateCustomization({ rotationSpeed: value / 1000 })
                          }
                          min={1}
                          max={20}
                          step={1}
                          className="mt-2"
                        />
                        <span className="text-sm text-muted-foreground">
                          {(customization.rotationSpeed * 1000).toFixed(0)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">
                          Particle Count
                        </Label>
                        <Slider
                          value={[customization.particleCount]}
                          onValueChange={([value]) =>
                            updateCustomization({
                              particleCount: Math.round(value),
                            })
                          }
                          min={50}
                          max={200}
                          step={10}
                          className="mt-2"
                        />
                        <span className="text-sm text-muted-foreground">
                          {customization.particleCount}
                        </span>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">
                          Particle Size
                        </Label>
                        <Slider
                          value={[customization.particleSize]}
                          onValueChange={([value]) =>
                            updateCustomization({ particleSize: value })
                          }
                          min={0.01}
                          max={0.1}
                          step={0.01}
                          className="mt-2"
                        />
                        <span className="text-sm text-muted-foreground">
                          {customization.particleSize.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">
                        Particle Color
                      </Label>
                      <Input
                        type="color"
                        value={customization.particleColor}
                        onChange={(e) =>
                          updateCustomization({ particleColor: e.target.value })
                        }
                        className="w-full h-10 mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Particle Opacity
                      </Label>
                      <Slider
                        value={[customization.particleOpacity]}
                        onValueChange={([value]) =>
                          updateCustomization({ particleOpacity: value })
                        }
                        min={0.1}
                        max={1}
                        step={0.1}
                        className="mt-2"
                      />
                      <span className="text-sm text-muted-foreground">
                        {customization.particleOpacity.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="export" className="space-y-8">
                <div className="space-y-6">
                  <Label className="flex items-center space-x-2 text-lg font-semibold">
                    <Code className="h-5 w-5" />
                    <span>Export Code & Configuration</span>
                  </Label>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-3 block">
                        Code Format
                      </Label>
                      <div className="flex space-x-2">
                        <Button
                          variant={codeFormat === "jsx" ? "default" : "outline"}
                          onClick={() => setCodeFormat("jsx")}
                          className="flex-1"
                        >
                          JSX
                        </Button>
                        <Button
                          variant={codeFormat === "tsx" ? "default" : "outline"}
                          onClick={() => setCodeFormat("tsx")}
                          className="flex-1"
                        >
                          TSX
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        onClick={handleCopyCode}
                        size="lg"
                        className="w-full"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy {codeFormat.toUpperCase()} Code
                      </Button>

                      <Button
                        onClick={handleExportConfig}
                        variant="outline"
                        size="lg"
                        className="w-full"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export Config JSON
                      </Button>
                    </div>

                    <div className="bg-muted/20 p-4 rounded-lg space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Framework:
                        </span>
                        <Badge variant="secondary">React Three Fiber</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Dependencies:
                        </span>
                        <Badge variant="secondary">@react-three/drei</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Animation:
                        </span>
                        <Badge variant="secondary">Three.js</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </div>
        </Card>
      </Tabs>
    </div>
  );
}
