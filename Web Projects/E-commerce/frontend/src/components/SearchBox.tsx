import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


const SearchBox = ({ value, onChange }) => {
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