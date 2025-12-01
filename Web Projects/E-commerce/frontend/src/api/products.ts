import { getJSON} from './apiClient';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    sale_price?: number | null;
    categoryId: number;
    images: string[];
}

export const fetchAllProducts = async (): Promise<Product[]> => {
    return getJSON<Product[]>('/products/?skip=0&limit=100')
}

export const fetchProductById = async (id: number): Promise<Product> => {
    return getJSON<Product>(`products/${id}`);
}

export const fetchProductsByCategory = async (categoryId: number): Promise<Product[]> => {
    return getJSON<Product[]>(`/products/?categoryId=${categoryId}&limit=100`)
}