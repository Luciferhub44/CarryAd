import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

const LINES = [
  'We find the honest core of a small business.',
  "The recipe. The ritual. The corner it's known for.",
  'Then we carry it out to every screen that matters.',
  'The menu. The maps pin. The reel someone screenshots to send a friend.',
  'Not four vendors. One story, carried everywhere.',
]

export default function ManifestoScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (reduced || !containerRef.current) return
      const lines = gsap.utils.toArray<HTMLElement>('.manifesto-line', containerRef.current)
      gsap.set(lines, { opacity: 0.14 })

      lines.forEach((line) => {
        ScrollTrigger.create({
          trigger: line,
          start: 'top 65%',
          end: 'top 35%',
          scrub: true,
          onUpdate: (self) => {
            gsap.set(line, { opacity: 0.14 + self.progress * 0.86 })
          },
        })
      })
    },
    { scope: containerRef, dependencies: [reduced] },
  )

  return (
    <section ref={containerRef} className="bg-ink">
      <div className="mx-auto flex max-w-4xl flex-col gap-[10vh] px-6 py-[26vh] sm:px-8">
        {LINES.map((line) => (
          <p
            key={line}
            className="manifesto-line font-voice text-[clamp(22px,4.6vw,48px)] italic leading-[1.25] text-paper"
          >
            {line}
          </p>
        ))}
      </div>
    </section>
  )
}
