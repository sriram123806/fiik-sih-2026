import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import HeroCarousel from '../components/HeroCarousel';
import { stakeholders, pillars } from '../data/mockData';

// Image imports
import govtBuildingImg from '../assets/govt-building.png';
import startupTeamImg from '../assets/startup-team.png';
import collaborationMeetingImg from '../assets/collaboration-meeting.jpg';
import techAiImg from '../assets/tech-ai-interface.jpg';
import procurementLegalImg from '../assets/procurement-legal.jpg';

const HOW_IT_WORKS_STAGES = [
  {
    step: 1,
    title: 'Requirement & Pilot Definition',
    subtitle: 'Department posts verified problem challenge with baseline KPIs.',
    details:
      'Nodal Department publishes open problem statement with clear baseline metrics, target ward/jurisdiction, and escrow budget allocation. MSInS approves pilot scope.',
    stakeholders: ['🏛️ Government Department', '🛡️ MSInS'],
    icon: '📋',
    color: '#E05625',
  },
  {
    step: 2,
    title: 'Four-Party Governance Review',
    subtitle: 'Multi-stakeholder consensus on deliverables and milestones.',
    details:
      'Startup, Department Nodal Officer, Empanelled Technical Evaluator, and MSInS convene. All 4 parties legally sign off on milestones, SLA targets, and telemetry requirements.',
    stakeholders: ['🚀 Startup', '🏛️ Dept', '👥 Evaluator', '🛡️ MSInS'],
    icon: '⚖️',
    color: '#1D70B8',
  },
  {
    step: 3,
    title: 'Standardized Work Order',
    subtitle: 'Binding pilot agreement with escrow-backed milestone grants.',
    details:
      'FIIK generates a tamper-evident standardized pilot agreement. Grant funding is locked in an escrow structure released strictly upon verified milestone sign-offs.',
    stakeholders: ['🛡️ MSInS Secretariat', '🚀 Startup'],
    icon: '📝',
    color: '#7C4DFF',
  },
  {
    step: 4,
    title: 'Field Execution & Telemetry',
    subtitle: 'Real-world deployment with immutable evidence ledger.',
    details:
      'Startup deploys technology on ground. Live IoT telemetry, ward-level geofenced photos, performance logs, and municipal logs are continuously streamed into the Evidence Ledger.',
    stakeholders: ['🚀 Startup Innovator', '📡 IoT / Telemetry'],
    icon: '🚀',
    color: '#0D9488',
  },
  {
    step: 5,
    title: 'Evaluator Field Audit',
    subtitle: 'Empanelled technical expert verifies telemetry and on-site outcomes.',
    details:
      'Empanelled expert performs on-site audit, validates telemetry accuracy against municipal logs, interviews local officials, and submits an independent evaluation scorecard.',
    stakeholders: ['👥 Technical Evaluator (Dr. Rao)', '🏛️ Field Officer'],
    icon: '🔍',
    color: '#1E8549',
  },
  {
    step: 6,
    title: 'PREP & Direct Procurement',
    subtitle: 'Milestone payout released & verified PREP Passport generated.',
    details:
      'Completed pilot receives official PREP (Procurement Readiness Evidence Passport). Enables immediate direct procurement across GeM and seamless reuse by any state department.',
    stakeholders: ['🛂 PREP Registry', '⚖️ GeM / CPPP Scaling'],
    icon: '🛂',
    color: '#D99A00',
  },
];

