import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
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
import { useScroll } from "./hooks/useScroll";
import ReactGA from "react-ga4";
ReactGA.initialize("G-F1ZHM4DRV4");

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

  const { containerRef, isMobile, sections, activeIndex, setActiveIndex } =
    useScroll(desktopSections, mobileSections, isMenuOpen, (index, section) =>
      console.log("Section changed:", section.label)
    );

  // Blocca scroll del body se menu aperto
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    document.body.style.touchAction = isMenuOpen ? "none" : "";
  }, [isMenuOpen]);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);
  return (
    <div
      ref={containerRef}
      className="relative overflow-y-scroll scroll-smooth snap-y snap-mandatory h-[calc(var(--vh)*100)]"
    >
      {/* ✅ Navbar */}
      <Navbar
        isMobile={isMobile}
        desktopSections={desktopSections}
        mobileSections={mobileSections}
        currentSection={activeIndex}
        setCurrentSection={setActiveIndex}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* ✅ Indicatori sezione mobile */}
      {isMobile && (
        <SectionIndicators
          activeSections={sections}
          currentSection={activeIndex}
          setCurrentSection={setActiveIndex}
        />
      )}

      {/* ✅ Logo desktop */}
      {!isMobile && (
        <div className="fixed top-1/2 left-1/2 z-[5] -translate-x-1/2 -translate-y-1/2 flex justify-center items-center pointer-events-none">
          <motion.img
            src={logo.src}
            alt="LudosForge Logo"
            animate={{ rotate: activeIndex * 360 }}
            transition={{ duration: 1 }}
            className="min-w-[300px] max-w-[300px] min-h-[300px] max-h-[300px]"
          />
        </div>
      )}

      {/* ✅ Logo mobile solo nella prima sezione */}
      {isMobile && activeIndex === 0 && (
        <div className="absolute top-1/2 left-1/2 z-[5] -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
          <motion.img
            src={logo.src}
            alt="LudosForge Logo"
            animate={{ rotate: activeIndex * 360 }}
            transition={{ duration: 1 }}
            className="min-w-[200px] max-w-[200px] min-h-[200px] max-h-[200px]"
          />
        </div>
      )}

      {/* ✅ Sezioni “virtuali” */}
      {sections.map((section, idx) => {
        const visible = idx === activeIndex;
        const isBlack = section.id === "mission" || section.id === "projects";

        return (
          <section
            key={section.id}
            id={section.id}
            className={`h-[calc(var(--vh)*100)] snap-start relative overflow-hidden transition-opacity duration-700 ${
              visible
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            } ${isBlack ? "bg-black text-white" : "bg-white text-black"}`}
          >
            {section.id === "home" && (
              <Home
                isMobile={isMobile}
                currentSection={activeIndex}
                index={idx}
              />
            )}
            {section.id.includes("vision") && (
              <VisionMission
                currentSection={activeIndex}
                index={idx}
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
