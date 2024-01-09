import { useState } from 'react'
import { useEffect } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const WELCOME_MESSAGE = 'Welcome back!'
const REDIRECT = routes.home()

const LoginPage = ({ type }) => {
  const {
    isAuthenticated,
    client: webAuthn,
    loading,
    logIn,
    reauthenticate,
  } = useAuth()
  const [shouldShowWebAuthn, setShouldShowWebAuthn] = useState(false)
  const [showWebAuthn, setShowWebAuthn] = useState(
    webAuthn.isEnabled() && type !== 'password'
  )

  // should redirect right after login or wait to show the webAuthn prompts?
  useEffect(() => {
    if (isAuthenticated && (!shouldShowWebAuthn || webAuthn.isEnabled())) {
      navigate(REDIRECT)
    }
  }, [isAuthenticated, shouldShowWebAuthn, webAuthn])

  // if WebAuthn is enabled, show the prompt as soon as the page loads
  useEffect(() => {
    if (!loading && !isAuthenticated && showWebAuthn) {
      onAuthenticate()
    }
  }, [loading, isAuthenticated, showWebAuthn])

  const onSubmit = async (data) => {
    const webAuthnSupported = await webAuthn.isSupported()

    if (webAuthnSupported) {
      setShouldShowWebAuthn(true)
    }
    const response = await logIn({
      username: data.usernameEmail,
      password: data.password,
    })

    if (response.message) {
      // auth details good, but user not logged in
      toast(response.message)
    } else if (response.error) {
      // error while authenticating
      toast.error(response.error)
    } else {
      // user logged in
      if (webAuthnSupported) {
        setShowWebAuthn(true)
      } else {
        toast.success(WELCOME_MESSAGE)
      }
    }
  }

  const onAuthenticate = async () => {
    try {
      await webAuthn.authenticate()
      await reauthenticate()
      toast.success(WELCOME_MESSAGE)
      navigate(REDIRECT)
    } catch (e) {
      if (e.name === 'WebAuthnDeviceNotFoundError') {
        toast.error(
          'Device not found, log in with Username (Email)/Password to continue'
        )
        setShowWebAuthn(false)
      } else {
        toast.error(e.message)
      }
    }
  }

  const onRegister = async () => {
    try {
      await webAuthn.register()
      toast.success(WELCOME_MESSAGE)
      navigate(REDIRECT)
    } catch (e) {
      toast.error(e.message)
    }
  }

  const onSkip = () => {
    toast.success(WELCOME_MESSAGE)
    setShouldShowWebAuthn(false)
  }

  const AuthWebAuthnPrompt = () => {
    return (
      <div className="rw-webauthn-wrapper my-4 rounded-lg bg-white px-4 py-6 shadow sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          WebAuthn Login Enabled
        </h2>
        <p className="mt-2 text-gray-600">
          Log in with your fingerprint, face or PIN
        </p>
        <div className="rw-button-group mt-4">
          <button
            className="rw-button rounded-md bg-teal-600 px-4 py-2 text-white hover:bg-teal-900"
            onClick={onAuthenticate}
          >
            Open Authenticator
          </button>
        </div>
      </div>
    )
  }

  const RegisterWebAuthnPrompt = () => (
    <div className="rw-webauthn-wrapper my-4 rounded-lg bg-white px-4 py-6 shadow sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-gray-800">
        No more Passwords!
      </h2>
      <p className="mt-2 text-gray-600">
        Depending on your device, you can log in with your fingerprint, face, or
        PIN next time.
      </p>
      <div className="rw-button-group mt-4">
        <button
          className="rw-button mr-2 rounded-md bg-teal-600 px-4 py-2 text-white hover:bg-teal-900"
          onClick={onRegister}
        >
          Turn On
        </button>
        <button
          className="rw-button rounded-md border border-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-100"
          onClick={onSkip}
        >
          Skip for now
        </button>
      </div>
    </div>
  )

  const PasswordForm = () => (
    <Form
      onSubmit={onSubmit}
      className="bg-white px-3 py-4 shadow sm:px-4 lg:px-6"
    >
      <div className="mx-auto max-w-md">
        <Label
          name="usernameEmail"
          className="rw-label text-gray-800"
          errorClassName="rw-label rw-label-error text-red-500"
        >
          Username (Email)
        </Label>
        <TextField
          name="usernameEmail"
          className="rw-input w-full border-gray-300 focus:border-teal-400 focus:ring focus:ring-teal-200"
          errorClassName="rw-input rw-input-error border-red-500 focus:border-red-500 focus:ring focus:ring-red-200"
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

        <Label
          name="password"
          className="rw-label mt-2 text-gray-800"
          errorClassName="rw-label rw-label-error text-red-500"
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

        <div className="rw-forgot-link mt-2 text-right">
          <Link
            to={routes.forgotPassword()}
            className="text-sm text-teal-600 hover:text-teal-900"
          >
            Forgot Password?
          </Link>
        </div>

        <FieldError name="password" className="rw-field-error text-red-500" />

        <div className="rw-button-group mt-4">
          <Submit className="rw-button w-full rounded-md bg-teal-600 px-4 py-2 text-white hover:bg-teal-900">
            Login
          </Submit>
        </div>
      </div>
    </Form>
  )

  const formToRender = () => {
    if (showWebAuthn) {
      if (webAuthn.isEnabled()) {
        return <AuthWebAuthnPrompt />
      } else {
        return <RegisterWebAuthnPrompt />
      }
    } else {
      return <PasswordForm />
    }
  }

  const linkToRender = () => {
    if (showWebAuthn) {
      if (webAuthn.isEnabled()) {
        return (
          <div className="rw-login-link my-4 text-gray-800">
            <span>or login with </span>
            <a
              href="?type=password"
              className="rw-link text-teal-600 hover:text-teal-900"
            >
              username (email) and password
            </a>
          </div>
        )
      }
    } else {
      return (
        <div className="rw-login-link my-4 text-gray-800">
          <span>Don&apos;t have an account?</span>
          <Link
            to={routes.signup()}
            className="rw-link ml-1 text-teal-600 hover:text-teal-900"
          >
            Sign up!
          </Link>
        </div>
      )
    }
  }

  if (loading) {
    return null
  }

  return (
    <>
      <Metadata title="Login" />

      <main className="min-h-screen overflow-x-hidden bg-gray-100 py-6">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-4 flex w-full items-center justify-between bg-white px-4 py-6 shadow-md sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-800">Login</h2>
          </div>
          <div className="rw-scaffold rw-login-container rounded-lg bg-white px-4 py-6 shadow-md">
            <div className="rw-segment">
              <div className="rw-segment-main">
                <div className="rw-form-wrapper">{formToRender()}</div>
              </div>
            </div>
            <div className="mt-4">{linkToRender()}</div>
          </div>
        </div>
      </main>
    </>
  )
}

export default LoginPage
