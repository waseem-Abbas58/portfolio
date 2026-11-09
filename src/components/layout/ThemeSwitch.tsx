"use client";

import { useEffect, useState } from "react";

export const THEMES = [
  { id: "paper", label: "Light theme", bg: "#f6f2ea", dot: "#ee5a1f" },
  { id: "ink", label: "Dark theme", bg: "#100f0d", dot: "#d6f24b" },
] as const;

type ThemeId = (typeof THEMES)[number]["id"];
type VT = { ready: Promise<void> };
type DocVT = Document & { startViewTransition?: (cb: () => void) => VT };

function apply(id: ThemeId) {
  document.documentElement.dataset.theme = id;
  try {
    localStorage.setItem("theme", id);
  } catch {
    /* storage may be blocked */
  }
  window.dispatchEvent(new CustomEvent("themechange"));
}

/** Two swatches, light and dark. Switching wipes the new theme out in a circle from the click. */
export function ThemeSwitch({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<ThemeId>("paper");

  useEffect(() => {
    const sync = () => setTheme((document.documentElement.dataset.theme as ThemeId) || "paper");
    sync();
    window.addEventListener("themechange", sync);
    return () => window.removeEventListener("themechange", sync);
  }, []);

  const change = (id: ThemeId, e: React.MouseEvent) => {
    if (id === theme) return;
    setTheme(id);
    const doc = document as DocVT;
    if (!doc.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(id);
      return;
    }
    const { clientX: x, clientY: y } = e;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    doc.startViewTransition(() => apply(id)).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 700, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  return (
    <div role="group" aria-label="Colour theme" className={`flex items-center gap-1.5 rounded-full border border-line-strong p-1 ${className}`}>
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          aria-label={t.label}
          aria-pressed={theme === t.id}
          title={t.label}
          onClick={(e) => change(t.id, e)}
          className={`relative h-7 w-7 rounded-full transition-transform duration-300 hover:scale-110 ${theme === t.id ? "ring-2 ring-fg" : ""}`}
          style={{ background: `linear-gradient(135deg, ${t.bg} 50%, ${t.dot} 50%)`, boxShadow: "inset 0 0 0 1px rgb(128 128 128 / .35)" }}
        />
      ))}
    </div>
  );
}
