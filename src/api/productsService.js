import client from "./client"

const  productService = {
    getAll: async () => {
        try{
            const response = await client.get("/products");
            return response.data;
        }catch(error){
            throw error;
        }
    },
    getById: async (id) => {
        try{
            const response = await client.get(`/products/${id}`);
            return response.data;
        }catch(error){
            throw error;
        };
    },
    create: async (productData) => {
        try{
            const response = await client.post('/products/', productData);
            return response.data;
        }catch(error){
            throw error;
        };
    },
    remove: async (id) => {
        try{
            const response = await client.delete(`/products/${id}`);
            return response.data;
        }catch(error){
            throw error;
        }
    },
    update: async (id, userData) => {
        try{
            const response = await client.patch(`/products/${id}`, userData);
            return response.data;
        }catch(error){
            throw error;
        };
    }
}

export default productService