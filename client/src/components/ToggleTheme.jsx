import React from 'react'

export const ToggleTheme = ({ theme, toggleTheme }) => {
    return (
        <div className="mb-6">
            <div className="flex items-center">
                <button
                    onClick={toggleTheme}
                    className="relative cursor-pointer flex flex-col gap-2 items-center"
                >
                    <div className="w-14 h-7 rounded-full shadow-inner transition-colors duration-300 bg-gray-300 dark:bg-btn-dark">
                        <div className="
              absolute top-0.5 left-0.5 
              w-6 h-6 rounded-full bg-white shadow-md 
              transform transition-transform duration-300 
              translate-x-0 dark:translate-x-7"/>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-xs">{theme === "light" ? "Светлая" : "Тёмная"}</span>
                </button>
            </div>
        </div>
    )
}
