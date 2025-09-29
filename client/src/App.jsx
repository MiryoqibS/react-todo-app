import React, { useState } from 'react'
import { ToggleTheme } from './components/ToggleTheme';
import { getInitialTheme } from './helpers/getInitialTheme';
import { toggleTheme } from './helpers/toggleTheme';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { useTodoManagement } from './hooks/useTodoManagement';
import { DeleteCompletedButton } from './components/DeleteCompletedButton';
import { TodoContent } from './components/TodoContent';

export const App = () => {
  const [theme, setTheme] = useState(getInitialTheme());

  const {
    todos,
    deletingId,
    isDeletingCompleted,
    hasCompletedTodos,
    setDeletingId,
    onAdd,
    setIsDeletingCompleted,
    handleDelete,
    confirmDeleteCompleted,
    onToggleComplete,
    handleUpdate,
    onReorder,
  } = useTodoManagement();

  return (
    <div
      data-theme={theme}
      className="flex flex-col min-h-screen justify-center items-center bg-page-light dark:bg-page-dark p-6"
    >
      {/* переключатель темы */}
      <ToggleTheme
        theme={theme}
        toggleTheme={() => toggleTheme(setTheme)}
      />

      {/* Контент */}
      <TodoContent
        todos={todos}
        onAdd={onAdd}
        setDeletingId={setDeletingId}
        onToggleComplete={onToggleComplete}
        handleUpdate={handleUpdate}
        onReorder={onReorder}
      />

      {/* Модальное окно для удаления задачи */}
      <DeleteConfirmModal
        onCancel={() => setDeletingId(null)}
        onConfirm={() => handleDelete(deletingId)}
        show={deletingId}
        message="Вы уверены, что хотите удалить эту задачу?"
      />

      {/* Модальное окно для удаления всех выполненных задач */}
      <DeleteConfirmModal
        onCancel={() => setIsDeletingCompleted(false)}
        onConfirm={confirmDeleteCompleted}
        show={isDeletingCompleted}
        message={`Вы уверены, что хотите удалить все выполннение задачи (${todos.filter(todo => todo.isCompleted).length})?`}
      />

      {/* Кнопка удаления всех выполненных задач */}
      <DeleteCompletedButton
        handleDeleteCompleted={setIsDeletingCompleted}
        hasCompletedTodos={hasCompletedTodos}
      />
    </div>
  )
};
