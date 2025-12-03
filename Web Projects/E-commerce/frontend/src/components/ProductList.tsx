import { useEffect, useState } from 'react';
import { fetchAllProducts, type Product } from '../api/products';
import ProductCard from './ProductCard';
import '../styles/ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchAllProducts();
                setProducts(data);
            } catch (err) {
                setError("Failed to load products");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    if (loading) return <div>Ladataan tuotteita</div> // TODO: add skeleton
    if (error) return <div>{error}</div>

    return (
        <div className="product-list-container" >
            <div className="product-grid" >
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default ProductList