import React, { useState, useEffect } from "react"
import "./Home.css"
import { sortArray, getAlgorithms, Step } from "../services/api"
import ArrayBars from "../components/ArrayBars"
import Controls from "../components/Controls"
import Slider from "../components/Slider"
import Information from "../components/Information"


const Home: React.FC = () => {
    
    const [ algorithms, setAlgorithms ] = useState<string[]>([]);
    const [ selectedAlgorithm, setSelectedAlgorithm ] = useState<string>("");
    const [ arraySize, setArraySize ] = useState<number>(10);
    const [ array, setArray ] = useState<number[]>([]);
    const [, setSteps ] = useState<any[]>([]);
    const [ activeIndices, setActiveIndices ] = useState<number[]>([]);


    // Fetch available algorithms from backend
    useEffect(() => {
        const fetchAlgorithms = async () => {
            try {
                const algorithms = await getAlgorithms();
                setAlgorithms(algorithms);
                if (algorithms.length > 0) {
                    setSelectedAlgorithm(algorithms[0]);
                }
            } catch (error) {
                console.error("Error fetching algorithms:", error);
            }
        };
        fetchAlgorithms();
    }, []);


    // Generate random array
    const generateLinearArray = (size: number) => {
        const maxValue = size * 2;
        const step = maxValue / size;

        const linearArray = Array.from({ length: size }, (_,i) =>
            Math.round(step * (i + 1))
        );

        for (let i = linearArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [linearArray[i], linearArray[j]] = [linearArray[j], linearArray[i]]
        }

        setArray(linearArray);
    };


    // Regenerate array whenever slider changes
    useEffect(() => {
        generateLinearArray(arraySize);
    }, [arraySize]);


    // Handle sorting
    const handleSort = async () => {
        try {
            const response = await sortArray({
                algorithm: selectedAlgorithm,
                array: array,
            });

            if (response.steps) {
                console.log(response);
                setSteps(response.steps);
                animateSteps(response.steps, 70);
            }
        } catch (error) {
            console.error("Error during sorting:", error);
        }
    };


    // Animate sorting steps
    const animateSteps = (steps: Step[], speed: number = 70) => {
        let i = 0;

        const interval = setInterval(() => {
            if (i >= steps.length) {
                clearInterval(interval);
                setActiveIndices([]);
                return;
            }

            // update the array to the current step
            setArray(steps[i].array);
            if (steps[i].indices) setActiveIndices(steps[i].indices);
            else setActiveIndices([]);

            i++;
        }, speed);
    };


    return (
        <body>
            <main>
                <header>Sorting Algorithm Visualizer</header>

                {/* Slider for array size */}
                <Slider 
                    arraySize={arraySize}
                    onSlide={setArraySize}
                    generate={generateLinearArray}
                />

                {/* Controls for algorithms */}
                <Controls
                    algorithms={algorithms}
                    selected={selectedAlgorithm}
                    onSelect={setSelectedAlgorithm}
                    onSort={handleSort}
                />

                {/* Display current array as bars */}
                <ArrayBars 
                    array={array}
                    activeIndices={activeIndices}
                />

                {/* Information about the algotrithm */}
                <Information algorithm={selectedAlgorithm} />
            
            </main>

            <footer>
                <p>
                    Created by <a href="https://github.com/JustusHaataja/Projects">
                    JustusHaataja</a>
                </p>
            </footer>
        </body>
    );
}

export default Home;