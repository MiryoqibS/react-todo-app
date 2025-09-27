import React, { useEffect, useState } from 'react'
import { TodoList } from './components/TodoList';
import { AddTodo } from './components/AddTodo';
import { ToggleTheme } from './components/ToggleTheme';
import { getInitialTheme } from './helpers/getInitialTheme';
import { toggleTheme } from './helpers/toggleTheme';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { Button } from './components/UI/Button';

const LOCAL_STORAGE_KEY = "todos";
const API_URL = "http://localhost:8080/api";

export const App = () => {
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState(getInitialTheme());
  const [deletingId, setDeletingId] = useState(null);
  const [isDeletingCompleted, setIsDeletingCompleted] = useState(false);

  // == Получаем задачи ==
  useEffect(() => {
    const loadInitialData = async () => {
      const response = await fetch(`${API_URL}/todos`);
      const data = await response.json();
      const savedTodos = data.todos;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedTodos));
      setTodos(savedTodos);
    };

    loadInitialData();
  }, []);

  // == Добавление задачи ==
  const onAdd = async (text, deadline) => {
    const newTodo = {
      text,
      deadline: deadline || null,
    };

    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      const data = await response.json();
      if (!response.ok) throw new Error("ошибка при создании задачи");

      const updatedTodos = [...todos, data.todo]
      setTodos(updatedTodos);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
    } catch (error) {
      console.log(`Произошла ошибка при добавлении задачи: ${error.message}`);
    }
  };

  // == Удаление задачи ==
  const handleDelete = async (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
    setDeletingId(null);

    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("ошибка удалении задачи");
    } catch (error) {
      console.log(`Ошибка при удалении задачи: ${error.message}`);
    };
  };

  // == Проверка есть ли выполнение задачи ==
  const hasCompletedTodos = todos.some((todo) => todo.isCompleted);

  // == Подтверждения на удаление всех выполненных задач ==
  const confirmDeleteCompleted = async () => {
    const originalTodos = [...todos];
    const completedIds = originalTodos
      .filter((todo) => todo.isCompleted)
      .map(todo => todo.id);

    setTodos(originalTodos.filter((todo) => !todo.isCompleted));

    const failedIds = [];

    for (const id of completedIds) {
      try {
        const response = await fetch(`${API_URL}/todos/${id}`, {
          method: "DELETE"
        });
        if (!response.ok) throw new Error("ошибка удалении задачи");
      } catch (error) {
        console.log(`Ошибка при удалении задачи: ${error.message}`);
        failedIds.push(id);
      };
    }

    if (failedIds.length > 0) {
      setTodos(
        originalTodos.filter((todo) => !todo.isCompleted || failedIds.includes((todo.id)))
      );
    };

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    setIsDeletingCompleted(false);
  }

  // == Отметить задачу как выполненная ==
  const onToggleComplete = async (id) => {
    const updatedTodos = todos.map((todo) => todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo);
    setTodos(updatedTodos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
    try {
      const response = await fetch(`${API_URL}/todos/${id}/toggle`, {
        method: "PATCH"
      });
      if (!response.ok) throw new Error("ошибка при изменении задачи");
    } catch (error) {
      console.log(`Ошибка при изменении задачи: ${error.message}`);
    };
  }

  return (
    <div
      data-theme={theme}
      className="flex flex-col min-h-screen justify-center items-center bg-page-light dark:bg-page-dark p-6"
    >
      {/* Верхня часть */}
      <ToggleTheme
        theme={theme}
        toggleTheme={() => toggleTheme(setTheme)}
      />

      {/* Контент */}
      <div className="mx-auto flex flex-col gap-3">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-300 mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">My Todo App</span>
        </h1>
        <AddTodo onAdd={onAdd} />
        <TodoList
          todos={todos}
          onDelete={setDeletingId}
          onToggleComplete={onToggleComplete}
        />
      </div>
      {/* Модальное окно для удаления задачи */}
      {deletingId && (
        <DeleteConfirmModal
          onCancel={() => setDeletingId(null)}
          onConfirm={() => handleDelete(deletingId)}
          message="Вы уверены, что хотите удалить эту задачу?"
        />
      )}
      {/* Модальное окно для удаления всех выполненных задач */}
      {isDeletingCompleted && (
        <DeleteConfirmModal
          onCancel={() => setIsDeletingCompleted(false)}
          onConfirm={confirmDeleteCompleted}
          message={`Вы уверены, что хотите удалить все выполннение задачи (${todos.filter(todo => todo.isCompleted).length})?`}
        />
      )}
      {/* Кнопка удаления всех выполненных задач */}
      {hasCompletedTodos && (
        <Button
          handleClick={() => setIsDeletingCompleted(true)}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white"
        >
          Удалить выполненные
        </Button>
      )}
    </div>
  )
}
