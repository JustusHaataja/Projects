const CategorySkeleton = () => {
    return (
        <div
            style={{
                justifyItems: "center",
                gap: "1rem",
                marginTop: "1rem"
            }}
        >
            <h2>Kategoriat</h2>
            <div
                style={{
                    display: "flex",
                    gap: "40px",
                }}
            >
                {[...Array(4)].map((_, i) => (
                    <div key={i} style={{ justifyItems: "center" }}>
                        <div
                            style={{
                                width: "120px",
                                height: "120px",
                                borderRadius: "50%",
                                background: "#7a7a7a",
                                animation: "pulse 1.5s infinite"
                            }}
                        />
                        <div
                            style={{
                                width: "104px",
                                height: "24px",
                                borderRadius: "8px",
                                background: "#7a7a7a",
                                animation: "pulse 1.5s infinite"
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategorySkeleton;