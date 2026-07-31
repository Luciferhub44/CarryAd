import { useEffect } from 'react'
import type { RefObject } from 'react'

/**
 * ponytail: sets transform directly on bgRef.current instead of going through
 * React state — a scroll-driven style shouldn't re-render the whole page 60x/sec.
 */
export default function useParallax(
  sectionRef: RefObject<HTMLElement | null>,
  bgRef: RefObject<HTMLElement | null>,
  speed = 0.3,
): void {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const update = () => {
      const section = sectionRef.current
      const bg = bgRef.current
      if (!section || !bg) return
      const rect = section.getBoundingClientRect()
      const distanceFromCenter = rect.top + rect.height / 2 - window.innerHeight / 2
      bg.style.transform = `translateY(${distanceFromCenter * -speed}px)`
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [sectionRef, bgRef, speed])
}
