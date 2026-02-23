"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function DashboardPage() {
  const today = new Date()

  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(today.getFullYear())

  const [averagePerformance, setAveragePerformance] = useState<number | null>(null)
  const [revenueAtRisk, setRevenueAtRisk] = useState<number | null>(null)
  const [accountsInEscalation, setAccountsInEscalation] = useState<number | null>(null)
  const [performanceRows, setPerformanceRows] = useState<any[]>([])

  useEffect(() => {
    fetchDashboardData()
  }, [selectedMonth, selectedYear])

  async function fetchDashboardData() {
    const { data: scores } = await supabase
      .from("monthly_scores")
      .select("*")
      .eq("month", selectedMonth)
      .eq("year", selectedYear)

    if (scores && scores.length > 0) {
      const avg =
        scores.reduce((sum, row) => sum + (row.total_score || 0), 0) /
        scores.length

      setAveragePerformance(Number(avg.toFixed(1)))

      const escalationCount = scores.filter(
        (row) => row.total_score < 70
      ).length

      setAccountsInEscalation(escalationCount)
      setPerformanceRows(scores)
    } else {
      setAveragePerformance(0)
      setAccountsInEscalation(0)
      setPerformanceRows([])
    }

    const { data: ar } = await supabase
      .from("ar_accounts")
      .select("past_due_amount")

    if (ar) {
      const total = ar.reduce(
        (sum, row) => sum + (row.past_due_amount || 0),
        0
      )
      setRevenueAtRisk(total)
    }
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold">Executive Dashboard</h1>

      <div className="flex gap-4 mt-4">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="bg-slate-800 p-2 rounded"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              Month {i + 1}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="bg-slate-800 p-2 rounded"
        >
          {[2025, 2026, 2027].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-4 gap-6 mt-8">
        <div className="bg-slate-900 p-6 rounded">
          <p className="text-gray-400">Average Performance</p>
          <h2 className="text-2xl font-bold">
            {averagePerformance ?? "-"}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded">
          <p className="text-gray-400">Revenue at Risk</p>
          <h2 className="text-2xl font-bold">
            ${revenueAtRisk ?? 0}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded">
          <p className="text-gray-400">Accounts in Escalation</p>
          <h2 className="text-2xl font-bold">
            {accountsInEscalation ?? 0}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded">
          <p className="text-gray-400">Technicians</p>
          <h2 className="text-2xl font-bold">
            {performanceRows.length}
          </h2>
        </div>
      </div>

      <div className="bg-slate-900 mt-10 p-6 rounded">
        <h2 className="text-xl font-bold mb-4">
          Performance Overview
        </h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="pb-2">Technician</th>
              <th className="pb-2">Score</th>
              <th className="pb-2">Escalation</th>
            </tr>
          </thead>
          <tbody>
            {performanceRows.map((row) => (
              <tr key={row.id} className="border-b border-slate-800">
                <td className="py-3">{row.technician_id}</td>
                <td>{row.total_score}</td>
                <td>
                  {row.total_score < 70 ? (
                    <span className="text-red-400">Warning</span>
                  ) : (
                    <span className="text-green-400">None</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}