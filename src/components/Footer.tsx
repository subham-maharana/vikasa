'use client'

export default function Footer() {
  return (
    <footer className="bg-[#07102a] text-white overflow-hidden">

      {/* ── Top row ──────────────────────────────────────────── */}
      <div className="
        flex flex-col md:flex-row md:justify-between md:items-start
        gap-10 px-6 md:px-14 pt-14 pb-10
        border-b border-white/[0.07]
      ">
        {/* Left: CTA */}
        <div className="max-w-sm">
          <p className="
            font-serif font-normal
            text-[clamp(1.4rem,2.8vw,2.1rem)]
            leading-[1.22] tracking-[-0.02em]
            text-white mb-5
          ">
            Ready to capture every lead —{' '}
            <span className="italic" style={{ color: '#5e9bff' }}>while you sleep?</span>
          </p>

          {/* White CTA button */}
          <a
            href="https://wa.me/+917205576166"
            target="_blank"
            rel="noopener noreferrer"
            className="
              btn-shine
              inline-flex items-center
              bg-white text-[#09102b]
              text-[13px] font-semibold
              px-6 py-3 rounded-full
              tracking-[-0.01em]
              shadow-[0_2px_16px_rgba(0,0,0,0.18)]
            "
          >
            WhatsApp me now
          </a>
        </div>

        {/* Right: nav columns */}
        <div className="flex gap-12 md:gap-16 flex-wrap">
          <div>
            <p className="text-[10px] tracking-[0.16em] uppercase text-white/30 mb-4 font-semibold">
              Navigate
            </p>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              {[
                { label: 'How it works', href: '#how' },
                { label: 'What I offer', href: '#offer' },
                { label: 'Demo', href: '#demo' },
                { label: 'Contact', href: '#contact' },
              ].map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[13px] text-white/50 hover:text-white transition-colors duration-150 no-underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.16em] uppercase text-white/30 mb-4 font-semibold">
              Contact
            </p>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              {[
                { label: 'WhatsApp', href: 'https://wa.me/+917205576166', ext: true },
                { label: 'contact@vikasa.online', href: 'mailto:contact@vikasa.online', ext: false },
              ].map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target={l.ext ? '_blank' : undefined}
                    rel={l.ext ? 'noopener noreferrer' : undefined}
                    className="text-[13px] text-white/50 hover:text-white transition-colors duration-150 no-underline break-all"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Legal bar ────────────────────────────────────────── */}
      <div className="
        flex flex-col sm:flex-row sm:justify-between sm:items-center
        gap-3 px-6 md:px-14 py-5
      ">
        <p className="text-[11px] text-white/25 tracking-[-0.01em]">
          © {new Date().getFullYear()} Vikasa — AI Chatbots for UK Home Businesses
        </p>
        <div className="flex gap-5">
          {['Privacy', 'Terms'].map(t => (
            <a
              key={t}
              href="#"
              className="text-[11px] text-white/25 hover:text-white/60 transition-colors duration-150 no-underline"
            >
              {t}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
