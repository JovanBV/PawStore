import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import salesService from '../api/salesService';
import { useLoadingStore } from './LoadingStore';

const generateKey = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const useCartStore = create(persist((set, get) => ({
    lastAuthenticatedUserId: null,
    shoppingCart: [], 
    shoppingCartId: null,
    shoppingCartReceipts: [],
    createCart: async() => {
        useLoadingStore.getState().showLoading()
        try{
            const items = get().shoppingCart || [];
            const cartId = get().shoppingCartId || [];
            
            const payload = cartId 
                ? { items: items, id: cartId }
                : { items: items };
            
            const response = await salesService.createCart(payload);
            
            set({ shoppingCartId: response.id });
            return true;
        }catch (error){
            if(error.response?.status === 500){
              return {error: "Insufficient amount in stock."};
            }else if(error.response?.status === 400){
              set({shoppingCartId: null})
              return {error: "Cart already checked out or empty"}
            }
            return false;
        }finally{
            useLoadingStore.getState().hideLoading()
        }
    },
    getCheckedCart: async (cartId, userEmail) => {
      useLoadingStore.getState().showLoading()
      try {
        const checkedCart = await salesService.getProcessedCheckout(cartId, userEmail)
        return checkedCart;
      } catch (error) {
        return null;
      }finally{
        useLoadingStore.getState().hideLoading()
      }
    },
    allProcessCheckout: async () => {
      useLoadingStore.getState().showLoading()
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const cartId = get().shoppingCartId
        const response = await salesService.processCheckout(cartId)
        const previousReceipts = get().shoppingCartReceipts
        set({shoppingCart: [],shoppingCartId: null, shoppingCartReceipts: [...previousReceipts, response.cart_id]})
        return true;
      } catch (error) {
        console.log("Error in checkout: ", error)
      }finally{
        useLoadingStore.getState().hideLoading()
      }
    },
    printCart: () => {
      const cart = get().shoppingCart || []
    },
    addItem: (newItem) => {
      const current = get().shoppingCart || []
      
      if(!newItem.key) {
        newItem.key = generateKey();
      }
      
      const exists = current.find((p) => p.id === newItem.id);
      
      if(!exists){
        newItem.amount = 1;
        set({shoppingCart: [...current, newItem]})
      }else if(exists){
        const updated = current.map((p) => p.id === exists.id ? {...p, amount: p.amount + 1}: p)
        set({shoppingCart: [...updated]})
      }
    },
    sumTotalPrice: () => {
        const cart = get().shoppingCart || [];
        return cart.reduce((sum, item) => {return sum + (item.price * item.amount)}, 0)
    },
    updateItem: (item, newValue) => {
      const current = get().shoppingCart || [];
      const exists = current.find((p) => p.key === item.key)

      if(newValue <= 0){
        const filtered = current.filter((p)=> p.key != exists.key)
        set({shoppingCart: [...filtered]})
        return
      }

      if(exists && exists.amount !== newValue){
        set({shoppingCart: current.map((p) => p.key === exists.key ? {...p, amount: newValue}: p)})
      }
    },
    fullyDeleteItem: (item) => {
      const current = get().shoppingCart || []
      const exists = current.find((p) => p.key === item.key);
      if(exists){
        const filtered = current.filter((p) => p.key != item.key);
        set({shoppingCart: [...filtered]})
      }
    },
    deleteItem: (item) => {
      const current = get().shoppingCart || []
      const exists = current.find((p) => p.key === item.key);
      if(!exists){
        return
      }else if(exists.amount === 1){
        const update = current.filter((p)=> p.key != exists.key)
        set({shoppingCart: [...update]})
        return
      }else{
        const deleteUpdated = current.map((p)=> p.key === item.key ? {...p, amount: p.amount - 1}: p);
        set({shoppingCart: [...deleteUpdated]})
      }
    },
    deleteAll: () => {
      set({shoppingCart: []})
    }
  }),
  {
    name: `cart-storage`,
    getStorage: () => localStorage,
    onRehydrate: (state) => {
      state.shoppingCart = state.shoppingCart.map((item) => ({
        ...item,
        key: item.key || generateKey()
      }))
    }
  }
)
);