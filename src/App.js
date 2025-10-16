import { motion } from "framer-motion";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./components/Navbar/Navbar";
import {
  Home,
  Projects,
  VisionMission,
  Team,
  SectionIndicators,
} from "./components/Sections";

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
  const scrollLockRef = useRef(false);
  const containerRef = useRef(null);

  const activeSections = useMemo(
    () => (isMobile ? mobileSections : desktopSections),
    [isMobile]
  );

  // ✅ Fix viewport height per iOS (100vh dinamico)
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVh();
    window.addEventListener("resize", setVh);
    window.addEventListener("orientationchange", setVh);
    return () => {
      window.removeEventListener("resize", setVh);
      window.removeEventListener("orientationchange", setVh);
    };
  }, []);

  // ✅ Detect mobile
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // ✅ Scroll to current section (usando containerRef)
  useEffect(() => {
    const container = containerRef.current;
    const el = document.getElementById(activeSections[currentSection]?.id);
    if (container && el) {
      container.scrollTo({
        top: el.offsetTop,
        behavior: "smooth",
      });
      if (currentSection === 1) setTimeout(() => ScrollTrigger?.refresh(), 400);
    }
  }, [currentSection, activeSections]);

  // ✅ Intercetta scroll mouse/trackpad
  useEffect(() => {
    let lastScrollTime = 0;
    const minDelta = 40;
    const debounceTime = 1200;

    const handleWheel = (e) => {
      if (isMenuOpen) return;
      e.preventDefault();

      const now = performance.now();
      if (now - lastScrollTime < debounceTime) return;
      if (Math.abs(e.deltaY) < minDelta) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const next = currentSection + direction;

      if (next >= 0 && next < activeSections.length) {
        setCurrentSection(next);
        lastScrollTime = now;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentSection, activeSections, isMenuOpen]);

  // ✅ Swipe su mobile
  useEffect(() => {
    if (!isMobile) return;

    let startY = 0;
    let endY = 0;
    const threshold = 60;

    const handleTouchStart = (e) => (startY = e.touches[0].clientY);
    const handleTouchMove = (e) => (endY = e.touches[0].clientY);
    const handleTouchEnd = () => {
      if (isMenuOpen) return;
      if (scrollLockRef.current) return;
      const deltaY = startY - endY;
      if (Math.abs(deltaY) < threshold) return;

      const direction = deltaY > 0 ? 1 : -1;
      const next = currentSection + direction;

      if (next >= 0 && next < activeSections.length) {
        setCurrentSection(next);
        scrollLockRef.current = true;
        setTimeout(() => (scrollLockRef.current = false), 900);
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentSection, activeSections, isMobile, isMenuOpen]);

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

      {/* LOGO centrale */}
      {!isMobile && (
        <div className="fixed top-1/2 left-1/2 z-[5] -translate-x-1/2 -translate-y-1/2 flex justify-center items-center pointer-events-none">
          <motion.img
            src={logo}
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
            src={logo}
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
