import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok, faGithub, faApplePay, faGooglePay, faPaypal} from '@fortawesome/free-brands-svg-icons';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <footer 
            style={{
                height:"300px",
                width:"100%",
                backgroundColor: "#eee",
                display: "grid",
                gridTemplateRows: "auto 100px",
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
                        puh. 010 338 8700 <br /> ark. 9.00 - 16.00 <br /> 
                        asiakaspalvelu@puhdistamo.fi
                    </p>
                </div>

                <div>
                    <p>© {new Date().getFullYear()} My E-Commerce Store</p>
                </div>

                <div>
                    <p 
                        style={{
                            fontSize: "16px",
                            fontWeight: "600"
                        }}>
                            Meidät löydät myös
                    </p>

                    <Link to="https://www.puhdistamo.fi/"
                        style={{
                            textDecoration: "none",
                            color: "inherit",
                            fontSize: "24px",
                            fontWeight: "600"
                        }}>
                            Puhdistamo.fi
                    </Link>

                    <div>
                        <Link to="https://www.instagram.com/puhdistamo/"
                            style={{ textDecoration: "none", color: "inherit" }}>
                                <FontAwesomeIcon icon={faInstagram} style={{fontSize: "32px"}}/>
                        </Link>
                        <Link to="https://www.tiktok.com/@puhdistamoofficial"
                            style={{ textDecoration: "none", color: "inherit" }}>
                                <FontAwesomeIcon icon={faTiktok} style={{fontSize: "32px"}}/>
                        </Link>
                        <Link to="https://github.com/JustusHaataja/Projects"
                            style={{ textDecoration: "none", color: "inherit" }}>
                                <FontAwesomeIcon icon={faGithub} style={{fontSize: "32px"}}/>
                        </Link>
                    </div>
                </div>
  
            </div>

            <div
                style={{
                    background: "#555",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    padding: "16px"
                }}
            >
                <p
                    style={{
                        margin: "0",
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
                        gap: "24px",
                        alignItems: "center",
                        // paddingTop: "8px"
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
                    <FontAwesomeIcon icon={faPaypal}
                        style={{
                            fontSize: "32px",
                            padding: "4px",
                            borderRadius: "4px",
                            border: "1px solid"
                        }}
                    />
                    <FontAwesomeIcon icon={faPiggyBank}
                        style={{
                            fontSize: "36px",
                            paddingLeft: "8px",
                            paddingRight: "8px",
                            borderRadius: "4px",
                            border: "1px solid"
                        }}
                    />
                </div>
            </div>
        </footer>
    )
}

export default Footer