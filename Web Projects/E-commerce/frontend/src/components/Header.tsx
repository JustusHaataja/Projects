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
        <header>
            <Link to="/">
                <img 
                    className="store-logo"
                    src={logo}
                    alt="Store logo"
                />
            </Link>

            <nav>
                <Link to="/products">Tuotteet</Link>
                <Link to="/about">Meistä</Link>
                <Link to="/profile">
                    <FontAwesomeIcon icon={faUser}/>
                </Link>
                <Link to="/cart">
                    <img 
                        className="shoppingcart-icon"
                        src={shoppingcart}
                        alt="shopping cart icon"
                    />
                </Link>
                <SearchBox value={search} onChange={handleSearch}/>
            </nav>
        </header>
    )
}

export default Header