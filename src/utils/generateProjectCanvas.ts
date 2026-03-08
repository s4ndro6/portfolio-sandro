/* ============================================================
   AAZ Portfolio V4 — generateProjectCanvas Stub
   Phase 4 will implement each canvas type.
   This stub lets content.ts mediaType be referenced without error.
   ============================================================ */

export type CanvasType = 'canvas-terminal' | 'canvas-chart' | 'canvas-frames' | 'canvas-kanban'

/**
 * Returns the display label for a canvas media type.
 * Phase 4 will extend this with actual React canvas components.
 */
export function getCanvasLabel(type: CanvasType): string {
  const labels: Record<CanvasType, string> = {
    'canvas-terminal': 'Terminal',
    'canvas-chart':    'Trading Chart',
    'canvas-frames':   'Video Frames',
    'canvas-kanban':   'Kanban Flow',
  }
  return labels[type] ?? type
}
