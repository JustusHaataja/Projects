const CategorySkeleton = () => {
    return (
        <div
            style={{
                display: "flex",
                gap: "1rem",
                marginTop: "1rem"
            }}
        >
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    style={{
                        width: "120px",
                        height: "40px",
                        background: "#7a7a7a",
                        animation: "pulse 1.5s infinite"
                    }}
                />
            ))}
            <style>
                {`
                    @keyframes pulse {
                        0% { opacity: 1; }
                        50% { opacity: 0.4; }
                        100% { opacity: 1; }
                    }
                `}
            </style>
        </div>
    )
}

export default CategorySkeleton;