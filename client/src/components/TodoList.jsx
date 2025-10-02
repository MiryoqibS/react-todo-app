import React, { memo } from 'react';
import { TodoItem } from './TodoItem';
import { DndContext, closestCenter } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

export const TodoList = memo(({
    todos,
    onDelete,
    onToggleComplete,
    onUpdate,
    onReorder,
    onToggleStar,
}) => {
    const handleDragEnd = (event) => {
        const { over, active } = event;

        if (!over || active.id !== over.id) {
            onReorder(active.id, over?.id);
        };
    };

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={todos.map((todo) => todo.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="flex flex-col gap-3">
                    {todos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onDelete={() => onDelete(todo.id)}
                            onToggleComplete={() => onToggleComplete(todo.id)}
                            onUpdate={onUpdate}
                            onToggleStar={() => onToggleStar(todo.id)}
                        />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
});