import {type Product} from '../api/products';
import '../styles/ProductCard.css';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const defaultImage = product.images.length > 0 ? product.images[0].image_url : "";
    const hoverImage = product.images.length > 1 ? product.images[1].image_url : null;

    return (
        <div className="product-card" >
            <div className="product-image-container" >
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
            </div>
            <div className="card-details" >
                <h3>{product.name}</h3>
                <p className="price" >{product.price}</p>
                <button className="add-btn" >OSTA</button>
            </div>
        </div>
    )
}

export default ProductCard