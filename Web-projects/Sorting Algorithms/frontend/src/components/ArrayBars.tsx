import React, { useEffect, useState } from "react"
import "./ArrayBars.css"

interface Props {
    array: number[];
    activeIndices?: number[];
}

const ArrayBars: React.FC<Props> = ({ array, activeIndices = [] }) => {
    const [containerHeight, setContainerHeight] = useState(() => 
        Math.min(window.innerHeight * 0.7, 500));

    useEffect(() => {
        const handleResize = () => {
            setContainerHeight(Math.min(window.innerHeight * 0.7, 500));
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const maxHeight = Math.max(...array);

    return (
        <div className="array-container" style={{ height: `${containerHeight}px`}}>
            {array.map((value, index) => {
                const isActive = Array.isArray(activeIndices) && activeIndices.includes(index);
                const barHeight = (value / maxHeight) * containerHeight;

                return (
                    <div className={`array-bar ${isActive ? "active" : ""}`}
                        key={index}
                        style= {{
                            height: `${barHeight}px`,
                        }}
                    />
                );
            })}
        </div> 
    );
};

export default ArrayBars;