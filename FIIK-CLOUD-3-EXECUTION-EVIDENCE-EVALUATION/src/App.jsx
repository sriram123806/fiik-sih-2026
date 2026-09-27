import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import PilotExecutionDashboard from './pages/PilotExecutionDashboard';
import EvidenceSubmission from './pages/EvidenceSubmission';
import FieldEvaluation from './pages/FieldEvaluation';

// HashRouter is used so this module can run standalone (as its own ZIP/static
// build) or be dropped into a shared shell without a server-side rewrite rule.
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/execution" replace />} />
        <Route path="/execution" element={<PilotExecutionDashboard />} />
        <Route path="/evidence-submission" element={<EvidenceSubmission />} />
        <Route path="/field-evaluation" element={<FieldEvaluation />} />
        <Route path="*" element={<Navigate to="/execution" replace />} />
      </Routes>
    </HashRouter>
  );
}
