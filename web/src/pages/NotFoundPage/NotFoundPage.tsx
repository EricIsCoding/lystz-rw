import { Link, routes } from '@redwoodjs/router'

export default () => (
  <div className="flex h-screen flex-col items-center justify-center bg-blue-100">
    <h1 className="text-6xl font-bold text-blue-600">404</h1>
    <p className="mt-2 text-2xl text-blue-800">Oops! Page not found.</p>
    <Link
      to={routes.home()}
      className="mt-5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
    >
      Go Home
    </Link>
  </div>
)
