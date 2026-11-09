import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { SITE_URL, profile } from "@/content/profile";
import "./globals.css";

// Type system: Bricolage Grotesque for display, Instrument Sans for everything else.
const body = Instrument_Sans({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const display = Bricolage_Grotesque({ variable: "--font-display-sans", subsets: ["latin"], weight: ["500", "600", "700", "800"], display: "swap" });

const description =
  "Waseem Abbas is a Flutter developer from Pakistan with 3+ years of freelance experience building Android and iOS apps, Firebase and Node.js backends, and AI-powered features. Available for remote work.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Waseem Abbas | Flutter Developer for Android, iOS and AI",
    template: "%s | Waseem Abbas",
  },
  description,
  keywords: ["Flutter Developer", "Mobile App Developer", "Android App Development", "iOS App Development", "AI Integration", "Remote Flutter Developer", "Firebase", "Pakistan"],
  authors: [{ name: profile.name, url: SITE_URL }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Waseem Abbas",
    title: "Waseem Abbas | Flutter Developer",
    description,
  },
  twitter: { card: "summary_large_image", title: "Waseem Abbas | Flutter Developer", description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#f6f2ea" };

// Runs before paint so a saved theme never flashes the default one.
const themeBoot = `try{var t=localStorage.getItem("theme");if(t==="paper"||t==="ink")document.documentElement.dataset.theme=t;if(sessionStorage.getItem("intro")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="skip"}catch(e){}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Flutter Developer",
  url: SITE_URL,
  email: `mailto:${profile.email}`,
  image: `${SITE_URL}${profile.photoSquare}`,
  address: { "@type": "PostalAddress", addressLocality: "Faisalabad", addressCountry: "PK" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "GC University Faisalabad" },
  sameAs: [profile.linkedin, profile.github],
  knowsAbout: ["Flutter", "Dart", "Android", "iOS", "Firebase", "Supabase", "Node.js", "REST APIs", "AI API Integration"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="paper" suppressHydrationWarning className={`${body.variable} ${display.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
