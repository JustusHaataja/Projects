import { Link, useLocation } from 'react-router-dom';
import '../styles/Breadcrumbs.css'; // We will create this next


const routeNameMap: { [key: string] : string } = {
    "products": "Tuotteet",
    "about": "meistä",
    "cart": "Ostoskori",
}

const Breadcrumbs = () => {
    const location = useLocation();
    
    // 1. Split the path into segments (e.g., "/products/shoes" -> ["", "products", "shoes"])
    // 2. Filter out empty strings
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <nav className="breadcrumbs" aria-label="breadcrumb">
            <ol>
                <li>
                    <Link to="/">Etusivu</Link>
                </li>

                {/* Dynamic Links */}
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    const displayName = routeNameMap[value] || value.charAt(0).toUpperCase() + value.slice(1);

                    return (
                        <li key={to}>
                            <span className="separator">/</span>
                            {isLast ? (
                                <span className="current">{displayName}</span>
                            ) : (
                                <Link to={to}>{displayName}</Link>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;