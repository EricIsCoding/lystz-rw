import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

type LayoutProps = {
  title: string
  titleTo?: string
  buttonLabel?: string
  buttonTo?: string
  children: React.ReactNode
}

const ScaffoldLayout = ({
  title,
  titleTo,
  buttonLabel,
  buttonTo,
  children,
}: LayoutProps) => {
  const { logOut } = useAuth()
  const NavButtons = () => {
    /* if home remove return a logout button if no retun the current buttons */
    if (title === 'Home Page') {
      return (
        <button
          className="inline-flex items-center rounded-lg border border-red-600 bg-red-600 px-4 py-2 text-sm font-medium text-white transition duration-300 hover:bg-red-700"
          onClick={logOut}
        >
          Logout
        </button>
      )
    } else {
      return (
        <>
          <Link
            to={routes.home()}
            className="inline-flex items-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-900"
          >
            Go Home!
          </Link>
          <Link
            to={routes[buttonTo]()}
            className="inline-flex items-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-900"
          >
            <span className="mr-2">+</span> {buttonLabel}
          </Link>
        </>
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="mb-4 flex w-full items-center justify-between bg-white px-4 py-6 shadow-md sm:px-6 lg:px-8">
        <h1 className="m:text-3xl p-2 text-2xl font-bold text-gray-800 lg:text-4xl">
          <Link
            to={routes[titleTo]()}
            className="text-gray-800 hover:text-teal-400"
          >
            {title}
          </Link>
        </h1>
        <div className="flex gap-4">
          <NavButtons />
        </div>
      </header>
      <main className="py-6">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  )
}

export default ScaffoldLayout
