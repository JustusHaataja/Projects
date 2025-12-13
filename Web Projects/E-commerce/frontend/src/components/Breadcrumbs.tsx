import { Link, useLocation } from 'react-router-dom';
import '../styles/Breadcrumbs.css';

// Define props to accept a custom name
interface BreadcrumbsProps {
    ItemName?: string;
}

const routeNameMap: { [key: string] : string } = {
    "products": "Tuotteet",
    "about": "Meistä",
    "cart": "Ostoskori",
}

const Breadcrumbs = ({ ItemName }: BreadcrumbsProps) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <nav className="breadcrumbs" aria-label="breadcrumb" >
            <ol>
                <li>
                    <Link to="/" >Etusivu</Link>
                </li>

                {/* Dynamic Links */}
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    
                    let displayName = routeNameMap[value] || value.charAt(0).toUpperCase() + value.slice(1);

                    if (isLast && ItemName) {
                        displayName = ItemName;
                    }

                    return (
                        <li key={to} >
                            <span className="separator" >/</span>
                            {isLast ? (
                                <span className="current" >{displayName} </span>
                            ) : (
                                <Link to={to} >{displayName} </Link>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;