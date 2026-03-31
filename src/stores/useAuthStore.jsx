import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { useLoadingStore } from './LoadingStore';

export const useAuthStore = create(persist((set, get) => ({
    user: null,
    token: null,
    login: async (user) => {
      useLoadingStore.getState().showLoading()
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const response = await axios.post("http://127.0.0.1:5000/login", {
          email: user.email.trim(),
          password: user.password
        });
        console.log(response)
        const userData = response.data.payload;
        const token = response.data.token;
        
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        set({ 
          user: userData,
          token: token
        });
        get().setAuthHeader(token);
      }catch (err) {
        console.log(err)
      }finally{
      useLoadingStore.getState().hideLoading()
      }

      return true;
    },
    getUser: () => {
      const { user } = get();
      return user.nombre;
    },
    setAuthHeader: (token) => {
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        delete axios.defaults.headers.common['Authorization'];
      }
    },

    isAuthenticated: () => {
      const state = get();
      return state.user !== null && state.token !== null;
    },
    
    isAdmin: () => {
      const { user } = get();
      return user?.roles?.includes("admin") ?? false;
    },
    register: async (user) => {
      useLoadingStore.getState().showLoading()
      try{
        await new Promise(resolve => setTimeout(resolve, 2000));
        const response = await axios.post("http://127.0.0.1:5000/register", {
          email: user.email.trim(),
          password: user.password,
          name: user.name.trim()
        });
        const userData = response.data.payload;
        const token = response.data.token;

        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        set({ 
          user: userData,
          token: token 
        });

        get().setAuthHeader(token);
        return true;
      }catch (err){
        console.log(err)
      }finally{
      useLoadingStore.getState().hideLoading()
      }
    },
    logout: () => {
      get().setAuthHeader(null);
      set({ 
        user: null,
        token: null 
      });
    },
  }),
  {
    name: 'auth-storage',
    getStorage: () => localStorage,
  }
)
);