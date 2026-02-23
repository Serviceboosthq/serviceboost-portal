import "./globals.css"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "ServiceBoost Pro",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-[#0f172a] via-[#0b1e3a] to-[#0a1628] text-white">

        <div className="flex min-h-screen">

          {/* Sidebar */}
          <aside className="w-64 bg-[#0b1323] p-6 border-r border-slate-800">

            <div className="mb-10">
              <Image
                src="/serviceboost-logo.png"
                alt="ServiceBoost Pro"
                width={180}
                height={60}
              />
            </div>

            <nav className="space-y-4 text-slate-300 text-sm">
              <Link href="/dashboard" className="block hover:text-white">
                Executive Dashboard
              </Link>
              <Link href="#" className="block hover:text-white">
                Technicians
              </Link>
              <Link href="#" className="block hover:text-white">
                Branches
              </Link>
              <Link href="#" className="block hover:text-white">
                Bonuses
              </Link>
              <Link href="#" className="block hover:text-white">
                Accounts Receivable
              </Link>
              <Link href="#" className="block hover:text-white">
                Settings
              </Link>
            </nav>

          </aside>

          {/* Main Content */}
          <main className="flex-1 p-10">
            {children}
          </main>

        </div>

      </body>
    </html>
  )
}