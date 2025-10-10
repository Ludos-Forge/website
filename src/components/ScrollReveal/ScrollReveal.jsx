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
                <div className={`w-full word`} key={idx}>{child}</div>
            ));
        } else if (children && typeof children === 'object') {
            // Singolo componente React
            return <div className={`w-full word`}>{children}</div>;
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
    if (children && (typeof children === 'object' || Array.isArray(children))) {
        return (
            <div ref={containerRef} className={`${containerClassName} block min-h-[80px]`}>
                <div
                    ref={textRef}
                    className={`${textClassName} text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold`}
                    style={{
                        color: textClassName === 'white-text' ? 'white' : undefined,
                        fontSize: fontSize || undefined
                    }}
                >
                    {splitText}
                </div>
            </div>
        )
    } else {
        return (
            <h2 ref={containerRef} className={`${containerClassName} block min-h-[80px]`}>
                <p
                    ref={textRef}
                    className={`${textClassName} text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold`}
                    style={{
                        color: textClassName === 'white-text' ? 'white' : undefined,
                        fontSize: fontSize || undefined
                    }}
                >
                    {splitText}
                </p>
            </h2>
        );
    }
};

export default ScrollReveal;
