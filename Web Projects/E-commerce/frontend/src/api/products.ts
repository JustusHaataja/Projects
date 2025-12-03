import { getJSON } from './apiClient';

export interface ProductImage {
    id: number;
    product_id: number;
    image_url: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    sale_price?: number | null;
    categoryId: number;
    images: ProductImage[];
}


export const fetchProductById = async (id: number): Promise<Product> => {
    const product = await getJSON<Product>(`products/${id}`);
    return sanitizeProduct(product);
}


export const fetchAllProducts = async (): Promise<Product[]> => {
    const products = await getJSON<Product[]>('/products/?skip=0&limit=100');
    return products.map(sanitizeProduct).sort((a, b) => a.id - b.id);
}


export const fetchProductsByCategory = async (categoryId: number): Promise<Product[]> => {
    const products = await getJSON<Product[]>(`/products/?categoryId=${categoryId}&limit=100`);
    return products.map(sanitizeProduct)
}


const sanitizeProduct = (product: Product): Product => {
    if (!product.images) return product;

    const sanitizedImages = product.images.map(img => ({
        ...img,
        image_url: img.image_url.trim().replace("https//", "https://")
    })).sort((a, b) => a.id - b.id);

    return { ...product, images: sanitizedImages };
}