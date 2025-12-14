import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById, type Product } from '../api/products';
import Breadcrumbs from '../components/Breadcrumbs';
import '../styles/ProductDetail.css';

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

    if (loading) return <div style={{ height: "100vh", marginTop: "100px", textAlign: "center" }} >Ladataan...</div>
    if (!product) return <div style={{ height: "100vh", marginTop: "100px", textAlign: "center" }} >Tuotetta ei löytynyt</div>;

    return (
        <div className="product-detail-section" >
            <Breadcrumbs ItemName={product?.name} />

            <div className="product-detail-container" >
                <div className="product-gallery" >
                    {product.images.map((_, index) => (
                        <img 
                            src={product.images[index]?.image_url} 
                            alt={product.name} 
                        />
                    ))}
                </div>

                <div className="product-info" >
                    <h1 className="detail-header" >{product.name}</h1>
                    <p className="detail-price" >{product.price} €</p>
                    <h2 className="detail-header2" >Tuote lyhyesti</h2>
                    <p className="detail-desc" >{product.description}</p>
                    <button>Lisää ostoskoriin</button>
                </div>
            </div>
        </div>
    )
}

export default ProductPage