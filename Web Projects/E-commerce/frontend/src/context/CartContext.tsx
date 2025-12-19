import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import * as cartApi from '../api/cart';
import { useAuth } from './AuthContext';

interface CartContextType {
    cartItems: cartApi.CartItem[];
    loading: boolean;
    addToCart: (productID: number, quantity?: number) => Promise<void>;
    removeFromCart: (productID: number) => Promise<void>;
    updateQuantity: (productID: number, quantity: number) => Promise<void>;
    refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<cartApi.CartItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useAuth();

    const refreshCart = async () => {
        try {
            const items = await cartApi.fetchCart();
            setCartItems(items);
        } catch (error) {
            console.error("Failed to fetch cart", error);
        }
    };

    useEffect(() => {
        refreshCart();
    }, [user]);


    const addToCart = async (productID: number, quantity: number = 1) => {
        setLoading(true);
        try {
            await cartApi.addToCart(productID, quantity);
            await refreshCart();    // Refresh state after changes
        } catch (error) {
            console.error("Failed to add to cart", error);
        } finally {
            setLoading(false);
        }
    };


    const removeFromCart = async (productID: number) => {
        setLoading(true);
        try {
            await cartApi.removeFromCart(productID);
            await refreshCart();
        } catch (error) {
            console.error("Failed to remove from cart", error);
        } finally {
            setLoading(false);
        }
    };


    const updateQuantity = async (productID: number, quantity: number) => {
        setLoading(true);
        try {
            await cartApi.updateCartItem(productID, quantity);
            await refreshCart();
        } catch (error) {
            console.error("Failed to update quantity", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, loading, addToCart, removeFromCart, updateQuantity, refreshCart }} >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}