import type { FindTodoItems } from 'types/graphql'

import TodoItemCard from '../TodoItemCard/TodoItemCard' // Import the missing component

const TodoItemsList = ({ todoItems }: FindTodoItems) => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {todoItems.map((todoItem) => (
          <TodoItemCard todoItem={todoItem} key={todoItem.id} /> // Add the missing component
        ))}
      </div>
    </div>
  )
}

export default TodoItemsList
