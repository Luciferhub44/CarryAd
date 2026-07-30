import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

/** ponytail: one IntersectionObserver per element, fine at this page's scale (~5 sections) */
export default function useReveal(ref: RefObject<HTMLElement | null>): boolean {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.unobserve(el)
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref])

  return visible
}
