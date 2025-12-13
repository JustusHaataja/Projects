import Breadcrumbs from '../components/Breadcrumbs';
import ProductsHero from '../components/ProductsHero';
import ProductList from '../components/ProductList';
import { useSearchParams } from 'react-router-dom';

const CATEGORY_INFO: Record<number, { title: string, description: string }> = {
    1: { 
        title: "Energiajuomat", 
        description: "Puhdasta energiaa luonnollisista lähteistä ilman turhia lisäaineita." 
    },
    2: { 
        title: "Elektrolyytit", 
        description: "Optimaalista nesteytystä ja suorituskykyä treeniin ja arkeen." 
    },
    3: { 
        title: "Kombucha", 
        description: "Hyvää tekevät kuplat ja probiootit vatsasi hyvinvointiin." 
    },
    4: { 
        title: "Proteiinit", 
        description: "Laadukkaat proteiinit lihaskasvuun ja palautumiseen." 
    }
}

const ProductListPage = () => {
    const [searchParams] = useSearchParams();
    const categoryID = searchParams.get("category_id");

    const currentCategory = categoryID ? CATEGORY_INFO[Number(categoryID)] : null;

    return (
        <div style={{ marginTop: "100px"}}>
            <Breadcrumbs ItemName={currentCategory?.title} />

            {!categoryID ? (
                <ProductsHero />
            ) : (
                <div className="category-header" >
                    <h1>
                        {currentCategory?.title || "Tuotteet"}
                    </h1>
                    <p>
                        {currentCategory?.description}
                    </p>
                </div>
            )}
            
            <ProductList />
        </div>
    )
}

export default ProductListPage