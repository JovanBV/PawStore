import { create } from "zustand";
import { useLoadingStore } from "./LoadingStore";
import productService from "../api/productsService";


export const useProductStore = create((set) => ({
    products: [],
    fetchAllProducts: async () => {
        useLoadingStore.getState().showLoading()
        try {
            const data = await productService.getAll();
            set({products: data})
            useLoadingStore.getState().hideLoading()
        } catch (error) {
            console.error("Error adding product:", error);
            throw error;
        }finally{
            useLoadingStore.getState().hideLoading()
        }
    },
    addProduct: async (product) => {
        useLoadingStore.getState().showLoading()
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const data = await productService.create(product);
            set((state) => ({products: [...state.products, data]}));
        } catch (err) {
            console.error("Error adding product:", err);
            throw err;
        }finally{
            useLoadingStore.getState().hideLoading()
        }
    },
    editProduct: async (updatedProduct, id) => {
        useLoadingStore.getState().showLoading()
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const data = await productService.update(id, updatedProduct)
            set((state) => ({
                products: state.products.map((p) => 
                    p.id === id ? data : p
                )
            }));
        } catch (error) {
            console.error("Error editing product:", error);
            throw error
        }finally{
            useLoadingStore.getState().hideLoading()
        }
    },
    deleteProduct: async (idToDelete) => {
        useLoadingStore.getState().showLoading()
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const data = await productService.remove(idToDelete);
            set((state) => ({
                products: state.products.filter((p) => p.id !== idToDelete)
            }))
        } catch (error) {
            console.error("Error deleting product:", error);
            throw error;
        }finally{
            useLoadingStore.getState().hideLoading()
        }
    },
}));