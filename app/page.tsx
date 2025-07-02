'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HeroScene } from '@/components/3d/hero-scene';
import { HeroControlPanel } from '@/components/customization/hero-control-panel';
import { Navbar } from '@/components/layout/navbar';
import { 
  ArrowRight, 
  Box, 
  Palette, 
  Code, 
  Sparkles, 
  Zap, 
  Download, 
  Users, 
  Star,
  Play,
  CheckCircle,
  Layers,
  Cpu,
  Workflow,
  Settings
} from 'lucide-react';
import { componentCategories } from '@/lib/components-data';
import gsap from 'gsap';

export default function HomePage() {
  const [showControls, setShowControls] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Hero animation
    tl.fromTo(heroRef.current, 
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    )
    // Stats animation
    .fromTo(statsRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    )
    // Features stagger
    .fromTo(featuresRef.current?.children || [],
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)' },
      '-=0.4'
    )
    // Categories animation
    .fromTo(categoriesRef.current?.children || [],
      { opacity: 0, y: 20, rotateX: 15 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
      '-=0.3'
    )
    // CTA animation
    .fromTo(ctaRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.8)' },
      '-=0.2'
    );

    // Floating animation for feature cards
    gsap.to('.floating-card', {
      y: -10,
      duration: 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.5
    });
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navbar />
      
      {/* Background Grid */}
      <div className="hero-grid fixed inset-0 pointer-events-none" />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div ref={heroRef} className="space-y-10">
              <div className="space-y-6">
                <Badge className="bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30 text-primary-foreground px-4 py-2">
                  <Sparkles className="h-4 w-4 mr-2" />
                  ZAxis - Next-Gen 3D Library
                </Badge>
                
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                  Build with{' '}
                  <span className="gradient-text block">
                    Interactive 3D
                  </span>
                  Components
                </h1>
                
                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                  ZAxis is the most advanced 3D component library for modern web development. 
                  Visualize, customize, and export production-ready Three.js components 
                  with real-time controls and instant code generation.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/browse">
                  <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4 glow-primary group btn-glow">
                    <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Start Building
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/viewer">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-4 border-primary/30 hover:border-primary/60">
                    <Box className="mr-3 h-5 w-5" />
                    Live Demo
                  </Button>
                </Link>
              </div>
              
              {/* Stats */}
              <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
                <div className="text-center lg:text-left">
                  <div className="text-3xl lg:text-4xl font-bold gradient-text">50+</div>
                  <div className="text-muted-foreground">Components</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl lg:text-4xl font-bold gradient-text">25k+</div>
                  <div className="text-muted-foreground">Downloads</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl lg:text-4xl font-bold gradient-text">4.9★</div>
                  <div className="text-muted-foreground">Rating</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl lg:text-4xl font-bold gradient-text">1.2k+</div>
                  <div className="text-muted-foreground">Developers</div>
                </div>
              </div>
            </div>
            
            <div className="h-96 lg:h-[600px] relative">
              <HeroScene />
              {/* Floating elements */}
              <div className="absolute top-10 right-10 floating-card">
                <div className="glass-morphism p-4 rounded-lg">
                  <Code className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="absolute bottom-20 left-10 floating-card">
                <div className="glass-morphism p-4 rounded-lg">
                  <Palette className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div className="absolute top-1/2 right-0 floating-card">
                <div className="glass-morphism p-4 rounded-lg">
                  <Zap className="h-6 w-6 text-yellow-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-gradient-to-r from-accent/20 to-primary/20 border-accent/30">
                <Settings className="h-4 w-4 mr-2" />
                Interactive Demo
              </Badge>
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                Customize in{' '}
                <span className="gradient-text">Real-Time</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                Experience the power of live 3D customization. Modify colors, lighting, 
                animations, and effects in real-time, then export the code instantly.
              </p>
              
              <Button
                onClick={() => setShowControls(!showControls)}
                size="lg"
                className="mb-8 btn-glow"
              >
                <Settings className="h-5 w-5 mr-2" />
                {showControls ? 'Hide' : 'Show'} Live Controls
              </Button>
            </div>

            {/* Control Panel */}
            {showControls && (
              <div className="max-w-4xl mx-auto">
                <HeroControlPanel />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-gradient-to-r from-accent/20 to-primary/20 border-accent/30">
              <Workflow className="h-4 w-4 mr-2" />
              Powerful Features
            </Badge>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Everything You Need to{' '}
              <span className="gradient-text">Create</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Professional-grade tools designed for developers and designers who demand 
              the best in 3D web development
            </p>
          </div>
          
          <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="glass-morphism hover-glow floating-card group card-hover">
              <CardContent className="p-8 text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Box className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Real-time 3D Rendering</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Powered by Three.js and React Three Fiber for smooth, 
                  interactive 3D experiences with 60fps performance.
                </p>
                <div className="flex justify-center space-x-2">
                  <Badge variant="secondary">Three.js</Badge>
                  <Badge variant="secondary">R3F</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-morphism hover-glow floating-card group card-hover">
              <CardContent className="p-8 text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-accent to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Palette className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Live Customization</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Intuitive controls for materials, colors, scale, and rotation. 
                  See changes instantly with smooth GSAP animations.
                </p>
                <div className="flex justify-center space-x-2">
                  <Badge variant="secondary">GSAP</Badge>
                  <Badge variant="secondary">Controls</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-morphism hover-glow floating-card group card-hover">
              <CardContent className="p-8 text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Code className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Code Generation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Export clean, production-ready JSX/TSX code with your 
                  customizations. Copy and paste into any React project.
                </p>
                <div className="flex justify-center space-x-2">
                  <Badge variant="secondary">JSX</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-morphism hover-glow floating-card group card-hover">
              <CardContent className="p-8 text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Download className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Export & Share</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Download configurations as JSON, share components with teams, 
                  and maintain version control of your 3D assets.
                </p>
                <div className="flex justify-center space-x-2">
                  <Badge variant="secondary">JSON</Badge>
                  <Badge variant="secondary">Share</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-morphism hover-glow floating-card group card-hover">
              <CardContent className="p-8 text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Layers className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Modular Architecture</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Built with scalability in mind. Easy to extend with new 
                  components and integrate into existing workflows.
                </p>
                <div className="flex justify-center space-x-2">
                  <Badge variant="secondary">Modular</Badge>
                  <Badge variant="secondary">Scalable</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-morphism hover-glow floating-card group card-hover">
              <CardContent className="p-8 text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Cpu className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Performance Optimized</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Optimized for performance with efficient rendering, 
                  lazy loading, and minimal bundle size impact.
                </p>
                <div className="flex justify-center space-x-2">
                  <Badge variant="secondary">Optimized</Badge>
                  <Badge variant="secondary">Fast</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-gradient-to-r from-primary/20 to-green-500/20 border-primary/30">
              <Box className="h-4 w-4 mr-2" />
              Component Library
            </Badge>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Explore Our{' '}
              <span className="gradient-text">Collection</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Carefully crafted 3D components organized by category for easy discovery
            </p>
          </div>
          
          <div ref={categoriesRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {componentCategories.map((category, index) => (
              <Link key={category.id} href={`/browse?category=${category.id}`}>
                <Card className="glass-morphism hover-glow cursor-pointer group h-full card-hover">
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      {category.icon === 'Cog' && '⚙️'}
                      {category.icon === 'Sparkles' && '✨'}
                      {category.icon === 'Building2' && '🏗️'}
                      {category.icon === 'Cpu' && '💻'}
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <Badge className="bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30">
                        {category.count} components
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Trusted by Developers Worldwide
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of developers building the future of 3D web experiences
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-morphism text-center p-8 card-hover">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "ZAxis has revolutionized our 3D development workflow. 
                The code generation feature alone saves us hours every week."
              </p>
              <div className="font-semibold">Sarah Chen</div>
              <div className="text-sm text-muted-foreground">Senior Frontend Developer</div>
            </Card>
            
            <Card className="glass-morphism text-center p-8 card-hover">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "The real-time customization and export features are incredible. 
                Perfect for rapid prototyping and client presentations."
              </p>
              <div className="font-semibold">Marcus Rodriguez</div>
              <div className="text-sm text-muted-foreground">Creative Director</div>
            </Card>
            
            <Card className="glass-morphism text-center p-8 card-hover">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "Outstanding performance and beautiful components. 
                The documentation and examples make it easy to get started."
              </p>
              <div className="font-semibold">Alex Thompson</div>
              <div className="text-sm text-muted-foreground">Lead Developer</div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-32 relative">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="glass-morphism p-16 rounded-3xl glow-primary">
            <Badge className="mb-8 bg-gradient-to-r from-primary/30 to-accent/30 border-primary/50 text-lg px-6 py-3">
              <Users className="h-5 w-5 mr-2" />
              Join the Community
            </Badge>
            
            <h2 className="text-4xl lg:text-6xl font-bold mb-8">
              Ready to Build the{' '}
              <span className="gradient-text">Future?</span>
            </h2>
            
            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Start creating stunning 3D experiences today. Join thousands of developers 
              who are already building the next generation of web applications with ZAxis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/browse">
                <Button size="lg" className="text-xl px-12 py-6 glow-primary group btn-glow">
                  <Sparkles className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Start Building Now
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              
              <div className="flex items-center space-x-4 text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Free to use</span>
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Open source</span>
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>MIT License</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}