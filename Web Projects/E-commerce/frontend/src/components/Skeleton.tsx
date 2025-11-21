import React from 'react';

interface SkeletonProps {
    width?: string;
    height?: string;
    radius?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
    width = "100%",
    height = "1rem",
    radius = "8px"
}) => {
    return (
        <div 
            style={{
                width,
                height,
                borderRadius: radius,
                background: "#e0e0e0",
                animation: "pulse 1.5s infinite ease-in-out"
            }}
        />
    )
}

export default Skeleton;