import '../styles/Footer.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok, faGithub, faApplePay, faGooglePay, faPaypal, faCcVisa } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer 
            style={{
                height:"280px",
                width:"100%",
                backgroundColor: "#eee",
                display: "grid",
                gridTemplateRows: "auto 80px",
                textAlign: "center"
            }}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr"
                }}>
                <div>
                    <p
                        style={{
                            fontWeight: "600",
                            fontSize: "16px"
                        }}
                    >
                        Yhteystiedot
                    </p>
                    <p>
                        010 338 8700 <br /> ark. 9.00 - 16.00
                    </p>
                    <p>
                        asiakaspalvelu@puhdistamo.fi
                    </p>
                </div>

                <div>
                    <p
                        style={{
                            marginBottom: "8px",
                            fontSize: "16px",
                            fontWeight: "600"
                        }}
                    >
                        Maksutavat
                    </p>
                    <div
                        style={{
                            display: "flex",
                            gap: "16px",
                            paddingTop: "8px",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <FontAwesomeIcon icon={faApplePay}
                            style={{
                                fontSize: "40px",
                                paddingLeft: "8px",
                                paddingRight: "8px",
                                borderRadius: "4px",
                                border: "1px solid"
                            }} 
                        />
                        <FontAwesomeIcon icon={faGooglePay}
                            style={{
                                fontSize: "40px",
                                paddingLeft: "8px",
                                paddingRight: "8px",
                                borderRadius: "4px",
                                border: "1px solid"
                            }}
                        />
                        <FontAwesomeIcon icon={faCcVisa}
                            style={{
                                fontSize: "40px",
                                paddingLeft: "8px",
                                paddingRight: "8px",
                                borderRadius: "4px",
                                border: "1px solid"
                            }}
                        />
                        <FontAwesomeIcon icon={faPaypal}
                            style={{
                                fontSize: "40px",
                                paddingLeft: "8px",
                                paddingRight: "8px",
                                borderRadius: "4px",
                                border: "1px solid"
                            }}
                        />
                    </div>
                </div>

                <div>
                    <p 
                        style={{
                            fontSize: "16px",
                            fontWeight: "600"
                        }}>
                            Meidät löydät myös
                    </p>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "1px",
                            gap: "16px"
                        }}>
                        <Link to="https://www.instagram.com/puhdistamo/"
                            style={{
                                textDecoration: "none",
                                color: "inherit"
                            }}>
                                <FontAwesomeIcon 
                                    icon={faInstagram}
                                    className="social-icon"
                                    style={{
                                        fontSize: "40px",
                                        
                                    }}
                                />
                        </Link>
                        <Link to="https://www.tiktok.com/@puhdistamoofficial"
                            style={{
                                textDecoration: "none",
                                color: "inherit"
                            }}>
                                <FontAwesomeIcon 
                                    icon={faTiktok}
                                    className="social-icon"
                                    style={{
                                        fontSize: "40px"
                                    }}
                                />
                        </Link>
                        <Link to="https://github.com/JustusHaataja/Projects"
                            style={{
                                textDecoration: "none",
                                color: "inherit"
                            }}>
                                <FontAwesomeIcon 
                                    icon={faGithub}
                                    className="social-icon"
                                    style={{
                                        fontSize: "40px"
                                    }}
                                />
                        </Link>
                    </div>
                    
                    <div 
                        className="social-icon"
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