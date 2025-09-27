import React, { memo } from 'react'
import { TodoItem } from './TodoItem'

export const TodoList = memo(({ todos, onDelete, onToggleComplete, onUpdate }) => {
    return (
        <div className="flex flex-col gap-3">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onDelete={() => onDelete(todo.id)}
                    onToggleComplete={() => onToggleComplete(todo.id)}
                    onUpdate={onUpdate}
                />
            ))}
        </div>
    );
});