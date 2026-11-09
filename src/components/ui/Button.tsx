import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { Magnetic } from "@/components/ui/Interactive";

type Variant = "primary" | "secondary" | "text";
type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  icon?: "arrow" | "external" | "download" | "none";
  download?: boolean;
  external?: boolean;
  magnetic?: boolean;
  className?: string;
};

const styles: Record<Variant, string> = {
  primary: "h-12 px-6 bg-accent text-on-accent overflow-hidden isolate shadow-[0_14px_28px_-14px_var(--accent)]",
  secondary: "h-12 px-6 border border-line-strong text-text overflow-hidden isolate",
  text: "h-12 px-1 text-text",
};

/** One button system: same height, radius and motion. Hover floods the pill from the bottom. */
export function Button({ href, children, variant = "primary", icon = "arrow", download, external, magnetic = variant === "primary", className = "" }: Props) {
  const Icon = icon === "external" ? ArrowUpRight : icon === "download" ? Download : icon === "arrow" ? ArrowRight : null;
  const flood = variant !== "text";
  const cls = `group relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full text-[15px] font-semibold tracking-[-0.01em] transition-[color,box-shadow] duration-500 ease-[var(--ease-out-expo)] ${styles[variant]} ${className}`;
  const inner = (
    <>
      {flood && (
        <span aria-hidden className="absolute inset-0 -z-10 translate-y-full rounded-full bg-fg transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0" />
      )}
      <span className={`relative transition-colors duration-300 ${flood ? "group-hover:text-ink-950" : "link-line pb-0.5"}`}>{children}</span>
      {Icon && (
        <Icon
          size={17}
          strokeWidth={2}
          aria-hidden
          className={`relative transition-[transform,color] duration-500 ease-[var(--ease-out-expo)] ${flood ? "group-hover:text-ink-950" : ""} ${icon === "download" ? "group-hover:translate-y-0.5" : icon === "external" ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5" : "group-hover:translate-x-1"}`}
        />
      )}
    </>
  );
  const el =
    download || external || href.startsWith("http") || href.startsWith("mailto:") ? (
      <a href={href} className={cls} {...(download ? { download: true } : {})} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    ) : (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
