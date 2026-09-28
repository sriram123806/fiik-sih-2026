import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePilot } from '../context/PilotContext';

const CHAT_KNOWLEDGE_BASE = {
  startup: {
    greeting: "Hello Rahul! I am your FIIK Pilot Assistant. How can I help with GreenGrid's Smart Waste Segregation pilot?",
    chips: [
      "What is my next action?",
      "Required evidence for Milestone 2?",
      "What is PREP Passport?",
      "Why is my pilot waiting?"
    ],
    answers: {
      "What is my next action?": "Your active pilot (FIIK-PILOT-024) is currently in Milestone 2: Initial Performance Evaluation. Your next action is to submit performance data & photos under 'Submit Milestone Evidence'.",
      "Required evidence for Milestone 2?": "Required evidence includes: (1) Ward deployment photos (.zip), (2) Segregation accuracy report (.xlsx), (3) Field inspection video (.mp4), and (4) Local municipal officer endorsement (.pdf).",
      "What is PREP Passport?": "PREP (Procurement Readiness Evidence Passport) is an evidence-backed pilot performance record generated upon 100% milestone completion. It enables direct procurement scaling across other departments and GeM.",
      "Why is my pilot waiting?": "After submitting milestone evidence, it enters Technical Evaluator audit (Dr. Ananya Rao) and Department sign-off before milestone grant payment is disbursed."
    }
  },
  department: {
    greeting: "Welcome Nodal Officer! FIIK Assistant is ready to assist with Department of Urban Development pilots.",
    chips: [
      "Which proposals need review?",
      "Milestone sign-off process?",
      "View active department pilots",
      "What is PREP reuse?"
    ],
    answers: {
      "Which proposals need review?": "You have 1 pending proposal: Smart Waste Segregation System (GreenGrid Tech) under Four-Party Governance Review.",
      "Milestone sign-off process?": "Inspect submitted evidence & evaluator field audit notes under 'Field Evaluation', then click 'Confirm Department Milestone Sign-Off' to approve finance release.",
      "View active department pilots": "FIIK-PILOT-024 (Smart Waste Segregation) is currently at 45% progress across Pune Municipal Wards 12 & 14.",
      "What is PREP reuse?": "Once a pilot completes PREP verification, other municipal corporations (e.g. Coimbatore, Madurai) can inspect the proven results and initiate direct scale-up procurement."
    }
  },
  evaluator: {
    greeting: "Welcome Dr. Rao! FIIK Assistant is ready for technical evaluation & field visit audit assistance.",
    chips: [
      "Assigned evaluation tasks",
      "Field visit checklist",
      "Evidence verification criteria",
      "Technical audit standards"
    ],
    answers: {
      "Assigned evaluation tasks": "You are assigned to evaluate FIIK-PILOT-024 (Smart Waste Segregation System) for Milestone 2: Initial Performance Evaluation.",
      "Field visit checklist": "Checklist includes: (1) Technical feasibility, (2) Live sensor data validation, (3) On-site bin inspection, (4) Citizen feedback review, (5) Final recommendations.",
      "Evidence verification criteria": "Verify telemetry timestamps match municipal deployment logs, verify photo EXIF metadata, and confirm segregation accuracy exceeds baseline targets (>40%).",
      "Technical audit standards": "FIIK technical audits require zero uncaught exceptions in data, dual-signature from field officer, and complete compliance matrix sign-off."
    }
  },
  admin: {
    greeting: "Welcome MSInS Admin! FIIK Nodal Authority Secretariat AI Assistant is online.",
    chips: [
      "Work order publication queue",
      "Startup verification status",
      "System-wide pilot metrics",
      "Issue PREP Passport"
    ],
    answers: {
      "Work order publication queue": "Work Order FIIK-PILOT-024 has received Department and Evaluator sign-offs and is ready for official publication.",
      "Startup verification status": "GreenGrid Technologies Pvt. Ltd. is verified via DPIIT database (PAN: AAECG1234F).",
      "System-wide pilot metrics": "24 Startups Verified · 6 Work Orders Published · 4 Active Pilots in Execution · 12 PREP Passports Issued.",
      "Issue PREP Passport": "Navigate to PREP Generation after Milestone 5 completion to digitally sign and issue the portable PREP credential."
    }
  }
};

const PUBLIC_ROUTES = ['/', '/login', '/role-selection', '/select-role', '/verify-role'];

export default function FiikChatbot() {
  const { role } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const activeRole = role || 'startup';
  const roleKB = CHAT_KNOWLEDGE_BASE[activeRole] || CHAT_KNOWLEDGE_BASE.startup;

  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: roleKB.greeting }
  ]);
  const [input, setInput] = useState('');

  // Hide chatbot on public and auth routes per requirement 8
  if (PUBLIC_ROUTES.includes(location.pathname)) {
    return null;
  }

  const handleSend = (queryText) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Assistant response lookup
    setTimeout(() => {
      const matchKey = Object.keys(roleKB.answers).find(
        (key) => key.toLowerCase() === textToSend.trim().toLowerCase()
      );
      const botResponse = matchKey
        ? roleKB.answers[matchKey]
        : `FIIK Assistant: Regarding "${textToSend}", your current active phase is tracked under sequential FIIK governance rules. Refer to your role navigation for verified status.`;

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: botResponse }
      ]);
    }, 400);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-navy-950 hover:bg-black text-white text-xs font-bold px-4 py-3 rounded-full shadow-2xl border-2 border-orange-500/80 flex items-center gap-2.5 transition-all hover:scale-105 cursor-pointer focus-ring"
        >
          <span className="h-3 w-3 rounded-full bg-fiik-orange animate-ping" />
          <span className="text-base">💬</span>
          <span>Ask FIIK Assistant</span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="bg-white border-2 border-navy-950 rounded-2xl shadow-2xl w-80 sm:w-96 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-[#071A3D] text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="h-7 w-7 rounded-lg bg-[#F36C21] text-white flex items-center justify-center text-sm font-black shadow-sm">
                F
              </span>
              <div>
                <h4 className="text-xs font-extrabold text-white">FIIK Pilot Assistant</h4>
                <p className="text-[10px] text-orange-300 font-semibold uppercase tracking-wider">
                  {activeRole} operations context
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white text-sm font-bold p-1 cursor-pointer"
              aria-label="Close Assistant"
            >
              ✕
            </button>
          </div>

          {/* Messages Body */}
          <div className="p-4 h-72 overflow-y-auto space-y-3 bg-gray-50/50 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3.5 py-2.5 leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-fiik-orange text-white font-medium shadow-sm'
                      : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Action Chips */}
          <div className="px-3 py-2 bg-white border-t border-gray-100 flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
            {roleKB.chips.map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className="text-[10px] font-semibold bg-orange-50 text-fiik-orangeDark border border-orange-200 hover:bg-orange-100 px-2 py-1 rounded-md text-left transition-colors cursor-pointer"
              >
                + {chip}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-gray-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask FIIK (${activeRole} context)...`}
              className="flex-1 text-xs border border-gray-300 rounded-lg px-3 py-2 focus-ring"
            />
            <button
              type="submit"
              className="bg-navy-950 hover:bg-black text-white text-xs font-bold px-3 py-2 rounded-lg transition-all shadow-sm focus-ring"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
