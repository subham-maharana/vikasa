# Vikasa — AI Chatbots for UK Home Businesses

Production-ready Next.js 14 + Tailwind CSS website for vikasa.online

---

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS v3**
- **Fonts** — Instrument Serif + Satoshi (Google Fonts)

---

## Project Structure

```
vikasa/
├── src/
│   ├── app/
│   │   ├── globals.css        # Base styles, cursor, shimmer, reveal
│   │   ├── layout.tsx         # Root layout + metadata
│   │   └── page.tsx           # Assembles all components
│   ├── components/
│   │   ├── Cursor.tsx         # Custom cursor with hover ring
│   │   ├── Navbar.tsx         # Fixed navigation bar
│   │   ├── Hero.tsx           # Hero + water ripple canvas
│   │   ├── Offer.tsx          # What I offer section
│   │   ├── Process.tsx        # 3-step how it works
│   │   ├── Contact.tsx        # WhatsApp + Email cards
│   │   └── Footer.tsx         # Simple footer
│   └── hooks/
│       ├── useRipple.ts       # Water ripple canvas animation
│       └── useScrollReveal.ts # Intersection observer reveal
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── postcss.config.js
```

---

## Setup & Run

### 1. Install dependencies

```bash
cd vikasa
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Build for production

```bash
npm run build
npm start
```

---

## Deploy to Vercel (Recommended — Free)

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Vercel auto-detects Next.js — click **Deploy**
5. Go to **Settings → Domains**
6. Add `vikasa.online` and `www.vikasa.online`
7. Update your domain DNS:
   - Add `A` record: `@` → `76.76.21.21`
   - Add `CNAME` record: `www` → `cname.vercel-dns.com`

Done. Live in ~2 minutes.

---

## Customise Before Going Live

Open these files and replace:

| File | What to change |
|------|---------------|
| `src/components/Hero.tsx` | Replace `447700000000` with your real WhatsApp number |
| `src/components/Contact.tsx` | Replace `447700000000` and `hello@vikasa.online` |
| `src/components/Footer.tsx` | Replace `hello@vikasa.online` |
| `src/app/layout.tsx` | Update `metadataBase` URL if needed |

---

## Animations

| Effect | Where |
|--------|-------|
| Blue shimmer on "AI Chatbots" | `globals.css` `.shimmer` class |
| Water ripple on hero | `src/hooks/useRipple.ts` |
| Scroll fade-up reveal | `src/hooks/useScrollReveal.ts` |
| Custom cursor + ring | `src/components/Cursor.tsx` |
