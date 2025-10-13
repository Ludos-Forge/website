import React from "react";
import { Deck } from "../Member";

export default function Team({ isMobile, isBlack, members }) {
  return (
    <div className={`px-5 py-10 ${!isMobile ? "my-24 mx-48" : ""}`}>
      <h2 className={`text-4xl md:text-5xl mb-6 ${isBlack ? "text-white" : "text-black"}`}>Team</h2>
      <Deck members={members} />
    </div>
  );
}
