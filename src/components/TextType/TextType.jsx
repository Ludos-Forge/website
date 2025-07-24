"use client";

import { useEffect, useRef, useState, createElement } from "react";
import { gsap } from "gsap";
import "./TextType.css";

const TextType = ({
  text,
  as: Component = "div",
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = false,
  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "▌",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = true,
  reverseMode = false,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef(null);
  const containerRef = useRef(null);

  const textArray = Array.isArray(text) ? text : [text];

  const getRandomSpeed = () => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  };

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
    if (!isVisible) return;

    let timeout;
    const currentText = textArray[currentTextIndex];
    const processedText = reverseMode
      ? currentText.split("").reverse().join("")
      : currentText;

    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === "") {
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1 && !loop) {
            return;
          }

          if (onSentenceComplete) {
            onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
          }

          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
          timeout = setTimeout(() => { }, pauseDuration);
        } else {
          timeout = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else {
        if (currentCharIndex < processedText.length) {
          timeout = setTimeout(
            () => {
              setDisplayedText(
                (prev) => prev + processedText[currentCharIndex]
              );
              setCurrentCharIndex((prev) => prev + 1);
            },
            variableSpeed ? getRandomSpeed() : typingSpeed
          );
        } else if (textArray.length > 1) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === "") {
      timeout = setTimeout(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    onSentenceComplete,
  ]);

  // const shouldHideCursor =
  //   hideCursorWhileTyping &&
  //   (currentCharIndex < textArray[currentTextIndex].length || isDeleting);

  // Funzione per alternare i colori tra bianco e nero
  const getAlternatingColor = (index = 0) => (index % 2 === 0 ? '#000' : '#fff');

  // Rendering custom: ogni parola alterna colore
  const renderColoredText = () => {
    // Split il testo digitato in parole e spazi
    const parts = displayedText.split(/(\s+)/);
    const filteredParts = parts.filter(part => !/^\s+$/.test(part));
    return filteredParts.map((part, idx) => {
      const regex = new RegExp(`\\b${part}\\b`, 'i');
      // Se è solo spazio, lo restituisco così com'è
      // Altrimenti applico colore alternato
      return (
        <>
          <span key={idx} style={{ color: getAlternatingColor(idx) }}>{(idx !== filteredParts.length - 1) ? part + "   " : part}</span>
          {renderCursor(idx, regex.test(textArray[0]))}
        </>
      );
    });
  };

  const renderCursor = (idx, hide = false) => {
    return (shouldShowCursor && (
      <span
        ref={cursorRef}
        style={{ color: getAlternatingColor(idx) }}
        className={`text-type__cursor text-7xl ${cursorClassName} ${hide ? "text-type__cursor--hidden" : ""}`}
      >
        {cursorCharacter}
      </span>
    ))
  }

  // Mostra il cursore solo se la digitazione è in corso, in cancellazione, oppure se il loop è attivo
  const isTypingOrDeleting =
    (currentCharIndex < textArray[currentTextIndex].length || isDeleting) || loop;
  const shouldShowCursor = showCursor && isTypingOrDeleting;

  return createElement(
    Component,
    {
      ref: containerRef,
      className: `text-type font-['Times_New_Roman'] text-7xl ${className}`,
      ...props,
    },
    <span className="text-type__content">
      {renderColoredText()}

    </span>,

  );
};

export default TextType;
