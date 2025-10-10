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
      className="h-screen overflow-hidden [scroll-behavior:smooth]"
    >
      <nav
        className="fixed top-6 right-8 z-[100] bg-[rgba(255,255,255,0.85)] rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] py-[0.5rem] px-[1.2rem] flex gap-4 items-center"
      >
        {sections.map((section, idx) => (
          <button
            key={section.id}
            onClick={() => setCurrentSection(idx)}
            className={`rounded-[4px] py-[0.4rem] px-[0.9rem] font-semibold text-base transition-colors duration-200 ${
              idx === currentSection
                ? "bg-[#222] text-white"
                : "bg-transparent text-[#222]"
            }`}
          >
            {section.label}
          </button>
        ))}
      </nav>

      <div className="absolute top-1/2 left-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
        <motion.div
          animate={{ rotate: currentSection * 360 }}
          transition={{ duration: 1 }}
          className="text-center z-[1]"
        >
          <img src={logo} alt="LudosForge Logo" className="w-[300px] h-[300px]" />
        </motion.div>
      </div>

      {sections.map((section, index) => (
        <div
          key={section.id}
          id={section.id}
          className="h-screen flex justify-center items-center relative overflow-hidden"
        >
          {index === 0 && (
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex text-left w-[425px] z-[1]">
              <TextType
                text={"Ludos Forge"}
                as="h1"
                typingSpeed={250}
                pauseDuration={1500}
                showCursor={true}
              />
            </div>
          )}

          <div className="absolute top-0 left-0 w-1/2 h-full bg-white z-0">
            <div className="h-full my-24 mx-48">
              {index === 1 && (
                <>
                  <h2 className="text-5xl text-black mb-8">Vision</h2>
                  <ScrollReveal
                    enableBlur={true}
                    baseRotation={0}
                    blurStrength={10}
                    active={currentSection === 1}
                    fontSize={"2rem"}
                  >
                    We bring to life the worlds we’ve always dreamed of as
                    gamers. We envision a future where every indie developer can
                    turn their passion into authentic, innovative, and
                    unforgettable gaming experiences. A world where creativity
                    knows no limits, and every team member's voice helps shape
                    the adventure.
                  </ScrollReveal>
                </>
              )}
              {index === 2 && (
                <>
                  <h2 className="text-black text-5xl mb-8">Team</h2>
                  <Deck members={members} />
                </>
              )}
            </div>
          </div>

          <div className="absolute top-0 right-0 w-1/2 h-full bg-black z-0">
            <div className="h-full my-24 mx-48 text-right">
              {index === 1 && (
                <>
                  <h2 className="text-white text-5xl mb-8">Mission</h2>
                  <ScrollReveal
                    enableBlur={true}
                    baseRotation={0}
                    blurStrength={10}
                    textClassName="white-text"
                    active={currentSection === 1}
                    fontSize={"2rem"}
                  >
                    We forge video games with passion, creative freedom, and
                    collective spirit. Ludos Forge was born from the desire to
                    create indie games that reflect what made us fall in love
                    with gaming: engaging stories, original mechanics, and
                    vibrant worlds. We believe in an open development
                    environment, where every idea matters and each team member
                    contributes to the creative process. Every game is a
                    challenge, a dream, and a love letter to those who play.
                  </ScrollReveal>
                </>
              )}
              {index === 2 && (
                <>
                  <h2 className="text-white text-5xl mb-8">Projects</h2>
                  <div className="h-full overflow-auto">
                    <ProjectTimeline />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
