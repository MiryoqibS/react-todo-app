import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { TodoEditForm } from './TodoEditForm';
import { TodoView } from './TodoView';
import { DeleteButton } from './UI/DeleteButton';
import { CheckboxButton } from './UI/CheckboxButton';
import { useSortable } from '@dnd-kit/sortable';
import { GripIcon } from 'lucide-react';

export const TodoItem = memo(({ todo, onDelete, onToggleComplete, onUpdate }) => {
    const { text, isCompleted, deadline, id } = todo;
    const editFormRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(text);
    const [editDeadline, setEditDeadline] = useState(deadline || "");

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id,
    });

    const styles = {
        transform:
            transform ?
                `translate(${transform.x}px, ${transform.y}px)` : undefined,
        transition,
        zIndex: isDragging ? 1 : "auto",
        opacity: isDragging ? 0.8 : 1,
    };

    const handleSave = useCallback(() => {
        if (editText.trim()) {
            onUpdate(id, editText, editDeadline);
        };

        setIsEditing(false);
    }, [editText, editDeadline, id, onUpdate]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (editFormRef.current && !editFormRef.current.contains(e.target)) {
                handleSave();
            };
        };

        if (isEditing) {
            document.addEventListener("click", handleClickOutside);
        };

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };

    }, [isEditing, handleSave]);

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            style={styles}
            className="
        group flex items-center justify-start p-4 gap-3 
        bg-white dark:bg-page-dark rounded-lg border border-gray-100
        shadow-sm hover:shadow-md cursor-pointer transition-shadow w-full
        ">
            {/* Блок для перетаскивания */}
            <div
                {...listeners}
                className="text-gray-700 dark:text-white cursor-grab active:cursor-grabbing"
            >
                <GripIcon size={16} />
            </div>

            <div
                className="flex items-center gap-3 w-full"
            >
                <CheckboxButton
                    onToggle={onToggleComplete}
                    isCompleted={isCompleted}
                />

                {isEditing ?
                    (<TodoEditForm
                        formRef={editFormRef}
                        text={editText}
                        deadline={editDeadline}
                        onTextChange={setEditText}
                        onDeadlineChange={setEditDeadline}
                        handleSave={handleSave}
                    />)
                    :
                    (<TodoView
                        setIsEditing={setIsEditing}
                        todo={todo}
                    />)
                }
            </div>

            <DeleteButton
                className="ml-auto"
                onClick={onDelete}
            />
        </div>
    )
});
