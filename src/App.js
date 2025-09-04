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
      style={{ height: "100vh", overflow: "hidden", scrollBehavior: "smooth" }}
    >
      <nav
        style={{
          position: "fixed",
          top: 24,
          right: 32,
          zIndex: 100,
          background: "rgba(255,255,255,0.85)",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          padding: "0.5rem 1.2rem",
          display: "flex",
          gap: 16,
          alignItems: "center",
        }}
      >
        {sections.map((section, idx) => (
          <button
            key={section.id}
            onClick={() => setCurrentSection(idx)}
            style={{
              background: idx === currentSection ? "#222" : "transparent",
              color: idx === currentSection ? "#fff" : "#222",
              border: "none",
              borderRadius: 4,
              padding: "0.4rem 0.9rem",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "1rem",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            {section.label}
          </button>
        ))}
      </nav>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          zIndex: 1,
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          animate={{ rotate: currentSection * 360 }}
          transition={{ duration: 1 }}
          style={{ textAlign: "center", zIndex: 1 }}
        >
          <img
            src={logo}
            alt="LudosForge Logo"
            style={{ width: 400, height: 400 }}
          />
        </motion.div>
      </div>

      {sections.map((section, index) => (
        <div
          key={section.id}
          id={section.id}
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {index === 0 && (
            <div
              style={{
                position: "absolute",
                top: "20%",
                left: "50%",
                display: "flex",
                textAlign: "start",
                transform: "translate(-50%, -50%)",
                width: "425px",
                zIndex: 1,
              }}
            >
              <TextType
                text={"Ludos Forge"}
                as="h1"
                typingSpeed={250}
                pauseDuration={1500}
                showCursor={true}
              />
            </div>
          )}

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "50%",
              height: "100%",
              backgroundColor: "white",
              zIndex: 0,
            }}
          >
            <div className="h-full my-24 mx-48">
              {index === 1 && (
                <>
                  <h2 className="mb-2.5 text-5xl text-black mb-8">Vision</h2>
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

          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "50%",
              height: "100%",
              backgroundColor: "black",
              zIndex: 0,
            }}
          >
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
