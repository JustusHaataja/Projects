import React from "react"
import "./Controls.css"

interface Props {
    algorithms: string[];
    selected: string;
    onSelect: (algo: string) => void;
    onSort: () => void;
}

const Controls: React.FC<Props> = ({ algorithms, selected, onSelect, onSort }) => {
    return (
        <div className="controls-container">
            <label className="label-text">Algorithm:</label>
            <select 
                className="selector"
                value={selected} 
                onChange={(e) =>
                    onSelect(e.target.value)}
                >
                {algorithms.map((algo) => (
                    <option 
                        key={algo} 
                        value={algo}
                        >{algo.toUpperCase()}
                    </option>
                ))}
            </select>
            <button 
                className="sort-button"
                onClick={onSort}
                >Sort
            </button>
        </div>
    );
};

export default Controls;