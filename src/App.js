import { motion } from "framer-motion";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useScroll } from "./hooks/useScroll";
import Navbar from "./components/Navbar/Navbar";
import {
  Home,
  Projects,
  VisionMission,
  Team,
  SectionIndicators,
} from "./components/Sections";

import logo from "./assets/logo.png";
import members from "./members.js";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    isMobile,
    currentSection,
    setCurrentSection,
    containerRef,
    activeSections,
  } = useScroll(desktopSections, mobileSections, isMenuOpen);

  // ✅ Blocca scroll body quando menu aperto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
  }, [isMenuOpen]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-y-scroll scroll-smooth snap-y snap-mandatory h-[calc(var(--vh)*100)]"
    >
      {/* Navbar */}
      <Navbar
        isMobile={isMobile}
        desktopSections={desktopSections}
        mobileSections={mobileSections}
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Indicatori mobile */}
      {isMobile && (
        <SectionIndicators
          activeSections={activeSections}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
      )}

      {/* LOGO desktop */}
      {!isMobile && (
        <div className="fixed top-1/2 left-1/2 z-[5] -translate-x-1/2 -translate-y-1/2 flex justify-center items-center pointer-events-none">
          <motion.img
            src={logo.src}
            alt="LudosForge Logo"
            animate={{ rotate: currentSection * 360 }}
            transition={{ duration: 1 }}
            className="min-w-[300px] max-w-[300px] min-h-[300px] max-h-[300px]"
          />
        </div>
      )}

      {/* LOGO mobile solo nella prima sezione */}
      {isMobile && currentSection === 0 && (
        <div className="absolute top-1/2 left-1/2 z-[5] -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
          <motion.img
            src={logo.src}
            alt="LudosForge Logo"
            animate={{ rotate: currentSection * 360 }}
            transition={{ duration: 1 }}
            className="min-w-[200px] max-w-[200px] min-h-[200px] max-h-[200px]"
          />
        </div>
      )}

      {/* SEZIONI */}
      {activeSections.map((section, index) => {
        const isBlack = section.id === "mission" || section.id === "projects";
        return (
          <section
            key={section.id}
            id={section.id}
            className={`h-[calc(var(--vh)*100)] snap-start relative overflow-hidden ${
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
