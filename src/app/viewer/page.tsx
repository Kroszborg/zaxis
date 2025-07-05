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
import { useIsMobile } from "@/hooks/use-mobile";
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
  Smartphone,
  Monitor,
  Palette,
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
 * - Responsive design for mobile and desktop
 * - Color preset integration
 *
 * Performance optimizations:
 * - Memoized expensive operations
 * - Optimized useEffect dependencies
 * - Callback memoization for event handlers
 * - Responsive layout optimization
 */
function ViewerContent() {
  const searchParams = useSearchParams();
  const componentId = searchParams.get("id");
  const { selectedComponent, customization, setSelectedComponent } =
    useComponentStore();
  const [activeTab, setActiveTab] = useState("viewer");
  const isMobile = useIsMobile();

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
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-24 h-24 mx-auto bg-muted/20 rounded-full flex items-center justify-center">
            <Eye className="w-12 h-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold gradient-text">
              Component Not Found
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              The component you're looking for doesn't exist or has been
              removed.
            </p>
          </div>
          <Link href="/browse">
            <Button size="lg" className="btn-glow w-full sm:w-auto">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Browse
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <Link href="/browse">
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="text-center sm:text-left">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">
                {selectedComponent.name}
              </h1>
              <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mt-1">
                {selectedComponent.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 justify-center sm:justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex-1 sm:flex-none"
            >
              <Share2 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="flex-1 sm:flex-none"
            >
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8 justify-center sm:justify-start">
          {selectedComponent.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
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
          className="space-y-4 sm:space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto sm:h-10">
            <TabsTrigger
              value="viewer"
              className="text-xs sm:text-sm py-2 sm:py-1"
            >
              <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden sm:inline">Viewer</span>
            </TabsTrigger>
            <TabsTrigger
              value="customize"
              className="text-xs sm:text-sm py-2 sm:py-1"
            >
              <Palette className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden sm:inline">Customize</span>
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="text-xs sm:text-sm py-2 sm:py-1"
            >
              <Code className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden sm:inline">Code</span>
            </TabsTrigger>
            <TabsTrigger
              value="info"
              className="text-xs sm:text-sm py-2 sm:py-1"
            >
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden sm:inline">Info</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="viewer" className="space-y-4 sm:space-y-6">
            <div className="grid lg:grid-cols-1 gap-4 sm:gap-8">
              {/* 3D Viewer */}
              <div>
                <Card className="card-hover overflow-hidden bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 sm:pb-4 px-4 sm:px-6">
                    <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
                      <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      <span>3D Preview</span>
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      {isMobile && (
                        <Badge variant="secondary" className="text-xs">
                          <Smartphone className="h-3 w-3 mr-1" />
                          Mobile
                        </Badge>
                      )}
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-background/80 backdrop-blur-sm border-border/50"
                        onClick={() => window.location.reload()}
                      >
                        <RotateCw className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div
                      className={`${
                        isMobile ? "h-64 sm:h-80" : "h-80 sm:h-96 lg:h-[600px]"
                      } relative`}
                    >
                      <ModelViewer
                        componentType={selectedComponent.componentType}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="customize" className="space-y-4 sm:space-y-6">
            <div
              className={`grid gap-4 sm:gap-8 ${
                isMobile ? "grid-cols-1" : "lg:grid-cols-2"
              }`}
            >
              <div>
                <Card className="card-hover bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader className="pb-2 sm:pb-4 px-4 sm:px-6">
                    <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
                      <Monitor className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      <span>Live Preview</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div
                      className={`${
                        isMobile ? "h-48 sm:h-64" : "h-80 sm:h-96 lg:h-[500px]"
                      }`}
                    >
                      <ModelViewer
                        componentType={selectedComponent.componentType}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className={`${isMobile ? "order-first" : ""}`}>
                <ControlPanel />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="code" className="space-y-4 sm:space-y-6">
            <Card className="card-hover bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 sm:px-6">
                <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
                  <Code className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <span>Generated Code</span>
                </CardTitle>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyCode}
                    className="flex-1 sm:flex-none"
                  >
                    <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
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
                    className="flex-1 sm:flex-none"
                  >
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    <span className="hidden sm:inline">Docs</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="relative">
                  <pre className="bg-gradient-to-br from-muted/50 to-muted/30 p-3 sm:p-4 lg:p-6 rounded-lg overflow-x-auto text-xs sm:text-sm font-mono border border-border/50 max-h-96 overflow-y-auto">
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

          <TabsContent value="info" className="space-y-4 sm:space-y-6">
            <div className="grid lg:grid-cols-1 gap-4 sm:gap-8">
              <Card className="card-hover bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="text-sm sm:text-base">
                    Component Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        Category:
                      </span>
                      <div className="font-medium capitalize text-sm sm:text-base">
                        {selectedComponent.category}
                      </div>
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        Complexity:
                      </span>
                      <div className="font-medium capitalize text-sm sm:text-base">
                        {selectedComponent.complexity}
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <span className="text-xs sm:text-sm text-muted-foreground">
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
                    <span className="text-xs sm:text-sm text-muted-foreground">
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
              <Card className="card-hover bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="text-sm sm:text-base">
                    Usage Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-4 sm:px-6">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm sm:text-base">
                      Installation
                    </h4>
                    <pre className="bg-gradient-to-br from-muted/50 to-muted/30 p-2 sm:p-3 rounded text-xs sm:text-sm font-mono border border-border/50 overflow-x-auto">
                      npm install @react-three/fiber @react-three/drei three
                    </pre>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm sm:text-base">
                      Dependencies
                    </h4>
                    <div className="space-y-1 text-xs sm:text-sm">
                      <div>• React Three Fiber</div>
                      <div>• Three.js</div>
                      <div>• GSAP (for animations)</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm sm:text-base">
                      Browser Support
                    </h4>
                    <div className="space-y-1 text-xs sm:text-sm">
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
 * - Responsive design support
 */
export default function ViewerPage() {
  return (
    <div className="min-h-screen">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center space-y-4 max-w-md">
              <div className="w-16 h-16 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <h2 className="text-lg sm:text-xl font-semibold">
                Loading Component...
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Preparing the 3D viewer
              </p>
            </div>
          </div>
        }
      >
        <ViewerContent />
      </Suspense>
    </div>
  );
}
