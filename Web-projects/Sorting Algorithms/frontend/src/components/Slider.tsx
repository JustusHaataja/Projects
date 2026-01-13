import React from "react"
import "./Slider.css"

interface Props {
    arraySize: number;
    onSlide: (value: number) => void;
    generate: (value: number) => void;
}

const Slider: React.FC<Props> = ({ arraySize, onSlide, generate }) => {

    return (
        <div className="slider-container">
            <label className="slider-label">Array size: {arraySize} </label>
            <input
                className="slider"
                type="range"
                min="10"
                max="100"
                step="10"
                value={arraySize}
                onChange={ (e) => onSlide(Number(e.target.value)) }
            />
            <button
                className="generate-button"
                onClick={ () => generate(arraySize) }
            >
                Generate
            </button>
        </div>
    );
};

export default Slider;