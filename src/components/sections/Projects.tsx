import Image from "next/image";
import { Atmosphere } from "@/components/background/Atmosphere";
import { Stage } from "@/components/ui/Stage";
import { Button } from "@/components/ui/Button";
import { Reveal, SectionHead } from "@/components/ui/Reveal";
import { hasCaseStudy, projects, type Project } from "@/content/projects";
import { profile } from "@/content/profile";

export function Projects() {
  const sorted = [...projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  const showcased = sorted.filter(hasCaseStudy);
  const rest = sorted.filter((p) => !hasCaseStudy(p));

  return (
    <section id="projects" className="relative isolate py-20 md:py-28">
      <Atmosphere variant="projects" />
      <div className="container-page">
        <SectionHead
          index="02"
          label="Selected work"
          lines={["Apps I've designed,", <span key="b">built and <span className="text-shine">shipped.</span></span>]}
          intro="Real apps with real screens, followed by the other projects from my CV."
        />
      </div>

      <div className="space-y-28 md:space-y-36">
        {showcased.map((p, i) => (
          <Showcase key={p.slug} p={p} n={i + 1} flip={i % 2 === 1} />
        ))}
      </div>

      {rest.length > 0 && (
        <div className="container-page mt-28">
          <Reveal y={30}>
            <div className="glass rounded-[28px] p-6 sm:p-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[13.5px] font-medium text-muted">Also built</p>
                  <p className="mt-2 max-w-[48ch] text-[14.5px] leading-[1.6] text-dim">Other Flutter apps from my CV. Details and screens on request.</p>
                </div>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-line text-[14px] text-text">More on GitHub</a>
              </div>
              <ul className="mt-6 divide-y divide-fg/[0.07] border-t border-fg/[0.07]">
                {rest.map((p) => (
                  <li key={p.slug}>
                    <div className="group flex flex-wrap items-center gap-x-6 gap-y-2 py-5">
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: p.accent, boxShadow: `0 0 12px ${p.accent}` }} />
                      <span className="min-w-[160px] font-display text-[20px] font-semibold tracking-[-0.025em] transition-transform duration-500 group-hover:translate-x-1">{p.name}</span>
                      <span className="flex-1 text-[14.5px] text-muted">{p.description}</span>
                      <span className="hidden gap-1.5 md:flex">
                        {p.tech.map((t) => <span key={t} className="rounded-md bg-fg/[0.05] px-2 py-1 text-[13px] font-medium text-text/75">{t}</span>)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      )}
    </section>
  );
}

function Showcase({ p, n, flip }: { p: Project; n: number; flip: boolean }) {
  const play = p.links?.find((l) => l.href.includes("play.google"));
  return (
    <article>
      <div className="container-page grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <Reveal y={40} blur className={flip ? "lg:order-2" : ""}>
          <Stage p={p} />
        </Reveal>

        <div className={flip ? "lg:order-1" : ""}>
          <Reveal x={flip ? -24 : 24} y={0}>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="glass rounded-full px-3 py-1 text-[13px] font-medium text-text/80">Case {String(n).padStart(2, "0")}</span>
              <span className="text-[13.5px] font-medium text-dim">{p.category}</span>
              {p.status && (
                <span
                  className={`flex items-center gap-2 rounded-full px-3 py-1 text-[12.5px] ring-1 ${statusTone(p.status).pill}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${statusTone(p.status).dot}`} /> {p.status}
                </span>
              )}
            </div>
            <div className="mt-7 flex items-center gap-4">
              {p.icon && <Image src={p.icon} alt="" width={60} height={60} className="rounded-[18px] shadow-[0_12px_30px_-10px_rgb(0_0_0/.8)] ring-1 ring-fg/10" />}
              <h3 className="font-display text-[clamp(2.1rem,4.2vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.04em]">{p.name}</h3>
            </div>
            <p className="mt-5 font-display text-[clamp(1.25rem,2vw,1.6rem)] font-medium tracking-[-0.02em] text-cyan">
              {p.tagline}
            </p>
            <p className="mt-5 max-w-[54ch] text-[16px] leading-[1.75] text-muted">{p.description}</p>
          </Reveal>

          {p.features && (
            <Reveal delay={0.08}>
              <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
                {p.features.slice(0, 6).map((f, i) => (
                  <li key={f.title} className="flex items-center gap-3 rounded-xl border border-fg/10 bg-fg/[0.03] px-3.5 py-2.5 text-[14.5px] transition-[transform,border-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-accent">
                    <span className="text-[13px] font-medium text-cyan">{String(i + 1).padStart(2, "0")}</span>
                    {f.title}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          <Reveal delay={0.12} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href={`/projects/${p.slug}`}>Read the case study</Button>
            {play && (
              <Button href={play.href} variant="secondary" icon="external" external>
                Google Play
              </Button>
            )}
          </Reveal>

          <Reveal delay={0.16} className="mt-8 flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <span key={t} className="rounded-md bg-fg/[0.06] px-2 py-1 text-[13px] font-medium text-text/75">{t}</span>
            ))}
          </Reveal>
        </div>
      </div>

      {p.images.length > 0 && <Marquee images={p.images} label={`${p.name} screenshots`} reverse={flip} />}
    </article>
  );
}

/** Real store images drifting past; pauses on hover. */
function Marquee({ images, label, reverse }: { images: { src: string; alt: string }[]; label: string; reverse?: boolean }) {
  // Repeat just enough to fill wide screens, then double once for the seamless loop.
  const row = images.length >= 7 ? images : [...images, ...images];
  return (
    <div className="group relative mt-14 overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]" aria-label={label} role="region">
      <ul className={`flex w-max gap-4 group-hover:[animation-play-state:paused] ${reverse ? "[animation:marquee_70s_linear_infinite_reverse]" : "[animation:marquee_70s_linear_infinite]"}`}>
        {[...row, ...row].map((img, i) => (
          <li key={i} aria-hidden={i >= images.length} className="relative aspect-[9/16] w-[150px] shrink-0 overflow-hidden rounded-2xl border border-fg/10 shadow-[0_20px_50px_-25px_rgb(0_0_0/.9)] sm:w-[180px]">
            <Image src={img.src} alt={i >= images.length ? "" : img.alt} fill sizes="180px" className="object-cover" />
          </li>
        ))}
      </ul>
    </div>
  );
}

function statusTone(status: string) {
  if (status.startsWith("Live")) return { pill: "bg-mint/10 text-mint ring-mint/25", dot: "bg-mint animate-pulse-dot" };
  if (status === "Completed") return { pill: "bg-cyan/10 text-cyan ring-cyan/25", dot: "bg-cyan" };
  return { pill: "bg-amber-300/10 text-amber-200 ring-amber-300/25", dot: "bg-amber-300" };
}
