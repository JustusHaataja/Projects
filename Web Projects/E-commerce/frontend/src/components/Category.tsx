import { useEffect, useState } from 'react';
import { fetchCategories, type Category } from '../api/categories';
import CategorySkeleton from './CategorySkeleton';

const Categories = () => {
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        fetchCategories(controller.signal)
            .then((data) => {
                setCategories(data);
                setLoading(false);
            })
            .catch((err) => {
                if (err.name == "CanceledError") return;    // axios abort
                console.error("fetchCategories failed:", err);
            })
            .finally(() => setLoading(false));
        
        return () => controller.abort();
    }, []);

    if (loading) return <CategorySkeleton />;

    return (
        <div>
            <h2>Kategoriat</h2>

            <div>
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