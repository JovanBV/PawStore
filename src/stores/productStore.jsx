import { create } from "zustand";
import products from "../data/products.json";

export const useProductStore = create((set) => ({
    products,
    deleteProduct: (idToDelete) =>
        set((state) => {
        const next = state.products.filter((p) => p.id !== idToDelete);
        return { products: next };
        }),
    addProduct: (product) =>
        set((state) => {
        const newProduct = { ...product, id: Date.now() };
        const next = [...state.products, newProduct];
        return { products: next };
        }),
    editProduct: (product) =>
        set((state) => ({
            products: state.products.map((p) => p.id === product.id ? product: p)
        })),
}));