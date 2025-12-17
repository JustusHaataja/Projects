import '../styles/Header.css';
import { useState, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo1.avif';
import SearchBox from './SearchBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import shoppingcart from '../assets/shoppingcart.svg';
import { useCart } from '../context/CartContext';


const Header = () => {
    const [search, setSearch] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const { cartItems } = useCart();

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const cartCount = Array.isArray(cartItems) ? 
    cartItems.reduce((total, item) => total + (item.quantity || 0), 0) : 0;

    return (
        <header className="header" >
            <div className="header-left" >
                <Link to="/" className="logo-link">
                    <img 
                        className="store-logo"
                        src={logo}
                        alt="Store logo"
                    />
                </Link>

                <nav className={`header-links ${menuOpen ? 'open' : ''}`} >
                    <Link to="/products" >Tuotteet</Link>
                    <Link to="/about" >Meistä</Link>
                    <Link to="/">Ota yhteyttä</Link>
                </nav>
                <button
                    className="hamburger-btn"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                >
                    <FontAwesomeIcon icon={menuOpen ? faX : faBars} />
                </button>
            </div>

            <SearchBox value={search} onChange={handleSearch} />

            <div className="header-right" >
                <Link to="/profile" >
                    <FontAwesomeIcon
                        className="profile-icon"
                        icon={faUser} 
                    />
                </Link>
                <Link to="/cart" className="cart-link">
                    <div className="cart-icon-wrapper" >
                        <img 
                            className="cart-icon"
                            src={shoppingcart}
                            alt="shopping cart icon"
                        />
                        {cartCount >= 0 && (
                            <span className="cart-count" >
                                {cartCount}
                            </span>
                        )}
                    </div>
                </Link>
            </div>
        </header>
    )
}

export default Header