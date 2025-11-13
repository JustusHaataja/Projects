import '../styles/Footer.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok, faGithub, faApplePay, faGooglePay, faPaypal, faCcVisa } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr"
                }}>
                <div>
                    <h1>
                        Yhteystiedot
                    </h1>
                    <p>
                        010 338 8700 <br /> ark. 9.00 - 16.00
                    </p>
                    <p>
                        asiakaspalvelu@puhdistamo.fi
                    </p>
                </div>

                <div>
                    <h1>
                        Maksutavat
                    </h1>
                    <div
                        style={{
                            display: "flex",
                            gap: "16px",
                            paddingTop: "12px",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <FontAwesomeIcon 
                            icon={faApplePay}
                            className="banking-icon"
                        />
                        <FontAwesomeIcon 
                            icon={faGooglePay}
                            className="banking-icon"
                        />
                        <FontAwesomeIcon 
                            icon={faCcVisa}
                            className="banking-icon"
                        />
                        <FontAwesomeIcon 
                            icon={faPaypal}
                            className="banking-icon"
                        />
                    </div>
                </div>

                <div>
                    <h1>
                        Meidät löydät myös
                    </h1>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "1px",
                            gap: "16px"
                        }}>
                        <Link 
                            to="https://www.instagram.com/puhdistamo/" 
                            className="social-link"
                            >
                                <FontAwesomeIcon 
                                    icon={faInstagram}
                                    className="social-icon"
                                />
                        </Link>
                        <Link 
                            to="https://www.tiktok.com/@puhdistamoofficial"
                            className="social-link"
                            >
                                <FontAwesomeIcon 
                                    icon={faTiktok}
                                    className="social-icon"
                                />
                        </Link>
                        <Link 
                            to="https://github.com/JustusHaataja/Projects"
                            className="social-link"
                            >
                                <FontAwesomeIcon 
                                    icon={faGithub}
                                    className="social-icon"
                                />
                        </Link>
                    </div>
                    
                    <div 
                        style={{ padding: "16px"}}>
                        <Link to="https://www.puhdistamo.fi/"
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                                fontSize: "24px",
                                fontWeight: "600"
                            }}>
                                Puhdistamo.fi
                        </Link>
                    </div>
                </div>
  
            </div>

            <div
                style={{
                    background: "#555",
                    color: "white",
                    justifyContent: "center",
                    alignContent: "center",
                    padding: "16px"
                }}
            >
                © {new Date().getFullYear()} Tämä ei ole Puhdistamon virallinen nettisivu.
            </div>
        </footer>
    )
}

export default Footer