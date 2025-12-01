import '../styles/AboutUs.css';
import { useState, useEffect } from 'react';

import { faGem } from '@fortawesome/free-regular-svg-icons';
import { faSeedling, faDumbbell } from '@fortawesome/free-solid-svg-icons';

import bg1 from '../assets/energydrink2.jpg';
import bg2 from '../assets/watermelon.jpg';
import ed_img from '../assets/energydrinks.jpg';
import superfood_img from '../assets/superfood.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AboutUs = () => {
    const [text, setText] = useState("Puhdistamo");
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            
            setIsExiting(true);

            setTimeout(() => {
                setText(prev => prev === "Puhdistamo" ? "Meistä" : "Puhdistamo");
                setIsExiting(false);
            }, 1600);
        
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="about-container" >
            <div className="rolling-header" >
                {text.split('').map((char, index) => (
                    <span 
                        key={index} 
                        className={`letter ${isExiting ? "exit" : ""}`}
                    >
                        {char}
                    </span>
                ))}
            </div>

            <img src={bg1}
                className="bg1-image"
                alt="Background image of a energydrink can"
            />

            <div className="quality-container" >
                <h1>
                    Laatulupaus
                </h1>
                <p>
                    Perustamisestamme lähtien meitä on ohjannut järkkymätön tahto 
                    tarjota asiakkaillemme vain ja ainoastaan laadukkaimpia 
                    mahdollisia tuotteita. Kun tiedät verkkokaupasta tilaamasi 
                    tai kaupan hyllyltä poimimasi tuotteen noudattavan aina 
                    Puhdistamon tiukkaa laatureseptiä, tulee hyvien valintojen 
                    tekemisestä helpompaa.
                </p>
            </div>

            <img src={bg2}
                className="bg2-image"
                alt="Background image of a energydrink can"
            />

            <div className="value-container" >
                <div className="value-box" >
                    <FontAwesomeIcon icon={faGem} className="value-icon" />
                    <h1>Vain olennainen</h1>
                    <p>
                        Karsimme pois kaiken tarpeettoman ja epäterveellisen.
                    </p>
                </div>
                <div className="value-box" >
                    <FontAwesomeIcon icon={faSeedling} className="value-icon" />
                    <h1>Puhtaus</h1>
                    <p>
                        Käytämme tuotteissamme vain parhaita mahdollisia raaka-aineita.
                    </p>
                </div>
                <div className="value-box" >
                    <FontAwesomeIcon icon={faDumbbell} className="value-icon" />
                    <h1>Vaikutus</h1>
                    <p>
                        Keskitymme tuotteidemme toimivuuteen ja tehokkuuteen.
                    </p>
                </div>
            </div>

            <div className="info-container">
                <div className="text-side">
                    <h1 className="info-header" >Juomat</h1>
                    <p>
                        Kaikkia Puhdistamon juomatuotteita yhdistävät seuraavat tekijät.
                    </p>

                    <h2>Laadukkaat ja luontaiset raaka-aineet</h2>
                    <p>
                        Ei synteettisiä ainesosia - esimerkiksi energiajuomiemme 
                        kofeiini saadaan vihreätee-, guarana- ja yerba mate -uutteista.
                    </p>

                    <h2>Ei turhia lisäaineita</h2>
                    <p>
                        Vain tarvittavat ainesosat - tämän vuoksi emme esimerkiksi 
                        käytä juomissamme lainkaan väriaineita.
                    </p>
                    <h2>Luontainen makeutus</h2>
                    <p>
                        Käytämme joko steviasta valmistettua makeutusainetta tai 
                        luomu ruokosokeria, emmekä esimerkiksi asesulfaami K:ta, 
                        aspartaamia tai sukraloosia.
                    </p>
                    <h2>Herkullinen maku</h2>
                    <p>
                        Panostamme raikkaisiin ja aitoihin makuelämyksiin, 
                        jotka erottuvat positiivisesti perinteisistä vaihtoehdoista.
                    </p>
                    <h2>Käytettävyys</h2>
                    <p>
                        Juomillamme on pitkä ja perinteinen historia sekä moderni käyttötarkoitus.
                    </p>
                </div>
                <div className="image-side">
                    <img 
                        className="info-image"
                        src={ed_img}
                        alt="Picture of energydrinks" 
                    />
                </div>
            </div>

            <div className="info-container">
                <div className="image-side">
                    <img
                        className="info-image"
                        src={superfood_img}
                        alt="Picture of superfood" />
                </div>
                <div className="text-side">
                    <h1 className="info-header">Superfoodit</h1>
                    <p>
                        Kaikkia Puhdistamon superfoodeja yhdistävät seuraavat tekijät.
                    </p>
                    <h2>Laadukkaat ja luontaiset raaka-aineet</h2>
                    <p>
                        Ei synteettisiä tai heikkolaatuisia ainesosia.
                    </p>
                    <h2>Käytettävyys</h2>
                    <p>
                        Superfoodeillamme on pitkä ja perinteinen historia sekä moderni käyttötarkoitus.
                    </p>
                    <h2>Luotettavat toimittajat</h2>
                    <p>
                        Hankimme raaka-aineemme ainoastaan tarkkaan valituilta kumppaneilta.
                    </p>
                    <h2>Ravintorikkaus</h2>
                    <p>
                        Kaikki superfoodimme sisältävät runsaan määrän ravinteita tiiviissä paketissa.
                    </p>
                </div>
            </div>

        </div>
    )
}

export default AboutUs