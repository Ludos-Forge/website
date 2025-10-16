import { motion } from "framer-motion";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./components/Navbar/Navbar";
import { Home, Projects, VisionMission, Team } from "./components/Sections";

import logo from "./assets/logo.png";
import members from "./members.json";

const desktopSections = [
  { id: "home", label: "Home" },
  { id: "vision-mission", label: "Vision/Mission" },
  { id: "team-projects", label: "Team/Projects" },
];

const mobileSections = [
  { id: "home", label: "Home" },
  { id: "vision", label: "Vision/Mission" },
  { id: "team", label: "Team" },
  { id: "projects", label: "Projects" },
];

export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  const containerRef = useRef(null);

  // Sezioni attive
  const activeSections = useMemo(
    () => (isMobile ? mobileSections : desktopSections),
    [isMobile]
  );

  // Rileva mobile
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Aggiorna la sezione attuale quando l’utente scrolla manualmente

  return (
    <div
      ref={containerRef}
      className="h-screen"
    >
      <Navbar
        isMobile={isMobile}
        desktopSections={desktopSections}
        mobileSections={mobileSections}
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* LOGO centrale */}
      <div
        className={`absolute top-1/2 left-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 flex justify-center items-center ${
          (isMobile && currentSection === 0) || !isMobile ? "" : "hidden"
        }`}
      >
        <motion.img
          src={logo}
          alt="LudosForge Logo"
          animate={{ rotate: currentSection * 360 }}
          transition={{ duration: 1 }}
          className="min-w-[300px] max-w-[300px] min-h-[300px] max-h-[300px]"
        />
      </div>

      {/* SEZIONI */}
      {activeSections.map((section, index) => {
        const isBlack = section.id === "mission" || section.id === "projects";
        return (
          <section
            key={section.id}
            id={section.id}
            className={`h-screen snap-start relative overflow-hidden ${
              isBlack ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            {index === 0 && (
              <Home
                isMobile={isMobile}
                currentSection={currentSection}
                index={index}
              />
            )}
            {section.id.includes("vision") && (
              <VisionMission
                currentSection={currentSection}
                index={index}
                isMobile={isMobile}
              />
            )}
            {section.id === "team" && (
              <Team isMobile={isMobile} isBlack={isBlack} members={members} />
            )}
            {section.id === "projects" && (
              <Projects isMobile={isMobile} isBlack={isBlack} />
            )}
            {section.id === "team-projects" && (
              <>
                <div className="absolute top-0 left-0 w-1/2 h-full bg-white z-0">
                  <Team
                    isMobile={isMobile}
                    isBlack={isBlack}
                    members={members}
                  />
                </div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-black z-0">
                  <Projects isMobile={isMobile} isBlack={!isBlack} />
                </div>
              </>
            )}
          </section>
        );
      })}
    </div>
  );
}
