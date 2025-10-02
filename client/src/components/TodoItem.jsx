import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { TodoEditForm } from './TodoEditForm';
import { TodoView } from './TodoView';
import { DeleteButton } from './UI/DeleteButton';
import { CheckboxButton } from './UI/CheckboxButton';
import { useSortable } from '@dnd-kit/sortable';
import { GripIcon, StarIcon } from 'lucide-react';
import { Button } from './UI/Button';

export const TodoItem = memo(({ todo, onDelete, onToggleComplete, onToggleStar, onUpdate }) => {
    const { text, isCompleted, deadline, id, isStarred, description } = todo;
    const editFormRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(text);
    const [editDeadline, setEditDeadline] = useState(deadline || "");
    const [editDescription, setEditDescription] = useState(description || "");

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
            onUpdate(id, editText, editDeadline, editDescription);
        };

        setIsEditing(false);
    }, [editText, editDeadline, editDescription, id, onUpdate]);

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
                        description={editDescription}
                        onTextChange={setEditText}
                        onDeadlineChange={setEditDeadline}
                        onDescriptionChange={setEditDescription}
                        handleSave={handleSave}
                    />)
                    :
                    (<TodoView
                        setIsEditing={setIsEditing}
                        todo={todo}
                    />)
                }
            </div>

            <div className="flex flex-col items-center gap-2 justify-between">
                <DeleteButton
                    className="ml-auto"
                    onClick={onDelete}
                />

                <button
                    onClick={onToggleStar}
                    className={`
                        flex items-center justify-center
                        ${isStarred ? "!text-yellow-500 hover:text-yellow-700" : "opacity-0 group-hover:opacity-100"} cursor-pointer transition-all duration-300 
                        text-gray-700 hover:text-yellow-700 dark:text-gray-200`
                    }
                >
                    <StarIcon size={16} />
                </button>
            </div>
        </div>
    )
});
