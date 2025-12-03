import {type Product} from '../api/products';
import '../styles/ProductCard.css';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className="product-card" >
            <div className="image-container" >

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