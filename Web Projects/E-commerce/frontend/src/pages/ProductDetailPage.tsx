import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById, type Product } from '../api/products';
import Breadcrumbs from '../components/Breadcrumbs';

const ProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProduct = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const data = await fetchProductById(Number(id));
                setProduct(data);
            } catch (error) {
                console.error("Failed to fetch product", error);
            } finally {
                setLoading(false);
            }
        }
        loadProduct();
    }, [id]);

    if (loading) return <div style={{ marginTop: "100px", textAlign: "center" }}>Ladataan...</div>
    if (!product) return <div style={{ marginTop: "100px", textAlign: "center" }}>Tuotetta ei löytynyt</div>;

    return (
        <div style={{ marginTop: "100px"}}>
            <Breadcrumbs ItemName={product?.name} />

            <div className="product-detail-container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr"}}>
                <div className="product-gallery" >
                    {product.images.map((_, index) => (
                        <img 
                            src={product.images[index]?.image_url} 
                            alt={product.name} 
                        />
                    ))}
                </div>

                <div className="product-info" >
                    <h1>{product.name}</h1>
                    <p>{product.price}</p>
                    <p>{product.description}</p>
                    <button>Lisää ostoskoriin</button>
                </div>
            </div>
        </div>
    )
}

export default ProductPage