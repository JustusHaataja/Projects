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
        link: "/",
        bgColor: "rgb(243, 204, 198)"
    },
    {
        image: products2,
        text: "Löydä suosikki juomasi",
        button: "Juomat",
        link: "/products",
        bgColor: "rgb(219, 101, 149)"
    },
    {
        image: products3,
        text: "Puhdasta voimaa",
        button: "Elektrolyytit",
        link: "/",
        bgColor: "rgb(173, 237, 242)"   // rgb(96, 188, 189)
    }
]

const Hero = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div 
            className="hero-wrapper"
            style={{ backgroundColor: slides[activeIndex].bgColor }}
        >
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

                                <Link
                                    to={slide.link}
                                    className="link-button"
                                    aria-label="Link to a slider product"
                                >
                                    {slide.button}
                                </Link>

                            </div>
                            <div className="image-wrapper" >
                                <ScaleTransition
                                    src={slide.image}
                                    active={i === activeIndex}
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Hero