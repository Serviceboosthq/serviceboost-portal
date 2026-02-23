"use client"

import { useEffect, useMemo, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function DashboardPage() {
  const today = useMemo(() => new Date(), [])
  const [month, setMonth] = useState<number>(today.getMonth() + 1)
  const [year, setYear] = useState<number>(today.getFullYear())

  const [avgScore, setAvgScore] = useState<number>(0)
  const [revenueAtRisk, setRevenueAtRisk] = useState<number>(0)
  const [escalations, setEscalations] = useState<number>(0)
  const [techCount, setTechCount] = useState<number>(0)

  // Static (per your request)
  const weatherTemp = "59°F"
  const weatherDesc = "Clear"
  const googleRating = "4.8"
  const googleReviews = "312"

  useEffect(() => {
    ;(async () => {
      // Monthly scores for selected month/year
      const { data: scores, error: scoresError } = await supabase
        .from("monthly_scores")
        .select("id,total_score")
        .eq("month", month)
        .eq("year", year)

      if (scoresError) {
        console.error("monthly_scores error:", scoresError)
      }

      const safeScores = scores ?? []
      setTechCount(safeScores.length)

      if (safeScores.length > 0) {
        const avg =
          safeScores.reduce((sum, r) => sum + (Number(r.total_score) || 0), 0) /
          safeScores.length
        setAvgScore(Number(avg.toFixed(1)))

        const esc = safeScores.filter((r) => (Number(r.total_score) || 0) < 70).length
        setEscalations(esc)
      } else {
        setAvgScore(0)
        setEscalations(0)
      }

      // AR revenue at risk (global for now)
      const { data: arRows, error: arError } = await supabase
        .from("ar_accounts")
        .select("past_due_amount")

      if (arError) {
        console.error("ar_accounts error:", arError)
      }

      const total = (arRows ?? []).reduce(
        (sum, r) => sum + (Number((r as any).past_due_amount) || 0),
        0
      )
      setRevenueAtRisk(Number(total.toFixed(0)))
    })()
  }, [month, year])

  return (
    <div className="p-10 text-white">
      {/* Header row: left title + selectors, right weather/google */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold">Executive Dashboard</h1>
          <p className="text-slate-400 mt-2">Multi-Branch Revenue Control Center</p>

          {/* Month / Year selector (added back, matches dark style) */}
          <div className="mt-6 flex items-center gap-3">
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white"
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
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white"
            >
              {[2025, 2026, 2027].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right side blocks (static) */}
        <div className="flex items-center gap-6">
          {/* Weather */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl px-6 py-4 shadow-md text-right">
            <p className="text-xs text-slate-400">Weather</p>
            <p className="text-3xl font-bold">{weatherTemp}</p>
            <p className="text-slate-400 text-sm">{weatherDesc}</p>
          </div>

          {/* Google */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl px-6 py-4 shadow-md text-right">
            <p className="text-xs text-slate-400">Google Rating</p>
            <div className="flex items-center justify-end gap-2">
              <span className="text-yellow-400 text-xl">★</span>
              <span className="text-3xl font-bold">{googleRating}</span>
            </div>
            <p className="text-slate-400 text-sm">{googleReviews} Reviews</p>
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
          <p className="text-slate-400 text-sm">Average Performance</p>
          <p className="text-3xl font-bold mt-2">{avgScore}</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
          <p className="text-slate-400 text-sm">Revenue at Risk</p>
          <p className="text-3xl font-bold mt-2">${revenueAtRisk.toLocaleString()}</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
          <p className="text-slate-400 text-sm">Accounts in Escalation</p>
          <p className="text-3xl font-bold mt-2">{escalations}</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
          <p className="text-slate-400 text-sm">Technicians</p>
          <p className="text-3xl font-bold mt-2">{techCount}</p>
        </div>
      </div>

      {/* Table placeholder (keeps your layout consistent) */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-xl">
        <h2 className="text-2xl font-semibold mb-6">Performance Overview</h2>
        <p className="text-slate-400">
          Select a month/year above to refresh KPIs. (Table wiring next.)
        </p>
      </div>
    </div>
  )
}