"use client"

import { useState } from "react"

export default function DashboardPage() {
  const today = new Date()
  const [month, setMonth] = useState(today.getMonth() + 1)
  const [year, setYear] = useState(today.getFullYear())

  return (
    <div className="text-white">

      {/* Header Row */}
      <div className="flex justify-between items-start">

        {/* Left Title */}
        <div>
          <h1 className="text-4xl font-bold">Executive Dashboard</h1>
          <p className="text-slate-400 mt-2">
            Multi-Branch Revenue Control Center
          </p>

          {/* Month / Year Selector */}
          <div className="flex gap-3 mt-6">
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Month {i + 1}
                </option>
              ))}
            </select>

            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm"
            >
              <option>2025</option>
              <option>2026</option>
              <option>2027</option>
            </select>
          </div>
        </div>

        {/* Right Cards */}
        <div className="flex gap-4">

          <div className="bg-slate-800/60 rounded-xl p-6 w-56 shadow-lg">
            <p className="text-slate-400 text-sm">Company</p>
            <p className="text-lg font-semibold mt-1">
              Demo Pest Control
            </p>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-6 w-56 shadow-lg">
            <p className="text-slate-400 text-sm">Weather</p>
            <p className="text-2xl font-bold mt-1">59°F</p>
            <p className="text-sm text-slate-400">Clear</p>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-6 w-56 shadow-lg">
            <p className="text-slate-400 text-sm">Google Rating</p>
            <p className="text-2xl font-bold mt-1">4.8 ★</p>
            <p className="text-sm text-slate-400">312 reviews</p>
          </div>

        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-4 gap-6 mt-10">

        <div className="bg-slate-800/60 rounded-xl p-6 shadow-lg">
          <p className="text-slate-400 text-sm">Average Performance</p>
          <p className="text-3xl font-bold mt-2">3075.4</p>
        </div>

        <div className="bg-slate-800/60 rounded-xl p-6 shadow-lg">
          <p className="text-slate-400 text-sm">Revenue at Risk</p>
          <p className="text-3xl font-bold mt-2">$4,625</p>
        </div>

        <div className="bg-slate-800/60 rounded-xl p-6 shadow-lg">
          <p className="text-slate-400 text-sm">Accounts in Escalation</p>
          <p className="text-3xl font-bold mt-2">1</p>
        </div>

        <div className="bg-slate-800/60 rounded-xl p-6 shadow-lg">
          <p className="text-slate-400 text-sm">Branches Monitored</p>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

      </div>

      {/* Performance Overview */}
      <div className="bg-slate-800/60 rounded-xl p-8 mt-12 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">
          Performance Overview
        </h2>

        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-sm border-b border-slate-700">
              <th className="pb-3">Technician</th>
              <th className="pb-3">Branch</th>
              <th className="pb-3">Score</th>
              <th className="pb-3">Escalation</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-800">
              <td className="py-4">Amy Assistant</td>
              <td>Branch</td>
              <td>3075</td>
              <td>
                <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-xs">
                  None
                </span>
              </td>
            </tr>
            <tr>
              <td className="py-4">Amy Assistant</td>
              <td>Branch</td>
              <td>2473</td>
              <td>
                <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-xs">
                  None
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}