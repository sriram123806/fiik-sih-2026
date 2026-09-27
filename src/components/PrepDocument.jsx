import React from 'react';

export default function PrepDocument({ pilotId = 'FIIK-PILOT-024', issueDate = '20 Feb 2026', compact = false }) {
  return (
    <div
      className={`bg-white border-2 border-orange-200 rounded-2xl p-6 shadow-md relative overflow-hidden text-center flex flex-col items-center ${
        compact ? 'max-w-xs' : 'max-w-sm'
      }`}
    >
      <div className="tricolor-bar absolute top-0 left-0 right-0 h-1.5" />
      <div className="mt-2 flex items-center justify-center gap-2">
        <span className="h-8 w-8 rounded bg-navy-950 text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
          F
        </span>
        <span className="font-black text-navy-950 text-xl tracking-tight">FIIK</span>
      </div>

      <div className="mt-3">
        <span className="inline-block text-[10px] font-black uppercase tracking-wider text-fiik-orange bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
          Official Passport Credential
        </span>
        <h3 className="text-base font-extrabold text-navy-950 mt-2 leading-snug">
          Pilot Performance Record (PREP)
        </h3>
        <p className="text-[11px] text-gray-500 font-semibold mt-0.5">
          Procurement Readiness Evidence Passport
        </p>
      </div>

      <div className="my-4 p-3 bg-gradient-to-br from-orange-50/50 via-white to-green-50/50 rounded-xl border border-gray-100 w-full text-xs space-y-1 text-gray-600">
        <div className="flex justify-between">
          <span>Pilot ID:</span>
          <strong className="text-navy-950">{pilotId}</strong>
        </div>
        <div className="flex justify-between">
          <span>Issue Date:</span>
          <strong className="text-navy-950">{issueDate}</strong>
        </div>
        <div className="flex justify-between">
          <span>Verification:</span>
          <strong className="text-green-700">✓ Digital Hash Verified</strong>
        </div>
      </div>

      {/* Simulated QR Code & Badge */}
      <div className="flex items-center justify-center gap-4 w-full pt-2 border-t border-gray-100">
        <div className="h-16 w-16 bg-gray-900 rounded-lg p-1.5 flex flex-col justify-between text-[8px] text-white font-mono leading-none">
          <div className="flex justify-between"><span>■■</span><span>■■</span></div>
          <div className="text-center font-bold">QR VERIFY</div>
          <div className="flex justify-between"><span>■■</span><span>■■</span></div>
        </div>
        <div className="text-left">
          <span className="inline-block text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200 mb-1">
            PREP VERIFIED
          </span>
          <p className="text-[10px] text-gray-400 leading-tight">
            Reusable across all Govt Departments & GeM
          </p>
        </div>
      </div>
    </div>
  );
}
