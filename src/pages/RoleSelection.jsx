import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

import govtBuildingImg from '../assets/govt-building.png';
import startupTeamImg from '../assets/startup-team.png';
import techAiImg from '../assets/tech-ai-interface.jpg';
import procurementLegalImg from '../assets/procurement-legal.jpg';

const roleCardConfigs = {
  startup: {
    bg: 'border-blue-300 hover:border-blue-500',
    iconBg: 'bg-white text-[#1D70B8] border border-blue-200',
    icon: '🚀',
    title: 'Startup Innovator',
    desc: 'Discover open government challenges, execute work orders, upload telemetry evidence, and earn portable PREP certification.',
    btn: 'bg-[#1D70B8] hover:bg-[#15568f]',
    image: startupTeamImg,
    tag: 'STARTUP PORTAL',
    tagColor: 'bg-blue-100 text-blue-900 border-blue-200',
    accentColor: '#1D70B8',
  },
  department: {
    bg: 'border-orange-300 hover:border-orange-500',
    iconBg: 'bg-white text-[#E05625] border border-orange-200',
    icon: '🏛️',
    title: 'Government Department',
    desc: 'Post challenges, review pilot proposals, inspect independent evaluator audits, and enable scale-up procurement.',
    btn: 'bg-[#E05625] hover:bg-[#c6471c]',
    image: govtBuildingImg,
    tag: 'GOVERNMENT PORTAL',
    tagColor: 'bg-orange-100 text-orange-900 border-orange-200',
    accentColor: '#E05625',
  },
  evaluator: {
    bg: 'border-green-300 hover:border-green-500',
    iconBg: 'bg-white text-[#1E8549] border border-green-200',
    icon: '👥',
    title: 'Technical Evaluator',
    desc: 'Empanelled MSInS experts perform field audits, validate telemetry against benchmarks, and certify milestone completion.',
    btn: 'bg-[#1E8549] hover:bg-[#166738]',
    image: techAiImg,
    tag: 'EVALUATOR PORTAL',
    tagColor: 'bg-green-100 text-green-900 border-green-200',
    accentColor: '#1E8549',
  },
  admin: {
    bg: 'border-purple-300 hover:border-purple-500',
    iconBg: 'bg-white text-[#7C4DFF] border border-purple-200',
    icon: '🛡️',
    title: 'MSInS Nodal Authority',
    desc: 'State innovation secretariat issues standardized work orders, manages escrow disbursements, and publishes PREP Passports.',
    btn: 'bg-[#7C4DFF] hover:bg-[#6232d6]',
    image: procurementLegalImg,
    tag: 'MSINS PORTAL',
    tagColor: 'bg-purple-100 text-purple-900 border-purple-200',
    accentColor: '#7C4DFF',
  },
};

export default function RoleSelection() {
  const navigate = useNavigate();
  const { chooseRole } = useAuth();

  function handleSelect(roleKey) {
    chooseRole(roleKey);
    navigate('/verify-role');
  }

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col font-sans">
      <Header variant="public" showHomeLink />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12 w-full flex flex-col justify-center">
        
        <div className="text-center mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#071A3D] bg-white border border-gray-300 px-3.5 py-1 rounded-full shadow-xs">
            ROLE-BASED GOVERNANCE ARCHITECTURE
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-navy-950 mt-3 tracking-tight">
            Select Your Operating Portal
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-gray-500 mt-1.5 max-w-xl mx-auto">
            Choose your assigned stakeholder authority to proceed to role identity verification
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {['startup', 'department', 'evaluator', 'admin'].map((roleKey) => {
            const config = roleCardConfigs[roleKey];
            return (
              <div
                key={roleKey}
                className={`rounded-2xl border-2 ${config.bg} overflow-hidden flex flex-col justify-between shadow-card hover:shadow-2xl transition-all group bg-white`}
              >
                {/* Visual Thumbnail */}
                <div className="h-32 relative overflow-hidden bg-navy-950">
                  <img
                    src={config.image}
                    alt={config.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end justify-between p-3">
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${config.tagColor}`}>
                      {config.tag}
                    </span>
                    <span className="text-xl">{config.icon}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="font-black text-navy-950 text-base">{config.title}</h2>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed font-medium">
                      {config.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => handleSelect(roleKey)}
                    className={`mt-6 w-full text-white text-xs font-extrabold py-3 rounded-xl transition-all shadow-md focus-ring cursor-pointer flex items-center justify-center gap-1.5 ${config.btn}`}
                  >
                    <span>Proceed to Verification</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/login"
            className="text-xs font-black text-navy-950 hover:text-fiik-orange transition-colors inline-flex items-center gap-1.5 py-2.5 px-5 rounded-xl bg-white border-2 border-gray-200 shadow-sm"
          >
            <span>←</span>
            <span>Back to Login</span>
          </Link>
        </div>

      </main>
    </div>
  );
}
