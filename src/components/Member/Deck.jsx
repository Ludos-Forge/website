import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Member from "./Member";

export default function Deck({ members }) {
  const [deck, setDeck] = useState(members);
  const [exitingCard, setExitingCard] = useState(null);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  // autoplay
  const startAutoPlay = useCallback(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setExitingCard(deck[0]);
        setDeck((prev) => prev.slice(1));
      }, 3000);
    }
  }, [deck]);

  const stopAutoPlay = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [deck, startAutoPlay, stopAutoPlay]);

  const handleExitComplete = () => {
    if (exitingCard) {
      setDeck((prev) => [...prev, exitingCard]);
      setExitingCard(null);
    }
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
      ref={containerRef}
    >
      {/* Desktop: stack effect */}
      <div className="hidden sm:block relative w-full max-w-5xl mx-auto h-[600px]">
        <AnimatePresence onExitComplete={handleExitComplete}>
          {deck.map((emp, i) => {
            const isFirst = i === 0;
            return (
              <motion.div
                key={emp.name}
                initial={isFirst ? { x: 200, opacity: 0 } : false}
                animate={{
                  left: `${i * 32}px`,
                  top: `${-i * 10}px`,
                  zIndex: deck.length - i,
                  position: "absolute",
                  opacity: 1,
                  x: 0,
                }}
                exit={isFirst ? { x: -200, opacity: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Member member={emp} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Mobile: horizontal swipe */}
      <div className="flex sm:hidden gap-4 px-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        {members.map((emp) => (
          <div key={emp.name} className="snap-center flex-shrink-0">
            <Member member={emp} />
          </div>
        ))}
      </div>
    </div>
  );
}
