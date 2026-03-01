'use client'

import { useEffect, RefObject } from 'react'

interface Ripple {
  x: number
  y: number
  born: number
  maxR: number
  baseAlpha: number
  rings: number
  ringGap: number
  duration: number
}

export function useRipple(
  canvasRef: RefObject<HTMLCanvasElement>,
  heroRef: RefObject<HTMLElement>
) {
  useEffect(() => {
    const canvas = canvasRef.current!
    const hero = heroRef.current!
    if (!canvas || !hero) return

    const ctx = canvas.getContext('2d')!
    const ripples: Ripple[] = []
    let W = 0, H = 0, rafId: number

    function resize() {
      W = canvas.width = hero.offsetWidth
      H = canvas.height = hero.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function spawn(x: number, y: number, strong = false) {
      if (ripples.length > 10) ripples.splice(0, 1)
      ripples.push({
        x, y,
        born: performance.now(),
        // larger spread → airy, unhurried feel
        maxR: strong ? Math.max(W, H) * 0.85 : Math.max(W, H) * 0.55,
        // lower alpha → delicate, translucent rings
        baseAlpha: strong ? 0.52 : 0.36,
        rings: strong ? 5 : 3,
        // wide gap between rings = breathing room
        ringGap: strong ? 90 : 68,
        // much slower lifetime
        duration: strong ? 5800 : 4400,
      })
    }

    // ── Auto-idle ripple from the centre every ~4 s so hero always breathes ─
    let idleTimer: ReturnType<typeof setTimeout>
    function scheduleIdle() {
      idleTimer = setTimeout(() => {
        spawn(W / 2, H / 2, false)
        scheduleIdle()
      }, 4000 + Math.random() * 1600)
    }
    scheduleIdle()

    const onClick = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      spawn(e.clientX - r.left, e.clientY - r.top, true)
    }

    // Throttle mousemove → one spawn per 520 ms feels deliberate, not jittery
    let lastT = 0
    const onMove = (e: MouseEvent) => {
      const now = performance.now()
      if (now - lastT < 520) return
      lastT = now
      const r = canvas.getBoundingClientRect()
      spawn(e.clientX - r.left, e.clientY - r.top, false)
    }

    hero.addEventListener('click', onClick)
    hero.addEventListener('mousemove', onMove)

    function draw(now: number) {
      ctx.clearRect(0, 0, W, H)

      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i]
        const t = (now - rp.born) / rp.duration
        if (t >= 1) { ripples.splice(i, 1); continue }

        for (let k = 0; k < rp.rings; k++) {
          const delay = k * (rp.ringGap / rp.maxR)
          const tRing = Math.max(0, (t - delay) / (1 - delay))
          if (tRing <= 0) continue

          // power-5 ease-out → very slow deceleration, gentle expansion
          const ease = 1 - Math.pow(1 - tRing, 5)
          const radius = ease * rp.maxR

          // squared fade-out curve → soft, long-tail dissolve
          const alpha = rp.baseAlpha * Math.pow(1 - tRing, 1.6) * (1 - k * 0.14)
          // thin, airy stroke
          const lw = Math.max(0.4, (1 - tRing * 0.5) * (k === 0 ? 1.6 : 0.9))

          ctx.beginPath()
          ctx.arc(rp.x, rp.y, radius, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(24, 100, 255, ${alpha.toFixed(3)})`
          ctx.lineWidth = lw
          ctx.stroke()
        }
      }

      rafId = requestAnimationFrame(draw)
    }
    rafId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      hero.removeEventListener('click', onClick)
      hero.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      clearTimeout(idleTimer)
    }
  }, [canvasRef, heroRef])
}
