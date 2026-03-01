'use client'

import { useRef } from 'react'
import { useRipple } from '@/hooks/useRipple'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useRipple(canvasRef, heroRef)

  return (
    <section
      ref={heroRef}
      className="
        relative min-h-screen
        flex flex-col items-center justify-center
        text-center
        pt-[130px] pb-[110px] px-6 md:px-12
        overflow-hidden
      "
      style={{ background: 'linear-gradient(160deg, #f0f6ff 0%, #ffffff 45%, #eaf4ff 100%)' }}
    >
      {/* Ripple canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
      />


      {/* Dot grid */}
      <div className="hero-grid" />

      {/* Content */}
      <div className="relative z-[2] flex flex-col items-center">

        {/* Badge */}
        <div className="
          inline-flex items-center gap-2
          text-[11px] font-medium tracking-[0.12em] uppercase text-muted
          border border-black/[0.12] rounded-full
          px-[18px] py-1.5 mb-14
          bg-white/90
          animate-fadeUp
        ">
          <span className="live-dot" />
          Available for UK home businesses
        </div>

        {/* Headline */}
        <h1 className="
          font-serif font-normal
          text-[clamp(3rem,7.5vw,6.8rem)]
          leading-[1.03] tracking-[-0.035em]
          text-ink mb-8
          animate-fadeUp1
        ">
          Capture every lead<br />
          with{' '}
          <span className="shimmer italic">AI&nbsp;Chatbots</span>
          <br />
          — 24/7, automatic.
        </h1>

        {/* Subtext */}
        <p className="
          text-[16.5px] text-muted font-light leading-[1.8]
          max-w-[440px] mb-14
          animate-fadeUp2
        ">
          I set up a free AI chatbot on your website. It talks to
          visitors, captures their details, and saves every lead
          to your CRM — while you sleep.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 justify-center flex-wrap animate-fadeUp3">
          <a
            href="https://wa.me/+917205576166"
            target="_blank"
            rel="noopener noreferrer"
            className="
              btn-shine
              inline-flex items-center
              bg-ink text-white
              text-[14px] font-medium
              rounded-xl px-8 py-4
              shadow-[0_2px_20px_rgba(9,16,43,0.15)]
              hover:bg-blue
            "
          >
            WhatsApp me now
          </a>

          <a
            href="#how"
            className="
              btn-shine
              inline-flex items-center
              bg-transparent text-ink
              text-[14px] font-normal
              border-[1.5px] border-black/[0.12]
              rounded-xl px-7 py-4
              hover:border-blue hover:bg-blue/[0.06]
            "
          >
            See the process →
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="
        absolute bottom-10 left-1/2 -translate-x-1/2 z-[2]
        flex flex-col items-center gap-2
        text-[10px] tracking-[0.14em] uppercase text-dim
        animate-fadeUp5
      ">
        <div className="scroll-line" />
        Scroll
      </div>
    </section>
  )
}
