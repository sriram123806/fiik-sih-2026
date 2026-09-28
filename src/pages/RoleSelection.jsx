import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { roles } from '../data/mockData';

const accentClasses = {
  orange: { bg: 'bg-orange-50', icon: 'bg-fiik-orange', btn: 'bg-fiik-orange hover:bg-fiik-orangeDark' },
  blue: { bg: 'bg-blue-50', icon: 'bg-fiik-blue', btn: 'bg-fiik-blue hover:bg-blue-700' },
  green: { bg: 'bg-green-50', icon: 'bg-fiik-green', btn: 'bg-fiik-green hover:bg-green-700' },
  purple: { bg: 'bg-purple-50', icon: 'bg-purple-700', btn: 'bg-purple-800 hover:bg-purple-900' },
};

export default function RoleSelection() {
  const navigate = useNavigate();
  const { chooseRole } = useAuth();

  function handleSelect(roleKey) {
    chooseRole(roleKey);
    navigate('/verify-role');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header variant="public" showHomeLink />
      <div className="max-w-6xl mx-auto px-4 py-14">
        <h1 className="text-2xl font-bold text-navy-950 text-center">Select Your Role</h1>
        <p className="text-sm text-gray-500 text-center mt-1">
          Access the FIIK platform with your respective dashboard and governance permissions
        </p>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((roleItem) => {
            const accent = (roleItem.accent && accentClasses[roleItem.accent]) ? accentClasses[roleItem.accent] : accentClasses.blue;
            return (
              <div key={roleItem.key} className={`rounded-xl border border-gray-200 ${accent.bg} p-6 flex flex-col shadow-card justify-between`}>
                <div>
                  <div className={`h-12 w-12 rounded-full ${accent.icon} text-white flex items-center justify-center text-xl mb-4 shadow-sm`}>
                    {roleItem.key === 'department'
                      ? '🏛️'
                      : roleItem.key === 'startup'
                      ? '🚀'
                      : roleItem.key === 'evaluator'
                      ? '👥'
                      : '⚖️'}
                  </div>
                  <h2 className="font-semibold text-navy-950 text-base">{roleItem.label}</h2>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{roleItem.description}</p>
                </div>
                <button
                  onClick={() => handleSelect(roleItem.key)}
                  className={`mt-5 w-full text-white text-xs font-semibold py-2.5 rounded-md transition-colors focus-ring shadow-sm ${accent.btn}`}
                >
                  {roleItem.cta} →
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
