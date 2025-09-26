import React, { useState } from 'react'
import { Input } from './UI/Input';
import { PlusIcon } from 'lucide-react';

export const AddTodo = ({ onAdd }) => {
    const [text, setText] = useState("");
    const [deadline, setDeadline] = useState("");
    const [showDeadlineInput, setShowDeadlineInput] = useState(false);

    const handleAdd = () => {
        if (text.trim().length <= 5) return;
        onAdd(text, deadline);
        setDeadline("");
        setText("");
        setShowDeadlineInput(false);
    };

    return (
        <div>
            <div className="
        flex items-center bg-white rounded-lg shadow-sm 
        overflow-hidden 
        border border-gray-100 
        focus-within:ring-2 focus-within:ring-blue-500
        ">
                <Input
                    value={text}
                    handleChange={(e) => setText(e.target.value)}
                    type="text"
                    placeholder="Введите названые задачи"
                />
                <button
                    onClick={handleAdd}
                    className="flex items-center justify-center p-3 cursor-pointer
                bg-btn-light hover:bg-btn-light-hover text-text-light
                dark:bg-btn-dark dark:hover:bg-btn-dark-hover dark:text-text-dark
                "
                >
                    <PlusIcon />
                </button>
            </div>

            {showDeadlineInput && (
                <div className="flex items-center gap-2 mt-2">
                    <Input
                        type="datetime-local"
                        value={deadline}
                        handleChange={(e) => setDeadline(e.target.value)}
                        className="border border-blue-500 rounded"
                    />
                    <button
                        type="button"
                        onClick={() => {
                            setDeadline("");
                            setShowDeadlineInput(false);
                        }}
                        className="p-2 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
                    >
                        отмена
                    </button>
                </div>
            )}
            {!showDeadlineInput && (
                <div className="mt-2">
                    <button
                        type="button"
                        className="self-start text-xs text-blue-500 hover:text-blue-700 cursor-pointer transition-colors"
                        onClick={() => setShowDeadlineInput(true)}
                    >
                        + добавить дедлайн
                    </button>
                </div>
            )}
        </div>
    )
};
