export default function Home() {
  return (
    <div>

      {/* HEADER */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        borderBottom: "1px solid #1e293b"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          <img src="/logo.png" alt="ServiceBoost Pro" style={{ height: 45 }} />
          <div>
            <div style={{ fontWeight: "bold" }}>ServiceBoost Pro</div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>
              Veteran-Owned
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 15 }}>
          <a href="/dashboard" style={{
            backgroundColor: "#dc2626",
            padding: "10px 20px",
            borderRadius: 6,
            color: "white",
            textDecoration: "none",
            fontWeight: "bold"
          }}>
            Request Demo
          </a>
          <a href="/dashboard" style={{
            border: "1px solid #334155",
            padding: "10px 20px",
            borderRadius: 6,
            color: "white",
            textDecoration: "none"
          }}>
            Login
          </a>
        </div>
      </header>

      {/* HERO */}
      <section style={{
        textAlign: "center",
        padding: "100px 40px"
      }}>
        <h1 style={{ fontSize: 46, marginBottom: 20 }}>
          Operational Control for Pest Control Companies.
        </h1>
        <p style={{
          maxWidth: 800,
          margin: "0 auto 30px",
          color: "#94a3b8",
          fontSize: 20
        }}>
          See revenue at risk before it becomes loss.  
          Enforce accountability across every branch.  
          Automate AR reminders and seasonal revenue prompts.
        </p>
      </section>

      {/* AUTHORITY SECTION */}
      <section style={{
        textAlign: "center",
        padding: "60px 40px",
        borderTop: "1px solid #1e293b"
      }}>
        <h2>Built From 25+ Years in Pest Control Operations</h2>
        <p style={{
          maxWidth: 850,
          margin: "20px auto",
          color: "#94a3b8",
          fontSize: 18
        }}>
          ServiceBoost Pro wasn’t created by software engineers guessing at industry problems.  
          It was built by a pest control regional leader with over 25 years of operational experience —
          managing branches, technicians, cancellations, AR exposure, QA failures, and revenue accountability.
        </p>

        <p style={{ fontWeight: "bold" }}>
          This is not theory.  
          This is operational reality turned into software.
        </p>
      </section>

    </div>
  )
}