import { Link, routes } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'


import TodoListCard from 'src/components/TodoList/TodoListCard/TodoListCard'

import { QUERY as GET_TODO_LISTS_QUERY } from '../../components/TodoList/TodoListsCell/TodoListsCell'
const HomePage = () => {
  const { data: todoListsData } = useQuery(GET_TODO_LISTS_QUERY)

  return (
    <main className="m-1 py-6">
      <div className="mx-auto max-w-7xl rounded-lg bg-white p-4 shadow sm:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800 hover:text-teal-600">
          <Link to={routes.todoLists()}>Your Lists!</Link>
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {todoListsData?.todoLists.slice(-4).map((todoList) => (
            <TodoListCard todoList={todoList} key={todoList.id} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default HomePage
