import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { TodoEditForm } from './TodoEditForm';
import { TodoView } from './TodoView';
import { DeleteButton } from './UI/DeleteButton';
import { CheckboxButton } from './UI/CheckboxButton';

export const TodoItem = memo(({ todo, onDelete, onToggleComplete, onUpdate }) => {
    const { text, isCompleted, deadline, id } = todo;
    const editFormRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(text);
    const [editDeadline, setEditDeadline] = useState(deadline || "");

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
        <div className="
        group
        flex items-center justify-between p-4 gap-3 
        bg-white dark:bg-page-dark rounded-lg
        shadow-sm hover:shadow-md cursor-pointer transition-shadow
        border border-gray-100
        ">
            <div className="flex items-center gap-3">
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
                onClick={onDelete}
            />
        </div>
    )
});
