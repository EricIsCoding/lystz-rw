import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

const HomePage = () => {
  const { isAuthenticated, logOut } = useAuth()
  return (
    <>
      {isAuthenticated ? (
        <div>
          <h1>Welcome to My App!</h1>
          <p>This is a simple landing page for the RedwoodJS App.</p>
          {/* Add navigation or call-to-action buttons */}
          <p>You are logged in!</p>
          <button onClick={logOut}>Logout</button>
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
