import React from "react";
// Indicatori laterali per mobile
const SectionIndicators = ({ activeSections, currentSection, setCurrentSection }) => {
  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-[50] md:hidden bg-gray-500 p-2 rounded-full opacity-50 ">
      {activeSections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => setCurrentSection(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index === currentSection
              ? "bg-white scale-125 shadow-[0_0_6px_rgba(255,255,255,0.6)]"
              : "bg-gray-400/50"
          }`}
        />
      ))}
    </div>
  );
};
export default SectionIndicators;