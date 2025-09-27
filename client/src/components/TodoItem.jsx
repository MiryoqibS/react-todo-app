import { CheckIcon, TrashIcon } from 'lucide-react';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Input } from './UI/Input';

export const TodoItem = memo(({ todo, onDelete, onToggleComplete, onUpdate }) => {
    const { text, isCompleted, deadline, createdAt, id } = todo;
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(text);
    const [editDeadline, setEditDeadline] = useState(deadline || "");
    const editFormRef = useRef(null);

    const formatDate = (date) => {
        return new Date(date).toLocaleString("ru-RU", {
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
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
            }
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
                <button
                    onClick={onToggleComplete}
                    className={`
                        flex items-center justify-center
                        p-1 rounded-full border-2 w-8 h-8
                        ${isCompleted ? "border-green-600 bg-green-600 text-white" : "border-gray-400  hover:border-gray-500"}
                        transition-colors duration-300 cursor-pointer
                    `}
                >{isCompleted ? <CheckIcon size={24} /> : <></>}</button>
                {isEditing ?
                    (<div
                        className="flex flex-col w-full gap-2 items-stretch"
                        ref={editFormRef}
                    >
                        <Input
                            type="text"
                            value={editText}
                            handleChange={(e) => setEditText(e.target.value)}
                            placeholder="Новый заголовок задачи..."
                            onKeyDown={(e) => e.key === "Enter" && handleSave()}
                            className="border-2 border-blue-600 rounded-lg text-sm text-gray-700 dark:text-gray-300"
                        />

                        <div className="flex flex-col sm:flex-row gap-2 w-full">
                            <Input
                                type="datetime-local"
                                value={editDeadline}
                                handleChange={(e) => setEditDeadline(e.target.value)}
                                className="border-2 border-blue-600 sm:flex-1 rounded-lg text-sm text-gray-700 dark:text-gray-300"
                            />
                            <button
                                onClick={handleSave}
                                className="flex items-center justify-center
                                transition-colors cursor-pointer rounded duration-500
                                bg-white text-green-600 hover:text-green-800
                                border-2 border-green-600 hover:border-green-800 hover:bg-green-100
                                px-2 py-1"
                            >
                                <CheckIcon />
                                Сохранить
                            </button>
                        </div>
                    </div>)
                    :
                    (<div
                        className="flex items-center gap-4 cursor-pointer"
                        onDoubleClick={() => setIsEditing(true)}>
                        <p
                            className={`
                        text-lg text-gray-700 dark:text-gray-200 
                        font-medium ${isCompleted ? "line-through" : ""}
                    `}>{text}</p>
                        <div className="flex flex-col items-start">
                            <span className="text-xs font-medium text-gray-400">Создано: {formatDate(createdAt)}</span>
                            {deadline && (
                                <span
                                    className={`text-xs ${isCompleted ? "text-gray-400" : new Date(deadline) < new Date() ? "text-red-500" : "text-gray-500"}`}
                                >Сделать до: "{formatDate(deadline)}"</span>
                            )}
                        </div>
                    </div>)
                }
            </div>
            <button
                onClick={onDelete}
                className="
                flex items-center justify-center
                opacity-0 group-hover:opacity-100 cursor-pointer
                hover:text-red-600 transition-all duration-300 
                dark:text-gray-200
                "
            >
                <TrashIcon size={16} />
            </button>
        </div>
    )
});
