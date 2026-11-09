import { Phone } from "@/components/ui/Phone";
import { Tilt } from "@/components/ui/Interactive";
import type { Project } from "@/content/projects";

/** Three-phone product stage: centre phone upright, side phones angled in 3D, a light beam and floor shadow. */
export function Stage({ p }: { p: Project }) {
  const s = p.screens!;
  const [center, left, right] = [s[0], s[1], s[2]];
  return (
    <Tilt max={5} className="relative">
      <div
        className="relative aspect-[5/4.4] w-full overflow-hidden rounded-[32px] shadow-[0_50px_90px_-45px_rgb(var(--shadow)/.75)]"
        style={{ background: `radial-gradient(75% 65% at 50% 35%, ${p.accent}55, transparent 72%), var(--stage)` }}
      >
        {/* light beam from the top-left */}
        <div aria-hidden className="absolute -left-[20%] -top-[30%] h-[140%] w-[55%] rotate-[24deg] bg-gradient-to-b from-[#ffffff]/[0.10] via-[#ffffff]/[0.04] to-transparent" />
        {/* floor */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-b from-transparent to-black/50" />
        <div aria-hidden className="absolute bottom-[6%] left-1/2 h-[8%] w-[70%] -translate-x-1/2 rounded-[50%] bg-black/70 blur-xl" />

        <div className="absolute inset-0 [perspective:1400px]">
          <div className="absolute bottom-[11%] left-[7%] w-[29%] [transform:rotateY(32deg)_translateZ(-40px)] [transform-origin:right_center]">
            <div className="[transform:translate3d(calc(var(--tx,0)*-10px),calc(var(--ty,0)*-6px),0)] transition-transform duration-500">
              <Phone src={left.src} alt={left.alt} sizes="200px" className="relative brightness-[.88]" />
            </div>
          </div>
          <div className="absolute bottom-[11%] right-[7%] w-[29%] [transform:rotateY(-32deg)_translateZ(-40px)] [transform-origin:left_center]">
            <div className="[transform:translate3d(calc(var(--tx,0)*-10px),calc(var(--ty,0)*-6px),0)] transition-transform duration-500">
              <Phone src={right.src} alt={right.alt} sizes="200px" className="relative brightness-[.88]" />
            </div>
          </div>
          <div className="absolute bottom-[8%] left-1/2 w-[34%] -translate-x-1/2">
            <div className="[transform:translate3d(calc(var(--tx,0)*14px),calc(var(--ty,0)*8px),0)] transition-transform duration-500">
              <Phone src={center.src} alt={center.alt} sizes="(max-width: 768px) 40vw, 240px" className="relative" />
            </div>
          </div>
        </div>
      </div>
    </Tilt>
  );
}

