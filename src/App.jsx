import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PilotProvider } from './context/PilotContext';
import RoleGuard from './components/RoleGuard';

import Landing from './pages/Landing';
import Login from './pages/Login';
import RoleSelection from './pages/RoleSelection';
import RoleVerification from './pages/RoleVerification';
import StartupDashboard from './pages/StartupDashboard';
import StartupRegistration from './pages/StartupRegistration';
import WorkOrderBuilder from './pages/WorkOrderBuilder';
import FourPartyReview from './pages/FourPartyReview';
import PilotExecutionDashboard from './pages/PilotExecutionDashboard';
import EvidenceSubmission from './pages/EvidenceSubmission';
import FieldEvaluation from './pages/FieldEvaluation';
import ApprovalPayment from './pages/ApprovalPayment';
import PrepGeneration from './pages/PrepGeneration';
import CompletedPilot from './pages/CompletedPilot';
import FiikChatbot from './components/FiikChatbot';

export default function App() {
  return (
    <AuthProvider>
      <PilotProvider>
        <Routes>
          {/* Workflow Step 01: Landing Page */}
          <Route path="/" element={<Landing />} />

          {/* Workflow Step 02: Login */}
          <Route path="/login" element={<Login />} />

          {/* Workflow Step 03: Role Selection & Verification Gate */}
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/select-role" element={<RoleSelection />} />
          <Route path="/verify-role" element={<RoleVerification />} />

          {/* Workflow Step 04: Role Dashboard (Adapts dynamically to Startup, Dept, Evaluator, MSInS Admin) */}
          <Route
            path="/dashboard"
            element={
              <RoleGuard allowedRoles={['startup', 'department', 'evaluator', 'admin']} pageTitle="Dashboard">
                <StartupDashboard />
              </RoleGuard>
            }
          />
          <Route
            path="/startup"
            element={
              <RoleGuard allowedRoles={['startup', 'department', 'evaluator', 'admin']} pageTitle="Dashboard">
                <StartupDashboard />
              </RoleGuard>
            }
          />

          {/* Workflow Step 05: Startup Registration & Profile (Startup edits, Admin verifies) */}
          <Route
            path="/registration"
            element={
              <RoleGuard allowedRoles={['startup', 'admin']} pageTitle="Startup Registration">
                <StartupRegistration />
              </RoleGuard>
            }
          />
          <Route
            path="/startup/register"
            element={
              <RoleGuard allowedRoles={['startup', 'admin']} pageTitle="Startup Registration">
                <StartupRegistration />
              </RoleGuard>
            }
          />

          {/* Workflow Step 06: Requirement / Work Order Builder */}
          <Route
            path="/work-order"
            element={
              <RoleGuard allowedRoles={['startup', 'department', 'evaluator', 'admin']} pageTitle="Work Order Builder">
                <WorkOrderBuilder />
              </RoleGuard>
            }
          />
          <Route
            path="/startup/requirement"
            element={
              <RoleGuard allowedRoles={['startup', 'department', 'evaluator', 'admin']} pageTitle="Work Order Builder">
                <WorkOrderBuilder />
              </RoleGuard>
            }
          />

          {/* Workflow Step 07: Four-Party Governance Review */}
          <Route
            path="/four-party-review"
            element={
              <RoleGuard allowedRoles={['startup', 'department', 'evaluator', 'admin']} pageTitle="Four-Party Review">
                <FourPartyReview />
              </RoleGuard>
            }
          />
          <Route
            path="/startup/four-party-review"
            element={
              <RoleGuard allowedRoles={['startup', 'department', 'evaluator', 'admin']} pageTitle="Four-Party Review">
                <FourPartyReview />
              </RoleGuard>
            }
          />

          {/* Workflow Step 08: Pilot & Milestone Execution */}
          <Route
            path="/execution"
            element={
              <RoleGuard allowedRoles={['startup', 'department', 'evaluator', 'admin']} pageTitle="Pilot Execution">
                <PilotExecutionDashboard />
              </RoleGuard>
            }
          />
          <Route
            path="/startup/pilot"
            element={
              <RoleGuard allowedRoles={['startup', 'department', 'evaluator', 'admin']} pageTitle="Pilot Execution">
                <PilotExecutionDashboard />
              </RoleGuard>
            }
          />

          {/* Workflow Step 09: Evidence Submission (Restricted to Startup & Admin) */}
          <Route
            path="/evidence-submission"
            element={
              <RoleGuard allowedRoles={['startup', 'admin']} pageTitle="Evidence Submission">
                <EvidenceSubmission />
              </RoleGuard>
            }
          />
          <Route
            path="/startup/evidence"
            element={
              <RoleGuard allowedRoles={['startup', 'admin']} pageTitle="Evidence Submission">
                <EvidenceSubmission />
              </RoleGuard>
            }
          />

          {/* Workflow Step 10: Evidence / Field Evaluation (Restricted to Evaluator, Department & Admin) */}
          <Route
            path="/field-evaluation"
            element={
              <RoleGuard allowedRoles={['evaluator', 'department', 'admin']} pageTitle="Field Evaluation">
                <FieldEvaluation />
              </RoleGuard>
            }
          />
          <Route
            path="/startup/evaluation"
            element={
              <RoleGuard allowedRoles={['evaluator', 'department', 'admin']} pageTitle="Field Evaluation">
                <FieldEvaluation />
              </RoleGuard>
            }
          />

          {/* Workflow Step 11: Milestone Approval & Payment Processing */}
          <Route
            path="/approval-payment"
            element={
              <RoleGuard allowedRoles={['startup', 'department', 'evaluator', 'admin']} pageTitle="Approval & Payment">
                <ApprovalPayment />
              </RoleGuard>
            }
          />
          <Route
            path="/startup/payment"
            element={
              <RoleGuard allowedRoles={['startup', 'department', 'evaluator', 'admin']} pageTitle="Approval & Payment">
                <ApprovalPayment />
              </RoleGuard>
            }
          />

          {/* Workflow Step 12: PREP Generation */}
          <Route
            path="/prep-generation"
            element={
              <RoleGuard allowedRoles={['admin', 'startup', 'department', 'evaluator']} pageTitle="PREP Generation">
                <PrepGeneration />
              </RoleGuard>
            }
          />
          <Route
            path="/startup/prep-generation"
            element={
              <RoleGuard allowedRoles={['admin', 'startup', 'department', 'evaluator']} pageTitle="PREP Generation">
                <PrepGeneration />
              </RoleGuard>
            }
          />

          {/* Workflow Step 13: Completed Pilot / Portable PREP Record */}
          <Route
            path="/completed-pilot"
            element={
              <RoleGuard allowedRoles={['startup', 'department', 'evaluator', 'admin']} pageTitle="Completed Pilot PREP">
                <CompletedPilot />
              </RoleGuard>
            }
          />
          <Route
            path="/startup/prep"
            element={
              <RoleGuard allowedRoles={['startup', 'department', 'evaluator', 'admin']} pageTitle="Completed Pilot PREP">
                <CompletedPilot />
              </RoleGuard>
            }
          />
          <Route
            path="/startup/prep/:id"
            element={
              <RoleGuard allowedRoles={['startup', 'department', 'evaluator', 'admin']} pageTitle="Completed Pilot PREP">
                <CompletedPilot />
              </RoleGuard>
            }
          />

          {/* Wildcard Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <FiikChatbot />
      </PilotProvider>
    </AuthProvider>
  );
}