export default function Landing() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <div className="min-h-screen bg-[#F4F6F8] text-gray-900 font-sans selection:bg-orange-500 selection:text-white">
      {/* ── 1. Global Government Header ── */}
      <Header variant="public" />

      {/* ── 2. Hero Image Carousel (High-Contrast Navy & Image Slider) ── */}
      <HeroCarousel />

      {/* ── 3. Strategic Metrics Strip (Deep Blue #0B2A5B) ── */}
      <section className="bg-[#0B2A5B] text-white py-8 border-y border-blue-900/80 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-blue-800/60">
          <div className="pt-2 sm:pt-0">
            <p className="text-3xl sm:text-4xl font-black text-[#F36C21] tracking-tight">4-Party</p>
            <p className="text-xs text-gray-300 font-bold mt-1 uppercase tracking-wider">
              Governance Protocol
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">Startup · Dept · Evaluator · MSInS</p>
          </div>
          <div className="pt-2 sm:pt-0">
            <p className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">100%</p>
            <p className="text-xs text-gray-300 font-bold mt-1 uppercase tracking-wider">
              Verified Evidence Ledger
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">Tamper-evident telemetry &amp; audits</p>
          </div>
          <div className="pt-2 sm:pt-0">
            <p className="text-3xl sm:text-4xl font-black text-amber-300 tracking-tight">PREP</p>
            <p className="text-xs text-gray-300 font-bold mt-1 uppercase tracking-wider">
              Procurement Passport
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">Portable across departments &amp; GeM</p>
          </div>
          <div className="pt-2 sm:pt-0">
            <p className="text-3xl sm:text-4xl font-black text-cyan-400 tracking-tight">Zero</p>
            <p className="text-xs text-gray-300 font-bold mt-1 uppercase tracking-wider">
              Redundant Pilot Trials
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">Single audit, nationwide scale</p>
          </div>
        </div>
      </section>

      {/* ── 4. Problem Statement & Government Mandate (White Section) ── */}
      <section id="about" className="py-14 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Official Problem Statement Callout */}
            <div className="lg:col-span-7 bg-[#FFFDF9] border-2 border-orange-300/80 rounded-2xl p-7 sm:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/50 rounded-full -mr-10 -mt-10 pointer-events-none" />
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[#071A3D] text-white text-xs font-black px-3 py-1 rounded-md tracking-wider">
                    SIH 26136
                  </span>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#D94F0B]">
                    Smart India Hackathon · Government of India
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight leading-snug">
                  To design and develop a mechanism for government departments to pilot innovative solutions with startups, evaluate their performance, and enable faster procurement of proven solutions.
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-4 leading-relaxed font-medium">
                  Currently, when a startup completes a successful pilot in one municipal corporation or department, that evidence is lost in paper files. FIIK bridges this &ldquo;missing middle&rdquo; by standardizing pilot governance and generating verifiable PREP credentials.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-orange-200/60 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-gray-700">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                  <span>Target Outcome: Evidence-Backed Public Procurement</span>
                </span>
                <span className="text-[#D94F0B]">Ministry Alignment: Commerce &amp; Industry</span>
              </div>
            </div>

            {/* Right: The Solution Structure */}
            <div className="lg:col-span-5 bg-[#071A3D] text-white rounded-2xl p-7 sm:p-8 shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 block mb-2">
                  FIIK ARCHITECTURE
                </span>
                <h3 className="text-xl font-black tracking-tight text-white">
                  Bridging the &ldquo;Missing Middle&rdquo;
                </h3>
                <p className="text-xs text-gray-300 mt-2.5 leading-relaxed">
                  Moving innovative tech from competitive hackathons into institutional public procurement:
                </p>

                <div className="mt-5 space-y-3">
                  <div className="flex items-start gap-3 bg-white/10 p-3 rounded-xl border border-white/10">
                    <span className="text-lg text-orange-400 shrink-0">①</span>
                    <div>
                      <p className="text-xs font-bold text-white">Standardized 4-Party Pilot Contracts</p>
                      <p className="text-[11px] text-gray-300 mt-0.5">Pre-agreed milestones, SLAs, and escrow funding.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/10 p-3 rounded-xl border border-white/10">
                    <span className="text-lg text-emerald-400 shrink-0">②</span>
                    <div>
                      <p className="text-xs font-bold text-white">Tamper-Proof Evidence Ledger</p>
                      <p className="text-[11px] text-gray-300 mt-0.5">IoT telemetry, geofenced logs &amp; expert audits.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/10 p-3 rounded-xl border border-white/10">
                    <span className="text-lg text-amber-400 shrink-0">③</span>
                    <div>
                      <p className="text-xs font-bold text-white">Portable PREP Passport</p>
                      <p className="text-[11px] text-gray-300 mt-0.5">Verified digital credential for direct GeM scale-up.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/15 flex justify-end">
                <Link
                  to="/login"
                  className="text-xs font-bold text-orange-300 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <span>Explore Role Dashboards</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 5. Interactive "How FIIK Works" Timeline (Visual & Interactive) ── */}
      <section id="how-it-works" className="py-16 bg-[#F4F6F8] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#D94F0B] bg-orange-100 border border-orange-200 px-3.5 py-1 rounded-full">
              SEQUENTIAL GOVERNANCE TIMELINE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-950 mt-3 tracking-tight">
              How FIIK Works: From Problem to Procurement
            </h2>
            <p className="text-sm text-gray-600 mt-2 font-medium">
              Click on any stage below to inspect the governance protocols, participating stakeholders, and validation criteria.
            </p>
          </div>

          {/* Interactive Horizontal Stepper (Desktop) / Vertical (Mobile) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {HOW_IT_WORKS_STAGES.map((st, idx) => {
              const isSelected = activeStage === idx;
              return (
                <button
                  key={st.step}
                  onClick={() => setActiveStage(idx)}
                  className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-navy-950 shadow-lg scale-[1.03] ring-2 ring-orange-500/30'
                      : 'bg-white border-gray-200 hover:border-gray-400 hover:shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="h-7 w-7 rounded-lg text-white font-black text-xs flex items-center justify-center shadow-sm"
                        style={{ backgroundColor: st.color }}
                      >
                        {st.step}
                      </span>
                      <span className="text-lg">{st.icon}</span>
                    </div>
                    <h3 className="text-xs font-black text-navy-950 leading-snug">{st.title}</h3>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] font-bold">
                    <span className={isSelected ? 'text-[#D94F0B]' : 'text-gray-400'}>
                      {isSelected ? '● Active View' : 'Inspect'}
                    </span>
                    <span className="text-gray-400">→</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Deep-Dive Panel */}
          {(() => {
            const cur = HOW_IT_WORKS_STAGES[activeStage];
            return (
              <div className="bg-white border-2 border-navy-950 rounded-2xl p-6 sm:p-8 shadow-xl grid md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="px-3 py-1 rounded-md text-white text-xs font-black tracking-wider uppercase"
                      style={{ backgroundColor: cur.color }}
                    >
                      STAGE {cur.step} PROTOCOL
                    </span>
                    <span className="text-xs font-bold text-gray-500">{cur.title}</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight">
                    {cur.subtitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-700 mt-3 leading-relaxed font-medium">
                    {cur.details}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-black text-navy-950 uppercase tracking-wider mr-2">
                      Sign-Off Authorities:
                    </span>
                    {cur.stakeholders.map((sh, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs font-bold bg-gray-100 border border-gray-300 text-gray-800 px-3 py-1 rounded-lg"
                      >
                        {sh}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-4 bg-[#071A3D] text-white p-6 rounded-xl border border-navy-900 flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest block mb-1">
                      FIIK ENFORCEMENT
                    </span>
                    <p className="text-xs font-bold text-gray-200">
                      Sequential Gate: Next stage unlocks strictly upon 100% prerequisite completion.
                    </p>
                  </div>
                  <Link
                    to="/login"
                    className="mt-4 bg-[#F36C21] hover:bg-[#D94F0B] text-white text-xs font-extrabold py-2.5 px-4 rounded-lg text-center transition-colors shadow"
                  >
                    Simulate Stage in Demo →
                  </Link>
                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* ── 6. Four-Party Stakeholder Portals Section (High-Contrast Colored Cards) ── */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#071A3D] bg-gray-100 border border-gray-300 px-3.5 py-1 rounded-full">
              4-PARTY GOVERNANCE ROLES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-950 mt-3 tracking-tight">
              Dedicated Portals for Every Stakeholder
            </h2>
            <p className="text-sm text-gray-600 mt-2 font-medium">
              FIIK assigns distinct responsibilities, telemetry permissions, and verification rights to each actor in the pilot lifecycle.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Startup Portal Card (Blue) */}
            <div className="bg-[#EBF5FF] border-2 border-blue-300 rounded-2xl overflow-hidden shadow-card hover:shadow-xl transition-all flex flex-col justify-between group">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-white border border-blue-200 flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">
                    🚀
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-300 px-2.5 py-0.5 rounded-full">
                    BLUE PORTAL
                  </span>
                </div>
                <h3 className="text-lg font-black text-navy-950">Startup Innovator</h3>
                <p className="text-xs text-gray-700 mt-2 leading-relaxed font-medium">
                  Discover open government challenges, execute work orders, upload sensor telemetry, and claim milestone escrow payouts.
                </p>
              </div>
              <div className="p-6 pt-0">
                <Link
                  to="/role-selection"
                  className="w-full bg-[#1D70B8] hover:bg-[#15568f] text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow"
                >
                  <span>Enter Startup Portal</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Government Department Card (Orange) */}
            <div className="bg-[#FDF5EC] border-2 border-orange-300 rounded-2xl overflow-hidden shadow-card hover:shadow-xl transition-all flex flex-col justify-between group">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-white border border-orange-200 flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">
                    🏛️
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-orange-100 text-orange-800 border border-orange-300 px-2.5 py-0.5 rounded-full">
                    ORANGE PORTAL
                  </span>
                </div>
                <h3 className="text-lg font-black text-navy-950">Government Department</h3>
                <p className="text-xs text-gray-700 mt-2 leading-relaxed font-medium">
                  Post municipal problem statements, monitor ward-level deployment progress, inspect evaluator reports, and initiate GeM procurement.
                </p>
              </div>
              <div className="p-6 pt-0">
                <Link
                  to="/role-selection"
                  className="w-full bg-[#E05625] hover:bg-[#c6471c] text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow"
                >
                  <span>Enter Govt Portal</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Technical Evaluator Card (Green) */}
            <div className="bg-[#EAF7ED] border-2 border-green-300 rounded-2xl overflow-hidden shadow-card hover:shadow-xl transition-all flex flex-col justify-between group">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-white border border-green-200 flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">
                    👥
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-green-100 text-green-800 border border-green-300 px-2.5 py-0.5 rounded-full">
                    GREEN PORTAL
                  </span>
                </div>
                <h3 className="text-lg font-black text-navy-950">Technical Evaluator</h3>
                <p className="text-xs text-gray-700 mt-2 leading-relaxed font-medium">
                  Empanelled MSInS technical experts perform on-site audits, inspect IoT sensor accuracy, interview beneficiaries, and score milestones.
                </p>
              </div>
              <div className="p-6 pt-0">
                <Link
                  to="/role-selection"
                  className="w-full bg-[#1E8549] hover:bg-[#166738] text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow"
                >
                  <span>Enter Evaluator Portal</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* MSInS Admin Authority Card (Purple) */}
            <div className="bg-[#F3EBFB] border-2 border-purple-300 rounded-2xl overflow-hidden shadow-card hover:shadow-xl transition-all flex flex-col justify-between group">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-white border border-purple-200 flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">
                    🛡️
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-300 px-2.5 py-0.5 rounded-full">
                    PURPLE PORTAL
                  </span>
                </div>
                <h3 className="text-lg font-black text-navy-950">MSInS Nodal Authority</h3>
                <p className="text-xs text-gray-700 mt-2 leading-relaxed font-medium">
                  State innovation secretariat issues standardized work orders, manages escrow disbursements, and publishes verified PREP Passports.
                </p>
              </div>
              <div className="p-6 pt-0">
                <Link
                  to="/role-selection"
                  className="w-full bg-[#7C4DFF] hover:bg-[#6232d6] text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow"
                >
                  <span>Enter MSInS Portal</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 7. FIIK Core 5 Pillars (Varied Layout with High-Contrast Highlights) ── */}
      <section id="features" className="py-16 bg-[#071A3D] text-white border-b border-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-orange-400 bg-orange-500/20 border border-orange-400/40 px-3.5 py-1 rounded-full">
              FIIK ARCHITECTURAL FOUNDATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 tracking-tight">
              The 5 Core Pillars of FIIK
            </h2>
            <p className="text-sm text-gray-300 mt-2 font-medium">
              Eliminating redundant evaluations, ensuring institutional accountability, and building government trust.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            
            {/* Pillar 1: Large Feature Card (Pilot Visibility) */}
            <div className="lg:col-span-8 bg-[#0B2A5B] border-2 border-blue-400/40 rounded-2xl p-7 sm:p-8 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">👁️</span>
                  <span className="text-xs font-black uppercase tracking-wider text-cyan-300 bg-cyan-900/60 border border-cyan-500/40 px-3 py-1 rounded-full">
                    PILLAR 01 · SYSTEM TRANSPARENCY
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Real-Time Pilot Visibility &amp; Telemetry
                </h3>
                <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                  Eliminating the &ldquo;black box&rdquo; of pilot trials. Every milestone generates verifiable data points: sensor uptime logs, ward deployment photos, municipal officer endorsements, and technical evaluator audit notes accessible by all 4 stakeholders simultaneously.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xl font-black text-cyan-300">Live</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Telemetry Stream</p>
                </div>
                <div>
                  <p className="text-xl font-black text-emerald-300">Geofenced</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Deployment Proofs</p>
                </div>
                <div>
                  <p className="text-xl font-black text-amber-300">Auditable</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Milestone Ledger</p>
                </div>
              </div>
            </div>

            {/* Pillar 2: Four-Party Governance (Medium Card) */}
            <div className="lg:col-span-4 bg-white text-navy-950 rounded-2xl p-7 shadow-xl flex flex-col justify-between border-2 border-white">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">⚖️</span>
                  <span className="text-xs font-black uppercase tracking-wider text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                    PILLAR 02
                  </span>
                </div>
                <h3 className="text-lg font-black text-navy-950">Four-Party Governance</h3>
                <p className="text-xs text-gray-600 mt-2.5 leading-relaxed font-medium">
                  Multi-stakeholder agreement ensuring unbiased technical evaluation, departmental buy-in, and state-level policy alignment from Day 1.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-gray-100 text-[11px] font-bold text-navy-900">
                ✓ Eliminates single-party veto &amp; procurement bias
              </div>
            </div>

            {/* Pillar 3: Evidence Ledger (Medium Card) */}
            <div className="lg:col-span-4 bg-white text-navy-950 rounded-2xl p-7 shadow-xl flex flex-col justify-between border-2 border-white">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">📂</span>
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    PILLAR 03
                  </span>
                </div>
                <h3 className="text-lg font-black text-navy-950">Evidence Ledger</h3>
                <p className="text-xs text-gray-600 mt-2.5 leading-relaxed font-medium">
                  Structured evidence repository binding telemetry, test videos, sensor logs, and evaluator verification signatures into an immutable record.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-gray-100 text-[11px] font-bold text-navy-900">
                ✓ Cryptographic hash verification of proof files
              </div>
            </div>

            {/* Pillar 4: Highlighted PREP Card (Gold & Navy Spotlight) */}
            <div className="lg:col-span-8 bg-gradient-to-r from-[#071A3D] via-[#0B2A5B] to-[#123C73] border-2 border-amber-400 rounded-2xl p-7 sm:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/10 rounded-full -mr-12 -mt-12 pointer-events-none" />
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🛂</span>
                  <span className="text-xs font-black uppercase tracking-wider text-amber-300 bg-amber-500/20 border border-amber-400/40 px-3 py-1 rounded-full">
                    PILLAR 04 · FLAGSHIP OUTPUT
                  </span>
                </div>
                <h3 className="text-2xl font-black text-amber-300 tracking-tight">
                  Procurement Readiness Evidence Passport (PREP)
                </h3>
                <p className="text-sm text-gray-200 mt-3 leading-relaxed">
                  The verified digital certificate that converts completed pilot performance into standardized, procurement-ready proof. Other departments can inspect PREP credentials to procure solutions directly under GeM Rule 149 without re-running redundant field trials.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-amber-200">
                <span>Portable Across All 28 States &amp; Union Territories</span>
                <span className="text-emerald-400">✓ GeM Direct Procurement Ready</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 8. PREP Digital Credential Showcase (Visual Mock) ── */}
      <section className="py-16 bg-[#FFFDF9] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#D94F0B] bg-orange-100 border border-orange-200 px-3.5 py-1 rounded-full">
              PORTABLE VERIFICATION PASSPORT
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-950 mt-3 tracking-tight">
              Sample PREP Passport Credential
            </h2>
            <p className="text-sm text-gray-600 mt-2 font-medium">
              Every completed FIIK pilot generates an official Procurement Readiness Evidence Passport.
            </p>
          </div>

          {/* PREP Passport Card Visual */}
          <div className="max-w-3xl mx-auto bg-white border-4 border-navy-950 rounded-2xl shadow-2xl p-6 sm:p-8 relative">
            <div className="tricolor-bar absolute top-0 left-0 right-0 h-2 rounded-t-xl" />

            {/* Passport Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b-2 border-gray-200 mt-2">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                  GOVERNMENT OF MAHARASHTRA · MSInS PILOT MECHANISM
                </span>
                <h3 className="text-xl font-black text-navy-950 mt-0.5">
                  Procurement Readiness Evidence Passport (PREP)
                </h3>
                <p className="text-xs font-mono text-gray-600">ID: PREP-MH-2026-FIIK-024</p>
              </div>
              <div className="bg-emerald-50 border-2 border-emerald-500 text-emerald-800 px-4 py-2 rounded-xl text-center">
                <span className="text-xs font-black block">VERIFIED STATUS</span>
                <span className="text-sm font-black text-emerald-600">✓ A+ GRADE (94.8%)</span>
              </div>
            </div>

            {/* Passport Body Grid */}
            <div className="grid sm:grid-cols-2 gap-6 py-6 border-b border-gray-200 text-xs">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Startup Innovator</span>
                <p className="text-sm font-black text-navy-950 mt-0.5">GreenGrid Technologies Pvt. Ltd.</p>
                <p className="text-gray-500 font-medium">DPIIT: DPIIT-123456-MH</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Piloting Department</span>
                <p className="text-sm font-black text-navy-950 mt-0.5">Department of Urban Development</p>
                <p className="text-gray-500 font-medium">Location: Pune Municipal Corporation (Wards 12 &amp; 14)</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Tested Innovation</span>
                <p className="text-sm font-black text-navy-950 mt-0.5">Smart Waste Segregation &amp; Telemetry System</p>
                <p className="text-gray-500 font-medium">Domain: CleanTech &amp; Municipal IoT</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Technical Evaluator</span>
                <p className="text-sm font-black text-navy-950 mt-0.5">Dr. Ananya Rao, MSInS Empanelled Expert</p>
                <p className="text-gray-500 font-medium">Audit Date: 12 Feb 2026 · 100% SLA Satisfied</p>
              </div>
            </div>

            {/* Verification Footer */}
            <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-bold">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-navy-950 text-white rounded-lg flex items-center justify-center font-mono font-bold text-xs">
                  QR
                </div>
                <div>
                  <p className="text-navy-950 font-black">Digital Verification Hash</p>
                  <p className="text-[10px] text-gray-400 font-mono">0x7f8a9b...c4d3e2 (MSInS Registry)</p>
                </div>
              </div>
              <Link
                to="/completed-pilot"
                className="bg-[#071A3D] hover:bg-black text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-colors"
              >
                Inspect Live PREP Record →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── 9. Official Government Footer ── */}
      <footer id="contact" className="bg-[#071A3D] text-white">
        <div className="tricolor-bar" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-navy-900 text-xs">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="h-8 w-8 rounded-md bg-[#F36C21] text-white flex items-center justify-center font-black text-sm">
                F
              </span>
              <span className="font-black text-xl text-white tracking-tight">FIIK</span>
            </div>
            <p className="text-gray-300 leading-relaxed font-normal">
              Pilot Intelligence Procurement Mechanism for Startups and Government Departments.
            </p>
            <p className="text-orange-400 font-bold mt-2">Smart India Hackathon 2026 · Problem SIH 26136</p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">Navigation</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#about" className="hover:text-white">About Problem Statement</a></li>
              <li><a href="#how-it-works" className="hover:text-white">Sequential Timeline</a></li>
              <li><a href="#features" className="hover:text-white">5 Core Pillars</a></li>
              <li><Link to="/login" className="hover:text-white">Role Access Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">Governance Portals</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/role-selection" className="hover:text-white">Startup Innovator Portal</Link></li>
              <li><Link to="/role-selection" className="hover:text-white">Government Department Portal</Link></li>
              <li><Link to="/role-selection" className="hover:text-white">Technical Evaluator Portal</Link></li>
              <li><Link to="/role-selection" className="hover:text-white">MSInS Nodal Authority Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">Government Alignment</h4>
            <p className="text-gray-300 leading-relaxed">
              Designed in alignment with Startup India, MSInS Maharashtra, and GeM public procurement guidelines. Prototype implementation for SIH 2026 evaluation.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-400">
          <p>© 2026 FIIK Platform · Pilot Intelligence Procurement Mechanism · SIH 26136 Prototype</p>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer">Security Protocol</span>
            <span>|</span>
            <span className="hover:text-white cursor-pointer">Privacy Guidelines</span>
            <span>|</span>
            <span className="hover:text-white cursor-pointer">Helpdesk</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
