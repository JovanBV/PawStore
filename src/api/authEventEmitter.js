let clearAuthCallback = null;

export const registerClearAuth = (fn) => {
    clearAuthCallback = fn;
};

export const triggerClearAuth = () => {
    if (clearAuthCallback) {
        clearAuthCallback();
    }
};