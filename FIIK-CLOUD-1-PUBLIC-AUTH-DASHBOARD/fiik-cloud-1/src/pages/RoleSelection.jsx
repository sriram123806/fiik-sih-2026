import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'
import { roles } from '../data/mockData'

const accentClasses = {
  orange: { bg: 'bg-orange-50', icon: 'bg-fiik-orange', btn: 'bg-fiik-orange hover:bg-fiik-orangeDark' },
  blue: { bg: 'bg-blue-50', icon: 'bg-fiik-blue', btn: 'bg-fiik-blue hover:bg-blue-700' },
  green: { bg: 'bg-green-50', icon: 'bg-fiik-green', btn: 'bg-fiik-green hover:bg-green-700' }
}

export default function RoleSelection() {
  const [notice, setNotice] = useState(null)
  const navigate = useNavigate()
  const { chooseRole } = useAuth()

  function handleSelect(role) {
    if (!role.implemented) {
      setNotice(role.label)
      return
    }
    setNotice(null)
    chooseRole(role.key)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header variant="public" showHomeLink />
      <div className="max-w-5xl mx-auto px-4 py-14">
        <h1 className="text-2xl font-bold text-navy-950 text-center">Select Your Role</h1>
        <p className="text-sm text-gray-500 text-center mt-1">
          Access the FIIK platform with your respective dashboard
        </p>

        {notice && (
          <div className="mt-6 max-w-lg mx-auto bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-md px-4 py-3 text-center">
            The <span className="font-semibold">{notice}</span> dashboard is a separate FIIK module and is
            under development in this prototype. Try continuing as <span className="font-semibold">Startup</span> instead.
          </div>
        )}

        <div className="mt-8 grid sm:grid-cols-3 gap-6">
          {roles.map((role) => {
            const accent = accentClasses[role.accent]
            return (
              <div key={role.key} className={`rounded-xl border border-gray-200 ${accent.bg} p-6 flex flex-col shadow-card`}>
                <div className={`h-12 w-12 rounded-full ${accent.icon} text-white flex items-center justify-center text-xl mb-4`}>
                  {role.key === 'department' ? '🏛️' : role.key === 'startup' ? '🚀' : '👥'}
                </div>
                <h2 className="font-semibold text-navy-950">{role.label}</h2>
                <p className="text-sm text-gray-600 mt-2 flex-1">{role.description}</p>
                {!role.implemented && (
                  <span className="text-[11px] font-medium text-amber-700 bg-amber-100 rounded px-2 py-0.5 inline-block mt-3 w-fit">
                    Module under development
                  </span>
                )}
                <button
                  onClick={() => handleSelect(role)}
                  className={`mt-4 w-full text-white text-sm font-semibold py-2.5 rounded-md transition-colors focus-ring ${accent.btn}`}
                >
                  {role.cta} →
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
