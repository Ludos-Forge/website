import React from "react";
import { ProjectTimeline } from "../ProjectTimeline";

export default function Projects({ isMobile, isBlack }) {
  return (
    <div className={`px-5 py-10 ${!isMobile ? "my-24 mx-48" : ""}`}>
      <h2 className={`text-4xl md:text-5xl mb-6 ${isBlack ? "text-white" : "text-black"}`}>Projects</h2>
      <div className="h-full overflow-auto">
        <ProjectTimeline />
      </div>
    </div>
  );
}
