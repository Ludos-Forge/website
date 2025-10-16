// useScroll.js
import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useScroll = (
  desktopSections,
  mobileSections,
  isMenuOpen,
  onSectionChange
) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeId, setActiveId] = useState(desktopSections[0].id);

  const scrollLockRef = useRef(false);
  const containerRef = useRef(null);

  const sections = useMemo(
    () => (isMobile ? mobileSections : desktopSections),
    [isMobile]
  );

  // ✅ Detect mobile
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // ✅ iOS height fix
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

  // ✅ Scroll virtuale alla sezione attiva
  useEffect(() => {
    const section = document.getElementById(sections[activeIndex]?.id);
    const container = containerRef.current;
    if (container && section) {
      container.scrollTo({ top: section.offsetTop, behavior: "smooth" });
      setActiveId(sections[activeIndex].id);
      if (onSectionChange) onSectionChange(activeIndex, sections[activeIndex]);
      if (activeIndex === 1) setTimeout(() => ScrollTrigger?.refresh(), 400);

      // 🧭 Hard align check: forzatura per evitare drift
      setTimeout(() => {
        if (!container) return;
        const expectedTop = section.offsetTop;
        const diff = Math.abs(container.scrollTop - expectedTop);
        if (diff > 10) {
          // riallinea duramente
          container.scrollTo({ top: expectedTop, behavior: "instant" });
        }
      }, 700); // dopo la durata media dello smooth scroll
    }
  }, [activeIndex, sections, onSectionChange]);

  // ✅ Controllo input (scroll e touch)
  useEffect(() => {
    if (isMenuOpen) return;

    const lock = (duration = 900) => {
      scrollLockRef.current = true;
      setTimeout(() => (scrollLockRef.current = false), duration);
    };

    const nextSection = (dir) => {
      if (scrollLockRef.current) return;
      const next = activeIndex + dir;
      if (next >= 0 && next < sections.length) {
        setActiveIndex(next);
        lock();
      }
    };

    // 🖱 Scroll mouse / trackpad
    const handleWheel = (e) => {
      if (e.target.closest("[data-modal-scrollable]")) return;
      e.preventDefault();
      if (Math.abs(e.deltaY) < 40) return;
      nextSection(e.deltaY > 0 ? 1 : -1);
    };

    // 🤏 Swipe mobile
    let startY = 0;
    let endY = 0;
    const threshold = 60;

    const handleTouchStart = (e) => {
      if (e.target.closest("[data-modal-scrollable]")) return;
      startY = e.touches[0].clientY;
    };
    const handleTouchMove = (e) => {
      if (e.target.closest("[data-modal-scrollable]")) return;
      endY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e) => {
      if (e.target.closest("[data-modal-scrollable]")) return;
      const deltaY = startY - endY;
      if (Math.abs(deltaY) < threshold) return;
      nextSection(deltaY > 0 ? 1 : -1);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeIndex, isMenuOpen, sections]);

  // 🧭 Align watcher: riallinea anche se l'utente “spamma”
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkAlign = () => {
      if (scrollLockRef.current) return; // evita interferenze
      const currentTop = container.scrollTop;
      const closest = sections.reduce(
        (best, sec, idx) => {
          const diff = Math.abs(currentTop - document.getElementById(sec.id).offsetTop);
          return diff < best.diff ? { idx, diff } : best;
        },
        { idx: activeIndex, diff: Infinity }
      );

      // se è troppo distante, riallinea
      if (closest.diff > 40) {
        setActiveIndex(closest.idx);
      }
    };

    const onScroll = () => {
      clearTimeout(container._alignTimeout);
      container._alignTimeout = setTimeout(checkAlign, 150);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [sections, activeIndex]);

  return {
    containerRef,
    isMobile,
    sections,
    activeIndex,
    activeId,
    setActiveIndex,
  };
};
