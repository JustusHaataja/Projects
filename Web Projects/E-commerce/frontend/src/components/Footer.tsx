import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok, faGithub} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer 
            style={{ 
                padding: "8px",
                backgroundColor: "#eee",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr"
            }}>
            
            <ul
                style={{
                    listStyle: "none",
                    display: "flex",
                    gap: "16px",
                    margin: ""
                }}
            >Seuraa meitä 
                <li>
                    <Link to="https://www.puhdistamo.fi/"
                        style={{ textDecoration: "none", color: "inherit", fontSize: "24px"}}>
                            Puhdistamo.fi
                        </Link>
                </li>
                <li>
                    <Link to="https://www.instagram.com/puhdistamo/"
                        style={{ textDecoration: "none", color: "inherit" }}>
                            <FontAwesomeIcon icon={faInstagram} style={{fontSize: "32px"}}/>
                        </Link>
                </li>
                <li>
                    <Link to="https://www.tiktok.com/@puhdistamoofficial"
                        style={{ textDecoration: "none", color: "inherit" }}>
                            <FontAwesomeIcon icon={faTiktok} style={{fontSize: "32px"}}/>
                        </Link>
                </li>
                <li>
                    <Link to="https://github.com/JustusHaataja/Projects"
                        style={{ textDecoration: "none", color: "inherit" }}>
                            <FontAwesomeIcon icon={faGithub} style={{fontSize: "32px"}}/>
                        </Link>
                </li>
            </ul>
            <p>Koira</p>
            <p>© 2025 My E-Commerce Store</p>
        </footer>
    )
}

export default Footer