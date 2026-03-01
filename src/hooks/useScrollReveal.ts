'use client'

import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('on')
          } else {
            e.target.classList.remove('on')
          }
        })
      },
      { threshold: 0.14 }
    )
    document.querySelectorAll('.reveal, .reveal-down').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}
