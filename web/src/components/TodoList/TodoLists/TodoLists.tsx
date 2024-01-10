import type { FindTodoLists } from 'types/graphql'

import TodoListCard from '../TodoListCard/TodoListCard'

const TodoListsList = ({ todoLists }: FindTodoLists) => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {todoLists.map((todoList) => (
          <TodoListCard todoList={todoList} key={todoList.id} />
        ))}
      </div>
    </div>
  )
}

export default TodoListsList
