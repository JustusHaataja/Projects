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
        <header 
            style={{
                position: "fixed",
                top: "0",
                left: "0",
                right: "0",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#eee",
                zIndex: "1000"
            }}
        >
            <Link to="/">
                <img src={logo} alt="Store logo" 
                    style={{ 
                        height: "100px",
                        paddingRight: "16px"
                    }} />
            </Link>

            <nav
                style={{
                    display: "flex",
                    gap: "16px",
                    fontSize: "16px",
                }}
            >
                <Link to="/products">Tuotteet</Link>
                <Link to="/about">Meistä</Link>
                <Link to="/profile">
                    <FontAwesomeIcon icon={faUser}/>
                </Link>
                <Link to="/cart">
                    <img 
                        src={shoppingcart}
                        alt="shopping cart icon" 
                        style={{
                            width: "20px",
                            height: "20px",
                            marginTop: "2px"
                        }}
                    />
                </Link>
                <SearchBox value={search} onChange={handleSearch}/>
            </nav>
        </header>
    )
}

export default Header