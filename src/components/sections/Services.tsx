import { Atmosphere } from "@/components/background/Atmosphere";
import { Icon } from "@/components/ui/Icon";
import { Reveal, SectionHead } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Interactive";
import { Button } from "@/components/ui/Button";
import { services } from "@/content/profile";

/**
 * Services as offerings: a sticky statement on the left, a stack of glass
 * panels on the right. Each panel lights its border and icon on hover.
 */
export function Services() {
  return (
    <section id="services" className="relative isolate overflow-hidden py-20 md:py-28">
      <Atmosphere variant="services" />
      <div className="container-page grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            index="04"
            label="Services"
            lines={["What I can", <span key="b"><span className="text-shine">build</span> for you.</span>]}
            intro="Each of these is work I've already done on real projects, from the first screen to the Play Store release."
            className="!mb-10"
          />
          <Reveal delay={0.2} className="glass rounded-[28px] p-6">
            <p className="font-display text-[20px] font-semibold tracking-[-0.02em]">Have something in mind?</p>
            <p className="mt-2 text-[14.5px] leading-[1.6] text-muted">Tell me what you&apos;re building and I&apos;ll tell you how I would approach it.</p>
            <div className="mt-5">
              <Button href="#contact">Start a project</Button>
            </div>
          </Reveal>
        </div>

        <ol className="grid gap-3 sm:grid-cols-2">
          {services.map((s, i) => (
            <li key={s.title} className={i === 0 ? "sm:col-span-2" : ""}>
              <Reveal delay={(i % 2) * 0.09} flip className="h-full">
                <Spotlight className="glass group card-fx h-full overflow-hidden rounded-[24px] p-6">
                  <span aria-hidden className="fill-fx" />
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent transition-[background-color,transform] duration-500 group-hover:rotate-[-8deg] group-hover:bg-on-accent">
                      <Icon name={s.icon} size={21} className="text-on-accent transition-colors duration-500 group-hover:text-accent" />
                    </span>
                  </div>
                  <h3 className={`mt-6 font-display font-semibold tracking-[-0.025em] transition-colors duration-300 group-hover:text-on-accent ${i === 0 ? "text-[26px]" : "text-[20px]"}`}>{s.title}</h3>
                  <p className="mt-2.5 text-[14.5px] leading-[1.65] text-muted transition-colors duration-300 group-hover:text-on-accent">{s.text}</p>
                </Spotlight>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
