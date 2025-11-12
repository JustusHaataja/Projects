import { useEffect, useRef } from "react";

interface ScaleTransitionProps {
    src: string;
    style?: React.CSSProperties;
    active?: boolean;
}

const ScaleTransition: React.FC<ScaleTransitionProps> = ({ src, style, active }) => {
    const duration = 4000;
    const imgRef = useRef<HTMLImageElement>(null);

    const triggerScale = () => {
        const img = imgRef.current;
        if (!img) return;

        img.style.transition = "none";
        img.style.transform = "scale(1.2)";
        requestAnimationFrame(() => {
            img.style.transition = `transform ${duration}ms ease-out`;
            img.style.transform = "scale(1)";
        });
    };

    // Trigger transition on mount
    useEffect(() => {
        if (active) triggerScale();
    }, [active]);

    return (
        <img
            ref={imgRef}
            src={src}
            style={{ transform: "scale(1.2)", width:"80%", ...style}}
        />
    )
}

export default ScaleTransition