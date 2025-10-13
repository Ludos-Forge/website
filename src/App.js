import { motion } from "framer-motion";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
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
  const [currentSection, setCurrentSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const containerRef = useRef(null);
  const scrollLockRef = useRef(false);

  const activeSections = useMemo(
    () => (isMobile ? mobileSections : desktopSections),
    [isMobile]
  );

  // Scroll desktop
  const handleWheel = useCallback(
    (e) => {
      if (isMobile) return;
      e.preventDefault();
      if (scrollLockRef.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const next = currentSection + direction;
      const max = activeSections.length;

      if (next >= 0 && next < max) {
        setCurrentSection(next);
        scrollLockRef.current = true;
        setTimeout(() => (scrollLockRef.current = false), 900);
      }
    },
    [activeSections, currentSection, isMobile]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  // Detect mobile
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Scroll desktop
  useEffect(() => {
    const vh = window.visualViewport?.height || window.innerHeight;
    containerRef.current.scrollTo({
      top: vh * currentSection,
      behavior: "smooth",
    });
    if (currentSection === 1) setTimeout(() => ScrollTrigger?.refresh(), 400);
  }, [currentSection, isMobile]);

  // Swipe mobile
  useEffect(() => {
    if (!isMobile || !containerRef.current) return;

    let startY = 0;
    let endY = 0;
    const threshold = 60;

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      endY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      // Ignora swipe se viene da un carousel
      if (
        e.target.closest(".carousel") ||
        e.target.closest(".swiper-container")
      )
        return;

      const deltaY = startY - endY;
      if (Math.abs(deltaY) < threshold || scrollLockRef.current) return;

      const direction = deltaY > 0 ? 1 : -1;
      const next = currentSection + direction;
      const max = activeSections.length;

      if (next >= 0 && next < max) {
        setCurrentSection(next);
        scrollLockRef.current = true;
        setTimeout(() => (scrollLockRef.current = false), 900);
      }
    };

    const el = containerRef.current;
    el.addEventListener("touchstart", handleTouchStart, { passive: false });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isMobile, currentSection, activeSections]);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-hidden [scroll-behavior:smooth]"
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

      {activeSections.map((section, index) => {
        const isBlack = section.id === "mission" || section.id === "projects";
        return (
          <section
            key={section.id}
            id={section.id}
            className={`h-screen relative overflow-hidden ${
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
                <div className="absolute top-0 left-0 w-1/2 h-screen bg-white z-0">
                  <Team
                    isMobile={isMobile}
                    isBlack={isBlack}
                    members={members}
                  />
                </div>
                <div className="absolute top-0 right-0 w-1/2 h-screen bg-black z-0">
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
