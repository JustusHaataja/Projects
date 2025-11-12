import '../styles/keyframes.css';
import { useEffect, useRef } from "react";

interface ScaleTransitionProps {
    src: string;
    style?: React.CSSProperties;
    active?: boolean;
}

const ScaleTransition: React.FC<ScaleTransitionProps> = ({ src, style, active }) => {
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!imgRef.current || !active) return;
        const img = imgRef.current;

        img.style.animation = "none";
        void img.offsetHeight;
        img.style.animation = "zoomOut 4000ms ease-out forwards"
    }, [active]);

    return (
        <img
            ref={imgRef}
            src={src}
            style={{ 
                width: "80%",
                transformOrigin: "center",
                ...style
            }}
        />
    )
}

export default ScaleTransition