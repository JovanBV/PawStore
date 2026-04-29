import client from "./client"

const salesService = {
    createCart: async (items) => {
        try{
            const response = await client.post("/cart", items);
            return response.data;
        }catch(error){
            throw error;
        }
    },
    processCheckout: async (cartId) => {
        try{
            const response = await client.post("/checkout", cartId);
            return response.data;
        }catch(error){
            console.log("error in salesService: ", error)
            throw error;
        }
    },
    getProcessedCheckout: async (cartId, userEmail) => {
        try{
            const response = await client.post(`/receipt/${cartId}`, userEmail)
            return response.data;
        } catch (error) {
            console.log("error in getting processed checkout: ", error)
            throw error;
        }
    }
}

export default salesService