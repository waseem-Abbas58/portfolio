"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Mail, MessageCircle } from "lucide-react";
import { Atmosphere } from "@/components/background/Atmosphere";
import { Button } from "@/components/ui/Button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icon";
import { Magnetic, Spotlight } from "@/components/ui/Interactive";
import { MaskLines, Reveal, SectionLabel } from "@/components/ui/Reveal";
import { profile } from "@/content/profile";

/**
 * Form delivery:
 * - If NEXT_PUBLIC_WEB3FORMS_KEY is set (free key from https://web3forms.com, public by design),
 *   the form posts there and the message lands in the owner's inbox.
 * - Otherwise the form opens the visitor's email app with the message pre-filled.
 */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

const projectTypes = ["Flutter mobile app", "Figma to Flutter UI", "Firebase / backend integration", "AI feature integration", "Bug fixing / debugging", "Full-time / remote role", "Other"];
const budgets = ["Not sure yet", "Under $500", "$500 – $1,500", "$1,500 – $5,000", "$5,000+"];

type Errors = Partial<Record<"name" | "email" | "type" | "message", string>>;

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: <Mail size={18} aria-hidden /> },
  { label: "WhatsApp", value: profile.phone, href: profile.whatsapp, external: true, icon: <MessageCircle size={18} aria-hidden /> },
  { label: "LinkedIn", value: "in/waseem-abbas-flutter", href: profile.linkedin, external: true, icon: <LinkedinIcon /> },
  { label: "GitHub", value: "waseem-Abbas58", href: profile.github, external: true, icon: <GithubIcon /> },
];

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (data.website) return; // honeypot

    const next: Errors = {};
    if (!data.name?.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? "")) next.email = "Please enter a valid email address.";
    if (!data.type) next.type = "Please choose a project type.";
    if ((data.message ?? "").trim().length < 20) next.message = "Please describe your project in at least 20 characters.";
    setErrors(next);
    if (Object.keys(next).length) {
      (form.querySelector(`[name="${Object.keys(next)[0]}"]`) as HTMLElement | null)?.focus();
      return;
    }

    const subject = `Project inquiry: ${data.type}`;
    const body = `Name: ${data.name}\nEmail: ${data.email}\nProject type: ${data.type}\nBudget: ${data.budget || "Not specified"}\n\n${data.message}`;

    if (!WEB3FORMS_KEY) {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setState("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject, from_name: data.name, email: data.email, project_type: data.type, budget: data.budget, message: data.message }),
      });
      if (!res.ok) throw new Error();
      setState("sent");
      form.reset();
    } catch {
      setState("error");
    }
  }

  const field =
    "w-full rounded-2xl border border-fg/10 bg-ink-900 px-4 py-3.5 text-[15.5px] text-text placeholder:text-dim outline-none transition-[border-color,box-shadow] duration-300 focus:border-cyan/70 focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_22%,transparent)] aria-[invalid=true]:border-err [&>option]:bg-ink-900";

  return (
    <section id="contact" className="relative isolate overflow-hidden pb-20 pt-20 md:pb-28 md:pt-28">
      <Atmosphere variant="contact" />
      <div className="container-page">
        <div className="text-center">
          <SectionLabel index="07" label="Contact" className="mb-8 justify-center" />
          <MaskLines
            lines={["Have an app idea?", <span key="b">Let&apos;s <span className="text-shine">build it.</span></span>]}
            className="display-xl mx-auto max-w-[14ch]"
          />
          <Reveal delay={0.15} className="mx-auto mt-7 max-w-[52ch] text-[17px] leading-[1.7] text-muted">
            Tell me about your project or role. I&apos;m open to freelance work and remote Flutter developer positions.
          </Reveal>
          <Reveal delay={0.25} className="mt-9 flex justify-center">
            <Magnetic strength={0.35}>
              <a
                href={`mailto:${profile.email}`}
                className="glass group inline-flex items-center gap-3 rounded-full py-2 pl-2 pr-6 text-[15px] transition-colors hover:border-fg/30"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-on-accent">
                  <Mail size={17} aria-hidden />
                </span>
                {profile.email}
                <ArrowUpRight size={17} aria-hidden className="text-muted transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text" />
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <Reveal y={40} blur className="mt-20">
          <div className="glass relative overflow-hidden rounded-[36px] p-3 sm:p-4">
            <div className="relative grid gap-3 lg:grid-cols-[0.8fr_1.2fr]">
              {/* channels */}
              <div className="flex flex-col gap-3 rounded-[28px] bg-fg/[0.02] p-5 sm:p-7">
                <p className="flex items-center gap-2.5 text-[14px] text-mint">
                  <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse-dot" /> Available for remote projects
                </p>
                <p className="text-[14px] text-muted">Based in {profile.location}. Working with clients worldwide.</p>
                <ul className="mt-3 grid gap-2.5">
                  {channels.map((c) => (
                    <li key={c.label}>
                      <Spotlight className="rounded-2xl">
                        <a
                          href={c.href}
                          {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="group flood-card relative isolate flex items-center gap-4 overflow-hidden rounded-2xl border border-fg/[0.08] bg-fg/[0.03] p-3.5"
                        >
                          <span aria-hidden className="fill-fx" />
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-fg/[0.06] text-cyan ring-1 ring-fg/10 flood-invert transition-all duration-500">
                            {c.icon}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[13.5px] font-medium text-dim">{c.label}</span>
                            <span className="mt-0.5 block truncate text-[15px]">{c.value}</span>
                          </span>
                          <ArrowUpRight size={17} strokeWidth={1.6} aria-hidden className="shrink-0 text-dim transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" />
                        </a>
                      </Spotlight>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
                  <Button href={profile.cv.premium} variant="secondary" icon="download" download>Download CV</Button>
                  <Button href={profile.cv.ats} variant="text" icon="download" download>ATS version</Button>
                </div>
              </div>

              {/* form */}
              <div className="rounded-[28px] border border-fg/[0.06] bg-ink-950/40 p-5 sm:p-8">
                {state === "sent" ? (
                  <div role="status" className="flex h-full min-h-[380px] flex-col items-center justify-center text-center">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-mint/15 text-mint ring-1 ring-mint/40"><Check size={24} /></span>
                    <h3 className="mt-6 font-display text-[30px] font-semibold tracking-[-0.03em]">Message sent.</h3>
                    <p className="mt-2 text-muted">Thanks! I&apos;ll reply to your email soon.</p>
                  </div>
                ) : (
                  <form noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" aria-label="Project inquiry">
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                    <Field label="Your name" name="name" error={errors.name}>
                      <input id="name" name="name" autoComplete="name" placeholder="Jane Doe" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
                    </Field>
                    <Field label="Email" name="email" error={errors.email}>
                      <input id="email" name="email" type="email" autoComplete="email" placeholder="jane@company.com" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
                    </Field>
                    <Field label="Project type" name="type" error={errors.type}>
                      <select id="type" name="type" defaultValue="" className={field} aria-invalid={!!errors.type} aria-describedby={errors.type ? "type-error" : undefined}>
                        <option value="" disabled>Choose one</option>
                        {projectTypes.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </Field>
                    <Field label="Budget (optional)" name="budget">
                      <select id="budget" name="budget" defaultValue="" className={field}>
                        <option value="">Prefer not to say</option>
                        {budgets.map((b) => <option key={b}>{b}</option>)}
                      </select>
                    </Field>
                    <Field label="Project description" name="message" error={errors.message} full>
                      <textarea id="message" name="message" rows={5} className={`${field} resize-none`} placeholder="What do you want to build? Any deadline or links?" aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
                    </Field>
                    <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-[13px] text-dim">
                        {WEB3FORMS_KEY ? "I usually reply within a day." : "This opens your email app with your message ready to send."}
                      </p>
                      <Magnetic>
                        <button
                          type="submit"
                          disabled={state === "sending"}
                          className="group relative inline-flex h-12 items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-full bg-accent px-7 text-[15px] font-semibold text-on-accent transition-transform duration-500 ease-[var(--ease-out-expo)] hover:scale-[1.04] disabled:opacity-60"
                        >
                          {state === "sending" ? "Sending…" : WEB3FORMS_KEY ? "Send message" : "Send via email app"}
                          <ArrowUpRight size={17} strokeWidth={1.9} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </button>
                      </Magnetic>
                    </div>
                    {state === "error" && (
                      <p role="alert" className="text-[14px] text-err sm:col-span-2">Something went wrong. Please email me directly at {profile.email}.</p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, name, error, full, children }: { label: string; name: string; error?: string; full?: boolean; children: React.ReactNode }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label htmlFor={name} className="mb-2 block text-[13.5px] text-muted">{label}</label>
      {children}
      {error && <p id={`${name}-error`} role="alert" className="mt-2 text-[13px] text-err">{error}</p>}
    </div>
  );
}
