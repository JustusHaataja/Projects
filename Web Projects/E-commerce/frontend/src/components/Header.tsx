import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header style={{ padding: "1rem", backgroundColor: "#ee" }}>
            <h1>Puhdasta</h1>
            <nav>
                <Link to="/" style={{ marginRight: "1rem"}}>Home</Link>
                <Link to="/products" style={{ marginRight: "1rem" }}>Products</Link>
                <Link to="/cart"></Link>
            </nav>
        </header>
    )
}

export default Header