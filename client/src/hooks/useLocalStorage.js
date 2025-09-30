import { useCallback } from "react";

export const useLocalStorage = (key) => {
    const loadFromLocalStorage = useCallback(() => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }, [key]);

    const setToLocalStorage = useCallback((todos) => {
        localStorage.setItem(key, JSON.stringify(todos));
    }, [key]);

    return { loadFromLocalStorage, setToLocalStorage };
};
