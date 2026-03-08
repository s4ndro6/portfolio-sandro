/* ============================================================
   AAZ Portfolio V4 — TextScramble Utility
   Scrambles text with random chars before resolving to target
   Usage: const ts = new TextScramble(el); await ts.setText('HELLO')
   ============================================================ */

export class TextScramble {
  private el: HTMLElement
  private chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&/*!?><'
  private frameRequest: number = 0

  constructor(el: HTMLElement) {
    this.el = el
  }

  setText(newText: string): Promise<void> {
    return new Promise(resolve => {
      const length = newText.length
      let iteration = 0
      clearInterval(this.frameRequest)

      const interval = window.setInterval(() => {
        this.el.innerText = newText.split('').map((char, index) => {
          if (char === ' ') return ' '
          if (index < iteration) return char
          return this.chars[Math.floor(Math.random() * this.chars.length)]
        }).join('')

        if (iteration >= length) {
          clearInterval(interval)
          resolve()
        }
        iteration += 0.35
      }, 28)
    })
  }
}
