import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "todos";
const API_URL = "http://localhost:8080/api";

export const useTodoManagement = () => {
    const [todos, setTodos] = useState([]);
    const [deletingId, setDeletingId] = useState(null);
    const [isDeletingCompleted, setIsDeletingCompleted] = useState(false);

    // == Получаем задачи ==
    useEffect(() => {
        const loadInitialData = async () => {
            const response = await fetch(`${API_URL}/todos`);
            const data = await response.json();
            const savedTodos = data.todos;
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedTodos));
            setTodos(savedTodos);
        };

        loadInitialData();
    }, []);

    // == Добавление задачи ==
    const onAdd = async (text, deadline) => {
        const newTodo = {
            text,
            deadline: deadline || null,
        };

        try {
            const response = await fetch(`${API_URL}/todos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTodo),
            });

            const data = await response.json();
            if (!response.ok) throw new Error("ошибка при создании задачи");

            const updatedTodos = [...todos, data.todo]
            setTodos(updatedTodos);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
        } catch (error) {
            console.log(`Произошла ошибка при добавлении задачи: ${error.message}`);
        }
    };

    // == Изменение задачи ==
    const handleUpdate = async (id, newText, newDeadline) => {
        const updatedTodos = todos.map(
            (todo) => todo.id === id ?
                {
                    ...todo,
                    text: newText,
                    deadline: newDeadline
                }
                :
                todo
        );
        setTodos(updatedTodos);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));

        try {
            const response = await fetch(`${API_URL}/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: newText,
                    deadline: newDeadline,
                }),
            });
            if (!response.ok) throw new Error("ошибка при изменении ошибки");
        } catch (error) {
            console.log(`Ошибка при изменении задачи: ${error.message}`);
        };
    };

    // == Удаление задачи ==
    const handleDelete = async (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
        setDeletingId(null);

        try {
            const response = await fetch(`${API_URL}/todos/${id}`, {
                method: "DELETE"
            });
            if (!response.ok) throw new Error("ошибка удалении задачи");
        } catch (error) {
            console.log(`Ошибка при удалении задачи: ${error.message}`);
        };
    };

    // == Проверка есть ли выполнение задачи ==
    const hasCompletedTodos = todos.some((todo) => todo.isCompleted);

    // == Подтверждения на удаление всех выполненных задач ==
    const confirmDeleteCompleted = async () => {
        const originalTodos = [...todos];
        const completedIds = originalTodos
            .filter((todo) => todo.isCompleted)
            .map(todo => todo.id);

        setTodos(originalTodos.filter((todo) => !todo.isCompleted));

        const failedIds = [];

        for (const id of completedIds) {
            try {
                const response = await fetch(`${API_URL}/todos/${id}`, {
                    method: "DELETE"
                });
                if (!response.ok) throw new Error("ошибка удалении задачи");
            } catch (error) {
                console.log(`Ошибка при удалении задачи: ${error.message}`);
                failedIds.push(id);
            };
        }

        if (failedIds.length > 0) {
            setTodos(
                originalTodos.filter((todo) => !todo.isCompleted || failedIds.includes((todo.id)))
            );
        };

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
        setIsDeletingCompleted(false);
    };

    // == Отметить задачу как выполненная ==
    const onToggleComplete = async (id) => {
        const updatedTodos = todos.map((todo) => todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo);
        setTodos(updatedTodos);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
        try {
            const response = await fetch(`${API_URL}/todos/${id}/toggle`, {
                method: "PATCH"
            });
            if (!response.ok) throw new Error("ошибка при изменении задачи");
        } catch (error) {
            console.log(`Ошибка при изменении задачи: ${error.message}`);
        };
    };

    return {
        todos,
        setTodos,
        deletingId,
        setDeletingId,
        isDeletingCompleted,
        setIsDeletingCompleted,
        onAdd,
        handleUpdate,
        handleDelete,
        hasCompletedTodos,
        confirmDeleteCompleted,
        onToggleComplete
    };
};