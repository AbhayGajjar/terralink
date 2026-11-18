"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

interface Pulse {
  from: number;
  to: number;
  t: number;
  speed: number;
}

const LINK_DISTANCE = 160;

/**
 * Lightweight animated "network" of drifting nodes with light pulses travelling
 * along the links – evokes data moving through fibre. Pauses when off-screen or
 * when the tab is hidden, and renders a single static frame for reduced motion.
 */
export default function NetworkCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Purely decorative: skip on phones, and start only once the page is idle so the animation
    // never competes with the initial render (better LCP / TBT).
    if (window.matchMedia("(max-width: 767px)").matches) return;
    let cleanup: (() => void) | undefined;
    const init = () => {
      cleanup = setup();
    };
    const useIdle = typeof window.requestIdleCallback === "function";
    const handle = useIdle ? window.requestIdleCallback(init, { timeout: 2500 }) : window.setTimeout(init, 1500);
    return () => {
      if (useIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      cleanup?.();
    };

    function setup() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let frame = 0;
    let running = false;
    let visible = true;

    const seed = () => {
      const count = Math.min(70, Math.max(24, Math.round((width * height) / 19000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.6 + 0.8,
      }));
      pulses = [];
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const spawnPulse = () => {
      const from = Math.floor(Math.random() * nodes.length);
      let best = -1;
      let bestDist = Infinity;
      for (let i = 0; i < nodes.length; i++) {
        if (i === from) continue;
        const d = Math.hypot(nodes[i].x - nodes[from].x, nodes[i].y - nodes[from].y);
        if (d < LINK_DISTANCE && d > 40 && d < bestDist && Math.random() > 0.3) {
          best = i;
          bestDist = d;
        }
      }
      if (best >= 0) pulses.push({ from, to: best, t: 0, speed: 0.008 + Math.random() * 0.012 });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DISTANCE) {
            const alpha = (1 - d / LINK_DISTANCE) * 0.32;
            ctx.strokeStyle = `rgba(80, 160, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        ctx.fillStyle = "rgba(160, 220, 255, 0.85)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // light pulses
      for (const p of pulses) {
        const a = nodes[p.from];
        const b = nodes[p.to];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 10);
        glow.addColorStop(0, "rgba(0, 212, 255, 0.95)");
        glow.addColorStop(1, "rgba(0, 212, 255, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }
      pulses = pulses.filter((p) => (p.t += p.speed) < 1);
      if (pulses.length < 14 && Math.random() < 0.08) spawnPulse();
      draw();
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      if (running || reduceMotion || !visible || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(step);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    resize();
    draw();
    start();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    resizeObserver.observe(canvas);

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    intersection.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
    }
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
