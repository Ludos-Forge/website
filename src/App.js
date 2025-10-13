import { AnimatePresence, motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import ScrollReveal from "./components/ScrollReveal/ScrollReveal";

import logo from "./assets/logo.png";
import members from "./members.json";
import TextType from "./components/TextType";
import { Deck } from "./components/Member";
import { ProjectTimeline } from "./components/ProjectTimeline";
import { FaBars } from "react-icons/fa6";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const containerRef = useRef(null);
  const scrollLockRef = useRef(false);

  const activeSections = useMemo(
    () => (isMobile ? mobileSections : desktopSections),
    [isMobile]
  );

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    if (scrollLockRef.current) return;
    const direction = e.deltaY > 0 ? 1 : -1;
    const next = currentSection + direction;
    const max = activeSections.length;

    if (next >= 0 && next < max) {
      setCurrentSection(next);
      scrollLockRef.current = true;
      setTimeout(() => {
        scrollLockRef.current = false;
      }, 900); // tempo di blocco dopo ogni scroll
    }
  });

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentSection, handleWheel]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

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
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.overflow = isModalOpen ? "hidden" : "auto";
    }
  }, [isModalOpen]);
  return (
    <div
      ref={containerRef}
      className="h-screen overflow-hidden [scroll-behavior:smooth]"
    >
      <nav className="fixed top-6 right-8 z-[100]">
        {/* Desktop nav */}
        {!isMobile && (
          <div className="bg-[rgba(255,255,255,0.85)] rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] py-[0.5rem] px-[1.2rem] flex gap-4 items-center">
            {activeSections.map((section, idx) => (
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
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-[#222] bg-[rgba(255,255,255,0.85)] rounded-full shadow-md p-3 focus:outline-none hover:bg-white transition"
          >
            <FaBars />
          </button>
        )}
      </nav>
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center gap-8 z-[200]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Pulsante chiusura */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-8 text-white text-3xl focus:outline-none"
            >
              ×
            </button>

            {/* Voci animate singolarmente */}
            {activeSections.map((section, idx) => {
              const isActive = idx === currentSection;
              return (
                <motion.button
                  key={section.id}
                  className={`relative text-3xl font-semibold tracking-wide px-6 py-2 rounded-md transition-all duration-200 ${
                    isActive
                      ? "bg-white text-black"
                      : "text-white hover:bg-white/20"
                  }`}
                  onClick={() => {
                    setCurrentSection(idx);
                    setIsMenuOpen(false);
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  layout="position" // 👈 aiuta framer a stabilizzare il layout
                >
                  {section.label}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`absolute top-1/2 left-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 flex justify-center items-center ${
          (isMobile && currentSection === 0) || !isMobile ? "" : "hidden"
        }`}
      >
        <motion.div
          animate={{ rotate: currentSection * 360 }}
          transition={{ duration: 1 }}
          className="text-center z-[1]"
        >
          <img
            src={logo}
            alt="LudosForge Logo"
            className="min-w-[300px] max-w-[300px] min-h-[300px] max-h-[300px]"
          />
        </motion.div>
      </div>

      {activeSections.map((section, index) => {
        if (isMobile) {
          const isBlack = section.id === "mission" || section.id === "projects";
          return (
            <section
              key={section.id}
              id={section.id}
              className={`h-screen flex relative overflow-hidden ${
                isBlack ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              {/* Home headline */}
              {index === 0 && (
                <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex text-center justify-center w-[80%] z-[1]">
                  <TextType
                    text={"Ludos Forge"}
                    as="h1"
                    typingSpeed={250}
                    pauseDuration={1500}
                    showCursor={true}
                    monoColor={true}
                  />
                </div>
              )}

              <div className={`w-full max-w-3xl py-16 z-[1] `}>
                {section.id === "vision" && (
                  // Two vertical sections splitting the screen 50/50
                  <div className="flex flex-col w-full h-screen">
                    <div className="w-full h-1/2 bg-white text-black pt-8 px-5 flex flex-col ">
                      <h2 className="text-4xl mb-6">Vision</h2>
                      <ScrollReveal
                        enableBlur={true}
                        baseRotation={0}
                        blurStrength={10}
                        active={currentSection === index}
                        fontSize={"1.125rem"}
                      >
                        We bring to life the worlds we've always dreamed of as
                        gamers. We envision a future where every indie developer
                        can turn their passion into authentic, innovative, and
                        unforgettable gaming experiences. A world where
                        creativity knows no limits, and every team member's
                        voice helps shape the adventure.
                      </ScrollReveal>
                    </div>

                    <div className="w-full h-1/2 bg-black text-white px-5 flex flex-col text-right ">
                      <h2 className="text-4xl mb-6">Mission</h2>
                      <ScrollReveal
                        enableBlur={true}
                        baseRotation={0}
                        blurStrength={10}
                        textClassName="white-text"
                        active={currentSection === index}
                        fontSize={"1.125rem"}
                      >
                        We forge video games with passion, creative freedom, and
                        collective spirit. Ludos Forge was born from the desire
                        to create indie games that reflect what made us fall in
                        love with gaming: engaging stories, original mechanics,
                        and vibrant worlds. We believe in an open development
                        environment, where every idea matters and each team
                        member contributes to the creative process. Every game
                        is a challenge, a dream, and a love letter to those who
                        play.
                      </ScrollReveal>
                    </div>
                  </div>
                )}

                {section.id === "team" && (
                  <div className="px-5">
                    <h2
                      className={`text-4xl mb-6 ${
                        isBlack ? "text-white" : "text-black"
                      }`}
                    >
                      Team
                    </h2>
                    <Deck members={members} />
                  </div>
                )}

                {section.id === "projects" && (
                  <div className="px-5">
                    <h2
                      className={`text-4xl mb-6 ${
                        isBlack ? "text-white" : "text-black"
                      }`}
                    >
                      Projects
                    </h2>
                    <div className="h-full overflow-auto">
                      <ProjectTimeline setIsModalOpen={setIsModalOpen} />
                    </div>
                  </div>
                )}
              </div>
            </section>
          );
        }

        return (
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
                      gamers. We envision a future where every indie developer
                      can turn their passion into authentic, innovative, and
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
                      <ProjectTimeline setIsModalOpen={setIsModalOpen} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
