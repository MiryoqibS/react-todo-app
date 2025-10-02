import React, { useMemo, useState } from 'react';
import { AddTodo } from './AddTodo';
import { TodoList } from './TodoList';
import { Header } from './Header';
import { TodoFilter } from './TodoFilter';

export default function TodoContent({
    todos,
    onCreate,
    setDeletingId,
    onToggleComplete,
    handleUpdate,
    onReorder,
    onToggleStar,
}) {
    const [filter, setFilter] = useState("all");

    const filteredTodos = useMemo(() => {
        switch (filter) {
            case "completed":
                return todos.filter((todo) => todo.isCompleted);
            case "active":
                return todos.filter((todo) => !todo.isCompleted);
            case "newest":
                return [...todos].sort((aTodo, bTodo) => {
                    const aDate = new Date(aTodo.createdAt);
                    const bDate = new Date(bTodo.createdAt);
                    return bDate - aDate;
                });
            case "oldest":
                return [...todos].sort((aTodo, bTodo) => {
                    const aDate = new Date(aTodo.createdAt);
                    const bDate = new Date(bTodo.createdAt);
                    return aDate - bDate;
                });
            case "overpast":
                return todos.filter((todo) => {
                    if (!todo.deadline) return false;
                    const dueDate = new Date(todo.deadline);
                    return dueDate < new Date();
                });
            case "hasDescription":
                return todos.filter((todo) => todo.description.trim().length > 0);
            case "starred":
                return todos.filter((todo) => todo.isStarred);
            default:
                return todos;
        };
    }, [todos, filter]);

    return (
        <div className="mx-auto flex flex-col gap-3 max-w-[650px]">
            <Header />

            <AddTodo onCreate={onCreate} />

            <TodoFilter
                filter={filter}
                setFilter={setFilter}
            />

            <TodoList
                todos={filteredTodos}
                onDelete={setDeletingId}
                onToggleComplete={onToggleComplete}
                onUpdate={handleUpdate}
                onReorder={onReorder}
                onToggleStar={onToggleStar}
            />
        </div>
    )
};