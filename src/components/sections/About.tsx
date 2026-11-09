import Image from "next/image";
import { MapPin } from "lucide-react";
import { Atmosphere } from "@/components/background/Atmosphere";
import { Reveal, SectionHead } from "@/components/ui/Reveal";
import { Spotlight, Tilt } from "@/components/ui/Interactive";
import { Button } from "@/components/ui/Button";
import { about, profile } from "@/content/profile";

export function About() {
  const [lead, ...rest] = about.paragraphs;
  return (
    <section id="about" className="relative isolate py-20 md:py-28">
      <Atmosphere variant="about" />
      <div className="container-page grid items-start gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* portrait object */}
        <Reveal x={-30} y={0} className="relative mx-auto w-full max-w-[440px] lg:sticky lg:top-28">
          <Tilt className="relative">
            <div className="ring-light glass relative aspect-[4/5] overflow-hidden rounded-[32px] p-2.5">
              <div className="relative h-full w-full overflow-hidden rounded-[24px] bg-accent">
                                <Image
                  src={profile.photo}
                  alt="Waseem Abbas"
                  fill
                  sizes="(max-width: 1024px) 90vw, 440px"
                  className="object-contain object-bottom [mask-image:linear-gradient(to_bottom,#000_80%,transparent)] [transform:translate3d(calc(var(--tx,0)*10px),calc(var(--ty,0)*6px),0)_scale(1.04)] transition-transform duration-300"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#000000]/75 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                  <div>
                    <p className="font-display text-[20px] font-semibold tracking-[-0.02em] text-[#ffffff]">{profile.name}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-[13px] text-[#ffffff]/80"><MapPin size={13} /> {profile.location}</p>
                  </div>
                  <span className="glass rounded-full px-3 py-1 text-[13px] font-medium text-cyan">BSCS, GCUF</span>
                </div>
              </div>
            </div>
            {/* floating detail */}
            <div className="glass absolute -right-4 top-10 hidden rounded-2xl px-4 py-3 [transform:translateZ(40px)] sm:block">
              <p className="font-display text-[28px] font-semibold leading-none tracking-[-0.03em] text-shine">3+</p>
              <p className="mt-1 text-[11.5px] text-muted">years freelancing</p>
            </div>
          </Tilt>
        </Reveal>

        <div>
          <SectionHead
            index="01"
            label="About"
            lines={["From a Figma file", <span key="b">to an app <span className="text-shine">in the store.</span></span>]}
            className="!mb-10"
          />
          <Reveal blur>
            <p className="font-display text-[21px] font-medium leading-[1.5] tracking-[-0.015em] text-text md:text-[25px]">{lead}</p>
          </Reveal>
          <Reveal delay={0.08} className="mt-7 space-y-5 text-[16.5px] leading-[1.75] text-muted">
            {rest.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-3">
            {about.highlights.map((h, i) => (
              <Reveal key={h.label} delay={0.07 * i} flip>
                <Spotlight className="glass group card-fx h-full overflow-hidden rounded-2xl p-5">
                  <span aria-hidden className="fill-fx" />
                  <p className="text-[13.5px] font-medium text-dim transition-colors duration-300 group-hover:text-on-accent">{h.label}</p>
                  <p className="mt-2 font-display text-[21px] font-semibold tracking-[-0.025em] transition-colors duration-300 group-hover:text-on-accent">{h.value}</p>
                </Spotlight>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12} className="mt-10 flex flex-wrap items-center gap-3">
            <Button href={profile.cv.premium} icon="download" download>Download CV</Button>
            <Button href={profile.cv.ats} variant="secondary" icon="download" download>ATS version</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
