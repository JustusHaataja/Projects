import Skeleton from './Skeleton';

const CategoriesSkeleton = () => {
    return (
        <div>
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                >
                    <Skeleton width="80%" height="40px" />
                </div>
            ))}
        </div>
    )
}

export default CategoriesSkeleton;