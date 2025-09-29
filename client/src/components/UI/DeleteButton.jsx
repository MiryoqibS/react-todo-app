import React from 'react';
import { TrashIcon } from 'lucide-react';

export const DeleteButton = ({ onClick, className = "" }) => {
    return (
        <button
            onClick={onClick}
            className={`
                ${className}
                flex items-center justify-center
                opacity-0 group-hover:opacity-100 cursor-pointer
                hover:text-red-600 transition-all duration-300 
                dark:text-gray-200`
            }
        >
            <TrashIcon size={16} />
        </button>
    )
};
