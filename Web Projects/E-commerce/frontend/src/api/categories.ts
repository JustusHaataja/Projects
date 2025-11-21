import { getJSON } from './apiClient';

export interface Category {
    id: number;
    name: string;
}

export const fetchCategories = async (signal?: AbortSignal): Promise<Category[]> => {
    try {
        return await getJSON<Category[]>("/products/categories", signal);
    } catch (err) {
        throw new Error(
            `fetchCategories failed: ${
                err instanceof Error ? err.message : String(err)
            }`
        );
    }
}