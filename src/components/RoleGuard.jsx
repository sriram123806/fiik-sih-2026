import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';

export default function RoleGuard({ allowedRoles = [], children, pageTitle = 'Restricted Section' }) {
  const { role, chooseRole } = useAuth();
  const navigate = useNavigate();

  const roleNames = {
    startup: 'Startup Innovator',
    department: 'Government Department',
    evaluator: 'Technical Evaluator (MSInS)',
    admin: 'MSInS Nodal Authority / Admin',
  };

  const isAllowed = allowedRoles.includes(role);

  if (isAllowed) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header variant="dashboard" />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 max-w-4xl mx-auto">
          <div className="bg-white border-2 border-amber-200 rounded-xl p-8 shadow-card text-center my-8">
            <div className="h-16 w-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border border-amber-200">
              🔒
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
              Access Control Restriction
            </span>
            <h2 className="text-xl font-black text-navy-950 mt-3">
              Role Access Restricted: {pageTitle}
            </h2>
            <p className="text-xs text-gray-600 mt-2 max-w-md mx-auto leading-relaxed">
              Your current active role is <strong className="text-navy-950 font-bold">{roleNames[role] || role}</strong>.
              According to FIIK RBAC governance rules, this function is reserved for:
            </p>

            <div className="flex flex-wrap justify-center gap-2 my-4">
              {allowedRoles.map((r) => (
                <span key={r} className="text-xs font-bold bg-navy-950 text-white px-3 py-1 rounded-md">
                  {roleNames[r] || r}
                </span>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="btn btn-secondary text-xs"
              >
                ← Return to {roleNames[role]} Dashboard
              </button>
              {allowedRoles.length > 0 && (
                <button
                  onClick={() => {
                    chooseRole(allowedRoles[0]);
                    navigate('/dashboard');
                  }}
                  className="btn btn-primary text-xs bg-fiik-orange hover:bg-fiik-orangeDark"
                >
                  Switch Role to {roleNames[allowedRoles[0]]} →
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
