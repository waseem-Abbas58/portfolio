"use client";

import { Rocket } from "lucide-react";
import { useEffect, useState } from "react";

const COLUMNS = [0, 1, 2, 3, 4, 5, 6];
const v = (i: number) => ({ "--i": i }) as React.CSSProperties;
const at = (t: number) => ({ "--t": `${t}s` }) as React.CSSProperties;

function Letters({ text, className = "intro-letter" }: { text: string; className?: string }) {
  return (
    <>
      {text.split("").map((c, i) => (
        <span key={i} className={className} style={v(i)}>{c}</span>
      ))}
    </>
  );
}

function Label({ n, word }: { n: string; word: string }) {
  return (
    <span className="scene-label">
      <span className="scene-num">{n}</span>
      <span className="scene-word font-display">{word}</span>
    </span>
  );
}

/**
 * Welcome screen, shown once per visit. The name opens around a phone that walks
 * through how any app gets made, the phone becomes the full screen in the brand
 * colour, and vertical shutters lift to reveal the site. It shows no specific
 * project, so it never goes out of date. The motion is pure CSS, so the page is
 * still revealed if the script never runs.
 */
export function Intro() {
  const [done, setDone] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro === "skip") {
      setDone(true);
      return;
    }
    const release = () => {
      root.style.overflow = "";
    };
    root.style.overflow = "hidden";
    try {
      sessionStorage.setItem("intro", "1");
    } catch {
      /* storage may be blocked */
    }
    const unlock = setTimeout(release, 9200);
    const finish = setTimeout(() => setDone(true), 10100);
    return () => {
      clearTimeout(unlock);
      clearTimeout(finish);
      release();
    };
  }, []);

  const skip = () => {
    const root = document.documentElement;
    root.style.overflow = "";
    root.dataset.intro = "skip-now";
    setLeaving(true);
    setTimeout(() => setDone(true), 400);
  };

  if (done) return null;

  return (
    <div className={`intro ${leaving ? "is-leaving" : ""}`}>
      <div aria-hidden className="intro-base">
        <span className="intro-corner left-5 top-5 md:left-8 md:top-7">Flutter Developer</span>
        <span className="intro-corner right-5 top-5 md:right-8 md:top-7">Android, iOS and AI</span>
        <span className="intro-corner bottom-5 left-5 md:bottom-7 md:left-8">Portfolio</span>
        <span className="intro-corner intro-count bottom-5 right-5 md:bottom-7 md:right-8" />

        <p className="intro-word intro-word-a font-display"><Letters text="Waseem" /></p>
        <p className="intro-word intro-word-b font-display"><Letters text="Abbas" /></p>

        <div className="intro-window">
          <div className="intro-screen">
            {/* 01 Idea: a bulb draws itself and lights up */}
            <div className="scene scene-idea" style={at(1.9)}>
              <span className="scene-glow" />
              <svg className="scene-bulb" viewBox="0 0 64 64">
                <path pathLength={1} d="M24 44c0-6-8-10-8-20a16 16 0 0 1 32 0c0 10-8 14-8 20z" />
                <path pathLength={1} d="M26 51h12" />
                <path pathLength={1} d="M29 57h6" />
              </svg>
              <Label n="01" word="Idea" />
            </div>

            {/* 02 Design: a layout assembles block by block */}
            <div className="scene scene-design scene-in" style={at(3.4)}>
              <div className="wire">
                <span className="wire-b w-[58%]" style={v(0)} />
                <span className="wire-b wire-hero" style={v(1)} />
                <span className="flex gap-[0.32em]">
                  <span className="wire-b wire-card" style={v(2)} />
                  <span className="wire-b wire-card" style={v(3)} />
                </span>
                <span className="wire-b w-[82%]" style={v(4)} />
                <span className="wire-b w-[54%]" style={v(5)} />
                <span className="wire-b wire-btn" style={v(6)} />
              </div>
              <Label n="02" word="Design" />
            </div>

            {/* 03 Develop: code types itself */}
            <div className="scene scene-code scene-in" style={at(4.7)}>
              <div className="code">
                <span className="code-l" style={v(0)}><b>void</b> main() {"{"}</span>
                <span className="code-l" style={v(1)}>  runApp(<i>MyApp</i>());</span>
                <span className="code-l" style={v(2)}>{"}"}</span>
                <span className="code-l" style={v(3)}> </span>
                <span className="code-l" style={v(4)}><b>class</b> <i>MyApp</i></span>
                <span className="code-l" style={v(5)}>  <b>extends</b> <i>StatelessWidget</i> {"{"}</span>
                <span className="code-l" style={v(6)}>  <i>Widget</i> build(context) {"{"}</span>
                <span className="code-l" style={v(7)}>    <b>return</b> <i>MaterialApp</i>(</span>
                <span className="code-l" style={v(8)}>      home: <i>HomePage</i>(),</span>
                <span className="code-l" style={v(9)}>    );</span>
                <span className="code-l" style={v(10)}>  {"}"}</span>
                <span className="code-l" style={v(11)}>{"}"}</span>
              </div>
              <Label n="03" word="Develop" />
            </div>

            {/* 04 Launch: lift-off into the brand colour */}
            <div className="scene scene-launch scene-in" style={at(6)}>
              <div className="scene-launch-body">
                <Rocket className="scene-rocket" strokeWidth={1.5} />
                <Label n="04" word="Launch" />
              </div>
            </div>
          </div>
          <span className="intro-island" />
        </div>

        <span className="intro-line" />
      </div>

      <div aria-hidden className="intro-panel">
        {COLUMNS.map((i) => (
          <span key={i} className="intro-col" style={v(i)} />
        ))}
      </div>

      <div aria-hidden className="intro-hello">
        <p className="overflow-hidden px-2 font-display text-[clamp(3.6rem,13vw,10rem)] font-bold leading-[1.12] tracking-[-0.045em]">
          <Letters text="Welcome" className="intro-letter-hello" />
        </p>
        <p className="intro-sub mt-2 text-[clamp(1rem,1.5vw,1.25rem)] font-medium">From idea to launch.</p>
      </div>

      <button type="button" onClick={skip} className="intro-skip">Skip</button>
    </div>
  );
}
