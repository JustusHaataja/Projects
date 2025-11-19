import { getJSON } from './apiClient';

export interface Category {
    id: number;
    name: string;
}

export const fetchCategories = async (): Promise<Category[]> => {
    return getJSON<Category[]>('/categories');
}