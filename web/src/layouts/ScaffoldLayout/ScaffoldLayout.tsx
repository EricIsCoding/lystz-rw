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
    switch (title) {
      case 'TodoLists':
        return 'Your Lists'
      case 'TodoItems':
        return 'Your Items'
      default:
        return title
    }
  }

  const realButtonLabel = (buttonLabel: string) => {
    switch (buttonLabel) {
      case 'New TodoList':
        return 'New List'
      case 'New TodoItem':
        return 'New Item'
      default:
        return buttonLabel
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
            <span className="mr-2">+</span> {realButtonLabel(buttonLabel)}
          </Link>
        </div>
      </header>
      <main className="py-6">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  )
}

export default ScaffoldLayout
