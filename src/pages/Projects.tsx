import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { projects } from '../data/content'
import type { Project } from '../data/content'
import ProjectCard from '../components/ui/ProjectCard'
import PageTransition from '../components/layout/PageTransition'
import Footer from '../components/layout/Footer'

type FilterType = 'Tout' | 'Web' | 'IA' | 'Motion' | 'Editorial'

const FILTER_TAGS: Record<FilterType, string[]> = {
  Tout: [],
  Web: ['Web Design', 'HTML/CSS', 'React', 'SEO', 'Figma'],
  IA: ['FastAPI', 'Ollama', 'Groq', 'Python', 'ComfyUI', 'WAN2.2', 'Docker', 'RTX 4070', 'MT5', 'Pandas', 'NumPy'],
  Motion: ['Motion', 'GSAP', 'Three.js', 'Identité'],
  Editorial: ['Editorial', 'InDesign', 'Typography', 'Photo Direction', 'Art Direction', 'Branding', 'Retouche', 'Lightroom'],
}

// Fixed grid config: col = CSS gridColumn, height in px, row for grouping
const GRID_CONFIG: Record<string, { col: string; row: string; height: string }> = {
  "01": { col: "1 / 8",  row: "1", height: "520px" }, // Pulse Digital
  "02": { col: "8 / 13", row: "1", height: "520px" }, // Direction Art
  "03": { col: "1 / 5",  row: "2", height: "460px" }, // Magazine
  "04": { col: "5 / 9",  row: "2", height: "460px" }, // Site RH
  "05": { col: "9 / 13", row: "2", height: "460px" }, // Site Asso
  "06": { col: "1 / 4",  row: "3", height: "480px" }, // Site Portfolio
  "07": { col: "4 / 10", row: "3", height: "480px" }, // Vision 2
  "08": { col: "10 / 13",row: "3", height: "480px" }, // Atlas Trading
  "06-b": { col: "1 / 7",  row: "4", height: "460px" }, // Site Client 4
  "06-c": { col: "7 / 13", row: "4", height: "460px" }, // Site Client 5
}

function filterProjects(type: FilterType): Project[] {
  if (type === 'Tout') return projects
  const tags = FILTER_TAGS[type]
  return projects.filter(p => p.tags.some(t => tags.some(ft => t.includes(ft))))
}

export default function Projects() {
  const [filter, setFilter] = useState<FilterType>('Tout')
  const [filtered, setFiltered] = useState<Project[]>(projects)
  const gridRef = useRef<HTMLDivElement>(null)

  const applyFilter = (type: FilterType) => {
    setFilter(type)
    const newProjects = filterProjects(type)
    if (gridRef.current && gridRef.current.children.length > 0) {
      gsap.to(Array.from(gridRef.current.children), {
        opacity: 0, scale: 0.97, duration: 0.2,
        onComplete: () => {
          setFiltered(newProjects)
          requestAnimationFrame(() => {
            if (gridRef.current) {
              gsap.fromTo(
                Array.from(gridRef.current.children),
                { opacity: 0, scale: 0.97 },
                { opacity: 1, scale: 1, duration: 0.4, stagger: 0.07, ease: 'power2.out' }
              )
            }
          })
        },
      })
    } else {
      setFiltered(newProjects)
    }
  }

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    gsap.fromTo(
      Array.from(el.children),
      { y: 35, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.3 }
    )
  }, [])

  return (
    <PageTransition>
      <main style={{ paddingTop: 52 }}>
        {/* Header */}
        <div style={{ padding: '5rem clamp(24px, 5vw, 80px) 3rem' }}>
          <div className="label" style={{ marginBottom: '1rem' }}>
            TRAVAUX & RÉALISATIONS · 2023—2025
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(52px, 9vw, 130px)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              color: 'var(--text-0)',
              marginBottom: '0.5rem',
            }}
          >
            <em style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              fontWeight: 400,
              letterSpacing: '-0.02em',
            }}>Mes</em>{' '}
            <span className="outline-accent">Projets</span>
          </h1>
        </div>

        {/* Filters */}
        <div
          style={{
            paddingInline: 'clamp(24px, 5vw, 80px)',
            paddingBottom: '2rem',
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
          }}
        >
          {(['Tout', 'Web', 'IA', 'Motion', 'Editorial'] as FilterType[]).map(type => (
            <button
              key={type}
              onClick={() => applyFilter(type)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                fontWeight: 400,
                color: filter === type ? 'var(--bg-0)' : 'var(--text-1)',
                background: filter === type ? 'var(--accent)' : 'transparent',
                border: filter === type ? '1px solid var(--accent)' : '1px solid var(--text-2)',
                padding: '7px 18px',
                borderRadius: 2,
                cursor: 'none',
                transition: 'background 0.2s, color 0.2s, border-color 0.2s',
              }}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Grid — fixed 12-col layout */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '2px',
            paddingInline: 2,
          }}
        >
          {filtered.map(project => {
            const cfg = GRID_CONFIG[project.id]
            return (
              <div
                key={project.id}
                style={{
                  gridColumn: cfg?.col ?? 'span 6',
                  gridRow: cfg?.row,
                }}
              >
                <ProjectCard project={project} height={cfg?.height ?? '480px'} />
              </div>
            )
          })}
        </div>

        <Footer />
      </main>
    </PageTransition>
  )
}
