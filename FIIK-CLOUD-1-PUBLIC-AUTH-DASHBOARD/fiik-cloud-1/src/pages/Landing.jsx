import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { stakeholders, pillars, howItWorks } from '../data/mockData'

const pillarColor = {
  orange: 'bg-orange-50 text-fiik-orange border-orange-100',
  blue: 'bg-blue-50 text-fiik-blue border-blue-100',
  green: 'bg-green-50 text-fiik-green border-green-100',
  purple: 'bg-purple-50 text-fiik-purple border-purple-100',
  teal: 'bg-teal-50 text-fiik-teal border-teal-100'
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Header variant="public" />

      {/* Hero */}
      <section className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-14 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-2 w-6 bg-fiik-orange rounded-sm" />
              <span className="h-2 w-2 bg-indiagreen rounded-sm" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-navy-950 leading-tight">
              FIIK
              <span className="block text-2xl sm:text-3xl font-bold text-gray-700 mt-2">
                Pilot Intelligence &amp; Evidence Infrastructure
              </span>
            </h1>
            <p className="mt-5 text-xl font-semibold text-navy-900">
              From Pilot to Procurement — a verified path for startups.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed max-w-xl">
              A government-aligned platform to plan, execute, evaluate and document startup pilots,
              and convert completed pilot evidence into procurement-ready, reusable records.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/login"
                className="bg-fiik-orange hover:bg-fiik-orangeDark text-white font-semibold px-6 py-3 rounded-md transition-colors focus-ring"
              >
                Explore the Platform →
              </Link>
              <a
                href="#how-it-works"
                className="border border-gray-300 hover:border-navy-900 text-navy-950 font-semibold px-6 py-3 rounded-md transition-colors focus-ring"
              >
                Know More
              </a>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-card bg-gradient-to-br from-orange-50 via-white to-green-50 h-64 lg:h-80 flex items-center justify-center">
            <div className="text-center px-6">
              <p className="text-sm uppercase tracking-wide text-gray-400 mb-2">Pilot-to-procurement infrastructure</p>
              <p className="text-navy-950 font-semibold">Startups → Pilots → Evidence → PREP → Procurement</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem statement */}
      <section id="about" className="border-b border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-6">
          <div className="bg-white border border-orange-100 rounded-xl p-6 shadow-card flex gap-4">
            <span className="h-10 w-10 rounded-lg bg-orange-50 text-fiik-orange flex items-center justify-center shrink-0">📄</span>
            <div>
              <span className="inline-block text-xs font-semibold text-fiik-orange bg-orange-50 px-2 py-0.5 rounded mb-2">
                SIH26136 · Selected Problem Statement
              </span>
              <p className="text-navy-950 font-medium leading-relaxed">
                To design and develop a mechanism for government departments to pilot innovative
                solutions with startups, evaluate their performance, and enable faster procurement
                of proven solutions.
              </p>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-card">
            <h2 className="font-semibold text-navy-950 mb-4">Key Stakeholders</h2>
            <div className="grid grid-cols-2 gap-4">
              {stakeholders.map((s) => (
                <div key={s.key} className="flex items-start gap-2">
                  <span className="text-fiik-orange mt-0.5">●</span>
                  <span className="text-sm text-gray-600">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section id="features" className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-navy-950 text-center">Key Pillars of FIIK</h2>
        <p className="text-gray-500 text-center mt-2 max-w-xl mx-auto">
          A structured pilot-to-procurement ecosystem for government and startups.
        </p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {pillars.map((p) => (
            <div key={p.key} className={`border rounded-xl p-5 ${pillarColor[p.color]}`}>
              <p className="font-semibold text-navy-950 text-sm mb-2">{p.label}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why FIIK */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-navy-950 text-center mb-8">Why FIIK?</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: '🛡️', text: 'Bridges the gap between pilots and procurement.' },
              { icon: '📈', text: 'Verified records instead of repeating evaluations.' },
              { icon: '✅', text: 'Builds trust, transparency and scalability for government adoption.' }
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-card">
                <div className="text-2xl mb-3">{item.icon}</div>
                <p className="text-sm text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-navy-950 text-center">How It Works</h2>
        <p className="text-gray-500 text-center mt-2">A simple, structured journey from problem to procurement.</p>
        <div className="mt-10 grid sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {howItWorks.map((step, i) => (
            <div key={step.key} className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-card">
              <div className="mx-auto mb-3 h-8 w-8 rounded-full bg-navy-950 text-white text-xs font-semibold flex items-center justify-center">
                {i + 1}
              </div>
              <p className="font-semibold text-navy-950 text-sm">{step.label}</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA / footer */}
      <footer id="contact" className="gov-header-top text-white">
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Ready to explore FIIK?</h3>
            <p className="text-white/70 text-sm mt-1">
              Join the government-startup pilot ecosystem for a stronger, innovation-driven India.
            </p>
          </div>
          <Link
            to="/login"
            className="bg-fiik-orange hover:bg-fiik-orangeDark text-white font-semibold px-6 py-3 rounded-md transition-colors focus-ring shrink-0"
          >
            Explore the Platform →
          </Link>
        </div>
      </footer>
    </div>
  )
}
