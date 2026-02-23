'use client'

import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type WeatherState =
  | { status: 'idle' | 'loading' }
  | { status: 'ready'; tempF: number; description: string }
  | { status: 'error'; message: string }

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)

  // KPI values (top cards)
  const [avgPerf, setAvgPerf] = useState<number | null>(null)
  const [revenueAtRisk, setRevenueAtRisk] = useState<number | null>(null)
  const [accountsInEsc, setAccountsInEsc] = useState<number | null>(null)
  const [branchesMonitored, setBranchesMonitored] = useState<number | null>(null)

  // Company display
  const [companyName, setCompanyName] = useState<string>('Demo Pest Control')

  // Performance Overview (table)
  const [overviewRows, setOverviewRows] = useState<
    Array<{
      technician?: string
      name?: string
      branch?: string
      score?: number
      escalation?: string
    }>
  >([])

  // Google rating from your DB (google_rating_summary)
  const [googleRating, setGoogleRating] = useState<{ rating: number; total_reviews: number } | null>(null)

  // Live weather (no key)
  const [weather, setWeather] = useState<WeatherState>({ status: 'loading' })

  // Default coords (can wire to branch/company settings later)
  // This is just a placeholder until we store branch lat/lon in DB.
  const DEFAULT_LAT = 34.0336
  const DEFAULT_LON = -117.0431

  const styles = useMemo(() => {
    const card: React.CSSProperties = {
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 14,
      padding: 18,
      boxShadow: '0 10px 24px rgba(0,0,0,0.25)',
      backdropFilter: 'blur(10px)',
    }

    return {
      page: {
        padding: 28,
        maxWidth: 1200,
      } as React.CSSProperties,
      headerRow: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 18,
      } as React.CSSProperties,
      titleWrap: {
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      } as React.CSSProperties,
      title: {
        fontSize: 38,
        fontWeight: 800,
        letterSpacing: -0.6,
        margin: 0,
      } as React.CSSProperties,
      subtitle: {
        margin: 0,
        color: 'rgba(255,255,255,0.65)',
        fontSize: 14,
      } as React.CSSProperties,
      rightHeader: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        alignItems: 'flex-end',
        minWidth: 320,
      } as React.CSSProperties,
      companyPill: {
        ...card,
        padding: '10px 14px',
        borderRadius: 12,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'space-between',
        minWidth: 260,
      } as React.CSSProperties,
      companyPillText: {
        margin: 0,
        fontSize: 14,
        color: 'rgba(255,255,255,0.85)',
      } as React.CSSProperties,

      headerWidgetsRow: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10,
        width: '100%',
      } as React.CSSProperties,

      widgetCard: {
        ...card,
        padding: 14,
        borderRadius: 12,
        minHeight: 64,
      } as React.CSSProperties,
      widgetTitle: {
        margin: 0,
        fontSize: 12,
        color: 'rgba(255,255,255,0.65)',
        fontWeight: 600,
      } as React.CSSProperties,
      widgetValue: {
        marginTop: 6,
        fontSize: 18,
        fontWeight: 800,
      } as React.CSSProperties,
      widgetSub: {
        marginTop: 2,
        fontSize: 12,
        color: 'rgba(255,255,255,0.7)',
      } as React.CSSProperties,

      kpiGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        gap: 14,
        marginTop: 14,
        marginBottom: 16,
      } as React.CSSProperties,
      kpiCard: { ...card } as React.CSSProperties,
      kpiLabel: {
        margin: 0,
        fontSize: 12,
        color: 'rgba(255,255,255,0.65)',
        fontWeight: 600,
      } as React.CSSProperties,
      kpiValue: {
        marginTop: 10,
        fontSize: 28,
        fontWeight: 900,
        letterSpacing: -0.4,
      } as React.CSSProperties,
      sectionCard: {
        ...card,
        padding: 20,
        borderRadius: 16,
      } as React.CSSProperties,
      sectionTitle: {
        margin: 0,
        fontSize: 26,
        fontWeight: 900,
        letterSpacing: -0.3,
      } as React.CSSProperties,
      tableWrap: {
        marginTop: 12,
        overflowX: 'auto',
      } as React.CSSProperties,
      table: {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: 14,
      } as React.CSSProperties,
      th: {
        textAlign: 'left',
        fontSize: 12,
        color: 'rgba(255,255,255,0.65)',
        fontWeight: 700,
        padding: '10px 10px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      } as React.CSSProperties,
      td: {
        padding: '12px 10px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        color: 'rgba(255,255,255,0.9)',
      } as React.CSSProperties,
      pill: (bg: string, fg: string): React.CSSProperties => ({
        display: 'inline-block',
        padding: '6px 10px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 800,
        background: bg,
        color: fg,
        border: '1px solid rgba(255,255,255,0.08)',
      }),
    }
  }, [])

  useEffect(() => {
    void loadDashboard()
    void loadGoogleRating()
    void loadWeather(DEFAULT_LAT, DEFAULT_LON)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function loadDashboard() {
    setLoading(true)

    try {
      // Company name (your companies table uses company_name)
      const { data: companies } = await supabase
        .from('companies')
        .select('id, company_name')
        .order('created_at', { ascending: true })
        .limit(1)

      if (companies?.[0]?.company_name) setCompanyName(companies[0].company_name)

      // KPI: pull from your rollup views/tables
      // 1) supervisor_monthly_rollup (or your monthly rollup equivalent)
      const { data: sup } = await supabase
        .from('supervisor_monthly_rollup')
        .select('*')
        .order('month', { ascending: false })
        .limit(1)

      const supRow: any = sup?.[0]

      // Avg Performance
      const perfVal =
        typeof supRow?.avg_team_performance === 'number'
          ? supRow.avg_team_performance
          : typeof supRow?.avg_team_performance_ytd === 'number'
          ? supRow.avg_team_performance_ytd
          : null
      setAvgPerf(perfVal)

      // Sales (we don’t show as a KPI card in your screenshot, but we keep data available)
      // Safety is shown in your newer layout cards, but your screenshot uses “Revenue at Risk / Escalation / Branches Monitored”.
      // Revenue at Risk: read from ar_accounts table
      const { data: arRows } = await supabase
        .from('ar_accounts')
        .select('past_due_amount, days_past_due')

      const totalRisk =
        (arRows || []).reduce((sum: number, r: any) => sum + (Number(r.past_due_amount) || 0), 0) || 0

      const escalationCount =
        (arRows || []).filter((r: any) => (Number(r.days_past_due) || 0) >= 90).length || 0

      setRevenueAtRisk(totalRisk)
      setAccountsInEsc(escalationCount)

      // Branches monitored (branches table, count)
      const { count: branchCount } = await supabase
        .from('branches')
        .select('*', { count: 'exact', head: true })

      setBranchesMonitored(branchCount ?? 0)

      // Performance Overview (table) — pull from technician_leaderboard view
      const { data: lb } = await supabase
        .from('technician_leaderboard')
        .select('*')
        .order('month', { ascending: false })
        .limit(25)

      const rows = (lb || []).map((r: any) => ({
        technician: r.name ?? r.technician ?? 'Technician',
        branch: r.branch_name ?? r.branch ?? 'Branch',
        score: typeof r.performance_score === 'number' ? r.performance_score : (r.score ?? null),
        escalation: r.escalation_level_text ?? r.escalation ?? 'None',
      }))

      setOverviewRows(rows)
    } finally {
      setLoading(false)
    }
  }

  async function loadGoogleRating() {
    // from your google_rating_summary table/view
    const { data } = await supabase.from('google_rating_summary').select('*').limit(1)
    const r: any = data?.[0]
    if (r && typeof r.rating === 'number' && typeof r.total_reviews === 'number') {
      setGoogleRating({ rating: r.rating, total_reviews: r.total_reviews })
    } else {
      // fallback sample if empty
      setGoogleRating({ rating: 4.8, total_reviews: 312 })
    }
  }

  async function loadWeather(lat: number, lon: number) {
    setWeather({ status: 'loading' })

    try {
      // Open-Meteo: no API key required
      const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${encodeURIComponent(lat)}` +
        `&longitude=${encodeURIComponent(lon)}` +
        `&current=temperature_2m,weather_code` +
        `&temperature_unit=fahrenheit`

      const res = await fetch(url)
      if (!res.ok) throw new Error('Weather service unavailable')
      const json: any = await res.json()

      const tempF = Number(json?.current?.temperature_2m)
      const code = Number(json?.current?.weather_code)

      const description = weatherCodeToText(code)
      if (Number.isFinite(tempF)) {
        setWeather({ status: 'ready', tempF, description })
      } else {
        setWeather({ status: 'error', message: 'Weather not available' })
      }
    } catch (e: any) {
      setWeather({ status: 'error', message: e?.message || 'Weather error' })
    }
  }

  const escPill = (text: string) => {
    const t = (text || '').toLowerCase()
    if (t.includes('final')) return styles.pill('rgba(239,68,68,0.16)', 'rgba(239,68,68,0.95)')
    if (t.includes('warn')) return styles.pill('rgba(245,158,11,0.18)', 'rgba(245,158,11,0.95)')
    return styles.pill('rgba(34,197,94,0.16)', 'rgba(34,197,94,0.95)')
  }

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.headerRow}>
        <div style={styles.titleWrap}>
          <h1 style={styles.title}>Executive Dashboard</h1>
          <p style={styles.subtitle}>Multi-Branch Revenue Control Center</p>
        </div>

        <div style={styles.rightHeader}>
          <div style={styles.companyPill}>
            <p style={styles.companyPillText}>
              <strong>Company:</strong> {companyName}
            </p>
          </div>

          {/* WEATHER + GOOGLE cards (top right beside title area) */}
          <div style={styles.headerWidgetsRow}>
            <div style={styles.widgetCard}>
              <p style={styles.widgetTitle}>Weather</p>
              {weather.status === 'loading' && <div style={styles.widgetSub}>Loading…</div>}
              {weather.status === 'error' && <div style={styles.widgetSub}>{weather.message}</div>}
              {weather.status === 'ready' && (
                <>
                  <div style={styles.widgetValue}>{Math.round(weather.tempF)}°F</div>
                  <div style={styles.widgetSub}>{weather.description}</div>
                </>
              )}
            </div>

            <div style={styles.widgetCard}>
              <p style={styles.widgetTitle}>Google Rating</p>
              {googleRating ? (
                <>
                  <div style={styles.widgetValue}>⭐ {googleRating.rating.toFixed(1)}</div>
                  <div style={styles.widgetSub}>{googleRating.total_reviews.toLocaleString()} reviews</div>
                </>
              ) : (
                <div style={styles.widgetSub}>Loading…</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* KPI CARDS */}
      <div style={styles.kpiGrid}>
        <div style={styles.kpiCard}>
          <p style={styles.kpiLabel}>Average Performance</p>
          <div style={styles.kpiValue}>{avgPerf == null ? '—' : avgPerf.toFixed(1)}</div>
        </div>

        <div style={styles.kpiCard}>
          <p style={styles.kpiLabel}>Revenue at Risk</p>
          <div style={styles.kpiValue}>
            {revenueAtRisk == null ? '—' : `$${Math.round(revenueAtRisk).toLocaleString()}`}
          </div>
        </div>

        <div style={styles.kpiCard}>
          <p style={styles.kpiLabel}>Accounts in Escalation</p>
          <div style={styles.kpiValue}>{accountsInEsc == null ? '—' : accountsInEsc}</div>
        </div>

        <div style={styles.kpiCard}>
          <p style={styles.kpiLabel}>Branches Monitored</p>
          <div style={styles.kpiValue}>{branchesMonitored == null ? '—' : branchesMonitored}</div>
        </div>
      </div>

      {/* PERFORMANCE OVERVIEW */}
      <div style={styles.sectionCard}>
        <h2 style={styles.sectionTitle}>Performance Overview</h2>

        {loading ? (
          <div style={{ marginTop: 14, color: 'rgba(255,255,255,0.7)' }}>Loading…</div>
        ) : (
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Technician</th>
                  <th style={styles.th}>Branch</th>
                  <th style={styles.th}>Score</th>
                  <th style={styles.th}>Escalation</th>
                </tr>
              </thead>
              <tbody>
                {overviewRows.length === 0 ? (
                  <tr>
                    <td style={styles.td} colSpan={4}>
                      No performance rows found yet.
                    </td>
                  </tr>
                ) : (
                  overviewRows.slice(0, 10).map((r, idx) => (
                    <tr key={idx}>
                      <td style={styles.td}>{r.technician || r.name || 'Technician'}</td>
                      <td style={styles.td}>{r.branch || 'Branch'}</td>
                      <td style={styles.td}>{typeof r.score === 'number' ? Math.round(r.score) : '—'}</td>
                      <td style={styles.td}>
                        <span style={escPill(r.escalation || 'None')}>{r.escalation || 'None'}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function weatherCodeToText(code: number) {
  // Open-Meteo weather codes
  if (code === 0) return 'Clear'
  if (code === 1 || code === 2) return 'Mostly Clear'
  if (code === 3) return 'Cloudy'
  if (code === 45 || code === 48) return 'Fog'
  if (code >= 51 && code <= 57) return 'Drizzle'
  if (code >= 61 && code <= 67) return 'Rain'
  if (code >= 71 && code <= 77) return 'Snow'
  if (code >= 80 && code <= 82) return 'Rain Showers'
  if (code >= 95) return 'Thunderstorms'
  return 'Weather'
}