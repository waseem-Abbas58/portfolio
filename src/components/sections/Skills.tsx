import { Atmosphere } from "@/components/background/Atmosphere";
import { BrandLogo, Icon } from "@/components/ui/Icon";
import { Reveal, SectionHead } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Interactive";
import { skillGroups, type SkillGroup } from "@/content/profile";

// Bento placement per group (12-col grid on large screens).
const layout = [
  "lg:col-span-6 lg:row-span-2", // Mobile
  "lg:col-span-6", // Backend
  "lg:col-span-3", // AI
  "lg:col-span-7 lg:order-last", // Workflow
  "lg:col-span-3", // Design
  "lg:col-span-5 lg:order-last", // Deployment
];

export function Skills() {
  return (
    <section id="skills" className="relative isolate py-20 md:py-28">
      <Atmosphere variant="skills" />
      <div className="container-page">
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <SectionHead
            index="05"
            label="Skills & expertise"
            lines={["The toolkit behind", <span key="b">every <span className="text-shine">shipped</span> app.</span>]}
          />
          <Reveal className="mb-14 max-w-[44ch] text-[16px] leading-[1.7] text-muted md:mb-20">
            Grouped the way a project actually flows: the app, the backend behind it, the AI on top, and the work that gets it to users.
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[minmax(190px,auto)]">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={(i % 3) * 0.09} flip className={layout[i] ?? "lg:col-span-4"}>
              <Panel g={g} i={i} big={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Panel({ g, i, big }: { g: SkillGroup; i: number; big: boolean }) {
  const hero = g.items.find((s) => s.logo)?.logo;
  return (
    <Spotlight className="glass group flood-card card-fx relative flex h-full flex-col overflow-hidden rounded-[28px] p-6 md:p-7">
      <span aria-hidden className="fill-fx" />
      {/* watermark logo */}
      {hero && (
        <BrandLogo
          src={hero}
          color="color-mix(in srgb, var(--fg) 7%, transparent)"
          className={`absolute -bottom-8 -right-8 transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:-translate-y-2 group-hover:rotate-[-6deg] ${big ? "h-64 w-64" : "h-36 w-36"}`}
        />
      )}
      <div className="relative flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-[-8deg] group-hover:scale-110">
          <Icon name={g.icon} size={20} className="text-on-accent" />
        </span>
      </div>
      <h3 className={`relative mt-6 font-display font-semibold tracking-[-0.03em] ${big ? "text-[30px] md:text-[38px]" : "text-[22px]"}`}>{g.title}</h3>
      {big && <p className="relative mt-2 max-w-[38ch] text-[15px] leading-[1.6] text-muted">One Flutter codebase, shipped natively to Android and iOS.</p>}
      {big ? (
        <ul className="relative mt-auto grid grid-cols-2 gap-3 pt-8 sm:grid-cols-3">
          {g.items.map((s) => (
            <li
              key={s.name}
              className="flood-chip group/tile flex flex-col items-start gap-4 rounded-2xl border border-fg/10 bg-fg/[0.03] p-4 transition-[border-color,transform] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-accent"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-fg/[0.06] transition-[background-color,transform] duration-500 group-hover/tile:rotate-[-8deg] group-hover/tile:scale-110 group-hover/tile:bg-accent">
                {s.logo ? <BrandLogo src={s.logo} className="h-5 w-5" color="var(--accent-text)" /> : <span className="font-display text-[15px] font-semibold text-cyan">{s.name.slice(0, 2)}</span>}
              </span>
              <span className="text-[15px] font-medium text-text/90">{s.name}</span>
            </li>
          ))}
        </ul>
      ) : (
      <ul className="relative mt-auto flex flex-wrap gap-2 pt-7">
        {g.items.map((s) => (
          <li
            key={s.name}
            className={`flood-chip flex items-center gap-2 rounded-xl border border-fg/10 bg-fg/[0.04] text-text/90 transition-colors duration-300 group-hover:border-fg/15 ${big ? "px-3.5 py-2.5 text-[15px]" : "px-3 py-2 text-[13.5px]"}`}
          >
            {s.logo ? <BrandLogo src={s.logo} className={big ? "h-4 w-4" : "h-3.5 w-3.5"} color="var(--accent-text)" /> : <span className="h-1.5 w-1.5 rounded-full bg-cyan/70" aria-hidden />}
            {s.name}
          </li>
        ))}
      </ul>
      )}
    </Spotlight>
  );
}
