import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

const HomePage = () => {
  const { isAuthenticated, logOut } = useAuth()
  return (
    <>
      {isAuthenticated ? (
        <div>
          <header className="rw-header">
            <h1 className="rw-heading rw-heading-primary">Lystz</h1>
            <Link
              className={'rw-button rw-button-green'}
              to={routes.todoLists()}
            >
              <div className="rw-button-icon"> {'->'} </div> Todo Lists!
            </Link>
            <Link
              className={'rw-button rw-button-green'}
              to={routes.todoItems()}
            >
              <div className="rw-button-icon"> {'->'} </div> Todo Items
            </Link>
          </header>
          <p>
            This is a simple landing page for the Lystz App. Please navigate
            using links above.
          </p>
          {/* Add navigation or call-to-action buttons */}
          <p>You are logged in!</p>
          <button className={'rw-button'} onClick={logOut}>Logout</button>
          {/* Add any additional sections or content */}
        </div>
      ) : (
        <div>
          <p>
            You are NOT Logged in! You Can do that by clicking
            <Link to={routes.login()}>HERE</Link>!
          </p>
        </div>
      )}
    </>
  )
}

export default HomePage
