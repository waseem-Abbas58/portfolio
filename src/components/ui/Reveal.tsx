"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

type Props = HTMLMotionProps<"div"> & { delay?: number; y?: number; x?: number; blur?: boolean; flip?: boolean };

/** Body reveal. Direction and blur vary by use so sections don't all move alike. Runs once. */
export function Reveal({ delay = 0, y = 18, x = 0, blur = false, flip = false, children, ...rest }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : flip ? { opacity: 0, y: 70, rotateX: 22, scale: 0.94, transformPerspective: 900 } : { opacity: 0, y, x, filter: blur ? "blur(8px)" : "blur(0px)" }}
      whileInView={flip ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : { opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.95, ease, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Headline reveal: each line rises from behind a mask. */
export function MaskLines({ lines, className = "", delay = 0, as: Tag = "h2" }: { lines: React.ReactNode[]; className?: string; delay?: number; as?: "h1" | "h2" | "h3" }) {
  const reduce = useReducedMotion();
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.1em]">
          <motion.span
            className="block"
            initial={reduce ? false : { y: "110%", rotate: 2 }}
            whileInView={{ y: "0%", rotate: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.1, ease, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Section label chip: index, a line that draws in, and the label. */
export function SectionLabel({ label, className = "" }: { index?: string; label: string; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <motion.span
        className="h-[2px] w-7 origin-left rounded-full bg-accent"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
      />
      <span className="text-[15px] font-semibold text-cyan">{label}</span>
    </div>
  );
}

/** Section header used across the page; each section composes its body differently. */
export function SectionHead({ index, label, lines, intro, className = "" }: { index: string; label: string; lines: React.ReactNode[]; intro?: string; className?: string }) {
  return (
    <div className={`mb-14 md:mb-20 ${className}`}>
      <SectionLabel index={index} label={label} className="mb-7" />
      <MaskLines lines={lines} className="display-lg max-w-[18ch]" />
      {intro && (
        <Reveal delay={0.15} className="mt-6 max-w-[56ch] text-[17px] leading-[1.7] text-muted">
          {intro}
        </Reveal>
      )}
    </div>
  );
}
