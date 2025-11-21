import { useEffect, useState } from 'react';
import { fetchCategories, type Category } from '../api/categories';
import CategorySkeleton from './CategorySkeleton';

const Categories = () => {
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // AbortController allows us to cancel the API request if the component
        //  is removed from the DOM (no longer needed)
        const controller = new AbortController();

        fetchCategories(controller.signal)
            .then((data) => setCategories(data))
            .catch((err) => {
                if (err.name === "CanceledError") return;
                else { console.error(err) }
            })
            .finally(() => setLoading(false));
        
        return () => controller.abort();
    }, []);

    if (loading) return <CategorySkeleton />;

    return (
        <div>
            <h2>Kategoriat</h2>

            <div
                style={{
                    display: "flex"
                }}
            >
                {categories?.map((cat) => (
                    <div
                        key={cat.id}
                    >
                        {cat.name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Categories;