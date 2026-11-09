"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Briefcase, GraduationCap, Languages } from "lucide-react";
import { Atmosphere } from "@/components/background/Atmosphere";
import { Reveal, SectionHead } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Interactive";
import { education, experience, languages } from "@/content/profile";

/** Timeline whose light line draws itself as you scroll through the work. */
export function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="experience" className="relative isolate py-20 md:py-28">
      <Atmosphere variant="experience" />
      <div className="container-page">
        <SectionHead index="06" label="Experience" lines={["Where I've", <span key="b">done <span className="text-shine">the work.</span></span>]} />

        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-12">
          {experience.map((e) => (
            <Spotlight key={e.role} as="article" className="glass rounded-[32px] p-6 sm:p-9">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-on-accent">
                    <Briefcase size={20} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-[22px] font-semibold leading-tight tracking-[-0.025em] sm:text-[28px]">{e.role}</h3>
                    <p className="mt-1 text-[14.5px] text-muted">{e.org}</p>
                  </div>
                </div>
                <span className="flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-[13px] font-medium text-mint">
                  <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse-dot" /> {e.period} and counting
                </span>
              </div>

              <ol ref={ref} className="relative mt-9 pl-8">
                <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-fg/10" />
                <motion.span
                  aria-hidden
                  style={{ scaleY: reduce ? 1 : scaleY }}
                  className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-accent"
                />
                {e.points.map((pt, i) => (
                  <li key={pt} className="relative pb-6 last:pb-0">
                    <span aria-hidden className="absolute -left-8 top-[5px] grid h-[15px] w-[15px] place-items-center rounded-full border border-accent bg-ink-850">
                      <span className="h-[5px] w-[5px] rounded-full bg-accent" />
                    </span>
                    <Reveal delay={i * 0.03} x={16} y={0} className="text-[15.5px] leading-[1.65] text-text/85">
                      {pt}
                    </Reveal>
                  </li>
                ))}
              </ol>
            </Spotlight>
          ))}

          <div className="grid content-start gap-4">
            {education.map((ed) => (
              <Reveal key={ed.degree} flip>
                <Spotlight className="glass group flood-card card-fx overflow-hidden rounded-[28px] p-6">
                  <span aria-hidden className="fill-fx" />
                  <p className="flex items-center gap-2 text-[13.5px] font-medium text-cyan"><GraduationCap size={15} aria-hidden /> Education</p>
                  <h3 className="mt-4 font-display text-[22px] font-semibold tracking-[-0.025em]">{ed.degree}</h3>
                  <p className="mt-1 text-[14.5px] text-muted">{ed.org}</p>
                  <p className="mt-4 inline-block rounded-full bg-fg/[0.05] px-3 py-1 text-[13px] font-medium text-text/80">{ed.period}</p>
                </Spotlight>
              </Reveal>
            ))}
            <Reveal flip delay={0.1}>
              <Spotlight className="glass group flood-card card-fx overflow-hidden rounded-[28px] p-6">
                  <span aria-hidden className="fill-fx" />
                <p className="flex items-center gap-2 text-[13.5px] font-medium text-cyan"><Languages size={15} aria-hidden /> Languages</p>
                <ul className="mt-4 space-y-3">
                  {languages.map((l) => (
                    <li key={l.name} className="flex items-center justify-between gap-4">
                      <span className="text-[16px]">{l.name}</span>
                      <span className="flex items-center gap-2 text-[12.5px] text-muted">
                        <span className="flex gap-0.5" aria-hidden>
                          {[0, 1, 2].map((d) => (
                            <span key={d} className="h-1.5 w-3 rounded-full bg-accent" />
                          ))}
                        </span>
                        {l.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </Spotlight>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
