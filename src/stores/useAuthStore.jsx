import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../api';
import { useLoadingStore } from './LoadingStore';

export const useAuthStore = create(persist((set, get) => ({
    user: null,
    token: null,
    login: async (user) => {
      useLoadingStore.getState().showLoading()
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const data = await authService.login({
          email: user.email.trim(),
          password: user.password
        });

        localStorage.setItem('authToken', data.token);
        set({ 
          user: data.payload,
          token: data.token
        });
        return true;
      }catch (error) {
        throw error;
      }finally{
      useLoadingStore.getState().hideLoading()
      }
    },
    getUser: () => {
      const state = get();
      console.log(state)
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