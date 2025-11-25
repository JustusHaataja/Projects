import Hero from '../components/Hero';
import Category from '../components/Category';

const HomePage = () => {
    return (
        <div 
            style={{ 
                gridTemplateColumns: "1fr"
            }}
        >
            <Hero />
            <Category />
        </div>
    )
}

export default HomePage