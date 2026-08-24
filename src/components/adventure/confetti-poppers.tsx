import { useEffect, useRef, useState } from "react";

export function triggerConfetti() {
  if (typeof window === "undefined") return;

  const duration = 1200;
  const end = Date.now() + duration;
  const colors = ["#FACC15", "#F472B6", "#60A5FA", "#A78BFA", "#34D399"];

  const frame = () => {
    const now = Date.now();
    if (now > end) return;
    const progress = (end - now) / duration;
    const particleCount = Math.floor(4 * progress) + 2;

    for (let i = 0; i < particleCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)] ?? "#FACC15";
      const el = document.createElement("div");
      el.style.position = "fixed";
      el.style.left = `${Math.random() * 100}vw`;
      el.style.top = "-10px";
      el.style.width = `${Math.random() * 8 + 6}px`;
      el.style.height = `${Math.random() * 8 + 6}px`;
      el.style.backgroundColor = color;
      el.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
      el.style.pointerEvents = "none";
      el.style.zIndex = "9999";
      el.style.transition = "transform 2s ease-out, opacity 2s ease-out";
      el.style.opacity = "1";
      document.body.appendChild(el);

      const angle = Math.random() * Math.PI + Math.PI / 2;
      const distance = Math.random() * 40 + 30;
      const rotation = Math.random() * 720 - 360;
      setTimeout(() => {
        el.style.transform = `translate(${Math.cos(angle) * distance}vh, ${Math.sin(angle) * distance + 60}vh) rotate(${rotation}deg)`;
        el.style.opacity = "0";
      }, 30);

      setTimeout(() => el.remove(), 2000);
    }

    requestAnimationFrame(() => setTimeout(frame, 60));
  };

  frame();
}

export function ConfettiPoppers({ active, onDone }: { active: boolean; onDone?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [running, setRunning] = useState(false);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (!active || running) return;
    setRunning(true);
    onDone?.();
  }, [active, running, onDone]);

  useEffect(() => {
    if (!running) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#FACC15", "#F472B6", "#60A5FA", "#A78BFA", "#34D399", "#FB923C"];
    const shapes = ["circle", "square", "ribbon"] as const;

    const spawn = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 3;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 4,
          gravity: 0.2,
          drag: 0.96,
          size: Math.random() * 6 + 4,
          color: colors[Math.floor(Math.random() * colors.length)] ?? "#FACC15",
          shape: shapes[Math.floor(Math.random() * shapes.length)] ?? "circle",
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 10 - 5,
          life: 1,
          decay: 0.008 + Math.random() * 0.01,
        });
      }
    };

    // Two popper bursts from left and right
    const w = canvas.width;
    const h = canvas.height;
    spawn(w * 0.2, h * 0.7, 40);
    spawn(w * 0.8, h * 0.7, 40);
    spawn(w * 0.5, h * 0.8, 30);

    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]!;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.rotation += p.rotationSpeed;
        p.life -= p.decay;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === "square") {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        }
        ctx.restore();

        if (p.life <= 0) particles.splice(i, 1);
      }

      if (particles.length > 0) {
        raf = requestAnimationFrame(loop);
      } else {
        setRunning(false);
      }
    };

    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
      particlesRef.current = [];
    };
  }, [running]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      aria-hidden="true"
    />
  );
}

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  gravity: number;
  drag: number;
  size: number;
  color: string;
  shape: "circle" | "square" | "ribbon";
  rotation: number;
  rotationSpeed: number;
  life: number;
  decay: number;
};
