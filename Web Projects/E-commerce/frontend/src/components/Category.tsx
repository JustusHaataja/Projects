import { useEffect, useState } from 'react';
import { fetchCategories, type Category } from '../api/categories';
import CategorySkeleton from './CategorySkeleton';
import '../styles/Category.css';

import electrolytes from '../assets/electrolytes3.jpg';
import kombucha from '../assets/kombucha3.jpg';
import energydrink from '../assets/pineapple.jpg';
import protein from '../assets/protein.jpg';


const CATEGORY_IMAGES: Record<number, string> = {
    1: energydrink,
    2: electrolytes,
    3: kombucha,
    4: protein
}

const getGategoryImage = (id: number) => {
    return CATEGORY_IMAGES[id];
}

const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);


const Categories = () => {
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // AbortController allows us to cancel the API request if the component
        // is removed from the DOM (no longer needed)
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
        <div className="category-section" >
            <h2 className="category-header" >Kategoriat</h2>

            <div className="category-container" >
                {categories?.map((cat) => (
                    <div 
                        className="category"
                        key={cat.id}
                    >
                        <div className="image-frame">
                            <img 
                                className="category-image"
                                src={getGategoryImage(cat.id)}
                                alt={`Image of ${cat.name}, on click move to ${cat.name} page`}
                            />
                        </div>
                        <p 
                            className="category-text"
                            aria-label={`On click move to ${cat.name} page`}
                        >
                            {capitalize(cat.name)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Categories;