import { Link, routes } from '@redwoodjs/router'

import StoresCell from 'src/components/Store/StoresCell'
import TodoListsCell from 'src/components/TodoList/TodoListsCell'

const HomePage = () => {
  return (
    <main className="m-1 grid gap-5 py-6">
      <div className="mx-auto max-w-7xl rounded-lg bg-white p-4 shadow sm:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800 hover:text-teal-600">
          <Link to={routes.stores()}>Your Stores!</Link>
        </h2>
        <StoresCell />
      </div>
      <div className="mx-auto max-w-7xl rounded-lg bg-white p-4 shadow sm:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800 hover:text-teal-600">
          <Link to={routes.todoLists()}>Your Lists!</Link>
        </h2>
        <TodoListsCell limit={4} />
      </div>
    </main>
  )
}

export default HomePage
