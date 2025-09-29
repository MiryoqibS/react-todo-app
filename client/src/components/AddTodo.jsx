import React, { useState } from 'react'
import { Input } from './UI/Input';
import { DeadlineBlock } from './DeadlineBlock';
import { AddButton } from './UI/AddButton';
import { isValidTodo } from '../utils/validateTodo';

export const AddTodo = ({ onAdd }) => {
    const [text, setText] = useState("");
    const [deadline, setDeadline] = useState("");
    const [showDeadlineInput, setShowDeadlineInput] = useState(false);

    const handleAdd = () => {
        const isValid = isValidTodo(text);
        if (!isValid) return;
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
                <AddButton onClick={handleAdd} />
            </div>

            {/* Блок с выбором дедлайна */}
            <DeadlineBlock
                show={showDeadlineInput}
                deadline={deadline}
                setDeadline={setDeadline}
                setShow={setShowDeadlineInput}
            />
        </div>
    )
};
