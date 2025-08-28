export interface SortRequest {
    algorithm: string;
    array: number[];
}

export interface Step {
    type: "overwrite" | "compare" | "swap" | "done" | "merge";
    indices: number[];
    values: number[];
    array: number[];
    time: string;
}

export interface SortResponse {
    algorithm: string;
    original: number[];
    steps: Step[];
}

// Call backend /sort endpoint
export const sortArray = async ({ algorithm, array }: SortRequest): Promise<{ steps: Step[] }> => {
    const response = await fetch("https://algorithms-pmn6.onrender.com/sort", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ algorithm, array }),
    });

    if (!response.ok) {
        throw new Error(`Failed to sort array: ${response.statusText}`);
    }

    return response.json();
};

// Get available algorithms
export const getAlgorithms = async (): Promise<string[]> => {
    const response = await fetch("https://algorithms-pmn6.onrender.com/algorithms"); //http://127.0.0.1:8000
    if (!response.ok) {
        throw new Error(`Failed to fetch algorithms: ${response.statusText}`);
    }
    const data = await response.json();

    return data.algorithms;
}