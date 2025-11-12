import ScaleTransition from './ScaleTransition';
import products1 from '../assets/products1.jpg';
import products2 from '../assets/products2.jpg';
import products3 from '../assets/products3.jpg';

import { Swiper, SwiperSlide} from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useState } from 'react';

const slides = [
    {
        image: products1,
        text: "Puhdasta energiaa päivään",
        button: "Osta nyt"
    },
    {
        image: products2,
        text: "Löydä suosikki juomasi",
        button: "Juomat"
    },
    {
        image: products3,
        text: "Nesteytys urheilun aikana",
        button: "Elektrolyytit"
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
                    <div 
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            height: "600px",
                            alignItems: "center",
                            backgroundColor: "rgb(184,209,145)"
                        }}
                    >
                        <div>
                            <p
                                style={{
                                    fontSize: "32px",
                                    fontWeight: "600"
                                }}
                            >
                                {slide.text}
                            </p>

                            <button
                                style={{
                                    width: "200px",
                                    fontSize: "24px",
                                    borderRadius: "8px",
                                    border: "1px solid #ccc"
                                }}
                            >
                                {slide.button}
                            </button>

                        </div>
                        <ScaleTransition src={slide.image} active={i === activeIndex} />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default Hero