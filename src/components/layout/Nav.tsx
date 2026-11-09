"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollProgress } from "@/components/background/Ambient";
import { ThemeSwitch } from "@/components/layout/ThemeSwitch";

const links = [
  { id: "about", label: "About" },
  { id: "projects", label: "Work" },
  { id: "reviews", label: "Reviews" },
  { id: "services", label: "Services" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function Nav({ base = "" }: { base?: string }) {
  const [active, setActive] = useState("");
  const [hover, setHover] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (base) return () => window.removeEventListener("scroll", onScroll);

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["home", ...links.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [base]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const pill = hover ?? (base ? null : active);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5">
      <nav
        aria-label="Main"
        className={`relative mx-auto flex h-[60px] max-w-[1240px] items-center justify-between rounded-full pl-5 pr-2 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ${
          scrolled || open ? "glass glass-blur" : "border border-transparent"
        }`}
      >
        <Link href={`${base}/#home`} className="group flex items-center gap-2.5" aria-label="Waseem Abbas, home">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-accent font-display text-[13px] font-extrabold text-on-accent transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-[360deg]">WA</span>
          <span className="font-display text-[16px] font-semibold tracking-[-0.03em]">Waseem Abbas</span>
        </Link>

        <ul className="hidden items-center lg:flex" onMouseLeave={() => setHover(null)}>
          {links.map((l) => {
            const on = active === l.id && !base;
            return (
              <li key={l.id} className="relative">
                {pill === l.id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-fg/[0.07] ring-1 ring-fg/10" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                )}
                <Link
                  href={`${base}/#${l.id}`}
                  onMouseEnter={() => setHover(l.id)}
                  aria-current={on ? "true" : undefined}
                  className={`relative flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] transition-colors ${on || pill === l.id ? "text-text" : "text-muted"}`}
                >
                  {on && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeSwitch className="hidden sm:flex" />
          <Link
            href={`${base}/#contact`}
            className="hidden h-11 items-center gap-2 rounded-full bg-text px-5 text-[14px] font-semibold text-ink-950 transition-colors hover:bg-accent hover:text-on-accent xl:inline-flex"
          >
            Hire me
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-fg/[0.04] lg:hidden"
          >
            <span className={`absolute h-px w-4 bg-text transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
            <span className={`absolute h-px w-4 bg-text transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
          </button>
        </div>
        <div className="absolute inset-x-6 bottom-0 overflow-hidden rounded-full">
          <ScrollProgress />
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass mx-auto mt-2 max-w-[1240px] overflow-hidden rounded-[28px] lg:hidden"
          >
            <ul className="flex flex-col p-3">
              {links.map((l, i) => (
                <motion.li key={l.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.04, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
                  <Link href={`${base}/#${l.id}`} onClick={() => setOpen(false)} className="flex items-baseline gap-4 rounded-2xl px-4 py-3.5 transition-colors hover:bg-fg/5">
                    <span className="text-[13px] font-medium text-cyan">0{i + 1}</span>
                    <span className="font-display text-[24px] font-semibold tracking-[-0.03em]">{l.label}</span>
                  </Link>
                </motion.li>
              ))}
              <li className="flex justify-center p-2 sm:hidden">
                <ThemeSwitch />
              </li>
              <li className="p-2 pt-3">
                <Link href={`${base}/#contact`} onClick={() => setOpen(false)} className="flex h-12 items-center justify-center rounded-full bg-text font-medium text-ink-950">
                  Hire me
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
