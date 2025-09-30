import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useTodosApi } from "./useTodosApi";
import { LOCAL_STORAGE_KEY } from "../constants/todos";

export const useTodoActions = ({ todos, setTodos }) => {
    const [deletingId, setDeletingId] = useState(null);
    const [isDeletingCompleted, setIsDeletingCompleted] = useState(false);
    const { setToLocalStorage } = useLocalStorage(LOCAL_STORAGE_KEY);

    const {
        getTodos,
        createTodo,
        deleteTodo,
        updateTodo,
        completeTodo,
        reorderTodos,
    } = useTodosApi();

    // == Создание задачи ==
    const onCreate = async (text, deadline) => {
        const newTodo = {
            text,
            deadline: deadline || null,
        };

        try {
            const createdTodo = await createTodo(newTodo);
            const updatedTodos = [...todos, createdTodo];
            setTodos(updatedTodos);
            setToLocalStorage(updatedTodos);
        } catch (error) {
            console.log(`Произошла ошибка при добавлении задачи: ${error.message}`);
        };
    };

    // == Удаление задачи ==
    const onDelete = async (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        setToLocalStorage(updatedTodos);
        setDeletingId(null);

        try {
            await deleteTodo(id);
        } catch (error) {
            console.log(`Ошибка при удалении задачи: ${error.message}`);
        };
    };

    // == Изменение задачи ==
    const onUpdate = async (id, newText, newDeadline) => {
        const updatedTodos = todos.map(
            (todo) => todo.id === id ? {
                ...todo,
                text: newText,
                deadline: newDeadline
            } : todo
        );
        setTodos(updatedTodos);
        setToLocalStorage(updatedTodos);

        try {
            await updateTodo(id, {
                text: newText,
                deadline: newDeadline,
            });
        } catch (error) {
            console.log(`Ошибка при изменении задачи: ${error.message}`);
        };
    };

    // == Отметить задачу как выполненная ==
    const onToggleComplete = async (id) => {
        const updatedTodos = todos.map((todo) => todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo);
        setTodos(updatedTodos);
        setToLocalStorage(updatedTodos);
        try {
            await completeTodo(id);
        } catch (error) {
            console.log(`Ошибка при изменении задачи: ${error.message}`);
        };
    };

    // == Изменения порядка задачи ==
    const onReorder = async (activeId, overId) => {
        if (!overId || !activeId) return;
        const prevTodos = [...todos];

        try {
            const activeTodoIndex = todos.findIndex((todo) => todo.id === activeId);
            const overTodoIndex = todos.findIndex((todo) => todo.id === overId);

            if ([activeTodoIndex, overTodoIndex].includes(-1) || activeTodoIndex === overTodoIndex) return;
            const newTodos = [...todos];
            const [movedTodo] = newTodos.splice(activeTodoIndex, 1);
            newTodos.splice(overTodoIndex, 0, movedTodo);

            const updatedTodos = newTodos.map((todo, index) => ({
                ...todo,
                order: index + 1,
            }));

            setTodos(updatedTodos);
            await reorderTodos(updatedTodos);
            setToLocalStorage(updatedTodos);
        } catch (error) {
            console.log(`Ошибка при перемещении задачи: ${error.message}`);
            setTodos(prevTodos);
        };
    };

    // == Подтверждения на удаление всех выполненных задач ==
    const onDeleteCompleted = async () => {
        const originalTodos = [...todos];
        const completedIds = originalTodos
            .filter((todo) => todo.isCompleted)
            .map(todo => todo.id);

        setTodos(originalTodos.filter((todo) => !todo.isCompleted));

        const failedIds = [];

        for (const id of completedIds) {
            try {
                await deleteTodo(id);
            } catch (error) {
                console.log(`Ошибка при удалении задачи: ${error.message}`);
                failedIds.push(id);
            };
        }

        if (failedIds.length > 0) {
            setTodos(
                originalTodos.filter((todo) => !todo.isCompleted || failedIds.includes(todo.id))
            );
        };

        setToLocalStorage(originalTodos.filter((todo) => !todo.isCompleted));
        setIsDeletingCompleted(false);
    };

    return {
        getTodos,
        deletingId,
        setDeletingId,
        isDeletingCompleted,
        setIsDeletingCompleted,
        onCreate,
        onDelete,
        onDeleteCompleted,
        onUpdate,
        onToggleComplete,
        onReorder,
    };
}