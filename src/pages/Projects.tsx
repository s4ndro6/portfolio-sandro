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
  IA: ['FastAPI', 'Ollama', 'Groq', 'Python', 'ComfyUI', 'WAN2.2', 'Docker'],
  Motion: ['Motion', 'GSAP', 'Three.js'],
  Editorial: ['Editorial', 'InDesign', 'Typography', 'Photo Direction', 'Art Direction', 'Branding'],
}

const HEIGHT_MAP: Record<string, string> = {
  large: '56vh',
  medium: '48vh',
  small: '40vh',
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
                { opacity: 1, scale: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out' }
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
        <div style={{ padding: '5rem 80px 3rem' }}>
          <div className="label" style={{ marginBottom: '1rem' }}>
            TRAVAUX & RÉALISATIONS · 2023—2025
          </div>
          <div style={{ overflow: 'hidden', marginBottom: '2.5rem' }}>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(64px, 11vw, 11vw)',
                lineHeight: 0.92,
                letterSpacing: '-0.03em',
                color: 'var(--text-0)',
              }}
            >
              MES
            </h1>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <h1
              className="outline"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(64px, 11vw, 11vw)',
                lineHeight: 0.92,
                letterSpacing: '-0.03em',
              }}
            >
              PROJETS
            </h1>
          </div>
        </div>

        {/* Filters */}
        <div
          style={{
            paddingInline: 80,
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

        {/* Grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '2px',
            paddingInline: 2,
          }}
        >
          {filtered.map((project, i) => {
            const span = project.size === 'large' ? 7 : project.size === 'medium' ? 5 : 5
            const alt = i % 2 === 0
            return (
              <div
                key={project.id}
                style={{
                  gridColumn: `span ${alt && project.size !== 'small' ? 12 - span : span}`,
                }}
              >
                <ProjectCard project={project} height={HEIGHT_MAP[project.size]} />
              </div>
            )
          })}
        </div>

        <Footer />
      </main>
    </PageTransition>
  )
}
