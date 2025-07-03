"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeroScene } from "@/components/3d/hero-scene";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
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
import Image from "next/image";
import { useEffect, useState } from "react";

const categoryIcons = {
  mechanical: Zap,
  decorative: Sparkles,
  structural: Building2,
  electronic: Cpu,
  geometric: Shapes,
};

export default function HomePage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const logoSrc =
    mounted && resolvedTheme === "dark" ? "/dlogo.png" : "/Llogo.png";

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
        {/* HERO SECTION */}
        <section className="relative flex flex-col items-center justify-center min-h-screen w-full px-4">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-background via-blue-100/40 to-primary/10 dark:from-background dark:via-blue-900/40 dark:to-primary/30" />
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl mx-auto py-16 md:py-24">
            {/* Theme-based logo */}
            <div className="mb-8 flex justify-center">
              {mounted && (
                <Image
                  src={logoSrc}
                  alt="ZAxis Logo"
                  width={320}
                  height={320}
                  className="object-contain drop-shadow-xl"
                  priority
                />
              )}
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold gradient-text mb-6 leading-tight text-center drop-shadow-lg">
              Build with <span className="text-primary">3D</span>
            </h1>
            <p className="text-2xl lg:text-3xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed text-center">
              Minimal, production-ready 3D components for your next project.
              <br />
              Visualize, customize, and export Three.js code instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link href="/browse">
                <Button
                  size="lg"
                  className="btn-glow text-xl px-10 py-6 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg shadow-primary/25"
                >
                  <Play className="mr-3 h-7 w-7" />
                  Browse Components
                  <ArrowRight className="ml-3 h-7 w-7" />
                </Button>
              </Link>
              <Link href="/viewer">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-xl px-10 py-6 border-2 hover:bg-muted/50 hover:border-primary/50 transition-all duration-300"
                >
                  <Box className="mr-3 h-7 w-7" />
                  Live Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>

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
                  <div className="bg-card/90 dark:bg-card/80 backdrop-blur-md rounded-3xl border border-border/50 shadow-2xl p-6 md:p-8 hover:shadow-3xl transition-all duration-500 group flex-1 flex flex-col justify-center relative overflow-hidden min-h-[420px] md:min-h-[540px] xl:min-h-[600px] xl:max-h-[650px]">
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/5 to-blue-500/5 dark:from-primary/20 dark:to-blue-500/20" />
                    <div className="rounded-2xl flex items-center justify-center border border-border/30 relative overflow-hidden bg-background/80 dark:bg-background/60 w-full mx-auto min-h-[320px] md:min-h-[400px] xl:min-h-[500px] max-w-[800px]">
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
                  <div className="bg-card/90 dark:bg-card/80 backdrop-blur-md rounded-3xl border border-border/50 shadow-2xl p-8 md:p-10 hover:shadow-3xl transition-all duration-500 group flex-1 flex flex-col justify-center relative overflow-visible min-h-[500px] md:min-h-[700px] xl:min-h-[800px] max-h-[90vh] w-full xl:w-[650px] 2xl:w-[750px] mx-auto">
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/5 to-blue-500/5 dark:from-primary/10 dark:to-blue-500/10" />
                    <div className="relative z-10 flex flex-col justify-center w-full mx-auto min-w-[320px] md:min-w-[420px] xl:min-w-[520px] max-w-[700px]">
                      <HeroControlPanel />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPONENT CATEGORIES SECTION */}
        <section className="py-24 md:py-32 bg-gradient-to-br from-muted/60 to-muted/30 dark:from-muted/40 dark:to-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 gradient-text">
                Component Categories
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Explore our diverse collection of 3D components organized by
                type and complexity
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {componentCategories.map((category) => {
                const IconComponent =
                  categoryIcons[category.id as keyof typeof categoryIcons] ||
                  Sparkles;
                return (
                  <Card
                    key={category.id}
                    className="card-hover bg-card/80 backdrop-blur-md border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                    onClick={() =>
                      (window.location.href = `/browse?category=${category.id}`)
                    }
                  >
                    <CardHeader className="flex flex-row items-center space-y-0 pb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-7 w-7 text-primary" />
                      </div>
                      <div className="ml-5 flex-1">
                        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                          {category.name}
                        </CardTitle>
                        <p className="text-muted-foreground mt-1">
                          {category.description}
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-end text-sm">
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary border-primary/20 group-hover:bg-primary/20 transition-colors duration-300"
                        >
                          {category.count}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
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
                    <div className="h-56 bg-gradient-to-br from-primary/15 via-blue-500/10 to-purple-500/10 rounded-t-xl flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Box className="h-20 w-20 text-primary/70 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute top-4 right-4">
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary border-primary/20"
                        >
                          {component.complexity}
                        </Badge>
                      </div>
                    </div>
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
                className="btn-glow text-lg px-12 py-8 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-xl shadow-primary/25 text-white dark:text-white border-0"
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
