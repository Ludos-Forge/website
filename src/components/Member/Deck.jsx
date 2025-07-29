import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Member from "./Member";

export default function Deck({ members }) {
  const [deck, setDeck] = useState(members);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        // Dopo l'animazione, aggiorna la pila
        
        setDeck((prev) => {
          const updated = [...prev];
          const first = updated.shift();
          return updated;
        });
        setIsAnimating(false);
      }, 600); // durata animazione
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <AnimatePresence>
        {deck.map((emp, i) => {
          const isFirst = i === 0;
          return (
            <motion.div
              key={emp.name}
              initial={false}
              animate={{
                left: `${i * 32}px`, top: `${-i * 10}px`,
                zIndex: deck.length - i,
                position: "absolute",
              }}
              exit={isFirst ? { x: -200, opacity: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{ height: "600px" }}

            >
              <Member member={emp} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div >
  );
}