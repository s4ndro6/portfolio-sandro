/* ============================================================
   AAZ Portfolio V4 — ProjectsGrid
   Asymmetric CSS grid with ProjectCard components
   ============================================================ */

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { projects } from '../../data/content'
import ProjectCard from '../ui/ProjectCard'

gsap.registerPlugin(ScrollTrigger)

interface ProjectsGridProps {
  preview?: boolean
  limit?: number
}

export default function ProjectsGrid({ preview = false, limit }: ProjectsGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const displayProjects = limit ? projects.slice(0, limit) : projects

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('[data-cursor]')
      if (!cards) return
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0, scale: 0.96 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.7, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true },
        }
      )
    }, gridRef)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={gridRef}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridAutoRows: '280px',
        gap: 2,
        padding: preview ? '0 0 4rem' : 0,
      }}
    >
      {displayProjects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
