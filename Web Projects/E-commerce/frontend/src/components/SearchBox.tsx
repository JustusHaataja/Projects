import '../styles/SearchBox.css';
import React, { type ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


interface SearchBoxProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onChange }) => {
    return (
        <div className="searchbox-container" >
            <FontAwesomeIcon 
                className="search-icon"
                icon={faMagnifyingGlass}
            />
            <input className="search-input-box"
                type="text"
                placeholder="Hae tuotteita..."
                value={value}
                onChange={onChange}
                aria-label="Search products"
            />
        </div>
    )
}

export default SearchBox