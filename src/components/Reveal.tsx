import { useRef } from 'react'
import type { ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../lib/gsap'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

type RevealProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'section'
  /** Animate direct children individually, staggered, instead of the wrapper as one block. */
  stagger?: boolean
  y?: number
  delay?: number
}

export default function Reveal({ children, className, as = 'div', stagger = false, y = 32, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (reduced || !ref.current) return
      const targets: gsap.TweenTarget = stagger ? gsap.utils.toArray(ref.current.children) : ref.current

      gsap.set(targets, { opacity: 0, y })
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        stagger: stagger ? 0.12 : 0,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          once: true,
        },
      })
    },
    { scope: ref, dependencies: [reduced, stagger] },
  )

  const Tag = as
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
