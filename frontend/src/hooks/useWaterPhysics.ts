import { useEffect, useRef } from 'react';

interface WaterPhysicsOptions {
  isDisabled?: boolean;
  isLight?: boolean;
}

export const useWaterPhysics = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  options: WaterPhysicsOptions = {}
) => {
  const requestRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number; rx: number; ry: number; speed: number }>({
    x: 0,
    y: 0,
    rx: 0,
    ry: 0,
    speed: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDisabled = options.isDisabled || prefersReducedMotion;

    let width = 0;
    let height = 0;
    let dpi = window.devicePixelRatio || 1;

    // Grid details
    const gridSpacing = 40;

    // Particles moving with the flow in background
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
    }
    
    let particles: Particle[] = [];
    const maxParticles = window.innerWidth < 768 ? 20 : 50;

    // High-fidelity concentric cursor ripples
    interface HoverRipple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
      speed: number;
    }
    let hoverRipples: HoverRipple[] = [];

    const resize = () => {
      width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
      height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;
      
      canvas.width = width * dpi;
      canvas.height = height * dpi;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(dpi, dpi);
      
      // Initialize particles
      particles = [];
      for (let i = 0; i < maxParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.8,
          speedY: Math.random() * 0.15 + 0.05,
          speedX: Math.random() * 0.08 - 0.04,
          opacity: Math.random() * 0.4 + 0.1,
        });
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;
      
      const dx = currentX - mouseRef.current.x;
      const dy = currentY - mouseRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      mouseRef.current.x = currentX;
      mouseRef.current.y = currentY;
      mouseRef.current.speed = Math.min(dist * 0.1, 10);

      // Create expanding concentric water ripples on cursor movements
      if (dist > 10 && !isDisabled) {
        hoverRipples.push({
          x: currentX,
          y: currentY,
          radius: 1,
          maxRadius: 85,
          opacity: 0.7,
          speed: 1.5, // Primary ring expansion speed
        });
        
        // Prevent array overflow
        if (hoverRipples.length > 40) {
          hoverRipples.shift();
        }
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw solid dark background if not light theme
      if (!options.isLight) {
        ctx.fillStyle = '#10202B'; // Dark Navy background
        ctx.fillRect(0, 0, width, height);
        ctx.strokeStyle = 'rgba(8, 126, 170, 0.04)'; // Industrial Blue
      } else {
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.03)'; // Soft Light Gray grid
      }
      ctx.lineWidth = 1;

      // Draw vertical grid lines
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw horizontal grid lines
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 3. Render Concentric Hover Ripple Water Trails
      for (let i = hoverRipples.length - 1; i >= 0; i--) {
        const rip = hoverRipples[i];
        rip.radius += rip.speed;
        rip.opacity -= 0.01;

        if (rip.opacity <= 0 || rip.radius >= rip.maxRadius) {
          hoverRipples.splice(i, 1);
          continue;
        }

        // Draw Ring 1: Primary ripple
        ctx.strokeStyle = options.isLight 
          ? `rgba(197, 31, 51, ${rip.opacity})` 
          : `rgba(25, 184, 200, ${rip.opacity})`;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Draw Ring 2: Harmonic secondary ripple (slightly offset)
        if (rip.radius > 12) {
          ctx.strokeStyle = options.isLight 
            ? `rgba(255, 140, 0, ${rip.opacity * 0.6})` 
            : `rgba(8, 126, 170, ${rip.opacity * 0.6})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.radius - 10, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw Ring 3: Soft tertiary ripple
        if (rip.radius > 24) {
          ctx.strokeStyle = options.isLight 
            ? `rgba(197, 31, 51, ${rip.opacity * 0.3})` 
            : `rgba(25, 184, 200, ${rip.opacity * 0.3})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.radius - 20, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Ease the pointer coordinates
      const mouse = mouseRef.current;
      mouse.rx += (mouse.x - mouse.rx) * 0.1;
      mouse.ry += (mouse.y - mouse.ry) * 0.1;
      if (mouse.speed > 0.05) {
        mouse.speed *= 0.95;
      }

      // 4. Draw Fluid Particles (Gentle floating dots in background)
      particles.forEach((p) => {
        p.y -= p.speedY * (1 + mouse.speed * 0.1);
        p.x += p.speedX + Math.sin(p.y * 0.015) * 0.1;
        
        // Reset particle if it leaves canvas
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0 || p.x > width) {
          p.x = Math.random() * width;
        }

        // Draw particle with gentle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = options.isLight 
          ? `rgba(197, 31, 51, ${p.opacity * 0.4})` 
          : `rgba(25, 184, 200, ${p.opacity})`;
        ctx.fill();
      });

      requestRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [options.isDisabled]);
};
export default useWaterPhysics;
