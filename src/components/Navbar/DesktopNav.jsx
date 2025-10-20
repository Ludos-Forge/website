import React from "react";
import { FaEnvelope, FaSteam } from "react-icons/fa6";

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

            {/* Iubenda links */}
            <a
                href="https://www.iubenda.com/privacy-policy/25538444"
                target="_blank"
                rel="noreferrer"
                className="iubenda-white iubenda-noiframe iubenda-embed font-semibold text-base text-[#222] hover:underline"
                title="Privacy Policy"
            >
                Privacy Policy
            </a>
            <a
                href="https://www.iubenda.com/privacy-policy/25538444/cookie-policy"
                target="_blank"
                rel="noreferrer"
                className="iubenda-white iubenda-noiframe iubenda-embed font-semibold text-base text-[#222] hover:underline"
                title="Cookie Policy"
            >
                Cookie Policy
            </a>
            {/* Steam e Mail */}
            <a
                href="https://store.steampowered.com/search/?developer=Ludos%20Forge"
                target="_blank"
                rel="noreferrer"
                key="steam"
                className="rounded-[4px] py-[0.4rem] px-[0.9rem] font-semibold text-xl bg-transparent text-[#222]"
            >
                <FaSteam />
            </a>
            <a
                href="mailto:contact@ludosforge.it"
                className="rounded-[4px] py-[0.4rem] px-[0.9rem] font-semibold text-xl bg-transparent text-[#222]"
            >
                <FaEnvelope />
            </a>

        </div>
    );
}
