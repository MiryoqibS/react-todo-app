import React from 'react'

export const Input = ({ value, handleChange, className = "", ...props }) => {
    return (
        <input
            value={value}
            onChange={handleChange}
            {...props}
            className={`w-full p-3 text-gray-700 
            dark:bg-page-dark dark:text-text-dark outline-none 
            placeholder-gray-400 ${className}`}
        />
    );
};