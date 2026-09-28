import React from 'react';
import prepScalingImg from '../assets/prep-scaling.png';

export default function PrepDocument({
  pilotId = 'FIIK-PILOT-024',
  issueDate = '20 Feb 2026',
  startup = 'GreenGrid Technologies Pvt. Ltd.',
  department = 'Department of Urban Development, Maharashtra',
  score = '94.8% A+ (Field Proven)',
  compact = false,
}) {
  return (
    <div
      className={`bg-white border-4 border-[#071A3D] rounded-2xl shadow-2xl overflow-hidden relative font-sans text-left ${
        compact ? 'max-w-md w-full' : 'max-w-2xl w-full'
      }`}
    >
      {/* ── National Tricolor Security Ribbon ── */}
      <div className="tricolor-bar h-2 w-full" />

      {/* ── Passport Header Banner ── */}
      <div className="bg-[#071A3D] text-white p-5 sm:p-6 border-b-2 border-navy-900 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 rounded-xl bg-[#F36C21] text-white font-black text-xl flex items-center justify-center shadow-md">
            F
          </span>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 block">
              FIIK PILOT INTELLIGENCE PROTOCOL
            </span>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight leading-none mt-0.5">
              PREP PASSPORT
            </h2>
            <p className="text-[10px] text-gray-300 font-semibold mt-0.5">
              Procurement Readiness Evidence Passport
            </p>
          </div>
        </div>

        {/* Verification Hologram Badge */}
        <div className="bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 px-3.5 py-1.5 rounded-xl text-center shadow-inner">
          <span className="text-[9px] font-black uppercase tracking-widest block text-emerald-200">
            SECURITY VERIFIED
          </span>
          <span className="text-xs font-black text-white block">
            ✓ 100% SLA SATISFIED
          </span>
        </div>
      </div>

      {/* ── Credential Body ── */}
      <div className="p-5 sm:p-6 space-y-4 text-xs bg-[#FFFDF9]">
        
        {/* Document ID & Status Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-white border border-gray-200 rounded-xl shadow-xs">
          <div>
            <span className="block text-[10px] font-bold text-gray-400 uppercase">Passport ID</span>
            <span className="font-black text-[#071A3D] font-mono text-xs">{pilotId}</span>
          </div>
          <div>
            <span className="block text-[10px] font-bold text-gray-400 uppercase">Issue Date</span>
            <span className="font-bold text-gray-800 text-xs">{issueDate}</span>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="block text-[10px] font-bold text-gray-400 uppercase">Evaluation Grade</span>
            <span className="font-black text-emerald-700 text-xs">{score}</span>
          </div>
        </div>

        {/* Entity Particulars */}
        <div className="grid sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-blue-50/60 border border-blue-200 rounded-xl">
            <span className="text-[10px] font-black uppercase text-blue-900 block tracking-wider">
              🚀 Verified Startup Innovator
            </span>
            <p className="font-black text-navy-950 text-xs mt-1">{startup}</p>
            <p className="text-[11px] text-gray-600 mt-0.5">DPIIT Recognition: DPIIT-123456-MH</p>
          </div>

          <div className="p-3.5 bg-orange-50/60 border border-orange-200 rounded-xl">
            <span className="text-[10px] font-black uppercase text-orange-900 block tracking-wider">
              🏛️ Piloting Department
            </span>
            <p className="font-black text-navy-950 text-xs mt-1">{department}</p>
            <p className="text-[11px] text-gray-600 mt-0.5">Jurisdiction: Pune Municipal Corporation</p>
          </div>
        </div>

        {/* Tested Innovation & Outcome Scope */}
        <div className="p-3.5 bg-white border border-gray-200 rounded-xl text-xs space-y-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase block">
            Tested Pilot Solution &amp; Scope
          </span>
          <p className="font-extrabold text-navy-950">
            Smart Waste Segregation &amp; Telemetry System (IoT Sensor Array)
          </p>
          <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
            Automated optical segregation across 2 municipal wards, achieving 94.8% accuracy and 38% reduction in secondary sorting costs over 6 months of continuous operation.
          </p>
        </div>

        {/* Digital Signature & QR Verification Hash */}
        <div className="p-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 bg-[#071A3D] text-white rounded-lg p-1.5 flex flex-col justify-between text-[7px] font-mono leading-none shadow-sm">
              <div className="flex justify-between"><span>■■</span><span>■■</span></div>
              <div className="text-center font-bold text-[8px] text-orange-400">QR CODE</div>
              <div className="flex justify-between"><span>■■</span><span>■■</span></div>
            </div>
            <div>
              <p className="text-xs font-black text-navy-950">Cryptographic Hash</p>
              <p className="text-[10px] text-gray-500 font-mono">0x7f8a9b2c...4d3e2f1a</p>
              <p className="text-[10px] text-emerald-700 font-bold mt-0.5">
                ✓ Validated in MSInS State Pilot Registry
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold text-gray-400 uppercase block">Procurement Suitability</span>
            <span className="inline-block bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow-xs mt-0.5">
              RECOMMENDED FOR DIRECT GeM SCALING
            </span>
          </div>
        </div>

      </div>

      {/* ── Footer Security Bar ── */}
      <div className="bg-gray-100 px-5 py-2.5 border-t border-gray-200 text-[10px] text-gray-500 flex items-center justify-between font-medium">
        <span>FIIK Standardized Evidence Format</span>
        <span className="font-bold text-navy-950">Portable Across All Departments &amp; GeM</span>
      </div>
    </div>
  );
}
