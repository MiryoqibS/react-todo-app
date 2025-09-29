import React from 'react';
import { Button } from './UI/Button';

export const DeleteCompletedButton = ({ hasCompletedTodos, handleDeleteCompleted }) => {
    if (!hasCompletedTodos) return null;

    return (
        <>
            <Button
                handleClick={() => handleDeleteCompleted(true)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white"
            >
                Удалить выполненные
            </Button>
        </>
    )
}
