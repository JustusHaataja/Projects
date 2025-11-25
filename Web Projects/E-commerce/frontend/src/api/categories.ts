import { getJSON } from './apiClient';

export interface Category {
    id: number;
    name: string;
}

// export const fetchCategories = async (signal?: AbortSignal): Promise<Category[]> => {
//     return await getJSON<Category[]>("/products/categories", signal);
// }

export async function fetchCategories(signal?: AbortSignal) {
    await new Promise(r => setTimeout(r, 5000)); // simulate slow loading
    return await getJSON<Category[]>("/products/categories", signal);
}