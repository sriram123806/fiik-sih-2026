import { Routes, Route, Navigate } from 'react-router-dom';
import StartupRegistration from './pages/StartupRegistration';
import WorkOrderBuilder from './pages/WorkOrderBuilder';
import FourPartyReview from './pages/FourPartyReview';

// This module (Cloud 2) is responsible only for pages 04–06 of the FIIK
// workflow: Startup Registration, Requirement / Work Order Builder, and
// Four-Party Review. Landing, login, dashboard, execution, evidence,
// evaluation, payment and PREP belong to other modules and are not built
// here — "/" redirects straight into this module's first page for preview.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/registration" replace />} />
      <Route path="/registration" element={<StartupRegistration />} />
      <Route path="/work-order" element={<WorkOrderBuilder />} />
      <Route path="/four-party-review" element={<FourPartyReview />} />
      <Route path="*" element={<Navigate to="/registration" replace />} />
    </Routes>
  );
}
