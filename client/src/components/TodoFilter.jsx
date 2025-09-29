import React from 'react'
import { Button } from './UI/Button'

export const TodoFilter = ({ filter, setFilter }) => {
  const buttonClasses = (activeFilter) => {
    return `${activeFilter === filter ?
      "bg-blue-600 text-white hover:bg-blue-700"
      :
      "bg-blue-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-900"
      }`
  }

  return (
    <div className="w-full flex items-center gap-2">
      <Button
        className={`${buttonClasses("all")}`}
        handleClick={() => setFilter("all")}
      >Все</Button>
      <Button
        className={`${buttonClasses("completed")}`}
        handleClick={() => setFilter("completed")}
      >Выполненные</Button>
      <Button
        className={`${buttonClasses("active")}`}
        handleClick={() => setFilter("active")}
      >Активные</Button>
    </div>
  )
};
