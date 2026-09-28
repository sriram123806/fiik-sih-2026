import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { stakeholders, pillars, howItWorks } from '../data/mockData';
import heroImg from '../assets/india-govt-hero.png';

const stakeholderIcons = {
  startups: '🚀',
  departments: '🏛️',
  evaluators: '👥',
  procurement: '⚖️',
};

const pillarIcons = {
  visibility: '👁️',
  governance: '⚖️',
  ledger: '📂',
  prep: '🛂',
  reuse: '🔄',
};

const pillarColor = {
  orange: 'bg-orange-50/80 border-orange-200 text-orange-900',
  blue: 'bg-blue-50/80 border-blue-200 text-blue-900',
  green: 'bg-green-50/80 border-green-200 text-green-900',
  purple: 'bg-purple-50/80 border-purple-200 text-purple-900',
  teal: 'bg-teal-50/80 border-teal-200 text-teal-900',
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans">
      {/* Global Header */}
      <Header variant="public" />

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-[#FDFBF7] border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 grid lg:grid-cols-2 gap-10 items-center">

          {/* Left Column */}
          <div className="z-10">
            {/* FIIK logo text + tagline */}
            <div className="flex items-center gap-3 mb-4">
              <span className="h-10 w-1.5 bg-fiik-orange rounded-full shrink-0" />
              <div>
                <h1 className="text-5xl sm:text-6xl font-black text-navy-950 tracking-tight leading-none">FIIK</h1>
                <p className="text-sm font-semibold text-gray-500 mt-0.5">Pilot Intelligence Procurement Mechanism</p>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-navy-950 leading-snug mt-6">
              From Pilot to Procurement — A Verified Path for Startups.
            </h2>

            <p className="mt-3 text-sm text-gray-600 leading-relaxed max-w-lg">
              A government-aligned platform to plan, execute, evaluate and convert pilots into
              procurement-ready opportunities, with reusable evidence across departments.
            </p>

            {/* CTAs matching reference */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/login"
                className="bg-fiik-orange hover:bg-fiik-orangeDark text-white font-bold px-6 py-3 rounded-lg shadow-md transition-all focus-ring flex items-center gap-2 text-sm"
              >
                <span>Explore the Platform</span>
                <span>→</span>
              </Link>
              <a
                href="#how-it-works"
                className="bg-white border border-gray-300 text-navy-950 hover:border-navy-950 font-bold px-5 py-3 rounded-lg transition-all focus-ring text-sm"
              >
                Know More
              </a>
            </div>
          </div>

          {/* Right Column: India Gate illustration — clean bordered card, no dark overlay */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-gray-200/80 shadow-lg bg-white">
              <img
                src={heroImg}
                alt="Government of India Architectural Illustration"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ── Problem Statement & Key Stakeholders ── */}
      <section id="about" className="py-14 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">

            {/* Problem Statement Card — with SIH badge like reference */}
            <div className="bg-orange-50/60 border border-orange-200/80 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-fiik-orange text-xl">📄</span>
                <span className="bg-navy-950 text-white text-[10px] font-black px-2.5 py-0.5 rounded">SIH26136</span>
                <span className="text-sm font-extrabold text-navy-950">Selected Problem Statement</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="text-gray-500">"</span>To design and develop a mechanism for{' '}
                <span className="text-fiik-orange font-semibold">government departments</span> to pilot innovative
                solutions with startups, evaluate their performance, and enable faster procurement of
                proven solutions.<span className="text-gray-500">"</span>
              </p>
            </div>

            {/* Key Stakeholders */}
            <div>
              <h3 className="text-lg font-extrabold text-navy-950 mb-4">Key Stakeholders</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: '🚀', label: 'Startups /\nInnovators' },
                  { icon: '🏛️', label: 'Government\nDepartments' },
                  { icon: '👥', label: 'Evaluator /\nTechnical Expert\n(MSInS)' },
                  { icon: '⚖️', label: 'Procurement\nSystems (GeM)' },
                ].map((s) => (
                  <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center gap-2 hover:border-orange-200 transition-colors shadow-sm">
                    <span className="text-2xl text-fiik-orange">{s.icon}</span>
                    <p className="text-[11px] font-bold text-navy-950 whitespace-pre-line leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Key Pillars of FIIK ── */}
      <section id="features" className="py-16 bg-gray-50/60 border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-fiik-orange bg-orange-100 px-3 py-1 rounded-full border border-orange-200">
              Core Architecture
            </span>
            <h2 className="text-3xl font-black text-navy-950 mt-3">Key Pillars of FIIK</h2>
            <p className="text-sm text-gray-600 mt-2 font-medium">
              A structured pilot-to-procurement ecosystem designed for transparency, trust, and speed.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {pillars.map((p) => (
              <div
                key={p.key}
                className={`border-2 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${pillarColor[p.color]}`}
              >
                <div>
                  <span className="text-3xl block mb-3">{pillarIcons[p.key] || '📌'}</span>
                  <h3 className="font-extrabold text-navy-950 text-sm mb-2">{p.label}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">{p.description}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-gray-200/50 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  FIIK Standard
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How FIIK Works ── */}
      <section id="how-it-works" className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-navy-950 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
              User Journey &amp; Methodology
            </span>
            <h2 className="text-3xl font-black text-navy-950 mt-3">How FIIK Works</h2>
            <p className="text-sm text-gray-600 mt-2 font-medium">
              A simple, 6-stage structured progression from problem identification to scale-up procurement.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {howItWorks.map((step, i) => (
              <div key={step.key} className="bg-white border-2 border-gray-200 rounded-2xl p-5 shadow-card relative hover:border-fiik-orange transition-colors flex flex-col justify-between">
                <div className="tricolor-bar absolute top-0 left-0 right-0 h-1 rounded-t-2xl" />
                <div>
                  <div className="h-8 w-8 rounded-full bg-navy-950 text-white font-black text-xs flex items-center justify-center mb-4 shadow-sm">
                    {i + 1}
                  </div>
                  <h3 className="font-extrabold text-navy-950 text-sm">{step.label}</h3>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed font-medium">{step.description}</p>
                </div>
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-gray-300 font-bold text-lg z-10">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Workflow Banner */}
          <div className="mt-10 bg-gradient-to-r from-orange-500 via-fiik-orange to-amber-600 text-white rounded-2xl p-6 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-black tracking-widest opacity-90">GOVERNANCE ENFORCEMENT</span>
              <h4 className="text-lg font-black mt-0.5">Strict Sequential Workflow &amp; Validation</h4>
              <p className="text-xs opacity-90 mt-1 max-w-2xl">
                PREP passports are generated only after four-party milestone approvals, evidence validation, and payment releases are fully satisfied.
              </p>
            </div>
            <Link
              to="/login"
              className="bg-navy-950 hover:bg-black text-white font-bold text-xs px-5 py-3 rounded-lg shadow transition-colors shrink-0"
            >
              Start Workflow Journey →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why FIIK ── */}
      <section className="py-16 bg-gray-50/80 border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-black text-navy-950">Why FIIK?</h2>
            <p className="text-sm text-gray-600 mt-2 font-medium">
              Eliminating redundant evaluations and building government trust.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-card text-center">
              <span className="text-4xl block mb-3">🛡️</span>
              <h3 className="font-extrabold text-navy-950 text-base mb-2">Bridges the Missing Middle</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                FIIK bridges the gap between initial startup selection and final government procurement.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-card text-center">
              <span className="text-4xl block mb-3">📈</span>
              <h3 className="font-extrabold text-navy-950 text-base mb-2">Single Evidence Ledger</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Capture &amp; verify milestone evidence once, then reuse the PREP record across departments.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-card text-center">
              <span className="text-4xl block mb-3">✅</span>
              <h3 className="font-extrabold text-navy-950 text-base mb-2">Trust &amp; GeM Readiness</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Provides standardized, verifiable performance proofs for seamless government scale-up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer id="contact" className="gov-header-top text-white">
        <div className="tricolor-bar" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-navy-900 text-xs">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-8 w-8 rounded bg-fiik-orange text-white flex items-center justify-center font-black text-sm">F</span>
              <span className="font-black text-lg text-white">FIIK</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Pilot Intelligence Procurement Mechanism for Government &amp; Startups.
            </p>
            <p className="text-orange-400 font-bold mt-2">National Innovation Procurement Initiative</p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-white">About FIIK</a></li>
              <li><a href="#how-it-works" className="hover:text-white">Workflow Journey</a></li>
              <li><a href="#features" className="hover:text-white">Key Pillars</a></li>
              <li><Link to="/login" className="hover:text-white">Explore Platform</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">Governance Roles</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/role-selection" className="hover:text-white">Startup Innovators</Link></li>
              <li><Link to="/role-selection" className="hover:text-white">Government Departments</Link></li>
              <li><Link to="/role-selection" className="hover:text-white">Technical Evaluators (MSInS)</Link></li>
              <li><Link to="/role-selection" className="hover:text-white">Procurement Systems (GeM)</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">Government Alignment</h4>
            <p className="text-gray-400 leading-relaxed">
              Designed in alignment with Startup India, MSInS, and Government e-Marketplace (GeM) pilot-to-procurement guidelines.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-400">
          <p>© 2026 FIIK Mechanism · Government of India Pilot Intelligence Portal</p>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>|</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span>|</span>
            <span className="hover:text-white cursor-pointer">Helpdesk Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
