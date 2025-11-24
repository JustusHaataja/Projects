import { useEffect, useState } from 'react';
import { fetchCategories, type Category } from '../api/categories';
import CategorySkeleton from './CategorySkeleton';

const Categories = () => {
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // AbortController allows us to cancel the API request if the component
        //  is removed from the DOM (no longer needed)
        const controller = new AbortController();

        setError(null);

        fetchCategories(controller.signal)
            .then((data) => {
                setCategories(data)
            })
            .catch((err: any) => {
                if (err.name === "CanceledError") return;
                console.error(err)
                setError("Error loading categories")
            })
            .finally(() => {

            });
        
        return () => controller.abort();
    }, []);

    if (error) return <CategorySkeleton />;

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