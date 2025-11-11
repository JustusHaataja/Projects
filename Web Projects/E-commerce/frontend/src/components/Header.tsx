// import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"

const Header = () => {
    return (
        <header style={{ padding: "1rem", backgroundColor: "#ee" }}>
            <Link to="/">
            <img src={logo} alt="Store logo" style={{ height: "150px"}} />
            </Link>
            <nav>
                <Link to="/products" style={{ marginRight: "1rem" }}>Products</Link>
                <Link to="/cart" style={{ marginRight: "1rem" }}>Cart</Link>
            </nav>
        </header>
    )
}

export default Header