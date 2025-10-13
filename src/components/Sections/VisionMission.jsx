import React from "react";
import ScrollReveal from "../ScrollReveal/ScrollReveal";

export default function VisionMission({ currentSection, index, isMobile }) {
  if (isMobile) {
    return (
      <div className="flex flex-col w-full h-screen justify-between">
        <div className="w-full bg-white text-black pt-8 px-5 flex flex-col">
          <h2 className="text-4xl mb-6">Vision</h2>
          <ScrollReveal enableBlur baseRotation={0} blurStrength={10} active={currentSection === index}>
            We bring to life the worlds we've always dreamed of as gamers. We envision a future where every indie developer
            can turn their passion into authentic, innovative, and unforgettable gaming experiences. A world where
            creativity knows no limits, and every team member's voice helps shape the adventure.
          </ScrollReveal>
        </div>

        <div className="w-full bg-black text-white px-5 py-10 flex flex-col text-right">
          <h2 className="text-4xl mb-6">Mission</h2>
          <ScrollReveal enableBlur baseRotation={0} blurStrength={10} textClassName="white-text" active={currentSection === index}>
            We forge video games with passion, creative freedom, and collective spirit. Ludos Forge was born from the desire
            to create indie games that reflect what made us fall in love with gaming: engaging stories, original mechanics,
            and vibrant worlds. We believe in an open development environment, where every idea matters and each team member
            contributes to the creative process. Every game is a challenge, a dream, and a love letter to those who play.
          </ScrollReveal>
        </div>
      </div>
    );
  }

  // desktop layout
  return (
    <>
      <div className="absolute top-0 left-0 w-1/2 h-full bg-white z-0">
        <div className="h-full my-24 mx-48">
          <h2 className="text-5xl text-black mb-8">Vision</h2>
          <ScrollReveal enableBlur baseRotation={0} blurStrength={10} active={currentSection === index} fontSize="2rem">
            We bring to life the worlds we’ve always dreamed of as gamers. We envision a future where every indie developer
            can turn their passion into authentic, innovative, and unforgettable gaming experiences. A world where creativity
            knows no limits, and every team member's voice helps shape the adventure.
          </ScrollReveal>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-1/2 h-full bg-black z-0">
        <div className="h-full my-24 mx-48 text-right">
          <h2 className="text-white text-5xl mb-8">Mission</h2>
          <ScrollReveal
            enableBlur
            baseRotation={0}
            blurStrength={10}
            textClassName="white-text"
            active={currentSection === index}
            fontSize="2rem"
          >
            We forge video games with passion, creative freedom, and collective spirit. Ludos Forge was born from the desire
            to create indie games that reflect what made us fall in love with gaming: engaging stories, original mechanics,
            and vibrant worlds. We believe in an open development environment, where every idea matters and each team member
            contributes to the creative process. Every game is a challenge, a dream, and a love letter to those who play.
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
