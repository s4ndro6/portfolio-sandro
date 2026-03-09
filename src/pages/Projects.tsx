/* ============================================================
   AAZ Portfolio V4 — Projects Page
   Full asymmetric grid with CLI filter
   ============================================================ */

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { projects } from '../data/content'
import ProjectCard from '../components/ui/ProjectCard'
import PageTransition from '../components/layout/PageTransition'
import { TextScramble } from '../utils/textScramble'
import type { Project } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

type FilterType = 'ALL' | 'WEB' | 'IA' | 'MOTION' | 'EDITORIAL'

const FILTER_TAGS: Record<FilterType, string[]> = {
  ALL: [],
  WEB: ['Web Design', 'HTML/CSS', 'React', 'SEO'],
  IA: ['FastAPI', 'Ollama', 'Groq', 'Python', 'ComfyUI', 'WAN2.2'],
  MOTION: ['Motion', 'GSAP', 'Three.js'],
  EDITORIAL: ['Editorial Design', 'InDesign', 'Typography'],
}

function filterProjects(type: FilterType): Project[] {
  if (type === 'ALL') return projects
  const tags = FILTER_TAGS[type]
  return projects.filter(p => p.tags.some(t => tags.some(ft => t.includes(ft))))
}

export default function Projects() {
  const [filter, setFilter] = useState<FilterType>('ALL')
  const [filtered, setFiltered] = useState<Project[]>(projects)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headingRef.current) new TextScramble(headingRef.current).setText('MES PROJETS')
  }, [])

  const applyFilter = (type: FilterType) => {
    setFilter(type)
    setDropdownOpen(false)
    const newProjects = filterProjects(type)
    if (gridRef.current && gridRef.current.children.length > 0) {
      gsap.to(Array.from(gridRef.current.children), {
        scale: 0.9, opacity: 0, duration: 0.2,
        onComplete: () => {
          setFiltered(newProjects)
          requestAnimationFrame(() => {
            if (gridRef.current) {
              gsap.fromTo(Array.from(gridRef.current.children),
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
              )
            }
          })
        },
      })
    } else {
      setFiltered(newProjects)
    }
  }

  return (
    <PageTransition>
      <main style={{ paddingTop: 56, paddingBottom: 28 }}>
        <div style={{ padding: '4rem 2rem 2rem' }}>
          <div className="mono" style={{ marginBottom: '1rem', color: 'var(--accent)' }}>// PORTFOLIO</div>
          <h1 ref={headingRef} style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(3rem, 11vw, 11vw)', color: 'var(--text-0)',
            lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '2rem',
          }}>MES PROJETS</h1>

          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button onClick={() => setDropdownOpen(v => !v)} style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em',
              color: 'var(--accent)', background: 'var(--bg-1)',
              border: '1px solid var(--accent-border)', padding: '8px 16px',
              cursor: 'none', display: 'flex', alignItems: 'center', gap: 8,
            }}>
              {'> filter --type='}{filter} ▼
            </button>
            {dropdownOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 4px)', left: 0,
                background: 'var(--bg-1)', border: '1px solid var(--accent-border)',
                zIndex: 100, minWidth: 160,
              }}>
                {(['ALL', 'WEB', 'IA', 'MOTION', 'EDITORIAL'] as FilterType[]).map(type => (
                  <button key={type} onClick={() => applyFilter(type)} style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em',
                    color: filter === type ? 'var(--accent)' : 'var(--text-1)',
                    background: filter === type ? 'var(--accent-dim)' : 'transparent',
                    border: 'none', padding: '8px 16px', cursor: 'none',
                  }}>{type}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div ref={gridRef} style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gridAutoRows: '280px', gap: 2,
        }}>
          {filtered.map(project => <ProjectCard key={project.id} project={project} />)}
        </div>
      </main>
    </PageTransition>
  )
}
