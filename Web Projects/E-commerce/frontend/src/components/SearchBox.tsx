import React, { type ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


interface SearchBoxProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onChange }) => {
    return (
        <div
            style={{
                position: "relative",
                display: "inline-block"
            }}
        >
            <FontAwesomeIcon 
                icon={faMagnifyingGlass}
                style={{
                    height: "16px",
                    position: "absolute",
                    left: "8px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#555",
                    pointerEvents: "none"
                }} 
            />
            <input
                type="text"
                placeholder="Hae tuotteita..."
                value={value}
                onChange={onChange}
                aria-label="Search products"
                style={{
                    paddingLeft: "32px",
                    height: "24px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    width: "12rem"
                }}
            />
        </div>
    )
}

export default SearchBox