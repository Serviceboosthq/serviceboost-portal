export const metadata = {
  title: "ServiceBoost Pro",
  description: "Veteran-Owned Revenue Protection Software",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "Inter, Arial, sans-serif",
          backgroundColor: "#0f172a",
          color: "#f8fafc",
        }}
      >
        {children}
      </body>
    </html>
  )
}