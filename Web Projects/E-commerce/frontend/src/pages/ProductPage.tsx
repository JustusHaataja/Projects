import Breadcrumbs from '../components/Breadcrumbs';
import ProductsHero from '../components/ProductsHero';
import ProductList from '../components/ProductList';

const ProductPage = () => {
    return (
        <div style={{ marginTop: "100px"}}>
            <Breadcrumbs />
            <ProductsHero />
            <ProductList />
        </div>
    )
}

export default ProductPage