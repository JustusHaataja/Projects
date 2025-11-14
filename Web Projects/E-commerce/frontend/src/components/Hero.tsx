import '../styles/Hero.css';
import ScaleTransition from './ScaleTransition';
import products1 from '../assets/products1.jpg';
import products2 from '../assets/products2.jpg';
import products3 from '../assets/products3.jpg';

import { useState } from 'react';
import { Swiper, SwiperSlide} from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

const slides = [
    {
        image: products1,
        text: "Puhdasta energiaa päivään",
        button: "Osta nyt",
        link: "/"
    },
    {
        image: products2,
        text: "Löydä suosikki juomasi",
        button: "Juomat",
        link: "/products"
    },
    {
        image: products3,
        text: "Nesteytys urheilun aikana",
        button: "Elektrolyytit",
        link: "/"
    }
]

const Hero = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <Swiper
            modules={[ Autoplay, Navigation ]}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false}}
            speed={800}
            navigation={true}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
            {slides.map((slide, i) => (
                <SwiperSlide key={i}>
                    <div className="hero-container" >
                        <div>
                            <p className="slider-text" >
                                {slide.text}
                            </p>

                            <button className="slider-button" >   
                                <Link
                                    to={slide.link}
                                    className="link-button"
                                >
                                    {slide.button}
                                </Link>
                            </button>

                        </div>
                        <ScaleTransition
                            src={slide.image}
                            active={i === activeIndex} 
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default Hero