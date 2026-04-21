import { create } from "zustand";
import axios from 'axios';
import { useAuthStore } from "./useAuthStore";
import { useLoadingStore } from "./LoadingStore";

const API_URL = "http://127.0.0.1:5000";

export const useProductStore = create((set, get) => ({
    products: [],
    fetchAllProducts: async () => {
        useLoadingStore.getState().showLoading()
        try {
            const response = await axios.get(`${API_URL}/products/`);
            set({products: response.data})
            useLoadingStore.getState().hideLoading()
        } catch (err) {
            console.error("Error fetching products:", err);
            useLoadingStore.getState().hideLoading()
        }
    },
    addProduct: async (product) => {
        const token = useAuthStore.getState().token;
        const isAdmin = useAuthStore.getState().isAdmin();

        if (!isAdmin){
            console.log("Solo administradores pueden hacer estas funciones.")
        }
        useLoadingStore.getState().showLoading()
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const response = await axios.post(`${API_URL}/products/`, product,
            {headers: {
                'Authorization': `Bearer ${token}`
            }});
            set((state) => ({
                products: [...state.products, response.data]
            }));
            return response.data;
        } catch (err) {
            console.error("Error adding product:", err);
            throw err;
        }finally{
            useLoadingStore.getState().hideLoading()
        }
    },
    editProduct: async (updatedProduct, id) => {
        const token = useAuthStore.getState().token;
        useLoadingStore.getState().showLoading()
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const response = await axios.patch(`${API_URL}/products/${id}`, updatedProduct, 
            {headers: {
                'Authorization': `Bearer ${token}`
            }});
            set((state) => ({
                products: state.products.map((p) => 
                    p.id === id ? response.data : p
                )
            }));
            return response.data;
        } catch (err) {
            console.error("Error editing product:", err);
        }finally{
            useLoadingStore.getState().hideLoading()
        }
    },
    deleteProduct: async (idToDelete) => {
        const token = useAuthStore.getState().token;
        const isAdmin = useAuthStore.getState().isAdmin();
        useLoadingStore.getState().showLoading()
        
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            await axios.delete(`${API_URL}/products/${idToDelete}`, 
                {headers: {
                    'Authorization': `Bearer ${token}`
                }}
            );
            set((state) => ({
                products: state.products.filter((p) => p.id !== idToDelete)
            }))
        } catch (err) {
            console.error("Error deleting product:", err);
            throw err;
        }finally{
            useLoadingStore.getState().hideLoading()
        }
    },
}));