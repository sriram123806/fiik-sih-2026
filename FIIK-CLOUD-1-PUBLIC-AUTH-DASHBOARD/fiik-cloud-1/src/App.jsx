import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Landing from './pages/Landing'
import Login from './pages/Login'
import RoleSelection from './pages/RoleSelection'
import StartupDashboard from './pages/StartupDashboard'
import PlaceholderPage from './components/PlaceholderPage'

// Placeholder routes for sidebar items that belong to other FIIK modules.
// These are intentionally NOT built out here — see README for module scope.
const placeholderRoutes = [
  { path: '/dashboard/browse-opportunities', title: 'Browse Opportunities' },
  { path: '/dashboard/my-applications', title: 'My Applications' },
  { path: '/dashboard/active-pilots', title: 'Active Pilots' },
  { path: '/dashboard/evidence-submission', title: 'Evidence Submission' },
  { path: '/dashboard/my-prep', title: 'My PREP' },
  { path: '/dashboard/my-profile', title: 'My Profile' },
  { path: '/dashboard/support', title: 'Support' }
]

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/dashboard" element={<StartupDashboard />} />
        {placeholderRoutes.map((r) => (
          <Route key={r.path} path={r.path} element={<PlaceholderPage title={r.title} />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}
