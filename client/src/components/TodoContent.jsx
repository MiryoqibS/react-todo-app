import React, { useMemo, useState } from 'react';
import { AddTodo } from './AddTodo';
import { TodoList } from './TodoList';
import { Header } from './Header';
import { TodoFilter } from './TodoFilter';

export const TodoContent = ({
    todos,
    onAdd,
    setDeletingId,
    onToggleComplete,
    handleUpdate,
    onReorder
}) => {
    const [filter, setFilter] = useState("all");

    const filteredTodos = useMemo(() => {
        switch (filter) {
            case "completed":
                return todos.filter((todo) => todo.isCompleted);
            case "active":
                return todos.filter((todo) => !todo.isCompleted);
            default:
                return todos;
        }
    }, [todos, filter]);

    return (
        <div className="mx-auto flex flex-col gap-3 max-w-[650px]">
            <Header />
            <AddTodo onAdd={onAdd} />
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
            />
        </div>
    )
};