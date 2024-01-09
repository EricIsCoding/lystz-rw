import { useRef } from 'react'
import { useEffect } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  // focus on username (email) box on page load
  const usernameEmailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    usernameEmailRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    const response = await signUp({
      username: data.usernameEmail,
      password: data.password,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      // user is signed in automatically
      toast.success('Welcome!')
    }
  }

  return (
    <>
      <Metadata title="Signup" />

      <main className="min-h-screen bg-gray-100 py-6">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container mx-auto max-w-lg overflow-hidden rounded-lg shadow-lg">
          <div className="rw-segment bg-white p-6">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary text-2xl font-semibold text-gray-800">
                Signup
              </h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  {/* Username (Email) Field */}
                  <Label
                    name="usernameEmail"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Username (Email)
                  </Label>
                  <TextField
                    name="usernameEmail"
                    className="rw-input w-full border-gray-300 focus:border-teal-400 focus:ring focus:ring-teal-200"
                    errorClassName="rw-input rw-input-error border-red-500 focus:border-red-500 focus:ring focus:ring-red-200"
                    ref={usernameEmailRef}
                    validation={{
                      required: {
                        value: true,
                        message: 'Username (Email) is required',
                      },
                    }}
                  />
                  <FieldError
                    name="usernameEmail"
                    className="rw-field-error text-red-500"
                  />

                  {/* Password Field */}
                  <Label
                    name="password"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Password
                  </Label>
                  <PasswordField
                    name="password"
                    className="rw-input w-full border-gray-300 focus:border-teal-400 focus:ring focus:ring-teal-200"
                    errorClassName="rw-input rw-input-error border-red-500 focus:border-red-500 focus:ring focus:ring-red-200"
                    autoComplete="current-password"
                    validation={{
                      required: {
                        value: true,
                        message: 'Password is required',
                      },
                    }}
                  />
                  <FieldError
                    name="password"
                    className="rw-field-error text-red-500"
                  />

                  {/* Submit Button */}
                  <div className="rw-button-group mt-4">
                    <Submit className="rw-button w-full rounded-md bg-teal-600 px-4 py-2 text-white hover:bg-teal-900">
                      Sign Up
                    </Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="rw-login-link px-6 py-4 text-gray-800">
            <span>Already have an account?</span>{' '}
            <Link
              to={routes.login()}
              className="rw-link text-teal-600 hover:text-teal-900"
            >
              Log in!
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default SignupPage
