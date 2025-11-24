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
            <Link to="/" >
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
            
            <div className="header-right" >
                <SearchBox value={search} onChange={handleSearch} />
                <Link to="/profile" >
                    <FontAwesomeIcon icon={faUser} />
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