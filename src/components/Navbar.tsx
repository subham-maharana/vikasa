import Image from 'next/image'
import Link from 'next/link'

const links = [
  { href: '#offer', label: 'Services' },
  { href: '#how', label: 'Process' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  return (
    <nav className="
      fixed inset-x-0 top-0 z-50 h-16
      flex items-center justify-between
      px-5 sm:px-8 md:px-14
      bg-white/[0.88] backdrop-blur-xl
      border-b border-black/[0.08]
    ">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2.5"
        style={{ textDecoration: 'none' }}
        aria-label="Vikasa home"
      >
        <Image
          src="/Logo.svg"
          alt="Vikasa logo mark"
          width={26}
          height={26}
          priority
        />
        <span className="font-serif text-[1.18rem] tracking-[-0.025em] text-ink font-normal leading-none">
          Vikasa
        </span>
      </Link>

      {/* Nav links — desktop only */}
      <ul className="hidden md:flex gap-9 list-none m-0 p-0">
        {links.map(l => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-[13px] text-muted hover:text-ink transition-colors duration-150"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA — always visible */}
      <a
        href="https://wa.me/+917205576166"
        target="_blank"
        rel="noopener noreferrer"
        className="
          btn-shine
          inline-flex items-center
          text-[12.5px] font-semibold
          bg-ink text-white
          rounded-full px-4 sm:px-6 py-2.5
          tracking-[0.01em]
          hover:bg-blue
        "
      >
        <span className="hidden sm:inline">WhatsApp&nbsp;</span>
        <span>me now</span>
      </a>
    </nav>
  )
}
