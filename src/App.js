import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import logo from "./assets/logo.png"; // Ensure you have a logo image in the same directory
const sections = [
  { id: "home", label: "Home" },
  { id: "vision-mission", label: "Vision/Mission" },
  { id: "team-projects", label: "Team/Projects" },
];

export default function LandingPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 0 && currentSection < sections.length - 1) {
        setCurrentSection((prev) => prev + 1);
      } else if (e.deltaY < 0 && currentSection > 0) {
        setCurrentSection((prev) => prev - 1);
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentSection]);

  useEffect(() => {
    containerRef.current.scrollTo({
      top: window.innerHeight * currentSection,
      behavior: "smooth",
    });
  }, [currentSection]);

  return (
    <div
      ref={containerRef}
      style={{ height: "100vh", overflow: "hidden", scrollBehavior: "smooth" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        <motion.div
          animate={{ rotate: currentSection * 360 }}
          transition={{ duration: 1 }}
          style={{ textAlign: "center", zIndex: 1 }}
        >
          <img
            src={logo}
            alt="LudosForge Logo"
            style={{ width: 400, height: 400 }}
          />
        </motion.div>
      </div>
      {sections.map((section, index) => (
        <div
          key={section.id}
          id={section.id}
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Split background */}
          {index === 0 && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                paddingTop: "200px",
                fontSize: "larger",
                zIndex: 1,
              }}
            >
              <h1>
                <span style={{ color: "black" }}>LUDOS </span>
                <span style={{ color: "white", backgroundColor: "black" }}>
                  FORGE
                </span>
              </h1>
            </div>
          )}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "50%",
              height: "100%",
              backgroundColor: "white",
              zIndex: 0,
            }}
          >
            <div style={{ margin: "15%" }}>
              {index === 1 && (
                <h2 style={{ color: "black", fontSize: "2rem" }}>Vision</h2>
              )}
              {index === 2 && (
                <h2 style={{ color: "black", fontSize: "2rem" }}>Team</h2>
              )}
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "50%",
              height: "100%",
              backgroundColor: "black",
              zIndex: 0,
            }}
          >
            <div style={{ margin: "15%" }}>
              {index === 1 && (
                <h2 style={{ color: "white", fontSize: "2rem" }}>Mission</h2>
              )}
              {index === 2 && (
                <h2 style={{ color: "white", fontSize: "2rem" }}>Projects</h2>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
