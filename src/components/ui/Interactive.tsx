"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

const finePointer = (e: React.PointerEvent) => e.pointerType === "mouse";

/** Sets --mx/--my on the element so `.spot` can paint a cursor light and border highlight. */
export function Spotlight({ className = "", children, as: Tag = "div", ...rest }: React.HTMLAttributes<HTMLElement> & { as?: "div" | "article" | "li" }) {
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <Tag className={`spot ${className}`} onPointerMove={onMove} {...rest}>
      {children}
    </Tag>
  );
}

/** Pulls its child slightly toward the cursor. Desktop only, off with reduced motion. */
export function Magnetic({ children, strength = 0.28, className = "" }: { children: React.ReactNode; strength?: number; className?: string }) {
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });
  return (
    <motion.span
      className={`inline-flex ${className}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (reduce || !finePointer(e)) return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/** Perspective tilt toward the cursor, with an optional inner parallax layer via CSS vars. */
export function Tilt({ children, className = "", max = 7 }: { children: React.ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 140, damping: 18 });
  const sy = useSpring(py, { stiffness: 140, damping: 18 });
  const rotateY = useTransform(sx, (v) => v * max);
  const rotateX = useTransform(sy, (v) => v * -max);
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 1100, transformStyle: "preserve-3d" }}
      onPointerMove={(e) => {
        if (reduce || !finePointer(e)) return;
        const r = e.currentTarget.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        px.set(nx);
        py.set(ny);
        e.currentTarget.style.setProperty("--tx", String(nx));
        e.currentTarget.style.setProperty("--ty", String(ny));
      }}
      onPointerLeave={(e) => {
        px.set(0);
        py.set(0);
        e.currentTarget.style.setProperty("--tx", "0");
        e.currentTarget.style.setProperty("--ty", "0");
      }}
    >
      {children}
    </motion.div>
  );
}
