import React from 'react';
import { CheckIcon } from 'lucide-react';

export const SaveButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center
                                transition-colors cursor-pointer rounded duration-500
                                bg-white text-green-600 hover:text-green-800
                                border-2 border-green-600 hover:border-green-800 hover:bg-green-100
                                px-2 py-1"
        >
            <CheckIcon />
            Сохранить
        </button>
    )
};
