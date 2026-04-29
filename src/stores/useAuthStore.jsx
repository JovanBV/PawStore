import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../api';
import { useLoadingStore } from './LoadingStore';
import { useCartStore } from './cartStore';

export const useAuthStore = create(persist((set, get) => ({
    user: null,
    token: null,
    onAuthError: null,
    login: async (user) => {
      useLoadingStore.getState().showLoading()
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const data = await authService.login({
          email: user.email.trim(),
          password: user.password
        });

        localStorage.setItem('authToken', data.token);
        set({ 
          user: data.payload,
          token: data.token
        });
        console.log(get().user)
        return true;
      }catch (error) {
        throw error;
      }finally{
      useLoadingStore.getState().hideLoading()
      }
    },setOnAuthError: (callback) => {
      set({onAuthError: callback})
    },
    clearAuth: () => {
      const { onAuthError } = get()
      set({token: null, user: null})
      if (onAuthError){
        onAuthError()
      }
    }, 
    getUser: () => {
      const state = get();
      return state.user?.name || "";
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
        const data = await authService.register({
          email: user.email.trim(),
          password: user.password,
          name: user.name.trim()
        });

        localStorage.setItem('authToken', data.token)
        set({ 
          user: data.payload,
          token: data.token 
        });
        return true;
      }catch (error){
        throw error
      }finally{
      useLoadingStore.getState().hideLoading()
      }
    },
    logout: () => {
      authService.logout();
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