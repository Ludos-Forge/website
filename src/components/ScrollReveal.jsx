import { useEffect, useRef, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';

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
    function extractText(node) {
        if (typeof node === 'string') return node;
        if (Array.isArray(node)) return node.map(extractText).join(' ');
        if (node && node.props && node.props.children) return extractText(node.props.children);
        return '';
    }

    // Determina se usare <p> o <div> come contenitore
    const isString = typeof children === 'string';
    const WrapperTag = isString ? 'p' : 'div';

    const splitText = useMemo(() => {
        if (isString) {
            const text = extractText(children);
            return text.split(/(\s+)/).map((word, index) => {
                if (word.match(/^\s+$/)) return word;
                return (
                    <span className="word inline-block" key={index}>
                        {word}
                    </span>
                );
            });
        } else if (Array.isArray(children)) {
            return children.map((child, idx) => (
                <div className="word" key={idx}>{child}</div>
            ));
        } else if (children && typeof children === 'object') {
            // Singolo componente React
            return [<div className="word" key={0}>{children}</div>];
        } else {
            return null;
        }
    }, [children, isString, extractText]);

    useEffect(() => {
        if (!active) return;
        const textEl = textRef.current;
        if (!textEl) {
            console.warn('ScrollReveal: textRef non trovato');
            return;
        }
        const wordElements = textEl.querySelectorAll('.word');

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

    return (
        <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`} style={{ minHeight: 80, display: 'block' }}>
            <WrapperTag
                ref={textRef}
                className={`scroll-reveal-text ${textClassName}`}
                style={{
                    color: textClassName === 'white-text' ? 'white' : undefined,
                    fontSize: fontSize || undefined
                }}
            >
                {splitText}
            </WrapperTag>
        </h2>
    );
};

export default ScrollReveal;
