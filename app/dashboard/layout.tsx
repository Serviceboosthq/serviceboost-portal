import Image from "next/image"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* SIDEBAR */}
      <div
        style={{
          width: 240,
          background: "#111827",
          padding: 20,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* LOGO */}
        <div style={{ marginBottom: 40 }}>
          <Image
            src="/logo.png"
            alt="ServiceBoost Logo"
            width={140}
            height={60}
          />
        </div>

        {/* NAVIGATION */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <a href="/dashboard" style={{ color: "#cbd5e1", textDecoration: "none" }}>
            Executive Dashboard
          </a>

          <a href="/dashboard/technicians" style={{ color: "#cbd5e1", textDecoration: "none" }}>
            Technicians
          </a>

          <a href="/dashboard/branches" style={{ color: "#cbd5e1", textDecoration: "none" }}>
            Branches
          </a>

          <a href="/dashboard/bonuses" style={{ color: "#cbd5e1", textDecoration: "none" }}>
            Bonuses
          </a>

          <a href="/dashboard/accounts-receivable" style={{ color: "#cbd5e1", textDecoration: "none" }}>
            Accounts Receivable
          </a>

          <a href="/dashboard/settings" style={{ color: "#cbd5e1", textDecoration: "none" }}>
            Settings
          </a>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: 40 }}>
        {children}
      </div>
    </div>
  )
}