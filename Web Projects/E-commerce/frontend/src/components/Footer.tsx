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
                    <p>Koira</p>
                </div>

                <div>
                    <p>© {new Date().getFullYear()} My E-Commerce Store</p>
                </div>

                <div
                    style={{

                    }}>
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
                        fontWeight: "600"
                    }}
                >
                    Maksutavat
                </p>
                <div
                    style={{
                        display: "flex",
                        gap: "16px",
                        alignItems: "center",
                        // paddingTop: "8px"
                    }}
                >
                    <FontAwesomeIcon icon={faApplePay} style={{ fontSize: "40px" }}/>
                    <FontAwesomeIcon icon={faGooglePay} style={{ fontSize: "40px" }}/>
                    <FontAwesomeIcon icon={faPaypal} style={{ fontSize: "24px" }}/>
                    <FontAwesomeIcon icon={faPiggyBank} style={{ fontSize: "24px" }}/>
                </div>
            </div>
        </footer>
    )
}

export default Footer