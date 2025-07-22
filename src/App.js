import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./components/ScrollReveal/ScrollReveal";

import logo from "./assets/logo.png";
import Member from "./components/Member";
import members from "./members.json";
import TextType from "./components/TextType";

const sections = [
  { id: "home", label: "Home" },
  { id: "vision-mission", label: "Vision/Mission" },
  { id: "team-projects", label: "Team/Projects" },
];

export default function LandingPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef(null);
  const scrollLockRef = useRef(false);
  const lastDeltaY = useRef(0);
  const animationFrame = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();

      if (scrollLockRef.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const next = currentSection + direction;

      if (next >= 0 && next < sections.length) {
        setCurrentSection(next);
        scrollLockRef.current = true;
      }

      lastDeltaY.current = e.deltaY;
      if (!animationFrame.current) {
        animationFrame.current = requestAnimationFrame(checkScrollStopped);
      }
    };

    const checkScrollStopped = () => {
      animationFrame.current = null;

      if (Math.abs(lastDeltaY.current) < 1) {
        scrollLockRef.current = false;
      } else {
        lastDeltaY.current *= 0.8;
        animationFrame.current = requestAnimationFrame(checkScrollStopped);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
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
                // justifyContent: "center",
                textAlign: "start",
                paddingTop: "200px",
                transform: "translate(-50%, -50%)",
                fontSize: "2.2em",
                width: "419px",
                zIndex: 1,
              }}
            >
              <TextType
                text={["Ludos Forge"]}
                as="h1"
                typingSpeed={250}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
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
            <div style={{ margin: "20%" }}>
              {index === 1 && (
                <>
                  <h2 style={{ color: "black", fontSize: "2.5rem" }}>Vision</h2>
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
                  <h2 style={{ color: "black", fontSize: "2.5rem" }}>Team</h2>
                  {members.map((member, index) => (
                    <Member
                      key={index}
                      index={index}
                      member={member}
                      reverse={index % 2 === 0}
                      className="p-b-2"
                    />
                  ))}
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
            <div style={{ margin: "20%", textAlign: "end" }}>
              {index === 1 && (
                <>
                  <h2 style={{ color: "white", fontSize: "2.5rem" }}>
                    Mission
                  </h2>
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
                <h2 style={{ color: "white", fontSize: "2.5rem" }}>Projects</h2>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
