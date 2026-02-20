import { useEffect, useRef } from 'react'

const PARTICLE_STYLES = `
  .particle {
    position: fixed;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(232,192,128,0.85) 0%, rgba(232,192,128,0) 70%);
    pointer-events: none;
    z-index: 1;
    animation: particleDrift linear infinite both;
    bottom: -10px;
  }
`

let idCounter = 0

function createParticle() {
    const size = 1 + Math.random() * 1.5
    const left = Math.random() * 100
    const duration = 9 + Math.random() * 13
    const delay = Math.random() * 4
    const dx = (Math.random() - 0.5) * 80

    const el = document.createElement('div')
    el.className = 'particle'
    el.id = `particle-${++idCounter}`
    el.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${left}%;
    animation-duration: ${duration}s;
    animation-delay: ${delay}s;
    --dx: ${dx}px;
  `
    return el
}

export default function Particles() {
    const containerRef = useRef(null)
    const intervalRef = useRef(null)

    useEffect(() => {
        // Inject style once
        if (!document.getElementById('particle-style')) {
            const style = document.createElement('style')
            style.id = 'particle-style'
            style.textContent = PARTICLE_STYLES
            document.head.appendChild(style)
        }

        const container = containerRef.current
        if (!container) return

        // Initial burst
        for (let i = 0; i < 20; i++) {
            const p = createParticle()
            // Distribute initial particles across the screen height
            p.style.bottom = `${Math.random() * 100}vh`
            container.appendChild(p)
        }

        // Spawn new particles over time
        intervalRef.current = setInterval(() => {
            const p = createParticle()
            container.appendChild(p)
            // Remove old particles to avoid buildup
            const particles = container.querySelectorAll('.particle')
            if (particles.length > 60) {
                particles[0].remove()
            }
        }, 2800)

        return () => {
            clearInterval(intervalRef.current)
            // Clean up particles
            if (container) {
                container.querySelectorAll('.particle').forEach(p => p.remove())
            }
        }
    }, [])

    return <div ref={containerRef} aria-hidden="true" />
}
