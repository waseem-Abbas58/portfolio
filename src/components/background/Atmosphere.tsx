/**
 * Per-section decoration. Deliberately quiet: colour and type carry the page,
 * and a section only gets a large drawn shape where it helps the composition.
 */
type Variant = "hero" | "about" | "skills" | "projects" | "services" | "experience" | "contact";

export function Atmosphere({ variant }: { variant: Variant }) {
  if (variant === "hero") {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 grid-lines [mask-image:radial-gradient(70%_70%_at_75%_40%,#000,transparent)]" />
      </div>
    );
  }
  if (variant === "services" || variant === "experience") {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <svg viewBox="0 0 600 600" className={`absolute h-[620px] w-[620px] animate-spin-slower ${variant === "services" ? "-left-64 top-24" : "-right-64 -top-24"}`}>
          <circle cx="300" cy="300" r="290" fill="none" stroke="var(--color-line)" />
          <circle cx="300" cy="300" r="220" fill="none" stroke="var(--color-line)" strokeDasharray="2 10" />
          <circle cx="300" cy="10" r="6" fill="var(--accent)" />
        </svg>
      </div>
    );
  }
  return null;
}
