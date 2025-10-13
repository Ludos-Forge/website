

import React from "react";
import { FaBars } from "react-icons/fa6";
import { AnimatePresence } from "framer-motion";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function Navbar({
    isMobile,
    desktopSections,
    mobileSections,
    currentSection,
    setCurrentSection,
    isMenuOpen,
    setIsMenuOpen,
}) {
    return (
        <nav className="fixed top-6 right-8 z-[100]">
            {/* Desktop nav */}
            {!isMobile && (
                <DesktopNav
                    activeSections={desktopSections}
                    currentSection={currentSection}
                    setCurrentSection={setCurrentSection}
                />
            )}

            {/* Mobile hamburger */}
            {isMobile && (
                <>
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="text-[#222] bg-[rgba(255,255,255,0.85)] rounded-full shadow-md p-3 focus:outline-none hover:bg-white transition"
                    >
                        <FaBars />
                    </button>

                    <AnimatePresence>
                        {isMenuOpen && (
                            <MobileNav
                                activeSections={mobileSections}
                                currentSection={currentSection}
                                setCurrentSection={setCurrentSection}
                                setIsMenuOpen={setIsMenuOpen}
                            />
                        )}
                    </AnimatePresence>
                </>
            )}
        </nav>
    );
}