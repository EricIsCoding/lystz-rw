import { Link, routes } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import TodoListCard from 'src/components/TodoList/TodoListCard/TodoListCard'

import { QUERY as GET_TODO_LISTS_QUERY } from '../../components/TodoList/TodoListsCell/TodoListsCell'
const HomePage = () => {
  const { isAuthenticated, logOut } = useAuth()
  const { data: todoListsData } = useQuery(GET_TODO_LISTS_QUERY)

  return (
    <div className="containerw w-full">
      {isAuthenticated ? (
        <div className="min-h-screen w-full bg-gray-100">
          <header className="mb-4 flex w-full items-center justify-between bg-white px-4 py-6 shadow-md sm:px-6 lg:px-8">
            <h1 className="p-2 text-4xl font-bold text-gray-800">Lystz</h1>
            <div className="flex gap-4">
              <Link
                className="inline-flex items-center rounded-lg border border-teal-600 bg-teal-600 px-4 py-2 text-sm font-medium text-white transition duration-300 hover:bg-teal-700"
                to={routes.todoItems()}
              >
                Items
              </Link>
              <button
                className="inline-flex items-center rounded-lg border border-red-600 bg-red-600 px-4 py-2 text-sm font-medium text-white transition duration-300 hover:bg-red-700"
                onClick={logOut}
              >
                Logout
              </button>
            </div>
          </header>
          <main className="w-full py-6">
            <div className="mx-auto max-w-7xl rounded-lg bg-white p-4 shadow sm:px-6 lg:px-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800 hover:text-teal-600">
                <Link to={routes.todoLists()}>Your Lists!</Link>
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {todoListsData?.todoLists.slice(-4).map((todoList) => (
                  <TodoListCard
                    todoList={todoList}
                    key={todoList.id}
                    onDeleteClick={false}
                  />
                ))}
              </div>
            </div>
          </main>
        </div>
      ) : (
        <div className="text-center">
          <p className="mb-4 text-lg">
            You are NOT Logged in! You can do that by clicking{' '}
            <Link
              className="text-blue-500 hover:text-blue-600"
              to={routes.login()}
            >
              HERE
            </Link>
            !
          </p>
        </div>
      )}
    </div>
  )
}

export default HomePage
