import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [mode, setMode] = useState('email')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password) {
      setError('Enter your email/mobile and password to continue.')
      return
    }
    setError('')
    login()
    navigate('/role-selection')
  }

  function handleSSO() {
    // Prototype only — no real Parichay/ePramaan integration.
    login()
    navigate('/role-selection')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header variant="public" showHomeLink />
      <div className="max-w-md mx-auto px-4 py-14">
        <div className="bg-white border border-gray-200 rounded-xl shadow-card p-8">
          <h1 className="text-xl font-bold text-navy-950 text-center">Login to FIIK</h1>
          <p className="text-sm text-gray-500 text-center mt-1">Access your role-based dashboard</p>

          <div className="mt-6 grid grid-cols-2 rounded-md border border-gray-200 overflow-hidden text-sm font-medium">
            <button
              type="button"
              onClick={() => setMode('email')}
              className={`py-2 focus-ring ${mode === 'email' ? 'bg-orange-50 text-fiik-orangeDark border-b-2 border-fiik-orange' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              Email / Mobile
            </button>
            <button
              type="button"
              onClick={() => setMode('sso')}
              className={`py-2 focus-ring ${mode === 'sso' ? 'bg-orange-50 text-fiik-orangeDark border-b-2 border-fiik-orange' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              Government Login (SSO)
            </button>
          </div>

          {mode === 'email' ? (
            <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter your Email ID / Mobile Number
                </label>
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com / 9876543210"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus-ring focus:border-fiik-orange"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <button type="button" className="text-xs text-fiik-orange hover:underline focus-ring rounded">
                    Forgot Password?
                  </button>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus-ring focus:border-fiik-orange"
                />
              </div>
              {error && <p className="text-xs text-red-600">{error}</p>}
              <button
                type="submit"
                className="w-full bg-fiik-orange hover:bg-fiik-orangeDark text-white font-semibold py-2.5 rounded-md transition-colors focus-ring"
              >
                Login
              </button>
              <p className="text-center text-xs text-gray-500">
                Don't have an account? Contact your nodal department.
              </p>
            </form>
          ) : (
            <div className="mt-6 space-y-4">
              <p className="text-xs text-gray-500 text-center">
                Government SSO is shown here as a prototype interaction and is not connected to a
                live Parichay/ePramaan service.
              </p>
              <button
                onClick={handleSSO}
                className="w-full border border-gray-300 hover:border-navy-900 text-navy-950 font-semibold py-2.5 rounded-md transition-colors focus-ring flex items-center justify-center gap-2"
              >
                🏛️ Login with Government SSO
                <span className="text-xs text-gray-400">(Parichay / ePramaan)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
