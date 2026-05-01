import { createContext, useContext, useState, useEffect } from 'react';
import salesService from '../api/salesService';
import { useLoadingStore } from '../stores/LoadingStore';

const generateKey = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const STORAGE_KEY = 'cart-storage';

const loadFromStorage = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return { shoppingCart: [], shoppingCartId: null, shoppingCartReceipts: [] };
        const parsed = JSON.parse(saved);

        const shoppingCart = (parsed.shoppingCart || []).map(item => ({
        ...item,
        key: item.key || generateKey(),
        }));

        return {
        shoppingCart,
        shoppingCartId: parsed.shoppingCartId || null,
        shoppingCartReceipts: parsed.shoppingCartReceipts || [],
        };
    } catch {
        return { shoppingCart: [], shoppingCartId: null, shoppingCartReceipts: [] };
    }
};

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const initial = loadFromStorage();

    const [shoppingCart, setShoppingCart] = useState(initial.shoppingCart);
    const [shoppingCartId, setShoppingCartId] = useState(initial.shoppingCartId);
    const [shoppingCartReceipts, setShoppingCartReceipts] = useState(initial.shoppingCartReceipts);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
        shoppingCart,
        shoppingCartId,
        shoppingCartReceipts,
        }));
    }, [shoppingCart, shoppingCartId, shoppingCartReceipts]);

    const createCart = async () => {
        useLoadingStore.getState().showLoading();
        try {
            const payload = shoppingCartId
                ? { items: shoppingCart, id: shoppingCartId }
                : { items: shoppingCart };

            const response = await salesService.createCart(payload);
            setShoppingCartId(response.id);
            return true;
        } catch (error) {
            if (error.response?.status === 500) {
                return { error: 'Insufficient amount in stock.' };
            } else if (error.response?.status === 400) {
                setShoppingCartId(null);
                return { error: 'Cart already checked out or empty' };
            }
            return false;
        } finally {
            useLoadingStore.getState().hideLoading();
        }
    };

    const getCheckedCart = async (cartId, userEmail) => {
        useLoadingStore.getState().showLoading();
        try {
            const checkedCart = await salesService.getProcessedCheckout(cartId, userEmail);
            return checkedCart;
        } catch {
            return null;
        } finally {
            useLoadingStore.getState().hideLoading();
        }
    };

    const allProcessCheckout = async () => {
        useLoadingStore.getState().showLoading();
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await salesService.processCheckout(shoppingCartId);
            setShoppingCart([]);
            setShoppingCartId(null);
            setShoppingCartReceipts(prev => [...prev, response.cart_id]);
            return true;
        } catch (error) {
            console.log('Error in checkout: ', error);
        } finally {
            useLoadingStore.getState().hideLoading();
        }
    };

    const addItem = (newItem) => {
        setShoppingCart(current => {
        const exists = current.find(p => p.id === newItem.id);
        if (!exists) {
            return [...current, { ...newItem, key: newItem.key || generateKey(), amount: 1 }];
        }
        return current.map(p => p.id === newItem.id ? { ...p, amount: p.amount + 1 } : p);
        });
    };

    const sumTotalPrice = () =>
        shoppingCart.reduce((sum, item) => sum + item.price * item.amount, 0);

    const updateItem = (item, newValue) => {
        setShoppingCart(current => {
        const exists = current.find(p => p.key === item.key);
        if (!exists) return current;

        if (newValue <= 0) {
            return current.filter(p => p.key !== exists.key);
        }

        if (exists.amount !== newValue) {
            return current.map(p => p.key === exists.key ? { ...p, amount: newValue } : p);
        }

        return current;
        });
    };

    const fullyDeleteItem = (item) => {
        setShoppingCart(current => current.filter(p => p.key !== item.key));
    };

    const deleteItem = (item) => {
        setShoppingCart(current => {
        const exists = current.find(p => p.key === item.key);
        if (!exists) return current;
        if (exists.amount === 1) return current.filter(p => p.key !== item.key);
        return current.map(p => p.key === item.key ? { ...p, amount: p.amount - 1 } : p);
        });
    };

    const deleteAll = () => setShoppingCart([]);

    const value = {
        shoppingCart,
        shoppingCartId,
        shoppingCartReceipts,
        createCart,
        getCheckedCart,
        allProcessCheckout,
        addItem,
        sumTotalPrice,
        updateItem,
        fullyDeleteItem,
        deleteItem,
        deleteAll,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
const context = useContext(CartContext);
if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
}
return context;
}