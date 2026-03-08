/* ============================================================
   AAZ Portfolio V4 — Home Page (Phase 1 placeholder)
   Phase 3 (Hero) and Phase 5 (Pages) will build this out.
   ============================================================ */

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 8vw, 8rem)', color: 'var(--accent)' }}>
        AAZ
      </h1>
      <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-1)', fontSize: '0.875rem' }}>
        Alessandro Schillaci — Phase 1 Foundation Active
      </p>
    </main>
  )
}
