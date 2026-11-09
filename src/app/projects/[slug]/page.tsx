import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/layout/Nav";
import { Ambient } from "@/components/background/Ambient";
import { Footer } from "@/components/layout/Footer";
import { Atmosphere } from "@/components/background/Atmosphere";
import { Stage } from "@/components/ui/Stage";
import { Phone } from "@/components/ui/Phone";
import { Button } from "@/components/ui/Button";
import { Spotlight } from "@/components/ui/Interactive";
import { MaskLines, Reveal, SectionLabel } from "@/components/ui/Reveal";
import { caseStudies } from "@/content/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

const find = (slug: string) => caseStudies.find((p) => p.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = find((await params).slug);
  if (!p) return {};
  return { title: `${p.name} case study`, description: p.description, alternates: { canonical: `/projects/${p.slug}` } };
}

function statusTone(status: string) {
  if (status.startsWith("Live")) return "bg-mint/10 text-mint ring-mint/25";
  if (status === "Completed") return "bg-cyan/10 text-cyan ring-cyan/25";
  return "bg-amber-300/10 text-amber-200 ring-amber-300/25";
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = find((await params).slug);
  if (!p) notFound();
  const idx = caseStudies.findIndex((x) => x.slug === p.slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  const meta = [
    { label: "Category", value: p.category },
    ...(p.status ? [{ label: "Status", value: p.status }] : []),
    { label: "Built with", value: p.tech.slice(0, 3).join(", ") },
    ...(p.facts ? p.facts.filter((f) => f.label !== "My role").slice(0, 1) : [{ label: "Platforms", value: "Android & iOS (Flutter)" }]),
  ].slice(0, 4);

  // Only real, known content. The longer story exists for GreenScan; the others use their description.
  const story = p.caseStudy
    ? [
        { label: "The need", body: p.caseStudy.need },
        { label: "The solution", body: p.caseStudy.solution },
        { label: "My role", body: p.role },
      ]
    : [
        { label: "The app", body: p.description },
        { label: "My role", body: p.role },
      ];

  return (
    <>
      <Ambient />
      <Nav base="" />
      <main id="main">
        {/* Cover */}
        <section className="relative isolate overflow-hidden pb-14 pt-[110px] md:pt-[130px]">
          <Atmosphere variant="hero" />
          <div className="container-page">
            <Link href="/#projects" className="group mb-10 inline-flex items-center gap-2 rounded-full border border-fg/10 bg-fg/[0.03] py-2 pl-3 pr-4 text-[13.5px] text-muted transition-colors hover:border-fg/25 hover:text-text">
              <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" /> All projects
            </Link>

            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-14">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="glass rounded-full px-3 py-1 text-[13px] font-medium text-text/80">Case {String(idx + 1).padStart(2, "0")}</span>
                  <span className="text-[13.5px] font-medium text-dim">{p.category}</span>
                  {p.status && <span className={`rounded-full px-3 py-1 text-[12.5px] ring-1 ${statusTone(p.status)}`}>{p.status}</span>}
                </div>
                <div className="mt-7 flex items-center gap-4">
                  {p.icon && <Image src={p.icon} alt="" width={64} height={64} priority className="rounded-[18px] ring-1 ring-fg/10 shadow-[0_14px_34px_-12px_rgb(0_0_0/.9)]" />}
                  <MaskLines as="h1" lines={[p.name]} className="font-display text-[clamp(2.3rem,5vw,4.2rem)] font-semibold leading-[1] tracking-[-0.04em]" />
                </div>
                <Reveal delay={0.12}>
                  <p className="mt-5 font-display text-[clamp(1.3rem,2.2vw,1.75rem)] font-medium tracking-[-0.02em] text-cyan">
                    {p.tagline}
                  </p>
                  <p className="mt-5 max-w-[56ch] text-[16.5px] leading-[1.75] text-muted">{p.description}</p>
                  {p.links && (
                    <div className="mt-9 flex flex-wrap gap-3">
                      {p.links.map((l, i) => (
                        <Button key={l.href} href={l.href} variant={i === 0 ? "primary" : "secondary"} icon="external" external>
                          {l.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </Reveal>
              </div>
              <Reveal y={40} blur>
                <Stage p={p} />
              </Reveal>
            </div>

            {/* Meta strip */}
            <Reveal className="mt-14">
              <dl className="glass grid gap-y-5 rounded-[24px] px-6 py-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-0">
                {meta.map((m, i) => (
                  <div key={m.label} className={`lg:px-7 ${i > 0 ? "lg:border-l lg:border-fg/10" : ""}`}>
                    <dt className="text-[13.5px] font-medium text-dim">{m.label}</dt>
                    <dd className="mt-1.5 text-[15px] leading-snug text-text">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* Story */}
        <section className="container-page py-16 md:py-24">
          <SectionLabel index="01" label="The story" className="mb-8" />
          {p.caseStudy && (
            <Reveal>
              <p className="max-w-[30ch] font-display text-[clamp(1.6rem,3.2vw,2.6rem)] font-semibold leading-[1.2] tracking-[-0.03em]">{p.caseStudy.overview}</p>
            </Reveal>
          )}
          <div className={`grid gap-4 ${p.caseStudy ? "mt-12 md:grid-cols-3" : "md:grid-cols-2"}`}>
            {story.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.09} flip className="h-full">
                <Spotlight className="glass group flood-card card-fx h-full overflow-hidden rounded-[24px] p-6 md:p-7">
                  <span aria-hidden className="fill-fx" />
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-[13px] font-semibold text-on-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-[13.5px] font-medium text-muted">{c.label}</h2>
                  </div>
                  <p className="mt-5 text-[16.5px] leading-[1.7] text-text/90">{c.body}</p>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </section>

        {p.features && (
          <section className="container-page pb-16 md:pb-24">
            <SectionLabel index="02" label="What it does" className="mb-8" />
            <MaskLines lines={["Main features"]} className="display-lg mb-12" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {p.features.map((f, i) => (
                <Reveal key={f.title} delay={(i % 3) * 0.09} flip className="h-full">
                  <Spotlight className="glass group card-fx h-full overflow-hidden rounded-[24px] p-6">
                    <span aria-hidden className="fill-fx" />
                    <span className="text-[13px] font-medium text-cyan transition-colors duration-300 group-hover:text-on-accent">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-4 font-display text-[20px] font-semibold tracking-[-0.02em] transition-colors duration-300 group-hover:text-on-accent">{f.title}</h3>
                    <p className="mt-2 text-[15px] leading-[1.65] text-muted transition-colors duration-300 group-hover:text-on-accent">{f.text}</p>
                  </Spotlight>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {p.howItWorks && (
          <section className="container-page pb-16 md:pb-24">
            <SectionLabel index="03" label="Architecture" className="mb-8" />
            <MaskLines lines={["How it works"]} className="display-lg mb-12" />
            <Reveal>
              <ol className="glass grid gap-px overflow-hidden rounded-[24px] bg-fg/[0.06] sm:grid-cols-2 lg:grid-cols-3">
                {p.howItWorks.map((h, i) => (
                  <li key={h.label} className="bg-ink-900/90 p-6">
                    <div className="flex items-center gap-3">
                      <span className="text-[13px] font-medium text-cyan">{String(i + 1).padStart(2, "0")}</span>
                      <span className="h-px flex-1 bg-gradient-to-r from-accent to-transparent" />
                    </div>
                    <p className="mt-4 font-display text-[19px] font-semibold tracking-[-0.02em]">{h.label}</p>
                    <p className="mt-1.5 text-[14px] leading-[1.7] text-muted">{h.detail}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </section>
        )}

        {p.images.length > 0 && (
          <section className="container-page pb-16 md:pb-24">
            <SectionLabel index={p.howItWorks ? "04" : "03"} label="Gallery" className="mb-8" />
            <MaskLines lines={["Screens"]} className="display-lg mb-12" />
            <ul className={`grid gap-4 ${p.images.length === 3 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2 md:grid-cols-4"}`} aria-label={`${p.name} screenshots`}>
              {p.images.map((img, i) => (
                <li key={img.src}>
                  <Reveal delay={(i % 4) * 0.05} y={24}>
                    <div className="group relative aspect-[9/16] overflow-hidden rounded-[20px] border border-fg/10 shadow-[0_30px_60px_-30px_rgb(0_0_0/.9)]">
                      <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]" />
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* CTA */}
        <section className="container-page pb-16 md:pb-24">
          <Reveal y={30}>
            <div className="glass relative overflow-hidden rounded-[32px] p-8 md:p-12">
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full" style={{ background: `radial-gradient(closest-side, ${p.accent}40, transparent)` }} />
              <div className="relative grid items-end gap-8 md:grid-cols-[1fr_auto]">
                <div>
                  <p className="text-[13.5px] font-medium text-dim">Built with</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => <span key={t} className="rounded-md bg-fg/[0.06] px-2 py-1 text-[13px] font-medium text-text/80">{t}</span>)}
                  </div>
                  <p className="mt-8 max-w-[18ch] font-display text-[clamp(1.9rem,3.6vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
                    Need an app <span className="text-shine">like this?</span>
                  </p>
                </div>
                <Button href="/#contact">Let&apos;s talk</Button>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Next project */}
        {next.slug !== p.slug && (
          <section className="container-page pb-24">
            <Link href={`/projects/${next.slug}`} className="glass card-fx group relative flex items-center justify-between gap-6 overflow-hidden rounded-[32px] p-8 md:p-12">
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{ background: `radial-gradient(60% 80% at 80% 50%, ${next.accent}26, transparent 70%)` }} />
              <div className="relative">
                <p className="text-[13.5px] font-medium text-dim">Next case study</p>
                <div className="mt-4 flex items-center gap-4">
                  {next.icon && <Image src={next.icon} alt="" width={52} height={52} className="rounded-[14px] ring-1 ring-fg/10" />}
                  <span className="font-display text-[clamp(1.9rem,4.6vw,3.6rem)] font-semibold leading-none tracking-[-0.04em] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                    {next.name}
                  </span>
                </div>
                <p className="mt-3 text-[15px] text-cyan">{next.tagline}</p>
              </div>
              {next.screens?.[0] && (
                <div className="relative hidden w-[120px] shrink-0 rotate-[6deg] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2 group-hover:rotate-[2deg] md:block">
                  <Phone src={next.screens[0].src} alt="" sizes="120px" className="relative" />
                </div>
              )}
              <ArrowUpRight size={40} strokeWidth={1.2} aria-hidden className="relative shrink-0 text-dim transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan md:hidden" />
            </Link>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
