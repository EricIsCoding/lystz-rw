import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

const HomePage = () => {
  const { isAuthenticated, logOut } = useAuth()
  return (
    <div className="container mx-auto p-4">
      {isAuthenticated ? (
        <div>
          <header className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-gray-800">Lystz</h1>
            <div className="flex gap-4">
              <Link
                className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition duration-300"
                to={routes.todoLists()}
              >
                Todo Lists
              </Link>
              <Link
                className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition duration-300"
                to={routes.todoItems()}
              >
                Todo Items
              </Link>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition duration-300"
                onClick={logOut}
              >
                Logout
              </button>
            </div>
          </header>
          <p className="text-center text-lg mb-4">
            This is a simple landing page for the Lystz App. Please navigate
            using the links above.
          </p>
          <p className="text-center text-lg mb-4">You are logged in!</p>
          <div className="text-center"></div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg mb-4">
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
