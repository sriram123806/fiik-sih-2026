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

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-white to-gray-50/80 border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100/70 border border-orange-200 text-xs font-bold text-orange-800 mb-6 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-fiik-orange animate-pulse" />
              <span>GOVERNMENT OF INDIA INNOVATION INITIATIVE</span>
              <span className="text-orange-400">|</span>
              <span className="text-navy-950 font-extrabold">NATIONAL PILOT FRAMEWORK</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-navy-950 tracking-tight leading-[1.15]">
              FIIK
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-extrabold text-fiik-orange mt-2">
                Pilot Intelligence Procurement Mechanism
              </span>
            </h1>

            <p className="mt-4 text-lg sm:text-xl font-bold text-gray-800">
              From Pilot to Procurement — A Verified Path for Startups.
            </p>

            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl">
              A structured government-startup pilot mechanism that bridges the &ldquo;missing middle.&rdquo;
              FIIK captures verified milestone evidence, evaluates performance, and converts completed pilots
              into standardized, portable procurement records.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/login"
                className="bg-fiik-orange hover:bg-fiik-orangeDark text-white font-bold px-7 py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all focus-ring flex items-center gap-2 text-sm sm:text-base"
              >
                <span>Explore the Platform</span>
                <span className="text-lg">→</span>
              </Link>
              <a
                href="#how-it-works"
                className="bg-white border-2 border-navy-950 text-navy-950 hover:bg-navy-950 hover:text-white font-bold px-6 py-3 rounded-lg transition-all focus-ring text-sm sm:text-base"
              >
                How It Works
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 pt-6 border-t border-gray-200/60 grid grid-cols-3 gap-4 text-xs font-semibold text-gray-600">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">✓</span>
                <span>Four-Party Governance</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold">✓</span>
                <span>PREP Passport</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">✓</span>
                <span>GeM Scaling Ready</span>
              </div>
            </div>
          </div>

          {/* Right Column: Reference Govt Illustration Artwork */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-white group">
              <img
                src={heroImg}
                alt="Government of India Architectural Illustration"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[11px] font-bold text-orange-300 uppercase tracking-widest">
                  PILOT-TO-PROCUREMENT MECHANISM
                </span>
                <p className="text-base font-black mt-1">
                  Startups → Pilots → Evidence → PREP → Procurement
                </p>
                <p className="text-xs text-gray-300 mt-1">
                  Government of India · Ministry of Commerce &amp; Industry Initiative
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Important Statistics / Highlight Strip */}
      <section className="bg-navy-950 text-white py-6 border-y border-navy-900">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-navy-800">
          <div className="px-2">
            <p className="text-2xl sm:text-3xl font-black text-fiik-orange">4-Party</p>
            <p className="text-xs text-gray-300 font-semibold mt-1">Stakeholder Governance</p>
          </div>
          <div className="px-2">
            <p className="text-2xl sm:text-3xl font-black text-green-400">100%</p>
            <p className="text-xs text-gray-300 font-semibold mt-1">Verified Evidence Ledger</p>
          </div>
          <div className="px-2">
            <p className="text-2xl sm:text-3xl font-black text-blue-400">PREP</p>
            <p className="text-xs text-gray-300 font-semibold mt-1">Portable Passport Record</p>
          </div>
          <div className="px-2">
            <p className="text-2xl sm:text-3xl font-black text-amber-400">Scale-Up</p>
            <p className="text-xs text-gray-300 font-semibold mt-1">Cross-Dept &amp; GeM Adoption</p>
          </div>
        </div>
      </section>

      {/* SIH Problem Statement & Stakeholders Section */}
      <section id="about" className="py-14 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Problem Statement Card */}
            <div className="lg:col-span-6 bg-gradient-to-br from-orange-50/90 via-white to-amber-50/50 border-2 border-orange-200/80 rounded-2xl p-7 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-10 w-10 rounded-xl bg-fiik-orange text-white flex items-center justify-center font-bold text-xl shadow-sm">
                    📄
                  </span>
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-fiik-orangeDark bg-orange-100 px-2.5 py-0.5 rounded-full">
                      NATIONAL GOVERNANCE MANDATE
                    </span>
                    <h3 className="text-base font-extrabold text-navy-950 mt-1">
                      Pilot Mechanism for Government &amp; Startups
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-gray-800 font-medium leading-relaxed italic bg-white/80 p-4 rounded-xl border border-orange-100">
                  &ldquo;A standardized mechanism for government departments to pilot innovative
                  solutions with startups, evaluate their performance, and enable faster procurement
                  of proven solutions.&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-orange-200/60 flex items-center justify-between text-xs text-gray-600">
                <span className="font-bold text-navy-950">Target Outcome:</span>
                <span className="font-semibold text-fiik-orangeDark">Evidence-Backed Procurement</span>
              </div>
            </div>

            {/* Stakeholders Card */}
            <div className="lg:col-span-6 bg-white border border-gray-200 rounded-2xl p-7 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                  <h3 className="text-base font-bold text-navy-950">Key Stakeholders in FIIK</h3>
                  <span className="text-xs font-semibold text-gray-400">4-Party Alignment</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {stakeholders.map((s) => (
                    <div key={s.key} className="p-3.5 bg-gray-50/80 border border-gray-200/80 rounded-xl flex items-center gap-3 hover:bg-orange-50/40 transition-colors">
                      <span className="text-2xl">{stakeholderIcons[s.key] || '👥'}</span>
                      <div>
                        <p className="text-xs font-bold text-navy-950">{s.label}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">Participating Authority</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                <Link to="/role-selection" className="text-xs font-bold text-fiik-orange hover:underline flex items-center gap-1">
                  <span>Select Your Stakeholder Role</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Key Pillars of FIIK */}
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

      {/* Visual Workflow Journey: Problem → PREP → Procurement */}
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

          {/* Workflow Note Banner */}
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

      {/* Why FIIK / Bridging the Missing Middle */}
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

      {/* Portal Footer */}
      <footer id="contact" className="gov-header-top text-white">
        <div className="tricolor-bar" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-navy-900 text-xs">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-8 w-8 rounded bg-fiik-orange text-white flex items-center justify-center font-black text-sm">
                F
              </span>
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
