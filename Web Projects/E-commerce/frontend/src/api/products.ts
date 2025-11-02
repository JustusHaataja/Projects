import { API_URL } from "./config";

export async function getProducts() {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return await response.json();
}