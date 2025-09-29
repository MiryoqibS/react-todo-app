import React from 'react';
import { PlusIcon } from 'lucide-react';

export const AddButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center p-3 cursor-pointer
                        bg-btn-light hover:bg-btn-light-hover text-text-light
                        dark:bg-btn-dark dark:hover:bg-btn-dark-hover dark:text-text-dark
                        "
        >
            <PlusIcon />
        </button>
    )
};