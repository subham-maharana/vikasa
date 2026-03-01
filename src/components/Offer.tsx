'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function Offer() {
  useScrollReveal()

  return (
    <section
      id="offer"
      className="
        py-28 px-6 md:px-14
        border-t border-black/[0.08]
        text-center
      "
    >
      <div className="max-w-[1060px] mx-auto">

        <p className="reveal-down text-[10px] font-semibold tracking-[0.18em] uppercase text-blue2 mb-4">
          What I offer
        </p>

        <h2 className="
          reveal-down d1
          font-serif font-normal
          text-[clamp(2rem,4vw,3.2rem)]
          tracking-[-0.025em] leading-[1.1]
          text-ink mb-4
        ">
          Your site never<br />
          <span className="italic">sleeps again</span>
        </h2>

        <p className="
          reveal-down d2
          text-[15.5px] text-muted font-light
          max-w-[420px] mx-auto leading-[1.75]
          mb-16
        ">
          No monthly retainers. No tech headaches.
          One setup, leads every single day.
        </p>

        <div className="
          reveal
          max-w-[700px] mx-auto
          bg-surface border border-black/[0.08]
          rounded-[20px] py-14 px-16
          md:px-16 px-7
          relative overflow-hidden
          shadow-[0_2px_32px_rgba(24,64,255,0.05)]
        ">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue2 to-transparent" />

          <p className="text-[17.5px] text-[#3c4468] font-light leading-[1.9]">
            I connect a free AI chatbot to your existing website. It talks to
            your visitors, captures their name, email and enquiry automatically
            — even while you sleep. All leads are saved to a free CRM instantly,
            so you wake up to a ready list every morning.
          </p>
        </div>

      </div>
    </section>
  )
}
