"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeroScene } from "@/components/3d/hero-scene";
import { LogoWrapper, Hero3DBackground } from "@/components/3d/logo";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WebGLFluidBackground } from "@/components/webgl-fluid-background";
import {
  ArrowRight,
  Box,
  Palette,
  Code,
  Sparkles,
  Zap,
  Download,
  Star,
  Play,
  CheckCircle,
  Layers,
  Cpu,
  Building2,
  Shapes,
} from "lucide-react";
import { componentCategories, sampleComponents } from "@/lib/components-data";
import { HeroControlPanel } from "@/components/customization/hero-control-panel";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const categoryIcons = {
  mechanical: Zap,
  decorative: Sparkles,
  structural: Building2,
  electronic: Cpu,
  geometric: Shapes,
};

export default function HomePage() {
  const { resolvedTheme, theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleUserInteraction = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({ x, y });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Enhanced background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <main className="relative min-h-screen flex flex-col">
        {/* HERO SECTION WITH WEBGL FLUID BACKGROUND */}
        <motion.section
          ref={containerRef}
          onMouseMove={handleUserInteraction}
          className="relative flex flex-col items-center justify-center min-h-screen w-full px-4 overflow-hidden border-b border-primary/10 shadow-[0_8px_32px_0_rgba(23,65,224,0.06)] dark:shadow-[0_8px_32px_0_rgba(23,65,224,0.18)]"
        >
          {/* WebGL Fluid Background */}
          <div className="absolute inset-0 z-0">
            <WebGLFluidBackground />
          </div>

          {/* Interactive mouse gradient overlay */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <motion.div
              animate={{
                background: `radial-gradient(circle at ${
                  mousePosition.x * 100
                }% ${
                  mousePosition.y * 100
                }%, rgba(23,65,224,0.15), transparent 50%),
                            radial-gradient(circle at ${
                              100 - mousePosition.x * 100
                            }% ${
                  100 - mousePosition.y * 100
                }%, rgba(59,130,246,0.1), transparent 30%)`,
              }}
              transition={{ type: "tween", duration: 0.2 }}
              className="w-full h-full"
            />
          </div>

          {/* Blurred, colored blobs for visual interest */}
          <div className="pointer-events-none select-none absolute inset-0 z-10">
            <div className="absolute top-[-80px] left-[-120px] w-[340px] h-[340px] bg-primary/20 dark:bg-blue-700/30 rounded-full blur-3xl opacity-60 animate-pulse" />
            <div className="absolute bottom-[-100px] right-[-100px] w-[320px] h-[320px] bg-blue-400/20 dark:bg-blue-900/30 rounded-full blur-3xl opacity-50 animate-pulse delay-1000" />
            <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-400/15 dark:bg-purple-800/25 rounded-full blur-2xl opacity-40 animate-pulse delay-500" />
            <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-primary/8 via-blue-300/8 to-blue-500/8 dark:from-primary/15 dark:via-blue-900/8 dark:to-blue-500/15 rounded-full blur-3xl opacity-50" />
            <div className="absolute top-0 left-1/2 w-40 h-40 -translate-x-1/2 bg-pink-400/15 dark:bg-pink-700/25 rounded-full blur-2xl opacity-30 animate-pulse delay-700" />
          </div>

          {/* SVG noise overlay */}
          <div className="pointer-events-none absolute inset-0 z-15 mix-blend-soft-light opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <filter id="noiseFilter">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.8"
                  numOctaves="4"
                  stitchTiles="stitch"
                />
              </filter>
              <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
          </div>

          {/* Main content */}
          <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-3xl mx-auto py-8 md:py-10 min-h-[40vh]">
            {/* Hero text and buttons */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight text-center bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x"
              style={{
                textShadow:
                  "0 6px 48px rgba(23,65,224,0.22), 0 2px 12px rgba(0,0,0,0.18)",
                filter: "drop-shadow(0 2px 12px rgba(23,65,224,0.13))",
                letterSpacing: "-0.02em",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Build with <span className="text-primary">3D</span>
            </motion.h1>
            <motion.p
              className="text-2xl lg:text-3xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed text-center"
              style={{
                textShadow: "0 2px 8px rgba(23,65,224,0.10)",
                filter: "drop-shadow(0 1px 4px rgba(23,65,224,0.08))",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Minimal, production-ready 3D components for your next project.
              <br />
              Visualize, customize, and export Three.js code instantly.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-5 justify-center w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Link href="/browse" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="btn-glow text-xl px-10 py-6 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg shadow-primary/25 w-full sm:w-auto"
                >
                  <Play className="mr-3 h-7 w-7" />
                  Browse Components
                  <ArrowRight className="ml-3 h-7 w-7" />
                </Button>
              </Link>
              <Link href="/viewer" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-xl px-10 py-6 border-2 hover:bg-muted/50 hover:border-primary/50 transition-all duration-300 w-full sm:w-auto"
                >
                  <Box className="mr-3 h-7 w-7" />
                  Live Demo
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* INTERACTIVE EXPERIENCE SECTION */}
        <section className="px-2 sm:px-6 py-24 md:py-32 bg-gradient-to-br from-muted/30 to-muted/10 dark:from-muted/20 dark:to-muted/5">
          <div className="max-w-[1600px] mx-auto">
            <div className="text-center mb-14 md:mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 gradient-text">
                Interactive Experience
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See our 3D components in action with real-time customization
                controls
              </p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 md:gap-16 items-stretch">
              {/* Left: 3D Component Preview */}
              <div className="flex flex-col h-full">
                <div className="text-center xl:text-left mb-6 md:mb-8">
                  <h3 className="text-3xl font-bold mb-2 gradient-text">
                    Live 3D Preview
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    Experience our interactive 3D components in real-time with
                    full customization controls
                  </p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="bg-card/90 dark:bg-card/80 backdrop-blur-md rounded-3xl border border-border/50 shadow-2xl p-6 md:p-8 hover:shadow-3xl transition-all duration-500 group flex-1 flex flex-col justify-center relative overflow-hidden aspect-square w-full h-full max-w-[650px] mx-auto">
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/5 to-blue-500/5 dark:from-primary/20 dark:to-blue-500/20" />
                    <div className="rounded-2xl flex items-center justify-center border border-border/30 relative overflow-hidden bg-background/80 dark:bg-background/60 w-full h-full aspect-square mx-auto">
                      <HeroScene />
                      <div className="absolute top-4 right-4 z-10">
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary border-primary/20 px-4 py-1 text-base rounded-full shadow-md"
                        >
                          Interactive
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right: Live Editor/Controls */}
              <div className="flex flex-col h-full">
                <div className="text-center xl:text-left mb-6 md:mb-8">
                  <h3 className="text-3xl font-bold mb-2 gradient-text">
                    Live Controls
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    Customize colors, materials, and properties in real-time
                    with intuitive controls
                  </p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  
                    <div className="relative z-10 flex flex-col justify-center w-full mx-auto min-w-[320px] md:min-w-[420px] xl:min-w-[520px] max-w-[700px]">
                      <HeroControlPanel />
                    </div>
                 
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED COMPONENTS SECTION */}
        <section className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 gradient-text">
                Featured Components
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Most popular and highly-rated components from our collection
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sampleComponents
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 6)
                .map((component) => (
                  <Card
                    key={component.id}
                    className="card-hover bg-card/80 backdrop-blur-md border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                    onClick={() =>
                      (window.location.href = `/viewer?id=${component.id}`)
                    }
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">
                          {component.name}
                        </h3>
                      </div>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {component.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className="capitalize bg-primary/5 border-primary/20 text-primary"
                          >
                            {component.category}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="bg-primary/10 text-primary border-primary/20"
                          >
                            {component.complexity}
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover:bg-primary/10 hover:text-primary opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
            {/* View All Button */}
            <div className="text-center mt-14 md:mt-16">
              <Link href="/browse">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 border-2 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                >
                  View All Components
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="py-32 bg-gradient-to-br from-muted/60 to-muted/30 dark:from-muted/40 dark:to-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
                Why Choose ZAxis?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Everything you need to build amazing 3D experiences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg">
                  <Palette className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">
                  Real-time Customization
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Modify colors, materials, and properties in real-time with
                  intuitive controls.
                </p>
              </div>

              <div className="text-center space-y-6">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg">
                  <Code className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">
                  Instant Code Generation
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Export production-ready Three.js code with your customizations
                  applied.
                </p>
              </div>

              <div className="text-center space-y-6">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg">
                  <Download className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">Ready to Use</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  All components are production-ready with proper TypeScript
                  support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-32 bg-gradient-to-br from-muted/60 to-muted/30 dark:from-muted/40 dark:to-muted/20 border-t border-border/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 gradient-text">
              Ready to Start Building?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Explore our collection and start creating amazing 3D experiences
              today.
            </p>
            <Link href="/browse">
              <Button
                size="lg"
                className="btn-glow text-lg px-12 py-8 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg hover:shadow-2xl transition-all duration-300 shadow-primary/25 text-white dark:text-white border-0"
              >
                <Play className="mr-3 h-6 w-6" />
                Browse All Components
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
