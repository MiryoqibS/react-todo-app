import React from 'react'

export const Loader = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="w-10 h-10 aspect-square rounded-full border-t-2 border-r-2 border-blue-600 dark:border-blue-500 bg-transparent animate-spin"></div>
        </div>
    )
};