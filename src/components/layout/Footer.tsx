import Link from "next/link";
import { profile } from "@/content/profile";

export function Footer() {
  const links = [
    { label: "LinkedIn", href: profile.linkedin, external: true },
    { label: "GitHub", href: profile.github, external: true },
    { label: "Email", href: `mailto:${profile.email}` },
    { label: "Download CV", href: profile.cv.premium, download: true },
  ];
  return (
    <footer className="relative overflow-hidden border-t border-fg/10">
      <div className="container-page flex flex-col gap-8 pb-10 pt-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[13.5px] font-medium text-muted">Flutter Developer in {profile.location}</p>
          <p className="mt-3 max-w-[30ch] text-[15px] text-muted">Building mobile apps, backend integrations and AI-powered features.</p>
        </div>
        <ul className="flex flex-wrap gap-x-7 gap-y-3 text-[14px] text-muted">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="link-line pb-0.5 transition-colors hover:text-text"
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                {...(l.download ? { download: true } : {})}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="container-page flex flex-col justify-between gap-2 border-t border-fg/10 py-6 text-[13px] font-medium text-dim sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <Link href="/#home" className="link-line self-start pb-0.5 transition-colors hover:text-text sm:self-auto">Back to top ↑</Link>
      </div>
    </footer>
  );
}
