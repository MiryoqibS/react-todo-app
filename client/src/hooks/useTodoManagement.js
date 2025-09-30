/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useTodoActions } from "./useTodoActions";
import { useLocalStorage } from "./useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/todos";

export const useTodoManagement = () => {
    const [todos, setTodos] = useState([]);
    const { loadFromLocalStorage, setToLocalStorage } = useLocalStorage(LOCAL_STORAGE_KEY);
    const { getTodos, ...actions } = useTodoActions({ todos, setTodos });

    // == Получаем задачи ==
    useEffect(() => {
        const loadInitialData = async () => {
            const serverTodos = await getTodos();
            const savedTodos = loadFromLocalStorage();
            const sortedTodos = serverTodos.length ? serverTodos : savedTodos;
            setToLocalStorage(sortedTodos)
            setTodos(sortedTodos);
        };

        loadInitialData();
    }, []);

    // == Проверка есть ли выполнение задачи ==
    const hasCompletedTodos = todos.some((todo) => todo.isCompleted);

    return {
        todos,
        setTodos,
        hasCompletedTodos,
        ...actions,
    };
};