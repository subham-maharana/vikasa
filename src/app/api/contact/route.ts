import { NextResponse } from 'next/server'
// import { createClient } from '@supabase/supabase-js'  // TODO: re-enable when Supabase is ready
import { Resend } from 'resend'

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// )

const resend = new Resend(process.env.RESEND_API_KEY)

/* ── IPWho.is — free geo-IP, no API key needed ──────────────────────────── */
interface Location {
    city: string
    region: string
    country: string
    flag: string
    isp: string
}

async function getLocation(ip: string): Promise<Location> {
    const fallback: Location = { city: 'Unknown', region: 'Unknown', country: 'Unknown', flag: '', isp: '' }

    // Skip private / loopback IPs (local dev)
    if (!ip || ip === '::1' || ip.startsWith('127.') || ip.startsWith('192.168.') || ip.startsWith('10.')) {
        return { city: 'Local', region: 'Dev', country: 'Localhost', flag: '🖥', isp: '' }
    }

    try {
        const res = await fetch(`https://ipwho.is/$sk.5477a03cff23650a12d23b9a65a58149a3e86c4539630534946c2eca03fef9a3`, { signal: AbortSignal.timeout(4000) })
        const data = await res.json()
        if (!data.success) return fallback
        return {
            city: data.city ?? 'Unknown',
            region: data.region ?? 'Unknown',
            country: data.country ?? 'Unknown',
            flag: data.flag?.emoji ?? '',
            isp: data.connection?.isp ?? '',
        }
    } catch {
        return fallback
    }
}

/* ── POST ──────────────────────────────────────────────────────────────── */
export async function POST(req: Request) {
    try {
        const { name, contact, reason } = await req.json()

        if (!name?.trim() || !contact?.trim() || !reason?.trim()) {
            return NextResponse.json({ error: 'Missing fields.' }, { status: 400 })
        }

        // Get visitor IP
        const forwarded = req.headers.get('x-forwarded-for')
        const ip = (forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') ?? '').trim()

        // Geo lookup via IPWho.is
        const loc = await getLocation(ip)
        const locationLine = `${loc.flag} ${loc.city}, ${loc.region}, ${loc.country}`

        // TODO: re-enable Supabase insert once project is unpaused
        // await supabase.from('leads').insert([{ name, contact, reason, city: loc.city, region: loc.region, country: loc.country, ip }])

        /* Email ──────────────────────────────────────────────────────────── */
        try {
            await resend.emails.send({
                from: 'Vikasa <notifications@vikasa.online>',
                to: [process.env.OWNER_EMAIL ?? 'contact@vikasa.online'],
                subject: `🎉 New lead from ${name.trim()} — ${loc.country}`,
                html: `
          <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:32px">
            <h2 style="color:#09102b;margin-bottom:6px">You've got a new lead! 🎉</h2>
            <table style="width:100%;border-collapse:collapse;margin-top:20px">
              <tr style="border-bottom:1px solid #f0f0f5">
                <td style="padding:11px 0;color:#6b7490;font-size:12px;width:90px;text-transform:uppercase;letter-spacing:.06em">Name</td>
                <td style="padding:11px 0;color:#09102b;font-size:14px;font-weight:600">${name.trim()}</td>
              </tr>
              <tr style="border-bottom:1px solid #f0f0f5">
                <td style="padding:11px 0;color:#6b7490;font-size:12px;text-transform:uppercase;letter-spacing:.06em">Contact</td>
                <td style="padding:11px 0;color:#09102b;font-size:14px;font-weight:600">${contact.trim()}</td>
              </tr>
              <tr style="border-bottom:1px solid #f0f0f5">
                <td style="padding:11px 0;color:#6b7490;font-size:12px;text-transform:uppercase;letter-spacing:.06em;vertical-align:top">Reason</td>
                <td style="padding:11px 0;color:#09102b;font-size:14px">${reason.trim()}</td>
              </tr>
              <tr style="border-bottom:1px solid #f0f0f5">
                <td style="padding:11px 0;color:#6b7490;font-size:12px;text-transform:uppercase;letter-spacing:.06em">Location</td>
                <td style="padding:11px 0;color:#09102b;font-size:14px">
                  ${locationLine}
                  ${loc.isp ? `<br><span style="color:#6b7490;font-size:12px">${loc.isp}</span>` : ''}
                </td>
              </tr>
            </table>
            <div style="margin-top:24px;padding:14px 18px;background:#f0f6ff;border-radius:12px;font-size:13px;color:#1840ff">
              ⚡ Reply within the first hour — leads convert 7× better!
            </div>
          </div>
        `,
            })
            console.log('[lead] ✅ Email sent —', name.trim(), '|', locationLine)
        } catch (emailErr) {
            console.error('[lead] Resend error:', emailErr)
        }

        return NextResponse.json({ ok: true })
    } catch (err) {
        console.error('[lead] Error:', err)
        return NextResponse.json({ error: 'Server error.' }, { status: 500 })
    }
}
