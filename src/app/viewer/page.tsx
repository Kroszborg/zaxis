"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, Suspense, useState, useMemo, useCallback } from "react";
import { Navbar } from "@/components/layout/navbar";
import { ModelViewer } from "@/components/3d/model-viewer";
import { ControlPanel } from "@/components/customization/control-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useComponentStore } from "@/lib/store";
import { sampleComponents } from "@/lib/components-data";
import {
  ArrowLeft,
  ExternalLink,
  Download,
  Copy,
  Share2,
  Eye,
  Code,
  Sparkles,
  RotateCw,
} from "lucide-react";
import Link from "next/link";
import { generateComponentCode } from "@/lib/code-generator";
import { toast } from "sonner";

/**
 * ViewerContent Component
 *
 * Main content component for the 3D component viewer page.
 * Handles component selection, customization, and various viewer modes.
 *
 * Features:
 * - Component selection from URL parameters
 * - 3D model viewing with customization
 * - Code generation and export
 * - Component information display
 *
 * Performance optimizations:
 * - Memoized expensive operations
 * - Optimized useEffect dependencies
 * - Callback memoization for event handlers
 */
function ViewerContent() {
  const searchParams = useSearchParams();
  const componentId = searchParams.get("id");
  const { selectedComponent, customization, setSelectedComponent } =
    useComponentStore();
  const [activeTab, setActiveTab] = useState("viewer");

  // Memoize component lookup to prevent unnecessary recalculations
  const targetComponent = useMemo(() => {
    if (componentId) {
      return sampleComponents.find((c) => c.id === componentId);
    }
    return null;
  }, [componentId]);

  // Optimized useEffect to prevent unnecessary rerenders
  useEffect(() => {
    if (
      targetComponent &&
      (!selectedComponent || selectedComponent.id !== targetComponent.id)
    ) {
      setSelectedComponent(targetComponent);
    } else if (!targetComponent && !selectedComponent) {
      // Default to first component if none selected
      setSelectedComponent(sampleComponents[0]);
    }
  }, [targetComponent, selectedComponent?.id, setSelectedComponent]);

  // Memoize generated code to prevent recalculation on every render
  const generatedCode = useMemo(() => {
    if (!selectedComponent) return "";
    return generateComponentCode(selectedComponent, customization);
  }, [selectedComponent, customization]);

  // Memoized event handlers to prevent unnecessary rerenders
  const handleCopyCode = useCallback(() => {
    if (!generatedCode) return;

    navigator.clipboard.writeText(generatedCode);
    toast.success("Code copied to clipboard!", {
      description: "The generated code is ready to use in your project.",
    });
  }, [generatedCode]);

  const handleShare = useCallback(async () => {
    if (!selectedComponent) return;

    const url = `${window.location.origin}/viewer?id=${selectedComponent.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedComponent.name,
          text: selectedComponent.description,
          url,
        });
      } catch (error) {
        // User cancelled sharing - no need to handle
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!", {
        description: "Share this link with others to view the component.",
      });
    }
  }, [selectedComponent]);

  const handleDownload = useCallback(() => {
    if (!selectedComponent) return;

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

    toast.success("Configuration downloaded!", {
      description: "You can import this configuration later.",
    });
  }, [selectedComponent, customization]);

  // Loading state while component is being set
  if (!selectedComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-muted/20 rounded-full flex items-center justify-center">
            <Eye className="w-12 h-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold gradient-text">
              Component Not Found
            </h1>
            <p className="text-muted-foreground max-w-md">
              The component you're looking for doesn't exist or has been
              removed.
            </p>
          </div>
          <Link href="/browse">
            <Button size="lg" className="btn-glow">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Browse
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/browse">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">{selectedComponent.name}</h1>
              <p className="text-muted-foreground">
                {selectedComponent.description}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {selectedComponent.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="viewer">Viewer</TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
          </TabsList>

          <TabsContent value="viewer" className="space-y-6">
            <div className="grid lg:grid-cols-1 gap-8">
              {/* 3D Viewer */}
              <div>
                <Card className="card-hover overflow-hidden bg-card/50 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle className="flex items-center space-x-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <span>3D Preview</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-96 lg:h-[600px]">
                      <ModelViewer
                        componentType={selectedComponent.componentType}
                      />
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-background/80 backdrop-blur-sm border-border/50"
                          onClick={() => window.location.reload()}
                        >
                          <RotateCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="customize" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <Card className="card-hover bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div className="h-96 lg:h-[500px]">
                      <ModelViewer
                        componentType={selectedComponent.componentType}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <ControlPanel />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="code" className="space-y-6">
            <Card className="card-hover bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5 text-primary" />
                  <span>Generated Code</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={handleCopyCode}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      window.open(
                        "https://docs.pmnd.rs/react-three-fiber",
                        "_blank"
                      )
                    }
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Docs
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-gradient-to-br from-muted/50 to-muted/30 p-6 rounded-lg overflow-x-auto text-sm font-mono border border-border/50">
                    <code className="text-foreground">{generatedCode}</code>
                  </pre>
                  <div className="absolute top-2 right-2">
                    <Badge
                      variant="secondary"
                      className="text-xs bg-primary/10 border-primary/20"
                    >
                      React Three Fiber
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="info" className="space-y-6">
            <div className="grid lg:grid-cols-1 gap-8">
              <Card className="card-hover bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Component Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Category:
                      </span>
                      <div className="font-medium capitalize">
                        {selectedComponent.category}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Complexity:
                      </span>
                      <div className="font-medium capitalize">
                        {selectedComponent.complexity}
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Materials:
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedComponent.materials.map((material) => (
                        <Badge
                          key={material}
                          variant="secondary"
                          className="text-xs"
                        >
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Features:
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedComponent.features.map((feature) => (
                        <Badge
                          key={feature}
                          variant="outline"
                          className="text-xs"
                        >
                          {feature.replace("-", " ")}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-hover bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Usage Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Installation</h4>
                    <pre className="bg-gradient-to-br from-muted/50 to-muted/30 p-3 rounded text-sm font-mono border border-border/50">
                      npm install @react-three/fiber @react-three/drei three
                    </pre>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Dependencies</h4>
                    <div className="space-y-1 text-sm">
                      <div>• React Three Fiber</div>
                      <div>• Three.js</div>
                      <div>• GSAP (for animations)</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Browser Support</h4>
                    <div className="space-y-1 text-sm">
                      <div>• Chrome 90+</div>
                      <div>• Firefox 88+</div>
                      <div>• Safari 14+</div>
                      <div>• Edge 90+</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

/**
 * ViewerPage Component
 *
 * Main page component for the 3D component viewer.
 * Wraps ViewerContent in a Suspense boundary for better loading experience.
 *
 * Features:
 * - Suspense boundary for smooth loading
 * - Error handling for component loading
 * - Performance optimized rendering
 */
export default function ViewerPage() {
  return (
    <div className="min-h-screen">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <h2 className="text-xl font-semibold">Loading Component...</h2>
              <p className="text-muted-foreground">Preparing the 3D viewer</p>
            </div>
          </div>
        }
      >
        <ViewerContent />
      </Suspense>
    </div>
  );
}
