import { Nav } from "@/components/layout/Nav";
import { Intro } from "@/components/layout/Intro";
import { Ambient } from "@/components/background/Ambient";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Services } from "@/components/sections/Services";
import { Reviews } from "@/components/sections/Reviews";
import { Contact } from "@/components/sections/Contact";
import { Ticker } from "@/components/ui/Ticker";

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink-950">
        Skip to content
      </a>
      <Intro />
      <Ambient />
      <Nav />
      <main id="main">
        <Hero />
        <Ticker words={["Flutter", "Android", "iOS", "Firebase", "Node.js", "AI Integration"]} />
        <About />
        <Projects />
        <Reviews />
        <Services />
        <Skills />
        <Experience />
        <Ticker reverse words={["Available for new projects", "Let's build your app"]} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
