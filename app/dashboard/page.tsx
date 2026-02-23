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
    // Fetch monthly scores
    const { data: scores } = await supabase
      .from("monthly_scores")
      .select("*")
      .eq("month", selectedMonth)
      .eq("year", selectedYear)

    if (scores && scores.length > 0) {
      const avg =
        scores.reduce