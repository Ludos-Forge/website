import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./components/ScrollReveal/ScrollReveal";

import logo from "./assets/logo.png";
import members from "./members.json";
import TextType from "./components/TextType";
import { Deck } from "./components/Member";
import { ProjectTimeline } from "./components/ProjectTimeline";

const sections = [
  { id: "home", label: "Home" },
  { id: "vision-mission", label: "Vision/Mission" },
  { id: "team-projects", label: "Team/Projects" },
];

export default function LandingPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef(null);
  const scrollLockRef = useRef(false);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (scrollLockRef.current) return;
      const direction = e.deltaY > 0 ? 1 : -1;
      const next = currentSection + direction;
      if (next >= 0 && next < sections.length) {
        setCurrentSection(next);
        scrollLockRef.current = true;
        setTimeout(() => {
          scrollLockRef.current = false;
        }, 900); // tempo di blocco dopo ogni scroll
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentSection]);

  useEffect(() => {
    containerRef.current.scrollTo({
      top: window.innerHeight * currentSection,
      behavior: "smooth",
    });

    if (currentSection === 1) {
      setTimeout(() => {
        if (window.ScrollTrigger) {
          window.ScrollTrigger.refresh();
          window.ScrollTrigger.update();
        } else if (ScrollTrigger) {
          ScrollTrigger.refresh();
          ScrollTrigger.update();
        }
      }, 400);
    }
  }, [currentSection]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full bg-white"
      style={{
        overflow: "auto",
        scrollBehavior: "smooth",
      }}
    >
      <nav
        className="fixed top-2 right-2 z-50 bg-white/90 rounded-lg shadow-md flex gap-2 items-center px-2 py-1 md:top-6 md:right-8 md:px-4 md:py-2"
        aria-label="Main Navigation"
      >
        {sections.map((section, idx) => (
          <button
            key={section.id}
            onClick={() => setCurrentSection(idx)}
            className={`rounded px-2 py-1 font-semibold transition
            ${idx === currentSection ? "bg-black text-white" : "bg-transparent text-black"}
            text-xs md:text-base`}
            aria-current={idx === currentSection ? "page" : undefined}
          >
            {section.label}
          </button>
        ))}
      </nav>

      <div
        className="absolute top-1/2 left-1/2 z-10 flex justify-center items-center pointer-events-none"
        style={{
          transform: "translate(-50%, -50%)",
        }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ rotate: currentSection * 360 }}
          transition={{ duration: 1 }}
          className="text-center z-10"
        >
          <img
            src={logo}
            alt="LudosForge Logo"
            className="w-24 h-24 md:w-64 md:h-64"
          />
        </motion.div>
      </div>

      {sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className="min-h-screen flex flex-col md:flex-row justify-center items-center relative"
          aria-labelledby={`${section.id}-title`}
        >
          {/* Colonna sinistra */}
          <div className="w-full md:w-1/2 h-auto bg-white z-0 flex flex-col justify-center items-center px-4 py-8 md:mx-24">
            {index === 1 && (
              <>
                <h2 id="vision-title" className="mb-2.5 text-2xl md:text-5xl text-black mb-8 font-bold">Vision</h2>
                <ScrollReveal
                  enableBlur={true}
                  baseRotation={0}
                  blurStrength={10}
                  active={currentSection === 1}
                  fontSize={"1.1rem"}
                >
                  {/* ...testo vision... */}
                </ScrollReveal>
              </>
            )}
            {index === 2 && (
              <>
                <h2 id="team-title" className="text-black text-2xl md:text-5xl mb-8 font-bold">Team</h2>
                <Deck members={members} />
              </>
            )}
          </div>

          {/* Colonna destra */}
          <div className="w-full md:w-1/2 h-auto bg-black z-0 flex flex-col justify-center items-center px-4 py-8 md:mx-24">
            {index === 1 && (
              <>
                <h2 id="mission-title" className="text-white text-2xl md:text-5xl mb-8 font-bold">Mission</h2>
                <ScrollReveal
                  enableBlur={true}
                  baseRotation={0}
                  blurStrength={10}
                  textClassName="white-text"
                  active={currentSection === 1}
                  fontSize={"1.1rem"}
                >
                  {/* ...testo mission... */}
                </ScrollReveal>
              </>
            )}
            {index === 2 && (
              <>
                <h2 id="projects-title" className="text-white text-2xl md:text-5xl mb-8 font-bold">Projects</h2>
                <div className="w-full overflow-auto">
                  <ProjectTimeline />
                </div>
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
