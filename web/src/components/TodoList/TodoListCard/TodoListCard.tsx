// src/components/TodoListCard/TodoListCard.js
import { Link, routes } from '@redwoodjs/router'

import { truncate, timeTag } from 'src/lib/formatters'

const TodoListCard = ({ todoList, onDeleteClick }) => {
  const TodoListDetails = ({ todoList }) => {
    return (
      <div className="mt-2 text-sm text-gray-600">
        <p>Number of items: {todoList.items.length}</p>
        <p>Created at: {timeTag(todoList.createdAt)}</p>
        <p>Created by: {truncate(todoList.user.email)}</p>
      </div>
    )
  }

  const DeleteButton = (onDeleteClick) => {
    console.log(onDeleteClick)
    if (onDeleteClick.onDeleteClick) {
      return (
        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            className="text-red-500 hover:text-red-800"
            onClick={() => onDeleteClick(todoList.id)}
          >
            Delete
          </button>
        </div>
      )
    } else {
      return null
    }
  }
  return (
    <div className="overflow-hidden rounded-lg bg-gray-50 shadow-lg transition-shadow duration-200 hover:shadow-xl">
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 transition-colors duration-200 hover:text-teal-400">
          <Link to={routes.todoList({ id: todoList.id })}>
            {truncate(todoList.title)}
          </Link>
        </h3>
        <TodoListDetails todoList={todoList} />
        <DeleteButton onDeleteClick={onDeleteClick} />
      </div>
    </div>
  )
}

export default TodoListCard
