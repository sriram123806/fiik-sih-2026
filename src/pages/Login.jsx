import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import govtBuildingImg from '../assets/govt-building.png';

export default function Login() {
  const [mode, setMode] = useState('email');
  const [email, setEmail] = useState('rahul.deshmukh@greengridtech.in');
  const [password, setPassword] = useState('demo1234');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your registered email/mobile and password.');
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
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col font-sans text-gray-900 antialiased">
      <Header variant="public" showHomeLink />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl w-full bg-white border-2 border-gray-200/90 rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-12">
          
          {/* Left Side: Dark Navy Government Identity Panel with Grand Building Image */}
          <div className="md:col-span-5 bg-[#071A3D] text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-black uppercase tracking-wider mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                SECURE ACCESS GATEWAY
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                FIIK National Pilot Portal
              </h2>
              <p className="text-xs text-gray-300 mt-2 font-medium leading-relaxed">
                Role-based authentication for Startups, Government Departments, Evaluators, and MSInS Nodal Authority.
              </p>
            </div>

            {/* Architecture Visual Frame */}
            <div className="my-6 relative rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-lg aspect-[16/10] bg-navy-950">
              <img
                src={govtBuildingImg}
                alt="Government Secretariat Building"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/90 via-transparent to-transparent flex items-end p-3.5">
                <span className="text-[10px] font-bold text-gray-200">
                  Govt. of Maharashtra &amp; National Registry
                </span>
              </div>
            </div>

            {/* Security Guarantee */}
            <div className="relative z-10 pt-4 border-t border-white/10 text-[11px] text-gray-300 flex items-center gap-2">
              <span className="text-emerald-400 font-bold text-sm">🔒</span>
              <span className="font-semibold">256-bit Encrypted Government Session Protocol</span>
            </div>
          </div>

          {/* Right Side: High-Contrast Clean Login Card */}
          <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white">
            
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-black text-[#071A3D] tracking-tight">Login to FIIK</h1>
              <p className="text-xs font-semibold text-gray-500 mt-1">
                Select your authentication method to access your role operating portal
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex border-b-2 border-gray-200 text-xs font-black mb-6">
              <button
                type="button"
                onClick={() => setMode('email')}
                className={`flex-1 py-3 text-center transition-all cursor-pointer ${
                  mode === 'email'
                    ? 'border-b-2 border-[#071A3D] text-[#071A3D] bg-navy-50/30'
                    : 'text-gray-500 hover:text-[#071A3D]'
                }`}
              >
                1. Email / Mobile Credentials
              </button>
              <button
                type="button"
                onClick={() => setMode('sso')}
                className={`flex-1 py-3 text-center transition-all cursor-pointer ${
                  mode === 'sso'
                    ? 'border-b-2 border-[#071A3D] text-[#071A3D] bg-navy-50/30'
                    : 'text-gray-500 hover:text-[#071A3D]'
                }`}
              >
                2. Government SSO (Parichay)
              </button>
            </div>

            {/* MODE 1: Email / Mobile Login Form */}
            {mode === 'email' ? (
              <form className="space-y-4 text-xs" onSubmit={handleSubmit} noValidate>
                <div>
                  <label htmlFor="email" className="block font-black text-[#071A3D] uppercase tracking-wider mb-1.5">
                    Official Email ID or Registered Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter official email (e.g. rahul@greengridtech.in)"
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:border-[#071A3D] focus:ring-2 focus:ring-[#071A3D]/20 bg-white"
                  />
                  <p className="text-[11px] text-gray-400 mt-1.5 font-medium">
                    Use your DPIIT or Government department registered email ID.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="password" className="block font-black text-[#071A3D] uppercase tracking-wider">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <button type="button" className="text-[11px] font-bold text-[#071A3D] hover:underline">
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
                      className="w-full border-2 border-gray-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:border-[#071A3D] focus:ring-2 focus:ring-[#071A3D]/20 bg-white pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy-950 text-sm cursor-pointer"
                      aria-label="Toggle Password Visibility"
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                {error && <p className="text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">{error}</p>}

                <button
                  type="submit"
                  className="w-full bg-[#071A3D] hover:bg-black text-white font-black text-xs py-3.5 rounded-xl transition-all shadow-md focus-ring cursor-pointer mt-3"
                >
                  Login to Role Selection →
                </button>

                <p className="text-center text-[11px] text-gray-500 font-medium pt-2">
                  Don&rsquo;t have an active account? Contact your departmental nodal officer.
                </p>
              </form>
            ) : (
              /* MODE 2: Government SSO */
              <div className="space-y-4 text-xs">
                <div className="bg-navy-50/60 border-2 border-navy-100 rounded-xl p-4 text-[#071A3D] leading-relaxed font-medium text-xs">
                  🏛️ <strong>Government Single Sign-On (SSO):</strong> Direct authentication via{' '}
                  <span className="font-bold">Parichay</span> or <span className="font-bold">ePramaan</span> National Identity Gateways for verified gazetted officers.
                </div>

                <div className="p-6 border-2 border-dashed border-gray-300 rounded-2xl text-center space-y-3 bg-gray-50/50">
                  <div className="flex items-center justify-center gap-2">
                    <span className="h-8 w-8 rounded-xl bg-[#071A3D] text-white flex items-center justify-center text-sm font-bold">
                      🏛️
                    </span>
                    <span className="font-black text-[#071A3D] text-base">Parichay / ePramaan SSO</span>
                  </div>
                  <p className="text-gray-500 text-xs font-medium">
                    Single-click authentication for Maharashtra &amp; Central Government officials.
                  </p>
                  <button
                    type="button"
                    onClick={handleSSO}
                    className="w-full bg-[#071A3D] hover:bg-black text-white font-black text-xs py-3.5 rounded-xl transition-all shadow-md focus-ring cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Authenticate via Government SSO (Demo) →</span>
                  </button>
                </div>
              </div>
            )}

            <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-500">
              <Link to="/" className="text-[#071A3D] hover:text-amber-700 transition-colors">
                ← Back to Homepage
              </Link>
              <span className="text-[10px] text-gray-400">FIIK Portal v1.0</span>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
