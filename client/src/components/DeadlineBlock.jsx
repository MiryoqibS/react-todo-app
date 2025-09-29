import React from 'react';
import { Input } from './UI/Input';

export const DeadlineBlock = ({
    show,
    setShow,
    deadline,
    setDeadline
}) => {
    return (
        <>
            {show && (
                <div className="flex items-center gap-2 mt-2">
                    <Input
                        type="datetime-local"
                        value={deadline}
                        handleChange={(e) => setDeadline(e.target.value)}
                        className="border border-blue-500 rounded"
                    />
                    <button
                        type="button"
                        onClick={() => {
                            setDeadline("");
                            setShow(false);
                        }}
                        className="p-2 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
                    >
                        отмена
                    </button>
                </div>
            )}
            <div className="mt-2">
                <button
                    type="button"
                    className="self-start text-xs text-blue-500 hover:text-blue-700 cursor-pointer transition-colors"
                    onClick={() => setShow(true)}
                >
                    + добавить дедлайн
                </button>
            </div>
        </>
    )
}
