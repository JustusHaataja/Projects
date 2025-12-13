import { useEffect, useState } from 'react';
import { fetchAllProducts, type Product } from '../api/products';
import ProductCard from './ProductCard';
import '../styles/MonthlyPicks.css';

const MonthlyPicks = () => {
    const [picks, setPicks] = useState<Product[]>([]);

    useEffect(() => {
        const loadPicks = async () => {
            try {
                const allProducts = await fetchAllProducts();

                const randomPicks = allProducts
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 10);

                setPicks(randomPicks);
            } catch (error) {
                console.error("Failed to load onthly picks", error);
            }
        }

        loadPicks();
    }, [])

    if (picks.length === 0) return null;

    return (
        <div className="monthly-picks-section" >
            <h2 className="section-title" >Kuukauden nostot</h2>

            <div className="marquee-container" >
                <div className="marquee-track" >
                    {[...picks, ...picks].map((product, index) => (
                        <div className="carousel-item" key={`${product.id}-${index}`} >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MonthlyPicks