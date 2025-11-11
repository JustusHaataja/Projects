import { Swiper, SwiperSlide} from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import products1 from '../assets/products1.jpg';
import products2 from '../assets/products2.jpg';
import products3 from '../assets/products3.jpg';

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
    },
]

const Hero = () => {
    return (
        <Swiper
            modules={[ Autoplay, Navigation ]}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false}}
            speed={600}
            navigation={true}
        >
            {slides.map((slide, i) => (
                <SwiperSlide key={i}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        height: "500px",
                        alignItems: "center",
                        background: "red"
                    }}>
                        <div>
                            <p>{slide.text}</p>
                            <button>{slide.button}</button>
                        </div>
                        <img src={slide.image} alt="" style={{
                            width: "75%", borderRadius: "10px"
                        }}/>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default Hero