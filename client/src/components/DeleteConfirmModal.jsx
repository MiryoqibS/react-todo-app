import React from 'react'
import { Button } from './UI/Button'

export const DeleteConfirmModal = ({ show, onCancel, onConfirm, message }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0">
            <div className="absolute inset-0 bg-black/50 z-4 backdrop-blur-xs"></div>
            <div className="relative flex h-full justify-center items-center p-4 z-5">
                <div className="p-6 rounded-lg shadow-xl max-w-md w-full 
                bg-white text-gray-800
                dark:bg-gray-800 dark:text-white
                ">
                    <h3 className="text-xl font-semibold mb-4">Подтверждения удаления</h3>
                    <p className="mb-6">{message}</p>
                    <div className="flex justify-end gap-3">
                        <Button
                            handleClick={onCancel}
                            className="
                            bg-gray-200 hover:bg-gray-300 text-gray-800
                            dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-white"
                        >
                            Отмена
                        </Button>
                        <Button
                            handleClick={onConfirm}
                            className="bg-red-500 hover:bg-red-600 text-white">
                            Удалить
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
