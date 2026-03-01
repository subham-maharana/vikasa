'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

function WhatsAppIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#25D366" />
      <path d="M16 24.18a9.115 9.115 0 0 1-4.655-1.277l-.334-.198-3.46.665.685-3.373-.218-.346A9.085 9.085 0 0 1 6.82 15c0-5.07 4.11-9.18 9.18-9.18 2.453 0 4.76.956 6.495 2.692A9.123 9.123 0 0 1 25.18 15c0 5.07-4.11 9.18-9.18 9.18z" fill="white" />
      <path d="M20.862 17.394c-.28-.14-1.653-.815-1.908-.908-.255-.093-.44-.14-.626.14-.186.28-.72.907-.882 1.093-.163.186-.325.21-.605.07-.28-.14-1.182-.436-2.25-1.388-.832-.741-1.393-1.657-1.557-1.937-.163-.28-.017-.43.123-.57.126-.125.28-.326.42-.489.14-.163.186-.28.28-.466.093-.186.047-.35-.023-.489-.07-.14-.626-1.508-.858-2.065-.226-.542-.456-.468-.626-.477l-.534-.009c-.186 0-.489.07-.745.35-.256.28-.977.955-.977 2.33 0 1.375 1 2.703 1.14 2.889.14.186 1.97 3.008 4.774 4.219.667.288 1.187.46 1.593.589.67.213 1.28.183 1.762.111.537-.08 1.653-.676 1.886-1.328.233-.652.233-1.21.163-1.328-.07-.117-.256-.187-.536-.327z" fill="#25D366" />
    </svg>
  )
}

function GmailIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="16" fill="white" />
      <path d="M5 10.5v11a1.5 1.5 0 0 0 1.5 1.5H9V14l7 5.25L23 14v9h2.5A1.5 1.5 0 0 0 27 21.5v-11l-11 8.25L5 10.5z" fill="#EA4335" />
      <path d="M5 10.5l11 8.25 11-8.25A1.5 1.5 0 0 0 25.5 9h-19A1.5 1.5 0 0 0 5 10.5z" fill="#EA4335" />
      <path d="M23 14v9h2.5A1.5 1.5 0 0 0 27 21.5v-11L23 14z" fill="#4285F4" />
      <path d="M5 10.5v11A1.5 1.5 0 0 0 6.5 23H9V14L5 10.5z" fill="#34A853" />
      <path d="M9 14v9h14V14l-7 5.25L9 14z" fill="#FBBC05" />
    </svg>
  )
}

const cards = [
  {
    href: 'https://wa.me/+917205576166',
    Icon: WhatsAppIcon,
    label: 'WhatsApp',
    value: '+91 72055 76166',
    external: true,
    accent: 'rgba(37,211,102,0.10)',
    border: 'rgba(37,211,102,0.22)',
  },
  {
    href: 'mailto:contact@vikasa.online',
    Icon: GmailIcon,
    label: 'Email',
    value: 'contact@vikasa.online',
    external: false,
    accent: 'rgba(234,67,53,0.08)',
    border: 'rgba(234,67,53,0.18)',
  },
]

export default function Contact() {
  useScrollReveal()

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-14 border-t border-black/[0.08] text-center bg-surface"
    >
      <div className="max-w-[680px] mx-auto">

        <p className="reveal-down text-[10px] font-semibold tracking-[0.18em] uppercase text-blue2 mb-4">
          Get in touch
        </p>

        <h2 className="
          reveal-down d1 font-serif font-normal
          text-[clamp(1.8rem,3.5vw,2.8rem)]
          tracking-[-0.025em] leading-[1.15] text-ink mb-4
        ">
          Let&apos;s talk —<br />
          <span className="italic">it&apos;s free to start</span>
        </h2>

        <p className="
          reveal-down d2 text-[14.5px] text-muted font-light
          max-w-[340px] mx-auto leading-[1.75] mb-14
        ">
          I&apos;ll review your site for free and show you exactly
          what a chatbot can do for your business.
        </p>

        <div className="reveal flex gap-4 flex-wrap justify-center">
          {cards.map((c) => (
            <a
              key={c.href}
              href={c.href}
              target={c.external ? '_blank' : undefined}
              rel={c.external ? 'noopener noreferrer' : undefined}
              className="
                btn-shine flex items-center gap-3
                flex-1 min-w-[220px] max-w-[280px]
                bg-white border rounded-[16px] px-6 py-5
                text-ink no-underline
                shadow-[0_2px_16px_rgba(10,20,60,0.05)]
              "
              style={{ borderColor: c.border }}
            >
              <span
                className="w-11 h-11 rounded-[12px] flex items-center justify-center flex-shrink-0"
                style={{ background: c.accent, border: `1px solid ${c.border}` }}
              >
                <c.Icon />
              </span>
              <span className="text-left">
                <span className="block text-[9px] tracking-[0.13em] uppercase text-dim font-semibold mb-0.5">
                  {c.label}
                </span>
                <span className="block text-[13.5px] font-medium text-ink">
                  {c.value}
                </span>
              </span>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
