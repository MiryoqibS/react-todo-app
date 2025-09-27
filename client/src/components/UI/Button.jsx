import React from 'react'

export const Button = ({ children, handleClick = () => { }, className = "" }) => {
    return (
        <button
            onClick={handleClick}
            className={`
                flex items-center justify-center text-center 
                px-4 py-2 rounded text-xs font-medium cursor-pointer 
                transition-colors duration-300 shadow-lg 
                ${className}`}
        >
            {children}
        </button>
    )
}
