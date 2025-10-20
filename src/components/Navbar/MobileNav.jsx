import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaSteam } from "react-icons/fa6";

export default function MobileNav({
    activeSections,
    currentSection,
    setCurrentSection,
    setIsMenuOpen,
}) {
    return (
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

            {/* Voci animate */}
            {activeSections.map((section, idx) => {
                const isActive = idx === currentSection;
                return (
                    <motion.button
                        key={section.id}
                        className={`relative text-3xl font-semibold tracking-wide px-6 py-2 rounded-md transition-all duration-200 ${isActive
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
                        layout="position"
                    >
                        {section.label}
                    </motion.button>
                );
            })}

            {/* --- Link Iubenda --- */}
            <div className="flex flex-col items-center gap-4 mt-4">
                <a
                    href="https://www.iubenda.com/privacy-policy/25538444"
                    className="iubenda-white iubenda-noiframe iubenda-embed text-white hover:underline font-semibold text-2xl"
                    target="_blank"
                    rel="noreferrer"
                    title="Privacy Policy"
                    onClick={(e) => e.stopPropagation()}
                >
                    Privacy Policy
                </a>

                <a
                    href="https://www.iubenda.com/privacy-policy/25538444/cookie-policy"
                    className="iubenda-white iubenda-noiframe iubenda-embed text-white hover:underline font-semibold text-2xl"
                    target="_blank"
                    rel="noreferrer"
                    title="Cookie Policy"
                    onClick={(e) => e.stopPropagation()}
                >
                    Cookie Policy
                </a>
            </div>

            {/* --- Icone --- */}
            <div className="flex pointer-events-auto gap-6 mt-6">
                <a
                    href="https://store.steampowered.com/search/?developer=Ludos%20Forge"
                    target="_blank"
                    rel="noreferrer"
                    className="text-3xl text-white hover:bg-white/20 rounded-md px-6 py-2 transition-all"
                    onClick={(e) => e.stopPropagation()}
                >
                    <FaSteam />
                </a>

                <a
                    href="mailto:contact@ludosforge.it"
                    className="text-3xl text-white hover:bg-white/20 rounded-md px-6 py-2 transition-all"
                    onClick={(e) => e.stopPropagation()}
                >
                    <FaEnvelope />
                </a>
            </div>
        </motion.div>
    );
}
