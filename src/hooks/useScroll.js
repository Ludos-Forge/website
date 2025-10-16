import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Hook che gestisce:
 * - scroll a sezioni (mouse + swipe)
 * - blocco scroll con lockRef
 * - rilevamento mobile/desktop
 * - aggiornamento dinamico vh su iOS
 *
 * @param {Array} desktopSections
 * @param {Array} mobileSections
 * @param {boolean} isMenuOpen
 */
export const useScroll = (desktopSections, mobileSections, isMenuOpen) => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const scrollLockRef = useRef(false);
  const containerRef = useRef(null);

  const activeSections = useMemo(
    () => (isMobile ? mobileSections : desktopSections),
    [isMobile]
  );

  // ✅ Fix viewport height per iOS
  useEffect(() => {
    const setVh = () =>
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
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

  // ✅ Scroll verso sezione attiva
  useEffect(() => {
    const container = containerRef.current;
    const el = document.getElementById(activeSections[currentSection]?.id);
    if (container && el) {
      container.scrollTo({ top: el.offsetTop, behavior: "smooth" });
      if (currentSection === 1) setTimeout(() => ScrollTrigger?.refresh(), 400);
    }
  }, [currentSection, activeSections]);

  // ✅ Gestione scroll mouse/trackpad
  useEffect(() => {
    const minDelta = 40;
    const lockDuration = 1200;

    const handleWheel = (e) => {
      // se è aperta una modale, evita interferenze
      if (isMenuOpen || scrollLockRef.current) return;

      // 🔒 evita lo scroll quando sei dentro una modale scrollabile
      if (e.target.closest("[data-modal-scrollable]")) return;

      e.preventDefault();
      if (Math.abs(e.deltaY) < minDelta) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const next = currentSection + direction;

      if (next >= 0 && next < activeSections.length) {
        scrollLockRef.current = true;
        setCurrentSection(next);
        setTimeout(() => (scrollLockRef.current = false), lockDuration);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentSection, activeSections, isMenuOpen]);

  // ✅ Gestione swipe mobile
  useEffect(() => {
    if (!isMobile) return;

    let startY = 0;
    let endY = 0;
    const threshold = 60;

    const handleTouchStart = (e) => {
      // Ignora il touch se parte da un elemento scrollabile nella modale
      if (e.target.closest("[data-modal-scrollable]")) return;
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      // Anche qui, evita di bloccare lo scroll interno della modale
      if (e.target.closest("[data-modal-scrollable]")) return;
      endY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isMenuOpen || scrollLockRef.current) return;

      // ❗ Se il tocco è partito dentro una modale, ignora completamente
      if (e.target.closest("[data-modal-scrollable]")) return;

      const deltaY = startY - endY;
      if (Math.abs(deltaY) < threshold) return;

      const direction = deltaY > 0 ? 1 : -1;
      const next = currentSection + direction;

      if (next >= 0 && next < activeSections.length) {
        scrollLockRef.current = true;
        setCurrentSection(next);
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

  return {
    isMobile,
    currentSection,
    setCurrentSection,
    containerRef,
    activeSections,
  };
};
