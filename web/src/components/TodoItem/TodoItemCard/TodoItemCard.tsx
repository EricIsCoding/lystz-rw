// src/components/TodoItemCard.js
import { Link, routes } from '@redwoodjs/router'

import { timeTag, truncate } from 'src/lib/formatters'

const TodoItemCard = ({ todoItem }) => {
  return (
    <div
      key={todoItem.id}
      className="overflow-hidden rounded-lg bg-white shadow"
    >
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 hover:text-teal-900">
          <Link to={routes.todoItem({ id: todoItem.id })}>
            {truncate(todoItem.text)}
          </Link>
        </h3>
        <p className="text-sm text-gray-600">
          Is done: {todoItem.isDone.toString()}
        </p>
        <p className="text-sm text-gray-600">
          Created at: {timeTag(todoItem.createdAt)}
        </p>
        <p className="text-sm text-gray-600">
          Todo list: {todoItem.todoList.title}
        </p>
      </div>
    </div>
  )
}

export default TodoItemCard
