'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useAuth } from '@/lib/authContext';

export const Hero3D: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useAuth();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    // Ambient dark/light fog for depth
    const isLight = themeRef.current === 'light';
    scene.fog = new THREE.FogExp2(isLight ? 0xfdfbf7 : 0x050811, 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isLight ? 1.4 : 1.2;

    container.appendChild(renderer.domElement);

    // 2. Adaptive Lighting System (Light vs Dark Mode)
    const ambientLight = new THREE.AmbientLight(isLight ? 0xffffff : 0x0f172a, isLight ? 2.5 : 1.5);
    scene.add(ambientLight);

    // Gold Spotlight
    const goldLight = new THREE.PointLight(0xf59e0b, isLight ? 5 : 4, 30);
    goldLight.position.set(6, 6, 8);
    scene.add(goldLight);

    // Rim Light
    const rimLight = new THREE.PointLight(isLight ? 0x0284c7 : 0x38bdf8, 3, 30);
    rimLight.position.set(-6, -4, 6);
    scene.add(rimLight);

    // Emerald Accent Light
    const emeraldLight = new THREE.PointLight(0x10b981, 2, 25);
    emeraldLight.position.set(0, -6, -2);
    scene.add(emeraldLight);

    // 3. 3D Model Construction: Abstract Scales of Justice & Legal Geometry Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Metallic Shader Material (Gold / Amber Metallic)
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.92,
      roughness: 0.18,
      envMapIntensity: 1.5,
    });

    const slateMaterial = new THREE.MeshStandardMaterial({
      color: isLight ? 0x334155 : 0x1e293b,
      metalness: 0.85,
      roughness: 0.35,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.9,
      thickness: 1.2,
      transparent: true,
      opacity: isLight ? 0.8 : 0.6,
    });

    // Central Pillar / Stand
    const pillarGeo = new THREE.CylinderGeometry(0.12, 0.28, 6, 32);
    const pillar = new THREE.Mesh(pillarGeo, slateMaterial);
    mainGroup.add(pillar);

    // Heavy Circular Pedestal Base
    const baseGeo = new THREE.CylinderGeometry(1.8, 2.2, 0.4, 48);
    const base = new THREE.Mesh(baseGeo, goldMaterial);
    base.position.y = -3;
    mainGroup.add(base);

    // Crossbar / Fulcrum
    const armGeo = new THREE.CylinderGeometry(0.08, 0.08, 6.5, 32);
    const arm = new THREE.Mesh(armGeo, goldMaterial);
    arm.rotation.z = Math.PI / 2;
    arm.position.y = 2.4;
    mainGroup.add(arm);

    // Fulcrum Emblem Ring
    const ringGeo = new THREE.TorusGeometry(0.65, 0.08, 16, 64);
    const centerRing = new THREE.Mesh(ringGeo, goldMaterial);
    centerRing.position.y = 2.4;
    mainGroup.add(centerRing);

    // Left Scale Pan Assembly
    const leftPanGroup = new THREE.Group();
    leftPanGroup.position.set(-3.1, 1.2, 0);

    const panGeo = new THREE.CylinderGeometry(1.1, 0.2, 0.3, 32);
    const leftPan = new THREE.Mesh(panGeo, glassMaterial);
    leftPanGroup.add(leftPan);

    const chainGeo = new THREE.TorusGeometry(0.7, 0.03, 12, 32);
    const leftRing = new THREE.Mesh(chainGeo, goldMaterial);
    leftRing.rotation.x = Math.PI / 2;
    leftRing.position.y = 0.6;
    leftPanGroup.add(leftRing);

    mainGroup.add(leftPanGroup);

    // Right Scale Pan Assembly
    const rightPanGroup = new THREE.Group();
    rightPanGroup.position.set(3.1, 1.2, 0);

    const rightPan = new THREE.Mesh(panGeo, glassMaterial);
    rightPanGroup.add(rightPan);

    const rightRing = new THREE.Mesh(chainGeo, goldMaterial);
    rightRing.rotation.x = Math.PI / 2;
    rightRing.position.y = 0.6;
    rightPanGroup.add(rightRing);

    mainGroup.add(rightPanGroup);

    // Outer Orbiting Holographic Rings
    const orbitRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(4.2, 0.02, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: isLight ? 0.6 : 0.4 })
    );
    orbitRing1.rotation.x = Math.PI / 3;
    mainGroup.add(orbitRing1);

    const orbitRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(5.2, 0.025, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: isLight ? 0.5 : 0.3 })
    );
    orbitRing2.rotation.y = Math.PI / 4;
    mainGroup.add(orbitRing2);

    // 4. Floating Particle Cloud Matrix
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 20;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.15,
      transparent: true,
      opacity: isLight ? 0.5 : 0.75,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. Interactive Mouse Parallax & Smooth Animation Loop
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const halfX = window.innerWidth / 2;
      const halfY = window.innerHeight / 2;
      mouseX = (e.clientX - halfX) / halfX;
      mouseY = (e.clientY - halfY) / halfY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Dynamically update fog & lighting if theme changed
      const currentIsLight = themeRef.current === 'light';
      scene.fog = new THREE.FogExp2(currentIsLight ? 0xfdfbf7 : 0x050811, 0.035);
      ambientLight.intensity = currentIsLight ? 2.5 : 1.5;
      goldLight.intensity = currentIsLight ? 5 : 4;

      // Gentle floating sway for the scales
      targetRotationY += (mouseX * 0.5 - targetRotationY) * 0.05;
      targetRotationX += (mouseY * 0.3 - targetRotationX) * 0.05;

      mainGroup.rotation.y = elapsedTime * 0.25 + targetRotationY;
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.05 + targetRotationX * 0.5;

      // Scale pans gentle counter-weight motion
      leftPanGroup.position.y = 1.2 + Math.sin(elapsedTime * 1.5) * 0.18;
      rightPanGroup.position.y = 1.2 - Math.sin(elapsedTime * 1.5) * 0.18;

      arm.rotation.z = Math.sin(elapsedTime * 1.5) * 0.06;

      // Orbit ring rotations
      orbitRing1.rotation.z = elapsedTime * 0.2;
      orbitRing2.rotation.z = -elapsedTime * 0.15;

      // Particle rotation
      particles.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
    />
  );
};
