// import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer style={{ padding: "1rem", backgroundColor: "#ee", marginTop: "2rem" }}>
            <p>© 2025 My E-Commerce Store</p>
            <Link to="https://github.com/JustusHaataja/Projects">GitHub</Link>
        </footer>
    )
}

export default Footer