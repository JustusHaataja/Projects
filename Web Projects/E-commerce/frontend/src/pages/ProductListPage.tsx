import Breadcrumbs from '../components/Breadcrumbs';
import ProductsHero from '../components/ProductsHero';
import ProductList from '../components/ProductList';

const ProductListPage = () => {
    return (
        <div style={{ marginTop: "100px"}}>
            <Breadcrumbs />
            <ProductsHero />
            <ProductList />
        </div>
    )
}

export default ProductListPage