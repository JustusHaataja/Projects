// import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo1.avif"

const Header = () => {
    return (
        <header 
            style={{
                position: "fixed",
                top: "0",
                left: "0",
                right: "0",
                display: "flex",
                alignItems: "center",
                padding: "8px",
                backgroundColor: "#eee",
                zIndex: "1000"
            }}
        >
            <Link to="/">
                <img src={logo} alt="Store logo" style={{ height: "100px"}} />
            </Link>

            <nav
                style={{
                    display: "flex",
                    gap: "8px",
                    fontSize: "16px"
                }}
            >
                <Link to="/products">Tuotteet</Link>
                <Link to="/about">Meistä</Link>
                <Link to="/profile">Profiili</Link>
                <Link to="/cart">Ostoskori</Link>
            </nav>
        </header>
    )
}

export default Header