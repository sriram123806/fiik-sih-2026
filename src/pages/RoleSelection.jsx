import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import heroImg from '../assets/india-govt-hero.png';

const roleCardConfigs = {
  department: {
    bg: 'bg-[#FDF5EC] border-orange-200/80',
    iconBg: 'bg-white text-navy-950 border border-orange-200',
    icon: '🏛️',
    title: 'Government Department',
    desc: 'Post challenges, review pilots, track progress, and enable procurement.',
    btn: 'bg-[#E05625] hover:bg-[#c6471c]',
  },
  startup: {
    bg: 'bg-[#EBF5FF] border-blue-200/80',
    iconBg: 'bg-white text-blue-700 border border-blue-200',
    icon: '🚀',
    title: 'Startup',
    desc: 'Discover opportunities, apply for pilots, submit evidence and track your progress.',
    btn: 'bg-[#1D70B8] hover:bg-[#15568f]',
  },
  evaluator: {
    bg: 'bg-[#EAF7ED] border-green-200/80',
    iconBg: 'bg-white text-green-700 border border-green-200',
    icon: '👥',
    title: 'Evaluator / Technical Expert',
    desc: 'Review evidence, evaluate milestones and validate pilot outcomes.',
    btn: 'bg-[#1E8549] hover:bg-[#166738]',
  },
  admin: {
    bg: 'bg-[#F3EBFB] border-purple-200/80',
    iconBg: 'bg-white text-purple-700 border border-purple-200',
    icon: '🛡️',
    title: 'MSInS',
    desc: 'Issue work orders, approve payments and oversee the pilot-to-procurement pipeline.',
    btn: 'bg-[#7C4DFF] hover:bg-[#6232d6]',
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
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans relative overflow-hidden">
      <Header variant="public" showHomeLink />

      {/* Background Vector Artwork Watermark (Image 3 reference) */}
      <div className="absolute inset-0 top-24 pointer-events-none opacity-20 flex items-center justify-center">
        <img
          src={heroImg}
          alt="Government Architecture Watermark"
          className="w-full max-w-6xl h-auto object-contain filter saturate-150"
        />
      </div>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full flex flex-col justify-center z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-navy-950 tracking-tight">Select Your Role</h1>
          <p className="text-xs font-semibold text-gray-500 mt-1.5">
            Access the FIIK platform with your respective dashboard
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {['department', 'startup', 'evaluator', 'admin'].map((roleKey) => {
            const config = roleCardConfigs[roleKey];
            return (
              <div
                key={roleKey}
                className={`rounded-2xl border-2 ${config.bg} p-6 flex flex-col justify-between shadow-card hover:shadow-xl transition-all group`}
              >
                <div>
                  <div
                    className={`h-14 w-14 rounded-2xl ${config.iconBg} flex items-center justify-center text-2xl mb-5 shadow-sm group-hover:scale-110 transition-transform`}
                  >
                    {config.icon}
                  </div>
                  <h2 className="font-extrabold text-navy-950 text-base">{config.title}</h2>
                  <p className="text-xs text-gray-600 mt-2.5 leading-relaxed font-medium">
                    {config.desc}
                  </p>
                </div>
                <button
                  onClick={() => handleSelect(roleKey)}
                  className={`mt-6 w-full text-white text-xs font-bold py-3 rounded-xl transition-colors shadow-md focus-ring cursor-pointer flex items-center justify-center gap-1.5 ${config.btn}`}
                >
                  <span>Continue</span>
                  <span>→</span>
                </button>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/login"
            className="text-xs font-extrabold text-navy-950 hover:text-fiik-orange transition-colors inline-flex items-center gap-1.5 py-2 px-4 rounded-lg bg-white border border-gray-200 shadow-sm"
          >
            <span>←</span>
            <span>Back to Login</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
