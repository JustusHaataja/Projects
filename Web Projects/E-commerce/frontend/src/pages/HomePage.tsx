import Hero from '../components/Hero';
import Category from '../components/Category';

const HomePage = () => {
    return (
        <div 
            style={{ 
                height: "1000px",
            }}
        >
            <Hero />
            <Category />
        </div>
    )
}

export default HomePage