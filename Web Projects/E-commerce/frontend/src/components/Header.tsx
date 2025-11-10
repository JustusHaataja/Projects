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
                <Link to="/" style={{ marginRight: "1rem"}}>Home</Link>
                <Link to="/products" style={{ marginRight: "1rem" }}>Products</Link>
                <Link to="/cart"></Link>
            </nav>
        </header>
    )
}

export default Header