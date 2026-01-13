import React from "react";
import "./Information.css";

interface Props {
    algorithm: string; // selected algorithm from Home.tsx
}

interface AlgorithmInfo {
    name: string;
    best: string;
    average: string;
    worst: string;
    space: string;
}

// Define your algorithm data here
const algorithms: Record<string, AlgorithmInfo> = {
    bogo: {
        name: "Bogo",
        best: "O(n)",
        average: "O((n+1)!)",
        worst: "O(∞)",
        space: "O(1)"
    },
    bubble: {
      name: "Bubble",
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)"
    },
    counting: {
        name: "Counting",
        best: "O(n + k)",
        average: "O(n + k)",
        worst: "O(n + k)",
        space: "O(k)"
    },
    heap: {
      name: "Heap",
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      space: "O(1)"
    },
    insertion: {
      name: "Insertion",
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)"
    },
    merge: {
      name: "Merge",
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      space: "O(n)"
    },
    quick: {
      name: "Quick",
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
      space: "O(log n)"
    },
    radix: {
      name: "Radix",
      best: "O(nk)",
      average: "O(nk)",
      worst: "O(nk)",
      space: "O(n + k)"
    },
    selection: {
      name: "Selection",
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)"
    }
  };

const Information: React.FC<Props> = ({ algorithm }) => {
    const info = algorithms[algorithm.toLowerCase()];

    if (!info) {
        return <div>No information available right now.</div>;
    }

    return (
        <div className="banner-container">
            <ul>
                <li>
                    <span>Algorithm: {info.name}</span>
                </li>
                <li>
                    <span>Best: {info.best}</span>
                </li>
                <li>
                    <span>Average: {info.average}</span>
                </li>
                <li>
                    <span>Worst: {info.worst}</span>
                </li>
                <li>
                    <span>Space: {info.space}</span>
                </li>
            </ul>

            { /* For infinite banner */ }
            <ul aria-hidden="true">
                <li>
                    <span>Algorithm: {info.name}</span>
                </li>
                <li>
                    <span>Best: {info.best}</span>
                </li>
                <li>
                    <span>Average: {info.average}</span>
                </li>
                <li>
                    <span>Worst: {info.worst}</span>
                </li>
                <li>
                    <span>Space: {info.space}</span>
                </li>
            </ul>
        </div>
    );
};

export default Information;