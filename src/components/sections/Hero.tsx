"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Atmosphere } from "@/components/background/Atmosphere";
import { LogoOrbit } from "@/components/ui/LogoOrbit";
import { Button } from "@/components/ui/Button";
import { profile } from "@/content/profile";

const d = (s: number) => ({ animationDelay: `${s}s` });

/** Live local time in Faisalabad: a small, real detail (rendered after mount to avoid hydration mismatch). */
function LocalTime() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = () => new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Karachi" }).format(new Date());
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 30_000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{t || "--:--"} PKT</span>;
}

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden pt-[84px]">
      <Atmosphere variant="hero" />

      <div className="container-page grid min-h-[calc(100svh-84px)] items-center gap-6 pb-8 pt-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-4">
        {/* Copy */}
        <div className="relative z-30">
          <div className="anim-enter mb-8 flex flex-wrap items-center gap-3" style={d(0.05)}>
            <span className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2.5 pr-4 text-[13px]">
              <span className="relative grid h-5 w-5 place-items-center rounded-full bg-mint/15">
                <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse-dot" />
              </span>
              Available for new projects
            </span>
            <span className="text-[13px] font-medium text-muted">Mobile apps, AI features and websites</span>
          </div>

          <h1 className="display-xl">
            <span className="block overflow-hidden pb-[0.06em]"><span className="anim-rise block" style={d(0.12)}>Building ideas into</span></span>
            <span className="-mb-[0.12em] block overflow-hidden pb-[0.22em]">
              <span className="anim-rise block" style={d(0.2)}>
                <span className="relative inline-block text-shine">
                  powerful mobile
                  <svg aria-hidden viewBox="0 0 400 18" preserveAspectRatio="none" className="absolute -bottom-[0.14em] left-0 h-[0.16em] w-full overflow-visible">
                    <path d="M3 12 C 70 3, 150 3, 215 9 S 345 16, 397 6" fill="none" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset="1" style={{ animation: "draw 1.3s var(--ease-out-expo) 0.9s forwards" }} />
                  </svg>
                </span>
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]"><span className="anim-rise block" style={d(0.28)}>experiences.</span></span>
          </h1>

          <div className="anim-enter mt-9 grid max-w-[620px] gap-5 sm:grid-cols-[auto_1fr] sm:gap-8" style={d(0.5)}>
            <div className="sm:border-r sm:border-line sm:pr-8">
              <p className="font-display text-[19px] font-semibold tracking-[-0.02em]">{profile.name}</p>
              <p className="mt-1.5 text-[13px] leading-[1.7] text-cyan">
                {profile.roles.split(" · ").map((r) => (
                  <span key={r} className="block">{r}</span>
                ))}
              </p>
            </div>
            <p className="text-[16px] leading-[1.7] text-muted">{profile.heroCopy}</p>
          </div>

          <div className="anim-enter mt-10 flex flex-wrap items-center gap-3" style={d(0.62)}>
            <Button href="#contact">Let&apos;s work together</Button>
            <Button href="#projects" variant="secondary">View projects</Button>
            <Button href={profile.cv.premium} variant="text" icon="download" download className="ml-2">Download CV</Button>
          </div>
        </div>

        {/* Centerpiece */}
        <div className="anim-enter-scale relative order-first mx-auto w-full max-w-[330px] sm:max-w-[440px] lg:order-none lg:max-w-[600px]" style={d(0.15)}>
          <LogoOrbit className="aspect-square w-full">
            {/* Portrait: crisp ring, clean white gap, a soft neutral shadow straight below */}
            <div className="absolute inset-[23%] z-10 rounded-full shadow-[0_34px_60px_-22px_rgb(var(--shadow)/.55),0_10px_22px_-10px_rgb(var(--shadow)/.3)]">
              <div className="relative h-full w-full overflow-hidden rounded-full p-[3px]">
                <div aria-hidden className="absolute -inset-1/2 animate-[orbit_7s_linear_infinite] bg-[conic-gradient(from_0deg,var(--accent),var(--accent-3),var(--accent-2),var(--accent))]" />
                <div className="relative h-full w-full overflow-hidden rounded-full border-[6px] border-ink-850 bg-accent">
                  <Image
                    src={profile.photo}
                    alt="Portrait of Waseem Abbas, Flutter developer"
                    fill
                    priority
                    sizes="(max-width: 1024px) 60vw, 300px"
                    className="translate-y-[6%] scale-[1.12] object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </LogoOrbit>
        </div>
      </div>

      {/* instrument rail */}
      <div className="anim-enter container-page relative z-30 pb-8" style={d(0.85)}>
        <div className="glass grid grid-cols-2 gap-y-4 rounded-2xl px-5 py-4 sm:grid-cols-4 sm:px-0">
          {[
            ["Experience", "3+ years freelance"],
            ["Platforms", "Android & iOS"],
            ["Location", "31.42° N, 73.08° E"],
            ["Local time", <LocalTime key="t" />],
          ].map(([k, v], i) => (
            <div key={String(k)} className={`sm:px-6 ${i > 0 ? "sm:border-l sm:border-line" : ""}`}>
              <p className="text-[13.5px] font-medium text-dim">{k}</p>
              <p className="mt-1 text-[14px] text-text">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
