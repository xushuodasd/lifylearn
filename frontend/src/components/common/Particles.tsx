import { useEffect, useRef } from 'react';

const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string }[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      // High particle count for a nebula effect
      const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 10000);
      particles = [];
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight * 0.4;

      for (let i = 0; i < particleCount; i++) {
        // Gaussian distribution for a cloud/nebula shape around the center
        // Using Box-Muller transform for normal distribution
        const u1 = Math.random();
        const u2 = Math.random();
        const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        const z2 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
        
        // Spread particles: wider horizontally (x) than vertically (y)
        const spreadX = 300;
        const spreadY = 180;
        
        const x = centerX + z1 * spreadX;
        const y = centerY + z2 * spreadY;

        // Assign colors based on Gemini brand: Blue, Purple, White
        const colorType = Math.random();
        let color = '';
        if (colorType < 0.6) {
            color = '59, 130, 246'; // Blue-500
        } else if (colorType < 0.9) {
            color = '168, 85, 247'; // Purple-500
        } else {
            color = '255, 255, 255'; // White
        }

        particles.push({
          x: x,
          y: y,
          // Gentle orbital/floating movement
          vx: (Math.random() - 0.5) * 0.2, 
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 1.5 + 0.5, // Small, star-like
          alpha: Math.random() * 0.6 + 0.2,
          color: color, // Store color
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Enable additive blending for "glow" effect
      ctx.globalCompositeOperation = 'screen';
      
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        
        // Slowly fade alpha in and out for twinkling
        p.alpha += (Math.random() - 0.5) * 0.02;
        if (p.alpha < 0.1) p.alpha = 0.1;
        if (p.alpha > 0.8) p.alpha = 0.8;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // Use the stored color
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();
      });
      
      // Reset composite operation
      ctx.globalCompositeOperation = 'source-over';

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    createParticles();
    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
};

export default Particles;
