import { createContext, useContext, useState, useRef } from 'react';
import { authService } from '../api';
import { useLoadingStore } from '../stores/LoadingStore';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('auth-storage');
        return saved ? JSON.parse(saved).user : null;
    });

    const [token, setToken] = useState(() => {
        const saved = localStorage.getItem('auth-storage');
        return saved ? JSON.parse(saved).token : null;
    });

    const onAuthErrorRef = useRef(null);

    const setOnAuthError = (callback) => {
        onAuthErrorRef.current = callback;
    };

    const clearAuth = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('auth-storage');
        if (onAuthErrorRef.current) {
        onAuthErrorRef.current();
        }
    };

    const login = async (credentials) => {
        useLoadingStore.getState().showLoading();
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const data = await authService.login({
                email: credentials.email.trim(),
                password: credentials.password,
            });

            localStorage.setItem('authToken', data.token);
            localStorage.setItem('auth-storage', JSON.stringify({
                user: data.payload,
                token: data.token,
            }));

            setUser(data.payload);
            setToken(data.token);
            return true;
        } catch (error) {
            throw error;
        } finally {
            useLoadingStore.getState().hideLoading();
        }
    };

    const register = async (credentials) => {
        useLoadingStore.getState().showLoading();
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const data = await authService.register({
                email: credentials.email.trim(),
                password: credentials.password,
                name: credentials.name.trim(),
            });

            localStorage.setItem('authToken', data.token);
            localStorage.setItem('auth-storage', JSON.stringify({
                user: data.payload,
                token: data.token,
            }));

            setUser(data.payload);
            setToken(data.token);
            return true;
        } catch (error) {
            throw error;
        } finally {
            useLoadingStore.getState().hideLoading();
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setToken(null);
        localStorage.removeItem('auth-storage');
        localStorage.removeItem('authToken');
    };

    const isAuthenticated = user !== null && token !== null;
    const isAdmin = user?.roles?.includes('admin') ?? false;
    const getUser = () => user?.name || '';

    const value = {
        user,
        token,
        isAuthenticated,
        isAdmin,
        getUser,
        login,
        register,
        logout,
        clearAuth,
        setOnAuthError,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }
    return context;
}