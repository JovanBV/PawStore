import client from "./client";

const authService = {
    login: async (userData) => {
        try{
            const response = await client.post('/login', userData);
            return response.data;
        }catch (error){
            throw error
        }
    },
    register: async (userData) => {
        try{
            const response = await client.post('/register', userData);
            return response.data;
        }catch (error){
            throw error;
        };
    },
    me: async () => {
        try{
            const response = await client.get('/me');
            return response.data;
        }catch (error){
            throw error;
        };
    },
    logout: () => {
        localStorage.removeItem('authToken');
    }
}

export default authService;