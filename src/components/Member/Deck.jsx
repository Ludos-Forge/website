import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Member from "./Member";

export default function Deck({ members }) {
  const [deck, setDeck] = useState(members);
  const [exitingCard, setExitingCard] = useState(null);
  const intervalRef = useRef(null);

  // Funzione per avviare l'animazione automatica
  const startAutoPlay = useCallback(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setExitingCard((prev) => deck[0]);
        setDeck((prev) => prev.slice(1));
      }, 3000);
    }
  }, [deck]);

  // Funzione per fermare l'animazione automatica
  const stopAutoPlay = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay(); // clear on unmount
  }, [deck, startAutoPlay, stopAutoPlay]);

  const handleExitComplete = () => {
    if (exitingCard) {
      setDeck((prev) => [...prev, exitingCard]);
      setExitingCard(null);
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 justify-center items-center">
      {members.map((member, idx) => (
        <div key={member.id || idx} className="w-full md:w-1/2 lg:w-1/3">
          <Member {...member} />
        </div>
      ))}
    </div>
  );
}
