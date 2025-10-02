import React from 'react';
import { NetworkProvider } from "../providers/NetworkProvider";
import { Notification } from './UI/Notification';
import { MoonIcon, SunIcon } from 'lucide-react';

export const ToggleTheme = ({ theme, toggleTheme }) => {
    return (
        <NetworkProvider>
            <div className="mb-6">
                <div className="flex items-center">
                    <button
                        onClick={toggleTheme}
                        className="relative cursor-pointer flex flex-col gap-2 items-center"
                    >
                        <div className="w-14 h-7 rounded-full shadow-inner transition-colors duration-300 bg-gray-300 dark:bg-btn-dark relative">
                            <div className="
                                flex items-center justify-center
                                absolute top-0.5 left-0.5 
                                w-6 h-6 rounded-full bg-white shadow-md 
                                transform transition-transform duration-300 
                                translate-x-0 dark:translate-x-7
                            ">
                                {theme === "light" ? <SunIcon className="w-4 h-4 text-yellow-500" /> : <MoonIcon className="w-4 h-4 text-gray-700" />}
                            </div>
                        </div>

                    </button>
                </div>

            </div>

            <Notification />
        </NetworkProvider>
    )
}
