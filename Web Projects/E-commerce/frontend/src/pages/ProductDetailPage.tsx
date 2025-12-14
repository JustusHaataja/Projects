import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById, type Product } from '../api/products';
import Breadcrumbs from '../components/Breadcrumbs';
import { useCart } from '../context/CartContext';
import '../styles/ProductDetail.css';

const ProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1);

    const { addToCart, loading: cartLoading } = useCart();

    useEffect(() => {
        const loadProduct = async () => {
            if (!id) return;
            try {
                const data = await fetchProductById(Number(id));
                setProduct(data);
            } catch (err) {
                setError("Failed to laod product details.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        loadProduct();
    }, [id]);

    const handleAddToCart = async () => {
        if (product) {
            await addToCart(product.id, quantity);
        }
    };

    if (loading) return <div style={{ height: "100vh", marginTop: "100px", textAlign: "center" }} >Ladataan...</div>
    if (!product) return <div style={{ height: "100vh", marginTop: "100px", textAlign: "center" }} >Tuotetta ei löytynyt</div>
    if (error) return <div style={{ height: "100vh", marginTop: "100px", textAlign: "center" }} >{error}</div>

    const defaultImage = product.images.length > 0 ? product.images[0].image_url : "";

    return (
        <div className="product-detail-page" >
            <Breadcrumbs ItemName={product?.name} />

            <div className="product-detail-container" >
                <div className="product-image-section" >
                    {/* <img 
                        src={defaultImage} 
                        alt="main-product-image" 
                    /> */}
                    <div>
                        {product.images.map((img, index) => (
                            <img 
                                key={index}
                                src={img.image_url}
                            />
                        ))}
                    </div>
                </div>

                <div className="product-info-section" >
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