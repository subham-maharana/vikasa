'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

/* ──────────────────────────── helpers ──────────────────────────────────── */

function getEmbedUrl(raw: string) {
    const yt = raw.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([A-Za-z0-9_-]{11})/)
    if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0`
    const loom = raw.match(/loom\.com\/share\/([a-f0-9]+)/)
    if (loom) return `https://www.loom.com/embed/${loom[1]}?autoplay=1`
    return raw
}

function getThumbnailUrl(raw: string) {
    const yt = raw.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([A-Za-z0-9_-]{11})/)
    return yt ? `https://img.youtube.com/vi/${yt[1]}/maxresdefault.jpg` : null
}

/* ──────────────────────────── component ────────────────────────────────── */

interface VideoDemoProps {
    src: string
    eyebrow?: string
    heading?: string
    sub?: string
}

export default function VideoDemo({
    src,
    eyebrow = 'See it in action',
    heading = 'Watch a 60-second demo',
    sub = 'See exactly how the chatbot captures a real lead — live on a UK home-business site.',
}: VideoDemoProps) {
    const sectionRef = useRef<HTMLElement>(null)
    const cardRef = useRef<HTMLDivElement>(null)

    /* scroll-driven scale: 0.72 → 1.0 */
    const [scale, setScale] = useState(0.72)

    /* custom cursor state */
    const [cursor, setCursor] = useState({ x: 0, y: 0, inside: false })

    /* lightbox */
    const [open, setOpen] = useState(false)

    /* ── scroll-driven expansion ── */
    useEffect(() => {
        let rafId: number

        const onScroll = () => {
            cancelAnimationFrame(rafId)
            rafId = requestAnimationFrame(() => {
                const card = cardRef.current
                if (!card) return
                const rect = card.getBoundingClientRect()
                const vh = window.innerHeight
                // progress: 0 when card top hits bottom of viewport, 1 when card is centred
                const progress = Math.min(1, Math.max(0,
                    1 - (rect.top - vh * 0.15) / (vh * 0.75)
                ))
                setScale(0.72 + progress * 0.28)   // 0.72 → 1.0
            })
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll() // seed on mount
        return () => {
            window.removeEventListener('scroll', onScroll)
            cancelAnimationFrame(rafId)
        }
    }, [])

    /* ── close lightbox on Escape ── */
    useEffect(() => {
        if (!open) return
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [open])

    /* ── mouse-follow cursor inside card ── */
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const r = e.currentTarget.getBoundingClientRect()
        setCursor({ x: e.clientX - r.left, y: e.clientY - r.top, inside: true })
    }, [])

    const handleMouseLeave = useCallback(() => {
        setCursor(c => ({ ...c, inside: false }))
    }, [])

    const embedUrl = getEmbedUrl(src)
    const thumbUrl = getThumbnailUrl(src)

    return (
        <>
            <section
                id="demo"
                ref={sectionRef}
                className="py-28 px-6 md:px-14 border-t border-black/[0.08] text-center overflow-hidden"
            >
                <div className="max-w-[1060px] mx-auto">

                    <p className="reveal-down text-[10px] font-semibold tracking-[0.18em] uppercase text-blue2 mb-4">
                        {eyebrow}
                    </p>

                    <h2 className="
            reveal-down d1 font-serif font-normal
            text-[clamp(2rem,4vw,3.2rem)]
            tracking-[-0.025em] leading-[1.1] text-ink mb-4
          ">
                        {heading}
                    </h2>

                    <p className="
            reveal-down d2 text-[15.5px] text-muted font-light
            max-w-[420px] mx-auto leading-[1.75] mb-14
          ">
                        {sub}
                    </p>

                    {/* ── Video card ─────────────────────────────────────────── */}
                    <div
                        ref={cardRef}
                        /* cursor: none hides the OS pointer so our custom cursor takes over */
                        style={{
                            cursor: 'none',
                            transform: `scale(${scale})`,
                            transformOrigin: 'center top',
                            transition: 'transform 0.08s linear',
                            borderRadius: 22,
                            overflow: 'hidden',
                            position: 'relative',
                            aspectRatio: '16/9',
                            boxShadow: '0 12px 56px rgba(24,64,255,0.12), 0 2px 12px rgba(10,20,60,0.08)',
                            background: thumbUrl ? 'transparent' : '#e8eeff',
                            /* will-change keeps GPU compositing smooth while scroll-scaling */
                            willChange: 'transform',
                        }}
                        onClick={() => setOpen(true)}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && setOpen(true)}
                        aria-label="Play demo video"
                    >
                        {/* thumbnail */}
                        {thumbUrl ? (
                            <img
                                src={thumbUrl}
                                alt="Video thumbnail"
                                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                                draggable={false}
                            />
                        ) : (
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: 'linear-gradient(135deg,#dce8ff 0%,#f0f6ff 100%)',
                            }} />
                        )}

                        {/* subtle dark scrim always present, deepens on hover via CSS */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'rgba(9,16,43,0.18)',
                            transition: 'background 0.3s ease',
                        }} />

                        {/* top accent line */}
                        <div style={{
                            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                            background: 'linear-gradient(90deg,transparent,#1840ff,transparent)',
                            opacity: 0.7,
                        }} />

                        {/* ── Custom follow-cursor "Play Intro" pill ── */}
                        <div
                            style={{
                                position: 'absolute',
                                pointerEvents: 'none',
                                /* centre the pill on the mouse position */
                                left: cursor.x,
                                top: cursor.y,
                                transform: 'translate(-50%, -50%)',
                                opacity: cursor.inside ? 1 : 0,
                                scale: cursor.inside ? '1' : '0.8',
                                transition: 'opacity 0.22s ease, scale 0.22s ease',
                                zIndex: 10,
                            }}
                        >
                            <span style={{
                                display: 'inline-flex', alignItems: 'center', gap: 9,
                                background: 'rgba(255,255,255,0.95)',
                                backdropFilter: 'blur(12px)',
                                color: '#09102b',
                                fontFamily: 'Satoshi, sans-serif',
                                fontSize: 14,
                                fontWeight: 600,
                                letterSpacing: '-0.01em',
                                padding: '11px 22px',
                                borderRadius: 999,
                                boxShadow: '0 6px 28px rgba(9,16,43,0.22)',
                                userSelect: 'none',
                                whiteSpace: 'nowrap',
                            }}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="8" fill="#1840ff" opacity=".12" />
                                    <polygon points="6,4.5 6,11.5 12.5,8" fill="#1840ff" />
                                </svg>
                                Play Intro
                            </span>
                        </div>
                    </div>
                    {/* end card */}

                </div>
            </section>

            {/* ── Lightbox ─────────────────────────────────────────────── */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 1000,
                        background: 'rgba(9,16,43,0.85)',
                        backdropFilter: 'blur(12px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: 24,
                        animation: 'vd-fadeIn 0.22s ease',
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: '100%', maxWidth: 960,
                            aspectRatio: '16/9',
                            borderRadius: 18, overflow: 'hidden',
                            boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
                            animation: 'vd-scaleIn 0.3s cubic-bezier(0.22,1,0.36,1)',
                        }}
                    >
                        <iframe
                            src={embedUrl}
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                            title="Demo video"
                        />
                    </div>

                    <button
                        onClick={() => setOpen(false)}
                        aria-label="Close video"
                        style={{
                            position: 'absolute', top: 20, right: 24,
                            background: 'rgba(255,255,255,0.10)',
                            border: '1px solid rgba(255,255,255,0.18)',
                            color: '#fff', width: 40, height: 40,
                            borderRadius: '50%', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 22, lineHeight: 1,
                            backdropFilter: 'blur(6px)',
                        }}
                    >×</button>
                </div>
            )}

            <style>{`
        @keyframes vd-fadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes vd-scaleIn { from { transform:scale(0.9);opacity:0 } to { transform:scale(1);opacity:1 } }
      `}</style>
        </>
    )
}
