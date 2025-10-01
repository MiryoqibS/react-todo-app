import React, { useEffect, useState } from 'react'
import { Input } from './UI/Input';
import { DeadlineBlock } from './DeadlineBlock';
import { AddButton } from './UI/AddButton';
import { isValidTodo } from '../utils/validateTodo';
import { Button } from "./UI/Button";
import { MicIcon } from 'lucide-react';
import { SoundWaves } from './UI/SoundWaves';

export const AddTodo = ({ onCreate }) => {
    const [text, setText] = useState("");
    const [deadline, setDeadline] = useState("");
    const [showDeadlineInput, setShowDeadlineInput] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);

    const startListening = () => {
        if (recognition) {
            recognition.start();
            setIsListening(true);
        };
    };

    const stopListening = () => {
        if (recognition) {
            recognition.stop();
            setIsListening(false);
        };
    };

    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    const handleAdd = () => {
        const isValid = isValidTodo(text);
        if (!isValid) return;
        onCreate(text, deadline);
        setDeadline("");
        setText("");
        setShowDeadlineInput(false);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const SpeechRecognition =
                window.SpeechRecognition || window.webkitSpeechRecognition;

            if (SpeechRecognition) {
                const recognitionInstance = new SpeechRecognition();
                recognitionInstance.lang = "ru-RU";
                recognitionInstance.continuous = true;
                recognitionInstance.interimResults = false;
                recognitionInstance.maxAlternatives = 1;

                // Распознавание текста
                recognitionInstance.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    setText((prev) => prev + "" + transcript);
                };

                // Ошибка при записи 
                recognitionInstance.onerror = (event) => {
                    console.error(`Ошибка распознования: ${event.error}`);
                    setIsListening(false);
                };

                // Окончание записи
                recognitionInstance.onend = () => {
                    setIsListening(false);
                };

                setRecognition(recognitionInstance);
            } else {
                console.warn("SpeechRecognition не поддерживается в этом браузере");
            };
        };
    }, []);

    return (
        <div>
            <div className="
        flex items-stretch bg-white rounded-lg shadow-sm 
        overflow-hidden 
        border border-gray-100 
        focus-within:ring-2 focus-within:ring-blue-500
        ">
                <Input
                    value={text}
                    handleChange={(e) => setText(e.target.value)}
                    type="text"
                    placeholder="Введите названые задачи"
                />
                <button
                    onClick={toggleListening}
                    className={`p-0 flex items-center justify-center w-14 px-2 
                    transition-colors cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-600
                    ${isListening ? "animate-pulse" : ""}
                    `}>
                    {isListening ? <SoundWaves /> : <MicIcon size={20} />}
                </button>
                <AddButton onClick={handleAdd} />
            </div>

            {/* Блок с выбором дедлайна */}
            <DeadlineBlock
                show={showDeadlineInput}
                deadline={deadline}
                setDeadline={setDeadline}
                setShow={setShowDeadlineInput}
            />
        </div>
    )
};
