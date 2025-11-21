import { useEffect, useState } from 'react';
import { fetchCategories, type Category } from '../api/categories';

const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategories().then(setCategories);
    }, []);

    return (
        <div></div>
    )
}

export default Categories