import React, { lazy, Suspense, useState } from 'react'
import { ToggleTheme } from './components/ToggleTheme';
import { getInitialTheme } from './helpers/getInitialTheme';
import { toggleTheme } from './helpers/toggleTheme';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { useTodoManagement } from './hooks/useTodoManagement';
import { DeleteCompletedButton } from './components/DeleteCompletedButton';
import { Loader } from './components/Loader';

// Ленивая загрузка
const TodoContent = lazy(() => import("./components/TodoContent"));

export const App = () => {
  const [theme, setTheme] = useState(getInitialTheme());

  const {
    todos,
    onCreate,
    onDelete,
    onDeleteCompleted,
    onUpdate,
    onReorder,
    onToggleComplete,
    onToggleStar,
    deletingId,
    setDeletingId,
    isDeletingCompleted,
    setIsDeletingCompleted,
    hasCompletedTodos,
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
      <Suspense fallback={<Loader />}>
        <TodoContent
          todos={todos}
          onCreate={onCreate}
          setDeletingId={setDeletingId}
          onToggleComplete={onToggleComplete}
          handleUpdate={onUpdate}
          onReorder={onReorder}
          onToggleStar={onToggleStar}
        />
      </Suspense>

      {/* Модальное окно для удаления задачи */}
      <DeleteConfirmModal
        onCancel={() => setDeletingId(null)}
        onConfirm={() => onDelete(deletingId)}
        show={!!deletingId}
        message="Вы уверены, что хотите удалить эту задачу?"
      />

      {/* Модальное окно для удаления всех выполненных задач */}
      <DeleteConfirmModal
        onCancel={() => setIsDeletingCompleted(false)}
        onConfirm={onDeleteCompleted}
        show={!!isDeletingCompleted}
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
