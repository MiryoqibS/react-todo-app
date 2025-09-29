import React from 'react';
import { CheckIcon } from 'lucide-react';

export const CheckboxButton = ({ onToggle, isCompleted }) => {
    return (
        <button
            onClick={onToggle}
            className={`
            flex items-center justify-center
            p-1 rounded-full border-2 w-8 h-8
            ${isCompleted ? "border-green-600 bg-green-600 text-white" : "border-gray-400  hover:border-gray-500"}
            transition-colors duration-300 cursor-pointer
            `}
        >
            {isCompleted ?
                <CheckIcon size={24} />
                :
                <></>
            }
        </button>
    )
};
