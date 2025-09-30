import { API_URL } from "../constants/todos";

export const useTodosApi = () => {
    // == Запрос для получение задач ==
    const getTodos = async () => {
        const response = await fetch(`${API_URL}/todos`);
        const data = await response.json();
        return data.todos || [];
    };

    // == Запрос для создания задачи ==
    const createTodo = async (todo) => {
        const response = await fetch(`${API_URL}/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        });

        const data = await response.json();
        if (!response.ok) throw new Error("не правильные данные");

        const createdTodo = data.todo;
        return createdTodo;
    };

    // == Запрос для обновления задачи ==
    const updateTodo = async (id, updatedFields) => {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedFields),
        });

        if (!response.ok) throw new Error("не правильные данные");
    };

    // == Запрос для отметки задачи ==
    const completeTodo = async (id) => {
        const response = await fetch(`${API_URL}/todos/${id}/toggle`, {
            method: "PATCH"
        });

        if (!response.ok) throw new Error("не правильные данные");
    };

    // == Запрос для удаления задачи ==
    const deleteTodo = async (id) => {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error("не правильные данные");
    };

    // == Запрос для изменения порядка задач (BULK) ==
    const reorderTodos = async (updatedTodos) => {
        const response = await fetch(`${API_URL}/todos/reorder`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTodos),
        });

        if (!response.ok) throw new Error("не правильные данные");
    };

    return {
        getTodos,
        createTodo,
        deleteTodo,
        updateTodo,
        completeTodo,
        reorderTodos,
    };
};