

import React from "react";

export default function DesktopNav({
    activeSections,
    currentSection,
    setCurrentSection,
}) {
    return (
        <div className="bg-[rgba(255,255,255,0.85)] rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] py-[0.5rem] px-[1.2rem] flex gap-4 items-center">
            {activeSections.map((section, idx) => (
                <button
                    key={section.id}
                    onClick={() => setCurrentSection(idx)}
                    className={`rounded-[4px] py-[0.4rem] px-[0.9rem] font-semibold text-base transition-colors duration-200 ${idx === currentSection
                            ? "bg-[#222] text-white"
                            : "bg-transparent text-[#222]"
                        }`}
                >
                    {section.label}
                </button>
            ))}
        </div>
    );
}
