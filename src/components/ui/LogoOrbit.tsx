const si = (slug: string) => `https://cdn.jsdelivr.net/npm/simple-icons@13.0.0/icons/${slug}.svg`;

type Logo = { name: string; slug: string; color: string };

const INNER: Logo[] = [
  { name: "Flutter", slug: "flutter", color: "#02569B" },
  { name: "Firebase", slug: "firebase", color: "#F5A800" },
  { name: "Dart", slug: "dart", color: "#0175C2" },
];

const OUTER: Logo[] = [
  { name: "Android", slug: "android", color: "#3DDC84" },
  { name: "iOS", slug: "apple", color: "#111111" },
  { name: "Node.js", slug: "nodedotjs", color: "#5FA04E" },
  { name: "AI APIs", slug: "googlegemini", color: "#8E75B2" },
  { name: "Supabase", slug: "supabase", color: "#3ECF8E" },
];

/** A real brand logo on a white tile, kept upright while its ring turns. Name shows on hover. */
function Tile({ logo, angle }: { logo: Logo; angle: number }) {
  return (
    <div className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
        <div style={{ transform: `rotate(${-angle}deg)` }}>
          <div className="orbit-counter">
            <div className="orbit-tile group/orbit relative grid h-10 w-10 place-items-center rounded-2xl bg-[#ffffff] shadow-[0_10px_24px_-10px_rgb(20_15_10/.45),0_1px_2px_rgb(20_15_10/.12)] ring-1 ring-[#000000]/[0.06] transition-transform duration-500 ease-[var(--ease-out-expo)] hover:scale-125 sm:h-[52px] sm:w-[52px]">
              <span
                aria-hidden
                className="block h-5 w-5 sm:h-[26px] sm:w-[26px]"
                style={{ backgroundColor: logo.color, WebkitMask: `url(${si(logo.slug)}) center/contain no-repeat`, mask: `url(${si(logo.slug)}) center/contain no-repeat` }}
              />
              <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-fg px-2.5 py-1 text-[11.5px] font-semibold text-ink-950 opacity-0 transition-opacity duration-300 group-hover/orbit:opacity-100">
                {logo.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Ring({ logos, inset, duration, reverse, offset = 0, dashed }: { logos: Logo[]; inset: string; duration: number; reverse?: boolean; offset?: number; dashed?: boolean }) {
  return (
    <div className="absolute" style={{ inset, ["--d" as string]: `${duration}s`, ["--dir" as string]: reverse ? "reverse" : "normal" }}>
      <div className={`absolute inset-0 rounded-full border border-line-strong ${dashed ? "border-dashed" : ""}`} />
      <div className="orbit-spin absolute inset-0">
        {logos.map((l, i) => (
          <Tile key={l.name} logo={l} angle={offset + (360 / logos.length) * i} />
        ))}
      </div>
    </div>
  );
}

/** Tech stack orbiting the portrait: two hairline rings with real logos. */
export function LogoOrbit({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`orbit-stage relative ${className}`} role="group" aria-label={`Tech stack: ${[...INNER, ...OUTER].map((l) => l.name).join(", ")}`}>
      <Ring logos={OUTER} inset="3.5%" duration={64} offset={20} />
      <Ring logos={INNER} inset="14.5%" duration={44} reverse dashed />
      {children}
    </div>
  );
}
