/** Full-width moving strip of big words: an editorial divider between sections. */
export function Ticker({ words, reverse }: { words: string[]; reverse?: boolean }) {
  const row = [...words, ...words, ...words, ...words];
  return (
    <div
      className="relative z-10 overflow-hidden bg-accent py-4 text-on-accent md:py-5"
      aria-label={words.join(", ")}
      role="img"
    >
      <div className={`flex w-max items-center ${reverse ? "[animation:marquee_130s_linear_infinite_reverse]" : "[animation:marquee_130s_linear_infinite]"}`} aria-hidden>
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center font-display text-[clamp(1.5rem,3.2vw,2.6rem)] font-bold tracking-[-0.03em]">
            <span className="px-6 md:px-8">{w}</span>
            <svg viewBox="0 0 24 24" className="h-[0.7em] w-[0.7em] shrink-0" fill="currentColor">
              <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
