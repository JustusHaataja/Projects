import Hero from '../components/Hero';
import Category from '../components/Category';
import MonthlyPicks from '../components/MonthlyPicks';

const HomePage = () => {
    return (
        <div 
            style={{ 
                gridTemplateColumns: "1fr"
            }}
        >
            <Hero />
            <Category />
            <MonthlyPicks />
        </div>
    )
}

export default HomePage