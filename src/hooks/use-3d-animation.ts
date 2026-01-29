import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';
import { ComponentCustomization } from '@/types/component';

/**
 * Custom hook for animating 3D component transformations using GSAP
 * Handles scale, rotation, and position animations for any THREE.Group
 *
 * @param groupRef - Reference to the THREE.Group to animate
 * @param customization - Customization settings containing scale, rotation, position
 * @param options - Optional animation configuration
 * @returns void
 *
 * @example
 * ```tsx
 * const groupRef = useRef<THREE.Group>(null);
 * use3DAnimation(groupRef, customization);
 * ```
 */
export function use3DAnimation(
  groupRef: RefObject<THREE.Group | null>,
  customization: ComponentCustomization,
  options?: {
    duration?: number;
    ease?: string;
    onComplete?: () => void;
  }
) {
  useEffect(() => {
    if (!groupRef.current) return;

    const {
      duration = 0.5,
      ease = 'power2.out',
      onComplete,
    } = options || {};

    // Animate scale
    gsap.to(groupRef.current.scale, {
      x: customization.scale[0],
      y: customization.scale[1],
      z: customization.scale[2],
      duration,
      ease,
    });

    // Animate rotation
    gsap.to(groupRef.current.rotation, {
      x: customization.rotation[0],
      y: customization.rotation[1],
      z: customization.rotation[2],
      duration,
      ease,
    });

    // Animate position
    gsap.to(groupRef.current.position, {
      x: customization.position[0],
      y: customization.position[1],
      z: customization.position[2],
      duration,
      ease,
      onComplete,
    });
  }, [customization, groupRef, options]);
}

/**
 * Custom hook for continuous rotation animation
 * Useful for components that should constantly rotate
 *
 * @param groupRef - Reference to the THREE.Group to rotate
 * @param speed - Rotation speed (default: 0.005)
 * @param axis - Rotation axis: 'x', 'y', or 'z' (default: 'y')
 * @param customization - Customization settings for animation speed control
 * @returns void
 *
 * @example
 * ```tsx
 * const groupRef = useRef<THREE.Group>(null);
 * useRotationAnimation(groupRef, 0.01, 'y', customization);
 * ```
 */
export function useRotationAnimation(
  groupRef: RefObject<THREE.Group | null>,
  speed: number = 0.005,
  axis: 'x' | 'y' | 'z' = 'y',
  customization?: ComponentCustomization
) {
  useEffect(() => {
    if (!groupRef.current) return;

    const group = groupRef.current;
    const animationSpeed = customization?.animationSpeed || 1.0;
    const actualSpeed = speed * animationSpeed;

    let animationId: number;

    const animate = () => {
      group.rotation[axis] += actualSpeed;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [groupRef, speed, axis, customization?.animationSpeed]);
}
