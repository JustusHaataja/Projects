import apiClient from './apiClient';

export interface CartItem {
    product_id: number;
    quantity: number;
}

interface CartResponse {
    cart: CartItem[];
}

export const fetchCart = async (): Promise<CartItem[]> => {
    const response = await apiClient.get<CartResponse>("/cart/");
    return response.data.cart;
}

export const addToCart = async (productID: number, quantity: number = 1): Promise<void> => {
    await apiClient.post("/cart/add", null, {
        params: {
            product_id: productID,
            quantity
        }
    });
}

export const updateCartItem = async (productID: number, quantity: number): Promise<void> => {
    await apiClient.put("/cart/update", null, {
        params: {
            product_id: productID,
            quantity
        }
    });
}

export const removeFromCart = async (productID: number): Promise<void> => {
    await apiClient.delete("/cart/remove", {
        params: {
            product_id: productID
        }
    });
}