import { useEffect, useRef, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';

import './ScrollReveal.css';

const ScrollReveal = ({
    children,
    enableBlur = true,
    baseOpacity = 0.1,
    baseRotation = 3,
    blurStrength = 4,
    containerClassName = "",
    textClassName = "",
    rotationEnd = "bottom bottom",
    wordAnimationEnd = "bottom bottom",
    active = true, // di default true per retrocompatibilità
    fontSize // nuovo parametro opzionale
}) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    // Utility per estrarre testo anche da children non stringa
    const extractText = useCallback((node) => {
        if (typeof node === 'string') return node;
        if (Array.isArray(node)) return node.map(extractText).join(' ');
        if (node && node.props && node.props.children) return extractText(node.props.children);
        return '';
    }, []);

    const splitText = useMemo(() => {
        if (typeof children === 'string') {
            const text = extractText(children);
            return text.split(/(\s+)/).map((word, index) => {
                if (word.match(/^\s+$/)) return word;
                return (
                    <span className="word" key={index}>
                        {word}
                    </span>
                );
            });
        } else if (Array.isArray(children)) {
            return children.map((child, idx) => (
                <span className="word" key={idx}>{child}</span>
            ));
        } else if (children && typeof children === 'object') {
            // Singolo componente React
            return <span className="word">{children}</span>;
        } else {
            return null;
        }
    }, [children, extractText]);

    useEffect(() => {
        if (!active) return;
        const textEl = textRef.current;
        if (!textEl) {
            console.warn('ScrollReveal: textRef non trovato');
            return;
        }
        const wordElements = textEl.querySelectorAll('.word');
        console.log('ScrollReveal wordElements:', wordElements);

        // Animazione automatica, non vincolata allo scroll
        gsap.fromTo(
            wordElements,
            { opacity: baseOpacity, willChange: 'opacity', filter: enableBlur ? `blur(${blurStrength}px)` : 'none' },
            {
                opacity: 1,
                filter: 'blur(0px)',
                stagger: 0.05,
                duration: 0.8,
                ease: 'power2.out',
                delay: 0.2,
            }
        );

        return () => {
            gsap.killTweensOf(wordElements);
        };
    }, [children, enableBlur, baseOpacity, blurStrength, active]);

    // Forza uno stile minimo per il contenitore
    return (
        <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`} style={{ minHeight: 80, display: 'block' }}>
            <p
                ref={textRef}
                className={`scroll-reveal-text ${textClassName}`}
                style={{
                    color: textClassName === 'white-text' ? 'white' : undefined,
                    fontSize: fontSize || undefined
                }}
            >
                {splitText}
            </p>
        </h2>
    );
};

export default ScrollReveal;
