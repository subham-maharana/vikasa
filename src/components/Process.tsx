'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

const steps = [
  {
    no: '01',
    tag: 'Free',
    title: 'I review your website',
    body: "Send me your URL. I'll audit your site and design the ideal chatbot — completely free, zero commitment.",
    delay: '',
  },
  {
    no: '02',
    tag: '24 hrs',
    title: 'I build & connect it',
    body: 'I build the chatbot, train it on your services, and embed it on your site within 24 hours.',
    delay: 'd1',
  },
  {
    no: '03',
    tag: 'Every day',
    title: 'Leads arrive automatically',
    body: 'Every enquiry is captured, named and logged to your CRM. You show up and follow up.',
    delay: 'd2',
  },
]

export default function Process() {
  useScrollReveal()

  return (
    <section
      id="how"
      className="
        py-28 px-6 md:px-14
        border-t border-black/[0.08]
        text-center
      "
    >
      <div className="max-w-[1060px] mx-auto">

        <p className="reveal-down text-[10px] font-semibold tracking-[0.18em] uppercase text-blue2 mb-4">
          How it works
        </p>

        <h2 className="
          reveal-down d1
          font-serif font-normal
          text-[clamp(2rem,4vw,3.2rem)]
          tracking-[-0.025em] leading-[1.1]
          text-ink mb-4
        ">
          Live in <span className="italic">24 hours</span>
        </h2>

        <p className="
          reveal-down d2
          text-[15.5px] text-muted font-light
          max-w-[420px] mx-auto leading-[1.75]
          mb-16
        ">
          Three steps. Nothing to install. Nothing to learn.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((s) => (
            <div
              key={s.no}
              className={`
                reveal ${s.delay}
                bg-white border border-black/[0.08]
                rounded-[20px] py-11 px-8
                text-center
                shadow-[0_1px_12px_rgba(10,20,60,0.04)]
                hover:-translate-y-[7px]
                hover:border-blue/20
                hover:shadow-[0_12px_40px_rgba(24,64,255,0.08)]
                transition-all duration-[280ms]
              `}
            >
              <div className="
                font-serif text-[3.8rem] leading-none
                text-blue/[0.07] mb-3 tracking-[-0.05em]
              ">
                {s.no}
              </div>

              <div className="
                inline-block text-[9.5px] font-semibold
                tracking-[0.12em] uppercase
                text-blue bg-blue/[0.06]
                rounded-full px-3.5 py-1 mb-5
              ">
                {s.tag}
              </div>

              <h3 className="
                font-serif font-normal text-[1.25rem]
                leading-[1.25] text-ink mb-3
              ">
                {s.title}
              </h3>

              <p className="text-[13.5px] text-muted font-light leading-[1.7]">
                {s.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
