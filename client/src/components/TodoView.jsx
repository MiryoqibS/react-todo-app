import React from 'react';
import { formatDate } from "../utils/formatDate";

export const TodoView = ({
    setIsEditing,
    todo,
}) => {
    const { text, isCompleted, deadline, createdAt } = todo;

    return (
        <div
            className="flex items-center gap-4 cursor-pointer w-full"
            onDoubleClick={() => setIsEditing(true)}>
            <p
                className={`
                        text-lg text-gray-700 dark:text-gray-200 flex-1
                        font-medium ${isCompleted ? "line-through" : ""}
                    `}>{text}</p>
            <div className="flex flex-col items-start ml-auto">
                <span className="text-xs font-medium text-gray-400">Создано: "{formatDate(createdAt)}"</span>
                {deadline && (
                    <span
                        className={`text-xs ${isCompleted ? "text-gray-400" : new Date(deadline) < new Date() ? "text-red-500" : "text-gray-500"}`}
                    >Сделать до: "{formatDate(deadline)}"</span>
                )}
            </div>
        </div>
    )
};
