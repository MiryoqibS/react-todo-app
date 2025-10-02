import React from 'react';
import { Button } from './UI/Button';
import { CalendarArrowDownIcon, CalendarArrowUpIcon, CalendarXIcon, CircleCheckIcon, CircleIcon, ListFilterIcon, ScrollTextIcon, StarIcon } from 'lucide-react';

export const TodoFilter = ({ filter, setFilter }) => {
  const buttonClasses = (activeFilter) => {
    return `${activeFilter === filter ?
      "bg-blue-600 text-white hover:bg-blue-700"
      :
      "bg-blue-200 text-gray-800 hover:bg-blue-400 hover:text-white dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-900"
      }`
  }

  return (
    <div className="w-full flex h-10 justify-center gap-2">
      <Button
        className={`${buttonClasses("all")}`}
        handleClick={() => setFilter("all")}
      >
        <ListFilterIcon size={16} />
      </Button>

      <Button
        className={`${buttonClasses("completed")}`}
        handleClick={() => setFilter("completed")}
      >
        <CircleCheckIcon size={16} />
      </Button>

      <Button
        className={`${buttonClasses("active")}`}
        handleClick={() => setFilter("active")}
      >
        <CircleIcon size={16} />
      </Button>

      <Button
        className={`${buttonClasses("newest")}`}
        handleClick={() => setFilter("newest")}
      >
        <CalendarArrowUpIcon size={16} />
      </Button>

      <Button
        className={`${buttonClasses("oldest")}`}
        handleClick={() => setFilter("oldest")}
      >
        <CalendarArrowDownIcon size={16} />
      </Button>

      <Button
        className={`${buttonClasses("overpast")}`}
        handleClick={() => setFilter("overpast")}
      >
        <CalendarXIcon size={16} />
      </Button>

      <Button
        className={`${buttonClasses("starred")}`}
        handleClick={() => setFilter("starred")}
      >
        <StarIcon size={16} />
      </Button>

      <Button
        className={`${buttonClasses("hasDescription")}`}
        handleClick={() => setFilter("hasDescription")}
      >
        <ScrollTextIcon size={16} />
      </Button>
    </div>
  )
};
