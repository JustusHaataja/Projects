import '../styles/Header.css';
import { useState, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo1.avif';
import SearchBox from './SearchBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import shoppingcart from '../assets/shoppingcart.svg';


const Header = () => {
    const [search, setSearch] = useState('');

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

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

                <nav className="header-links" >
                    <Link to="/products" >Tuotteet</Link>
                    <Link to="/about" >Meistä</Link>
                </nav>
            </div>

            <SearchBox value={search} onChange={handleSearch} />

            <div className="header-right" >
                <Link to="/profile" >
                    <FontAwesomeIcon
                        className="profile-icon"
                        icon={faUser} 
                    />
                </Link>
                <Link to="/cart" >
                    <img 
                        className="shoppingcart-icon"
                        src={shoppingcart}
                        alt="shopping cart icon"
                    />
                </Link>
            </div>
        </header>
    )
}

export default Header