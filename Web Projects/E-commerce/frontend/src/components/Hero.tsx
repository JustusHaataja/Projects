import products1 from "../assets/products1.jpg"
import products2 from "../assets/products2.jpg"
import products3 from "../assets/products3.jpg"

const Hero = () => {
    return (
        <div style={{
            width: "100%",
            height: "400px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
        }}>
            <div style={{
                gridColumn: "1",
                display: "grid",
                gridTemplateRows: "1fr 1fr 1fr",
            }}>
                <div></div>
                <p>Puhdasta energiaa päivään</p>
                <button>This is button</button>
            </div>
            <img src={products1} alt="" style={{
                gridColumn: "2",
                width: "80%"
                }}/>
        </div>
    )
}

export default Hero