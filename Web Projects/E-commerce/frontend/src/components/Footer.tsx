import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer style={{ padding: "1rem", backgroundColor: "#ee", marginTop: "2rem" }}>
            <Link to="https://www.puhdistamo.fi/"
                style={{ textDecoration: "none", color: "inherit" }}>Puhdistamo</Link>

            <Link to="https://www.instagram.com/puhdistamo/"
                style={{ textDecoration: "none", color: "inherit" }}>
                    <FontAwesomeIcon icon={faInstagram} />
                </Link>

            <Link to="https://www.tiktok.com/@puhdistamoofficial"
                style={{ textDecoration: "none", color: "inherit" }}>
                    <FontAwesomeIcon icon={faTiktok} />
                </Link>
            
            <Link to="https://github.com/JustusHaataja/Projects"
                style={{ textDecoration: "none", color: "inherit" }}>
                    <FontAwesomeIcon icon={faGithub} />
                </Link>

            <p>© 2025 My E-Commerce Store</p>
        </footer>
    )
}

export default Footer