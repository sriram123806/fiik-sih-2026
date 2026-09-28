import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import heroImg from '../assets/india-govt-hero.png';

export default function Login() {
  const [mode, setMode] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError('Enter your email/mobile and password to continue.');
      return;
    }
    setError('');
    login();
    navigate('/role-selection');
  }

  function handleSSO() {
    login();
    navigate('/role-selection');
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans relative overflow-hidden">
      <Header variant="public" showHomeLink />

      {/* Background Vector Artwork Watermark (Image 2 reference) */}
      <div className="absolute inset-0 top-24 pointer-events-none opacity-25 flex items-center justify-center">
        <img
          src={heroImg}
          alt="Government Architecture Watermark"
          className="w-full max-w-6xl h-auto object-contain filter saturate-150"
        />
      </div>

      <main className="flex-1 max-w-md mx-auto px-4 py-12 w-full flex items-center justify-center z-10">
        <div className="bg-white border border-gray-200/90 rounded-2xl shadow-2xl p-8 w-full">
          <h1 className="text-2xl font-black text-navy-950 text-center tracking-tight">Login to FIIK</h1>
          <p className="text-xs font-semibold text-gray-500 text-center mt-1">
            Access your role-based dashboard
          </p>

          {/* Mode Switch Tabs */}
          <div className="mt-6 flex border-b border-gray-200 text-xs font-extrabold">
            <button
              type="button"
              onClick={() => setMode('email')}
              className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
                mode === 'email'
                  ? 'border-b-2 border-fiik-orange text-fiik-orangeDark'
                  : 'text-gray-500 hover:text-navy-950'
              }`}
            >
              Email / Mobile
            </button>
            <button
              type="button"
              onClick={() => setMode('sso')}
              className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
                mode === 'sso'
                  ? 'border-b-2 border-fiik-orange text-fiik-orangeDark'
                  : 'text-gray-500 hover:text-navy-950'
              }`}
            >
              Government Login (SSO)
            </button>
          </div>

          {mode === 'email' ? (
            <form className="mt-6 space-y-4 text-xs" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="email" className="block font-bold text-navy-950 mb-1.5">
                  Enter your Email ID / Mobile Number
                </label>
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com / 9876543210"
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-xs focus-ring bg-white"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block font-bold text-navy-950">
                    Password
                  </label>
                  <button type="button" className="text-[11px] font-bold text-fiik-orange hover:underline">
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-xs focus-ring bg-white pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy-950 text-sm"
                    aria-label="Toggle Password Visibility"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {error && <p className="text-xs font-semibold text-red-600">{error}</p>}

              <button
                type="submit"
                className="w-full bg-fiik-orange hover:bg-fiik-orangeDark text-white font-black text-xs py-3 rounded-lg transition-all shadow-md focus-ring cursor-pointer"
              >
                Login
              </button>

              <p className="text-center text-[11px] text-gray-500 font-medium">
                Don&rsquo;t have an account? Contact your nodal department.
              </p>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold text-gray-400">
                  <span className="bg-white px-2">OR</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSSO}
                className="w-full bg-white border border-gray-300 hover:border-orange-300 hover:bg-orange-50/50 text-navy-950 font-bold py-2.5 rounded-lg text-xs transition-colors flex items-center justify-between px-4 cursor-pointer"
              >
                <span>Login with Government SSO &mdash; Parichay / ePramaan</span>
                <span className="text-[9px] font-bold text-gray-500 bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded">
                  Demo / Prototype
                </span>
              </button>
            </form>
          ) : (
            <div className="mt-6 text-center text-xs space-y-4">
              <p className="text-gray-600 leading-relaxed font-medium">
                Secure role-based single sign-on via Parichay or ePramaan Government Authentication Gateway.
              </p>
              <button
                type="button"
                onClick={handleSSO}
                className="w-full bg-navy-950 hover:bg-black text-white font-black text-xs py-3 rounded-lg transition-all shadow-md focus-ring flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>🏛️ Login with Government SSO (Parichay / ePramaan)</span>
              </button>
              <p className="text-[11px] text-gray-400 font-semibold">
                Demo authentication: Single click logs into role selection.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
