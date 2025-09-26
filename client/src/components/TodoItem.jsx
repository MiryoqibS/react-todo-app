import { CheckIcon, TrashIcon } from 'lucide-react';
import React, { memo } from 'react'

export const TodoItem = memo(({ todo, onDelete, onToggleComplete }) => {
    const { text, isCompleted, deadline, createdAt } = todo;

    const formatDate = (date) => {
        return new Date(date).toLocaleString("ru-RU", {
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    return (
        <div className="
        group
        flex items-center justify-between p-4 gap-3 
        bg-white dark:bg-page-dark rounded-lg h-12 
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
                <p
                    className={`
                        text-lg text-gray-700 dark:text-gray-200 
                        font-medium ${isCompleted ? "line-through" : ""}
                    `}
                >{text}</p>
                <div className="flex flex-col items-start">
                    <span className="text-xs font-medium text-gray-400">Создано: {formatDate(createdAt)}</span>
                    {deadline && (
                        <span
                            className={`text-xs ${isCompleted ? "text-gray-400" : new Date(deadline) < new Date() ? "text-red-500" : "text-gray-500"}`}
                        >Сделать до: "{formatDate(deadline)}"</span>
                    )}
                </div>
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
