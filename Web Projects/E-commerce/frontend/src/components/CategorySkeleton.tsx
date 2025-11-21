import Skeleton from './Skeleton';

const CategorySkeleton = () => {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: "1rem",
                marginTop: "1rem"
            }}
        >
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    style={{
                        padding: "1rem",
                        background: "#f5f5f5",
                        borderRadius: "8px",
                        textAlign: "center"
                    }}
                >
                    <Skeleton width="80%" height="20px" />
                </div>
            ))}
        </div>
    )
}

export default CategorySkeleton;