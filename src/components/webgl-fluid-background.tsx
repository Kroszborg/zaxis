// webgl-fluid-background.tsx
"use client"
import { useEffect, useRef } from 'react';
import WebGLFluidEnhanced from 'webgl-fluid-enhanced';

declare global {
  interface Window {
    fluidSimulation?: WebGLFluidEnhanced;
  }
}

export function WebGLFluidBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (process.env.NODE_ENV === 'development') {
      console.log("WebGL Simulation Starting...");
    }

    const simulation = new WebGLFluidEnhanced(containerRef.current);

    // Store simulation instance in window for global access
    window.fluidSimulation = simulation;
    simulation.start();

    return () => {
      if (process.env.NODE_ENV === 'development') {
        console.log("WebGL Simulation Stopping...");
      }
      simulation.stop();
      delete window.fluidSimulation;
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100vw', height: '100vh' }} />;
}