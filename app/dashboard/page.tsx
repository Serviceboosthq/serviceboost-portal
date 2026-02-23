"use client"

import Link from "next/link"

export default function Dashboard() {

  const averagePerformance = 0
  const revenueAtRisk = 4625
  const accountsInEscalation = 0

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* SIDEBAR */}
      <div className="w-64 bg-slate-900/80 backdrop-blur-xl border-r border-slate-800 p-6">

        <img src="/logo.png" className="h-10 mb-10" />

        <nav className="space-y-4 text-slate-300">
          <Link href="#" className="block hover:text-white">Executive Dashboard</Link>
          <Link href="#" className="block hover:text-white">Technicians</Link>
          <Link href="#" className="block hover:text-white">Branches</Link>
          <Link href="#" className="block hover:text-white">Bonuses</Link>
          <Link href="#" className="block hover:text-white">Accounts Receivable</Link>
          <Link href="#" className="block hover:text-white">Settings</Link>
        </nav>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-10">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-10">

          <div>

            <h1 className="text-4xl font-bold">
              Executive Dashboard
            </h1>

            <p className="text-slate-400 mt-2">
              Multi-Branch Revenue Control Center
            </p>

            {/* MONTH / YEAR */}
            <div className="mt-6 flex items-center gap-3">

              <select className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white">
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i}>{`Month ${i + 1}`}</option>
                ))}
              </select>

              <select className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white">
                <option>2025</option>
                <option>2026</option>
                <option>2027</option>
              </select>

            </div>

          </div>

          {/* RIGHT SIDE HEADER BLOCKS */}
          <div className="flex items-center gap-6">

            {/* Weather */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-3 shadow-md text-right">
              <p className="text-xs text-slate-400">Weather</p>
              <p className="text-2xl font-bold">59°F</p>
              <p className="text-slate-400 text-sm">Clear</p>
            </div>

            {/* Google Rating */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-3 shadow-md text-right">
              <p className="text-xs text-slate-400">Google Rating</p>
              <div className="flex items-center justify-end gap-2">
                <span className="text-yellow-400">★</span>
                <span className="text-2xl font-bold">4.8</span>
              </div>
              <p className="text-slate-400 text-sm">312 Reviews</p>
            </div>

          </div>

        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
            <p className="text-slate-400 text-sm">Average Performance</p>
            <p className="text-3xl font-bold mt-2">{averagePerformance}</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
            <p className="text-slate-400 text-sm">Revenue at Risk</p>
            <p className="text-3xl font-bold mt-2">${revenueAtRisk}</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
            <p className="text-slate-400 text-sm">Accounts in Escalation</p>
            <p className="text-3xl font-bold mt-2">{accountsInEscalation}</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
            <p className="text-slate-400 text-sm">Technicians</p>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>

        </div>

        {/* PERFORMANCE TABLE */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6">Performance Overview</h2>
          <p className="text-slate-400">No technician data available.</p>
        </div>

      </div>
    </div>
  )
}