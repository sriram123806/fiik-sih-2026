import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

export default function PlaceholderPage({ title, note }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header variant="dashboard" />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-6 py-10 max-w-3xl">
          <div className="bg-white border border-dashed border-gray-300 rounded-xl p-10 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-orange-50 text-fiik-orange flex items-center justify-center text-xl">
              🚧
            </div>
            <h1 className="text-lg font-semibold text-navy-950 mb-1">{title}</h1>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              {note || 'This section belongs to a different FIIK module and is built separately. It is not part of this prototype.'}
            </p>
            <Link
              to="/dashboard"
              className="inline-block mt-6 text-sm font-semibold text-fiik-orange hover:text-fiik-orangeDark focus-ring rounded"
            >
              ← Back to Home
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}
