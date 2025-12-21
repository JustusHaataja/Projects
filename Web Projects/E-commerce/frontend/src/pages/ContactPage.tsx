import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faBriefcase, faHandshake } from '@fortawesome/free-solid-svg-icons';
import '../styles/ContactPage.css';

const ContactPage = () => {
    const customerServiceTeam = [
        {
            name: "Laura Tarmo",
            role: "Asiakaspalvelupäällikkö",
            email: "laura.tarmo@example.com"
        },
        {
            name: "Ronja Soinio",
            role: "Asiakaspalvelija",
            email: "asiakaspalvelu@example.com",
        },
        {
            name: "Tiina Penttilä-Metso",
            role: "Asiakaspalvelija",
            email: "asiakaspalvelu@example.com",
        }
    ];

    return (
        <div className="contact-page" >

            {/* Contact Info Box */}
            <section className="contact-info-section" >
                <div className="contact-info-box" >
                    <div className="info-item" >
                        <FontAwesomeIcon icon={faPhone} className="info-icon" />
                        <h4>Ota yhteyttä</h4>
                        <p className="phone-number" >010 338 8700</p>
                        <p className="call-price" >8,35 snt/puhelu + 16,69 snt/min</p>
                        <p className="service-hours" >Palvelemme arkipäivisin 9.00 - 16.00</p>
                    </div>
                </div>
            </section>

            {/* Business Options */}
            <section className="business-options-section" >
                <h2 className="section-title" >Liiketoimintamahdollisuudet</h2>
                <div className="business-cards" >
                    <div 
                        className="business-card"

                    >
                        <FontAwesomeIcon icon={faBriefcase} className="business-icon" />
                        <h3>Avoimet työpaikat</h3>
                        <p>Tutustu avoimiin työpaikkoihimme ja liity tiimiimme</p>
                        <button className="business-btn" >
                            Katso työpaikat
                        </button>
                    </div>
                    <div 
                        className="business-card"
                    >
                        <FontAwesomeIcon icon={faHandshake} className="business-icon" />
                        <h3>Ryhdy jälleenmyyjäksi</h3>
                        <p>Tarjoamme kilpailukykyisiä jälleenmyyjäehtoja</p>
                        <button className="business-btn" >
                            Ota yhteyttä
                        </button>
                    </div>
                </div>
            </section>

            {/* Customer Service Team */}
            <section className="customer-service-section" >
                <h2 className="section-" >Asiakaspalvelumme</h2>
                <div className="team-grid" >
                    {customerServiceTeam.map((member, index) => (
                        <div key={index} className="team-member">
                            <h5>{member.name}</h5>
                            <p className="role" >{member.role}</p>
                            <a href={`mailto:${member.email}`} className="email-link" >
                                <FontAwesomeIcon icon={faEnvelope} />
                                {member.email}
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            {/* Billing Information */}
            <section className="billing-section" >
                <div className="billing-content" >
                    <div className="billing-image" >
                        <img 
                            src="https://www.puhdistamo.fi/cdn/shop/files/download_13_1200x.webp?v=1725268783" 
                            alt="Office building"
                        />
                    </div>
                    <div className="billing-info" >
                        <h2>Laskutustiedot</h2>
                        <div className="billing-details" >
                            <div className="detail-item" >
                                <strong>Yrityksen nimi:</strong>
                                <p>Oy Hyvinvointi Ab</p>
                            </div>
                            <div className="detail-item" >
                                <strong>Y-tunnus:</strong>
                                <p>1234567-8</p>
                            </div>
                            <div className="detail-item" >
                                <strong>Osoite:</strong>
                                <p>Kauppakatu 1</p>
                                <p>00100 Helsinki</p>
                            </div>
                            <div className="detail-item" >
                                <strong>Sähköpostilaskuosoite:</strong>
                                <p>laskutus@example.com</p>
                            </div>
                            <div className="detail-item" >
                                <strong>Verkkolaskuosoite:</strong>
                                <p>003712345678</p>
                            </div>
                            <div className="detail-item" >
                                <strong>Operaattori:</strong>
                                <p>DABAFIHH</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;