"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Animate a number counting up from 0 to `target` whenever `target` changes.
 * Uses requestAnimationFrame for smooth 60fps updates.
 */
export function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0)
  const raf = useRef<number | null>(null)
  const startTs = useRef<number | null>(null)

  useEffect(() => {
    startTs.current = null
    if (raf.current !== null) cancelAnimationFrame(raf.current)

    const tick = (ts: number) => {
      if (startTs.current === null) startTs.current = ts
      const elapsed = ts - startTs.current
      const progress = Math.min(1, elapsed / duration)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) raf.current = requestAnimationFrame(tick)
    }

    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current)
    }
  }, [target, duration])

  return value
}
