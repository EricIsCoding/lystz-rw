import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type LayoutProps = {
  title: string
  titleTo: string
  buttonLabel: string
  buttonTo: string
  children: React.ReactNode
}

const ScaffoldLayout = ({
  title,
  titleTo,
  buttonLabel,
  buttonTo,
  children,
}: LayoutProps) => {
  const realTitle = (title: string) => {
    if (title === 'TodoLists') {
      return 'Lists'
    } else if (title === 'TodoList') {
      return 'List'
    } else if (title === 'TodoItem') {
      return 'Item'
    } else if (title === 'TodoItems') {
      return 'Items'
    } else {
      return title
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="bg-white py-6 shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            <Link
              to={routes[titleTo]()}
              className="text-black hover:text-teal-400"
            >
              {realTitle(title)}
            </Link>
          </h1>
          <div className="flex gap-4">
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
          </div>
        </div>
      </header>
      <main className="py-6">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  )
}

export default ScaffoldLayout
