import { Routes, Route, Navigate } from 'react-router-dom'
import ApprovalPayment from './pages/ApprovalPayment.jsx'
import PrepGeneration from './pages/PrepGeneration.jsx'
import CompletedPilot from './pages/CompletedPilot.jsx'

// FIIK — Cloud 4 module routes.
// This module owns steps 10–12 of the FIIK workflow only:
//   Approval & Payment → PREP Generation → Completed Pilot / Portable PREP Record
// Landing, login, registration, requirement, review, execution and
// evidence pages belong to the other three Cloud modules.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/approval-payment" replace />} />
      <Route path="/approval-payment" element={<ApprovalPayment />} />
      <Route path="/prep-generation" element={<PrepGeneration />} />
      <Route path="/completed-pilot" element={<CompletedPilot />} />
      <Route path="*" element={<Navigate to="/approval-payment" replace />} />
    </Routes>
  )
}
