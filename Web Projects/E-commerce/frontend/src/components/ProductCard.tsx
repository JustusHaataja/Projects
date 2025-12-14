import { Link } from 'react-router-dom';
import {type Product} from '../api/products';
import { useCart } from '../context/CartContext';
import '../styles/ProductCard.css';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const { addToCart, loading } = useCart();

    const defaultImage = product.images.length > 0 ? product.images[0].image_url : "";
    const hoverImage = product.images.length > 1 ? product.images[1].image_url : null;
    
    const productUrl = `/products/${product.id}`;

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        await addToCart(product.id);
    }

    return (
        <div className="product-card" >
            <Link to={productUrl} className="product-image-container" >
                <img
                    src={defaultImage}
                    alt={product.name}
                    loading="lazy"
                    className="product-image default"
                />
                {hoverImage && (
                    <img 
                        src={hoverImage} 
                        alt={product.name}
                        loading="lazy"
                        className="product-image hover"
                    />
                )}
            </Link>
            <div className="card-details" >
                <Link to={productUrl} className="product-title">
                    <h3>{product.name}</h3>
                </Link>
                {product.sale_price ? (
                    <div className="price-container" >
                        <span className="sale-price" >{product.sale_price}</span>
                        <span className="original-price" >{product.price}</span>
                    </div>
                ) : (
                    <p className="price" >{product.price}</p>
                )}
                
                <button 
                    className="add-btn"
                    onClick={handleAddToCart}
                    disabled={loading} 
                >
                    {loading ? "..." : "OSTA"}
                </button>
            </div>
        </div>
    )
}

export default ProductCard