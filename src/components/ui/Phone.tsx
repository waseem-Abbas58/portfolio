import Image from "next/image";

/**
 * Realistic modern iPhone-style frame for real app screenshots:
 * titanium edge, side buttons, black bezel, Dynamic Island, glass reflection.
 * No `position` class here: callers decide (absolute/relative).
 */
export function Phone({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 45vw, 260px",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`aspect-[9/19.4] ${className}`}>
      <div className="relative h-full w-full">
        {/* side buttons */}
        <span aria-hidden className="absolute left-[-1.6%] top-[17%] h-[4%] w-[1.8%] rounded-l-sm bg-gradient-to-b from-[#c9cdd3] to-[#6b6f76]" />
        <span aria-hidden className="absolute left-[-1.6%] top-[24%] h-[7.5%] w-[1.8%] rounded-l-sm bg-gradient-to-b from-[#c9cdd3] to-[#6b6f76]" />
        <span aria-hidden className="absolute left-[-1.6%] top-[33%] h-[7.5%] w-[1.8%] rounded-l-sm bg-gradient-to-b from-[#c9cdd3] to-[#6b6f76]" />
        <span aria-hidden className="absolute right-[-1.6%] top-[26%] h-[11%] w-[1.8%] rounded-r-sm bg-gradient-to-b from-[#c9cdd3] to-[#6b6f76]" />

        {/* titanium frame */}
        <div className="relative h-full w-full rounded-[15%/7%] bg-[linear-gradient(140deg,#e4e7ec_0%,#7d828a_18%,#3a3d43_35%,#c3c7cd_52%,#45484f_70%,#9a9ea5_88%,#e1e4e8_100%)] p-[1.4%] shadow-[0_50px_80px_-30px_rgb(0_0_0/.95),0_20px_40px_-20px_rgb(0_0_0/.8)]">
          {/* bezel */}
          <div className="relative h-full w-full rounded-[14%/6.5%] bg-[#050505] p-[3.2%] shadow-[inset_0_0_0_1px_rgb(255_255_255/.06)]">
            {/* screen */}
            <div className="relative h-full w-full overflow-hidden rounded-[11.5%/5.4%] bg-white">
              <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
              {/* glass reflection */}
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,rgb(255_255_255/.22)_0%,rgb(255_255_255/.06)_28%,transparent_42%)]" />
            </div>
            {/* Dynamic Island */}
            <div aria-hidden className="absolute left-1/2 top-[2.6%] h-[3.3%] w-[31%] -translate-x-1/2 rounded-full bg-black">
              <span className="absolute right-[14%] top-1/2 h-[42%] aspect-square -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#2a3550,#05070d)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
