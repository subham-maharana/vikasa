'use client'

import Image from 'next/image'

import { useState, useRef, useEffect } from 'react'

/* ── Conversational steps ─────────────────────────────────────────────── */
type Step = 'idle' | 'name' | 'contact' | 'reason' | 'sending' | 'done' | 'error'

interface Message {
    from: 'bot' | 'user'
    text: string
}

const BOT_INTRO: Message[] = [
    { from: 'bot', text: "Hi there! 👋 I'm the Vikasa assistant." },
    { from: 'bot', text: "I'll connect you with the team in just a moment. What's your name?" },
]

/* ── Tiny avatar ─────────────────────────────────────────────────────── */
function BotAvatar() {
    return (
        <span style={{
            width: 28, height: 28, borderRadius: '50%',
            background: '#fff', border: '1px solid rgba(9,16,43,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, overflow: 'hidden',
            boxShadow: '0 1px 4px rgba(10,20,60,0.10)',
        }}>
            <Image src="/Logo.svg" alt="Vikasa" width={18} height={18} />
        </span>
    )
}

/* ── Chat bubble component ───────────────────────────────────────────── */
export default function ChatWidget() {
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState<Step>('idle')
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')

    // Collected lead data
    const lead = useRef({ name: '', contact: '', reason: '' })
    const bottomRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    /* Auto-scroll to bottom on new messages */
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    /* Focus input when chat opens */
    useEffect(() => {
        if (open && step !== 'idle' && step !== 'sending' && step !== 'done' && step !== 'error') {
            setTimeout(() => inputRef.current?.focus(), 80)
        }
    }, [open, step])

    /* Start conversation when first opened */
    function openChat() {
        setOpen(true)
        if (step === 'idle') {
            setMessages(BOT_INTRO)
            setStep('name')
        }
    }

    /* Append bot message with a short delay between lines */
    function botSay(lines: string[], afterMs = 600) {
        lines.forEach((text, i) => {
            setTimeout(() => {
                setMessages(m => [...m, { from: 'bot', text }])
            }, afterMs * (i + 1))
        })
    }

    /* Handle user submitting their answer */
    function handleSend() {
        const val = input.trim()
        if (!val) return
        setInput('')
        setMessages(m => [...m, { from: 'user', text: val }])

        if (step === 'name') {
            lead.current.name = val
            botSay([`Nice to meet you, ${val}! 😊`, 'What\'s the best way to reach you? (email or phone)'])
            setStep('contact')
        } else if (step === 'contact') {
            lead.current.contact = val
            botSay(['Got it!', 'Lastly — what can Vikasa help you with today? Tell me a bit about your website or business.'])
            setStep('reason')
        } else if (step === 'reason') {
            lead.current.reason = val
            setStep('sending')
            botSay(['Perfect! Let me pass this to the team…'], 400)
            submitLead()
        }
    }

    async function submitLead() {
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(lead.current),
            })
            if (!res.ok) throw new Error('api error')
            setTimeout(() => {
                setMessages(m => [
                    ...m,
                    { from: 'bot', text: `✅ All done, ${lead.current.name}! We'll be in touch very soon.` },
                    { from: 'bot', text: 'In the meantime, feel free to WhatsApp us directly for the fastest response! 💬' },
                ])
                setStep('done')
            }, 1400)
        } catch {
            setTimeout(() => {
                setMessages(m => [...m, { from: 'bot', text: 'Hmm, something went wrong. Please WhatsApp us directly — sorry about that!' }])
                setStep('error')
            }, 1400)
        }
    }

    function handleKey(e: React.KeyboardEvent) {
        if (e.key === 'Enter') handleSend()
    }

    const showInput = step !== 'idle' && step !== 'sending' && step !== 'done' && step !== 'error'
    const placeholder =
        step === 'name' ? 'Your name…' :
            step === 'contact' ? 'Email or phone…' :
                step === 'reason' ? 'Tell me about your site…' : ''

    return (
        <>
            {/* ── Chat window ── */}
            {open && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: 90,
                        right: 24,
                        zIndex: 200,
                        width: 'min(360px, calc(100vw - 32px))',
                        borderRadius: 22,
                        overflow: 'hidden',
                        boxShadow: '0 20px 60px rgba(9,16,43,0.22), 0 2px 12px rgba(9,16,43,0.10)',
                        display: 'flex',
                        flexDirection: 'column',
                        background: '#fff',
                        animation: 'chatOpen 0.28s cubic-bezier(0.22,1,0.36,1)',
                    }}
                >
                    {/* Header */}
                    <div style={{
                        background: 'linear-gradient(135deg,#09102b 0%,#1840ff 100%)',
                        padding: '14px 18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{
                                width: 36, height: 36, borderRadius: '50%',
                                background: '#fff',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                overflow: 'hidden', flexShrink: 0,
                            }}>
                                <Image src="/Logo.svg" alt="Vikasa" width={22} height={22} />
                            </div>
                            <div>
                                <p style={{ color: '#fff', fontSize: 14, fontWeight: 600, margin: 0, lineHeight: 1.2 }}>
                                    Vikasa Assistant
                                </p>
                                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11, margin: 0 }}>
                                    Usually replies in minutes
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            aria-label="Close chat"
                            style={{
                                background: 'rgba(255,255,255,0.12)', border: 'none',
                                color: '#fff', width: 28, height: 28, borderRadius: '50%',
                                cursor: 'pointer', fontSize: 16, lineHeight: 1,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}
                        >×</button>
                    </div>

                    {/* Messages */}
                    <div style={{
                        flex: 1, overflowY: 'auto', padding: '16px 14px',
                        display: 'flex', flexDirection: 'column', gap: 10,
                        minHeight: 260, maxHeight: 320,
                        background: '#f8faff',
                    }}>
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                style={{
                                    display: 'flex',
                                    justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start',
                                    alignItems: 'flex-end',
                                    gap: 7,
                                }}
                            >
                                {m.from === 'bot' && <BotAvatar />}
                                <div style={{
                                    maxWidth: '78%',
                                    background: m.from === 'bot' ? '#fff' : '#1840ff',
                                    color: m.from === 'bot' ? '#09102b' : '#fff',
                                    borderRadius: m.from === 'bot' ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                                    padding: '9px 13px',
                                    fontSize: 13.5,
                                    lineHeight: 1.55,
                                    boxShadow: m.from === 'bot' ? '0 1px 4px rgba(10,20,60,0.07)' : 'none',
                                }}>
                                    {m.text}
                                </div>
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {step === 'sending' && (
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 7 }}>
                                <BotAvatar />
                                <div style={{
                                    background: '#fff', borderRadius: '16px 16px 16px 4px',
                                    padding: '10px 14px', boxShadow: '0 1px 4px rgba(10,20,60,0.07)',
                                }}>
                                    <span style={{ display: 'flex', gap: 4 }}>
                                        {[0, 1, 2].map(i => (
                                            <span key={i} style={{
                                                width: 6, height: 6, borderRadius: '50%',
                                                background: '#b0b8d0',
                                                animation: `typingDot 1.2s ${i * 0.2}s ease-in-out infinite`,
                                                display: 'inline-block',
                                            }} />
                                        ))}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Done — WhatsApp shortcut */}
                        {step === 'done' && (
                            <a
                                href="https://wa.me/+917205576166"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 7,
                                    background: '#25D366', color: '#fff',
                                    borderRadius: 12, padding: '10px 16px',
                                    fontSize: 13, fontWeight: 600, textDecoration: 'none',
                                    alignSelf: 'center', marginTop: 6,
                                }}
                            >
                                💬 WhatsApp us directly
                            </a>
                        )}

                        <div ref={bottomRef} />
                    </div>

                    {/* Input */}
                    {showInput && (
                        <div style={{
                            display: 'flex', gap: 8, padding: '12px 14px',
                            borderTop: '1px solid rgba(9,16,43,0.07)',
                            background: '#fff',
                        }}>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={handleKey}
                                placeholder={placeholder}
                                style={{
                                    flex: 1, border: '1px solid rgba(9,16,43,0.12)',
                                    borderRadius: 12, padding: '9px 14px',
                                    fontSize: 13.5, outline: 'none',
                                    fontFamily: 'Satoshi, sans-serif',
                                    color: '#09102b',
                                    transition: 'border-color 0.15s',
                                }}
                                onFocus={e => (e.target.style.borderColor = '#1840ff')}
                                onBlur={e => (e.target.style.borderColor = 'rgba(9,16,43,0.12)')}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim()}
                                aria-label="Send"
                                style={{
                                    width: 38, height: 38, borderRadius: '50%',
                                    background: input.trim() ? '#1840ff' : '#e8eeff',
                                    border: 'none', cursor: input.trim() ? 'pointer' : 'default',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0, transition: 'background 0.15s',
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M14 8L2 2l3 6-3 6 12-6z" fill={input.trim() ? '#fff' : '#b0b8d0'} />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* ── Floating trigger button ── */}
            <button
                onClick={open ? () => setOpen(false) : openChat}
                aria-label={open ? 'Close chat' : 'Chat with us'}
                style={{
                    position: 'fixed',
                    bottom: 24, right: 24,
                    zIndex: 201,
                    width: 56, height: 56,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg,#09102b 0%,#1840ff 100%)',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 6px 24px rgba(24,64,255,0.40)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.08)'
                    e.currentTarget.style.boxShadow = '0 10px 32px rgba(24,64,255,0.50)'
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = '0 6px 24px rgba(24,64,255,0.40)'
                }}
            >
                {open ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5 5l10 10M15 5L5 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M21 11.5C21 16.194 16.971 20 12 20c-1.39 0-2.71-.31-3.878-.863L3 20l1.04-4.63A8.338 8.338 0 0 1 3 11.5C3 6.806 7.03 3 12 3s9 3.806 9 8.5z" fill="white" fillOpacity=".9" />
                        <circle cx="8.5" cy="11.5" r="1" fill="#1840ff" />
                        <circle cx="12" cy="11.5" r="1" fill="#1840ff" />
                        <circle cx="15.5" cy="11.5" r="1" fill="#1840ff" />
                    </svg>
                )}
            </button>

            {/* Ping animation on the button when chat is closed */}
            {!open && (
                <span style={{
                    position: 'fixed', bottom: 24, right: 24, zIndex: 200,
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'rgba(24,64,255,0.25)',
                    animation: 'chatPing 2s ease-out infinite',
                    pointerEvents: 'none',
                }} />
            )}

            <style>{`
        @keyframes chatOpen {
          from { opacity:0; transform:scale(0.9) translateY(12px) }
          to   { opacity:1; transform:scale(1) translateY(0) }
        }
        @keyframes chatPing {
          0%   { transform:scale(1);   opacity:0.7 }
          80%  { transform:scale(1.9); opacity:0   }
          100% { transform:scale(1.9); opacity:0   }
        }
        @keyframes typingDot {
          0%,80%,100% { transform:translateY(0) }
          40%          { transform:translateY(-5px) }
        }
      `}</style>
        </>
    )
}
