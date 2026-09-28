import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import indiaGovtHero from '../assets/india-govt-hero.png';
import startupTeamImg from '../assets/startup-team.png';
import collaborationMeetingImg from '../assets/collaboration-meeting.jpg';
import techAiImg from '../assets/tech-ai-interface.jpg';
import procurementLegalImg from '../assets/procurement-legal.jpg';

const SLIDES = [
  {
    id: 1,
    badge: '🏛️ NATIONAL INNOVATION PILOT MECHANISM · SIH 26136',
    title: 'From Pilot to Procurement — A Verified Path for Startups',
    description:
      'A standardized government-startup pilot execution framework that captures verified milestone evidence, evaluates real-world performance, and converts completed pilots into portable procurement records.',
    image: indiaGovtHero,
    category: 'National Framework',
    stats: '4-Party Verified · Zero Redundant Trials',
    tag: 'Govt. of India Initiative',
  },
  {
    id: 2,
    badge: '🚀 STARTUP ECOSYSTEM & FIELD PROVING GROUND',
    title: 'Deploy Innovation in Government with Guaranteed Milestone Funding',
    description:
      'Empowering DPIIT and MSInS recognized startups to execute real-world pilots across municipal corporations and state departments with transparent work orders and milestone escrow payouts.',
    image: startupTeamImg,
    category: 'Startup Innovation',
    stats: 'DPIIT & MSInS Aligned · Milestone Escrow',
    tag: 'Startup Innovators',
  },
  {
    id: 3,
    badge: '⚖️ FOUR-PARTY GOVERNANCE & MULTI-STAKEHOLDER TRUST',
    title: 'Structured Accountability Between Startups, Departments & Evaluators',
    description:
      'Eliminate procurement disputes through structured four-party alignment. Startups, Nodal Departments, Empanelled Technical Experts, and MSInS sign off on clear milestones before execution begins.',
    image: collaborationMeetingImg,
    category: 'Four-Party Governance',
    stats: 'Multi-Stakeholder Sign-Off · 100% Transparent',
    tag: 'Institutional Trust',
  },
  {
    id: 4,
    badge: '⚡ REAL-TIME TELEMETRY & IMMUTABLE EVIDENCE LEDGER',
    title: 'Evidence-Backed Validation: Data, Telemetry & Field Inspections',
    description:
      'Capture tamper-proof sensor data, geofenced deployment logs, citizen feedback, and expert field audit reports in a centralized immutable ledger for every milestone.',
    image: techAiImg,
    category: 'Pilot Intelligence',
    stats: 'IoT & Telemetry · Geofenced Logs',
    tag: 'AI & Data Verification',
  },
  {
    id: 5,
    badge: '🛂 PORTABLE CREDENTIAL & CROSS-DEPARTMENT PROCUREMENT',
    title: 'PREP: Procurement Readiness Evidence Passport',
    description:
      'The single verifiable digital credential that proves your startup solution works. Once verified, PREP enables instant scaling and direct procurement across GeM and all state departments.',
    image: procurementLegalImg,
    category: 'PREP Passport',
    stats: 'Instant GeM Scaling · Portable Digital Passport',
    tag: 'Direct Procurement',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    if (isPaused) return;
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 6000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, isPaused]);

  const slide = SLIDES[current];

  return (
    <div
      className="relative bg-[#071A3D] text-white overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#123C73_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Main Slide Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[460px]">
          
          {/* Left Column: Slide Text */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Category / Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs font-black uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full bg-[#F36C21] animate-ping" />
                {slide.badge}
              </span>
            </div>

            {/* Slide Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white">
              {slide.title}
            </h1>

            {/* Slide Description */}
            <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl font-normal">
              {slide.description}
            </p>

            {/* Key Metric / Highlights Strip */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-bold text-gray-200">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/15">
                <span className="text-[#F36C21]">★</span>
                <span>{slide.stats}</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-500/20 px-3.5 py-1.5 rounded-lg border border-emerald-400/30 text-emerald-300">
                <span>✓</span>
                <span>{slide.tag}</span>
              </div>
            </div>

            {/* Action Buttons: Only ONE primary "Explore Platform" in whole page, plus Know More */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/login"
                className="bg-[#F36C21] hover:bg-[#D94F0B] text-white font-extrabold text-sm px-7 py-3.5 rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore Platform</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <a
                href="#how-it-works"
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-6 py-3.5 rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>How FIIK Works</span>
                <span>↓</span>
              </a>
            </div>
          </div>

          {/* Right Column: Slide Image with Premium Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-navy-950 aspect-[4/3] group">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/90 via-transparent to-transparent flex flex-col justify-end p-5">
                <div className="flex items-center justify-between text-xs text-gray-200">
                  <span className="font-extrabold text-orange-400 uppercase tracking-wider">{slide.category}</span>
                  <span className="bg-black/60 px-2.5 py-1 rounded text-[10px] font-mono">
                    Slide {current + 1} of {SLIDES.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Live Badge */}
            <div className="absolute -bottom-3 -left-3 bg-[#0B2A5B] border border-blue-400/40 text-white px-4 py-2 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-bold">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>SIH 26136 Prototype Live</span>
            </div>
          </div>

        </div>

        {/* Carousel Bottom Controls */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          
          {/* Indicators / Progress Pills */}
          <div className="flex items-center gap-2">
            {SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrent(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  current === idx ? 'w-10 bg-[#F36C21]' : 'w-2.5 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Quick Slide Tabs for Direct Access */}
          <div className="hidden md:flex items-center gap-1.5 text-xs font-bold text-gray-300">
            {SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrent(idx)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  current === idx
                    ? 'bg-white/20 text-white border border-white/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {s.category}
              </button>
            ))}
          </div>

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="h-9 w-9 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white text-sm transition-all cursor-pointer"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="h-9 w-9 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white text-sm transition-all cursor-pointer"
            >
              →
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
