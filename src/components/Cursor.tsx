'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const curRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (curRef.current) {
        curRef.current.style.left = mx + 'px'
        curRef.current.style.top  = my + 'px'
      }
    }

    const loop = () => {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px'
        ringRef.current.style.top  = ry + 'px'
      }
      rafId = requestAnimationFrame(loop)
    }

    const addHov = () => document.body.classList.add('hov')
    const remHov = () => document.body.classList.remove('hov')

    document.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(loop)

    // attach hover to interactive elements after mount
    const targets = document.querySelectorAll('a, button')
    targets.forEach(el => {
      el.addEventListener('mouseenter', addHov)
      el.addEventListener('mouseleave', remHov)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      targets.forEach(el => {
        el.removeEventListener('mouseenter', addHov)
        el.removeEventListener('mouseleave', remHov)
      })
    }
  }, [])

  return (
    <>
      <div id="cur"  ref={curRef}  />
      <div id="cur-ring" ref={ringRef} />
    </>
  )
}
