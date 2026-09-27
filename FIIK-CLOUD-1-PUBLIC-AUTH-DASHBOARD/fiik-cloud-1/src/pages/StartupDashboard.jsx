import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { currentStartup, summaryCards, activePilot, notifications } from '../data/mockData'

function StageDot({ state }) {
  const styles = {
    done: 'bg-fiik-green text-white',
    current: 'bg-fiik-orange text-white ring-4 ring-orange-100',
    upcoming: 'bg-gray-200 text-gray-400'
  }
  return (
    <span className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${styles[state]}`}>
      {state === 'done' ? '✓' : ''}
    </span>
  )
}

export default function StartupDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header variant="dashboard" />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-6 py-8 max-w-6xl">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-navy-950">Welcome back, {currentStartup.contactName}</h1>
            <p className="text-sm text-gray-500 mt-0.5">{currentStartup.name} · {currentStartup.sector}</p>
          </div>

          {/* Summary cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {summaryCards.map((card) => (
              <div key={card.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-card">
                <p className="text-2xl font-bold text-navy-950">{card.value}</p>
                <p className="text-xs text-gray-500 mt-1">{card.label}</p>
              </div>
            ))}
          </div>

          {/* Active pilot */}
          <div className="mt-8 bg-white border border-gray-200 rounded-xl shadow-card overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-navy-950">Active Pilot</h2>
              <span className="text-xs font-medium text-fiik-orange bg-orange-50 px-2.5 py-1 rounded-full">
                {activePilot.status}
              </span>
            </div>
            <div className="px-6 py-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-navy-950">{activePilot.name}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{activePilot.department}</p>
                  <p className="text-xs text-gray-400 mt-1">Pilot ID: {activePilot.pilotId}</p>
                </div>
                <div className="text-sm text-gray-500 text-right">
                  <p>Start: <span className="text-gray-700 font-medium">{activePilot.startDate}</span></p>
                  <p>Expected end: <span className="text-gray-700 font-medium">{activePilot.expectedEndDate}</span></p>
                </div>
              </div>

              {/* Progress tracker */}
              <div className="mt-6 overflow-x-auto">
                <div className="flex items-center min-w-[600px]">
                  {activePilot.stages.map((stage, i) => (
                    <React.Fragment key={stage.key}>
                      <div className="flex flex-col items-center text-center w-24 shrink-0">
                        <StageDot state={stage.state} />
                        <p className={`text-[11px] mt-2 leading-tight ${stage.state === 'current' ? 'text-fiik-orangeDark font-semibold' : 'text-gray-500'}`}>
                          {stage.label}
                        </p>
                      </div>
                      {i < activePilot.stages.length - 1 && (
                        <span className={`h-0.5 flex-1 ${stage.state === 'upcoming' ? 'bg-gray-200' : 'bg-fiik-green'}`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Link
                  to="/dashboard/active-pilots"
                  className="bg-fiik-orange hover:bg-fiik-orangeDark text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors focus-ring"
                >
                  Continue Pilot →
                </Link>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="mt-8 bg-white border border-gray-200 rounded-xl shadow-card">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-navy-950">Recent Notifications</h2>
            </div>
            <ul className="divide-y divide-gray-100">
              {notifications.map((n) => (
                <li key={n.id} className="px-6 py-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-navy-950 font-medium">{n.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{n.context}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{n.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  )
}
