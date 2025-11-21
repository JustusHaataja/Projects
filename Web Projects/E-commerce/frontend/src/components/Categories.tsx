import { useEffect, useState } from 'react';
import { fetchCategories, type Category } from '../api/categories';
import CategoriesSkeleton from './CategoriesSkeleton';

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
                console.error(err);
                setLoading(false);
            });
        
        return () => controller.abort();
    }, []);

    if (loading) return <CategoriesSkeleton />;

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