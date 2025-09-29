import React from 'react';
import { Input } from './UI/Input';
import { SaveButton } from './UI/SaveButton';

export const TodoEditForm = ({
    formRef,
    text,
    deadline,
    onTextChange,
    onDeadlineChange,
    handleSave
}) => {
    return (
        <div
            className="flex flex-col w-full gap-2 items-stretch"
            ref={formRef}
        >
            <Input
                type="text"
                value={text}
                handleChange={(e) => onTextChange(e.target.value)}
                placeholder="Новый заголовок задачи..."
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                className="border-2 border-blue-600 rounded-lg text-sm text-gray-700 dark:text-gray-300"
            />

            <div className="flex flex-col sm:flex-row gap-2 w-full">
                <Input
                    type="datetime-local"
                    value={deadline}
                    handleChange={(e) => onDeadlineChange(e.target.value)}
                    className="border-2 border-blue-600 sm:flex-1 rounded-lg text-sm text-gray-700 dark:text-gray-300"
                />

                <SaveButton
                    onClick={handleSave}
                />
            </div>
        </div>
    )
}
